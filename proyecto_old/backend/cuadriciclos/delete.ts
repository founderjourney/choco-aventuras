import { api, APIError } from "encore.dev/api";
import db from "../db";

interface DeleteCuadricicloParams {
  id: number;
}

// Deletes a cuadriciclo if it has no pending or confirmed reservations.
export const deleteCuadriciclo = api<DeleteCuadricicloParams, void>(
  { expose: true, method: "DELETE", path: "/cuadriciclos/:id" },
  async ({ id }) => {
    // Check if there are any active reservations
    const activeReservations = await db.queryRow<{ count: number }>`
      SELECT COUNT(*) as count FROM reservas 
      WHERE cuadriciclo_id = ${id} 
      AND estado IN ('pendiente', 'confirmada')
    `;

    if (activeReservations && activeReservations.count > 0) {
      throw APIError.failedPrecondition("cannot delete cuadriciclo with active reservations");
    }

    const result = await db.exec`DELETE FROM cuadriciclos WHERE id = ${id}`;
    // Note: We can't check affected rows in Encore.ts, so we'll assume success
  }
);
