<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL; 
use Spatie\Permission\Middleware\RoleMiddleware; 

class AppServiceProvider extends ServiceProvider
{
    
    public function register(): void
    {
       
        $this->app->bind('role', function ($app) {
            return new RoleMiddleware();
        });
    }

    public function boot(): void
    {
        
        if (env('APP_ENV') === 'production') {
            URL::forceScheme('https');
        }
    }
}