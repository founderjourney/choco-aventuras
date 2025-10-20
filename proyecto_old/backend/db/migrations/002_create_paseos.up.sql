-- Create paseos table
CREATE TABLE paseos (
  id BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL,
  descripcion TEXT NOT NULL,
  duracion_horas DECIMAL(4,2) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  dificultad VARCHAR(20) NOT NULL CHECK (dificultad IN ('facil', 'moderado', 'dificil')),
  incluye TEXT[] DEFAULT '{}',
  requisitos TEXT[] DEFAULT '{}',
  fotos TEXT[] DEFAULT '{}',
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add paseo_id to reservas table
ALTER TABLE reservas ADD COLUMN paseo_id BIGINT REFERENCES paseos(id) ON DELETE RESTRICT;

-- Drop old columns from reservas table
ALTER TABLE reservas DROP COLUMN tipo_renta;
ALTER TABLE reservas DROP COLUMN cantidad_tiempo;
ALTER TABLE reservas DROP COLUMN fecha_fin;

-- Rename fecha_inicio to fecha_paseo
ALTER TABLE reservas RENAME COLUMN fecha_inicio TO fecha_paseo;

-- Add index for paseo_id
CREATE INDEX idx_reservas_paseo_id ON reservas(paseo_id);
CREATE INDEX idx_paseos_activo ON paseos(activo);

-- Update existing index
DROP INDEX idx_reservas_fecha_inicio;
CREATE INDEX idx_reservas_fecha_paseo ON reservas(fecha_paseo);



-- Insert 4 example paseos
INSERT INTO paseos (nombre, descripcion, duracion_horas, precio, dificultad, incluye, requisitos, activo) VALUES 
(
  'Aventura Extrema en la Selva',
  'Explora las profundidades de la selva del Chocó en una aventura inolvidable. Atraviesa trochas, cruza ríos y descubre la biodiversidad única de la región.',
  4.0,
  120.00,
  'dificil',
  ARRAY[
    'Guía experto local',
    'Equipo de protección completo',
    'Refrigerios y agua',
    'Seguro de accidentes',
    'Fotografías del recorrido'
  ],
  ARRAY[
    'Edad mínima 16 años',
    'Licencia de conducir vigente',
    'Buena condición física',
    'No tener problemas cardíacos'
  ],
  true
),
(
  'Tour Familiar por Cascadas',
  'Un recorrido tranquilo perfecto para toda la familia. Visita hermosas cascadas y disfruta de paisajes espectaculares sin la adrenalina extrema.',
  2.5,
  75.00,
  'facil',
  ARRAY[
    'Guía bilingüe',
    'Equipo de protección',
    'Snacks y bebidas',
    'Entrada a cascadas',
    'Tiempo para nadar'
  ],
  ARRAY[
    'Edad mínima 12 años',
    'Adulto responsable para menores',
    'Saber nadar (opcional)'
  ],
  true
),
(
  'Ruta del Barro y Adrenalina',
  'Para los amantes de la velocidad y el barro. Experimenta las trochas más desafiantes con obstáculos naturales, lodo profundo y subidas empinadas.',
  3.0,
  95.00,
  'dificil',
  ARRAY[
    'Guía especializado',
    'Equipo de protección premium',
    'Lavado del vehículo',
    'Bebidas energéticas',
    'Video del recorrido'
  ],
  ARRAY[
    'Edad mínima 18 años',
    'Licencia de conducir',
    'Experiencia previa en cuatrimotos',
    'Firmar deslinde de responsabilidad'
  ],
  true
),
(
  'Amanecer en la Montaña',
  'Comienza el día con una experiencia mágica. Sube a la montaña antes del amanecer y disfruta de vistas panorámicas mientras el sol ilumina la selva.',
  3.5,
  110.00,
  'moderado',
  ARRAY[
    'Guía nocturno certificado',
    'Linternas y equipo de seguridad',
    'Desayuno campestre',
    'Café y chocolate caliente',
    'Mantas térmicas'
  ],
  ARRAY[
    'Edad mínima 14 años',
    'Estar dispuesto a madrugar (salida 4:30 AM)',
    'Ropa abrigada',
    'Condición física moderada'
  ],
  true
);