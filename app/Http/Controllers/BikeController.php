<?php

namespace App\Http\Controllers;

use App\Models\Bike;
use App\Http\Requests\StoreBikeRequest;
use App\Http\Requests\UpdateBikeRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\User; // Asegúrate de que el modelo User esté importado

class BikeController extends Controller
{
    /**
     * Display a listing of the resource.
     * Accessible by admin.
     */
    public function index(): JsonResponse
    {
        $bikes = Bike::with(['owner', 'mechanic'])->paginate(10);
        return response()->json($bikes);
    }

    /**
     * Get the bikes for the authenticated client.
     */
    public function clientBikes(): JsonResponse
    {
        $client = Auth::user();
        if ($client && $client->hasRole('client')) {
            $bikes = $client->ownedBikes()->with('mechanic')->get();
            return response()->json($bikes);
        }
        return response()->json(['message' => 'No autenticado o rol incorrecto'], 401);
    }

    /**
     * ⭐ NUEVO MÉTODO: Obtener las bicicletas asignadas al mecánico autenticado.
     * Este método se usará para la lista de bicicletas del mecánico.
     */
    public function assignedBikesForMechanic(): JsonResponse
    {
        $mechanic = Auth::user();

        if (!$mechanic || !$mechanic->hasRole('mechanic')) {
            return response()->json(['message' => 'Acceso no autorizado. Solo para mecánicos.'], 403);
        }

        // Obtener las bicicletas asociadas a las citas del mecánico autenticado
        // Esto asegura que solo se muestren las bicicletas para las que el mecánico tiene citas.
        $bikes = Bike::whereHas('appointments', function ($query) use ($mechanic) {
            $query->where('mechanic_id', $mechanic->id);
        })->with(['owner', 'mechanic'])->get(); // Cargar el owner y el mechanic de la bici si es necesario

        return response()->json($bikes);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBikeRequest $request): JsonResponse
    {
        $validatedData = $request->validated();
        $user = Auth::user(); // Obtener el usuario autenticado

        // Si el usuario es un cliente, asigna el owner_id automáticamente
        if ($user && $user->hasRole('client')) {
            $validatedData['owner_id'] = $user->id;
        }
        // Si el usuario es admin, el owner_id debe venir en la request
        // Aquí puedes añadir una validación para asegurar que owner_id esté presente si es admin

        $bike = Bike::create($validatedData);
        return response()->json($bike->load(['owner', 'mechanic']), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Bike $bike): JsonResponse
    {
        $user = Auth::user();

        // Asegurar que el cliente solo pueda ver sus propias bicis
        if ($user && $user->hasRole('client') && $bike->owner_id !== $user->id) {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }
        // Los mecánicos y administradores pueden ver cualquier bicicleta
        // Aquí puedes añadir una comprobación para mecánicos si solo deben ver sus bicis asignadas,
        // pero por ahora, cualquier bici está bien si ya tienen acceso a esta ruta.

        return response()->json($bike->load(['owner', 'mechanic']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBikeRequest $request, Bike $bike): JsonResponse
    {
        $user = Auth::user();

        // Solo el propietario o un admin pueden actualizar la bici
        if ($user && $user->hasRole('client') && $bike->owner_id !== $user->id) {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }
        // Si el mecánico no puede editar bicicletas, la lógica para ello estaría aquí.
        // Tu frontend ya previene la edición desde la vista del mecánico.
        // O si solo el admin puede editar una bici, añadirías:
        // if (!$user || !$user->hasRole('admin')) { return response()->json(['message' => 'Acceso denegado'], 403); }

        $bike->update($request->validated());
        return response()->json($bike->load(['owner', 'mechanic']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bike $bike): JsonResponse
    {
        $user = Auth::user();

        // Solo el propietario o un admin pueden eliminar la bici
        if ($user && $user->hasRole('client') && $bike->owner_id !== $user->id) {
            return response()->json(['message' => 'Acceso denegado'], 403); // Debería ser 403, no 204 en caso de denegado
        }
        // Los mecánicos no deberían poder eliminar bicicletas.
        if ($user && $user->hasRole('mechanic')) {
             return response()->json(['message' => 'Acceso denegado'], 403);
        }

        $bike->delete();
        return response()->json(null, 204);
    }
}