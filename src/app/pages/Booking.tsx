import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Calculator, MessageCircle, Clock, Mountain } from 'lucide-react';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import backend from '~backend/client';
import type { Paseo } from '~backend/paseos/list';
import { businessConfig, appConfig } from '../config';

export default function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const cuatrimotoId = searchParams.get('cuatrimoto');

  const [formData, setFormData] = useState({
    cliente_nombre: '',
    cliente_telefono: '',
    cliente_email: '',
    paseo_id: 0,
    fecha_paseo: '',
    hora_inicio: '',
    notas: '',
    terms_accepted: false,
  });

  const [selectedPaseos, setSelectedPaseos] = useState<number[]>([]);

  const { data: cuatrimoto, isLoading: cuatrimotoLoading } = useQuery({
    queryKey: ['cuatrimoto', cuatrimotoId],
    queryFn: async () => {
      if (!cuatrimotoId) return null;
      return await backend.cuatrimotos.get({ id: parseInt(cuatrimotoId) });
    },
    enabled: !!cuatrimotoId,
  });

  const { data: paseosData, isLoading: paseosLoading } = useQuery({
    queryKey: ['paseos'],
    queryFn: async () => {
      const response = await backend.paseos.list();
      return response.paseos;
    },
  });

  const paseos = paseosData || [];

  const calculateTotalPrice = () => {
    return selectedPaseos.reduce((total, paseoId) => {
      const paseo = paseos.find(p => p.id === paseoId);
      return total + (paseo?.precio || 0);
    }, 0);
  };

  const createReservaMutation = useMutation({
    mutationFn: async (data: any) => {
      return await backend.reservas.create(data);
    },
    onSuccess: (data) => {
      toast({
        title: "¡Reserva creada exitosamente!",
        description: "Te contactaremos pronto para confirmar tu reserva.",
      });
      
      queryClient.invalidateQueries({ queryKey: ['reservas'] });
      navigate('/');
    },
    onError: (error) => {
      console.error('Error creating reservation:', error);
      toast({
        title: "Error al crear la reserva",
        description: "Por favor, verifica la disponibilidad e inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const handlePaseoToggle = (paseoId: number) => {
    setSelectedPaseos(prev => {
      if (prev.includes(paseoId)) {
        return prev.filter(id => id !== paseoId);
      } else {
        return [...prev, paseoId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cuatrimoto) return;
    
    if (selectedPaseos.length === 0) {
      toast({
        title: "Selecciona un paseo",
        description: "Debes seleccionar al menos un paseo para continuar.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.terms_accepted) {
      toast({
        title: "Términos y condiciones",
        description: "Debes aceptar los términos y condiciones para continuar.",
        variant: "destructive",
      });
      return;
    }

    const fechaPaseo = new Date(`${formData.fecha_paseo}T${formData.hora_inicio}`);

    for (const paseoId of selectedPaseos) {
      const reservaData = {
        cuatrimoto_id: cuatrimoto.id,
        paseo_id: paseoId,
        cliente_nombre: formData.cliente_nombre,
        cliente_telefono: formData.cliente_telefono,
        cliente_email: formData.cliente_email,
        fecha_paseo: fechaPaseo,
        precio_total: paseos.find(p => p.id === paseoId)?.precio || 0,
        notas: formData.notas || undefined,
      };

      try {
        await createReservaMutation.mutateAsync(reservaData);
      } catch (error) {
        break;
      }
    }
  };

  if (!cuatrimotoId) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Cuatrimoto no encontrado</h1>
            <Link to="/cuadriciclos">
              <Button>Ver Cuatrimotos Disponibles</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cuatrimotoLoading || paseosLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!cuatrimoto) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center text-red-600">
            Cuatrimoto no encontrado
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link to="/cuadriciclos">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Reservar Paseo</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mountain className="h-5 w-5 mr-2" />
                  Selecciona tus Paseos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {paseos.map((paseo) => (
                    <div
                      key={paseo.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedPaseos.includes(paseo.id)
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handlePaseoToggle(paseo.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg">{paseo.nombre}</h3>
                        <Checkbox
                          checked={selectedPaseos.includes(paseo.id)}
                          onCheckedChange={() => handlePaseoToggle(paseo.id)}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{paseo.descripcion}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {paseo.duracion_horas}h
                          </span>
                          <Badge variant="outline">
                            {paseo.dificultad === 'facil' ? 'Fácil' : paseo.dificultad === 'moderado' ? 'Moderado' : 'Difícil'}
                          </Badge>
                        </div>
                        <span className="font-bold text-lg">${paseo.precio}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="cliente_nombre">Nombre Completo *</Label>
                    <Input
                      id="cliente_nombre"
                      value={formData.cliente_nombre}
                      onChange={(e) => setFormData(prev => ({ ...prev, cliente_nombre: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="cliente_telefono">Teléfono *</Label>
                    <Input
                      id="cliente_telefono"
                      type="tel"
                      value={formData.cliente_telefono}
                      onChange={(e) => setFormData(prev => ({ ...prev, cliente_telefono: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="cliente_email">Email *</Label>
                    <Input
                      id="cliente_email"
                      type="email"
                      value={formData.cliente_email}
                      onChange={(e) => setFormData(prev => ({ ...prev, cliente_email: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fecha_paseo">Fecha del Paseo *</Label>
                      <Input
                        id="fecha_paseo"
                        type="date"
                        value={formData.fecha_paseo}
                        onChange={(e) => setFormData(prev => ({ ...prev, fecha_paseo: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="hora_inicio">Hora de Inicio *</Label>
                      <Input
                        id="hora_inicio"
                        type="time"
                        value={formData.hora_inicio}
                        onChange={(e) => setFormData(prev => ({ ...prev, hora_inicio: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notas">Notas Adicionales</Label>
                    <Textarea
                      id="notas"
                      placeholder="Cualquier información adicional..."
                      value={formData.notas}
                      onChange={(e) => setFormData(prev => ({ ...prev, notas: e.target.value }))}
                    />
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-yellow-800"> Políticas y Requisitos</h4>
                    <div className="text-sm text-yellow-700 space-y-2">
                      <div>
                        <strong>Edad mínima:</strong> Varía según el paseo (consulta los requisitos de cada paseo)
                      </div>
                      <div>
                        <strong>Documentos requeridos:</strong>
                        <ul className="list-disc list-inside ml-2 mt-1">
                          <li>Cédula de ciudadanía o tarjeta de identidad</li>
                          <li>Pasaporte (para turistas extranjeros)</li>
                        </ul>
                      </div>
                      <div>
                        <strong>Depósito:</strong> Se requiere un depósito del 50% del valor del servicio para reservar
                      </div>
                      <div>
                        <strong>Vestimenta obligatoria:</strong>
                        <ul className="list-disc list-inside ml-2 mt-1">
                          <li>Ropa cómoda y resistente (que se pueda ensuciar)</li>
                          <li>Calzado cerrado y resistente</li>
                        </ul>
                      </div>
                      <div>
                        <strong>Seguridad:</strong> Uso obligatorio de casco, chaleco y protección provista por la empresa
                      </div>
                      <div>
                        <strong>Responsabilidad:</strong> El cliente es responsable por daños ocasionados al equipo por mal uso
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.terms_accepted}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, terms_accepted: !!checked }))}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      Acepto las políticas y requisitos arriba mencionados. Entiendo que esta reserva está sujeta a confirmación 
                      y que recibiré un contacto para coordinar los detalles.
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={createReservaMutation.isPending || selectedPaseos.length === 0}
                  >
                    {createReservaMutation.isPending ? (
                      <>
                        <LoadingSpinner className="mr-2 h-4 w-4" />
                        Creando Reserva...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Confirmar Reserva
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Resumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Cuatrimoto</h4>
                  <div className="aspect-video bg-gray-200 rounded-lg mb-2">
                    {cuatrimoto.fotos.length > 0 ? (
                      <img
                        src={cuatrimoto.fotos[0]}
                        alt={cuatrimoto.nombre}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center rounded-lg">
                        <span className="text-6xl"></span>
                      </div>
                    )}
                  </div>
                  <p className="font-medium">{cuatrimoto.nombre}</p>
                  <p className="text-sm text-gray-600">
                    {cuatrimoto.marca} {cuatrimoto.modelo}
                  </p>
                </div>

                {selectedPaseos.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Paseos Seleccionados</h4>
                    <div className="space-y-2">
                      {selectedPaseos.map(paseoId => {
                        const paseo = paseos.find(p => p.id === paseoId);
                        if (!paseo) return null;
                        return (
                          <div key={paseoId} className="flex justify-between text-sm">
                            <span>{paseo.nombre}</span>
                            <span className="font-medium">${paseo.precio}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <Calculator className="h-5 w-5 text-gray-600" />
                    <span className="font-semibold">Precio Total</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">
                    ${calculateTotalPrice().toFixed(2)}
                  </div>
                  {selectedPaseos.length > 1 && (
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedPaseos.length} paseos seleccionados
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}