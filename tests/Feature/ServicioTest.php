<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Bicicleta;
use App\Models\Servicio;

class ServicioTest extends TestCase
{
    use RefreshDatabase;

    protected $cliente;
    protected $mecanico;
    protected $admin;
    protected $bicicleta;

    protected function setUp(): void
    {
        parent::setUp();
        $this->cliente = User::factory()->create(['role' => 'cliente']);
        $this->mecanico = User::factory()->create(['role' => 'mecanico']);
        $this->admin = User::factory()->create(['role' => 'administrador']);
        $this->bicicleta = Bicicleta::factory()->create(['user_id' => $this->cliente->id]);
    }

    /**
     * Prueba que un cliente puede crear un servicio para su bicicleta.
     * @return void
     */
    public function test_cliente_can_create_a_service_for_their_bicicleta()
    {
        $response = $this->actingAs($this->cliente)->postJson('/api/servicios', [
            'bicicleta_id' => $this->bicicleta->id,
            'tipo' => 'reparacion',
            'descripcion_problema' => 'Freno trasero no funciona bien',
            'fecha_inicio' => now()->format('Y-m-d H:i:s'),
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['id', 'bicicleta_id', 'cliente_id', 'tipo', 'estado']);

        $this->assertDatabaseHas('servicios', [
            'bicicleta_id' => $this->bicicleta->id,
            'cliente_id' => $this->cliente->id,
            'tipo' => 'reparacion',
            'estado' => 'pendiente', 
        ]);
    }

    /**
     * Prueba que un cliente puede ver el estado de sus servicios.
     * @return void
     */
    public function test_cliente_can_view_status_of_their_services()
    {
        $service1 = Servicio::factory()->create([
            'bicicleta_id' => $this->bicicleta->id,
            'cliente_id' => $this->cliente->id,
            'tipo' => 'mantenimiento',
            'estado' => 'en_proceso'
        ]);
        
        Servicio::factory()->create([
            'bicicleta_id' => Bicicleta::factory()->create(['user_id' => User::factory()->create(['role' => 'cliente'])->id])->id,
            'cliente_id' => User::factory()->create(['role' => 'cliente'])->id,
            'tipo' => 'reparacion',
            'estado' => 'completado'
        ]);

        $response = $this->actingAs($this->cliente)->getJson('/api/servicios');

        $response->assertStatus(200)
                 ->assertJsonCount(1) 
                 ->assertJsonFragment(['id' => $service1->id, 'estado' => 'en_proceso'])
                 ->assertJsonMissing(['estado' => 'completado']);
    }

    /**
     * Prueba que un mecánico puede actualizar el estado de un servicio asignado.
     * @return void
     */
    public function test_mecanico_can_update_status_of_assigned_service()
    {
        $service = Servicio::factory()->create([
            'bicicleta_id' => $this->bicicleta->id,
            'cliente_id' => $this->cliente->id,
            'mecanico_id' => $this->mecanico->id,
            'estado' => 'pendiente',
        ]);

        $response = $this->actingAs($this->mecanico)->putJson("/api/servicios/{$service->id}", [
            'estado' => 'en_proceso',
        ]);

        $response->assertStatus(200)
                 ->assertJson(['estado' => 'en_proceso']);

        $this->assertDatabaseHas('servicios', [
            'id' => $service->id,
            'estado' => 'en_proceso',
        ]);
    }

    /**
     * Prueba que un mecánico no puede actualizar el estado de un servicio no asignado.
     * @return void
     */
    public function test_mecanico_cannot_update_status_of_unassigned_service()
    {
        $otherMecanico = User::factory()->create(['role' => 'mecanico']);
        $service = Servicio::factory()->create([
            'bicicleta_id' => $this->bicicleta->id,
            'cliente_id' => $this->cliente->id,
            'mecanico_id' => $otherMecanico->id, 
            'estado' => 'pendiente',
        ]);

        $response = $this->actingAs($this->mecanico)->putJson("/api/servicios/{$service->id}", [
            'estado' => 'en_proceso',
        ]);

        $response->assertStatus(403); 
        $this->assertDatabaseHas('servicios', ['id' => $service->id, 'estado' => 'pendiente']); 
    }

    /**
     * Prueba que un administrador puede actualizar el estado de cualquier servicio.
     * @return void
     */
    public function test_admin_can_update_status_of_any_service()
    {
        $service = Servicio::factory()->create([
            'bicicleta_id' => $this->bicicleta->id,
            'cliente_id' => $this->cliente->id,
            'estado' => 'pendiente',
        ]);

        $response = $this->actingAs($this->admin)->putJson("/api/servicios/{$service->id}", [
            'estado' => 'completado',
        ]);

        $response->assertStatus(200)
                 ->assertJson(['estado' => 'completado']);

        $this->assertDatabaseHas('servicios', [
            'id' => $service->id,
            'estado' => 'completado',
        ]);
    }

    /**
     * Prueba que un usuario no autenticado no puede acceder a los servicios.
     * @return void
     */
    public function test_unauthenticated_user_cannot_access_services()
    {
        $service = Servicio::factory()->create();
        $response = $this->getJson('/api/servicios');
        $response->assertStatus(401); 
        $response = $this->postJson('/api/servicios', ['tipo' => 'reparacion']);
        $response->assertStatus(401);
    }
}