// Mock database for development
// In production, this would connect to PostgreSQL

import { Cuadriciclo, Paseo, Reserva } from '@/types';

// Mock data for development
const mockCuadriciclos: Cuadriciclo[] = [
  {
    id: 1,
    nombre: "Yamaha Grizzly 700 Rojo",
    marca: "Yamaha",
    modelo: "Grizzly 700",
    año: 2009,
    color: "Rojo Edition Special",
    precio_hora: 150000,
    precio_dia: 800000,
    descripcion: "Cuadriciclo deportivo edición especial, perfecto para aventuras extremas en el Chocó.",
    fotos: ["/cuadri1.jpg", "/cuadri1-2.jpg"],
    estado: "disponible",
    caracteristicas: ["700cc", "4x4", "Deportivo", "Edition Special", "Reversa"],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 2,
    nombre: "Yamaha Grizzly 700 Negro",
    marca: "Yamaha",
    modelo: "Grizzly 700",
    año: 2009,
    color: "Negro",
    precio_hora: 150000,
    precio_dia: 800000,
    descripcion: "Cuadriciclo robusto y confiable, ideal para todo tipo de terrenos.",
    fotos: ["/cuadri2.jpg"],
    estado: "disponible",
    caracteristicas: ["700cc", "4x4", "Automático", "Frenos de disco", "Suspensión independiente"],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 3,
    nombre: "Yamaha Grizzly 700 Azul",
    marca: "Yamaha",
    modelo: "Grizzly 700",
    año: 2009,
    color: "Azul",
    precio_hora: 150000,
    precio_dia: 800000,
    descripcion: "Cuadriciclo potente y versátil, perfecto para expediciones largas.",
    fotos: ["/cuadri3.jpg"],
    estado: "disponible",
    caracteristicas: ["700cc", "4x4", "Potente", "Resistente", "Cómodo"],
    created_at: new Date(),
    updated_at: new Date()
  }
];

const mockPaseos: Paseo[] = [
  {
    id: 1,
    nombre: "Aventura en el Bosque",
    descripcion: "Recorrido por senderos naturales del bosque",
    duracion_horas: 2,
    precio: 200000,
    dificultad: "facil",
    ubicacion: "Bosque Los Pinos",
    incluye: ["Guía", "Casco", "Seguro"],
    fotos: ["/paseo1.jpg"],
    activo: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 2,
    nombre: "Ruta Extrema",
    descripcion: "Aventura para expertos en terrenos difíciles",
    duracion_horas: 4,
    precio: 350000,
    dificultad: "dificil",
    ubicacion: "Montaña El Águila",
    incluye: ["Guía experto", "Equipo de protección completo", "Almuerzo", "Seguro"],
    fotos: ["/paseo2.jpg"],
    activo: true,
    created_at: new Date(),
    updated_at: new Date()
  }
];

const mockReservas: Reserva[] = [
  {
    id: 1,
    cuadriciclo_id: 1,
    paseo_id: 1,
    cliente_nombre: "Juan Pérez",
    cliente_telefono: "+57 300 123 4567",
    cliente_email: "juan@email.com",
    fecha_paseo: new Date("2024-01-15T10:00:00"),
    precio_total: 350000,
    estado: "confirmada",
    notas: "Primera vez en cuadriciclo",
    created_at: new Date(),
    updated_at: new Date(),
    cuadriciclo_nombre: "Yamaha Raptor 700",
    cuadriciclo_marca: "Yamaha",
    cuadriciclo_modelo: "Raptor 700",
    paseo_nombre: "Aventura en el Bosque",
    paseo_duracion: 2
  }
];

// Mock database operations
export const db = {
  cuadriciclos: {
    findAll: async (): Promise<Cuadriciclo[]> => {
      await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async
      return mockCuadriciclos;
    },
    findById: async (id: number): Promise<Cuadriciclo | null> => {
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockCuadriciclos.find(c => c.id === id) || null;
    },
    create: async (data: Omit<Cuadriciclo, 'id' | 'created_at' | 'updated_at'>): Promise<Cuadriciclo> => {
      await new Promise(resolve => setTimeout(resolve, 100));
      const newCuadriciclo: Cuadriciclo = {
        ...data,
        id: mockCuadriciclos.length + 1,
        created_at: new Date(),
        updated_at: new Date()
      };
      mockCuadriciclos.push(newCuadriciclo);
      return newCuadriciclo;
    }
  },
  paseos: {
    findAll: async (includeInactive = false): Promise<Paseo[]> => {
      await new Promise(resolve => setTimeout(resolve, 100));
      return includeInactive ? mockPaseos : mockPaseos.filter(p => p.activo);
    },
    findById: async (id: number): Promise<Paseo | null> => {
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockPaseos.find(p => p.id === id) || null;
    },
    create: async (data: Omit<Paseo, 'id' | 'created_at' | 'updated_at'>): Promise<Paseo> => {
      await new Promise(resolve => setTimeout(resolve, 100));
      const newPaseo: Paseo = {
        ...data,
        id: mockPaseos.length + 1,
        created_at: new Date(),
        updated_at: new Date()
      };
      mockPaseos.push(newPaseo);
      return newPaseo;
    },
    update: async (id: number, data: Partial<Omit<Paseo, 'id' | 'created_at' | 'updated_at'>>): Promise<Paseo | null> => {
      await new Promise(resolve => setTimeout(resolve, 100));
      const index = mockPaseos.findIndex(p => p.id === id);
      if (index === -1) return null;

      mockPaseos[index] = {
        ...mockPaseos[index],
        ...data,
        updated_at: new Date()
      };
      return mockPaseos[index];
    },
    delete: async (id: number): Promise<boolean> => {
      await new Promise(resolve => setTimeout(resolve, 100));
      const index = mockPaseos.findIndex(p => p.id === id);
      if (index === -1) return false;

      mockPaseos.splice(index, 1);
      return true;
    }
  },
  reservas: {
    findAll: async (filters?: { estado?: string; fecha?: string }): Promise<Reserva[]> => {
      await new Promise(resolve => setTimeout(resolve, 100));
      let result = mockReservas;

      if (filters?.estado) {
        result = result.filter(r => r.estado === filters.estado);
      }

      if (filters?.fecha) {
        const targetDate = new Date(filters.fecha);
        result = result.filter(r =>
          r.fecha_paseo.toDateString() === targetDate.toDateString()
        );
      }

      return result;
    },
    create: async (data: {
      cuadriciclo_id: number;
      paseo_id: number;
      cliente_nombre: string;
      cliente_telefono: string;
      cliente_email: string;
      fecha_paseo: Date;
      notas?: string;
    }): Promise<Reserva> => {
      await new Promise(resolve => setTimeout(resolve, 100));

      const cuadriciclo = await db.cuadriciclos.findById(data.cuadriciclo_id);
      const paseo = await db.paseos.findById(data.paseo_id);

      if (!cuadriciclo || !paseo) {
        throw new Error('Cuadriciclo o paseo no encontrado');
      }

      const precio_total = cuadriciclo.precio_hora * paseo.duracion_horas + paseo.precio;

      const newReserva: Reserva = {
        id: mockReservas.length + 1,
        ...data,
        precio_total,
        estado: 'pendiente',
        created_at: new Date(),
        updated_at: new Date(),
        cuadriciclo_nombre: cuadriciclo.nombre,
        cuadriciclo_marca: cuadriciclo.marca,
        cuadriciclo_modelo: cuadriciclo.modelo,
        paseo_nombre: paseo.nombre,
        paseo_duracion: paseo.duracion_horas
      };

      mockReservas.push(newReserva);
      return newReserva;
    }
  }
};