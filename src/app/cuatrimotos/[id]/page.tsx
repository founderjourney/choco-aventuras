"use client";

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Calendar, Star, Heart, Share2, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

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

async function fetchCuatrimoto(id: number): Promise<Cuatrimoto> {
  const response = await fetch(`/api/cuadriciclos/${id}`);
  if (!response.ok) throw new Error('Error fetching cuatrimoto');
  const data = await response.json();
  return data.cuatrimoto;
}

export default function CuatrimotoDetailPage() {
  const params = useParams();
  const id = parseInt(params.id as string);

  const { data: cuatrimoto, isLoading, error } = useQuery({
    queryKey: ['cuatrimoto', id],
    queryFn: () => fetchCuatrimoto(id),
    enabled: !!id,
  });

  if (isLoading) return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando cuatrimoto...</p>
        </div>
      </div>
    </div>
  );

  if (error || !cuatrimoto) return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Cuatrimoto no encontrada</h1>
          <p className="text-gray-600 mb-6">La cuatrimoto que buscas no existe o ha sido eliminada.</p>
          <Link href="/cuatrimotos">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Cuatrimotos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );

  const whatsappMessage = `¡Hola! Me interesa la cuatrimoto "${cuatrimoto.nombre}" ${cuatrimoto.marca} ${cuatrimoto.modelo}. ¿Podrían darme más información sobre disponibilidad y reservas?`;
  const whatsappUrl = `https://wa.me/573117030436?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section with Image Gallery */}
      <section className="relative">
        <div className="h-96 sm:h-[500px] overflow-hidden">
          {cuatrimoto.fotos && cuatrimoto.fotos.length > 0 ? (
            <img
              src={cuatrimoto.fotos[0]}
              alt={cuatrimoto.nombre}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-emerald-800 to-emerald-600 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-2">{cuatrimoto.nombre}</h1>
                <p className="text-xl opacity-90">{cuatrimoto.marca} {cuatrimoto.modelo}</p>
              </div>
            </div>
          )}
        </div>

        {/* Overlay content */}
        <div className="absolute inset-0 bg-black/30 flex items-end">
          <div className="w-full p-6 sm:p-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge
                      variant={cuatrimoto.estado === 'disponible' ? 'default' : 'secondary'}
                      className={`${
                        cuatrimoto.estado === 'disponible'
                          ? 'bg-green-600 text-white'
                          : cuatrimoto.estado === 'ocupado'
                          ? 'bg-red-600 text-white'
                          : 'bg-yellow-600 text-white'
                      }`}
                    >
                      {cuatrimoto.estado}
                    </Badge>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold mb-2">{cuatrimoto.nombre}</h1>
                  <p className="text-xl opacity-90">{cuatrimoto.marca} {cuatrimoto.modelo}</p>
                  {cuatrimoto.año && (
                    <p className="text-lg opacity-80">Año {cuatrimoto.año}</p>
                  )}
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
            <Link href="/cuatrimotos" className="inline-flex items-center text-emerald-600 hover:text-emerald-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Cuatrimotos
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              {cuatrimoto.descripcion && (
                <Card>
                  <CardHeader>
                    <CardTitle>Descripción</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{cuatrimoto.descripcion}</p>
                  </CardContent>
                </Card>
              )}

              {/* Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Especificaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-700">Marca:</span>
                        <span className="ml-2 text-gray-900">{cuatrimoto.marca}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Modelo:</span>
                        <span className="ml-2 text-gray-900">{cuatrimoto.modelo}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Color:</span>
                        <span className="ml-2 text-gray-900">{cuatrimoto.color}</span>
                      </div>
                    </div>
                    {cuatrimoto.año && (
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium text-gray-700">Año:</span>
                          <span className="ml-2 text-gray-900">{cuatrimoto.año}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              {cuatrimoto.caracteristicas && cuatrimoto.caracteristicas.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Características</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {cuatrimoto.caracteristicas.map((caracteristica, index) => (
                        <Badge key={index} variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          {caracteristica}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Photo Gallery */}
              {cuatrimoto.fotos && cuatrimoto.fotos.length > 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Galería de Fotos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {cuatrimoto.fotos.slice(1).map((foto, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden">
                          <img
                            src={foto}
                            alt={`${cuatrimoto.nombre} - Foto ${index + 2}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-center">Precios</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-emerald-600">
                      ${cuatrimoto.precio_hora.toLocaleString()}
                    </div>
                    <p className="text-gray-600">por hora</p>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-gray-900">
                      ${cuatrimoto.precio_dia.toLocaleString()}
                    </div>
                    <p className="text-gray-600">por día completo</p>
                  </div>

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

                  <div className="text-xs text-gray-500 text-center">
                    * Los precios pueden variar según temporada y disponibilidad
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
                      <p className="font-medium">Ubicación</p>
                      <p className="text-gray-600">Chocó, Colombia</p>
                    </div>
                  </div>
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