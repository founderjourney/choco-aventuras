"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { ArrowLeft, Search, Calendar, Phone, Mail, Car, MapPin } from 'lucide-react';
import { useState } from 'react';

interface Reserva {
  id: number;
  cuadriciclo_id: number;
  paseo_id: number;
  cliente_nombre: string;
  cliente_telefono: string;
  cliente_email: string;
  fecha_paseo: Date;
  precio_total: number;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
  notas?: string;
  created_at: Date;
  updated_at: Date;
  cuadriciclo_nombre: string;
  cuadriciclo_marca: string;
  cuadriciclo_modelo: string;
  paseo_nombre: string;
  paseo_duracion: number;
}

async function fetchReservas(filters?: { estado?: string; fecha?: string }): Promise<{reservas: Reserva[]}> {
  const params = new URLSearchParams();
  if (filters?.estado) params.append('estado', filters.estado);
  if (filters?.fecha) params.append('fecha', filters.fecha);

  const response = await fetch(`/api/reservas?${params.toString()}`);
  if (!response.ok) throw new Error('Error fetching reservas');
  return response.json();
}

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case 'pendiente': return 'bg-yellow-100 text-yellow-800';
    case 'confirmada': return 'bg-green-100 text-green-800';
    case 'cancelada': return 'bg-red-100 text-red-800';
    case 'completada': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function AdminReservas() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({ estado: '', fecha: '' });

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-reservas', filters],
    queryFn: () => fetchReservas(filters),
  });

  if (isLoading) return <div className="p-8">Cargando reservas...</div>;
  if (error) return <div className="p-8">Error cargando reservas</div>;

  const stats = {
    total: data?.reservas.length || 0,
    pendientes: data?.reservas.filter(r => r.estado === 'pendiente').length || 0,
    confirmadas: data?.reservas.filter(r => r.estado === 'confirmada').length || 0,
    completadas: data?.reservas.filter(r => r.estado === 'completada').length || 0,
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
                Cuadriciclos
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
            <h1 className="text-3xl font-bold text-[#145A32]">Gestión de Reservas</h1>
            <p className="text-gray-600 mt-2">Administra todas las reservas de cuadriciclos</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#145A32]">
                {stats.total}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {stats.pendientes}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Confirmadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {stats.confirmadas}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Completadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {stats.completadas}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Estado</label>
                <Select value={filters.estado} onValueChange={(value) => setFilters(prev => ({...prev, estado: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos los estados</SelectItem>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="confirmada">Confirmada</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                    <SelectItem value="completada">Completada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Fecha</label>
                <Input
                  type="date"
                  value={filters.fecha}
                  onChange={(e) => setFilters(prev => ({...prev, fecha: e.target.value}))}
                />
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => setFilters({ estado: '', fecha: '' })}
                  className="w-full"
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reservas List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Reservas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.reservas.map((reserva) => (
                <div key={reserva.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">Reserva #{reserva.id}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getEstadoColor(reserva.estado)}`}>
                          {reserva.estado}
                        </span>
                      </div>
                      <p className="text-gray-600">Cliente: {reserva.cliente_nombre}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#145A32]">
                        ${reserva.precio_total.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(reserva.created_at).toLocaleDateString('es-CO')}
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-[#1565C0]" />
                      <span className="font-medium">Teléfono:</span>
                      <span>{reserva.cliente_telefono}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-[#E53935]" />
                      <span className="font-medium">Email:</span>
                      <span className="truncate">{reserva.cliente_email}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-[#F1C40F]" />
                      <span className="font-medium">Fecha:</span>
                      <span>{new Date(reserva.fecha_paseo).toLocaleDateString('es-CO')}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Car className="h-4 w-4 text-[#145A32]" />
                      <span className="font-medium">Cuadriciclo:</span>
                      <span>{reserva.cuadriciclo_nombre}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-[#8E24AA]" />
                      <span className="font-medium">Paseo:</span>
                      <span>{reserva.paseo_nombre}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Duración:</span>
                      <span>{reserva.paseo_duracion} horas</span>
                    </div>
                  </div>

                  {/* Notas */}
                  {reserva.notas && (
                    <div className="mb-4 p-3 bg-gray-50 rounded">
                      <span className="font-medium text-sm text-gray-700">Notas:</span>
                      <p className="text-sm text-gray-600 mt-1">{reserva.notas}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    {reserva.estado === 'pendiente' && (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Confirmar
                        </Button>
                        <Button size="sm" variant="destructive">
                          Cancelar
                        </Button>
                      </>
                    )}
                    {reserva.estado === 'confirmada' && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Marcar Completada
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              ))}

              {(!data?.reservas || data.reservas.length === 0) && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Calendar className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No hay reservas</h3>
                  <p className="text-gray-500 mb-4">
                    {filters.estado || filters.fecha
                      ? 'No se encontraron reservas con los filtros aplicados'
                      : 'Aún no hay reservas en el sistema'
                    }
                  </p>
                  {(filters.estado || filters.fecha) && (
                    <Button
                      variant="outline"
                      onClick={() => setFilters({ estado: '', fecha: '' })}
                    >
                      Limpiar Filtros
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}