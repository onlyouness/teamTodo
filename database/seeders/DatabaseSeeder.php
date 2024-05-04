<?php

namespace Database\Seeders;

use App\Models\Team;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        //     "image"=>"/upload/profiles/default.jpg",
        //     'password' => bcrypt('1234'),
        // ]);
        Team::factory()
        ->count(10)
        ->hasTasks(15)
        ->create();
    }
}