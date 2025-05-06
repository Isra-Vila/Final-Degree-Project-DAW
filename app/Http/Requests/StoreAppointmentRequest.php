<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Appointment;
use Illuminate\Validation\Rule;

class StoreAppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = Auth::user();
        return $user->hasRole('admin') || $user->hasRole('client');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
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
            'type' => ['required', Rule::in(['reparacion', 'mantenimiento'])], // ⭐ 'type' ahora es obligatorio
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
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

        // Validación de disponibilidad del mecánico
        $rules['start_time'][] = function ($attribute, $value, $fail) {
            $mechanicId = $this->input('mechanic_id');
            $startTime = new \DateTime($value);
            $endTime = new \DateTime($this->input('end_time'));

            if ($mechanicId && $startTime && $endTime) {
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
            }
        };

        return $rules;
    }

    /**
     * Prepare the data for validation.
     */
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