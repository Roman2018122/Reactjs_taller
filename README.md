# 🚗 AutoCenter - Sistema de Gestión para Taller Mecánico

Frontend desarrollado en **React + TypeScript + Vite**, que consume una API REST construida en **Django REST Framework** para administrar un taller mecánico.

El sistema permite gestionar clientes, vehículos, citas, órdenes de trabajo, diagnósticos, servicios realizados y recomendaciones de mantenimiento mediante autenticación JWT y control de acceso por roles.

---

# 📷 Vista General

El proyecto está dividido en dos grandes módulos:

- Sitio público
- Plataforma administrativa

## Sitio público

- Inicio
- Nosotros
- Servicios
- Contacto
- Login
- Registro

## Plataforma privada

- Panel Cliente
- Panel Empleado
- Panel Administrador

---

# ✨ Características

- SPA desarrollada con React.
- Arquitectura Hexagonal.
- TypeScript.
- React Router.
- TailwindCSS.
- Shadcn UI.
- Axios.
- Zustand.
- React Hook Form.
- Validaciones con Zod.
- Autenticación JWT.
- Control de acceso por roles.
- Consumo de API REST.
- CI/CD mediante GitHub Actions.
- Despliegue automático en VPS.

---

# 🛠 Tecnologías

## Frontend

- React
- TypeScript
- Vite
- React Router DOM
- Zustand
- Axios
- React Hook Form
- Zod
- TailwindCSS
- Shadcn/UI
- Lucide React

## Backend

- Django
- Django REST Framework
- PostgreSQL
- JWT
- drf-spectacular

---

# 📂 Arquitectura

El proyecto utiliza Arquitectura Hexagonal.

```
src
│
├── application
│
├── domain
│
├── infrastructure
│
└── presentation
```

## Domain

Contiene:

- Entidades
- Interfaces
- Excepciones

## Application

Contiene:

- Casos de uso

## Infrastructure

Contiene:

- Axios
- Repositorios
- Configuración
- Factories

## Presentation

Contiene:

- Pages
- Components
- Stores
- Router
- Theme

---

# 📁 Estructura del proyecto

```text
src
│
├── application
│   └── use-cases
│
├── domain
│   ├── entities
│   ├── ports
│   └── exceptions
│
├── infrastructure
│   ├── adapters
│   ├── config
│   ├── factories
│   ├── http
│   └── storage
│
└── presentation
    ├── components
    ├── pages
    ├── router
    ├── stores
    ├── theme
    └── utils
```

---

# 👥 Roles del sistema

## Cliente

Puede:

- Registrarse.
- Iniciar sesión.
- Administrar vehículos.
- Solicitar citas.
- Consultar órdenes.
- Ver diagnósticos.
- Consultar servicios realizados.
- Revisar recomendaciones.

---

## Empleado

Puede:

- Administrar clientes.
- Gestionar vehículos.
- Administrar citas.
- Gestionar órdenes.
- Registrar diagnósticos.
- Actualizar estados.
- Registrar servicios.
- Crear recomendaciones.

---

## Administrador

Puede administrar completamente:

- Usuarios
- Clientes
- Empleados
- Vehículos
- Citas
- Servicios
- Especialidades
- Marcas
- Modelos
- Órdenes

---

# 🚘 Flujo del sistema

Cliente

↓

Registro

↓

Login

↓

Registrar vehículo

↓

Solicitar cita

↓

Recepción del vehículo

↓

Creación de Orden de Trabajo

↓

Diagnóstico

↓

Autorización del cliente (si aplica)

↓

Reparación

↓

Lavado

↓

Entrega

↓

Recomendaciones

---

# 🔐 Autenticación

La autenticación se realiza mediante JWT.

Endpoints:

POST

```
/api/token/
```

POST

```
/api/token/refresh/
```

El frontend almacena:

- Access Token
- Refresh Token

mediante almacenamiento local.

---

# 🌐 API

El proyecto consume una API REST.

Principales recursos:

- Clientes
- Vehículos
- Marcas
- Modelos
- Servicios
- Citas
- Empleados
- Especialidades
- Órdenes
- Diagnósticos
- Servicios realizados
- Recomendaciones

---

# ⚙ Variables de entorno

Crear:

```
.env
```

Ejemplo

```env
VITE_API_BASE_URL=http://localhost:8000/api

VITE_APP_NAME=AutoCenter
```

Producción

```
.env.production
```

---

# 🚀 Instalación

Clonar

```bash
git clone https://github.com/usuario/autocenter-react.git
```

Entrar

```bash
cd autocenter-react
```

Instalar

```bash
npm install
```

Ejecutar

```bash
npm run dev
```

---

# 🏗 Compilar

```bash
npm run build
```

---

# 🧪 Verificar TypeScript

```bash
npx tsc --noEmit
```

---

# 🚀 Despliegue

El proyecto se despliega automáticamente mediante GitHub Actions.

Cada push realizado sobre la rama:

```
main
```

ejecuta:

- Instalación
- Build
- Copia al VPS
- Reinicio del servicio

---

# 🔄 CI/CD

Pipeline

```
GitHub

↓

GitHub Actions

↓

Build React

↓

Servidor VPS

↓

Aplicación publicada
```

---

# 📖 Funcionalidades implementadas

## Públicas

- Inicio
- Nosotros
- Servicios
- Contacto
- Login
- Registro

## Cliente

- Dashboard
- Perfil
- Vehículos
- Citas
- Órdenes
- Diagnósticos
- Servicios realizados
- Recomendaciones

## Empleado

- Dashboard
- Clientes
- Vehículos
- Citas
- Órdenes
- Cambio de estados
- Diagnósticos
- Servicios realizados
- Recomendaciones

## Administrador

- Administración completa del sistema.

---

# 📚 Arquitectura utilizada

El proyecto sigue principios de:

- Clean Architecture
- Arquitectura Hexagonal
- SOLID
- Repository Pattern
- Factory Pattern
- Use Cases
- Separación de responsabilidades

---

# 👨‍💻 Autor

Jonathan Torres

Universidad

Proyecto desarrollado para la asignatura de Programación Web.

---

# 📄 Licencia

Proyecto desarrollado con fines académicos.