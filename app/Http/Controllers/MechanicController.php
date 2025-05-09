<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bike;
use App\Models\Appointment;
use Illuminate\Support\Facades\Auth;

class MechanicController extends Controller
{
    public function dashboard()
    {
        return response()->json(['message' => 'Bienvenido al dashboard de mecánico']);
    }

    /**
     * Obtiene las bicicletas asociadas a las citas del mecánico logueado.
     * Esto incluye bicicletas de citas en cualquier estado.
     */
    public function getAssignedBikes()
    {
        $mechanic = Auth::user(); // Asume que el usuario autenticado es un mecánico
        if (!$mechanic || !$mechanic->hasRole('mechanic')) {
            return response()->json(['message' => 'Acceso denegado: No es un mecánico o no autenticado.'], 403);
        }

        $mechanicId = $mechanic->id;

        // Obtener los IDs únicos de las bicicletas que tienen citas con este mecánico
        // Independientemente del estado de la cita (pendiente, confirmada, etc.)
        $bikeIds = Appointment::where('mechanic_id', $mechanicId)
                              ->pluck('bike_id')
                              ->unique();

        // Obtener los detalles de esas bicicletas.
        // Incluir las relaciones con 'owner' y las 'appointments' para poder mostrarlas en el frontend
        // Filtrar solo las citas de ESTE MECÁNICO en el historial de la bici si es necesario,
        // o dejar que 'appointments' cargue todas y el frontend filtre.
        // Para evitar que 'appointments' en la bici traiga todas las citas, podemos usar un with whereHas.
        $assignedBikes = Bike::whereIn('id', $bikeIds)
                             ->with(['owner', 'appointments' => function ($query) use ($mechanicId) {
                                 // Cargar solo las citas de esta bicicleta que son de ESTE MECÁNICO
                                 $query->where('mechanic_id', $mechanicId)->with('mechanic'); // Cargar el mecánico de la cita también
                             }])
                             ->get();

        return response()->json($assignedBikes);
    }

    /**
     * Obtiene las citas asignadas al mecánico logueado.
     * Incluye las relaciones con el cliente y la bicicleta.
     */
    public function getAssignedAppointments()
    {
        $mechanic = Auth::user(); // Asume que el usuario autenticado es un mecánico
        if (!$mechanic || !$mechanic->hasRole('mechanic')) {
            return response()->json(['message' => 'Acceso denegado: No es un mecánico o no autenticado.'], 403);
        }

        $mechanicId = $mechanic->id;

        $assignedAppointments = Appointment::where('mechanic_id', $mechanicId)
                                           ->with(['client', 'bike', 'mechanic']) // Aseguramos cargar el mecánico de la cita también
                                           ->get();

        return response()->json($assignedAppointments);
    }

    // ... (Otros métodos de MechanicController)
}