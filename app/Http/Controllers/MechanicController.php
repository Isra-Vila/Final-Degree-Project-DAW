<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MechanicController extends Controller
{
    public function dashboard()
    {
        return response()->json(['message' => 'Bienvenido al dashboard de mecánico']);
    }
}
