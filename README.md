`<p align="center"><a href="https://github.com/Isra-Vila/Final-Degree-Project-DAW" target="_blank"><img src="/path/to/logo.png" width="400" alt="Tripasión Logo"></a></p>``<p align="center">
<a href="https://github.com/Isra-Vila/Final-Degree-Project-DAW"><img src="https://img.shields.io/badge/Estado-En%20Desarrollo-yellow" alt="Estado del Proyecto"></a>
<a href="https://github.com/Isra-Vila/Final-Degree-Project-DAW"><img src="https://img.shields.io/badge/Versión-1.0.0-blue" alt="Versión"></a>
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/Licencia-MIT-green" alt="Licencia"></a>
<a href="https://laravel.com"><img src="https://img.shields.io/badge/Laravel-10.x-red" alt="Laravel"></a>
<a href="https://react.dev"><img src="https://img.shields.io/badge/React-18.x-blue" alt="React"></a>
</p>`## Sobre Web Tripasión

Web Tripasión es una aplicación web integral para la tienda de deportes Tripasión, que ofrece una plataforma completa para la gestión de un taller de bicicletas y una futura tienda online. El proyecto combina un potente backend desarrollado en Laravel con un frontend moderno en React, proporcionando una experiencia fluida tanto para clientes como para el personal de la tienda.

## Características Principales

La aplicación está diseñada para tres tipos de usuarios, cada uno con funcionalidades específicas:

### Clientes

- Registro y gestión de bicicletas para servicios de taller (reparaciones, mantenimiento, montajes personalizados)
- Consulta del estado en tiempo real de los servicios de su bicicleta
- Comunicación directa con el mecánico asignado a través de un chat integrado
- *(Futuro)* Compras online en la tienda


### Mecánicos

- Vista organizada de los servicios pendientes y asignados
- Actualización del estado de las bicicletas en reparación
- Consulta del stock de piezas y artículos
- Comunicación con los clientes a través del chat


### Administradores

- Gestión completa de usuarios (clientes, mecánicos, otros administradores)
- Gestión de citas del taller
- Gestión de bicicletas y su historial de servicio
- Gestión de stock de taller/tienda
- Gestión de horarios del taller
- Gestión de documentos relacionados


## Capturas de Pantalla

`<p align="center">
<img src="/path/to/screenshot-client.png" width="600" alt="Panel de Cliente">
<p align="center"><em>Vista del panel de control para clientes donde pueden gestionar sus bicicletas y servicios</em></p>
</p>``<p align="center">
<img src="/path/to/screenshot-mechanic.png" width="600" alt="Panel de Mecánico">
<p align="center"><em>Interfaz para mecánicos con listado de servicios pendientes y en proceso</em></p>
</p>``<p align="center">
<img src="/path/to/screenshot-admin.png" width="600" alt="Panel de Administración">
<p align="center"><em>Vista del panel de administración con acceso a todas las funcionalidades</em></p>
</p>`## Arquitectura del Proyecto

