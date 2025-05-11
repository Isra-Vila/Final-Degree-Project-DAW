<?php

// Para el frontend SPA (React)
Route::get('/{any}', function () {
    return view('layouts.main');
})->where('any', '^(?!api).*$');

