
"use client";

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit2, Eye, MapPin, Clock, DollarSign } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';

interface Paseo {
  id: number;
  nombre: string;
  descripcion: string;
  duracion_horas: number;
  precio: number;
  dificultad: 'facil' | 'intermedio' | 'dificil';
  ubicacion: string;
  incluye: string[];
  fotos: string[];
  activo: boolean;
  created_at: Date;
  updated_at: Date;
}

async function fetchPaseos(): Promise<{paseos: Paseo[]}> {
  const response = await fetch('/api/paseos?include_inactive=true');
  if (!response.ok) throw new Error('Error fetching paseos');
  return response.json();
}

const getDificultadColor = (dificultad: string) => {
  switch (dificultad) {
    case 'facil': return 'bg-green-100 text-green-800';
    case 'intermedio': return 'bg-yellow-100 text-yellow-800';
    case 'dificil': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function AdminPaseos() {
  const { user, isLoading: authLoading, requireAuth } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-paseos'],
    queryFn: fetchPaseos,
  });

  useEffect(() => {
    if (!authLoading) {
      requireAuth();
    }
  }, [authLoading, requireAuth]);

  if (authLoading || isLoading) return <div className="p-8">Cargando paseos...</div>;
  if (error) return <div className="p-8">Error cargando paseos</div>;
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
            <h1 className="text-3xl font-bold text-[#145A32]">Gestión de Paseos</h1>
            <p className="text-gray-600 mt-2">Administra las experiencias y rutas disponibles</p>
          </div>
          <Link href="/admin/paseos/nuevo">
            <Button className="bg-[#1565C0] hover:bg-[#0d47a1]">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Paseo
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Paseos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#1565C0]">
                {data?.paseos.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {data?.paseos.filter(p => p.activo).length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Precio Promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#E53935]">
                ${data?.paseos.reduce((acc, p) => acc + p.precio, 0) / (data?.paseos.length || 1) || 0}k
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Paseos List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Paseos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {data?.paseos.map((paseo) => (
                <div key={paseo.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{paseo.nombre}</h3>
                        <Badge variant={paseo.activo ? 'default' : 'secondary'}>
                          {paseo.activo ? 'Activo' : 'Inactivo'}
                        </Badge>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDificultadColor(paseo.dificultad)}`}>
                          {paseo.dificultad}
                        </span>
                      </div>
                      <p className="text-gray-600 max-w-2xl">{paseo.descripcion}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Link href={`/admin/paseos/${paseo.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </Button>
                      </Link>
                      <Link href={`/admin/paseos/${paseo.id}/editar`}>
                        <Button variant="outline" size="sm" className="w-full">
                          <Edit2 className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-[#1565C0]" />
                      <span className="font-medium">Duración:</span>
                      <span>{paseo.duracion_horas} horas</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-[#E53935]" />
                      <span className="font-medium">Precio:</span>
                      <span className="font-semibold">${paseo.precio.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-[#F1C40F]" />
                      <span className="font-medium">Ubicación:</span>
                      <span>{paseo.ubicacion}</span>
                    </div>
                  </div>

                  {/* Incluye */}
                  <div className="mb-4">
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Incluye:</h4>
                    <div className="flex flex-wrap gap-2">
                      {paseo.incluye.map((item, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#145A32]/10 text-[#145A32] text-xs rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fecha de creación */}
                  <div className="text-xs text-gray-500">
                    Creado: {new Date(paseo.created_at).toLocaleDateString('es-CO')}
                  </div>
                </div>
              ))}

              {(!data?.paseos || data.paseos.length === 0) && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <MapPin className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No hay paseos</h3>
                  <p className="text-gray-500 mb-4">Comienza agregando tu primera experiencia</p>
                  <Button className="bg-[#1565C0] hover:bg-[#0d47a1]">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Primer Paseo
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