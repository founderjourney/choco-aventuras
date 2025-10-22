"use client";

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit2, Calendar, MapPin, Settings, Image as ImageIcon } from 'lucide-react';

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

export default function DetallesCuatrimoto() {
  const params = useParams();
  const cuatriciloId = params.id as string;
  const { user, isLoading: authLoading, requireAuth } = useAuth();

  const { data: cuatriciloData, isLoading, error } = useQuery({
    queryKey: ['cuatricilo', cuatriciloId],
    queryFn: async () => {
      const response = await fetch(`/api/cuadriciclos/${cuatriciloId}`);
      if (!response.ok) throw new Error('Error al cargar cuatrimoto');
      return response.json() as Promise<{cuatrimoto: Cuatrimoto}>;
    },
    enabled: !!cuatriciloId
  });

  useEffect(() => {
    if (!authLoading) {
      requireAuth();
    }
  }, [authLoading, requireAuth]);

  if (authLoading || isLoading) {
    return <div className="p-8">Cargando detalles...</div>;
  }

  if (error) {
    return <div className="p-8">Error cargando cuatrimoto</div>;
  }

  if (!user) {
    return null; // Redirecting to login
  }

  const cuatrimoto = cuatriciloData?.cuatrimoto;

  if (!cuatrimoto) {
    return <div className="p-8">Cuatrimoto no encontrada</div>;
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'disponible': return 'bg-green-100 text-green-800';
      case 'ocupado': return 'bg-red-100 text-red-800';
      case 'mantenimiento': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
          <Link href="/admin" className="text-gray-600 hover:text-[#145A32]">
            Panel
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/admin/cuadriciclos" className="text-gray-600 hover:text-[#145A32]">
            Cuatrimotos
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#145A32] font-medium">Detalles</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold text-[#145A32]">{cuatrimoto.nombre}</h1>
              <Badge className={getEstadoColor(cuatrimoto.estado)}>
                {cuatrimoto.estado}
              </Badge>
            </div>
            <p className="text-gray-600">
              {cuatrimoto.marca} {cuatrimoto.modelo} {cuatrimoto.año && `- ${cuatrimoto.año}`}
            </p>
          </div>

          <div className="flex gap-3">
            <Link href="/admin/cuadriciclos">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <Link href={`/admin/cuadriciclos/${cuatriciloId}/editar`}>
              <Button className="bg-[#145A32] hover:bg-[#0f4428]">
                <Edit2 className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Galería de Fotos */}
            {cuatrimoto.fotos && cuatrimoto.fotos.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Galería de Fotos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {cuatrimoto.fotos.map((foto, index) => (
                      <div key={index} className="aspect-video">
                        <img
                          src={foto}
                          alt={`${cuatrimoto.nombre} - Foto ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg border"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Información Básica */}
            <Card>
              <CardHeader>
                <CardTitle>Información del Vehículo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Marca</div>
                    <div className="font-semibold">{cuatrimoto.marca}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Modelo</div>
                    <div className="font-semibold">{cuatrimoto.modelo}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Año</div>
                    <div className="font-semibold">{cuatrimoto.año || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Color</div>
                    <div className="font-semibold">{cuatrimoto.color}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Estado</div>
                    <Badge className={getEstadoColor(cuatrimoto.estado)}>
                      {cuatrimoto.estado}
                    </Badge>
                  </div>
                </div>

                {cuatrimoto.descripcion && (
                  <div className="mt-6">
                    <div className="text-sm text-gray-500 mb-2">Descripción</div>
                    <p className="text-gray-700 leading-relaxed">{cuatrimoto.descripcion}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Características */}
            {cuatrimoto.caracteristicas && cuatrimoto.caracteristicas.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Características
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cuatrimoto.caracteristicas.map((caracteristica, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#145A32] rounded-full"></div>
                        <span className="text-gray-700">{caracteristica}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Historial */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Información del Sistema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Fecha de creación:</span>
                    <span className="text-sm font-medium">{formatDate(cuatrimoto.created_at)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Última actualización:</span>
                    <span className="text-sm font-medium">{formatDate(cuatrimoto.updated_at)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-500">ID del sistema:</span>
                    <span className="text-sm font-medium">#{cuatrimoto.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Precios */}
            <Card>
              <CardHeader>
                <CardTitle>Precios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-[#145A32] bg-opacity-10 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Precio por Hora</div>
                  <div className="text-2xl font-bold text-[#145A32]">
                    ${cuatrimoto.precio_hora.toLocaleString()}
                  </div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Precio por Día</div>
                  <div className="text-2xl font-bold text-green-600">
                    ${cuatrimoto.precio_dia.toLocaleString()}
                  </div>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  Precios en pesos colombianos (COP)
                </div>
              </CardContent>
            </Card>

            {/* Acciones Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/admin/cuadriciclos/${cuatriciloId}/editar`} className="block">
                  <Button className="w-full bg-[#145A32] hover:bg-[#0f4428]">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Editar Cuatrimoto
                  </Button>
                </Link>

                <Link href="/admin/reservas" className="block">
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Ver Reservas
                  </Button>
                </Link>

                <Link href={`/cuadriciclos`} className="block">
                  <Button variant="outline" className="w-full">
                    <MapPin className="h-4 w-4 mr-2" />
                    Ver en Sitio Público
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Estadísticas */}
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total fotos:</span>
                  <span className="font-medium">{cuatrimoto.fotos?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Características:</span>
                  <span className="font-medium">{cuatrimoto.caracteristicas?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Estado actual:</span>
                  <Badge className={getEstadoColor(cuatrimoto.estado)} variant="outline">
                    {cuatrimoto.estado}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}