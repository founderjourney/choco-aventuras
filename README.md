# 🏍️ Chocó Aventuras - Sistema de Alquiler de Cuadriciclos

Aplicación web completa para gestión de alquiler de cuadriciclos, desarrollada con **Next.js 15** como monorepo full-stack.

## 🎯 Estado del Proyecto: **COMPLETADO FASE 1** ✅

**Fecha de actualización:** Octubre 2024
**Versión:** 1.0.0 - MVP Completo
**URL Demo:** http://localhost:3001

## 🚀 Características Implementadas

- ✅ **Monorepo full-stack** con Next.js 15
- ✅ **API Routes** integradas para backend
- ✅ **Base de datos** simulada con TypeScript
- ✅ **UI moderna** con TailwindCSS + Radix UI optimizada
- ✅ **Gestión de estado** con React Query
- ✅ **TypeScript** end-to-end
- ✅ **Turbopack** para desarrollo rápido
- ✅ **Sistema de notificaciones** con Toaster
- ✅ **Navegación completa** sin 404s

## 📋 Funcionalidades Completadas

### 🌟 Área Pública (100% Completa)
- ✅ **Homepage** con branding e información completa
- ✅ **Catálogo de cuadriciclos** con 3 Yamaha Grizzly 700 (2009)
  - Rojo Edition Special
  - Negro
  - Azul
- ✅ **Sistema de reservas completo** con:
  - Selección de cuadriciclo y paseo
  - Calendario y horarios (8AM-4PM)
  - Formulario de cliente completo
  - Cálculo automático de precios
  - Confirmación de reserva
- ✅ **Navegación responsive** entre secciones

### 🔧 Panel de Administración (100% Completo)
- ✅ **Dashboard principal** con métricas en tiempo real
- ✅ **Gestión de cuadriciclos** - Vista completa con stats
- ✅ **Gestión de paseos** - Listado detallado por dificultad
- ✅ **Gestión de reservas** - Filtros y gestión de estados
- ✅ **Reportes y estadísticas** - Dashboard analítico completo
- ✅ **Navegación interna** sin errores 404

## 🛠️ Tecnologías

- **Framework:** Next.js 15 (App Router)
- **Runtime:** React 19
- **Styling:** TailwindCSS v4
- **UI Components:** Radix UI
- **State Management:** TanStack React Query
- **Icons:** Lucide React
- **Language:** TypeScript
- **Build Tool:** Turbopack

## 🏃‍♂️ Desarrollo

### Instalación
```bash
npm install
```

### Servidor de desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build para producción
```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
src/
├── app/                  # App Router (Next.js 15)
│   ├── api/             # API Routes
│   │   ├── cuadriciclos/
│   │   ├── paseos/
│   │   └── reservas/
│   ├── page.tsx         # Homepage
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Estilos globales
├── components/          # Componentes React
│   ├── ui/             # Componentes base
│   └── providers/       # Context providers
├── lib/                # Utilidades y configuración
│   ├── db.ts           # Base de datos simulada
│   └── config.ts       # Configuración de negocio
└── types/              # Tipos TypeScript
    └── index.ts        # Tipos principales

proyecto_old/           # Proyecto anterior (Encore + Vite)
├── backend/           # Encore.dev backend
└── frontend/          # Vite React frontend
```

## 🗄️ API Endpoints

### Cuadriciclos
- `GET /api/cuadriciclos` - Listar todos los cuadriciclos
- `GET /api/cuadriciclos/[id]` - Obtener cuadriciclo por ID
- `POST /api/cuadriciclos` - Crear nuevo cuadriciclo

### Paseos
- `GET /api/paseos` - Listar todos los paseos activos

### Reservas
- `GET /api/reservas` - Listar reservas (con filtros)
- `POST /api/reservas` - Crear nueva reserva

## 🔄 Migración

Este proyecto fue migrado desde una arquitectura separada:
- **Backend:** Encore.dev con PostgreSQL
- **Frontend:** Vite + React

**Beneficios del monorepo:**
- ✅ Un solo servidor y proyecto
- ✅ Tipos compartidos sin duplicación
- ✅ Deploy más simple
- ✅ Mejor DX (Developer Experience)
- ✅ No más problemas de CORS

## 📊 Datos de Ejemplo (Implementado)

✅ **Base de datos simulada completa:**
- **3 cuadriciclos** Yamaha Grizzly 700 (Rojo, Negro, Azul)
- **2 paseos configurados** (Aventura en el Bosque, Ruta Extrema)
- **1 reserva de ejemplo** para testing
- **Precios realistas** y datos de negocio completos

## 🚧 Roadmap - Próximas Fases

### 📈 **FASE 2: Funcionalidades Avanzadas** (En planificación)
- [ ] **Autenticación segura** para administradores
- [ ] **CRUD completo** para cuadriciclos y paseos
- [ ] **Gestión de estados** de reservas (confirmar/cancelar)
- [ ] **Validaciones avanzadas** de formularios
- [ ] **Filtros dinámicos** en todas las secciones

### 🗄️ **FASE 3: Base de Datos Real**
- [ ] **Integración PostgreSQL/MySQL**
- [ ] **Migraciones de esquema**
- [ ] **Seeders de datos** de producción
- [ ] **Backup automático**

### 🎨 **FASE 4: Experiencia de Usuario**
- [ ] **Subida de imágenes** de cuadriciclos
- [ ] **Galería fotográfica** de paseos
- [ ] **Mapa interactivo** de ubicaciones
- [ ] **Calendario visual** de disponibilidad

### 💳 **FASE 5: Pagos y Notificaciones**
- [ ] **Integración Stripe/PayU**
- [ ] **Pasarela de pagos** colombiana
- [ ] **Email automático** de confirmación
- [ ] **SMS notifications** via Twilio
- [ ] **WhatsApp Business** integration

### 📱 **FASE 6: Móvil y Performance**
- [ ] **PWA completa** para móviles
- [ ] **Push notifications**
- [ ] **Modo offline** básico
- [ ] **Optimización SEO**
- [ ] **Analytics** con Google Analytics

## 📝 Licencia

Desarrollado para Chocó Aventuras © 2024
