import { api, APIError } from "encore.dev/api";
import db from "../db";
import type { Paseo } from "./list";

export interface GetPaseoParams {
  id: number;
}

export const get = api<GetPaseoParams, Paseo>(
  { expose: true, method: "GET", path: "/paseos/:id" },
  async ({ id }) => {
    const paseo = await db.queryRow<Paseo>`
      SELECT 
        id,
        nombre,
        descripcion,
        duracion_horas::float as duracion_horas,
        precio::float as precio,
        dificultad,
        incluye,
        requisitos,
        fotos,
        activo,
        created_at,
        updated_at
      FROM paseos
      WHERE id = ${id}
    `;
    
    if (!paseo) {
      throw APIError.notFound("paseo not found");
    }
    
    return paseo;
  }
);