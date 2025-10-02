import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, Filter, Plus, Edit, Phone, Mail, MessageCircle } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import backend from '~backend/client';
import type { Reserva } from '~backend/reservas/list';
import { appConfig, businessConfig } from '../../config';

export default function AdminReservas() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingReserva, setEditingReserva] = useState<Reserva | null>(null);

  const { data: reservas, isLoading } = useQuery({
    queryKey: ['reservas', statusFilter, dateFilter],
    queryFn: async () => {
      const params: any = {};
      if (statusFilter !== 'all') params.estado = statusFilter;
      if (dateFilter) params.fecha = dateFilter;
      
      const response = await backend.reservas.list(params);
      return response.reservas;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: any) => await backend.reservas.update({ id, ...data }),
    onSuccess: () => {
      toast({ title: "Reserva actualizada exitosamente" });
      queryClient.invalidateQueries({ queryKey: ['reservas'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      queryClient.invalidateQueries({ queryKey: ['today-reservations'] });
      setIsEditDialogOpen(false);
      setEditingReserva(null);
    },
    onError: (error) => {
      console.error('Error updating reserva:', error);
      toast({
        title: "Error al actualizar reserva",
        description: "Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (reserva: Reserva) => {
    setEditingReserva(reserva);
    setIsEditDialogOpen(true);
  };

  const handleStatusChange = (reserva: Reserva, newStatus: string) => {
    updateMutation.mutate({
      id: reserva.id,
      estado: newStatus,
    });
  };

  const handleContactWhatsApp = (reserva: Reserva) => {
    const message = `Hola ${reserva.cliente_nombre}, te contactamos sobre tu reserva del paseo "${reserva.paseo_nombre}" con el cuadriciclo ${reserva.cuadriciclo_nombre} para el ${new Date(reserva.fecha_paseo).toLocaleDateString('es-ES')}.`;
    const whatsappUrl = `https://wa.me/${reserva.cliente_telefono.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Reservas</h1>
          <p className="text-gray-600">Administra todas las reservas</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="status-filter">Estado</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="confirmada">Confirmada</SelectItem>
                  <SelectItem value="completada">Completada</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date-filter">Fecha</Label>
              <Input
                id="date-filter"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setStatusFilter('all');
                  setDateFilter('');
                }}
              >
                Limpiar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reservas List */}
      <div className="space-y-4">
        {!reservas || reservas.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">
                No hay reservas
              </h3>
              <p className="text-gray-400">
                No se encontraron reservas con los filtros seleccionados.
              </p>
            </CardContent>
          </Card>
        ) : (
          reservas.map((reserva) => (
            <Card key={reserva.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{reserva.cliente_nombre}</h3>
                      <Badge variant={getStatusVariant(reserva.estado)}>
                        {reserva.estado}
                      </Badge>
                      <Select
                        value={reserva.estado}
                        onValueChange={(value) => handleStatusChange(reserva, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pendiente">Pendiente</SelectItem>
                          <SelectItem value="confirmada">Confirmada</SelectItem>
                          <SelectItem value="completada">Completada</SelectItem>
                          <SelectItem value="cancelada">Cancelada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Paseo:</span>
                        <p className="font-medium">
                          {reserva.paseo_nombre}
                        </p>
                        <p className="text-gray-600">
                          Duración: {reserva.paseo_duracion}h
                        </p>
                      </div>

                      <div>
                        <span className="text-gray-500">Cuadriciclo:</span>
                        <p className="font-medium">
                          {reserva.cuadriciclo_nombre}
                        </p>
                        <p className="text-gray-600">
                          {reserva.cuadriciclo_marca} {reserva.cuadriciclo_modelo}
                        </p>
                      </div>

                      <div>
                        <span className="text-gray-500">Fecha del Paseo:</span>
                        <p className="font-medium">
                          {new Date(reserva.fecha_paseo).toLocaleDateString('es-ES')}
                        </p>
                        <p className="text-gray-600">
                          {new Date(reserva.fecha_paseo).toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>

                      <div>
                        <span className="text-gray-500">Total:</span>
                        <p className="font-medium text-lg">
                          {appConfig.currency}{reserva.precio_total}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                      <div>
                        <span className="text-gray-500">Contacto:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="h-4 w-4" />
                          <span>{reserva.cliente_telefono}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{reserva.cliente_email}</span>
                        </div>
                      </div>

                      {reserva.notas && (
                        <div>
                          <span className="text-gray-500">Notas:</span>
                          <p className="mt-1">{reserva.notas}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(reserva)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContactWhatsApp(reserva)}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Reserva</DialogTitle>
          </DialogHeader>
          {editingReserva && (
            <ReservaEditForm
              reserva={editingReserva}
              onSubmit={(data) => updateMutation.mutate({ id: editingReserva.id, ...data })}
              isLoading={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
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

interface ReservaEditFormProps {
  reserva: Reserva;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

function ReservaEditForm({ reserva, onSubmit, isLoading }: ReservaEditFormProps) {
  const [formData, setFormData] = useState({
    estado: reserva.estado,
    notas: reserva.notas || '',
    precio_total: reserva.precio_total.toString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      estado: formData.estado,
      notas: formData.notas || undefined,
      precio_total: parseFloat(formData.precio_total),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="estado">Estado</Label>
        <Select value={formData.estado} onValueChange={(value: 'pendiente' | 'confirmada' | 'completada' | 'cancelada') => setFormData(prev => ({ ...prev, estado: value }))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pendiente">Pendiente</SelectItem>
            <SelectItem value="confirmada">Confirmada</SelectItem>
            <SelectItem value="completada">Completada</SelectItem>
            <SelectItem value="cancelada">Cancelada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="precio_total">Precio Total</Label>
        <Input
          id="precio_total"
          type="number"
          step="0.01"
          value={formData.precio_total}
          onChange={(e) => setFormData(prev => ({ ...prev, precio_total: e.target.value }))}
        />
      </div>

      <div>
        <Label htmlFor="notas">Notas</Label>
        <Input
          id="notas"
          value={formData.notas}
          onChange={(e) => setFormData(prev => ({ ...prev, notas: e.target.value }))}
        />
      </div>

      <DialogFooter>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoadingSpinner className="mr-2 h-4 w-4" />
              Actualizando...
            </>
          ) : (
            'Actualizar'
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
