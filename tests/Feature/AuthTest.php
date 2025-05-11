<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class AuthTest extends TestCase
{
    use RefreshDatabase; // Limpia la base de datos antes de cada prueba

    /**
     * Prueba que un usuario puede registrarse exitosamente como cliente.
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

        $response->assertStatus(201) // HTTP 201 Created
                 ->assertJsonStructure(['user', 'token'])
                 ->assertJson([
                     'user' => [
                         'email' => 'nuevo.cliente@example.com',
                         'role' => 'cliente', // Verificar que el rol por defecto es 'cliente'
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

        $response->assertStatus(422) // HTTP 422 Unprocessable Entity (errores de validación)
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

        $response->assertStatus(200) // HTTP 200 OK
                 ->assertJsonStructure(['user', 'token']);

        $this->assertAuthenticatedAs($user); // Verifica que el usuario está autenticado
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

        $response->assertStatus(401) // HTTP 401 Unauthorized
                 ->assertJson(['message' => 'Credenciales inválidas']);
    }
}