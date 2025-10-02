import { api } from "encore.dev/api";
import { Query } from "encore.dev/api";
import db from "../db";

export interface Reserva {
  id: number;
  cuadriciclo_id: number;
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
  cuadriciclo_nombre: string;
  cuadriciclo_marca: string;
  cuadriciclo_modelo: string;
  paseo_nombre: string;
  paseo_duracion: number;
}

export interface ListReservasParams {
  estado?: Query<string>;
  fecha?: Query<string>;
}

export interface ListReservasResponse {
  reservas: Reserva[];
}

// Retrieves all reservations, optionally filtered by status or date.
export const list = api<ListReservasParams, ListReservasResponse>(
  { expose: true, method: "GET", path: "/reservas" },
  async ({ estado, fecha }) => {
    let query = `
      SELECT 
        r.id,
        r.cuadriciclo_id,
        r.paseo_id,
        r.cliente_nombre,
        r.cliente_telefono,
        r.cliente_email,
        r.fecha_paseo,
        r.precio_total::float as precio_total,
        r.estado,
        r.notas,
        r.created_at,
        r.updated_at,
        c.nombre as cuadriciclo_nombre,
        c.marca as cuadriciclo_marca,
        c.modelo as cuadriciclo_modelo,
        p.nombre as paseo_nombre,
        p.duracion_horas::float as paseo_duracion
      FROM reservas r
      JOIN cuadriciclos c ON c.id = r.cuadriciclo_id
      JOIN paseos p ON p.id = r.paseo_id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramCount = 1;

    if (estado) {
      query += ` AND r.estado = $${paramCount}`;
      params.push(estado);
      paramCount++;
    }

    if (fecha) {
      const targetDate = new Date(fecha);
      query += ` AND DATE(r.fecha_paseo) = DATE($${paramCount})`;
      params.push(targetDate);
      paramCount++;
    }

    query += ` ORDER BY r.fecha_paseo DESC`;

    const rows = await db.rawQueryAll<Reserva>(query, ...params);
    return { reservas: rows };
  }
);
