<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Http\Requests\StoreAppointmentRequest;
use App\Http\Requests\UpdateAppointmentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use App\Models\Bike;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $user = Auth::user();

        if ($user->hasRole('client')) {
            $appointments = $user->clientAppointments()->with(['bike', 'mechanic'])->get();
        } elseif ($user->hasRole('mechanic')) {
            $appointments = $user->mechanicAppointments()->with(['client', 'bike'])->get();
        } elseif ($user->hasRole('admin')) {
            $appointments = Appointment::with(['client', 'bike', 'mechanic'])->get();
        } else {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }

        return response()->json($appointments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAppointmentRequest $request): JsonResponse
    {
        $appointment = Appointment::create($request->validated());

        $bike = $appointment->bike;
        if ($bike) {
            $bike->update([
                'repair_state' => null,
                'maintenance_state' => null,
            ]);
        }

        return response()->json($appointment->load(['client', 'bike', 'mechanic']), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Appointment $appointment): JsonResponse
    {
        $user = Auth::user();

        if ($user->hasRole('client') && $appointment->client_id !== $user->id) {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }

        if ($user->hasRole('mechanic') && $appointment->mechanic_id !== $user->id) {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }

        return response()->json($appointment->load(['client', 'bike', 'mechanic']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAppointmentRequest $request, Appointment $appointment): JsonResponse
    {
        $appointment->update($request->validated());

        $bike = $appointment->bike;
        if ($bike) {
            if ($appointment->status === 'confirmed') {
                if ($appointment->type === 'reparacion') {
                    $bike->update(['repair_state' => 'en reparacion', 'maintenance_state' => null]);
                } elseif ($appointment->type === 'mantenimiento') {
                    $bike->update(['maintenance_state' => 'en mantenimiento', 'repair_state' => null]);
                }
            } elseif ($appointment->status === 'completed') {
                if ($appointment->type === 'reparacion') {
                    $bike->update(['repair_state' => 'reparada', 'maintenance_state' => null]);
                } elseif ($appointment->type === 'mantenimiento') {
                    $bike->update(['maintenance_state' => 'mantenimiento terminado', 'repair_state' => null]);
                }
            } elseif ($appointment->status === 'canceled' || $appointment->status === 'pending') {
                $bike->update(['repair_state' => null, 'maintenance_state' => null]);
            }
        }

        return response()->json($appointment->load(['client', 'bike', 'mechanic']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointment $appointment): JsonResponse
    {
        $user = Auth::user();

        if ($user->hasRole('client') && $appointment->client_id !== $user->id) {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }

        if (!$user->hasRole('admin') && $user->hasRole('mechanic')) {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }

        $appointment->delete();
        return response()->json(null, 204);
    }
}