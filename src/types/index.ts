export interface Cuatrimoto {
  id: number;
  nombre: string;
  marca: string;
  modelo: string;
  año: number | null;
  color: string;
  precio_hora: number;
  precio_dia: number;
  descripcion: string | null;
  fotos: string[];
  estado: 'disponible' | 'ocupado' | 'mantenimiento';
  caracteristicas: string[];
  created_at: Date;
  updated_at: Date;
}

export interface Paseo {
  id: number;
  nombre: string;
  descripcion: string;
  duracion_horas: number;
  precio: number;
  dificultad: 'facil' | 'moderado' | 'dificil';
  ubicacion: string;
  incluye: string[];
  fotos: string[];
  activo: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Reserva {
  id: number;
  cuatrimoto_id: number;
  paseo_id: number;
  cliente_nombre: string;
  cliente_telefono: string;
  cliente_email: string;
  fecha_paseo: Date;
  precio_total: number;
  estado: 'pendiente' | 'confirmada' | 'completada' | 'cancelada';
  notas: string | null;
  created_at: Date;
  updated_at: Date;
  cuatrimoto_nombre: string;
  cuatrimoto_marca: string;
  cuatrimoto_modelo: string;
  paseo_nombre: string;
  paseo_duracion: number;
}

export interface ListCuatrimotosResponse {
  cuatrimotos: Cuatrimoto[];
}

export interface ListPaseosResponse {
  paseos: Paseo[];
}

export interface ListReservasResponse {
  reservas: Reserva[];
}

export interface CreateReservaRequest {
  cuatrimoto_id: number;
  paseo_id: number;
  cliente_nombre: string;
  cliente_telefono: string;
  cliente_email: string;
  fecha_paseo: string;
  notas?: string;
}