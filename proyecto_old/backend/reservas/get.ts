import { api, APIError } from "encore.dev/api";
import db from "../db";
import type { Reserva } from "./list";

interface GetReservaParams {
  id: number;
}

// Retrieves a single reservation by ID.
export const get = api<GetReservaParams, Reserva>(
  { expose: true, method: "GET", path: "/reservas/:id" },
  async ({ id }) => {
    const row = await db.queryRow<Reserva>`
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
      WHERE r.id = ${id}
    `;
    if (!row) {
      throw APIError.notFound("reserva not found");
    }
    return row;
  }
);
