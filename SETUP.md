# 🚀 Guía de Configuración - Chocó Aventuras

Esta guía te ayudará a configurar el proyecto Chocó Aventuras correctamente en tu entorno local y de producción.

## 📋 Prerrequisitos

- **Node.js 18+** - [Descargar aquí](https://nodejs.org/)
- **npm** (incluido con Node.js)
- **Cuenta Supabase** (opcional, para base de datos) - [Crear cuenta](https://supabase.com/)
- **Cuenta Vercel** (opcional, para deploy) - [Crear cuenta](https://vercel.com/)

## 🔧 Configuración Local

### 1. Clonación e Instalación
```bash
git clone [tu-repositorio]
cd choco-aventuras-main-newpage
npm install
```

### 2. Configuración de Variables de Entorno

#### Opción A: Desarrollo con Mock Data (Recomendado para inicio)
```bash
# No necesitas configurar nada
# El sistema usará automáticamente datos mock
npm run dev
```

#### Opción B: Desarrollo con Base de Datos Real
```bash
# 1. Copia el archivo de ejemplo
cp .env.example .env.local

# 2. Edita .env.local con tus credenciales de Supabase
nano .env.local
```

Configura tu `.env.local`:
```env
# Supabase Database Configuration
POSTGRES_URL=postgresql://postgres:TU_PASSWORD@db.tu-proyecto.supabase.co:5432/postgres
NODE_ENV=development
```

⚠️ **Importante:**
- Codifica caracteres especiales en la URL: `@` = `%40`, `#` = `%23`
- Nunca commities el archivo `.env.local`

### 3. Configuración de Base de Datos Supabase (Opcional)

#### 3.1 Crear Proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Guarda la URL de conexión PostgreSQL

#### 3.2 Ejecutar Scripts de Configuración
```bash
# Crear tablas automáticamente
node scripts/setup-database.js

# Probar conexión
node scripts/test-connection.js
```

#### 3.3 Configurar Tablas Manualmente (Alternativa)
Ejecuta el SQL del archivo `scripts/create-tables.sql` en el editor SQL de Supabase.

## 🚀 Comandos de Desarrollo

```bash
# Servidor de desarrollo (Turbopack)
npm run dev

# Build de producción
npm run build

# Servidor de producción
npm start

# Linting
npm run lint
```

## 🌐 Acceso a la Aplicación

- **Homepage:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin
- **Réplica Premium:** http://localhost:3000/replica
- **Login Admin:** http://localhost:3000/admin/login

### Credenciales de Admin por Defecto
- **Usuario:** admin
- **Password:** admin123

⚠️ **Cambiar en producción**

## 📁 Estructura de Páginas

### Páginas Públicas
- `/` - Homepage principal
- `/cuadriciclos` - Catálogo de vehículos
- `/reservas` - Sistema de reservas
- `/nosotros` - Información de la empresa
- `/contacto` - Información de contacto
- `/tours` - Tours disponibles
- `/experiencias` - Experiencias ofrecidas

### Panel de Administración
- `/admin` - Dashboard principal
- `/admin/login` - Autenticación
- `/admin/cuadriciclos` - CRUD cuadriciclos
- `/admin/paseos` - CRUD paseos
- `/admin/reservas` - Gestión de reservas
- `/admin/dashboard` - Reportes y estadísticas
- `/admin/paginas` - CMS básico

### Página Premium
- `/replica` - Réplica Oro18K con efectos 3D

## 🔧 Configuración de Producción

### Deploy en Vercel

#### 1. Preparación
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login
```

#### 2. Configuración de Variables de Entorno
En tu dashboard de Vercel, configura:
```
POSTGRES_URL=tu_url_de_supabase_aqui
NODE_ENV=production
```

#### 3. Deploy
```bash
# Deploy automático
vercel

# O usa la integración GitHub para CI/CD
```

### Configuración de Supabase para Producción

1. **Row Level Security (RLS):** Configurar políticas de seguridad
2. **Backup:** Configurar backups automáticos
3. **Monitoring:** Activar logs y métricas

## 🐛 Solución de Problemas

### Error: "POSTGRES_URL not configured"
```bash
# Solución: El sistema está usando mock data automáticamente
# Esto es normal y el sistema funcionará perfectamente
```

### Error: "Connection refused"
```bash
# Verifica tu URL de Supabase
# Verifica que el proyecto esté activo
# Ejecuta: node scripts/test-connection.js
```

### Error: "Tables don't exist"
```bash
# Ejecuta los scripts de setup
node scripts/setup-database.js
```

### Error 404 en rutas admin
```bash
# Asegúrate de estar logueado
# Ve a /admin/login primero
```

## 🔒 Consideraciones de Seguridad

### Variables de Entorno
- ✅ Usar `.env.local` para desarrollo
- ✅ Configurar variables en Vercel para producción
- ❌ Nunca commitear credenciales
- ❌ No usar `.env` en el repositorio

### Autenticación
- ✅ Cambiar credenciales de admin por defecto
- ✅ Implementar hash de passwords (próximamente)
- ✅ Configurar expiración de sesiones

### Base de Datos
- ✅ Usar conexión SSL en producción
- ✅ Configurar RLS en Supabase
- ✅ Monitorear conexiones

## 📚 Recursos Adicionales

- **Documentación Next.js:** https://nextjs.org/docs
- **Documentación Supabase:** https://supabase.com/docs
- **Documentación Vercel:** https://vercel.com/docs
- **TailwindCSS:** https://tailwindcss.com/docs

## 🆘 Soporte

Si encuentras problemas:

1. Revisa esta guía de configuración
2. Verifica los logs en la consola
3. Ejecuta los scripts de testing
4. Revisa el estado de Supabase
5. Consulta la documentación del proyecto

---

*Guía actualizada: Octubre 2025*
*Proyecto: Chocó Aventuras v4.0.0*