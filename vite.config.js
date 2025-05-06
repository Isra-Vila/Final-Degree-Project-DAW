import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import fs from 'fs';  // Importa fs para leer los archivos

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        
        //origin: 'https://tripasion.com',  // Aquí definimos el origen correcto
        hmr: {
            protocol: 'ws',  // WebSockets seguros, porque usas HTTPS
            host: 'localhost',  // Usamos el mismo dominio para HMR
            port: 5173,  // El puerto para HMR
        },
        proxy: {
            '/api': {
                target: 'https://tripasion.com',  // Dirección de tu servidor backend con HTTPS
                changeOrigin: true,
                secure: true,  // Como el backend también usa HTTPS, ponlo en true
            },
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        react({
            // ⭐ ¡Añade esta línea para deshabilitar Fast Refresh!
            fastRefresh: false,
        }),
    ],
});
