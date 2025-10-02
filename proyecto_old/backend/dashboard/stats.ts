import { api } from "encore.dev/api";
import db from "../db";

export interface DashboardStats {
  reservas_hoy: number;
  ingresos_hoy: number;
  cuadris_ocupados: number;
  total_cuadriciclos: number;
  reservas_pendientes: number;
}

// Retrieves dashboard statistics for today.
export const getStats = api<void, DashboardStats>(
  { expose: true, method: "GET", path: "/dashboard/stats" },
  async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get today's reservations count
    const reservasHoy = await db.queryRow<{ count: number }>`
      SELECT COUNT(*) as count FROM reservas 
      WHERE DATE(fecha_inicio) = CURRENT_DATE
    `;

    // Get today's income
    const ingresosHoy = await db.queryRow<{ total: number }>`
      SELECT COALESCE(SUM(precio_total), 0)::float as total FROM reservas 
      WHERE DATE(fecha_inicio) = CURRENT_DATE 
      AND estado IN ('confirmada', 'completada')
    `;

    // Get occupied cuadriciclos count
    const cuadrisOcupados = await db.queryRow<{ count: number }>`
      SELECT COUNT(*) as count FROM cuadriciclos 
      WHERE estado = 'ocupado'
    `;

    // Get total cuadriciclos count
    const totalCuadriciclos = await db.queryRow<{ count: number }>`
      SELECT COUNT(*) as count FROM cuadriciclos
    `;

    // Get pending reservations count
    const reservasPendientes = await db.queryRow<{ count: number }>`
      SELECT COUNT(*) as count FROM reservas 
      WHERE estado = 'pendiente'
    `;

    return {
      reservas_hoy: reservasHoy?.count || 0,
      ingresos_hoy: ingresosHoy?.total || 0,
      cuadris_ocupados: cuadrisOcupados?.count || 0,
      total_cuadriciclos: totalCuadriciclos?.count || 0,
      reservas_pendientes: reservasPendientes?.count || 0,
    };
  }
);
