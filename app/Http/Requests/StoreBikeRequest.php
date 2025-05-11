<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Validation\Rule;

class StoreBikeRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        return Auth::check();
    }

    
    public function rules(): array
    {
        $rules = [
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'handlebar' => 'nullable|string|max:255',
            'stem' => 'nullable|string|max:255',
            'saddle' => 'nullable|string|max:255',
            'frame' => 'nullable|string|max:255',
            'suspension' => 'nullable|string|max:255',
            'pedals' => 'nullable|string|max:255',
            'chain' => 'nullable|string|max:255',
            'tyre' => 'nullable|string|max:255',
            'rim' => 'nullable|string|max:255',
            'tube' => 'nullable|string|max:255',
            'brakes' => 'nullable|string|max:255',
            'year' => 'nullable|integer|min:1900|max:' . (date('Y') + 1),
            'mechanic_id' => [
                'nullable',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    if ($value && !User::where('id', $value)->whereHas('roles', function ($query) {
                        $query->where('name', 'mechanic');
                    })->exists()) {
                        $fail("The selected mechanic is not a mechanic.");
                    }
                },
            ],
            'repair_state' => 'sometimes', 
            'maintenance_state' => 'sometimes', 
        ];

        if (Auth::check() && Auth::user()->hasRole('admin')) {
            $rules['owner_id'] = [
                'required',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    if ($value && !User::where('id', $value)->whereHas('roles', function ($query) {
                        $query->where('name', 'client');
                    })->exists()) {
                        $fail("The selected owner is not a client.");
                    }
                },
            ];
            
            $rules['repair_state'] = ['nullable', 'string', Rule::in(['reparada', 'en reparacion', 'no reparada'])];
            $rules['maintenance_state'] = ['nullable', 'string', Rule::in(['mantenimiento finalizado', 'en mantenimiento', 'mantenimiento no terminado'])];
        }

        return $rules;
    }

    
    public function messages(): array
    {
        return [
            'brand.required' => 'La marca de la bicicleta es obligatoria.',
            'brand.string' => 'La marca debe ser una cadena de texto.',
            'brand.max' => 'La marca no puede tener más de 255 caracteres.',
            'model.required' => 'El modelo de la bicicleta es obligatorio.',
            'model.string' => 'El modelo debe ser una cadena de texto.',
            'model.max' => 'El modelo no puede tener más de 255 caracteres.',
            'year.integer' => 'El año debe ser un número entero.',
            'year.min' => 'El año debe ser al menos 1900.',
            'year.max' => 'El año no puede ser mayor a ' . (date('Y') + 1) . '.',
            'mechanic_id.exists' => 'El ID del mecánico seleccionado no es válido.',
            'repair_state.in' => 'El estado de reparación seleccionado no es válido.',
            'maintenance_state.in' => 'El estado de mantenimiento seleccionado no es válido.',
            'owner_id.required' => 'El ID del propietario es obligatorio.',
            'owner_id.exists' => 'El ID del propietario seleccionado no es válido.',
        ];
    }
}