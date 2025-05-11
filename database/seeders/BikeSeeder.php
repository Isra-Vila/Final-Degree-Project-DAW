<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Bike;

class BikeSeeder extends Seeder
{
    
    public function run(): void
    {
        
        Bike::factory()->count(20)->create();
    }
}