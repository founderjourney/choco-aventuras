"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TreePine, Target, Music, Users, Clock, Shield, MapPin, ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';
import CallToAction from '@/components/CallToAction';
import Navigation from '@/components/Navigation';

export default function ExperienciasPage() {
  const experiencias = [
    {
      id: 1,
      titulo: "Tour en cuatrimoto",
      subtitulo: "Experiencias aventura 4x4",
      subtitulo2: "Experiencias en cuatrimoto",
      tiempo: "40min - 60min",
      grupos: true,
      icono: <TreePine className="h-8 w-8" />,
      descripcion: "Aventura extrema sobre barro, trochas y selva tropical",
      detalles: [
        "Equipo de seguridad (casco)",
        "Asistencia médica",
        "Hidratación",
        "Yamaha Grizzly 700"
      ],
      precio: "$250.000 por cuatrimoto (hasta 2 pasajeros por moto, mismo precio)",
      color: "from-green-500 to-green-700",
      disponible: true
    },
    {
      id: 2,
      titulo: "Batalla de Paintball",
      icono: <Target className="h-8 w-8" />,
      descripcion: "PRÓXIMAMENTE",
      detalles: [],
      color: "from-red-500 to-red-700",
      disponible: false,
      backgroundImage: "url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3')"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gray-500 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl font-bold mb-6 jungle-text wind-effect">
            NUESTROS SERVICIOS
          </h1>
          <p className="text-xl mb-8 max-w-4xl mx-auto">
            Tu próxima aventura comienza aquí...
          </p>
        </div>
      </section>

      {/* Experiencias Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#145A32] mb-4 jungle-text">
              NUESTROS SERVICIOS
            </h2>
            <p className="text-xl text-gray-600">
              Tu próxima aventura comienza aquí...
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {experiencias.map((exp, index) => (
              <Card key={exp.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 card-3d particle-hover relative">
                {exp.backgroundImage && (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: exp.backgroundImage }}
                  >
                    <div className="absolute inset-0 bg-black/50"></div> {/* Overlay */}
                  </div>
                )}
                <CardContent className="p-8 relative z-10">
                  <div className={`bg-gradient-to-r ${exp.color} rounded-2xl w-16 h-16 flex items-center justify-center mb-6 text-white`}>
                    {exp.icono}
                  </div>

                  <h3 className="text-2xl font-bold text-[#145A32] mb-2">{exp.titulo}</h3>
                  {exp.subtitulo && <p className="text-lg font-semibold text-gray-800 mb-2">{exp.subtitulo}</p>}
                  {exp.subtitulo2 && <p className="text-base text-gray-600 mb-2">{exp.subtitulo2}</p>}
                  {exp.tiempo && <p className="text-sm text-gray-600 mb-2"><strong>Tiempo:</strong> {exp.tiempo}</p>}
                  {exp.grupos && <p className="text-sm text-green-600 mb-4">✓ Grupos</p>}

                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">{exp.descripcion}</p>

                  {exp.detalles.length > 0 && (
                    <>
                      <h4 className="font-semibold mb-3">Incluye:</h4>
                      <div className="space-y-3 mb-6">
                        {exp.detalles.map((detalle, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#F1C40F] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{detalle}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {exp.precio && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Precio:</h4>
                      <p className="text-[#145A32] font-bold">{exp.precio}</p>
                    </div>
                  )}

                  {exp.disponible ? (
                    <Link href="/reservas">
                      <Button className="w-full bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold py-3 adrenaline-button magnetic-button">
                        RESERVAR
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <Button className="w-full bg-gray-400 text-white font-bold py-3 cursor-not-allowed" disabled>
                      PRÓXIMAMENTE
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Destacada - ¿Por qué somos únicos? */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#145A32] mb-6 jungle-text">
              ¿Por qué somos únicos en el Chocó?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos la primera experiencia de turismo extremo en Quibdó que combina todo en un solo lugar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center card-3d">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#145A32] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl"></span>
                </div>
                <h3 className="text-xl font-bold text-[#145A32] mb-4">Yamaha Grizzly 700</h3>
                <p className="text-gray-700">
                  Las cuatrimotos más potentes y seguras para aventuras extremas en la selva.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center card-3d">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#1565C0] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl"></span>
                </div>
                <h3 className="text-xl font-bold text-[#145A32] mb-4">100% Selva Tropical</h3>
                <p className="text-gray-700">
                  Experiencias auténticas en el corazón de la selva del Pacífico chocoano, biodiversidad única en el mundo.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center card-3d">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#F1C40F] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl"></span>
                </div>
                <h3 className="text-xl font-bold text-[#145A32] mb-4">Cultura Auténtica</h3>
                <p className="text-gray-700">
                  Guías locales que te introducen a la verdadera identidad chocoana, música y tradiciones milenarias.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>





      {/* Políticas de Seguridad y Información Adicional */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#145A32] mb-12 jungle-text">
            Seguridad y Políticas
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-3d">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#145A32] rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#145A32]">Protección</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#F1C40F] rounded-full"></div>
                    <span>Uso obligatorio de casco</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#F1C40F] rounded-full"></div>
                    <span>Obligatorio Licencia de conducción para el conductor</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#F1C40F] rounded-full"></div>
                    <span>Edad mínima para conducir: 16 años</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#1565C0] rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#145A32]">Políticas</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#F1C40F] rounded-full"></div>
                    <span>Política de cancelación: reembolso íntegro si cancelas con mínimo 24 horas de antelación</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#F1C40F] rounded-full"></div>
                    <span>Rutas pueden variar por clima; alternativa (ruta rural) en caso de lluvia o subida del río</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center text-[#145A32] mb-8">Información Adicional</h3>
            <Card className="card-3d">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#F1C40F] rounded-full"></div>
                        <span>Confirmación se recibe al realizar la reserva</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#F1C40F] rounded-full"></div>
                        <span>No adaptado para sillas de ruedas</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#F1C40F] rounded-full"></div>
                        <span>No recomendable para problemas de espalda, embarazadas, afecciones cardíacas graves</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#F1C40F] rounded-full"></div>
                        <span>La mayoría de viajeros pueden participar</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#F1C40F] rounded-full"></div>
                        <span>Actividad privada (solo su grupo)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* TODO: Implement Gallery Component (requires CMS integration for client uploads) */}
      {/* TODO: Implement Testimonials Section (requires CMS integration for client photos and testimonials) */}

      {/* Call to Action */}
      <CallToAction
        titulo="¿Listo para Vivir la Aventura?"
        descripcion="Experimenta lo que solo el Chocó puede ofrecerte: naturaleza, adrenalina y cultura en un solo lugar"
        botonPrimario={{ texto: "RESERVAR EXPERIENCIA", href: "/reservas" }}
        botonSecundario={{ texto: "VER CUATRIMOTOS", href: "/cuatrimotos" }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}