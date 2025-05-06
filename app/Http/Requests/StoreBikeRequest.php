<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Validation\Rule;

class StoreBikeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'brand' => 'nullable|string|max:255',
            'model' => 'nullable|string|max:255',
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
            'repair_state' => 'sometimes', // ⭐ 'sometimes' para clientes al crear
            'maintenance_state' => 'sometimes', // ⭐ 'sometimes' para clientes al crear
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
            // Los administradores pueden establecer el estado al crear
            $rules['repair_state'] = ['nullable', 'string', Rule::in(['reparada', 'en reparacion', 'no reparada'])];
            $rules['maintenance_state'] = ['nullable', 'string', Rule::in(['mantenimiento finalizado', 'en mantenimiento', 'mantenimiento no terminado'])];
        }

        return $rules;
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        if (Auth::check() && Auth::user()->hasRole('client')) {
            $this->merge([
                'owner_id' => Auth::id(),
            ]);
        }
    }
}