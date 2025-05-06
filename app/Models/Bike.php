<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bike extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'brand',
        'model',
        'handlebar',
        'stem',
        'saddle',
        'frame',
        'suspension',
        'pedals',
        'chain',
        'tyre',
        'rim',
        'tube',
        'brakes',
        'year',
        'owner_id',
        'mechanic_id',
        'repair_state',
        'maintenance_state',
    ];

    /**
     * Get the user that owns the bike (the client).
     */
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Get the mechanic assigned to the bike.
     */
    public function mechanic()
    {
        return $this->belongsTo(User::class, 'mechanic_id');
    }

    /**
     * Get the appointments for the bike.
     */
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}