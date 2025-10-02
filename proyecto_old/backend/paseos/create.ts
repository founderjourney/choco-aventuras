import { api } from "encore.dev/api";
import db from "../db";
import type { Paseo } from "./list";

export interface CreatePaseoRequest {
  nombre: string;
  descripcion: string;
  duracion_horas: number;
  precio: number;
  dificultad: 'facil' | 'moderado' | 'dificil';
  incluye: string[];
  requisitos: string[];
  fotos?: string[];
}

export const create = api<CreatePaseoRequest, Paseo>(
  { expose: true, method: "POST", path: "/paseos" },
  async (req) => {
    const paseo = await db.queryRow<Paseo>`
      INSERT INTO paseos (
        nombre, descripcion, duracion_horas, precio, dificultad,
        incluye, requisitos, fotos, updated_at
      ) VALUES (
        ${req.nombre}, ${req.descripcion}, ${req.duracion_horas}, ${req.precio},
        ${req.dificultad}, ${req.incluye}, ${req.requisitos}, ${req.fotos || []}, NOW()
      )
      RETURNING 
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
    `;
    
    return paseo!;
  }
);