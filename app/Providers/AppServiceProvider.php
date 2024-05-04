<?php

namespace App\Providers;

use Illuminate\Support\Facades\Config;
use App\Http\Middleware\CorsMiddleware;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        $this->configureMail();

        $this->app['router']->aliasMiddleware('cors', CorsMiddleware::class);
    }
    protected function configureMail()
    {

        Config::set('mail.mailers.smtp.host', "smtp.gmail.com");
        Config::set('mail.mailers.smtp.port', "587");
        Config::set('mail.mailers.smtp.username', "elyouness765@gmail.com");
        Config::set('mail.mailers.smtp.password', "xjiyivfviiabhqee");
        Config::set('mail.from.address', "elyouness765@gmail.com");
        Config::set('mail.default', 'smtp');
        // \Log::info(print_r($config, true));
    }

}