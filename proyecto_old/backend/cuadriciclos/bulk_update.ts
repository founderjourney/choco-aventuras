import { api, APIError } from "encore.dev/api";
import db from "../db";
import type { Cuadriciclo } from "./list";

export interface BulkUpdateRequest {
  ids: number[];
  updates: {
    estado?: 'disponible' | 'ocupado' | 'mantenimiento';
    precio_hora?: number;
    precio_dia?: number;
  };
}

// Updates multiple cuadriciclos with the same changes.
export const bulkUpdate = api<BulkUpdateRequest, { updated: Cuadriciclo[], count: number }>(
  { expose: true, method: "PUT", path: "/cuadriciclos/bulk" },
  async ({ ids, updates }) => {
    if (!ids || ids.length === 0) {
      throw APIError.invalidArgument("no cuadriciclo IDs provided");
    }

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

    // Add updated_at field
    updateFields.push(`updated_at = $${paramCount}`);
    values.push(new Date());
    paramCount++;

    // Add the ids as a parameter
    values.push(ids);

    const query = `
      UPDATE cuadriciclos 
      SET ${updateFields.join(", ")}
      WHERE id = ANY($${paramCount})
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

    const rows = await db.rawQueryAll<Cuadriciclo>(query, ...values);
    
    return {
      updated: rows,
      count: rows.length
    };
  }
);