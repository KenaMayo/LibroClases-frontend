# LibroClases Frontend

Frontend de **LibroClases**, desarrollado con **React + Vite**, enfocado en brindar una interfaz moderna, rápida y funcional para la gestión e interacción dentro del sistema.

## Descripción

Este repositorio contiene la parte visual de la aplicación **LibroClases**. Aquí se implementa la experiencia de usuario, la navegación, la lógica del cliente y los estilos necesarios para operar desde el navegador.

## Tecnologías usadas

Según la composición del repositorio:

- **JavaScript** — 94.6%
- **CSS** — 5.1%
- **HTML** — 0.3%

Además, el proyecto está basado en:

- **React**
- **Vite**
- **ESLint**

## Características generales

- Interfaz web del sistema LibroClases
- Arquitectura enfocada en frontend moderno
- Desarrollo rápido con Vite
- Componentes reutilizables con React
- Estilos personalizados con CSS

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/KenaMayo/LibroClases-frontend.git
```

Accede a la carpeta del proyecto:

```bash
cd LibroClases-frontend
```

Instala las dependencias:

```bash
npm install
```

## Estructura esperada del proyecto

Dentro de este frontend se pueden encontrar elementos como:

- Componentes de interfaz
- Vistas o páginas
- Estilos globales y por componente
- Recursos estáticos
- Configuración del entorno de desarrollo

##  Estructura principal
src/
Carpeta principal del código fuente.

components/
Componentes reutilizables de la interfaz, como la barra de navegación (Navbar.jsx), el menú lateral (Sidebar.jsx) y el layout principal (MainLayout.jsx).
context/
Contextos de React para manejo de estado global, como la autenticación (AuthContext.jsx).
mockdata/
Datos simulados para pruebas y desarrollo.
pages/
Páginas principales de la aplicación, organizadas por funcionalidad:
academic/: Página de gestión académica.
attendance/: Página de registro y visualización de asistencias.
dashboard/: Página principal con resumen e indicadores.
login/: Página de inicio de sesión y sus componentes.
messages/: Página de mensajería interna.
reports/: Página de reportes académicos.
services/
Lógica para interactuar con la API del backend (api.js).
App.jsx, main.jsx
Archivos de entrada de la aplicación y configuración de rutas.
index.css, App.css
Archivos de estilos globales y específicos.
public/
Archivos estáticos y recursos públicos.

package.json
Configuración de dependencias y scripts de npm.

vite.config.js
Configuración de Vite para el desarrollo y build.

README.md
Documentación del frontend.

## Características
Framework: React 18+ con Vite para desarrollo rápido y eficiente.
Componentización: Uso de componentes reutilizables para una interfaz consistente.
Gestión de estado: Context API para autenticación y otros estados globales.
Consumo de API: Comunicación con el backend para obtener y enviar datos académicos.
Rutas protegidas: Acceso restringido a ciertas páginas según el estado de autenticación.
Estilos modernos: CSS modularizado para mantener el código limpio y escalable.

## Propósito

El objetivo de este proyecto es servir como la capa de presentación de **LibroClases**, permitiendo a los usuarios interactuar con el sistema de manera intuitiva y eficiente.

## Estado del proyecto

En desarrollo.


