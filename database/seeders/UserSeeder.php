<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role; // Importa el modelo Role

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ⭐ Asegúrate de que los roles existan. Si no tienes un seeder de roles,
        // puedes crearlos aquí temporalmente o crear un RoleSeeder aparte.
        // Aquí asumimos que los roles 'admin', 'client', y 'mechanic' ya existen.
        // Si no, descomenta y ejecuta el RoleSeeder (si lo creas).
        // $this->call(RoleSeeder::class);

        // Crea un usuario administrador
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'), // Cambia 'password' por una contraseña más segura en producción
        ]);
        $adminRole = Role::where('name', 'admin')->first();
        if ($adminRole) {
            $admin->assignRole($adminRole);
        } else {
            $this->command->info('Role "admin" not found. Please ensure roles are seeded first.');
        }


        // Crea varios usuarios clientes
        $clientRole = Role::where('name', 'client')->first();
        if ($clientRole) {
            User::factory()->count(10)->create()->each(function ($user) use ($clientRole) {
                $user->assignRole($clientRole);
            });
        } else {
            $this->command->info('Role "client" not found. Please ensure roles are seeded first.');
        }


        // Crea varios usuarios mecánicos
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