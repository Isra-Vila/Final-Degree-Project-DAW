<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Bicicleta;

class BicicletaServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $cliente;
    protected $mecanico;
    protected $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->cliente = User::factory()->create(['role' => 'cliente']);
        $this->mecanico = User::factory()->create(['role' => 'mecanico']);
        $this->admin = User::factory()->create(['role' => 'administrador']);
    }

    /**
     * Prueba que un cliente autenticado puede registrar una bicicleta.
     * @return void
     */
    public function test_authenticated_cliente_can_register_a_bicicleta()
    {
        $response = $this->actingAs($this->cliente)->postJson('/api/bicicletas', [
            'marca' => 'Trek',
            'modelo' => 'Emonda',
            'numero_serie' => 'TREK123XYZ',
            'descripcion_problema' => 'Ruido en los frenos delanteros',
        ]);

        $response->assertStatus(201) // HTTP 201 Created
                 ->assertJsonStructure(['id', 'marca', 'modelo', 'numero_serie', 'user_id']);

        $this->assertDatabaseHas('bicicletas', [
            'user_id' => $this->cliente->id,
            'numero_serie' => 'TREK123XYZ',
        ]);
    }

    /**
     * Prueba que un cliente puede ver sus propias bicicletas.
     * @return void
     */
    public function test_cliente_can_view_only_their_own_bicicletas()
    {
        $this->actingAs($this->cliente);
        Bicicleta::factory()->create(['user_id' => $this->cliente->id, 'marca' => 'MiBici1']);
        Bicicleta::factory()->create(['user_id' => $this->cliente->id, 'marca' => 'MiBici2']);
        Bicicleta::factory()->create(['user_id' => User::factory()->create(['role' => 'cliente'])->id, 'marca' => 'OtraBici']); // Otra bici de otro cliente

        $response = $this->getJson('/api/bicicletas');

        $response->assertStatus(200)
                 ->assertJsonCount(2) // Esperamos solo 2 bicicletas, las del cliente logueado
                 ->assertJsonFragment(['marca' => 'MiBici1'])
                 ->assertJsonFragment(['marca' => 'MiBici2'])
                 ->assertJsonMissing(['marca' => 'OtraBici']);
    }

    /**
     * Prueba que un administrador puede ver todas las bicicletas.
     * @return void
     */
    public function test_admin_can_view_all_bicicletas()
    {
        Bicicleta::factory()->count(3)->create(['user_id' => $this->cliente->id]);
        Bicicleta::factory()->count(2)->create(['user_id' => User::factory()->create(['role' => 'cliente'])->id]);

        $response = $this->actingAs($this->admin)->getJson('/api/bicicletas');

        $response->assertStatus(200)
                 ->assertJsonCount(5); // Esperamos todas las 5 bicicletas
    }

    /**
     * Prueba que un usuario no autenticado no puede registrar una bicicleta.
     * @return void
     */
    public function test_unauthenticated_user_cannot_register_a_bicicleta()
    {
        $response = $this->postJson('/api/bicicletas', [
            'marca' => 'Giant',
            'modelo' => 'Defy',
            'numero_serie' => 'GIANTXYZABC',
            'descripcion_problema' => 'Necesita ajuste de cambios',
        ]);

        $response->assertStatus(401); // HTTP 401 Unauthorized
    }
}