<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $users = User::paginate($perPage); 

        return response()->json($users);
    }

    public function crearUsuario(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|in:mechanic,client,admin', 
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole($request->role);

        return response()->json(['message' => 'Usuario creado correctamente', 'user' => $user]);
    }
}