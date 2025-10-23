
import { Pool } from 'pg';
import { Cuatrimoto, Paseo, Reserva } from '@/types';
import { PageContent } from './pageContent';

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is not set');
}

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  connectionTimeoutMillis: 10000, // 10 seconds
  ssl: {
    rejectUnauthorized: false
  },
  // Configuraciones adicionales para Supabase
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
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
  paginas: {
    findAll: async (): Promise<PageContent[]> => {
      const result = await pool.query(`
        SELECT id, titulo, slug, contenido, estado, elementos, faqs, gallery,
               video_url, history_subtitle, booking_button_text, hero_image_url,
               gallery_title, gallery_description, contact_title, contact_description,
               whatsapp_number, whatsapp_link, sections, nosotros_sections,
               cuatrimotos_sections, experiencias_sections, contacto_sections,
               created_at::text as fechaCreacion, updated_at::text as ultimaModificacion
        FROM paginas
        ORDER BY created_at DESC
      `);

      return result.rows.map(row => ({
        ...row,
        elementos: row.elementos || [],
        faqs: row.faqs || [],
        gallery: row.gallery || [],
        sections: row.sections || {},
        nosotros_sections: row.nosotros_sections || {},
        cuatrimotos_sections: row.cuatrimotos_sections || {},
        experiencias_sections: row.experiencias_sections || {},
        contacto_sections: row.contacto_sections || {},
        fechaCreacion: row.fechacreacion,
        ultimaModificacion: row.ultimamodificacion
      }));
    },

    findBySlug: async (slug: string): Promise<PageContent | null> => {
      const result = await pool.query(`
        SELECT id, titulo, slug, contenido, estado, elementos, faqs, gallery,
               video_url, history_subtitle, booking_button_text, hero_image_url,
               gallery_title, gallery_description, contact_title, contact_description,
               whatsapp_number, whatsapp_link, sections, nosotros_sections,
               cuatrimotos_sections, experiencias_sections, contacto_sections,
               created_at::text as fechaCreacion, updated_at::text as ultimaModificacion
        FROM paginas
        WHERE slug = $1
      `, [slug]);

      if (result.rows.length === 0) return null;

      const row = result.rows[0];
      return {
        ...row,
        elementos: row.elementos || [],
        faqs: row.faqs || [],
        gallery: row.gallery || [],
        sections: row.sections || {},
        nosotros_sections: row.nosotros_sections || {},
        cuatrimotos_sections: row.cuatrimotos_sections || {},
        experiencias_sections: row.experiencias_sections || {},
        contacto_sections: row.contacto_sections || {},
        fechaCreacion: row.fechacreacion,
        ultimaModificacion: row.ultimamodificacion,
        videoUrl: row.video_url,
        historySubtitle: row.history_subtitle,
        bookingButtonText: row.booking_button_text,
        heroImageUrl: row.hero_image_url,
        galleryTitle: row.gallery_title,
        galleryDescription: row.gallery_description,
        contactTitle: row.contact_title,
        contactDescription: row.contact_description,
        whatsappNumber: row.whatsapp_number,
        whatsappLink: row.whatsapp_link
      };
    },

    save: async (page: PageContent): Promise<PageContent> => {
      const {
        id, titulo, slug, contenido, estado, elementos, faqs, gallery,
        videoUrl, historySubtitle, bookingButtonText, heroImageUrl,
        galleryTitle, galleryDescription, contactTitle, contactDescription,
        whatsappNumber, whatsappLink, sections, nosotros_sections,
        cuatrimotos_sections, experiencias_sections, contacto_sections
      } = page;

      const result = await pool.query(`
        INSERT INTO paginas (
          id, titulo, slug, contenido, estado, elementos, faqs, gallery,
          video_url, history_subtitle, booking_button_text, hero_image_url,
          gallery_title, gallery_description, contact_title, contact_description,
          whatsapp_number, whatsapp_link, sections, nosotros_sections,
          cuatrimotos_sections, experiencias_sections, contacto_sections,
          created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, NOW(), NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          titulo = EXCLUDED.titulo,
          slug = EXCLUDED.slug,
          contenido = EXCLUDED.contenido,
          estado = EXCLUDED.estado,
          elementos = EXCLUDED.elementos,
          faqs = EXCLUDED.faqs,
          gallery = EXCLUDED.gallery,
          video_url = EXCLUDED.video_url,
          history_subtitle = EXCLUDED.history_subtitle,
          booking_button_text = EXCLUDED.booking_button_text,
          hero_image_url = EXCLUDED.hero_image_url,
          gallery_title = EXCLUDED.gallery_title,
          gallery_description = EXCLUDED.gallery_description,
          contact_title = EXCLUDED.contact_title,
          contact_description = EXCLUDED.contact_description,
          whatsapp_number = EXCLUDED.whatsapp_number,
          whatsapp_link = EXCLUDED.whatsapp_link,
          sections = EXCLUDED.sections,
          nosotros_sections = EXCLUDED.nosotros_sections,
          cuatrimotos_sections = EXCLUDED.cuatrimotos_sections,
          experiencias_sections = EXCLUDED.experiencias_sections,
          contacto_sections = EXCLUDED.contacto_sections,
          updated_at = NOW()
        RETURNING
          id, titulo, slug, contenido, estado, elementos, faqs, gallery,
          video_url, history_subtitle, booking_button_text, hero_image_url,
          gallery_title, gallery_description, contact_title, contact_description,
          whatsapp_number, whatsapp_link, sections, nosotros_sections,
          cuatrimotos_sections, experiencias_sections, contacto_sections,
          created_at::text as fechaCreacion, updated_at::text as ultimaModificacion
      `, [
        id, titulo, slug, contenido, estado,
        JSON.stringify(elementos || []),
        JSON.stringify(faqs || []),
        JSON.stringify(gallery || []),
        videoUrl, historySubtitle, bookingButtonText, heroImageUrl,
        galleryTitle, galleryDescription, contactTitle, contactDescription,
        whatsappNumber, whatsappLink,
        JSON.stringify(sections || {}),
        JSON.stringify(nosotros_sections || {}),
        JSON.stringify(cuatrimotos_sections || {}),
        JSON.stringify(experiencias_sections || {}),
        JSON.stringify(contacto_sections || {})
      ]);

      const row = result.rows[0];
      return {
        ...row,
        elementos: row.elementos || [],
        faqs: row.faqs || [],
        gallery: row.gallery || [],
        sections: row.sections || {},
        nosotros_sections: row.nosotros_sections || {},
        cuatrimotos_sections: row.cuatrimotos_sections || {},
        experiencias_sections: row.experiencias_sections || {},
        contacto_sections: row.contacto_sections || {},
        fechaCreacion: row.fechacreacion,
        ultimaModificacion: row.ultimamodificacion,
        videoUrl: row.video_url,
        historySubtitle: row.history_subtitle,
        bookingButtonText: row.booking_button_text,
        heroImageUrl: row.hero_image_url,
        galleryTitle: row.gallery_title,
        galleryDescription: row.gallery_description,
        contactTitle: row.contact_title,
        contactDescription: row.contact_description,
        whatsappNumber: row.whatsapp_number,
        whatsappLink: row.whatsapp_link
      };
    },

    delete: async (id: string): Promise<boolean> => {
      const result = await pool.query('DELETE FROM paginas WHERE id = $1', [id]);
      return result.rowCount > 0;
    }
  }
};
