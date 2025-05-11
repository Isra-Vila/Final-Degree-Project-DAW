<?php

namespace App\Http\Controllers;

use App\Models\Bike;
use App\Http\Requests\StoreBikeRequest;
use App\Http\Requests\UpdateBikeRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\User; 

class BikeController extends Controller
{
    
    public function index(): JsonResponse
    {
        $bikes = Bike::with(['owner', 'mechanic'])->paginate(10);
        return response()->json($bikes);
    }

    
    public function clientBikes(): JsonResponse
    {
        $client = Auth::user();
        if ($client && $client->hasRole('client')) {
            $bikes = $client->ownedBikes()->with('mechanic')->get();
            return response()->json($bikes);
        }
        return response()->json(['message' => 'No autenticado o rol incorrecto'], 401);
    }

    
    public function assignedBikesForMechanic(): JsonResponse
    {
        $mechanic = Auth::user();

        if (!$mechanic || !$mechanic->hasRole('mechanic')) {
            return response()->json(['message' => 'Acceso no autorizado. Solo para mecánicos.'], 403);
        }

        
        //Esto asegura que solo se muestren las bicicletas para las que el mecánico tiene citas.
        $bikes = Bike::whereHas('appointments', function ($query) use ($mechanic) {
            $query->where('mechanic_id', $mechanic->id);
        })->with(['owner', 'mechanic'])->get(); 

        return response()->json($bikes);
    }

    public function store(StoreBikeRequest $request): JsonResponse
    {
        $validatedData = $request->validated();
        $user = Auth::user(); 

        //Si el usuario es un cliente, asigna el owner_id automáticamente
        if ($user && $user->hasRole('client')) {
            $validatedData['owner_id'] = $user->id;
        }
        

        $bike = Bike::create($validatedData);
        return response()->json($bike->load(['owner', 'mechanic']), 201);
    }

    
    public function show(Bike $bike): JsonResponse
    {
        $user = Auth::user();

        //Esto asegura que el cliente solo pueda ver sus propias bicis
        if ($user && $user->hasRole('client') && $bike->owner_id !== $user->id) {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }

        return response()->json($bike->load(['owner', 'mechanic']));
    }

    
    public function update(UpdateBikeRequest $request, Bike $bike): JsonResponse
    {
        $user = Auth::user();

        //Solo el propietario o un admin pueden actualizar la bici
        if ($user && $user->hasRole('client') && $bike->owner_id !== $user->id) {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }

        $bike->update($request->validated());
        return response()->json($bike->load(['owner', 'mechanic']));
    }

    
    public function destroy(Bike $bike): JsonResponse
    {
        $user = Auth::user();

        //Solo el propietario o un admin pueden eliminar la bici
        if ($user && $user->hasRole('client') && $bike->owner_id !== $user->id) {
            return response()->json(['message' => 'Acceso denegado'], 403); // Debería ser 403, no 204 en caso de denegado
        }
        //Los mecánicos no deben poder eliminar bicicletas.
        if ($user && $user->hasRole('mechanic')) {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }

        $bike->delete();
        return response()->json(null, 204);
    }
}