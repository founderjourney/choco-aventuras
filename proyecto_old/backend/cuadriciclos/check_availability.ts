import { api } from "encore.dev/api";
import { Query } from "encore.dev/api";
import db from "../db";

export interface CheckAvailabilityParams {
  cuadricicloId: Query<number>;
  paseoId: Query<number>;
  fechaPaseo: Query<string>;
}

export interface AvailabilityResponse {
  available: boolean;
}

export const checkAvailability = api<CheckAvailabilityParams, AvailabilityResponse>(
  { expose: true, method: "GET", path: "/cuadriciclos/availability" },
  async ({ cuadricicloId, paseoId, fechaPaseo }) => {
    const targetDate = new Date(fechaPaseo);

    const conflictingReservation = await db.queryRow<{ id: number }>`
      SELECT r.id FROM reservas r
      JOIN cuadriciclos c ON c.id = r.cuadriciclo_id
      WHERE r.cuadriciclo_id = ${cuadricicloId}
      AND c.estado = 'disponible'
      AND r.estado IN ('pendiente', 'confirmada')
      AND r.paseo_id = ${paseoId}
      AND DATE(r.fecha_paseo) = DATE(${targetDate})
      LIMIT 1
    `;

    return { available: !conflictingReservation };
  }
);
