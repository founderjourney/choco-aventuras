import { api, APIError } from "encore.dev/api";
import db from "../db";
import type { Cuadriciclo } from "./list";

export interface UpdateCuadricicloParams {
  id: number;
}

export interface UpdateCuadricicloRequest {
  nombre?: string;
  marca?: string;
  modelo?: string;
  año?: number;
  color?: string;
  precio_hora?: number;
  precio_dia?: number;
  descripcion?: string;
  fotos?: string[];
  estado?: 'disponible' | 'ocupado' | 'mantenimiento';
  caracteristicas?: string[];
}

// Updates an existing cuadriciclo.
export const update = api<UpdateCuadricicloParams & UpdateCuadricicloRequest, Cuadriciclo>(
  { expose: true, method: "PUT", path: "/cuadriciclos/:id" },
  async ({ id, ...updates }) => {
    // Build dynamic update query
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
      UPDATE cuadriciclos 
      SET ${updateFields.join(", ")}
      WHERE id = $${paramCount + 1}
      RETURNING 
        id,
        nombre,
        marca,
        modelo,
        año,
        color,
        precio_hora::float as precio_hora,
        precio_dia::float as precio_dia,
        descripcion,
        fotos,
        estado,
        caracteristicas,
        created_at,
        updated_at
    `;

    const row = await db.rawQueryRow<Cuadriciclo>(query, ...values);
    if (!row) {
      throw APIError.notFound("cuadriciclo not found");
    }
    return row;
  }
);
