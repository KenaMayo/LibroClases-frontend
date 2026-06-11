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


# Estructura Principal

```bash
src/
├── components/         # Componentes reutilizables de la interfaz
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   └── MainLayout.jsx
│
├── context/            # Contextos de React para manejo de estado global
│   └── AuthContext.jsx
│
├── mockdata/           # Datos simulados para pruebas y desarrollo
│
├── pages/              # Páginas principales de la aplicación
│   ├── academic/       # Gestión académica
│   ├── attendance/     # Registro y visualización de asistencias
│   ├── dashboard/      # Dashboard principal con indicadores
│   ├── login/          # Inicio de sesión
│   ├── messages/       # Mensajería interna
│   └── reports/        # Reportes académicos
│
├── services/           # Lógica de conexión con la API backend
│   └── api.js
│
├── App.jsx             # Componente principal de la aplicación
├── main.jsx            # Configuración inicial y rutas
├── index.css           # Estilos globales
└── App.css             # Estilos específicos

public/                 # Recursos estáticos públicos

package.json            # Dependencias y scripts de npm
vite.config.js          # Configuración de Vite
README.md               # Documentación del frontend
```

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


