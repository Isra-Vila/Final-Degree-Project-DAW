<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bike extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'mechanic_id', // Asegúrate de que esta columna exista si la usas para el "mecánico por defecto"
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
        'repair_state',
        'maintenance_state',
    ];

    protected $casts = [
        // Define casts si tienes, por ejemplo, campos de fecha
    ];

    /**
     * Get the owner that owns the bike.
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Get the mechanic that the bike is assigned to (if applicable).
     */
    public function mechanic(): BelongsTo
    {
        return $this->belongsTo(User::class, 'mechanic_id'); // Asume que mechanic_id apunta a un usuario con rol 'mechanic'
    }

    /**
     * Get the appointments for the bike.
     */
    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }
}