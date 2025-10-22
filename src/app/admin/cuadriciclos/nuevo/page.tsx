"use client";

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { ArrowLeft, Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface CuatrimotoForm {
  nombre: string;
  marca: string;
  modelo: string;
  año: string;
  color: string;
  precio_hora: string;
  precio_dia: string;
  descripcion: string;
  estado: 'disponible' | 'ocupado' | 'mantenimiento';
  caracteristicas: string[];
}

async function createCuatrimoto(data: Omit<CuatrimotoForm, 'año' | 'precio_hora' | 'precio_dia'> & { año: number | null; precio_hora: number; precio_dia: number; fotos: string[] }) {
  const response = await fetch('/api/cuadriciclos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error creating cuatrimoto');
  return response.json();
}

const CARACTERISTICAS_DISPONIBLES = [
  '700cc', '4x4', 'Deportivo', 'Edition Special', 'Reversa',
  'Automático', 'Frenos de disco', 'Suspensión independiente',
  'Potente', 'Resistente', 'Cómodo', '4 tiempos', 'Enfriado por agua',
  'Dirección asistida', 'Luces LED', 'Winch incluido'
];

export default function NuevoCuatrimoto() {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user, isLoading: authLoading, requireAuth } = useAuth();

  const [formData, setFormData] = useState<CuatrimotoForm>({
    nombre: '',
    marca: 'Yamaha',
    modelo: '',
    año: '2009',
    color: '',
    precio_hora: '',
    precio_dia: '',
    descripcion: '',
    estado: 'disponible',
    caracteristicas: []
  });

  useEffect(() => {
    if (!authLoading) {
      requireAuth();
    }
  }, [authLoading, requireAuth]);

  const createMutation = useMutation({
    mutationFn: createCuatrimoto,
    onSuccess: () => {
      toast({
        title: "¡Cuatrimoto creado!",
        description: "El cuatrimoto ha sido agregado exitosamente.",
      });
      queryClient.invalidateQueries({ queryKey: ['admin-cuatrimotos'] });
      router.push('/admin/cuatrimotos');
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Hubo un problema al crear el cuatrimoto.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.modelo || !formData.color ||
        !formData.precio_hora || !formData.precio_dia) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    const cuatrimotoData = {
      ...formData,
      año: formData.año ? parseInt(formData.año) : null,
      precio_hora: parseInt(formData.precio_hora),
      precio_dia: parseInt(formData.precio_dia),
      fotos: [] // Por ahora sin fotos
    };

    createMutation.mutate(cuatrimotoData);
  };

  const handleCaracteristicaChange = (caracteristica: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      caracteristicas: checked
        ? [...prev.caracteristicas, caracteristica]
        : prev.caracteristicas.filter(c => c !== caracteristica)
    }));
  };

  if (authLoading) {
    return <div className="p-8">Cargando...</div>;
  }

  if (!user) {
    return null;
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
            <div className="flex items-center space-x-6">
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
              <span className="text-sm text-gray-600">Hola, {user.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/admin" className="text-gray-600 hover:text-[#145A32]">
            Admin
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/admin/cuatrimotos" className="text-gray-600 hover:text-[#145A32]">
            Cuatrimotos
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#145A32]">Nuevo</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#145A32]">Agregar Cuatrimoto</h1>
            <p className="text-gray-600 mt-2">Completa la información del nuevo cuatrimoto</p>
          </div>
          <Link href="/admin/cuatrimotos">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
          </Link>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Información del Cuatrimoto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información Básica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData(prev => ({...prev, nombre: e.target.value}))}
                    placeholder="Ej: Yamaha Grizzly 700 Rojo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marca">Marca *</Label>
                  <Select value={formData.marca} onValueChange={(value) => setFormData(prev => ({...prev, marca: value}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yamaha">Yamaha</SelectItem>
                      <SelectItem value="Honda">Honda</SelectItem>
                      <SelectItem value="Polaris">Polaris</SelectItem>
                      <SelectItem value="Can-Am">Can-Am</SelectItem>
                      <SelectItem value="Arctic Cat">Arctic Cat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modelo">Modelo *</Label>
                  <Input
                    id="modelo"
                    value={formData.modelo}
                    onChange={(e) => setFormData(prev => ({...prev, modelo: e.target.value}))}
                    placeholder="Ej: Grizzly 700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="anio">Año</Label>
                  <Input
                    id="anio"
                    type="number"
                    value={formData.año}
                    onChange={(e) => setFormData(prev => ({...prev, año: e.target.value}))}
                    placeholder="2009"
                    min="1990"
                    max="2025"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color *</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => setFormData(prev => ({...prev, color: e.target.value}))}
                    placeholder="Ej: Rojo Edition Special"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select value={formData.estado} onValueChange={(value: 'disponible' | 'ocupado' | 'mantenimiento') => setFormData(prev => ({...prev, estado: value}))}>
                    <SelectTrigger>
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

              {/* Precios */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="precio_hora">Precio por Hora (COP) *</Label>
                  <Input
                    id="precio_hora"
                    type="number"
                    value={formData.precio_hora}
                    onChange={(e) => setFormData(prev => ({...prev, precio_hora: e.target.value}))}
                    placeholder="150000"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="precio_dia">Precio por Día (COP) *</Label>
                  <Input
                    id="precio_dia"
                    type="number"
                    value={formData.precio_dia}
                    onChange={(e) => setFormData(prev => ({...prev, precio_dia: e.target.value}))}
                    placeholder="800000"
                    min="0"
                  />
                </div>
              </div>

              {/* Descripción */}
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData(prev => ({...prev, descripcion: e.target.value}))}
                  placeholder="Describe las características principales del cuatrimoto..."
                  rows={3}
                />
              </div>

              {/* Características */}
              <div className="space-y-4">
                <Label>Características</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {CARACTERISTICAS_DISPONIBLES.map((caracteristica) => (
                    <div key={caracteristica} className="flex items-center space-x-2">
                      <Checkbox
                        id={caracteristica}
                        checked={formData.caracteristicas.includes(caracteristica)}
                        onCheckedChange={(checked) => handleCaracteristicaChange(caracteristica, checked as boolean)}
                      />
                      <Label htmlFor={caracteristica} className="text-sm">
                        {caracteristica}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="bg-[#145A32] hover:bg-[#0f4428] flex items-center gap-2"
                  disabled={createMutation.isPending}
                >
                  <Save className="h-4 w-4" />
                  {createMutation.isPending ? 'Guardando...' : 'Guardar Cuatrimoto'}
                </Button>
                <Link href="/admin/cuatrimotos">
                  <Button variant="outline" className="flex items-center gap-2">
                    <X className="h-4 w-4" />
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}