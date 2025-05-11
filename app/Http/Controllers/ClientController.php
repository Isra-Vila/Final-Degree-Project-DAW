<?php

namespace App\Http\Controllers;

use App\Models\User; // Importa el modelo User
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Necesario para Auth::user()

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
        // OPCIONAL: Puedes añadir lógica de autorización aquí si quieres asegurarte
        // de que solo el cliente actual o un administrador pueda ver este perfil.
        // Por ejemplo:
        if (Auth::check() && Auth::user()->id !== $client->id && !Auth::user()->hasRole('admin')) {
            return response()->json(['message' => 'No autorizado para ver este perfil.'], 403);
        }

        // Carga las relaciones que necesites para el perfil del cliente
        // Utiliza los nombres de los métodos de relación definidos en tu modelo User
        $client->load('ownedBikes', 'clientAppointments'); // <-- ¡CORREGIDO AQUÍ!

        return response()->json($client);
    }

    public function dashboard()
    {
        // Puedes cargar también relaciones aquí si tu dashboard de cliente necesita datos
        // de bicicletas o citas al principio.
        $user = Auth::user();
        if ($user) {
             $user->load('ownedBikes', 'clientAppointments');
        }
        return response()->json([
            'message' => 'Bienvenido al dashboard de cliente',
            'user' => $user // Incluye los datos del usuario y sus relaciones
        ]);
    }
}