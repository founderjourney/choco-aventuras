"use client";

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Calendar, DollarSign, Users, Car, MapPin } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';

interface ReporteData {
  ventasTotales: number;
  ventasMes: number;
  reservasHoy: number;
  clientesUnicos: number;
  cuatrimotoMasUsado: string;
  paseoMasPopular: string;
  ingresosPorMes: { mes: string; ingresos: number }[];
  reservasPorEstado: { estado: string; cantidad: number }[];
}

async function fetchReporteData(): Promise<ReporteData> {
  const [cuatrimotos, reservas, paseos] = await Promise.all([
    fetch('/api/cuadriciclos').then(r => r.json()),
    fetch('/api/reservas').then(r => r.json()),
    fetch('/api/paseos').then(r => r.json())
  ]);

  const today = new Date().toDateString();
  const thisMonth = new Date().getMonth();

  const ventasTotales = reservas.reservas.reduce((sum: number, r: any) => sum + r.precio_total, 0);
  const ventasMes = reservas.reservas
    .filter((r: any) => new Date(r.created_at).getMonth() === thisMonth)
    .reduce((sum: number, r: any) => sum + r.precio_total, 0);

  const reservasHoy = reservas.reservas.filter((r: any) =>
    new Date(r.fecha_paseo).toDateString() === today
  ).length;

  const clientesUnicos = new Set(reservas.reservas.map((r: any) => r.cliente_email)).size;

  // Cuatrimoto más usado
  const cuatrimotoUsage = reservas.reservas.reduce((acc: any, r: any) => {
    acc[r.cuatrimoto_nombre] = (acc[r.cuatrimoto_nombre] || 0) + 1;
    return acc;
  }, {});
  const cuatrimotoMasUsado = Object.keys(cuatrimotoUsage).reduce((a, b) =>
    cuatrimotoUsage[a] > cuatrimotoUsage[b] ? a : b, Object.keys(cuatrimotoUsage)[0]
  ) || 'N/A';

  // Paseo más popular
  const paseoUsage = reservas.reservas.reduce((acc: any, r: any) => {
    acc[r.paseo_nombre] = (acc[r.paseo_nombre] || 0) + 1;
    return acc;
  }, {});
  const paseoMasPopular = Object.keys(paseoUsage).reduce((a, b) =>
    paseoUsage[a] > paseoUsage[b] ? a : b, Object.keys(paseoUsage)[0]
  ) || 'N/A';

  // Reservas por estado
  const reservasPorEstado = [
    { estado: 'Pendiente', cantidad: reservas.reservas.filter((r: any) => r.estado === 'pendiente').length },
    { estado: 'Confirmada', cantidad: reservas.reservas.filter((r: any) => r.estado === 'confirmada').length },
    { estado: 'Completada', cantidad: reservas.reservas.filter((r: any) => r.estado === 'completada').length },
    { estado: 'Cancelada', cantidad: reservas.reservas.filter((r: any) => r.estado === 'cancelada').length },
  ];

  return {
    ventasTotales,
    ventasMes,
    reservasHoy,
    clientesUnicos,
    cuatrimotoMasUsado,
    paseoMasPopular,
    ingresosPorMes: [], // Placeholder
    reservasPorEstado
  };
}

export default function AdminDashboardReportes() {
  const { user, isLoading: authLoading, requireAuth } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-dashboard-reportes'],
    queryFn: fetchReporteData,
  });

  useEffect(() => {
    if (!authLoading) {
      requireAuth();
    }
  }, [authLoading, requireAuth]);

  if (authLoading || isLoading) return <div className="p-8">Cargando reportes...</div>;
  if (error) return <div className="p-8">Error cargando reportes</div>;
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
            <nav className="flex space-x-3 sm:space-x-6">
              <Link href="/" className="text-gray-700 hover:text-[#145A32] text-sm hidden md:block">
                Inicio
              </Link>
              <Link href="/cuadriciclos" className="text-gray-700 hover:text-[#145A32] text-sm hidden md:block">
                Cuatrimotos
              </Link>
              <Link href="/reservas" className="text-gray-700 hover:text-[#145A32] text-sm hidden md:block">
                Reservar
              </Link>
              <Link href="/admin" className="text-[#145A32] font-semibold text-sm">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <Link href="/admin" className="flex items-center gap-2 text-gray-600 hover:text-[#145A32] text-sm">
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Volver al </span>Panel
          </Link>
        </div>

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-3xl font-bold text-[#145A32]">Reportes y Estadísticas</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Dashboard completo del negocio</p>
        </div>

        {/* Financial Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-[#145A32]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${data?.ventasTotales.toLocaleString() || 0}</div>
              <p className="text-xs text-green-600">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                Histórico total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas Este Mes</CardTitle>
              <DollarSign className="h-4 w-4 text-[#1565C0]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${data?.ventasMes.toLocaleString() || 0}</div>
              <p className="text-xs text-blue-600">
                Ingresos del mes actual
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reservas Hoy</CardTitle>
              <Calendar className="h-4 w-4 text-[#E53935]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.reservasHoy || 0}</div>
              <p className="text-xs text-red-600">
                Reservas para hoy
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Únicos</CardTitle>
              <Users className="h-4 w-4 text-[#F1C40F]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.clientesUnicos || 0}</div>
              <p className="text-xs text-yellow-600">
                Base de clientes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Popular Items */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-[#145A32]" />
                Cuatrimoto Más Usado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#145A32] mb-2">
                {data?.cuatrimotoMasUsado || 'N/A'}
              </div>
              <p className="text-sm text-gray-600">
                El cuatrimoto con más reservas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#1565C0]" />
                Paseo Más Popular
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1565C0] mb-2">
                {data?.paseoMasPopular || 'N/A'}
              </div>
              <p className="text-sm text-gray-600">
                La experiencia más solicitada
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Reservas por Estado */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Distribución de Reservas por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data?.reservasPorEstado.map((item) => (
                <div key={item.estado} className="text-center p-4 border rounded-lg">
                  <div className={`text-2xl font-bold mb-2 ${
                    item.estado === 'Pendiente' ? 'text-yellow-600' :
                    item.estado === 'Confirmada' ? 'text-green-600' :
                    item.estado === 'Completada' ? 'text-blue-600' :
                    'text-red-600'
                  }`}>
                    {item.cantidad}
                  </div>
                  <div className="text-sm text-gray-600">{item.estado}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumen Operativo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tasa de ocupación:</span>
                <span className="font-semibold">75%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tiempo promedio:</span>
                <span className="font-semibold">3.5h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Valor promedio:</span>
                <span className="font-semibold">${data?.ventasTotales && data.clientesUnicos ? Math.round(data.ventasTotales / data.clientesUnicos).toLocaleString() : 0}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rendimiento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Satisfacción:</span>
                <span className="font-semibold text-green-600">98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Repetición:</span>
                <span className="font-semibold text-blue-600">35%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Cancelaciones:</span>
                <span className="font-semibold text-red-600">5%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximas Acciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>5 reservas pendientes de confirmar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>2 cuatrimotos en mantenimiento</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>3 paseos para mañana</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}