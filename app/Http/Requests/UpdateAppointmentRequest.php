<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use App\Models\Appointment;
use App\Models\User;

class UpdateAppointmentRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        $user = Auth::user();
        $appointment = $this->route('appointment');

        if ($user->hasRole('admin')) {
            return true;
        }

        
        if ($user->hasRole('client')) {
            return $appointment && $appointment->client_id === $user->id;
        }

        
        if ($user->hasRole('mechanic')) {
            return $appointment && $appointment->mechanic_id === $user->id;
        }

        return false;
    }

    
    public function rules(): array
    {
        $appointment = $this->route('appointment');
        $user = Auth::user();

        $rules = [
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date|after:start_time',
            'type' => ['nullable', Rule::in(['reparacion', 'mantenimiento'])],
            'status' => [
                'nullable',
                Rule::in(['pending', 'confirmed', 'completed', 'canceled', 'failed']), 
            ],
        ];

        //Reglas específicas para clientes
        if ($user->hasRole('client')) {
            $rules['mechanic_id'] = 'sometimes';
            $rules['client_id'] = 'sometimes';
            $rules['type'] = 'sometimes';
            $rules['start_time'] = [
                'nullable',
                'date',
                'after_or_equal:now',
                Rule::when($appointment && $appointment->status === 'pending', ['required', 'date', 'after_or_equal:now']),
                Rule::when($appointment && $appointment->status !== 'pending', ['sometimes']),
            ];
            $rules['end_time'] = [
                'nullable',
                'date',
                'after:start_time',
                Rule::when($appointment && $appointment->status === 'pending', ['required', 'date', 'after:start_time']),
                Rule::when($appointment && $appointment->status !== 'pending', ['sometimes']),
            ];
            $rules['status'] = [
                'sometimes',
                
                Rule::when(in_array($this->input('status'), ['canceled']), [
                    Rule::in(['canceled']),
                    function ($attribute, $value, $fail) use ($appointment) {
                        
                        if ($appointment && !in_array($appointment->status, ['pending', 'confirmed'])) {
                            $fail("No puedes cancelar una cita que ya está " . $appointment->status . ".");
                        }
                    }
                ]),
                //Si el cliente intenta cambiar a cualquier otro estado que no sea 'canceled', no se permite
                Rule::when(!in_array($this->input('status'), ['canceled']), ['prohibits']),
            ];
        }

        //Reglas específicas para mecánicos
        if ($user->hasRole('mechanic')) {
            $rules['mechanic_id'] = 'sometimes';
            $rules['client_id'] = 'sometimes';
            $rules['bike_id'] = 'sometimes';
            $rules['type'] = 'sometimes';
            $rules['title'] = 'sometimes';
            $rules['description'] = 'sometimes';
            $rules['start_time'] = 'sometimes';
            $rules['end_time'] = 'sometimes';
            $rules['status'] = [
                'nullable',
                
                Rule::in(['pending', 'confirmed', 'completed', 'canceled', 'failed']),
                function ($attribute, $value, $fail) use ($appointment) {
                    //Lógica de transición de estados para el mecánico
                    if ($value === 'confirmed' && $appointment->status !== 'pending') {
                        $fail("Solo puedes confirmar citas que están pendientes.");
                    }
                    if ($value === 'completed' && $appointment->status !== 'confirmed') {
                        $fail("Solo puedes marcar como completadas las citas que están confirmadas.");
                    }
                    //El mecánico puede "fallar" un servicio solo si está 'confirmed'
                    if ($value === 'failed' && $appointment->status !== 'confirmed') {
                        $fail("Solo puedes marcar como 'no completado' un servicio que está confirmado.");
                    }
                    //El mecánico puede cancelar una cita si está 'pending' o 'confirmed'
                    if ($value === 'canceled' && !in_array($appointment->status, ['pending', 'confirmed'])) {
                        $fail("Solo puedes cancelar citas que están pendientes o confirmadas.");
                    }
                    //Si el mecánico intenta cambiar a 'pending' desde un estado posterior, no se permite
                    if ($value === 'pending' && in_array($appointment->status, ['confirmed', 'completed', 'canceled', 'failed'])) {
                        $fail("No puedes regresar una cita a estado 'pendiente' una vez que ha avanzado.");
                    }
                }
            ];
        }

        //Reglas específicas para administradores
        if ($user->hasRole('admin')) {
            $rules['mechanic_id'] = [
                'nullable',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    if ($value && !User::where('id', $value)->whereHas('roles', function ($query) {
                        $query->where('name', 'mechanic');
                    })->exists()) {
                        $fail("The selected mechanic is not a mechanic.");
                    }
                },
            ];
            $rules['client_id'] = 'nullable|exists:users,id';
            $rules['bike_id'] = 'nullable|exists:bikes,id';
            $rules['type'] = ['nullable', Rule::in(['reparacion', 'mantenimiento'])];
            $rules['start_time'] = 'nullable|date|after_or_equal:now';
            $rules['end_time'] = 'nullable|date|after:start_time';
            $rules['status'] = [
                'nullable',
                Rule::in(['pending', 'confirmed', 'completed', 'canceled', 'failed']), 
            ];

            //Validación de disponibilidad del mecánico al actualizar (para admins, solo si mechanic_id o tiempos cambian)
            if ($this->hasAny(['mechanic_id', 'start_time', 'end_time'])) {
                $rules['start_time'][] = function ($attribute, $value, $fail) use ($appointment) {
                    $mechanicId = $this->input('mechanic_id', $appointment->mechanic_id);
                    $startTime = new \DateTime($value ?? $appointment->start_time);
                    $endTime = new \DateTime($this->input('end_time', $appointment->end_time));

                    if ($mechanicId && $startTime && $endTime) {
                        $overlappingAppointments = Appointment::where('mechanic_id', $mechanicId)
                            ->where('id', '!=', $appointment->id)
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
                    }
                };
            }
        }

        return $rules;
    }
}