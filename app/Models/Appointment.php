<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'client_id',
        'mechanic_id',
        'bike_id',
        'type', // ⭐ 'type' añadido a $fillable
        'title',
        'description',
        'start_time',
        'end_time',
        'status',
    ];

    /**
     * Get the client that owns the appointment.
     */
    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    /**
     * Get the mechanic that is assigned to the appointment.
     */
    public function mechanic()
    {
        return $this->belongsTo(User::class, 'mechanic_id');
    }

    /**
     * Get the bike associated with the appointment.
     */
    public function bike()
    {
        return $this->belongsTo(Bike::class);
    }
}