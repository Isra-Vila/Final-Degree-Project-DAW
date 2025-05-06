<?php

namespace Database\Factories;

use App\Models\Bike;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use Spatie\Permission\Models\Role;

/**
 * @extends \Illuminate\Database\Database\Eloquent\Factories\Factory<\App\Models\Bike>
 */
class BikeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Bike::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $brands = ['Orbea', 'Specialized', 'Trek', 'Giant', 'Custom', null];

        // Obtener ID de un usuario con el rol 'client' (asegurándose de que exista al menos uno)
        $clientUserId = Role::where('name', 'client')->first()->users()->inRandomOrder()->first()->id ?? null;

        // ⭐ Lanzar una excepción si no hay clientes para asignar un dueño
        if (is_null($clientUserId)) {
            throw new \Exception("No client users found to assign an owner to the bike. Please ensure you have seeded client users first.");
        }

        return [
            'brand' => $this->faker->randomElement($brands),
            'model' => $this->faker->optional()->word,
            'handlebar' => $this->faker->optional()->word,
            'stem' => $this->faker->optional()->word,
            'saddle' => $this->faker->optional()->word,
            'frame' => $this->faker->optional()->word,
            'suspension' => $this->faker->optional()->word,
            'pedals' => $this->faker->optional()->word,
            'chain' => $this->faker->optional()->word,
            'tyre' => $this->faker->optional()->word,
            'rim' => $this->faker->optional()->word,
            'tube' => $this->faker->optional()->word,
            'brakes' => $this->faker->optional()->word,
            'year' => $this->faker->optional()->numberBetween(2000, 2025),
            'owner_id' => $clientUserId, // ⭐ Siempre se asigna a un cliente
            'mechanic_id' => null, // ⭐ Siempre null por defecto
            'repair_state' => '',
            'maintenance_state' => '',
        ];
    }
}