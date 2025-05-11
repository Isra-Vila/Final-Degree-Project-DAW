<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rules\Password; 

class UserController extends Controller
{
    
    public function index(): JsonResponse
    {
        $users = User::with('roles')->paginate(10);
        return response()->json($users);
    }

    
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', 'min:2'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => [
                'required',
                'string',
                Password::min(8)   
                          ->letters()
                          ->numbers(),
                'confirmed',
            ],
            'role' => ['required', Rule::in(['admin', 'client', 'mechanic'])],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole($request->role);
        $user->load('roles');

        return response()->json($user, 201);
    }

    public function show(User $user): JsonResponse
    {
        $user->load('roles');
        return response()->json($user);
    }
    
    public function update(Request $request, User $user): JsonResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', 'min:2'],
            'email' => ['required', 'string', 'email', Rule::unique('users')->ignore($user->id)],
            'password' => [
                'nullable',
                'string',
                Password::min(8)
                        ->letters()
                        ->numbers(),
                'confirmed',
            ],
            'role' => ['required', Rule::in(['admin', 'client', 'mechanic'])],
        ]);

        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->syncRoles([$request->role]);
        $user->load('roles');

        $user->save();

        return response()->json($user);
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();
        return response()->json(['message' => 'Usuario eliminado correctamente']);
    }

    public function getMechanics(): JsonResponse
    {
        $mechanics = User::whereHas('roles', function ($query) {
            $query->where('name', 'mechanic');
        })->get();

        return response()->json($mechanics);
    }
}