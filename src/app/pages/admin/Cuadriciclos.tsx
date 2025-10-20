import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit, Trash2, Settings, Check, X } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import backend from '~backend/client';
import type { Cuatrimoto } from '~backend/cuatrimotos/list';
import { appConfig } from '../../config';

export default function AdminCuatrimotos() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCuatrimoto, setEditingCuatrimoto] = useState<Cuatrimoto | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [bulkAction, setBulkAction] = useState<string>('');

  const { data: cuatrimotos, isLoading } = useQuery({
    queryKey: ['cuatrimotos'],
    queryFn: async () => {
      const response = await backend.cuatrimotos.list();
      return response.cuatrimotos;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => await backend.cuatrimotos.create(data),
    onSuccess: () => {
      toast({ title: "Cuatrimoto creada exitosamente" });
      queryClient.invalidateQueries({ queryKey: ['cuatrimotos'] });
      setIsCreateDialogOpen(false);
    },
    onError: (error) => {
      console.error('Error creating cuatrimoto:', error);
      toast({
        title: "Error al crear cuatrimoto",
        description: "Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: any) => await backend.cuatrimotos.update({ id, ...data }),
    onSuccess: () => {
      toast({ title: "Cuatrimoto actualizado exitosamente" });
      queryClient.invalidateQueries({ queryKey: ['cuatrimotos'] });
      setIsEditDialogOpen(false);
      setEditingCuatrimoto(null);
    },
    onError: (error) => {
      console.error('Error updating cuatrimoto:', error);
      toast({
        title: "Error al actualizar cuatrimoto",
        description: "Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => await backend.cuatrimotos.deleteCuatrimoto({ id }),
    onSuccess: () => {
      toast({ title: "Cuatrimoto eliminado exitosamente" });
      queryClient.invalidateQueries({ queryKey: ['cuatrimotos'] });
    },
    onError: (error) => {
      console.error('Error deleting cuatrimoto:', error);
      toast({
        title: "Error al eliminar cuatrimoto",
        description: "No se puede eliminar un cuatrimoto con reservas activas.",
        variant: "destructive",
      });
    },
  });

  const bulkUpdateMutation = useMutation({
    mutationFn: async ({ ids, updates }: { ids: number[], updates: any }) => 
      await backend.cuatrimotos.bulkUpdate({ ids, updates }),
    onSuccess: (data) => {
      toast({ 
        title: `${data.count} cuatrimotos actualizados exitosamente` 
      });
      queryClient.invalidateQueries({ queryKey: ['cuatrimotos'] });
      setSelectedIds([]);
      setBulkAction('');
    },
    onError: (error) => {
      console.error('Error updating cuatrimotos:', error);
      toast({
        title: "Error al actualizar cuatrimotos",
        description: "Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (cuatrimoto: Cuatrimoto) => {
    setEditingCuatrimoto(cuatrimoto);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este cuatrimoto?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleStatusChange = (cuatrimoto: Cuatrimoto, newStatus: string) => {
    updateMutation.mutate({
      id: cuatrimoto.id,
      estado: newStatus,
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(cuatrimotos?.map(c => c.id) || []);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    }
  };

  const handleBulkAction = () => {
    if (selectedIds.length === 0 || !bulkAction) return;
    
    const updates: any = {};
    if (bulkAction.startsWith('status-')) {
      updates.estado = bulkAction.replace('status-', '');
    }

    bulkUpdateMutation.mutate({ ids: selectedIds, updates });
  };

  const clearSelection = () => {
    setSelectedIds([]);
    setBulkAction('');
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Cuatrimotos</h1>
            <p className="text-gray-600">Administra tu flota de cuatrimotos</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Agregar Cuatrimoto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nuevo Cuatrimoto</DialogTitle>
              </DialogHeader>
              <CuatrimotoForm
                onSubmit={(data) => createMutation.mutate(data)}
                isLoading={createMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-sm font-medium">
              {selectedIds.length} cuatrimoto{selectedIds.length > 1 ? 's' : ''} seleccionado{selectedIds.length > 1 ? 's' : ''}
            </span>
            <Select value={bulkAction} onValueChange={setBulkAction}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Seleccionar acción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="status-disponible">Marcar como Disponible</SelectItem>
                <SelectItem value="status-mantenimiento">Marcar como Mantenimiento</SelectItem>
                <SelectItem value="status-ocupado">Marcar como Ocupado</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={handleBulkAction} 
              disabled={!bulkAction || bulkUpdateMutation.isPending}
              size="sm"
            >
              <Check className="h-4 w-4 mr-2" />
              Aplicar
            </Button>
            <Button 
              onClick={clearSelection} 
              variant="outline" 
              size="sm"
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        )}

        {/* Select All */}
        {cuatrimotos && cuatrimotos.length > 0 && (
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all"
              checked={selectedIds.length === cuatrimotos.length}
              onCheckedChange={handleSelectAll}
            />
            <Label htmlFor="select-all" className="text-sm">
              Seleccionar todos ({cuatrimotos.length})
            </Label>
          </div>
        )}
      </div>

      {/* Cuatrimotos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cuatrimotos?.map((cuatrimoto) => (
          <Card key={cuatrimoto.id} className={selectedIds.includes(cuatrimoto.id) ? "ring-2 ring-blue-500" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedIds.includes(cuatrimoto.id)}
                    onCheckedChange={(checked) => handleSelectOne(cuatrimoto.id, checked as boolean)}
                  />
                  <CardTitle className="text-lg">{cuatrimoto.nombre}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Select
                    value={cuatrimoto.estado}
                    onValueChange={(value) => handleStatusChange(cuatrimoto, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disponible">Disponible</SelectItem>
                      <SelectItem value="ocupado">Ocupado</SelectItem>
                      <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-200 rounded-lg mb-4">
                {cuatrimoto.fotos.length > 0 ? (
                  <img
                    src={cuatrimoto.fotos[0]}
                    alt={cuatrimoto.nombre}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center rounded-lg">
                    <span className="text-4xl">🏍️</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Marca:</strong> {cuatrimoto.marca} {cuatrimoto.modelo}
                </p>
                {cuatrimoto.año && (
                  <p className="text-sm text-gray-600">
                    <strong>Año:</strong> {cuatrimoto.año}
                  </p>
                )}
                <p className="text-sm text-gray-600">
                  <strong>Color:</strong> {cuatrimoto.color}
                </p>
                <div className="flex justify-between">
                  <span className="text-sm">
                    <strong>Hora:</strong> {appConfig.currency}{cuatrimoto.precio_hora}
                  </span>
                  <span className="text-sm">
                    <strong>Día:</strong> {appConfig.currency}{cuatrimoto.precio_dia}
                  </span>
                </div>
              </div>

              {cuatrimoto.caracteristicas.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {cuatrimoto.caracteristicas.slice(0, 3).map((caracteristica, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {caracteristica}
                      </Badge>
                    ))}
                    {cuatrimoto.caracteristicas.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{cuatrimoto.caracteristicas.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(cuatrimoto)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(cuatrimoto.id)}
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Cuatrimoto</DialogTitle>
          </DialogHeader>
          {editingCuatrimoto && (
            <CuatrimotoForm
              initialData={editingCuatrimoto}
              onSubmit={(data) => updateMutation.mutate({ id: editingCuatrimoto.id, ...data })}
              isLoading={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface CuatrimotoFormProps {
  initialData?: Cuatrimoto;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

function CuatrimotoForm({ initialData, onSubmit, isLoading }: CuatrimotoFormProps) {
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || '',
    marca: initialData?.marca || '',
    modelo: initialData?.modelo || '',
    año: initialData?.año || '',
    color: initialData?.color || '',
    precio_hora: initialData?.precio_hora || '',
    precio_dia: initialData?.precio_dia || '',
    descripcion: initialData?.descripcion || '',
    caracteristicas: initialData?.caracteristicas?.join(', ') || '',
    fotos: initialData?.fotos?.join(', ') || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      ...formData,
      año: formData.año ? parseInt(formData.año.toString()) : undefined,
      precio_hora: parseFloat(formData.precio_hora.toString()),
      precio_dia: parseFloat(formData.precio_dia.toString()),
      caracteristicas: formData.caracteristicas ? 
        formData.caracteristicas.split(',').map(c => c.trim()).filter(c => c) : [],
      fotos: formData.fotos ? 
        formData.fotos.split(',').map(f => f.trim()).filter(f => f) : [],
    };

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nombre">Nombre *</Label>
          <Input
            id="nombre"
            value={formData.nombre}
            onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="marca">Marca *</Label>
          <Input
            id="marca"
            value={formData.marca}
            onChange={(e) => setFormData(prev => ({ ...prev, marca: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="modelo">Modelo *</Label>
          <Input
            id="modelo"
            value={formData.modelo}
            onChange={(e) => setFormData(prev => ({ ...prev, modelo: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="año">Año</Label>
          <Input
            id="año"
            type="number"
            value={formData.año}
            onChange={(e) => setFormData(prev => ({ ...prev, año: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="color">Color *</Label>
          <Input
            id="color"
            value={formData.color}
            onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="precio_hora">Precio por Hora *</Label>
          <Input
            id="precio_hora"
            type="number"
            step="0.01"
            value={formData.precio_hora}
            onChange={(e) => setFormData(prev => ({ ...prev, precio_hora: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="precio_dia">Precio por Día *</Label>
          <Input
            id="precio_dia"
            type="number"
            step="0.01"
            value={formData.precio_dia}
            onChange={(e) => setFormData(prev => ({ ...prev, precio_dia: e.target.value }))}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="descripcion">Descripción</Label>
        <Textarea
          id="descripcion"
          value={formData.descripcion}
          onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
        />
      </div>

      <div>
        <Label htmlFor="caracteristicas">Características (separadas por comas)</Label>
        <Input
          id="caracteristicas"
          value={formData.caracteristicas}
          onChange={(e) => setFormData(prev => ({ ...prev, caracteristicas: e.target.value }))}
          placeholder="Motor 250cc, Automático, Frenos de disco"
        />
      </div>

      <div>
        <Label htmlFor="fotos">URLs de Fotos (separadas por comas)</Label>
        <Input
          id="fotos"
          value={formData.fotos}
          onChange={(e) => setFormData(prev => ({ ...prev, fotos: e.target.value }))}
          placeholder="https://example.com/foto1.jpg, https://example.com/foto2.jpg"
        />
      </div>

      <DialogFooter>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoadingSpinner className="mr-2 h-4 w-4" />
              Guardando...
            </>
          ) : (
            initialData ? 'Actualizar' : 'Crear'
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
