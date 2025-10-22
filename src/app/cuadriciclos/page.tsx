"use client";

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Footer from '@/components/Footer';
import CallToAction from '@/components/CallToAction';
import Navigation from '@/components/Navigation';

interface Cuatrimoto {
  id: number;
  nombre: string;
  marca: string;
  modelo: string;
  año: number | null;
  color: string;
  precio_hora: number;
  precio_dia: number;
  descripcion: string | null;
  fotos: string[];
  estado: 'disponible' | 'ocupado' | 'mantenimiento';
  caracteristicas: string[];
}

async function fetchCuatrimotos(): Promise<{cuatrimotos: Cuatrimoto[]}> {
  const response = await fetch('/api/cuadriciclos');
  if (!response.ok) {
    throw new Error('Error fetching cuatrimotos');
  }
  return response.json();
}

export default function CuatrimotosPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['cuatrimotos'],
    queryFn: fetchCuatrimotos,
  });

  if (isLoading) return <div className="p-8">Cargando cuatrimotos...</div>;
  if (error) return <div className="p-8">Error cargando cuatrimotos</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-[#145A32] mb-8">Nuestras Cuatrimotos</h1>

        {/* Hero Section de Cuatrimotos */}
        <div className="bg-gradient-to-r from-[#145A32] to-[#1565C0] rounded-3xl p-8 mb-12 text-white jungle-particles adventure-glow">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4 jungle-text quad-vibration">YAMAHA GRIZZLY 700</h2>
              <p className="text-xl mb-6">Modelo 2009</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-[#F1C40F]"></span>
                  <span>Experiencias 100% en la selva del Chocó</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#F1C40F]"></span>
                  <span>Tours por rutas extremas (aventura sobre barro, trochas y selva)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#F1C40F]"></span>
                  <span>Paintball en escenarios naturales</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#F1C40F]"></span>
                  <span>Enfoque cultural chocoano (música y fiestas de San Pacho)</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-4">Información de Reserva</h3>
                <div className="space-y-2 text-left">
                  <p><strong>Edad mínima:</strong> 16 años</p>
                  <p><strong>Licencia:</strong> Obligatoria para el conductor</p>
                  <p><strong>Depósito:</strong> 50% del valor del servicio</p>
                  <p><strong>Horarios:</strong> 7:00 AM - 5:00 PM</p>
                </div>
                <div className="mt-6">
                  <Link href="/reservas">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg">
                      RESERVAR AHORA
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Requerimientos de Seguridad */}
        <div className="bg-[#F5F5F5] rounded-2xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-[#145A32] mb-4 flex items-center gap-2">
             Requerimientos de Seguridad
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p><strong>Ropa obligatoria:</strong> Ropa cómoda, resistente y que se pueda ensuciar</p>
              <p><strong>Calzado:</strong> Obligatorio calzado cerrado y resistente</p>
              <p><strong>Protección:</strong> Uso obligatorio de casco, chaleco y protección provista</p>
            </div>
            <div className="space-y-2">
              <p><strong>Guías:</strong> Locales expertos que conocen el territorio</p>
              <p><strong>Grupos:</strong> Ideal para integración y team building empresarial</p>
              <p><strong>Responsabilidad:</strong> Cliente responsable por daños por mal uso</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.cuatrimotos.map((cuatrimoto) => (
            <Card key={cuatrimoto.id} className="overflow-hidden adventure-card">
              <CardHeader>
                <CardTitle className="text-xl">{cuatrimoto.nombre}</CardTitle>
                <p className="text-gray-600">{cuatrimoto.marca} {cuatrimoto.modelo}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Año:</span>
                    <span>{cuatrimoto.año || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Color:</span>
                    <span>{cuatrimoto.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Estado:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      cuatrimoto.estado === 'disponible'
                        ? 'bg-green-100 text-green-800'
                        : cuatrimoto.estado === 'ocupado'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {cuatrimoto.estado}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-lg font-semibold text-[#145A32]">
                      ${cuatrimoto.precio_hora.toLocaleString()}/hora
                    </p>
                    <p className="text-sm text-gray-600">
                      ${cuatrimoto.precio_dia.toLocaleString()}/día
                    </p>
                  </div>
                  {cuatrimoto.descripcion && (
                    <p className="text-sm text-gray-700">{cuatrimoto.descripcion}</p>
                  )}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {cuatrimoto.caracteristicas.map((caracteristica, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                      >
                        {caracteristica}
                      </span>
                    ))}
                  </div>
                  <div className="pt-4">
                    <Link
                      href="/reservas"
                      className="block w-full bg-[#E53935] hover:bg-[#D32F2F] text-white text-center py-3 rounded transition-colors font-semibold adrenaline-button speed-lines relative z-10"
                    >
                      RESERVAR AQUÍ
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <CallToAction
          titulo="¿Listo para la Máxima Aventura?"
          descripcion="Reserva tu Yamaha Grizzly 700 y vive experiencias extremas en la selva del Chocó"
          botonPrimario={{ texto: "RESERVAR CUATRIMOTO", href: "/reservas" }}
          botonSecundario={{ texto: "VER EXPERIENCIAS", href: "/experiencias" }}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}