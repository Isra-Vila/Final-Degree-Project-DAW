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

    public function getAssignedBikes()
    {
        $mechanic = Auth::user(); 
        if (!$mechanic || !$mechanic->hasRole('mechanic')) {
            return response()->json(['message' => 'Acceso denegado: No es un mecánico o no autenticado.'], 403);
        }

        $mechanicId = $mechanic->id;

        $bikeIds = Appointment::where('mechanic_id', $mechanicId)
                                ->pluck('bike_id')
                                ->unique();

        $assignedBikes = Bike::whereIn('id', $bikeIds)
                                ->with(['owner', 'appointments' => function ($query) use ($mechanicId) {
                                 // Cargar solo las citas de esta bicicleta que son de este mecánico
                                    $query->where('mechanic_id', $mechanicId)->with('mechanic'); //Esto Asegura que se carga el mecánico de la cita también
                                }])
                                ->get();

        return response()->json($assignedBikes);
    }

    
    public function getAssignedAppointments()
    {
        $mechanic = Auth::user(); //Asume que el usuario autenticado es un mecánico
        if (!$mechanic || !$mechanic->hasRole('mechanic')) {
            return response()->json(['message' => 'Acceso denegado: No es un mecánico o no autenticado.'], 403);
        }

        $mechanicId = $mechanic->id;

        $assignedAppointments = Appointment::where('mechanic_id', $mechanicId)
                                            ->with(['client', 'bike', 'mechanic']) 
                                            ->get();

        return response()->json($assignedAppointments);
    }
}