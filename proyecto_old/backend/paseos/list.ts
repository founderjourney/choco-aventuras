import { api } from "encore.dev/api";
import db from "../db";

export interface Paseo {
  id: number;
  nombre: string;
  descripcion: string;
  duracion_horas: number;
  precio: number;
  dificultad: 'facil' | 'moderado' | 'dificil';
  incluye: string[];
  requisitos: string[];
  fotos: string[];
  activo: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ListPaseosResponse {
  paseos: Paseo[];
}

export const list = api<void, ListPaseosResponse>(
  { expose: true, method: "GET", path: "/paseos" },
  async () => {
    const rows = await db.queryAll<Paseo>`
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
      WHERE activo = true
      ORDER BY nombre ASC
    `;
    return { paseos: rows };
  }
);