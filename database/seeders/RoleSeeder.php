<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role; 

class RoleSeeder extends Seeder
{
    
    public function run(): void
    {
        
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'client']);
        Role::create(['name' => 'mechanic']);

        $this->command->info('Roles seeded successfully!');
    }
}