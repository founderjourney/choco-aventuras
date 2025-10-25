"use client";

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Clock, DollarSign, Calendar, Star, Heart, Share2, PhoneCall, CheckCircle, Users } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

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

async function fetchPaseo(id: number): Promise<Paseo> {
  const response = await fetch(`/api/paseos/${id}`);
  if (!response.ok) throw new Error('Error fetching paseo');
  const data = await response.json();
  return data.paseo;
}

const getDificultadInfo = (dificultad: string) => {
  switch (dificultad) {
    case 'facil':
      return { color: 'bg-green-100 text-green-800', icon: '⭐', label: 'Fácil' };
    case 'intermedio':
      return { color: 'bg-yellow-100 text-yellow-800', icon: '⭐⭐', label: 'Intermedio' };
    case 'dificil':
      return { color: 'bg-red-100 text-red-800', icon: '⭐⭐⭐', label: 'Difícil' };
    default:
      return { color: 'bg-gray-100 text-gray-800', icon: '⭐', label: 'N/A' };
  }
};

export default function PaseoDetailPage() {
  const params = useParams();
  const id = parseInt(params.id as string);

  const { data: paseo, isLoading, error } = useQuery({
    queryKey: ['paseo', id],
    queryFn: () => fetchPaseo(id),
    enabled: !!id,
  });

  if (isLoading) return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando experiencia...</p>
        </div>
      </div>
    </div>
  );

  if (error || !paseo) return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Experiencia no encontrada</h1>
          <p className="text-gray-600 mb-6">La experiencia que buscas no existe o ha sido eliminada.</p>
          <Link href="/experiencias">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Experiencias
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );

  const dificultadInfo = getDificultadInfo(paseo.dificultad);
  const whatsappMessage = `¡Hola! Me interesa la experiencia "${paseo.nombre}" en ${paseo.ubicacion}. ¿Podrían darme más información sobre disponibilidad y reservas?`;
  const whatsappUrl = `https://wa.me/573117030436?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative">
        <div className="h-96 sm:h-[500px] overflow-hidden">
          {paseo.fotos && paseo.fotos.length > 0 ? (
            <img
              src={paseo.fotos[0]}
              alt={paseo.nombre}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-emerald-800 to-emerald-600 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-2">{paseo.nombre}</h1>
                <p className="text-xl opacity-90">{paseo.ubicacion}</p>
              </div>
            </div>
          )}
        </div>

        {/* Overlay content */}
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="w-full p-6 sm:p-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={`${dificultadInfo.color}`}>
                      {dificultadInfo.icon} {dificultadInfo.label}
                    </Badge>
                    {!paseo.activo && (
                      <Badge variant="secondary" className="bg-red-600 text-white">
                        No Disponible
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold mb-2">{paseo.nombre}</h1>
                  <div className="flex items-center gap-4 text-lg opacity-90">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-5 w-5" />
                      {paseo.ubicacion}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-5 w-5" />
                      {paseo.duracion_horas}h
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/experiencias" className="inline-flex items-center text-emerald-600 hover:text-emerald-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Experiencias
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Descripción de la Experiencia</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-lg">{paseo.descripcion}</p>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Información Básica</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-emerald-50 rounded-lg">
                      <Clock className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                      <p className="font-semibold text-gray-900">{paseo.duracion_horas} horas</p>
                      <p className="text-sm text-gray-600">Duración</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="font-semibold text-gray-900">{dificultadInfo.label}</p>
                      <p className="text-sm text-gray-600">Dificultad</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <MapPin className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <p className="font-semibold text-gray-900">{paseo.ubicacion}</p>
                      <p className="text-sm text-gray-600">Ubicación</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What's Included */}
              {paseo.incluye && paseo.incluye.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>¿Qué incluye esta experiencia?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {paseo.incluye.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Photo Gallery */}
              {paseo.fotos && paseo.fotos.length > 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Galería de Fotos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {paseo.fotos.slice(1).map((foto, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden">
                          <img
                            src={foto}
                            alt={`${paseo.nombre} - Foto ${index + 2}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Safety & Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Información Importante</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Requerimientos:</h4>
                      <ul className="text-gray-700 space-y-1">
                        <li>• Edad mínima: 16 años (menores acompañados por adultos)</li>
                        <li>• Ropa cómoda y cerrada</li>
                        <li>• Zapatos cerrados antideslizantes</li>
                        <li>• Protector solar y repelente</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Medidas de Seguridad:</h4>
                      <ul className="text-gray-700 space-y-1">
                        <li>• Guías certificados con primeros auxilios</li>
                        <li>• Equipos de protección incluidos</li>
                        <li>• Seguro de accidentes</li>
                        <li>• Comunicación por radio en todo momento</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-center">Reserva tu Aventura</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-emerald-600">
                      ${paseo.precio.toLocaleString()}
                    </div>
                    <p className="text-gray-600">por persona</p>
                    <p className="text-sm text-gray-500">Incluye todo lo mencionado</p>
                  </div>

                  {paseo.activo ? (
                    <div className="space-y-3">
                      <Link href="/reservas" className="block">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                          <Calendar className="h-4 w-4 mr-2" />
                          Reservar Ahora
                        </Button>
                      </Link>

                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                        <Button variant="outline" className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                          <PhoneCall className="h-4 w-4 mr-2" />
                          Consultar por WhatsApp
                        </Button>
                      </a>
                    </div>
                  ) : (
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <p className="text-red-700 font-medium">Experiencia temporalmente no disponible</p>
                      <p className="text-red-600 text-sm mt-1">Contáctanos para más información</p>
                    </div>
                  )}

                  <div className="text-xs text-gray-500 text-center">
                    * Precios pueden variar según temporada y tamaño del grupo
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <PhoneCall className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="font-medium">Teléfono</p>
                      <p className="text-gray-600">+57 311 703 0436</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="font-medium">Punto de Encuentro</p>
                      <p className="text-gray-600">{paseo.ubicacion}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="font-medium">Horarios</p>
                      <p className="text-gray-600">8:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Special Offers */}
              <Card className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
                <CardHeader>
                  <CardTitle className="text-white">🎉 Oferta Especial</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-emerald-100 mb-3">
                    ¡Reserva con anticipación y obtén descuentos especiales!
                  </p>
                  <ul className="text-emerald-100 text-sm space-y-1">
                    <li>• 10% OFF reservando con 7 días</li>
                    <li>• 15% OFF grupos de 5+ personas</li>
                    <li>• 20% OFF combinando con cuatrimotos</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}