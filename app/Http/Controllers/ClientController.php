<?php

namespace App\Http\Controllers;

use App\Models\User; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 

class ClientController extends Controller
{
    /**
     * Muestra el perfil del cliente especificado.
     *
     * @param  \App\Models\User  $client  // Laravel inyectará el modelo User basado en el ID
     * @return \Illuminate\Http\Response
     */
    public function show(User $client)
    {
        
        if (Auth::check() && Auth::user()->id !== $client->id && !Auth::user()->hasRole('admin')) {
            return response()->json(['message' => 'No autorizado para ver este perfil.'], 403);
        }

        
        $client->load('ownedBikes', 'clientAppointments'); 

        return response()->json($client);
    }

    public function dashboard()
    {
        
        $user = Auth::user();
        if ($user) {
            $user->load('ownedBikes', 'clientAppointments');
        }
        return response()->json([
            'message' => 'Bienvenido al dashboard de cliente',
            'user' => $user 
        ]);
    }
}