<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bike;  // Importa los modelos que necesites
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
        // Obtener el ID del mecánico logueado
        $mechanicId = Auth::id();

        // ❗ Corrige el nombre de la columna a 'mechanic_id'
        $assignedBikes = Bike::where('mechanic_id', $mechanicId)->get();

        return response()->json($assignedBikes);
    }

    public function getAssignedAppointments()
    {
        // Obtener el ID del mecánico logueado
        $mechanicId = Auth::id();

        // Lógica para obtener las citas asignadas al mecánico
        // Esto dependerá de la estructura de tu base de datos
        $assignedAppointments = Appointment::where('mechanic_id', $mechanicId)->with('client', 'bike')->get();

        return response()->json($assignedAppointments);
    }
}