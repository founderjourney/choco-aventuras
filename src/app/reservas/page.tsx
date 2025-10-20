"use client";

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

interface Cuatrimoto {
  id: number;
  nombre: string;
  marca: string;
  modelo: string;
  año: number | null;
  color: string;
  precio_hora: number;
  precio_dia: number;
  descripcion: string | null;
  fotos: string[];
  estado: 'disponible' | 'ocupado' | 'mantenimiento';
  caracteristicas: string[];
}

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
}

async function fetchCuatrimotos(): Promise<{cuatrimotos: Cuatrimoto[]}> {
  const response = await fetch('/api/cuadriciclos');
  if (!response.ok) throw new Error('Error fetching cuatrimotos');
  return response.json();
}

async function fetchPaseos(): Promise<{paseos: Paseo[]}> {
  const response = await fetch('/api/paseos');
  if (!response.ok) throw new Error('Error fetching paseos');
  return response.json();
}

async function createReserva(data: {
  cuatrimoto_id: number;
  paseo_id: number;
  cliente_nombre: string;
  cliente_telefono: string;
  cliente_email: string;
  fecha_paseo: Date;
  notas?: string;
}) {
  const response = await fetch('/api/reservas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error creating reserva');
  return response.json();
}

export default function ReservasPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    cuatrimoto_id: '',
    paseo_id: '',
    cliente_nombre: '',
    cliente_telefono: '',
    cliente_email: '',
    fecha_paseo: '',
    hora_paseo: '',
    notas: ''
  });

  const { data: cuatrimotosData, isLoading: loadingCuatrimotos } = useQuery({
    queryKey: ['cuatrimotos'],
    queryFn: fetchCuatrimotos,
  });

  const { data: paseosData, isLoading: loadingPaseos } = useQuery({
    queryKey: ['paseos'],
    queryFn: fetchPaseos,
  });

  const createReservaMutation = useMutation({
    mutationFn: createReserva,
    onSuccess: () => {
      toast({
        title: "¡Reserva creada!",
        description: "Tu reserva ha sido creada exitosamente. Te contactaremos pronto.",
      });
      queryClient.invalidateQueries({ queryKey: ['reservas'] });
      setFormData({
        cuatrimoto_id: '',
        paseo_id: '',
        cliente_nombre: '',
        cliente_telefono: '',
        cliente_email: '',
        fecha_paseo: '',
        hora_paseo: '',
        notas: ''
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Hubo un problema al crear la reserva. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.cuatrimoto_id || !formData.paseo_id || !formData.cliente_nombre ||
        !formData.cliente_telefono || !formData.cliente_email || !formData.fecha_paseo || !formData.hora_paseo) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    const fechaCompleta = new Date(`${formData.fecha_paseo}T${formData.hora_paseo}:00`);

    createReservaMutation.mutate({
      cuatrimoto_id: parseInt(formData.cuatrimoto_id),
      paseo_id: parseInt(formData.paseo_id),
      cliente_nombre: formData.cliente_nombre,
      cliente_telefono: formData.cliente_telefono,
      cliente_email: formData.cliente_email,
      fecha_paseo: fechaCompleta,
      notas: formData.notas || undefined
    });
  };

  const selectedCuatrimoto = cuatrimotosData?.cuatrimotos.find(c => c.id === parseInt(formData.cuatrimoto_id));
  const selectedPaseo = paseosData?.paseos.find(p => p.id === parseInt(formData.paseo_id));

  const precioTotal = selectedCuatrimoto && selectedPaseo
    ? (selectedCuatrimoto.precio_hora * selectedPaseo.duracion_horas) + selectedPaseo.precio
    : 0;

  if (loadingCuatrimotos || loadingPaseos) {
    return <div className="p-8">Cargando formulario de reservas...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#145A32] mb-8">Reservas</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario */}
          <Card>
            <CardHeader>
              <CardTitle>Información de la Reserva</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Selección de Cuatrimoto */}
                <div className="space-y-2 relative">
                  <Label htmlFor="cuatrimoto">Cuatrimoto *</Label>
                  <Select value={formData.cuatrimoto_id} onValueChange={(value) => setFormData(prev => ({...prev, cuatrimoto_id: value}))}>
                    <SelectTrigger className="relative z-10">
                      <SelectValue placeholder="Selecciona una cuatrimoto" />
                    </SelectTrigger>
                    <SelectContent className="relative z-[9999]">
                      {cuatrimotosData?.cuatrimotos.filter(c => c.estado === 'disponible').map((cuatrimoto) => (
                        <SelectItem key={cuatrimoto.id} value={cuatrimoto.id.toString()}>
                          <div className="flex flex-col">
                            <span className="font-medium">{cuatrimoto.nombre}</span>
                            <span className="text-xs text-gray-500">${cuatrimoto.precio_hora.toLocaleString()}/hora</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Selección de Paseo */}
                <div className="space-y-2 relative">
                  <Label htmlFor="paseo">Paseo *</Label>
                  <Select value={formData.paseo_id} onValueChange={(value) => setFormData(prev => ({...prev, paseo_id: value}))}>
                    <SelectTrigger className="relative z-10">
                      <SelectValue placeholder="Selecciona un paseo" />
                    </SelectTrigger>
                    <SelectContent className="relative z-[9999]">
                      {paseosData?.paseos.map((paseo) => (
                        <SelectItem key={paseo.id} value={paseo.id.toString()}>
                          <div className="flex flex-col">
                            <span className="font-medium">{paseo.nombre}</span>
                            <span className="text-xs text-gray-500">{paseo.duracion_horas}h - ${paseo.precio.toLocaleString()}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Fecha y Hora */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fecha">Fecha *</Label>
                    <Input
                      id="fecha"
                      type="date"
                      value={formData.fecha_paseo}
                      onChange={(e) => setFormData(prev => ({...prev, fecha_paseo: e.target.value}))}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="space-y-2 relative">
                    <Label htmlFor="hora">Hora *</Label>
                    <Select value={formData.hora_paseo} onValueChange={(value) => setFormData(prev => ({...prev, hora_paseo: value}))}>
                      <SelectTrigger className="relative z-10">
                        <SelectValue placeholder="Hora" />
                      </SelectTrigger>
                      <SelectContent className="relative z-[9999]">
                        <SelectItem value="08:00">8:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="16:00">4:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Información del Cliente */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Información del Cliente</h3>

                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre Completo *</Label>
                    <Input
                      id="nombre"
                      value={formData.cliente_nombre}
                      onChange={(e) => setFormData(prev => ({...prev, cliente_nombre: e.target.value}))}
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input
                      id="telefono"
                      value={formData.cliente_telefono}
                      onChange={(e) => setFormData(prev => ({...prev, cliente_telefono: e.target.value}))}
                      placeholder="+57 300 123 4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.cliente_email}
                      onChange={(e) => setFormData(prev => ({...prev, cliente_email: e.target.value}))}
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notas">Notas adicionales</Label>
                    <Textarea
                      id="notas"
                      value={formData.notas}
                      onChange={(e) => setFormData(prev => ({...prev, notas: e.target.value}))}
                      placeholder="Experiencia previa, requerimientos especiales, etc."
                      rows={3}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#E53935] hover:bg-[#D32F2F]"
                  disabled={createReservaMutation.isPending}
                >
                  {createReservaMutation.isPending ? 'Creando reserva...' : 'Crear Reserva'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Resumen */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen de la Reserva</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedCuatrimoto && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-[#145A32]">Cuatrimoto Seleccionado</h4>
                  <p className="text-sm text-gray-600">{selectedCuatrimoto.nombre}</p>
                  <p className="text-sm">{selectedCuatrimoto.marca} {selectedCuatrimoto.modelo} ({selectedCuatrimoto.año})</p>
                  <p className="text-sm">Color: {selectedCuatrimoto.color}</p>
                  <p className="font-semibold">${selectedCuatrimoto.precio_hora.toLocaleString()}/hora</p>
                </div>
              )}

              {selectedPaseo && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-[#145A32]">Paseo Seleccionado</h4>
                  <p className="text-sm text-gray-600">{selectedPaseo.nombre}</p>
                  <p className="text-sm">{selectedPaseo.descripcion}</p>
                  <p className="text-sm">Duración: {selectedPaseo.duracion_horas} horas</p>
                  <p className="text-sm">Ubicación: {selectedPaseo.ubicacion}</p>
                  <p className="font-semibold">${selectedPaseo.precio.toLocaleString()}</p>
                </div>
              )}

              {formData.fecha_paseo && formData.hora_paseo && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-[#145A32]">Fecha y Hora</h4>
                  <p>{new Date(formData.fecha_paseo).toLocaleDateString('es-CO', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                  <p>{formData.hora_paseo}</p>
                </div>
              )}

              {precioTotal > 0 && (
                <div className="p-4 bg-[#145A32] text-white rounded-lg">
                  <h4 className="font-semibold">Precio Total</h4>
                  <p className="text-2xl font-bold">${precioTotal.toLocaleString()}</p>
                  {selectedCuatrimoto && selectedPaseo && (
                    <div className="text-sm mt-2 space-y-1">
                      <p>Cuatrimoto: ${(selectedCuatrimoto.precio_hora * selectedPaseo.duracion_horas).toLocaleString()}</p>
                      <p>Paseo: ${selectedPaseo.precio.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}