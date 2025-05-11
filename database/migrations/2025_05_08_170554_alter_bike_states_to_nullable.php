<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::table('bikes', function (Blueprint $table) {
           
            $table->string('repair_state')->nullable()->change();
            $table->string('maintenance_state')->nullable()->change();
        });
    }

    
    public function down(): void
    {
        Schema::table('bikes', function (Blueprint $table) {
            
            $table->string('repair_state')->nullable(false)->change();
            $table->string('maintenance_state')->nullable(false)->change();
        });
    }
};