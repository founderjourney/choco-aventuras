
import { Pool } from 'pg';
import { Cuatrimoto, Paseo, Reserva } from '@/types';

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is not set');
}

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  connectionTimeoutMillis: 5000, // 5 seconds
});

export const db = {
  cuatrimotos: {
    findAll: async (): Promise<Cuatrimoto[]> => {
      const result = await pool.query('SELECT id, nombre, marca, modelo, año, color, precio_hora, precio_dia, descripcion, fotos, estado, caracteristicas, created_at, updated_at FROM cuadriciclos ORDER BY created_at DESC');
      return result.rows;
    },
    findById: async (id: number): Promise<Cuatrimoto | null> => {
      const result = await pool.query('SELECT id, nombre, marca, modelo, año, color, precio_hora, precio_dia, descripcion, fotos, estado, caracteristicas, created_at, updated_at FROM cuadriciclos WHERE id = $1', [id]);
      return result.rows[0] || null;
    },
    create: async (data: Omit<Cuatrimoto, 'id' | 'created_at' | 'updated_at'>): Promise<Cuatrimoto> => {
      const { nombre, marca, modelo, año, color, precio_hora, precio_dia, descripcion, fotos, estado, caracteristicas } = data;
      const result = await pool.query(
        'INSERT INTO cuadriciclos (nombre, marca, modelo, año, color, precio_hora, precio_dia, descripcion, fotos, estado, caracteristicas, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW()) RETURNING *',
        [nombre, marca, modelo, año, color, precio_hora, precio_dia, descripcion, fotos, estado, caracteristicas]
      );
      return result.rows[0];
    },
  },
  paseos: {
    findAll: async (includeInactive = false): Promise<Paseo[]> => {
      let query = 'SELECT * FROM paseos';
      if (!includeInactive) {
        query += ' WHERE activo = true';
      }
      query += ' ORDER BY nombre ASC';
      const result = await pool.query(query);
      return result.rows;
    },
    findById: async (id: number): Promise<Paseo | null> => {
      const result = await pool.query('SELECT * FROM paseos WHERE id = $1', [id]);
      return result.rows[0] || null;
    },
    create: async (data: Omit<Paseo, 'id' | 'created_at' | 'updated_at'>): Promise<Paseo> => {
        const { nombre, descripcion, duracion_horas, precio, dificultad, ubicacion, incluye, fotos, activo } = data;
        const result = await pool.query(
            'INSERT INTO paseos (nombre, descripcion, duracion_horas, precio, dificultad, ubicacion, incluye, fotos, activo, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()) RETURNING *',
            [nombre, descripcion, duracion_horas, precio, dificultad, ubicacion, incluye, fotos, activo]
        );
        return result.rows[0];
    },
    update: async (id: number, data: Partial<Omit<Paseo, 'id' | 'created_at' | 'updated_at'>>): Promise<Paseo | null> => {
        const updates: string[] = [];
        const values: any[] = [];
        let paramCount = 1;

        Object.entries(data).forEach(([key, value]) => {
            updates.push(`${key} = $${paramCount}`);
            values.push(value);
            paramCount++;
        });

        if (updates.length === 0) {
            return null;
        }

        updates.push('updated_at = NOW()');
        values.push(id);

        const query = `UPDATE paseos SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;
        const result = await pool.query(query, values);
        return result.rows[0] || null;
    },
    delete: async (id: number): Promise<boolean> => {
        const result = await pool.query('DELETE FROM paseos WHERE id = $1', [id]);
        return result.rowCount > 0;
    },
  },
  reservas: {
    findAll: async (filters?: { estado?: string; fecha?: string }): Promise<Reserva[]> => {
        let query = `
            SELECT 
                r.id, r.cuatrimoto_id, r.paseo_id, r.cliente_nombre, r.cliente_telefono, r.cliente_email, r.fecha_paseo, r.precio_total, r.estado, r.notas, r.created_at, r.updated_at,
                c.nombre as cuadriciclo_nombre,
                c.marca as cuadriciclo_marca,
                c.modelo as cuadriciclo_modelo,
                p.nombre as paseo_nombre,
                p.duracion_horas as paseo_duracion
            FROM reservas r
            JOIN cuadriciclos c ON c.id = r.cuatrimoto_id
            JOIN paseos p ON p.id = r.paseo_id
        `;
        const conditions: string[] = [];
        const values: any[] = [];
        let paramCount = 1;

        if (filters?.estado) {
            conditions.push(`r.estado = $${paramCount}`);
            values.push(filters.estado);
            paramCount++;
        }

        if (filters?.fecha) {
            conditions.push(`DATE(r.fecha_paseo) = $${paramCount}`);
            values.push(filters.fecha);
            paramCount++;
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY r.fecha_paseo DESC';

        const result = await pool.query(query, values);
        return result.rows;
    },
    create: async (data: {
        cuatrimoto_id: number;
        paseo_id: number;
        cliente_nombre: string;
        cliente_telefono: string;
        cliente_email: string;
        fecha_paseo: Date;
        notas?: string;
    }): Promise<Reserva> => {
        const { cuatrimoto_id, paseo_id, cliente_nombre, cliente_telefono, cliente_email, fecha_paseo, notas } = data;

        const cuatrimotoRes = await pool.query('SELECT precio_hora, nombre, marca, modelo FROM cuadriciclos WHERE id = $1', [cuatrimoto_id]);
        const paseoRes = await pool.query('SELECT precio, duracion_horas, nombre FROM paseos WHERE id = $1', [paseo_id]);

        if (cuatrimotoRes.rows.length === 0 || paseoRes.rows.length === 0) {
            throw new Error('Cuatrimoto o paseo no encontrado');
        }

        const cuatrimoto = cuatrimotoRes.rows[0];
        const paseo = paseoRes.rows[0];

        const precio_total = cuatrimoto.precio_hora * paseo.duracion_horas + paseo.precio;

        const result = await pool.query(
            'INSERT INTO reservas (cuatrimoto_id, paseo_id, cliente_nombre, cliente_telefono, cliente_email, fecha_paseo, precio_total, notas, estado, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()) RETURNING *',
            [cuatrimoto_id, paseo_id, cliente_nombre, cliente_telefono, cliente_email, fecha_paseo, precio_total, notas, 'pendiente']
        );
        
        const newReserva = result.rows[0];

        return {
            ...newReserva,
            cuatrimoto_nombre: cuatrimoto.nombre,
            cuatrimoto_marca: cuatrimoto.marca,
            cuatrimoto_modelo: cuatrimoto.modelo,
            paseo_nombre: paseo.nombre,
            paseo_duracion: paseo.duracion_horas,
        };
    },
  },
};
