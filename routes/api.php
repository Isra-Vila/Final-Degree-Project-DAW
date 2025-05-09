<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ClientController; // Renombrado para consistencia
use App\Http\Controllers\API\MechanicController; // Renombrado para consistencia
use App\Http\Controllers\BikeController; // Usar el controlador de Bike directamente
use App\Http\Controllers\API\AppointmentController;

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
        // Las bicis para admin pueden gestionarse a través de la ruta general de bikes
        Route::apiResource('bikes', BikeController::class); // Si un admin puede crear, ver, actualizar, eliminar todas las bicis
        // Las citas para admin pueden gestionarse a través de la ruta general de appointments.
    });

    // Rutas para CLIENTES (con middleware de rol)
    Route::middleware('role:client')->group(function () {
        Route::get('/client/dashboard', [ClientController::class, 'dashboard']);

        Route::prefix('client')->group(function () {
            // Rutas para las bicicletas del cliente
            Route::get('/bikes', [BikeController::class, 'clientBikes']); // Usar BikeController
            Route::post('/bikes', [BikeController::class, 'store']);
            Route::get('/bikes/{bike}', [BikeController::class, 'show']);
            Route::put('/bikes/{bike}', [BikeController::class, 'update']);
            Route::delete('/bikes/{bike}', [BikeController::class, 'destroy']);

            // Rutas para la gestión de citas del cliente (específicas para clientes)
            Route::apiResource('appointments', AppointmentController::class)->only(['index', 'store', 'show', 'update', 'destroy']);
        });
    });

    // Rutas para MECÁNICOS (con middleware de rol)
    Route::middleware('role:mechanic')->group(function () {
        Route::get('/mechanic/dashboard', [MechanicController::class, 'dashboard']);

        // ⭐ RUTA PARA OBTENER LAS BICICLETAS ASIGNADAS AL MECÁNICO
        Route::get('/mechanic/assigned-bikes', [BikeController::class, 'assignedBikesForMechanic']);

        // ⭐ RUTA PARA OBTENER LAS CITAS ASIGNADAS AL MECÁNICO
        Route::get('/mechanic/assigned-appointments', [AppointmentController::class, 'assignedAppointments']);
    });

    // ⭐ RUTA GENERAL PARA LA GESTIÓN DE CITAS (ACCESIBLE POR MECÁNICOS Y ADMINS) ⭐
    // Un mecánico necesita poder actualizar el estado de sus citas asignadas.
    // Un admin puede actualizar cualquier cita.
    Route::middleware('role:mechanic|admin')->group(function () {
        // Permite a mecánicos y administradores actualizar citas.
        // El método `update` en `AppointmentController` debe manejar la autorización interna.
        Route::put('/appointments/{appointment}', [AppointmentController::class, 'update']);

        // Si quieres que los mecánicos puedan ver citas individuales, puedes añadir:
        // Route::get('/appointments/{appointment}', [AppointmentController::class, 'show']);
        // Esto es útil si un mecánico necesita ver los detalles completos de una cita específica
        // a la que no tiene acceso por la ruta de `assigned-appointments`.
    });

    // ⭐ Ruta para obtener mecánicos (ahora dentro del grupo protegido)
    Route::get('/mechanics', [UserController::class, 'getMechanics']);

    // ⭐ Nueva ruta para obtener las fechas no disponibles de un mecánico
    Route::get('/mechanics/{mechanicId}/unavailable-dates', [AppointmentController::class, 'getUnavailableDatesForMechanic']);

    // Si necesitas rutas generales para bicicletas para otros roles autenticados (por ejemplo, para ver detalles de cualquier bici)
    // Puedes usar Route::apiResource('bikes', BikeController::class); aquí, asegurándote de que los métodos del controlador
    // tengan la lógica de autorización adecuada para los roles que accedan a ellos.
});