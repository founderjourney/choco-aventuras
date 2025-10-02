import { api, APIError } from "encore.dev/api";
import db from "../db";
import type { Reserva } from "./list";

export interface UpdateReservaParams {
  id: number;
}

export interface UpdateReservaRequest {
  estado?: 'pendiente' | 'confirmada' | 'completada' | 'cancelada';
  notas?: string;
  fecha_paseo?: Date;
  precio_total?: number;
}

// Updates an existing reservation.
export const update = api<UpdateReservaParams & UpdateReservaRequest, Reserva>(
  { expose: true, method: "PUT", path: "/reservas/:id" },
  async ({ id, ...updates }) => {
    const updateFields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        updateFields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });

    if (updateFields.length === 0) {
      throw APIError.invalidArgument("no fields to update");
    }

    updateFields.push(`updated_at = $${paramCount}`);
    values.push(new Date());
    values.push(id);

    const query = `
      UPDATE reservas 
      SET ${updateFields.join(", ")}
      WHERE id = $${paramCount + 1}
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

    const row = await db.rawQueryRow<Reserva>(query, ...values);
    if (!row) {
      throw APIError.notFound("reserva not found");
    }

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
      WHERE r.id = ${row.id}
    `;

    return fullReservation!;
  }
);
