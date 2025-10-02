import { api, APIError } from "encore.dev/api";
import db from "../db";
import type { Paseo } from "./list";

export interface UpdatePaseoRequest {
  id: number;
  nombre?: string;
  descripcion?: string;
  duracion_horas?: number;
  precio?: number;
  dificultad?: 'facil' | 'moderado' | 'dificil';
  incluye?: string[];
  requisitos?: string[];
  fotos?: string[];
  activo?: boolean;
}

export const update = api<UpdatePaseoRequest, Paseo>(
  { expose: true, method: "PUT", path: "/paseos/:id" },
  async (req) => {
    const existing = await db.queryRow<{ id: number }>`
      SELECT id FROM paseos WHERE id = ${req.id}
    `;
    
    if (!existing) {
      throw APIError.notFound("paseo not found");
    }

    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (req.nombre !== undefined) {
      updates.push(`nombre = $${paramCount}`);
      values.push(req.nombre);
      paramCount++;
    }
    if (req.descripcion !== undefined) {
      updates.push(`descripcion = $${paramCount}`);
      values.push(req.descripcion);
      paramCount++;
    }
    if (req.duracion_horas !== undefined) {
      updates.push(`duracion_horas = $${paramCount}`);
      values.push(req.duracion_horas);
      paramCount++;
    }
    if (req.precio !== undefined) {
      updates.push(`precio = $${paramCount}`);
      values.push(req.precio);
      paramCount++;
    }
    if (req.dificultad !== undefined) {
      updates.push(`dificultad = $${paramCount}`);
      values.push(req.dificultad);
      paramCount++;
    }
    if (req.incluye !== undefined) {
      updates.push(`incluye = $${paramCount}`);
      values.push(req.incluye);
      paramCount++;
    }
    if (req.requisitos !== undefined) {
      updates.push(`requisitos = $${paramCount}`);
      values.push(req.requisitos);
      paramCount++;
    }
    if (req.fotos !== undefined) {
      updates.push(`fotos = $${paramCount}`);
      values.push(req.fotos);
      paramCount++;
    }
    if (req.activo !== undefined) {
      updates.push(`activo = $${paramCount}`);
      values.push(req.activo);
      paramCount++;
    }

    updates.push(`updated_at = NOW()`);

    const query = `
      UPDATE paseos
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
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
    values.push(req.id);

    const paseo = await db.rawQueryRow<Paseo>(query, ...values);
    return paseo!;
  }
);