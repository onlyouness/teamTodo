<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
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
            'title' => fake()->sentence(),
            'desc' => fake()->realText(),
            'date_start' => time(),
            'date_end' => fake()->dateTimeBetween('now', '+1 year'),
            'status' => fake()
                ->randomElement(['pending', 'in_progress', 'completed']),
      
            'userID' => fake()->randomElement([1, 2]),
            'teamID' => fake()->randomElement([1, 2]),
            'priority' => fake()
                ->randomElement(['low', 'medium', 'high']),
            'created_at' => time(),
            'updated_at' => time(),
        ];
    }
}