
"use client";

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit2, Eye } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';

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
  created_at: Date;
  updated_at: Date;
}

async function fetchCuatrimotos(): Promise<{cuatrimotos: Cuatrimoto[]}> {
  const response = await fetch('/api/cuadriciclos');
  if (!response.ok) throw new Error('Error fetching cuatrimotos');
  return response.json();
}

export default function AdminCuatrimotos() {
  const { user, isLoading: authLoading, requireAuth } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-cuatrimotos'],
    queryFn: fetchCuatrimotos,
  });

  useEffect(() => {
    if (!authLoading) {
      requireAuth();
    }
  }, [authLoading, requireAuth]);

  if (authLoading || isLoading) return <div className="p-8">Cargando cuatrimotos...</div>;
  if (error) return <div className="p-8">Error cargando cuatrimotos</div>;
  if (!user) {
    return null; // Redirecting to login
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-bold text-xl text-[#145A32]">
              Chocó Aventuras - Admin
            </Link>
            <nav className="flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-[#145A32]">
                Inicio
              </Link>
              <Link href="/cuadriciclos" className="text-gray-700 hover:text-[#145A32]">
                Cuatrimotos
              </Link>
              <Link href="/reservas" className="text-gray-700 hover:text-[#145A32]">
                Reservar
              </Link>
              <Link href="/admin" className="text-[#145A32] font-semibold">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/admin" className="flex items-center gap-2 text-gray-600 hover:text-[#145A32]">
            <ArrowLeft className="h-4 w-4" />
            Volver al Panel
          </Link>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#145A32]">Gestión de Cuatrimotos</h1>
            <p className="text-gray-600 mt-2">Administra el inventario de cuatrimotos</p>
          </div>
          <Link href="/admin/cuatrimotos/nuevo">
            <Button className="bg-[#145A32] hover:bg-[#0f4428]">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Cuatrimoto
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Cuatrimotos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#145A32]">
                {data?.cuatrimotos.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {data?.cuatrimotos.filter(c => c.estado === 'disponible').length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">En Mantenimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {data?.cuatrimotos.filter(c => c.estado === 'mantenimiento').length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cuatrimotos List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Cuatrimotos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.cuatrimotos.map((cuatrimoto) => (
                <div key={cuatrimoto.id} className="flex items-center justify-between p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-semibold">{cuatrimoto.nombre}</h3>
                      <Badge variant={
                        cuatrimoto.estado === 'disponible' ? 'default' :
                        cuatrimoto.estado === 'ocupado' ? 'destructive' :
                        'secondary'
                      }>
                        {cuatrimoto.estado}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Marca:</span> {cuatrimoto.marca}
                      </div>
                      <div>
                        <span className="font-medium">Modelo:</span> {cuatrimoto.modelo}
                      </div>
                      <div>
                        <span className="font-medium">Año:</span> {cuatrimoto.año || 'N/A'}
                      </div>
                      <div>
                        <span className="font-medium">Color:</span> {cuatrimoto.color}
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-[#145A32]">Precio/hora:</span> ${cuatrimoto.precio_hora.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium text-[#145A32]">Precio/día:</span> ${cuatrimoto.precio_dia.toLocaleString()}
                      </div>
                    </div>

                    {cuatrimoto.descripcion && (
                      <p className="mt-2 text-sm text-gray-700">{cuatrimoto.descripcion}</p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-2">
                      {cuatrimoto.caracteristicas.map((caracteristica, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                        >
                          {caracteristica}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-6">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </div>
                </div>
              ))}

              {(!data?.cuatrimotos || data.cuatrimotos.length === 0) && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <div className="h-16 w-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-3xl">🏍️</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No hay cuatrimotos</h3>
                  <p className="text-gray-500 mb-4">Comienza agregando tu primer cuatrimoto</p>
                  <Button className="bg-[#145A32] hover:bg-[#0f4428]">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Primer Cuatrimoto
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}