<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Appointment;
use Illuminate\Validation\Rule;

class StoreAppointmentRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        $user = Auth::user();
        return $user->hasRole('admin') || $user->hasRole('client');
    }

    
    public function rules(): array
    {
        $rules = [
            'mechanic_id' => [
                'required',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    if ($value && !User::where('id', $value)->whereHas('roles', function ($query) {
                        $query->where('name', 'mechanic');
                    })->exists()) {
                        $fail("The selected mechanic is not a mechanic.");
                    }
                },
            ],
            'bike_id' => 'required|exists:bikes,id',
            'type' => ['required', Rule::in(['reparacion', 'mantenimiento'])],
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => ['required', 'date'],
            'end_time' => ['required', 'date', 'after:start_time'],
            'status' => [
                'nullable',
                Rule::in(['pending', 'confirmed', 'completed', 'canceled']),
            ],
        ];

        $user = Auth::user();

        if ($user->hasRole('client')) {
            $rules['client_id'] = 'sometimes|exists:users,id';
            $rules['status'] = ['sometimes', Rule::in(['pending'])];
        } elseif ($user->hasRole('admin')) {
            $rules['client_id'] = 'required|exists:users,id';
        }

        

        //Validación de disponibilidad del mecánico
        $rules['start_time'][] = function ($attribute, $value, $fail) {
            $mechanicId = $this->input('mechanic_id');
            $endTimeInput = $this->input('end_time');

            if (!$mechanicId || !$value || !$endTimeInput) {
                $fail("No se proporcionaron todos los datos necesarios para la verificación de disponibilidad.");
                return;
            }

            try {
                $startTime = new \DateTime($value);
                $endTime = new \DateTime($endTimeInput);
            } catch (\Exception $e) {
                $fail("Formato de fecha/hora inválido para la verificación de disponibilidad.");
                return;
            }

            
            $overlappingAppointments = Appointment::where('mechanic_id', $mechanicId)
                ->where(function ($query) use ($startTime, $endTime) {
                    $query->where(function ($query) use ($startTime, $endTime) {
                        $query->where('start_time', '<', $endTime)
                              ->where('end_time', '>', $startTime);
                    });
                })
                ->count();

            if ($overlappingAppointments > 0) {
                $fail("El mecánico seleccionado no está disponible en este horario.");
            }
        };

        return $rules;
    }

    protected function prepareForValidation(): void
    {
        $user = Auth::user();
        if ($user->hasRole('client')) {
            $this->merge([
                'client_id' => $user->id,
                'status' => 'pending',
            ]);
        }
    }
}