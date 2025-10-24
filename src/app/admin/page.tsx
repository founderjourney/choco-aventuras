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
  total_cuatrimotos: number;
  cuatrimotos_disponibles: number;
  total_reservas: number;
  reservas_pendientes: number;
  reservas_confirmadas: number;
  total_paseos: number;
}

interface Reserva {
  id: number;
  cuatrimoto_id: number;
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
  cuatrimoto_nombre: string;
  cuatrimoto_marca: string;
  cuatrimoto_modelo: string;
  paseo_nombre: string;
  paseo_duracion: number;
}

async function fetchDashboardStats(): Promise<DashboardStats> {
  const [cuatrimotos, reservas, paseos] = await Promise.all([
    fetch('/api/cuadriciclos').then(r => r.json()),
    fetch('/api/reservas').then(r => r.json()),
    fetch('/api/paseos').then(r => r.json())
  ]);

  return {
    total_cuatrimotos: cuatrimotos.cuatrimotos.length,
    cuatrimotos_disponibles: cuatrimotos.cuatrimotos.filter((c: any) => c.estado === 'disponible').length,
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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/" className="font-bold text-base sm:text-xl text-[#145A32] truncate">
              Chocó Aventuras - Admin
            </Link>
            <div className="flex items-center space-x-2">
              <nav className="hidden md:flex space-x-4 lg:space-x-6">
                <Link href="/" className="text-gray-700 hover:text-[#145A32] text-sm">
                  Inicio
                </Link>
                <Link href="/cuadriciclos" className="text-gray-700 hover:text-[#145A32] text-sm">
                  Cuatrimotos
                </Link>
                <Link href="/reservas" className="text-gray-700 hover:text-[#145A32] text-sm">
                  Reservar
                </Link>
                <Link href="/admin" className="text-[#145A32] font-semibold text-sm">
                  Admin
                </Link>
              </nav>
              <div className="flex items-center space-x-1 sm:space-x-3">
                <span className="text-xs text-gray-600 hidden md:block max-w-24 truncate">
                  Hola, {user.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="flex items-center gap-1 text-xs px-2 py-1 h-8"
                >
                  <LogOut className="h-3 w-3" />
                  <span className="hidden xs:inline">Salir</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-8">
        <div className="mb-4 sm:mb-8">
          <h1 className="text-xl sm:text-3xl font-bold text-[#145A32]">Panel de Administración</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm">Gestiona cuatrimotos, paseos y reservas</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 mb-4 sm:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Cuatrimotos</CardTitle>
              <Car className="h-3 w-3 sm:h-4 sm:w-4 text-[#145A32]" />
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-lg sm:text-2xl font-bold">{stats?.total_cuatrimotos || 0}</div>
              <p className="text-xs text-green-600">
                {stats?.cuatrimotos_disponibles || 0} disponibles
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Reservas</CardTitle>
              <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4 text-[#1565C0]" />
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-lg sm:text-2xl font-bold">{stats?.total_reservas || 0}</div>
              <p className="text-xs text-blue-600">
                {stats?.reservas_pendientes || 0} pendientes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Confirmadas</CardTitle>
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-[#E53935]" />
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-lg sm:text-2xl font-bold">{stats?.reservas_confirmadas || 0}</div>
              <p className="text-xs text-red-600">
                Este mes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Paseos</CardTitle>
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-[#F1C40F]" />
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-lg sm:text-2xl font-bold">{stats?.total_paseos || 0}</div>
              <p className="text-xs text-yellow-600">
                Experiencias
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
          <Link href="/admin/cuadriciclos" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#145A32] text-sm sm:text-base">Gestionar Cuatrimotos</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs sm:text-sm text-gray-600">
                  Agregar, editar y gestionar el inventario de cuatrimotos
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/paseos" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#1565C0] text-sm sm:text-base">Gestionar Paseos</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs sm:text-sm text-gray-600">
                  Configurar rutas, precios y experiencias disponibles
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/reservas" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#E53935] text-sm sm:text-base">Gestionar Reservas</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs sm:text-sm text-gray-600">
                  Ver, confirmar y gestionar todas las reservas
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/dashboard" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#F1C40F] text-sm sm:text-base">Reportes</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs sm:text-sm text-gray-600">
                  Estadísticas detalladas y reportes de negocio
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Nueva sección CMS */}
        <div className="mb-4 sm:mb-8">
          <h2 className="text-lg sm:text-2xl font-bold text-[#145A32] mb-3 sm:mb-4">Sistema de Gestión de Contenido</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
            <Link href="/admin/paginas" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-[#E53935] h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#E53935] flex items-center gap-2 text-sm sm:text-base">
                     Gestión de Páginas
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Crear, editar y gestionar todas las páginas del sitio web con editor visual
                  </p>
                  <div className="mt-2 sm:mt-3 flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Editor Visual</Badge>
                    <Badge variant="outline" className="text-xs">Arrastrar y Soltar</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Card className="opacity-60 border-l-4 border-gray-300 h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-500 flex items-center gap-2 text-sm sm:text-base">
                   Gestión de Medios
                  <Badge variant="secondary" className="text-xs ml-auto">Próximamente</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs sm:text-sm text-gray-500">
                  Subir, organizar y gestionar imágenes y videos para el sitio
                </p>
              </CardContent>
            </Card>

            <Card className="opacity-60 border-l-4 border-gray-300 h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-500 flex items-center gap-2 text-sm sm:text-base">
                   Personalización
                  <Badge variant="secondary" className="text-xs ml-auto">Próximamente</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs sm:text-sm text-gray-500">
                  Cambiar colores, fuentes y estilos del sitio web
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Reservas */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg">Reservas Recientes</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {reservasData?.reservas.slice(0, 5).map((reserva) => (
                <div key={reserva.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg gap-2 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm sm:text-base truncate">{reserva.cliente_nombre}</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      {reserva.cuatrimoto_nombre} - {reserva.paseo_nombre}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(reserva.fecha_paseo).toLocaleDateString('es-CO')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between sm:flex-col sm:items-end sm:text-right gap-2">
                    <Badge variant={
                      reserva.estado === 'confirmada' ? 'default' :
                      reserva.estado === 'pendiente' ? 'secondary' :
                      'destructive'
                    } className="text-xs">
                      {reserva.estado}
                    </Badge>
                    <p className="text-xs sm:text-sm font-semibold">
                      ${reserva.precio_total.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              {(!reservasData?.reservas || reservasData.reservas.length === 0) && (
                <p className="text-gray-500 text-center py-6 text-sm">No hay reservas aún</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}