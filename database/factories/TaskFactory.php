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
            'title' => fake()->sentence(2),
            'desc' => fake()->realText(),
            'date_start' => time(),
            'date_end' => fake()->dateTimeBetween('now', '+1 year'),
            'status' => fake()
                ->randomElement(['Pending', 'In progress', 'Completed']),
      
            
            'teamID' => fake()->randomElement([1, 2,3]),
            'priority' => fake()
                ->randomElement(['low', 'medium', 'high']),
            'created_at' => time(),
            'updated_at' => time(),
        ];
    }
}