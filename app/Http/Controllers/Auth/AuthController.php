<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException; 

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|unique:users',
            'password' => 'required|string|min:6|confirmed',  
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        //Asegura que todos los nuevos usuarios tengan el rol 'client' por defecto
        $user->assignRole('client');

        //Cargar la relación 'roles' antes de devolver la respuesta
        $user->load('roles');

        // Generar token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token'      => $token,
            'token_type' => 'Bearer',
            'user'       => $user, 
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (! Auth::attempt($request->only('email','password'))) {
            
            throw ValidationException::withMessages([
                'email' => ['Las credenciales proporcionadas son incorrectas.'],
            ]);
        }

        // Obtener el usuario autenticado y cargar la relación 'roles'
        $user = Auth::user()->load('roles');

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token'      => $token,
            'token_type' => 'Bearer',
            'user'       => $user, 
        ]);
    }

    public function logout(Request $request)
    {
        // Elimina todos los tokens actuales del usuario
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Sesión cerrada correctamente']);
    }
}