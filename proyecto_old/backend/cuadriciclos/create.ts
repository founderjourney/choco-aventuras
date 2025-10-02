import { api } from "encore.dev/api";
import db from "../db";
import type { Cuadriciclo } from "./list";

export interface CreateCuadricicloRequest {
  nombre: string;
  marca: string;
  modelo: string;
  año?: number;
  color: string;
  precio_hora: number;
  precio_dia: number;
  descripcion?: string;
  fotos?: string[];
  caracteristicas?: string[];
}

// Creates a new cuadriciclo.
export const create = api<CreateCuadricicloRequest, Cuadriciclo>(
  { expose: true, method: "POST", path: "/cuadriciclos" },
  async (req) => {
    const row = await db.queryRow<Cuadriciclo>`
      INSERT INTO cuadriciclos (
        nombre, marca, modelo, año, color, precio_hora, precio_dia, 
        descripcion, fotos, caracteristicas, updated_at
      ) VALUES (
        ${req.nombre}, ${req.marca}, ${req.modelo}, ${req.año || null}, 
        ${req.color}, ${req.precio_hora}, ${req.precio_dia}, 
        ${req.descripcion || null}, ${req.fotos || []}, ${req.caracteristicas || []}, NOW()
      )
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
    return row!;
  }
);
