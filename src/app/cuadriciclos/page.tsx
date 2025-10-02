"use client";

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface Cuadriciclo {
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

async function fetchCuadriciclos(): Promise<{cuadriciclos: Cuadriciclo[]}> {
  const response = await fetch('/api/cuadriciclos');
  if (!response.ok) {
    throw new Error('Error fetching cuadriciclos');
  }
  return response.json();
}

export default function CuadriciclosPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['cuadriciclos'],
    queryFn: fetchCuadriciclos,
  });

  if (isLoading) return <div className="p-8">Cargando cuadriciclos...</div>;
  if (error) return <div className="p-8">Error cargando cuadriciclos</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-bold text-xl text-[#145A32]">
              Chocó Aventuras
            </Link>
            <nav className="flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-[#145A32]">
                Inicio
              </Link>
              <Link href="/cuadriciclos" className="text-[#145A32] font-semibold">
                Cuadriciclos
              </Link>
              <Link href="/reservas" className="text-gray-700 hover:text-[#145A32]">
                Reservar
              </Link>
              <Link href="/admin/login" className="text-gray-700 hover:text-[#145A32]">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#145A32] mb-8">Nuestros Cuadriciclos</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.cuadriciclos.map((cuadriciclo) => (
            <Card key={cuadriciclo.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl">{cuadriciclo.nombre}</CardTitle>
                <p className="text-gray-600">{cuadriciclo.marca} {cuadriciclo.modelo}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Año:</span>
                    <span>{cuadriciclo.año || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Color:</span>
                    <span>{cuadriciclo.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Estado:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      cuadriciclo.estado === 'disponible'
                        ? 'bg-green-100 text-green-800'
                        : cuadriciclo.estado === 'ocupado'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {cuadriciclo.estado}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-lg font-semibold text-[#145A32]">
                      ${cuadriciclo.precio_hora.toLocaleString()}/hora
                    </p>
                    <p className="text-sm text-gray-600">
                      ${cuadriciclo.precio_dia.toLocaleString()}/día
                    </p>
                  </div>
                  {cuadriciclo.descripcion && (
                    <p className="text-sm text-gray-700">{cuadriciclo.descripcion}</p>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {cuadriciclo.caracteristicas.map((caracteristica, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                      >
                        {caracteristica}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/reservas"
                    className="block w-full bg-[#E53935] hover:bg-[#D32F2F] text-white text-center py-2 rounded mt-4 transition-colors"
                  >
                    Reservar
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}