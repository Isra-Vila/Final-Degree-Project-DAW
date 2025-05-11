<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Web Tripasión

¡Bienvenido al repositorio del proyecto "Web Tripasión"! Esta aplicación web es una plataforma integral para la tienda de deportes Tripasión, ofreciendo funcionalidades tanto para la gestión de un taller de bicicletas como para una futura tienda online.

## 🚀 Características Principales

La aplicación está diseñada para ser utilizada por tres tipos de usuarios:

* **Clientes:**
    * Registro y gestión de bicicletas para servicios de taller (reparaciones, mantenimiento, montajes personalizados).
    * Consulta del estado en tiempo real de los servicios de su bicicleta.
    * (Futuro)Comunicación directa con el mecánico asignado a través de un chat integrado.
    * (Futuro) Compras online en la tienda.
* **Mecánicos:**
    * Acceso a una vista organizada de los servicios pendientes y asignados.
    * Capacidad para actualizar el estado de las bicicletas en reparación.
    * (Futuro)Consulta del stock de piezas y artículos.
    * (Futuro)Comunicación con los clientes a través del chat.
* **Administradores:**
    * Gestión completa de usuarios (clientes, mecánicos, otros administradores).
    * (Futuro)Gestión de citas del taller.
    * Gestión de bicicletas.
    * (Futuro)Gestión de stock de taller/tienda.
    * (Futuro)Gestión de horarios del taller.
    * (Futuro)Gestión de documentos relacionados.

## 🛠️ Tecnologías Utilizadas

Este proyecto ha sido desarrollado utilizando un stack moderno y robusto:

* **Backend:** [Laravel](https://laravel.com/) (PHP Framework)
    * Implementación de una API RESTful para la comunicación con el frontend.
    * Base de datos: [MySQL](https://www.mysql.com/)
* **Frontend:** [React](https://react.dev/) (Librería de JavaScript para interfaces de usuario)
    * Desarrollado con [TypeScript](https://www.typescriptlang.org/) para una mejor tipificación, escalabilidad y robustez del código.
    * Manejo de rutas y navegación con [React Router DOM](https://reactrouter.com/en/main).
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/) (Framework CSS Utility-First)
* **Compilador/Bundler:** [Vite](https://vitejs.dev/) (Herramienta de construcción de próxima generación para proyectos web)
* **Servidor Web (Desarrollo):** Apache (utilizado en macOS para el entorno de desarrollo)
* **Gestión de Dependencias:**
    * [Composer](https://getcomposer.org/) (para PHP/Laravel)
    * [npm](https://www.npmjs.com/) (Node Package Manager, para Node.js/React/Vite)
* **Control de Versiones:** [Git](https://git-scm.com/) / [GitHub](https://github.com/)

## 💻 Requisitos del Sistema

Para ejecutar este proyecto localmente, necesitarás tener instalado:

* **PHP >= 8.1**
* **Node.js >= 16**
* **Composer**
* **npm** (o Yarn)
* **MySQL** (o un gestor de bases de datos compatible)
* **Un servidor web** (Apache o Nginx)

## 🚀 Instalación y Configuración Local

Sigue estos pasos para poner en marcha el proyecto en tu máquina local:


### 1. Clonar el Repositorio

bash
git clone [https://github.com/Isra-Vila/Final-Degree-Project-DAW](https://github.com/Isra-Vila/Final-Degree-Project-DAW)
cd Tripasion # O el nombre de tu carpeta raíz del proyecto


### 2. Configuración del Backend (Laravel)
Instalar Dependencias de Composer:

Bash
composer install

Crear Archivo de Entorno:
Copia el archivo de ejemplo .env.example a .env:

Bash
cp .env.example .env
Generar Clave de Aplicación:

Bash

php artisan key:generate
Configurar la Base de Datos:
Abre el archivo .env y configura tus credenciales de la base de datos MySQL. Asegúrate de tener una base de datos creada previamente en tu servidor MySQL con el nombre que especifiques aquí.

Fragmento de código

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=[TU_NOMBRE_DE_BASE_DE_DATOS]
DB_USERNAME=[TU_USUARIO_DE_MYSQL]
DB_PASSWORD=[TU_CONTRASEÑA_DE_MYSQL]
También, asegúrate de que APP_URL apunte a tu dominio local donde Apache esté sirviendo la aplicación Laravel:

Fragmento de código

APP_URL=http://localhost:8000 # O la URL de tu servidor Apache, si usas un Virtual Host
Si usas CORS para tu API (lo cual es común en configuraciones de frontend/backend separados, incluso en desarrollo), asegúrate de que tu dominio frontend esté permitido en config/cors.php:

PHP

// config/cors.php
// ...
'allowed_origins' => ['http://localhost:5173'], // O el puerto de Vite si es diferente
// ...
Ejecutar Migraciones y Seeders (Opcional, para datos de prueba):

Bash
php artisan migrate
php artisan db:seed # Ejecutar para poblar la base de datos con datos de prueba

Configurar el Servidor Web (Apache/Nginx):
Asegúrate de que tu servidor web (Apache en tu caso) esté configurado para apuntar a la carpeta public de tu proyecto Laravel. Esto es crucial para que el servidor web sepa dónde encontrar los archivos de tu aplicación. Para Apache en macOS, esto a menudo implica configurar un Virtual Host en httpd-vhosts.conf o similar.


### 3. Configuración del Frontend (React/Vite)
Instalar Dependencias de NPM:

Bash
npm install

Configurar Variables de Entorno de Frontend:

Fragmento de código

# En el archivo .env en la raíz de tu proyecto Laravel
VITE_API_URL=http://localhost:8000/api # Asegúrate de que coincida con la URL de tu API de Laravel
Asegúrate de que tu vite.config.js apunte a la carpeta public/build de Laravel para la salida de los assets compilados, lo cual ya deberías tener configurado.


### 4. Ejecutar el Proyecto (Modo Producción Local)
Para ejecutar la aplicación con los assets de frontend ya compilados (como en un entorno de producción o para pruebas del build), sigue estos pasos:

Compilar los Assets del Frontend:
Primero, asegúrate de que los archivos de tu aplicación React estén compilados y listos. Esto generará los archivos optimizados (CSS, JavaScript) en la carpeta public/build de tu proyecto Laravel.

Bash
npm run build

Limpiar Cachés de Laravel:
Después de compilar, es una buena práctica limpiar las cachés de Laravel para asegurar que se usen las últimas versiones de configuración, rutas y vistas:

Bash
php artisan config:clear
php artisan cache:clear
php artisan view:clear


🤝 Contribución
Si deseas contribuir a este proyecto, por favor, ponte en contacto con Israel Vilavert para discutir los detalles:
    - isvium@gmail.com
    - https://www.linkedin.com/in/isravilavert/
 

