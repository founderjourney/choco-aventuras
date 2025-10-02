import { api, APIError } from "encore.dev/api";
import db from "../db";

export interface DeletePaseoRequest {
  id: number;
}

export interface DeletePaseoResponse {
  success: boolean;
}

export const deletePaseo = api<DeletePaseoRequest, DeletePaseoResponse>(
  { expose: true, method: "DELETE", path: "/paseos/:id" },
  async ({ id }) => {
    const existing = await db.queryRow<{ id: number }>`
      SELECT id FROM paseos WHERE id = ${id}
    `;
    
    if (!existing) {
      throw APIError.notFound("paseo not found");
    }

    const hasReservations = await db.queryRow<{ count: number }>`
      SELECT COUNT(*)::int as count FROM reservas WHERE paseo_id = ${id}
    `;

    if (hasReservations && hasReservations.count > 0) {
      await db.exec`
        UPDATE paseos SET activo = false, updated_at = NOW() WHERE id = ${id}
      `;
    } else {
      await db.exec`
        DELETE FROM paseos WHERE id = ${id}
      `;
    }

    return { success: true };
  }
);