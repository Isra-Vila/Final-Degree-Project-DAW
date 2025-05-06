<?php

namespace App\Http\Controllers;

use App\Models\Bike;
use App\Http\Requests\StoreBikeRequest;
use App\Http\Requests\UpdateBikeRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class BikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Este método ahora se usará para obtener todas las bicis por los administradores
        $bikes = Bike::with(['owner', 'mechanic'])->paginate(10); // Puedes usar paginate para la paginación
        return response()->json($bikes);
    }

    /**
     * Get the bikes for the authenticated client.
     */
    public function clientBikes()
    {
        $client = Auth::user();
        if ($client) {
            $bikes = $client->ownedBikes()->with('mechanic')->get();
            return response()->json($bikes);
        }
        return response()->json(['message' => 'No autenticado'], 401);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBikeRequest $request)
    {
        $bike = Bike::create($request->validated());
        return response()->json($bike->load(['owner', 'mechanic']), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Bike $bike)
    {
        $user = Auth::user();

        // Asegurar que el cliente solo pueda ver sus propias bicis
        if ($user && $user->hasRole('client') && $bike->owner_id !== $user->id) {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }

        return response()->json($bike->load(['owner', 'mechanic']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBikeRequest $request, Bike $bike)
    {
        $bike->update($request->validated());
        return response()->json($bike->load(['owner', 'mechanic']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bike $bike)
    {
        $user = Auth::user();

        // Asegurar que el cliente solo pueda eliminar sus propias bicis
        if ($user && $user->hasRole('client') && $bike->owner_id !== $user->id) {
            return response()->json(null, 204);
        }

        $bike->delete();
        return response()->json(null, 204);
    }
}