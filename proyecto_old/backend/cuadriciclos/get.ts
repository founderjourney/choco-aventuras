import { api, APIError } from "encore.dev/api";
import db from "../db";
import type { Cuadriciclo } from "./list";

interface GetCuadricicloParams {
  id: number;
}

// Retrieves a single cuadriciclo by ID.
export const get = api<GetCuadricicloParams, Cuadriciclo>(
  { expose: true, method: "GET", path: "/cuadriciclos/:id" },
  async ({ id }) => {
    const row = await db.queryRow<Cuadriciclo>`
      SELECT 
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
      FROM cuadriciclos WHERE id = ${id}
    `;
    if (!row) {
      throw APIError.notFound("cuadriciclo not found");
    }
    return row;
  }
);
