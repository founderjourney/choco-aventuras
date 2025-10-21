-- Crear tablas para Chocó Aventuras
-- Base de datos PostgreSQL en Supabase

-- Tabla cuadriciclos (cuatrimotos)
CREATE TABLE IF NOT EXISTS cuadriciclos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    año INTEGER NOT NULL,
    color VARCHAR(50) NOT NULL,
    precio_hora DECIMAL(10,2) NOT NULL,
    precio_dia DECIMAL(10,2) NOT NULL,
    descripcion TEXT,
    fotos TEXT[], -- Array de URLs de fotos
    estado VARCHAR(20) DEFAULT 'disponible' CHECK (estado IN ('disponible', 'mantenimiento', 'reservado', 'fuera_servicio')),
    caracteristicas TEXT[], -- Array de características
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla paseos (tours/aventuras)
CREATE TABLE IF NOT EXISTS paseos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    duracion_horas DECIMAL(3,1) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    dificultad VARCHAR(20) NOT NULL CHECK (dificultad IN ('facil', 'intermedio', 'dificil', 'extremo')),
    ubicacion VARCHAR(255) NOT NULL,
    incluye TEXT[], -- Array de lo que incluye el paseo
    fotos TEXT[], -- Array de URLs de fotos
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla reservas
CREATE TABLE IF NOT EXISTS reservas (
    id SERIAL PRIMARY KEY,
    cuatrimoto_id INTEGER NOT NULL REFERENCES cuadriciclos(id) ON DELETE RESTRICT,
    paseo_id INTEGER NOT NULL REFERENCES paseos(id) ON DELETE RESTRICT,
    cliente_nombre VARCHAR(255) NOT NULL,
    cliente_telefono VARCHAR(20) NOT NULL,
    cliente_email VARCHAR(255) NOT NULL,
    fecha_paseo TIMESTAMP WITH TIME ZONE NOT NULL,
    precio_total DECIMAL(10,2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmada', 'cancelada', 'completada')),
    notas TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_cuadriciclos_estado ON cuadriciclos(estado);
CREATE INDEX IF NOT EXISTS idx_paseos_activo ON paseos(activo);
CREATE INDEX IF NOT EXISTS idx_reservas_fecha ON reservas(fecha_paseo);
CREATE INDEX IF NOT EXISTS idx_reservas_estado ON reservas(estado);
CREATE INDEX IF NOT EXISTS idx_reservas_cuatrimoto ON reservas(cuatrimoto_id);
CREATE INDEX IF NOT EXISTS idx_reservas_paseo ON reservas(paseo_id);

-- Insertar datos iniciales de cuadriciclos
INSERT INTO cuadriciclos (nombre, marca, modelo, año, color, precio_hora, precio_dia, descripcion, fotos, estado, caracteristicas) VALUES
('Yamaha Grizzly 700 Rojo', 'Yamaha', 'Grizzly 700', 2009, 'Rojo Edition Special', 150000, 800000, 'Cuatrimoto deportiva edición especial, perfecta para aventuras extremas en el Chocó.', ARRAY['/cuadri1.jpg', '/cuadri1-2.jpg'], 'disponible', ARRAY['700cc', '4x4', 'Deportivo', 'Edition Special', 'Reversa']),
('Yamaha Grizzly 700 Negro', 'Yamaha', 'Grizzly 700', 2009, 'Negro', 150000, 800000, 'Cuatrimoto robusta y confiable, ideal para todo tipo de terrenos.', ARRAY['/cuadri2.jpg'], 'disponible', ARRAY['700cc', '4x4', 'Automático', 'Frenos de disco', 'Suspensión independiente']),
('Yamaha Grizzly 700 Azul', 'Yamaha', 'Grizzly 700', 2009, 'Azul', 150000, 800000, 'Cuatrimoto potente y versátil, perfecta para expediciones largas.', ARRAY['/cuadri3.jpg'], 'disponible', ARRAY['700cc', '4x4', 'Potente', 'Resistente', 'Cómodo'])
ON CONFLICT DO NOTHING;

-- Insertar datos iniciales de paseos
INSERT INTO paseos (nombre, descripcion, duracion_horas, precio, dificultad, ubicacion, incluye, fotos, activo) VALUES
('Aventura en el Bosque', 'Recorrido por senderos naturales del bosque húmedo tropical del Chocó', 2.0, 200000, 'facil', 'Bosque Los Pinos - Quibdó', ARRAY['Guía especializado', 'Casco de seguridad', 'Seguro de accidentes', 'Hidratación'], ARRAY['/paseo1.jpg'], true),
('Ruta Extrema', 'Aventura para expertos en terrenos difíciles y montañosos', 4.0, 350000, 'dificil', 'Montaña El Águila - Chocó', ARRAY['Guía experto', 'Equipo de protección completo', 'Almuerzo típico', 'Seguro premium', 'Fotografía profesional'], ARRAY['/paseo2.jpg'], true),
('Expedición Río Atrato', 'Combinación de cuatrimoto y navegación fluvial', 6.0, 500000, 'intermedio', 'Cuenca del Río Atrato', ARRAY['Guía bilingüe', 'Equipo completo', 'Almuerzo', 'Transporte fluvial', 'Avistamiento de fauna'], ARRAY['/paseo3.jpg'], true)
ON CONFLICT DO NOTHING;

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_cuadriciclos_updated_at BEFORE UPDATE ON cuadriciclos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_paseos_updated_at BEFORE UPDATE ON paseos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reservas_updated_at BEFORE UPDATE ON reservas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();