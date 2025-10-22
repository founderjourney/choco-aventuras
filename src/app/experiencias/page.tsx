"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TreePine, Target, Music, Users, Clock, Shield, MapPin, ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';
import CallToAction from '@/components/CallToAction';
import Navigation from '@/components/Navigation';
import { usePageContent } from '@/hooks/use-page-content';

export default function ExperienciasPage() {
  // 🚀 CMS Integration - Simple y seguro
  const pageContent = usePageContent('experiencias');

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
      descripcion: "Prepárate para la acción y la estrategia en un campo de batalla natural. El paintball es una experiencia emocionante donde la adrenalina y el trabajo en equipo son clave. ¡Próximamente en Chocó Aventuras!",
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
            {pageContent.titulo || 'NUESTROS SERVICIOS'}
          </h1>
          <p className="text-xl mb-8 max-w-4xl mx-auto">
            {pageContent.contenido || 'Tu próxima aventura comienza aquí...'}
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

          {/* Política de Cancelación */}
          <div className="mt-16">
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#145A32] mb-4 flex items-center gap-3">
                <Clock className="h-6 w-6" />
                Política de cancelación
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Para recibir el reembolso íntegro de la experiencia, debes cancelarla como mínimo con <strong>24 horas de antelación</strong>.
              </p>
            </div>
          </div>

          {/* Información sobre Variaciones por Clima */}
          <div className="mt-8">
            <div className="bg-yellow-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#145A32] mb-4 flex items-center gap-3">
                <Shield className="h-6 w-6" />
                Importante
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Las rutas pueden variar según condiciones climáticas. En caso de lluvias intensas o aumento del nivel del río,
                el recorrido acuático será reemplazado por una <strong>ruta rural alternativa</strong>, garantizando siempre la
                <strong> seguridad de nuestros turistas</strong>.
              </p>
            </div>
          </div>

          {/* Información Adicional */}
          <div className="mt-8">
            <div className="bg-gray-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#145A32] mb-6 flex items-center gap-3">
                <Users className="h-6 w-6" />
                Información adicional
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">La confirmación se recibirá cuando se realice la reserva</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">La mayoría de viajeros pueden participar en la experiencia</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Se trata de un tour o una actividad de carácter privado. Solo puede participar su grupo</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 mb-3">No recomendado para:</h4>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Personas en silla de ruedas (no está adaptado)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Viajeros con problemas de espalda</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Embarazadas</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Viajeros con afecciones cardíacas u otros problemas médicos graves</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>









      {/* Galería de Experiencias - Sección de Fotos */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              <span className="text-emerald-600">NUESTRAS AVENTURAS</span> EN IMÁGENES
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre la emoción y la belleza del Chocó a través de nuestras fotos. Cada imagen es un recuerdo de la aventura que te espera.
            </p>
          </div>

          {/* Photo Grid Slider */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Photo 1 - Cuatrimotos */}
            <div className="group relative overflow-hidden rounded-2xl bg-gray-200 aspect-[4/5] cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3')"}}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Rutas Extremas</h3>
                <p className="text-sm opacity-90">Cuatrimotos por senderos únicos</p>
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                <span></span>
              </div>
            </div>

            {/* Photo 2 - Selva */}
            <div className="group relative overflow-hidden rounded-2xl bg-gray-200 aspect-[4/5] cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3')"}}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Selva Tropical</h3>
                <p className="text-sm opacity-90">Biodiversidad única del Chocó</p>
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                <span></span>
              </div>
            </div>

            {/* Photo 3 - Paintball */}
            <div className="group relative overflow-hidden rounded-2xl bg-gray-200 aspect-[4/5] cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3')"}}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Combate Extremo</h3>
                <p className="text-sm opacity-90">Paintball en escenarios naturales</p>
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                <span></span>
              </div>
            </div>

            {/* Photo 4 - Aventura Grupal */}
            <div className="group relative overflow-hidden rounded-2xl bg-gray-200 aspect-[4/5] cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3')"}}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Aventura Grupal</h3>
                <p className="text-sm opacity-90">Experiencias compartidas</p>
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                <span></span>
              </div>
            </div>
          </div>

          {/* Bottom Photos Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Photo 5 - Panorámica */}
            <div className="group relative overflow-hidden rounded-2xl bg-gray-200 aspect-[3/2] cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3')"}}/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Paisajes Únicos</h3>
                <p className="text-sm opacity-90">Vistas panorámicas del Chocó</p>
              </div>
            </div>

            {/* Photo 6 - Equipos */}
            <div className="group relative overflow-hidden rounded-2xl bg-gray-200 aspect-[3/2] cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3')"}}/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Equipos Premium</h3>
                <p className="text-sm opacity-90">Tecnología de última generación</p>
              </div>
            </div>

            {/* Photo 7 - Cultura Local */}
            <div className="group relative overflow-hidden rounded-2xl bg-gray-200 aspect-[3/2] cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3')"}}/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Cultura Chocoana</h3>
                <p className="text-sm opacity-90">Tradiciones y gastronomía local</p>
              </div>
            </div>
          </div>

          {/* TODO: Placeholder for client photo uploads / testimonials within the gallery structure */}
          <div className="text-center mt-12 text-gray-600">
            <p className="mb-2">Aquí se podrán subir fotos de la experiencia y testimonios de clientes.</p>
            <p>Se requiere integración con CMS para que el cliente pueda gestionar este contenido.</p>
          </div>
        </div>
      </section>

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