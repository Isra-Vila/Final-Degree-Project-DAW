import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        
        
        hmr: {
            protocol: 'ws',  
            host: 'localhost',  
            port: 5173,  
        },
        proxy: {
            '/api': {
                target: 'https://tripasion.com',  
                changeOrigin: true,
                secure: true,  
            },
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        react({
            
            fastRefresh: false,
        }),
    ],
});
