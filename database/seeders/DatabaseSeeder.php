<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder; // Importa el RoleSeeder
use Database\Seeders\UserSeeder; // Importa el UserSeeder
use Database\Seeders\BikeSeeder; // Importa el BikeSeeder

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Llama al RoleSeeder primero
        $this->call(RoleSeeder::class);

        // Luego llama al UserSeeder
        $this->call(UserSeeder::class);

        // Finalmente, llama al BikeSeeder
        $this->call(BikeSeeder::class);

        // Puedes añadir aquí otras llamadas a seeders si tienes más
    }
}