```mermaid
Diagram.download-icon {
            cursor: pointer;
            transform-origin: center;
        }
        .download-icon .arrow-part {
            transition: transform 0.35s cubic-bezier(0.35, 0.2, 0.14, 0.95);
             transform-origin: center;
        }
        button:has(.download-icon):hover .download-icon .arrow-part, button:has(.download-icon):focus-visible .download-icon .arrow-part {
          transform: translateY(-1.5px);
        }
        #mermaid-diagram-rld4{font-family:var(--font-geist-sans);font-size:12px;fill:#000000;}#mermaid-diagram-rld4 .error-icon{fill:#552222;}#mermaid-diagram-rld4 .error-text{fill:#552222;stroke:#552222;}#mermaid-diagram-rld4 .edge-thickness-normal{stroke-width:1px;}#mermaid-diagram-rld4 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-diagram-rld4 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-diagram-rld4 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-diagram-rld4 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-diagram-rld4 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-diagram-rld4 .marker{fill:#666;stroke:#666;}#mermaid-diagram-rld4 .marker.cross{stroke:#666;}#mermaid-diagram-rld4 svg{font-family:var(--font-geist-sans);font-size:12px;}#mermaid-diagram-rld4 p{margin:0;}#mermaid-diagram-rld4 .label{font-family:var(--font-geist-sans);color:#000000;}#mermaid-diagram-rld4 .cluster-label text{fill:#333;}#mermaid-diagram-rld4 .cluster-label span{color:#333;}#mermaid-diagram-rld4 .cluster-label span p{background-color:transparent;}#mermaid-diagram-rld4 .label text,#mermaid-diagram-rld4 span{fill:#000000;color:#000000;}#mermaid-diagram-rld4 .node rect,#mermaid-diagram-rld4 .node circle,#mermaid-diagram-rld4 .node ellipse,#mermaid-diagram-rld4 .node polygon,#mermaid-diagram-rld4 .node path{fill:#eee;stroke:#999;stroke-width:1px;}#mermaid-diagram-rld4 .rough-node .label text,#mermaid-diagram-rld4 .node .label text{text-anchor:middle;}#mermaid-diagram-rld4 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-diagram-rld4 .node .label{text-align:center;}#mermaid-diagram-rld4 .node.clickable{cursor:pointer;}#mermaid-diagram-rld4 .arrowheadPath{fill:#333333;}#mermaid-diagram-rld4 .edgePath .path{stroke:#666;stroke-width:2.0px;}#mermaid-diagram-rld4 .flowchart-link{stroke:#666;fill:none;}#mermaid-diagram-rld4 .edgeLabel{background-color:white;text-align:center;}#mermaid-diagram-rld4 .edgeLabel p{background-color:white;}#mermaid-diagram-rld4 .edgeLabel rect{opacity:0.5;background-color:white;fill:white;}#mermaid-diagram-rld4 .labelBkg{background-color:rgba(255, 255, 255, 0.5);}#mermaid-diagram-rld4 .cluster rect{fill:hsl(0, 0%, 98.9215686275%);stroke:#707070;stroke-width:1px;}#mermaid-diagram-rld4 .cluster text{fill:#333;}#mermaid-diagram-rld4 .cluster span{color:#333;}#mermaid-diagram-rld4 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:var(--font-geist-sans);font-size:12px;background:hsl(-160, 0%, 93.3333333333%);border:1px solid #707070;border-radius:2px;pointer-events:none;z-index:100;}#mermaid-diagram-rld4 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#000000;}#mermaid-diagram-rld4 .flowchart-link{stroke:hsl(var(--gray-400));stroke-width:1px;}#mermaid-diagram-rld4 .marker,#mermaid-diagram-rld4 marker,#mermaid-diagram-rld4 marker *{fill:hsl(var(--gray-400))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-rld4 .label,#mermaid-diagram-rld4 text,#mermaid-diagram-rld4 text>tspan{fill:hsl(var(--black))!important;color:hsl(var(--black))!important;}#mermaid-diagram-rld4 .background,#mermaid-diagram-rld4 rect.relationshipLabelBox{fill:hsl(var(--white))!important;}#mermaid-diagram-rld4 .entityBox,#mermaid-diagram-rld4 .attributeBoxEven{fill:hsl(var(--gray-150))!important;}#mermaid-diagram-rld4 .attributeBoxOdd{fill:hsl(var(--white))!important;}#mermaid-diagram-rld4 .label-container,#mermaid-diagram-rld4 rect.actor{fill:hsl(var(--white))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-rld4 line{stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-rld4 :root{--mermaid-font-family:var(--font-geist-sans);}Cliente (Navegador)Frontend (React/TypeScript)API RESTful (Laravel)Base de Datos (MySQL)Vite (Bundler)Servicios LaravelAutenticaciónGestión de BicicletasGestión de ServiciosChatGestión de Stock
```

## Tecnologías Utilizadas

### Backend

