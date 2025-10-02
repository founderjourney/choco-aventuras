-- Create cuadriciclos table
CREATE TABLE cuadriciclos (
  id BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  marca VARCHAR(50) NOT NULL,
  modelo VARCHAR(50) NOT NULL,
  año INTEGER,
  color VARCHAR(30),
  precio_hora DECIMAL(10,2) NOT NULL,
  precio_dia DECIMAL(10,2) NOT NULL,
  descripcion TEXT,
  fotos TEXT[] DEFAULT '{}',
  estado VARCHAR(20) DEFAULT 'disponible' CHECK (estado IN ('disponible', 'ocupado', 'mantenimiento')),
  caracteristicas TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create reservas table
CREATE TABLE reservas (
  id BIGSERIAL PRIMARY KEY,
  cuadriciclo_id BIGINT REFERENCES cuadriciclos(id) ON DELETE RESTRICT,
  cliente_nombre VARCHAR(100) NOT NULL,
  cliente_telefono VARCHAR(20) NOT NULL,
  cliente_email VARCHAR(100) NOT NULL,
  fecha_inicio TIMESTAMP NOT NULL,
  fecha_fin TIMESTAMP NOT NULL,
  tipo_renta VARCHAR(10) NOT NULL CHECK (tipo_renta IN ('hora', 'dia')),
  cantidad_tiempo INTEGER NOT NULL,
  precio_total DECIMAL(10,2) NOT NULL,
  estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmada', 'completada', 'cancelada')),
  notas TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_cuadriciclos_estado ON cuadriciclos(estado);
CREATE INDEX idx_reservas_fecha_inicio ON reservas(fecha_inicio);
CREATE INDEX idx_reservas_fecha_fin ON reservas(fecha_fin);
CREATE INDEX idx_reservas_estado ON reservas(estado);
CREATE INDEX idx_reservas_cuadriciclo_id ON reservas(cuadriciclo_id);

-- Insert sample data for Chocó Aventuras
INSERT INTO cuadriciclos (nombre, marca, modelo, año, color, precio_hora, precio_dia, descripcion, caracteristicas) VALUES 
('Grizzly 700 Edition Special', 'Yamaha', 'Grizzly 700', 2009, 'Rojo', 75.00, 450.00, 'Experiencias 100% en la selva del Chocó con contacto directo con la naturaleza', ARRAY[
  'Motor 700cc potente',
  'Tours en cuatrimoto por rutas extremas',
  'Aventura sobre barro, trochas y selva',
  'Guías locales expertos',
  'Equipos de protección incluidos',
  'Ideal para grupos y empresas',
  'Seguridad garantizada'
]),
('Raptor 250', 'Yamaha', 'Raptor', 2023, 'Azul', 50.00, 300.00, 'Cuadriciclo deportivo ideal para aventuras', ARRAY['Motor 250cc', 'Automático', 'Frenos de disco']),
('TRX 90', 'Honda', 'TRX', 2022, 'Rojo', 40.00, 250.00, 'Perfecto para principiantes y familias', ARRAY['Motor 90cc', 'Fácil manejo', 'Muy seguro']);
