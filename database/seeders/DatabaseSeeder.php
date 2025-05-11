<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder; 
use Database\Seeders\UserSeeder; 
use Database\Seeders\BikeSeeder; 

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        
        $this->call(RoleSeeder::class);

        
        $this->call(UserSeeder::class);

        
        $this->call(BikeSeeder::class);

        
    }
}