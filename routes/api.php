<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\MechanicController;
use App\Http\Controllers\BikeController;
use App\Http\Controllers\API\AppointmentController; 
use Illuminate\Http\Request;

// Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rutas protegidas por Sanctum
Route::middleware('auth:sanctum')->group(function () {

    // Ruta de cierre de sesión
    Route::post('/logout', [AuthController::class, 'logout']);

    // Rutas para ADMIN
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::apiResource('users', UserController::class);
        Route::apiResource('bikes', BikeController::class);
    });

    // Rutas para CLIENTES
    Route::middleware('role:client')->group(function () {

        Route::prefix('client')->group(function () {
            // Rutas para las bicicletas del cliente
            Route::get('/bikes', [BikeController::class, 'clientBikes']);
            Route::post('/bikes', [BikeController::class, 'store']);
            Route::get('/bikes/{bike}', [BikeController::class, 'showBike']); 
            Route::put('/bikes/{bike}', [BikeController::class, 'update']);
            Route::delete('/bikes/{bike}', [BikeController::class, 'destroy']);

            // Rutas para la gestión de citas del cliente
            Route::apiResource('appointments', AppointmentController::class)->only(['index', 'store', 'show', 'update', 'destroy']);
        });
        
        Route::get('/client/{client}', [ClientController::class, 'show'])->name('client.profile');
        Route::get('/client/dashboard', [ClientController::class, 'dashboard']);
    });

    // Rutas para MECÁNICOS
    Route::middleware('role:mechanic')->group(function () {
        Route::get('/mechanic/dashboard', [MechanicController::class, 'dashboard']);
        Route::get('/mechanic/assigned-bikes', [BikeController::class, 'assignedBikesForMechanic']);
        Route::get('/mechanic/assigned-appointments', [AppointmentController::class, 'assignedAppointments']);
    });

    //Ruta general para citas (MECÁNICOS y ADMINS)
    Route::middleware('role:mechanic|admin')->group(function () {
        Route::put('/appointments/{appointment}', [AppointmentController::class, 'update']);
    });

    //Rutas generales accesibles por cualquier rol autenticado que tenga permiso
    Route::get('/mechanics', [UserController::class, 'getMechanics']);
    Route::get('/mechanics/{mechanicId}/unavailable-dates', [AppointmentController::class, 'getUnavailableDatesForMechanic']);

    //Ruta para obtener el usuario autenticado
    Route::get('/user', function (Request $request) {
        return response()->json($request->user());
    })->middleware('auth:sanctum');
});