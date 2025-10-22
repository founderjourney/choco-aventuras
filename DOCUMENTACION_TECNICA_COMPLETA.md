# 📋 Documentación Técnica Completa - Chocó Aventuras

> **Guía técnica completa para desarrolladores y administradores del sistema**
> Actualizada al 22 de Octubre 2025 - Versión 5.0.0

---

## 📑 **ÍNDICE**

1. [Arquitectura del Sistema](#arquitectura-del-sistema)
2. [Base de Datos y Esquemas](#base-de-datos-y-esquemas)
3. [Sistema de API Routes](#sistema-de-api-routes)
4. [Sistema CMS Implementado](#sistema-cms-implementado)
5. [Sistema de Upload de Fotos](#sistema-de-upload-de-fotos)
6. [Componentes y Hooks](#componentes-y-hooks)
7. [Autenticación y Seguridad](#autenticacion-y-seguridad)
8. [Configuración y Deploy](#configuracion-y-deploy)
9. [Guías de Desarrollo](#guias-de-desarrollo)
10. [Troubleshooting](#troubleshooting)

---

## 🏗️ **ARQUITECTURA DEL SISTEMA**

### **Patrón de Arquitectura**
- **Monorepo Full-Stack** con Next.js 15 App Router
- **Server-Side Rendering (SSR)** para SEO optimizado
- **Client-Side Hydration** para interactividad
- **API Routes integradas** como backend

### **Flujo de Datos**
```mermaid
graph TD
    A[Cliente/Browser] --> B[Next.js Frontend]
    B --> C[React Query Cache]
    C --> D[API Routes]
    D --> E{Base de Datos}
    E -->|Producción| F[PostgreSQL Supabase]
    E -->|Desarrollo| G[Mock Data TypeScript]
    F --> H[Fallback Automático]
    G --> H
    H --> D
```

### **Capas del Sistema**
```typescript
interface SystemLayers {
  presentation: {
    framework: "Next.js 15 App Router";
    styling: "TailwindCSS v4";
    components: "Radix UI + Custom";
    icons: "Lucide React";
  };
  state: {
    client: "React Query + useState";
    server: "PostgreSQL + Mock fallback";
    cache: "React Query automatic";
  };
  business: {
    api: "Next.js API Routes";
    validation: "TypeScript + Zod";
    authentication: "Custom hooks + localStorage";
  };
  data: {
    primary: "PostgreSQL (Supabase)";
    fallback: "TypeScript Mock Data";
    migrations: "SQL Scripts";
  };
}
```

---

## 🗄️ **BASE DE DATOS Y ESQUEMAS**

### **Sistema Dual de Base de Datos**

#### **Configuración Automática**
```typescript
// src/lib/db.ts
export async function getDb() {
  if (process.env.POSTGRES_URL) {
    try {
      // Intentar conectar a PostgreSQL
      const prodModule = await import('./db.prod');
      const testResult = await prodModule.db.cuatrimotos.findAll();
      console.log('✅ Conectado a PostgreSQL Supabase');
      return prodModule.db;
    } catch (error) {
      console.warn('⚠️ PostgreSQL no disponible, usando Mock Data');
      return devDb;
    }
  }
  console.log('🔧 Usando Mock Data para desarrollo');
  return devDb;
}
```

#### **Schema PostgreSQL Completo**
```sql
-- Tabla principal de cuadriciclos
CREATE TABLE cuadriciclos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  marca VARCHAR(100) NOT NULL CHECK (marca IN ('Yamaha', 'Honda', 'Suzuki', 'Kawasaki')),
  modelo VARCHAR(100) NOT NULL,
  año INTEGER NOT NULL CHECK (año >= 2000 AND año <= EXTRACT(YEAR FROM CURRENT_DATE)),
  color VARCHAR(50) NOT NULL,
  precio_hora DECIMAL(10,2) NOT NULL CHECK (precio_hora > 0),
  precio_dia DECIMAL(10,2) NOT NULL CHECK (precio_dia > 0),
  descripcion TEXT,
  fotos TEXT[], -- Array de URLs de fotos
  estado VARCHAR(20) DEFAULT 'disponible' CHECK (estado IN ('disponible', 'ocupado', 'mantenimiento')),
  caracteristicas TEXT[], -- Array de características
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de paseos/tours
CREATE TABLE paseos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  duracion_horas DECIMAL(3,1) NOT NULL CHECK (duracion_horas > 0),
  precio DECIMAL(10,2) NOT NULL CHECK (precio > 0),
  dificultad VARCHAR(20) NOT NULL CHECK (dificultad IN ('facil', 'intermedio', 'dificil')),
  ubicacion VARCHAR(255) NOT NULL,
  incluye TEXT[], -- Array de elementos incluidos
  fotos TEXT[], -- ✅ SISTEMA DE FOTOS IMPLEMENTADO
  activo BOOLEAN DEFAULT true,
  max_participantes INTEGER DEFAULT 6 CHECK (max_participantes > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de reservas
CREATE TABLE reservas (
  id SERIAL PRIMARY KEY,
  cuatrimoto_id INTEGER REFERENCES cuadriciclos(id) ON DELETE SET NULL,
  paseo_id INTEGER REFERENCES paseos(id) ON DELETE SET NULL,
  cliente_nombre VARCHAR(255) NOT NULL,
  cliente_telefono VARCHAR(20) NOT NULL,
  cliente_email VARCHAR(255) NOT NULL CHECK (cliente_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  fecha_paseo TIMESTAMP WITH TIME ZONE NOT NULL,
  precio_total DECIMAL(10,2) NOT NULL CHECK (precio_total > 0),
  estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmada', 'cancelada', 'completada')),
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints de negocio
  CONSTRAINT no_reserva_pasado CHECK (fecha_paseo > NOW()),
  CONSTRAINT cuatrimoto_o_paseo CHECK (cuatrimoto_id IS NOT NULL OR paseo_id IS NOT NULL)
);

-- Índices para performance
CREATE INDEX idx_cuadriciclos_estado ON cuadriciclos(estado);
CREATE INDEX idx_cuadriciclos_marca ON cuadriciclos(marca);
CREATE INDEX idx_paseos_dificultad ON paseos(dificultad);
CREATE INDEX idx_paseos_activo ON paseos(activo);
CREATE INDEX idx_reservas_fecha ON reservas(fecha_paseo);
CREATE INDEX idx_reservas_estado ON reservas(estado);

-- Función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para auto-update
CREATE TRIGGER update_cuadriciclos_updated_at BEFORE UPDATE ON cuadriciclos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_paseos_updated_at BEFORE UPDATE ON paseos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reservas_updated_at BEFORE UPDATE ON reservas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

#### **Mock Data para Desarrollo**
```typescript
// src/lib/db.dev.ts
export const mockCuadriciclos: Cuatrimoto[] = [
  {
    id: 1,
    nombre: "Grizzly Rojo Edition Special",
    marca: "Yamaha",
    modelo: "Grizzly 700",
    año: 2009,
    color: "Rojo",
    precio_hora: 150000,
    precio_dia: 800000,
    descripcion: "Cuatrimoto premium con características especiales para aventuras extremas.",
    fotos: ["/images/yamaha-rojo-1.jpg", "/images/yamaha-rojo-2.jpg"],
    estado: "disponible",
    caracteristicas: ["4x4", "Frenos de disco", "Motor 686cc", "Suspensión independiente"],
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-10-20')
  }
  // ... más datos mock
];
```

---

## 🔗 **SISTEMA DE API ROUTES**

### **Estructura de Endpoints**

#### **Cuadriciclos API** (`/api/cuadriciclos`)
```typescript
// GET /api/cuadriciclos
export async function GET(request: Request) {
  try {
    const db = await getDb();
    const cuadriciclos = await db.cuatrimotos.findAll();

    return NextResponse.json({
      success: true,
      data: cuadriciclos,
      count: cuadriciclos.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al obtener cuadriciclos' },
      { status: 500 }
    );
  }
}

// POST /api/cuadriciclos
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validación de datos
    const validatedData = cuatricicloSchema.parse(body);

    const db = await getDb();
    const newCuatrimoto = await db.cuatrimotos.create(validatedData);

    return NextResponse.json({
      success: true,
      data: newCuatrimoto,
      message: 'Cuadriciclo creado exitosamente'
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
```

#### **Paseos API con Sistema de Fotos** (`/api/paseos`)
```typescript
// PUT /api/paseos/[id] - Con gestión de fotos
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    // Validar y procesar fotos
    const { fotos, ...paseoData } = body;
    const processedFotos = fotos ? await procesarFotos(fotos) : [];

    const db = await getDb();
    const updatedPaseo = await db.paseos.update(id, {
      ...paseoData,
      fotos: processedFotos
    });

    return NextResponse.json({
      success: true,
      data: updatedPaseo,
      message: 'Paseo actualizado con fotos'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Función auxiliar para procesar fotos
async function procesarFotos(fotos: string[]): Promise<string[]> {
  return fotos.map(foto => {
    // Validar formato Base64 o URL
    if (foto.startsWith('data:image/')) {
      // Procesar imagen Base64
      return foto; // Por ahora mantener Base64, migrar a cloud storage
    }
    return foto;
  });
}
```

#### **Reservas API** (`/api/reservas`)
```typescript
// POST /api/reservas - Crear nueva reserva
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validaciones de negocio
    await validarDisponibilidad(body.cuatrimoto_id, body.fecha_paseo);
    await validarHorarioOperacion(body.fecha_paseo);

    const db = await getDb();
    const newReserva = await db.reservas.create({
      ...body,
      precio_total: await calcularPrecioTotal(body),
      estado: 'pendiente'
    });

    // Enviar email de confirmación (futuro)
    // await enviarEmailConfirmacion(newReserva);

    return NextResponse.json({
      success: true,
      data: newReserva,
      message: 'Reserva creada exitosamente'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
```

#### **Dashboard API** (`/api/dashboard`)
```typescript
// GET /api/dashboard - Métricas completas
export async function GET() {
  try {
    const db = await getDb();

    const [cuadriciclos, paseos, reservas] = await Promise.all([
      db.cuatrimotos.findAll(),
      db.paseos.findAll(),
      db.reservas.findAll()
    ]);

    const stats = {
      cuadriciclos: {
        total: cuadriciclos.length,
        disponibles: cuadriciclos.filter(c => c.estado === 'disponible').length,
        ocupados: cuadriciclos.filter(c => c.estado === 'ocupado').length,
        mantenimiento: cuadriciclos.filter(c => c.estado === 'mantenimiento').length
      },
      paseos: {
        total: paseos.length,
        activos: paseos.filter(p => p.activo).length,
        inactivos: paseos.filter(p => !p.activo).length
      },
      reservas: {
        total: reservas.length,
        pendientes: reservas.filter(r => r.estado === 'pendiente').length,
        confirmadas: reservas.filter(r => r.estado === 'confirmada').length,
        completadas: reservas.filter(r => r.estado === 'completada').length,
        canceladas: reservas.filter(r => r.estado === 'cancelada').length
      },
      ingresos: {
        total: reservas
          .filter(r => r.estado === 'completada')
          .reduce((sum, r) => sum + r.precio_total, 0),
        mesActual: calcularIngresosMesActual(reservas)
      }
    };

    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al obtener estadísticas' },
      { status: 500 }
    );
  }
}
```

---

## 📝 **SISTEMA CMS IMPLEMENTADO**

### **Arquitectura del CMS**

#### **Hook Principal** (`src/hooks/use-page-content.ts`)
```typescript
import { useState, useEffect } from 'react';
import { getPageBySlug, type PageContent } from '@/lib/pageContent';

interface UsePageContentReturn {
  titulo: string;
  contenido: string;
  elementos: PageElement[];
  isLoading: boolean;
  error: string | null;
  updateContent: (updates: Partial<PageContent>) => void;
}

export function usePageContent(slug: string): UsePageContentReturn {
  const [pageData, setPageData] = useState<PageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const data = getPageBySlug(slug);
      setPageData(data);
      setError(null);
    } catch (err) {
      setError(`Error al cargar contenido de ${slug}`);
      console.error('CMS Error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  const updateContent = (updates: Partial<PageContent>) => {
    if (pageData) {
      const updatedData = { ...pageData, ...updates };
      setPageData(updatedData);
      // Guardar en localStorage/API
      localStorage.setItem(`cms_${slug}`, JSON.stringify(updatedData));
    }
  };

  return {
    titulo: pageData?.titulo || '',
    contenido: pageData?.contenido || '',
    elementos: pageData?.elementos || [],
    isLoading,
    error,
    updateContent
  };
}
```

#### **Sistema de Tipos** (`src/lib/pageContent.ts`)
```typescript
export interface PageElement {
  id: string;
  tipo: 'titulo' | 'texto' | 'imagen' | 'video' | 'lista' | 'cta';
  contenido: string;
  orden: number;
  estilos?: {
    color?: string;
    tamaño?: 'sm' | 'md' | 'lg' | 'xl';
    alineacion?: 'left' | 'center' | 'right';
  };
  metadatos?: Record<string, any>;
}

export interface PageContent {
  id: string;
  titulo: string;
  slug: string;
  contenido: string;
  estado: 'publicada' | 'borrador';
  fechaCreacion: string;
  ultimaModificacion: string;
  elementos: PageElement[];
  metadata?: {
    descripcion?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

// Funciones del CMS
export function getPageBySlug(slug: string): PageContent | null {
  // Primero intentar localStorage
  const stored = localStorage.getItem(`cms_${slug}`);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.warn(`Error parsing stored content for ${slug}`);
    }
  }

  // Fallback a datos por defecto
  const defaultPages = getDefaultPages();
  return defaultPages.find(page => page.slug === slug) || null;
}

export function updatePageContent(slug: string, content: Partial<PageContent>): boolean {
  try {
    const existing = getPageBySlug(slug);
    if (!existing) return false;

    const updated = {
      ...existing,
      ...content,
      ultimaModificacion: new Date().toISOString()
    };

    localStorage.setItem(`cms_${slug}`, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error updating page content:', error);
    return false;
  }
}
```

#### **Migración Automática** (`src/scripts/migrate-homepage.ts`)
```typescript
export function migrateHomepageToCMS() {
  const homepageContent: PageContent = {
    id: 'homepage',
    titulo: 'CHOCÓ\nAVENTURAS',
    slug: 'homepage',
    contenido: 'Dispara, acelera y conquista la aventura',
    estado: 'publicada',
    fechaCreacion: new Date().toISOString(),
    ultimaModificacion: new Date().toISOString(),
    elementos: [
      {
        id: 'hero-title',
        tipo: 'titulo',
        contenido: 'CHOCÓ\nAVENTURAS',
        orden: 1,
        estilos: {
          tamaño: 'xl',
          alineacion: 'center',
          color: 'emerald'
        }
      },
      {
        id: 'hero-subtitle',
        tipo: 'texto',
        contenido: 'Dispara, acelera y conquista la aventura',
        orden: 2,
        estilos: {
          tamaño: 'lg',
          alineacion: 'center'
        }
      }
    ],
    metadata: {
      descripcion: 'Aventuras en cuatrimotos en el Chocó, Colombia',
      keywords: ['cuatrimotos', 'aventura', 'chocó', 'turismo'],
      ogImage: '/images/hero-og.jpg'
    }
  };

  localStorage.setItem('cms_homepage', JSON.stringify(homepageContent));
  console.log('✅ Homepage migrada al CMS');
}
```

### **Uso en Componentes**
```typescript
// Ejemplo de uso en página
import { usePageContent } from '@/hooks/use-page-content';

export default function NosotrosPage() {
  const pageContent = usePageContent('nosotros');

  if (pageContent.isLoading) {
    return <div>Cargando contenido...</div>;
  }

  return (
    <div>
      <h1>{pageContent.titulo || 'Título por defecto'}</h1>
      <div dangerouslySetInnerHTML={{ __html: pageContent.contenido }} />

      {pageContent.elementos.map(elemento => (
        <ElementoCMS key={elemento.id} elemento={elemento} />
      ))}
    </div>
  );
}
```

---

## 📸 **SISTEMA DE UPLOAD DE FOTOS**

### **Implementación Completa**

#### **Componente de Upload** (en `/admin/paseos/[id]/editar/page.tsx`)
```typescript
interface FileUploadProps {
  onUpload: (files: string[]) => void;
  existingFiles: string[];
  maxFiles?: number;
  maxSize?: number; // en MB
}

function FileUploadComponent({ onUpload, existingFiles, maxFiles = 10, maxSize = 5 }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    setUploading(true);
    const processedFiles: string[] = [];

    try {
      for (const file of Array.from(files)) {
        // Validaciones
        if (!file.type.startsWith('image/')) {
          toast({
            title: "Error",
            description: `${file.name} no es una imagen válida.`,
            variant: "destructive",
          });
          continue;
        }

        if (file.size > maxSize * 1024 * 1024) {
          toast({
            title: "Error",
            description: `${file.name} excede el tamaño máximo de ${maxSize}MB.`,
            variant: "destructive",
          });
          continue;
        }

        // Convertir a Base64 para preview
        const base64 = await fileToBase64(file);
        processedFiles.push(base64);
      }

      onUpload([...existingFiles, ...processedFiles]);

      toast({
        title: "¡Fotos subidas!",
        description: `Se agregaron ${processedFiles.length} fotos exitosamente.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al procesar las fotos.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  return (
    <div className="space-y-4">
      {/* Zona de Drop */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-emerald-500 bg-emerald-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-500" />
        <p className="text-sm text-gray-600">
          <label className="cursor-pointer text-emerald-600 hover:text-emerald-700">
            Clic para subir
            <input
              type="file"
              className="hidden"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files)}
              disabled={uploading}
            />
          </label>{' '}
          o arrastra fotos aquí
        </p>
        <p className="text-xs text-gray-500 mt-1">
          PNG, JPG, JPEG (máx. {maxSize}MB c/u)
        </p>
      </div>

      {/* Preview de fotos */}
      {existingFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {existingFiles.map((foto, index) => (
            <div key={index} className="relative group">
              <img
                src={foto}
                alt={`Foto ${index + 1}`}
                className="w-full h-24 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => {
                  const newFiles = existingFiles.filter((_, i) => i !== index);
                  onUpload(newFiles);
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {uploading && (
        <div className="text-center text-sm text-gray-500">
          <div className="animate-spin w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-2"></div>
          Procesando fotos...
        </div>
      )}
    </div>
  );
}

// Función auxiliar
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
```

#### **Integración en Formularios**
```typescript
// En el formulario de edición de paseos
const [formData, setFormData] = useState({
  // ... otros campos
  fotos: [] as string[]
});

const handleFotosChange = (newFotos: string[]) => {
  setFormData(prev => ({
    ...prev,
    fotos: newFotos
  }));
};

// En el JSX
<FileUploadComponent
  onUpload={handleFotosChange}
  existingFiles={formData.fotos}
  maxFiles={20}
  maxSize={5}
/>
```

#### **Validaciones del Sistema**
```typescript
interface PhotoValidation {
  allowedTypes: string[];
  maxSize: number; // MB
  maxFiles: number;
  minDimensions?: { width: number; height: number };
}

const photoValidation: PhotoValidation = {
  allowedTypes: ['image/jpeg', 'image/png', 'image/jpg'],
  maxSize: 5,
  maxFiles: 20,
  minDimensions: { width: 300, height: 200 }
};

function validatePhoto(file: File): { valid: boolean; error?: string } {
  // Validar tipo
  if (!photoValidation.allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Tipo de archivo no permitido' };
  }

  // Validar tamaño
  if (file.size > photoValidation.maxSize * 1024 * 1024) {
    return { valid: false, error: `Archivo muy grande (máx. ${photoValidation.maxSize}MB)` };
  }

  return { valid: true };
}
```

---

## 🧩 **COMPONENTES Y HOOKS**

### **Hooks Personalizados**

#### **useAuth** - Autenticación
```typescript
// src/hooks/use-auth.ts
interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true
        });
      } catch (error) {
        logout();
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Validación simple para demo
      if (email === 'admin@chocoadventuras.com' && password === 'admin123') {
        const user: User = {
          id: '1',
          email: 'admin@chocoadventuras.com',
          role: 'admin'
        };

        localStorage.setItem('auth_token', 'demo_token_123');
        localStorage.setItem('user_data', JSON.stringify(user));

        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true
        });

        return { success: true };
      } else {
        return { success: false, error: 'Credenciales incorrectas' };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false
    });
  };

  return {
    ...authState,
    login,
    logout
  };
}
```

#### **useToast** - Sistema de Notificaciones
```typescript
// src/hooks/use-toast.ts
interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({ title, description, variant = 'default', duration = 5000 }: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, title, description, variant, duration };

    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return {
    toasts,
    toast,
    dismissToast
  };
}
```

### **Componentes Reutilizables**

#### **Loading Spinner**
```typescript
// src/components/ui/loading-spinner.tsx
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'emerald' | 'gray' | 'white';
  text?: string;
}

export function LoadingSpinner({ size = 'md', color = 'emerald', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    emerald: 'border-emerald-500',
    gray: 'border-gray-500',
    white: 'border-white'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`animate-spin rounded-full border-2 border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`}></div>
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  );
}
```

#### **Error Boundary**
```typescript
// src/components/error-boundary.tsx
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-red-500 mb-4">
              <AlertTriangle className="w-12 h-12 mx-auto" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Algo salió mal
            </h2>
            <p className="text-gray-600 mb-4">
              Ha ocurrido un error inesperado. Por favor, recarga la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition-colors"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## 🔐 **AUTENTICACIÓN Y SEGURIDAD**

### **Sistema de Autenticación**

#### **Protección de Rutas**
```typescript
// src/components/ProtectedRoute.tsx
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, requiredRole = 'user', fallback }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <LoadingSpinner text="Verificando acceso..." />;
  }

  if (!isAuthenticated) {
    return fallback || null;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">No tienes permisos para acceder a esta página.</p>
      </div>
    );
  }

  return <>{children}</>;
}
```

#### **Middleware de Autenticación**
```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Proteger rutas de admin
  if (request.nextUrl.pathname.startsWith('/admin') &&
      !request.nextUrl.pathname.startsWith('/admin/login')) {

    const token = request.cookies.get('auth_token');

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
```

### **Validación y Sanitización**

#### **Esquemas de Validación**
```typescript
// src/lib/validations.ts
import { z } from 'zod';

export const cuatricicloSchema = z.object({
  nombre: z.string().min(1, 'Nombre requerido').max(255),
  marca: z.enum(['Yamaha', 'Honda', 'Suzuki', 'Kawasaki']),
  modelo: z.string().min(1, 'Modelo requerido').max(100),
  año: z.number().min(2000).max(new Date().getFullYear()),
  color: z.string().min(1, 'Color requerido').max(50),
  precio_hora: z.number().positive('Precio debe ser positivo'),
  precio_dia: z.number().positive('Precio debe ser positivo'),
  descripcion: z.string().optional(),
  fotos: z.array(z.string()).default([]),
  estado: z.enum(['disponible', 'ocupado', 'mantenimiento']).default('disponible'),
  caracteristicas: z.array(z.string()).default([])
});

export const reservaSchema = z.object({
  cuatrimoto_id: z.number().optional(),
  paseo_id: z.number().optional(),
  cliente_nombre: z.string().min(1, 'Nombre requerido').max(255),
  cliente_telefono: z.string().min(10, 'Teléfono inválido').max(20),
  cliente_email: z.string().email('Email inválido'),
  fecha_paseo: z.string().datetime('Fecha inválida'),
  notas: z.string().optional()
}).refine(data => data.cuatrimoto_id || data.paseo_id, {
  message: "Debe seleccionar un cuadriciclo o un paseo"
});
```

#### **Sanitización de Datos**
```typescript
// src/lib/sanitize.ts
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = {} as T;

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key as keyof T] = sanitizeInput(value) as T[keyof T];
    } else if (Array.isArray(value)) {
      sanitized[key as keyof T] = value.map(item =>
        typeof item === 'string' ? sanitizeInput(item) : item
      ) as T[keyof T];
    } else {
      sanitized[key as keyof T] = value;
    }
  }

  return sanitized;
}
```

---

## ⚙️ **CONFIGURACIÓN Y DEPLOY**

### **Variables de Entorno**
```bash
# .env.local (Desarrollo)
POSTGRES_URL="postgresql://user:password@localhost:5432/choco_aventuras"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
AUTH_SECRET="your-super-secret-key-here"
NODE_ENV="development"

# .env.production (Producción)
POSTGRES_URL="postgresql://user:password@host:port/database"
NEXT_PUBLIC_SITE_URL="https://choco-aventuras.vercel.app"
AUTH_SECRET="production-secret-key"
NODE_ENV="production"
```

### **Configuración de Next.js**
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost', 'choco-aventuras.vercel.app'],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type,Authorization' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### **Scripts de Deploy**
```bash
# package.json scripts
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "db:setup": "node scripts/setup-database.js",
    "db:test": "node scripts/test-connection.js",
    "deploy": "npm run build && vercel --prod"
  }
}
```

### **Configuración de Vercel**
```json
// vercel.json
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "POSTGRES_URL": "@postgres_url",
    "AUTH_SECRET": "@auth_secret"
  }
}
```

---

## 🛠️ **GUÍAS DE DESARROLLO**

### **Flujo de Trabajo Recomendado**

#### **1. Setup Inicial**
```bash
# Clonar y configurar
git clone https://github.com/tu-usuario/choco-aventuras.git
cd choco-aventuras
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus configuraciones

# Setup base de datos (opcional)
npm run db:setup
npm run db:test
```

#### **2. Desarrollo de Funcionalidades**
```bash
# Crear rama para nueva funcionalidad
git checkout -b feature/nueva-funcionalidad

# Desarrollo con hot reload
npm run dev

# Verificar tipos y lint
npm run type-check
npm run lint
```

#### **3. Testing Manual**
```bash
# Probar en diferentes navegadores
# Chrome, Firefox, Safari, Edge

# Probar responsividad
# Móvil (320px+), Tablet (768px+), Desktop (1024px+)

# Probar funcionalidades
# CRUD operations, Upload de fotos, Sistema de reservas
```

#### **4. Deploy**
```bash
# Build local
npm run build

# Deploy a Vercel
vercel --prod

# O usando GitHub Actions (automático)
git push origin main
```

### **Convenciones de Código**

#### **Nomenclatura**
```typescript
// Componentes - PascalCase
export function ComponenteEjemplo() {}

// Hooks - camelCase con prefijo 'use'
export function useCustomHook() {}

// Tipos e Interfaces - PascalCase
interface UserData {}
type ApiResponse = {};

// Constantes - UPPER_SNAKE_CASE
const API_BASE_URL = '';

// Variables y funciones - camelCase
const userData = {};
function calculateTotal() {}
```

#### **Estructura de Archivos**
```typescript
// Orden de imports
import React from 'react';                    // 1. React
import { NextRequest } from 'next/server';    // 2. Next.js
import { useState } from 'react';             // 3. React hooks
import { Button } from '@/components/ui';     // 4. Componentes UI
import { useAuth } from '@/hooks';            // 5. Hooks personalizados
import { cn } from '@/lib/utils';             // 6. Utilidades
import type { User } from '@/types';          // 7. Tipos

// Orden en componentes
export function MiComponente() {
  // 1. Props destructuring
  // 2. Hooks de estado
  // 3. Hooks de efecto
  // 4. Funciones auxiliares
  // 5. Event handlers
  // 6. Render condicional
  // 7. JSX return
}
```

### **Debugging y Troubleshooting**

#### **Logs de Desarrollo**
```typescript
// Configuración de logs
const isDev = process.env.NODE_ENV === 'development';

function debugLog(message: string, data?: any) {
  if (isDev) {
    console.log(`🔧 [DEBUG] ${message}`, data || '');
  }
}

// Uso en componentes
useEffect(() => {
  debugLog('Component mounted', { props, state });
}, []);
```

#### **Errores Comunes y Soluciones**

**Error: "Cannot read property of undefined"**
```typescript
// ❌ Problemático
const userName = user.name;

// ✅ Seguro
const userName = user?.name || 'Usuario';
```

**Error: "Hydration mismatch"**
```typescript
// ❌ Problemático
const [mounted, setMounted] = useState(true);

// ✅ Correcto
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);

if (!mounted) return null;
```

**Error: "API route not found"**
```typescript
// Verificar estructura de archivos
app/
  api/
    cuadriciclos/
      route.ts          // ✅ Correcto
      index.ts          // ❌ Incorrecto
```

---

## 🎯 **CONCLUSIÓN**

Esta documentación técnica proporciona una guía completa para el desarrollo, mantenimiento y extensión del sistema Chocó Aventuras. El sistema está completamente funcional con:

- ✅ **Arquitectura robusta** con Next.js 15 y TypeScript
- ✅ **Base de datos dual** PostgreSQL + Mock con fallback automático
- ✅ **Sistema CMS base** implementado y funcional
- ✅ **Upload de fotos completo** con validaciones y preview
- ✅ **API completa** con manejo de errores profesional
- ✅ **Panel admin funcional** con todas las operaciones CRUD
- ✅ **Frontend responsive** optimizado para todos los dispositivos

### **Próximos Pasos Recomendados**

1. **Migración a Cloud Storage** (Cloudinary/AWS S3) para las fotos
2. **Implementación de CMS Visual** con editor drag & drop
3. **Sistema de Pagos** integrado con pasarelas colombianas
4. **PWA y Notificaciones** para experiencia mobile nativa
5. **Testing Automatizado** con Jest y Cypress

### **Soporte y Mantenimiento**

Para dudas técnicas o mejoras, consultar:
- 📋 [Plan CMS Completo](./PLAN_DESARROLLO_CMS_COMPLETO.md)
- 📸 [Sistema de Upload de Fotos](./SISTEMA_UPLOAD_FOTOS_IMPLEMENTADO.md)
- 🗄️ [Schema de Base de Datos](./scripts/create-tables.sql)

---

**Desarrollado con ❤️ para Chocó Aventuras**
**© 2024-2025 - Documentación Técnica Completa**

*Última actualización: 22 de Octubre 2025*