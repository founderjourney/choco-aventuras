"use client";

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit2, Calendar, Phone, Mail, Car, MapPin, Clock, DollarSign, User, FileText } from 'lucide-react';

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

async function updateReservaStatus(id: number, estado: string) {
  const response = await fetch(`/api/reservas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado }),
  });
  if (!response.ok) throw new Error('Error updating reserva');
  return response.json();
}

async function updateReservaNotes(id: number, notas: string) {
  const response = await fetch(`/api/reservas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notas }),
  });
  if (!response.ok) throw new Error('Error updating notes');
  return response.json();
}

export default function DetallesReserva() {
  const params = useParams();
  const router = useRouter();
  const reservaId = params.id as string;
  const { user, isLoading: authLoading, requireAuth } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [editingNotes, setEditingNotes] = useState(false);
  const [newNotes, setNewNotes] = useState('');

  const { data: reservaData, isLoading, error } = useQuery({
    queryKey: ['reserva', reservaId],
    queryFn: async () => {
      const response = await fetch(`/api/reservas/${reservaId}`);
      if (!response.ok) throw new Error('Error al cargar reserva');
      return response.json() as Promise<{reserva: Reserva}>;
    },
    enabled: !!reservaId
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, estado }: { id: number; estado: string }) => updateReservaStatus(id, estado),
    onSuccess: (data, variables) => {
      toast({
        title: "Estado actualizado",
        description: `Reserva ${variables.estado === 'confirmada' ? 'confirmada' :
                     variables.estado === 'cancelada' ? 'cancelada' :
                     variables.estado === 'completada' ? 'completada' : 'actualizada'} exitosamente.`,
      });
      queryClient.invalidateQueries({ queryKey: ['reserva', reservaId] });
      queryClient.invalidateQueries({ queryKey: ['admin-reservas'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado de la reserva.",
        variant: "destructive",
      });
    }
  });

  const updateNotesMutation = useMutation({
    mutationFn: ({ id, notas }: { id: number; notas: string }) => updateReservaNotes(id, notas),
    onSuccess: () => {
      toast({
        title: "Notas actualizadas",
        description: "Las notas se han guardado exitosamente.",
      });
      queryClient.invalidateQueries({ queryKey: ['reserva', reservaId] });
      setEditingNotes(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudieron guardar las notas.",
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    if (!authLoading) {
      requireAuth();
    }
  }, [authLoading, requireAuth]);

  useEffect(() => {
    if (reservaData?.reserva) {
      setNewNotes(reservaData.reserva.notas || '');
    }
  }, [reservaData]);

  const handleStatusChange = (newStatus: string) => {
    updateStatusMutation.mutate({ id: parseInt(reservaId), estado: newStatus });
  };

  const handleSaveNotes = () => {
    updateNotesMutation.mutate({ id: parseInt(reservaId), notas: newNotes });
  };

  if (authLoading || isLoading) {
    return <div className="p-8">Cargando detalles de la reserva...</div>;
  }

  if (error) {
    return <div className="p-8">Error cargando reserva</div>;
  }

  if (!user) {
    return null; // Redirecting to login
  }

  const reserva = reservaData?.reserva;

  if (!reserva) {
    return <div className="p-8">Reserva no encontrada</div>;
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

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateShort = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('es-CO');
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
          <Link href="/admin/reservas" className="text-gray-600 hover:text-[#145A32]">
            Reservas
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#145A32] font-medium">Detalles</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold text-[#145A32]">Reserva #{reserva.id}</h1>
              <Badge className={getEstadoColor(reserva.estado)}>
                {reserva.estado}
              </Badge>
            </div>
            <p className="text-gray-600">
              Cliente: {reserva.cliente_nombre}
            </p>
          </div>

          <div className="flex gap-3">
            <Link href="/admin/reservas">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información del Cliente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Información del Cliente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Nombre completo</div>
                      <div className="font-semibold text-lg">{reserva.cliente_nombre}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <div>
                        <div className="text-sm text-gray-500">Teléfono</div>
                        <div className="font-medium">{reserva.cliente_telefono}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-red-600" />
                      <div>
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="font-medium break-all">{reserva.cliente_email}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Información de la Reserva */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Detalles de la Reserva
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-yellow-600" />
                      <div>
                        <div className="text-sm text-gray-500">Fecha del paseo</div>
                        <div className="font-semibold">{formatDate(reserva.fecha_paseo)}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-green-600" />
                      <div>
                        <div className="text-sm text-gray-500">Cuatrimoto</div>
                        <div className="font-medium">{reserva.cuatrimoto_nombre}</div>
                        <div className="text-sm text-gray-500">{reserva.cuatrimoto_marca} {reserva.cuatrimoto_modelo}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-purple-600" />
                      <div>
                        <div className="text-sm text-gray-500">Paseo</div>
                        <div className="font-medium">{reserva.paseo_nombre}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-indigo-600" />
                      <div>
                        <div className="text-sm text-gray-500">Duración</div>
                        <div className="font-medium">{reserva.paseo_duracion} horas</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Notas adicionales
                  </div>
                  {!editingNotes && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingNotes(true)}
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingNotes ? (
                  <div className="space-y-3">
                    <Textarea
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                      placeholder="Agregar notas sobre la reserva..."
                      className="min-h-[100px]"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSaveNotes}
                        disabled={updateNotesMutation.isPending}
                        size="sm"
                      >
                        {updateNotesMutation.isPending ? 'Guardando...' : 'Guardar'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingNotes(false);
                          setNewNotes(reserva.notas || '');
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {reserva.notas ? (
                      <p className="text-gray-700 whitespace-pre-wrap">{reserva.notas}</p>
                    ) : (
                      <p className="text-gray-500 italic">No hay notas adicionales</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Historial */}
            <Card>
              <CardHeader>
                <CardTitle>Historial de la Reserva</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Fecha de creación:</span>
                    <span className="text-sm font-medium">{formatDate(reserva.created_at)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Última actualización:</span>
                    <span className="text-sm font-medium">{formatDate(reserva.updated_at)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-500">ID de reserva:</span>
                    <span className="text-sm font-medium">#{reserva.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Precio */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Precio Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-4 bg-[#145A32] bg-opacity-10 rounded-lg">
                  <div className="text-3xl font-bold text-[#145A32]">
                    ${reserva.precio_total.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Pesos colombianos (COP)</div>
                </div>
              </CardContent>
            </Card>

            {/* Acciones */}
            <Card>
              <CardHeader>
                <CardTitle>Cambiar Estado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {reserva.estado === 'pendiente' && (
                  <>
                    <Button
                      onClick={() => handleStatusChange('confirmada')}
                      disabled={updateStatusMutation.isPending}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      {updateStatusMutation.isPending ? 'Actualizando...' : 'Confirmar Reserva'}
                    </Button>
                    <Button
                      onClick={() => handleStatusChange('cancelada')}
                      disabled={updateStatusMutation.isPending}
                      variant="destructive"
                      className="w-full"
                    >
                      Cancelar Reserva
                    </Button>
                  </>
                )}

                {reserva.estado === 'confirmada' && (
                  <>
                    <Button
                      onClick={() => handleStatusChange('completada')}
                      disabled={updateStatusMutation.isPending}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Marcar como Completada
                    </Button>
                    <Button
                      onClick={() => handleStatusChange('cancelada')}
                      disabled={updateStatusMutation.isPending}
                      variant="outline"
                      className="w-full"
                    >
                      Cancelar Reserva
                    </Button>
                  </>
                )}

                {reserva.estado === 'cancelada' && (
                  <Button
                    onClick={() => handleStatusChange('pendiente')}
                    disabled={updateStatusMutation.isPending}
                    variant="outline"
                    className="w-full"
                  >
                    Reactivar Reserva
                  </Button>
                )}

                {reserva.estado === 'completada' && (
                  <div className="text-center py-4">
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="font-medium">Reserva Completada</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enlaces Rápidos */}
            <Card>
              <CardHeader>
                <CardTitle>Enlaces Rápidos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/admin/cuadriciclos/${reserva.cuatrimoto_id}`} className="block">
                  <Button variant="outline" className="w-full">
                    <Car className="h-4 w-4 mr-2" />
                    Ver Cuatrimoto
                  </Button>
                </Link>

                <Link href={`/admin/paseos/${reserva.paseo_id}`} className="block">
                  <Button variant="outline" className="w-full">
                    <MapPin className="h-4 w-4 mr-2" />
                    Ver Paseo
                  </Button>
                </Link>

                <Link href="/admin/reservas" className="block">
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Todas las Reservas
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Estado y Estadísticas */}
            <Card>
              <CardHeader>
                <CardTitle>Información</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Estado actual:</span>
                  <Badge className={getEstadoColor(reserva.estado)}>
                    {reserva.estado}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Fecha del paseo:</span>
                  <span className="text-sm font-medium">{formatDateShort(reserva.fecha_paseo)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Duración:</span>
                  <span className="text-sm font-medium">{reserva.paseo_duracion}h</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}