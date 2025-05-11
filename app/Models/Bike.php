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
        'mechanic_id', 
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
        
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function mechanic(): BelongsTo
    {
        return $this->belongsTo(User::class, 'mechanic_id'); 
    }

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }
}