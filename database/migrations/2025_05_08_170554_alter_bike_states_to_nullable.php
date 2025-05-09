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
        Schema::table('bikes', function (Blueprint $table) {
            // Haz que las columnas 'repair_state' y 'maintenance_state'
            // puedan aceptar valores nulos (NULL).
            // Si tienen un default('') ahora, esto los cambiará a nullable.
            // Los datos existentes de '' se mantendrán como cadenas vacías.
            $table->string('repair_state')->nullable()->change();
            $table->string('maintenance_state')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bikes', function (Blueprint $table) {
            // Esto revertirá las columnas a no anulables (NOT NULL).
            // Si hay valores NULL en la tabla después de ejecutar 'up',
            // este método 'down' fallará al intentar revertir.
            // En un entorno de desarrollo, no suele ser un problema grave.
            $table->string('repair_state')->nullable(false)->change();
            $table->string('maintenance_state')->nullable(false)->change();
        });
    }
};