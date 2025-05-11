<?php

namespace Database\Factories;

use App\Models\Bike;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use Spatie\Permission\Models\Role;


class BikeFactory extends Factory
{
    
    protected $model = Bike::class;

    
    public function definition(): array
    {
        $brands = ['Orbea', 'Specialized', 'Trek', 'Giant', 'Custom', null];

        
        $clientUserId = Role::where('name', 'client')->first()->users()->inRandomOrder()->first()->id ?? null;

        
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
            'owner_id' => $clientUserId, 
            'mechanic_id' => null, 
            'repair_state' => '',
            'maintenance_state' => '',
        ];
    }
}