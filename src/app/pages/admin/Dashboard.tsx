import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, DollarSign, Users, Settings, Clock, AlertCircle } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import backend from '~backend/client';
import { appConfig } from '../../config';

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => await backend.dashboard.getStats(),
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: todayReservations, isLoading: reservationsLoading } = useQuery({
    queryKey: ['today-reservations'],
    queryFn: async () => {
      const response = await backend.dashboard.getTodayReservations();
      return response.reservas;
    },
    refetchInterval: 30000,
  });

  if (statsLoading || reservationsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Resumen de actividad de hoy</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reservas Hoy</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.reservas_hoy || 0}</div>
            <p className="text-xs text-muted-foreground">
              Total de reservas para hoy
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Hoy</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appConfig.currency}{stats?.ingresos_hoy.toFixed(2) || '0.00'}
            </div>
            <p className="text-xs text-muted-foreground">
              Solo reservas confirmadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cuadris Ocupados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.cuadris_ocupados || 0}</div>
            <p className="text-xs text-muted-foreground">
              de {stats?.total_cuadriciclos || 0} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.reservas_pendientes || 0}</div>
            <p className="text-xs text-muted-foreground">
              Reservas por confirmar
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Reservations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Reservas de Hoy
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!todayReservations || todayReservations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No hay reservas para hoy
            </div>
          ) : (
            <div className="space-y-4">
              {todayReservations.map((reserva) => (
                <div key={reserva.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{reserva.cliente_nombre}</span>
                      <Badge variant={getStatusVariant(reserva.estado)}>
                        {reserva.estado}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      Paseo: {reserva.paseo_nombre} ({reserva.paseo_duracion}h)
                    </div>
                    <div className="text-sm text-gray-500">
                      {reserva.cuadriciclo_nombre} - {new Date(reserva.fecha_paseo).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {appConfig.currency}{reserva.precio_total}
                    </div>
                    <div className="text-sm text-gray-500">
                      {reserva.cliente_telefono}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Acciones Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              Nueva Reserva
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <Users className="h-6 w-6 mb-2" />
              Gestionar Cuadris
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <DollarSign className="h-6 w-6 mb-2" />
              Ver Ingresos
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <Settings className="h-6 w-6 mb-2" />
              Configuración
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getStatusVariant(status: string) {
  switch (status) {
    case 'confirmada':
      return 'default';
    case 'completada':
      return 'secondary';
    case 'pendiente':
      return 'outline';
    case 'cancelada':
      return 'destructive';
    default:
      return 'outline';
  }
}
