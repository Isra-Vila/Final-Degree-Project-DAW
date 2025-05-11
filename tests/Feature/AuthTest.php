<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class AuthTest extends TestCase
{
    use RefreshDatabase; 

    /**
     * Prueba que un usuario puede registrarse como cliente con credenciales válidas.
     * @return void
     */
    public function test_user_can_register_as_cliente_with_valid_credentials()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Nuevo Cliente',
            'email' => 'nuevo.cliente@example.com',
            'password' => 'passwordSegura123',
            'password_confirmation' => 'passwordSegura123',
        ]);

        $response->assertStatus(201) 
                 ->assertJsonStructure(['user', 'token'])
                 ->assertJson([
                     'user' => [
                         'email' => 'nuevo.cliente@example.com',
                         'role' => 'cliente', 
                     ]
                 ]);

        $this->assertDatabaseHas('users', [
            'email' => 'nuevo.cliente@example.com',
            'name' => 'Nuevo Cliente',
            'role' => 'cliente',
        ]);
    }

    /**
     * Prueba que un usuario no puede registrarse con un email ya existente.
     * @return void
     */
    public function test_user_cannot_register_with_existing_email()
    {
        User::factory()->create(['email' => 'existente@example.com']);

        $response = $this->postJson('/api/register', [
            'name' => 'Otro Usuario',
            'email' => 'existente@example.com',
            'password' => 'passwordSegura123',
            'password_confirmation' => 'passwordSegura123',
        ]);

        $response->assertStatus(422) 
                 ->assertJsonValidationErrors(['email']);
    }

    /**
     * Prueba que un usuario puede iniciar sesión con credenciales correctas.
     * @return void
     */
    public function test_user_can_login_with_correct_credentials()
    {
        $user = User::factory()->create([
            'email' => 'test_login@example.com',
            'password' => bcrypt('passwordCorrecta'),
            'role' => 'cliente'
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'test_login@example.com',
            'password' => 'passwordCorrecta',
        ]);

        $response->assertStatus(200) 
                 ->assertJsonStructure(['user', 'token']);

        $this->assertAuthenticatedAs($user); 
    }

    /**
     * Prueba que un usuario no puede iniciar sesión con credenciales incorrectas.
     * @return void
     */
    public function test_user_cannot_login_with_incorrect_credentials()
    {
        User::factory()->create([
            'email' => 'wrong_login@example.com',
            'password' => bcrypt('correct_password'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'wrong_login@example.com',
            'password' => 'incorrect_password',
        ]);

        $response->assertStatus(401) 
                 ->assertJson(['message' => 'Credenciales inválidas']);
    }
}