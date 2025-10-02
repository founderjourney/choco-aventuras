"use client";

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDays, Car, MapPin, Users, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';

interface DashboardStats {
  total_cuadriciclos: number;
  cuadriciclos_disponibles: number;
  total_reservas: number;
  reservas_pendientes: number;
  reservas_confirmadas: number;
  total_paseos: number;
}

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

async function fetchDashboardStats(): Promise<DashboardStats> {
  const [cuadriciclos, reservas, paseos] = await Promise.all([
    fetch('/api/cuadriciclos').then(r => r.json()),
    fetch('/api/reservas').then(r => r.json()),
    fetch('/api/paseos').then(r => r.json())
  ]);

  return {
    total_cuadriciclos: cuadriciclos.cuadriciclos.length,
    cuadriciclos_disponibles: cuadriciclos.cuadriciclos.filter((c: any) => c.estado === 'disponible').length,
    total_reservas: reservas.reservas.length,
    reservas_pendientes: reservas.reservas.filter((r: any) => r.estado === 'pendiente').length,
    reservas_confirmadas: reservas.reservas.filter((r: any) => r.estado === 'confirmada').length,
    total_paseos: paseos.paseos.length
  };
}

async function fetchRecentReservas(): Promise<{reservas: Reserva[]}> {
  const response = await fetch('/api/reservas');
  if (!response.ok) throw new Error('Error fetching reservas');
  return response.json();
}

export default function AdminDashboard() {
  const { user, isLoading: authLoading, requireAuth, logout } = useAuth();

  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
  });

  const { data: reservasData, isLoading: loadingReservas } = useQuery({
    queryKey: ['recent-reservas'],
    queryFn: fetchRecentReservas,
  });

  useEffect(() => {
    if (!authLoading) {
      requireAuth();
    }
  }, [authLoading, requireAuth]);

  if (authLoading || loadingStats || loadingReservas) {
    return <div className="p-8">Cargando dashboard...</div>;
  }

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
            <div className="flex items-center space-x-2 sm:space-x-6">
              <nav className="hidden lg:flex space-x-6">
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
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  Hola, {user.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                >
                  <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Salir</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#145A32]">Panel de Administración</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Gestiona cuadriciclos, paseos y reservas</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cuadriciclos</CardTitle>
              <Car className="h-4 w-4 text-[#145A32]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.total_cuadriciclos || 0}</div>
              <p className="text-xs text-green-600">
                {stats?.cuadriciclos_disponibles || 0} disponibles
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reservas Totales</CardTitle>
              <CalendarDays className="h-4 w-4 text-[#1565C0]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.total_reservas || 0}</div>
              <p className="text-xs text-blue-600">
                {stats?.reservas_pendientes || 0} pendientes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
              <Users className="h-4 w-4 text-[#E53935]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.reservas_confirmadas || 0}</div>
              <p className="text-xs text-red-600">
                Este mes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paseos Activos</CardTitle>
              <MapPin className="h-4 w-4 text-[#F1C40F]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.total_paseos || 0}</div>
              <p className="text-xs text-yellow-600">
                Experiencias disponibles
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Link href="/admin/cuadriciclos" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-[#145A32]">Gestionar Cuadriciclos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Agregar, editar y gestionar el inventario de cuadriciclos
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/paseos" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-[#1565C0]">Gestionar Paseos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Configurar rutas, precios y experiencias disponibles
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/reservas" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-[#E53935]">Gestionar Reservas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Ver, confirmar y gestionar todas las reservas
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/dashboard" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-[#F1C40F]">Reportes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Estadísticas detalladas y reportes de negocio
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Reservas */}
        <Card>
          <CardHeader>
            <CardTitle>Reservas Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reservasData?.reservas.slice(0, 5).map((reserva) => (
                <div key={reserva.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">{reserva.cliente_nombre}</p>
                    <p className="text-sm text-gray-600">
                      {reserva.cuadriciclo_nombre} - {reserva.paseo_nombre}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(reserva.fecha_paseo).toLocaleDateString('es-CO')}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={
                      reserva.estado === 'confirmada' ? 'default' :
                      reserva.estado === 'pendiente' ? 'secondary' :
                      'destructive'
                    }>
                      {reserva.estado}
                    </Badge>
                    <p className="text-sm font-semibold mt-1">
                      ${reserva.precio_total.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              {(!reservasData?.reservas || reservasData.reservas.length === 0) && (
                <p className="text-gray-500 text-center py-8">No hay reservas aún</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}