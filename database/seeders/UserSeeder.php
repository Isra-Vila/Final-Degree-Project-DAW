<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role; 

class UserSeeder extends Seeder
{
    
    public function run(): void
    {
        
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'), 
        ]);
        $adminRole = Role::where('name', 'admin')->first();
        if ($adminRole) {
            $admin->assignRole($adminRole);
        } else {
            $this->command->info('Role "admin" not found. Please ensure roles are seeded first.');
        }


        
        $clientRole = Role::where('name', 'client')->first();
        if ($clientRole) {
            User::factory()->count(10)->create()->each(function ($user) use ($clientRole) {
                $user->assignRole($clientRole);
            });
        } else {
            $this->command->info('Role "client" not found. Please ensure roles are seeded first.');
        }


       
        $mechanicRole = Role::where('name', 'mechanic')->first();
        if ($mechanicRole) {
            User::factory()->count(5)->create()->each(function ($user) use ($mechanicRole) {
                $user->assignRole($mechanicRole);
            });
        } else {
            $this->command->info('Role "mechanic" not found. Please ensure roles are seeded first.');
        }
    }
}