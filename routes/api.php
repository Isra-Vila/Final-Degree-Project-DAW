<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\MechanicController;
use App\Http\Controllers\BikeController;
use App\Http\Controllers\API\AppointmentController; // ⭐ Importar AppointmentController

// Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rutas protegidas por Sanctum
Route::middleware('auth:sanctum')->group(function () {

    // Ruta de cierre de sesión
    Route::post('/logout', [AuthController::class, 'logout']);

    // Rutas solo para ADMIN (con middleware de rol)
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::apiResource('users', UserController::class);
        Route::apiResource('bikes', BikeController::class); // ❗ Descomentado y usando el BikeController existente
    });

    // Rutas para CLIENTES (con middleware de rol)
    Route::middleware('role:client')->group(function () {
        Route::get('/client/dashboard', [ClientController::class, 'dashboard']);

        // Rutas para las bicicletas del cliente
        Route::prefix('client')->group(function () {
            Route::get('/bikes', [\App\Http\Controllers\BikeController::class, 'clientBikes']);
            Route::post('/bikes', [\App\Http\Controllers\BikeController::class, 'store']);
            Route::get('/bikes/{bike}', [\App\Http\Controllers\BikeController::class, 'show']);
            Route::put('/bikes/{bike}', [\App\Http\Controllers\Controllers\BikeController::class, 'update']); // ❗ Corregido namespace
            Route::delete('/bikes/{bike}', [\App\Http\Controllers\BikeController::class, 'destroy']);
        });

        // ⭐ Rutas para la gestión de citas del cliente
        Route::prefix('client')->group(function () {
            Route::apiResource('appointments', AppointmentController::class)->only(['index', 'store', 'show', 'update', 'destroy']);
        });
    });

    // Rutas para MECÁNICOS (con middleware de rol)
    Route::middleware('role:mechanic')->group(function () {
        Route::get('/mechanic/dashboard', [MechanicController::class, 'dashboard']);

        // ⭐ Rutas para obtener las bicicletas y citas asignadas al mecánico
        Route::get('/mechanic/assigned-bikes', [MechanicController::class, 'getAssignedBikes']); // Agrega esta línea
        Route::get('/mechanic/assigned-appointments', [MechanicController::class, 'getAssignedAppointments']); // Agrega esta línea
    });

    // ⭐ Ruta para obtener mecánicos (ahora dentro del grupo protegido)
    Route::get('/mechanics', [UserController::class, 'getMechanics']);

    // ⭐ Si necesitas rutas generales para bicicletas, puedes dejarlas aquí
    // Route::apiResource('bikes', BikeController::class);
});