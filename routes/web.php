<?php

/* Para rutas normales (API, backend, admin, etc.)
Route::prefix('api')->group(function () {
    // tus rutas API
});*/

// Para el frontend SPA (React)
Route::get('/{any}', function () {
    return view('layouts.main');
})->where('any', '.*');
