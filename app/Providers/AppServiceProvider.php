<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL; // <-- ¡Añade esta línea!
use Spatie\Permission\Middleware\RoleMiddleware; // ⭐ ¡Esta ya la tienes!

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // ⭐ ¡Este binding para el middleware 'role' ya lo tienes, mantenlo!
        $this->app->bind('role', function ($app) {
            return new RoleMiddleware();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Añade estas líneas aquí
        if (env('APP_ENV') === 'production') {
            URL::forceScheme('https');
        }
    }
}