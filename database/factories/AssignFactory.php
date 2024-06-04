<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class AssignFactory extends Factory
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
            'userID' => fake()->randomElement([1, 2,3,21,22]),
            'taskID' => fake()->randomElement([1, 2,3,4,5]),
            'created_at' => time(),
            'updated_at' => time(),
            
        ];
    }
}