- **[Laravel](https://laravel.com/)** - Framework PHP para el desarrollo de la API RESTful
- **[MySQL](https://www.mysql.com/)** - Sistema de gestión de bases de datos


### Frontend

- **[React](https://react.dev/)** - Biblioteca JavaScript para la interfaz de usuario
- **[TypeScript](https://www.typescriptlang.org/)** - Superset de JavaScript con tipado estático
- **[React Router DOM](https://reactrouter.com/)** - Enrutamiento para aplicaciones React


### Estilos y Herramientas

- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Vite](https://vitejs.dev/)** - Herramienta de compilación y servidor de desarrollo


### Entorno de Desarrollo

- **Apache** - Servidor web local (macOS)
- **Composer** - Gestor de dependencias para PHP
- **npm** - Gestor de paquetes para Node.js
- **Git/GitHub** - Control de versiones


## Requisitos del Sistema

Para ejecutar este proyecto localmente, necesitarás:

- **PHP** >= 8.1
- **Node.js** >= 16
- **Composer**
- **npm** (o Yarn)
- **MySQL** (o un gestor de bases de datos compatible)
- **Servidor web** (Apache o Nginx)


## Instalación y Configuración Local

### 1. Clonar el Repositorio

```shellscript
git clone https://github.com/Isra-Vila/Final-Degree-Project-DAW.git
cd Final-Degree-Project-DAW
```

### 2. Configuración del Backend (Laravel)

#### Instalar Dependencias de Composer

```shellscript
composer install
```

#### Crear Archivo de Entorno

```shellscript
cp .env.example .env
```

#### Generar Clave de Aplicación

```shellscript
php artisan key:generate
```

#### Configurar la Base de Datos

Edita el archivo `.env` con tus credenciales de MySQL:

```plaintext
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tripasion
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
```

#### Ejecutar Migraciones y Seeders

```shellscript
php artisan migrate
php artisan db:seed  # Solo si tienes seeders configurados
```

### 3. Configuración del Frontend (React/Vite)

#### Instalar Dependencias de NPM

```shellscript
npm install
```

#### Configurar Variables de Entorno del Frontend

Asegúrate de que tu archivo `.env` incluya las variables necesarias para el frontend:

```plaintext
VITE_API_URL=http://localhost:8000/api
```

### 4. Ejecutar el Proyecto

#### Terminal 1: Iniciar el Servidor de Laravel

```shellscript
php artisan serve
```

#### Terminal 2: Iniciar el Servidor de Desarrollo de Vite

```shellscript
npm run dev
```

Ahora puedes acceder a la aplicación en tu navegador:

- Frontend: [http://localhost:5173](http://localhost:5173) (o la URL que te indique Vite)
- API: [http://localhost:8000/api](http://localhost:8000/api)


## Compilar para Producción

Cuando estés listo para desplegar la aplicación:

```shellscript
npm run build
```

Luego, limpia las cachés de Laravel:

```shellscript
php artisan config:clear
php artisan cache:clear
php artisan view:clear
```

## Despliegue

### Despliegue en Railway

Para desplegar esta aplicación en Railway, configura las siguientes variables de entorno:

- `APP_URL`: URL pública de tu aplicación
- `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`: Credenciales de la base de datos
- `VITE_API_URL`: URL de tu API
- `APP_KEY`: Clave de cifrado de Laravel


Railway debería detectar automáticamente tus scripts de build y start definidos en `package.json` y Composer.

## Documentación API

La API RESTful de Web Tripasión proporciona los siguientes endpoints principales:

### Autenticación

| Método | Endpoint | Descripción
|-----|-----|-----
| POST | `/api/auth/login` | Iniciar sesión
| POST | `/api/auth/register` | Registrar nuevo usuario
| POST | `/api/auth/logout` | Cerrar sesión
| GET | `/api/auth/user` | Obtener usuario actual


### Bicicletas

| Método | Endpoint | Descripción
|-----|-----|-----
| GET | `/api/bikes` | Listar bicicletas del usuario
| GET | `/api/bikes/{id}` | Obtener detalles de una bicicleta
| POST | `/api/bikes` | Registrar nueva bicicleta
| PUT | `/api/bikes/{id}` | Actualizar información de bicicleta
| DELETE | `/api/bikes/{id}` | Eliminar bicicleta


### Servicios

| Método | Endpoint | Descripción
|-----|-----|-----
| GET | `/api/services` | Listar servicios
| GET | `/api/services/{
