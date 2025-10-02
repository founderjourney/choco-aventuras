import { api } from "encore.dev/api";
import db from "../db";

export interface Cuadriciclo {
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

export interface ListCuadriciclosResponse {
  cuadriciclos: Cuadriciclo[];
}

// Retrieves all cuadriciclos, optionally filtered by availability.
export const list = api<void, ListCuadriciclosResponse>(
  { expose: true, method: "GET", path: "/cuadriciclos" },
  async () => {
    const rows = await db.queryAll<Cuadriciclo>`
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
      FROM cuadriciclos 
      ORDER BY created_at DESC
    `;
    return { cuadriciclos: rows };
  }
);
