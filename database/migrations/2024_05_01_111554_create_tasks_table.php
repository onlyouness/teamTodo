<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->string("desc");
            $table->string("status");
            $table->string("priority");
            $table->string("date_start");
            $table->string("date_end");
            $table->foreignId("teamID")->constrained("teams");
            $table->foreignId("userID")->constrained("users");
            $table->timestamps();
       
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
