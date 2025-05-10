<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $users = User::with('roles')->paginate(10); // Paginamos los resultados, 10 usuarios por página (puedes ajustar este número)
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role' => ['required', Rule::in(['admin', 'client', 'mechanic'])], // Permite asignar estos roles al crear
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole($request->role);
        $user->load('roles'); // Cargar los roles después de asignarlos

        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): JsonResponse
    {
        $user->load('roles');
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', Rule::unique('users')->ignore($user->id)],
            'password' => 'nullable|string|min:6|confirmed', // Contraseña opcional al actualizar
            'role' => ['required', Rule::in(['admin', 'client', 'mechanic'])], // Permite cambiar el rol al actualizar
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }
        // ⭐ Actualizar el rol del usuario. Primero sincronizamos para eliminar roles existentes.
        $user->syncRoles([$request->role]);
        $user->load('roles');

        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): JsonResponse
    {
        $user->delete();
        return response()->json(['message' => 'Usuario eliminado correctamente']);
    }

    /**
     * Get a list of users with the 'mechanic' role.
     */
    public function getMechanics(): JsonResponse
    {
        $mechanics = User::whereHas('roles', function ($query) {
            $query->where('name', 'mechanic');
        })->get();

        return response()->json($mechanics);
    }
}