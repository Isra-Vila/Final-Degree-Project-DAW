<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('bikes', function (Blueprint $table) {
            $table->id(); 
            $table->string('brand')->nullable();
            $table->string('model')->nullable();
            $table->string('handlebar')->nullable();
            $table->string('stem')->nullable();
            $table->string('saddle')->nullable();
            $table->string('frame')->nullable();
            $table->string('suspension')->nullable();
            $table->string('pedals')->nullable();
            $table->string('chain')->nullable();
            $table->string('tyre')->nullable();
            $table->string('rim')->nullable();
            $table->string('tube')->nullable();
            $table->string('brakes')->nullable();
            $table->integer('year')->nullable();
            $table->foreignId('owner_id')->constrained('users')->onDelete('cascade'); 
            $table->foreignId('mechanic_id')->nullable()->constrained('users')->onDelete('set null'); 
            $table->string('repair_state')->default('');
            $table->string('maintenance_state')->default('');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bikes');
    }
};