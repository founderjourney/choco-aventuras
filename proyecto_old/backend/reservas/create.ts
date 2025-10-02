import { api, APIError } from "encore.dev/api";
import db from "../db";
import type { Reserva } from "./list";

export interface CreateReservaRequest {
  cuadriciclo_id: number;
  paseo_id: number;
  cliente_nombre: string;
  cliente_telefono: string;
  cliente_email: string;
  fecha_paseo: Date;
  precio_total: number;
  notas?: string;
}

// Creates a new reservation after checking availability.
export const create = api<CreateReservaRequest, Reserva>(
  { expose: true, method: "POST", path: "/reservas" },
  async (req) => {
    const conflictingReservation = await db.queryRow<{ id: number }>`
      SELECT r.id FROM reservas r
      JOIN cuadriciclos c ON c.id = r.cuadriciclo_id
      JOIN paseos p ON p.id = r.paseo_id
      WHERE r.cuadriciclo_id = ${req.cuadriciclo_id}
      AND c.estado = 'disponible'
      AND r.estado IN ('pendiente', 'confirmada')
      AND r.paseo_id = ${req.paseo_id}
      AND DATE(r.fecha_paseo) = DATE(${req.fecha_paseo})
      LIMIT 1
    `;

    if (conflictingReservation) {
      throw APIError.failedPrecondition("cuadriciclo not available for the selected tour on this date");
    }

    const row = await db.queryRow<Reserva>`
      INSERT INTO reservas (
        cuadriciclo_id, paseo_id, cliente_nombre, cliente_telefono, cliente_email,
        fecha_paseo, precio_total, notas, updated_at
      ) VALUES (
        ${req.cuadriciclo_id}, ${req.paseo_id}, ${req.cliente_nombre}, ${req.cliente_telefono}, ${req.cliente_email},
        ${req.fecha_paseo}, ${req.precio_total}, ${req.notas || null}, NOW()
      )
      RETURNING 
        id,
        cuadriciclo_id,
        paseo_id,
        cliente_nombre,
        cliente_telefono,
        cliente_email,
        fecha_paseo,
        precio_total::float as precio_total,
        estado,
        notas,
        created_at,
        updated_at
    `;

    const fullReservation = await db.queryRow<Reserva>`
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
      WHERE r.id = ${row!.id}
    `;

    return fullReservation!;
  }
);
