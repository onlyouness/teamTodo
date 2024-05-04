<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Team>
 */
class TeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'name' => fake()->sentence(),
          
            'projectID' => fake()->randomElement([1, 2]),
            "image"=>fake()->imageUrl(),
            'created_at' => time(),
            'updated_at' => time(),
        ];
    }
}