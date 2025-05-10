<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException; // Importa esta clase para las validaciones

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|unique:users',
            'password' => 'required|string|min:6|confirmed',  // obliga password_confirmation
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Al registrarse siempre cliente
        $user->assignRole('client');

        // ⭐ Cargar la relación 'roles' antes de devolver la respuesta
        // No es necesario un $user->refresh() si $user->assignRole ya persiste y el modelo se actualiza.
        // Sin embargo, $user->load('roles') es crucial para que los roles estén en la respuesta JSON.
        $user->load('roles');

        // Generar token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token'      => $token,
            'token_type' => 'Bearer',
            'user'       => $user, // Asegúrate de que el objeto user se devuelve aquí con los roles cargados
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (! Auth::attempt($request->only('email','password'))) {
            // Utiliza ValidationException para manejar errores de credenciales de forma consistente
            throw ValidationException::withMessages([
                'email' => ['Las credenciales proporcionadas son incorrectas.'],
            ]);
        }

        // Obtener el usuario autenticado y cargar la relación 'roles'
        // Auth::user() ya te da la instancia del usuario autenticado, luego puedes cargar la relación.
        $user = Auth::user()->load('roles');

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token'      => $token,
            'token_type' => 'Bearer',
            'user'       => $user, // Asegúrate de que el objeto user se devuelve aquí con los roles cargados
        ]);
    }

    public function logout(Request $request)
    {
        // Elimina todos los tokens actuales del usuario
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Sesión cerrada correctamente']);
    }
}