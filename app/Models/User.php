<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    
    use HasFactory, Notifiable, HasRoles, HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function ownedBikes()
    {
        return $this->hasMany(Bike::class, 'owner_id');
    }

    public function clientAppointments()
    {
        return $this->hasMany(Appointment::class, 'client_id');
    }

    public function mechanicAppointments()
    {
        return $this->hasMany(Appointment::class, 'mechanic_id');
    }
}