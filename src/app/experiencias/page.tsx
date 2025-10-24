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

  // 🎯 Secciones específicas de experiencias con fallbacks
  const sections = pageContent.experiencias_sections || {};

  // 🎯 Determinar qué experiencias mostrar (CMS o por defecto)
  const experienciasDefault = [
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
      titulo: "Batalla de Paintball (proximamente)",
      icono: <Target className="h-8 w-8" />,
      descripcion: "Prepárate para la acción y la estrategia en un campo de batalla natural. El paintball (proximamente) es una experiencia emocionante donde la adrenalina y el trabajo en equipo son clave. ¡Próximamente en Chocó Aventuras!",
      detalles: [],
      color: "from-red-500 to-red-700",
      disponible: false,
      backgroundImage: "url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3')"
    }
  ];

  // Usar experiencias personalizadas del CMS si están disponibles, sino usar las por defecto
  const experiencias = sections.bloque2_servicios?.custom_experiences?.length > 0
    ? sections.bloque2_servicios.custom_experiences.map(exp => ({
        id: parseInt(exp.id),
        titulo: exp.title,
        subtitulo: exp.subtitle,
        subtitulo2: exp.subtitle2,
        tiempo: exp.time,
        grupos: exp.groups,
        icono: exp.title.toLowerCase().includes('cuatrimoto') ? <TreePine className="h-8 w-8" /> : <Target className="h-8 w-8" />,
        descripcion: exp.description,
        detalles: exp.details,
        precio: exp.price,
        color: exp.color,
        disponible: exp.available,
        backgroundImage: exp.background_image ? `url('${exp.background_image}')` : undefined
      }))
    : experienciasDefault;

  // 🎯 Determinar qué fotos mostrar en la galería (CMS personalizadas o BD/fallback)
  const galleryPhotos = sections.bloque4_galeria?.sync_with_gallery_db
    ? (pageContent.gallery || [])  // Usar galería de la BD si está sincronizada
    : sections.bloque4_galeria?.gallery_photos?.length > 0
      ? sections.bloque4_galeria.gallery_photos  // Usar fotos personalizadas del CMS
      : [  // Fotos por defecto
          {
            id: '1',
            image_url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3',
            title: 'Rutas Extremas',
            description: 'Cuatrimotos por senderos únicos'
          },
          {
            id: '2',
            image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3',
            title: 'Selva Tropical',
            description: 'Biodiversidad única del Chocó'
          },
          {
            id: '3',
            image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3',
            title: 'Combate Extremo',
            description: 'Paintball (proximamente) en escenarios naturales'
          },
          {
            id: '4',
            image_url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3',
            title: 'Aventura Grupal',
            description: 'Experiencias compartidas'
          }
        ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section
        className="relative bg-gray-500 py-20"
        style={{
          backgroundImage: sections.bloque1_hero?.background_image
            ? `url('${sections.bloque1_hero.background_image}')`
            : "url('https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
          <h1 className="text-3xl font-bold mb-6 jungle-text wind-effect">
            {sections.bloque1_hero?.title || pageContent.titulo || 'NUESTROS SERVICIOS'}
          </h1>
          <p className="text-xl mb-8 max-w-4xl mx-auto">
            {sections.bloque1_hero?.description || pageContent.contenido || 'Tu próxima aventura comienza aquí...'}
          </p>
        </div>
      </section>

      {/* Experiencias Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#145A32] mb-4 jungle-text">
              {sections.bloque2_servicios?.section_title || 'NUESTROS SERVICIOS'}
            </h2>
            <p className="text-xl text-gray-600">
              {sections.bloque2_servicios?.section_description || 'Tu próxima aventura comienza aquí...'}
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
                {sections.bloque3_politicas?.cancellation_policy?.title || 'Política de cancelación'}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {sections.bloque3_politicas?.cancellation_policy?.description || 'Para recibir el reembolso íntegro de la experiencia, debes cancelarla como mínimo con 24 horas de antelación.'}
              </p>
            </div>
          </div>

          {/* Información sobre Variaciones por Clima */}
          <div className="mt-8">
            <div className="bg-yellow-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#145A32] mb-4 flex items-center gap-3">
                <Shield className="h-6 w-6" />
                {sections.bloque3_politicas?.weather_policy?.title || 'Importante'}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {sections.bloque3_politicas?.weather_policy?.description || 'Las rutas pueden variar según condiciones climáticas. En caso de lluvias intensas o aumento del nivel del río, el recorrido acuático será reemplazado por una ruta rural alternativa, garantizando siempre la seguridad de nuestros turistas.'}
              </p>
            </div>
          </div>

          {/* Información Adicional */}
          <div className="mt-8">
            <div className="bg-gray-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#145A32] mb-6 flex items-center gap-3">
                <Users className="h-6 w-6" />
                {sections.bloque3_politicas?.additional_info?.title || 'Información adicional'}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {(sections.bloque3_politicas?.additional_info?.general_info || [
                    'La confirmación se recibirá cuando se realice la reserva',
                    'La mayoría de viajeros pueden participar en la experiencia',
                    'Se trata de un tour o una actividad de carácter privado. Solo puede participar su grupo'
                  ]).map((info, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{info}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 mb-3">No recomendado para:</h4>
                  {(sections.bloque3_politicas?.additional_info?.not_recommended || [
                    'Personas en silla de ruedas (no está adaptado)',
                    'Viajeros con problemas de espalda',
                    'Embarazadas',
                    'Viajeros con afecciones cardíacas u otros problemas médicos graves'
                  ]).map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
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
              <span className="text-emerald-600">{sections.bloque4_galeria?.section_title_part1 || 'NUESTRAS AVENTURAS'}</span> {sections.bloque4_galeria?.section_title_part2 || 'EN IMÁGENES'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {sections.bloque4_galeria?.section_description || 'Descubre la emoción y la belleza del Chocó a través de nuestras fotos. Cada imagen es un recuerdo de la aventura que te espera.'}
            </p>
          </div>

          {/* Photo Grid Slider */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryPhotos.slice(0, 4).map((photo) => (
              <div key={photo.id} className="group relative overflow-hidden rounded-2xl bg-gray-200 aspect-[4/5] cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{backgroundImage: `url('${photo.image_url || photo.imageUrl}')`}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-2">{photo.title}</h3>
                  <p className="text-sm opacity-90">{photo.description}</p>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                  <span></span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Photos Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {galleryPhotos.slice(4, 7).map((photo) => (
              <div key={photo.id} className="group relative overflow-hidden rounded-2xl bg-gray-200 aspect-[3/2] cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{backgroundImage: `url('${photo.image_url || photo.imageUrl}')`}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-2">{photo.title}</h3>
                  <p className="text-sm opacity-90">{photo.description}</p>
                </div>
              </div>
            ))}
            {/* Mostrar fotos adicionales por defecto si no hay suficientes en CMS */}
            {galleryPhotos.length < 7 && (
              <>
                <div className="group relative overflow-hidden rounded-2xl bg-gray-200 aspect-[3/2] cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3')"}}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">Paisajes Únicos</h3>
                    <p className="text-sm opacity-90">Vistas panorámicas del Chocó</p>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl bg-gray-200 aspect-[3/2] cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3')"}}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">Cuatrimotos Potentes</h3>
                    <p className="text-sm opacity-90">Vehículos 4x4 de alto rendimiento</p>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl bg-gray-200 aspect-[3/2] cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3')"}}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">Senderos Extremos</h3>
                    <p className="text-sm opacity-90">Rutas desafiantes por terrenos únicos</p>
                  </div>
                </div>
              </>
            )}
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
        titulo={sections.bloque5_cta?.title || "¿Listo para Vivir la Aventura?"}
        descripcion={sections.bloque5_cta?.description || "Experimenta lo que solo el Chocó puede ofrecerte: naturaleza, adrenalina y cultura en un solo lugar"}
        botonPrimario={{
          texto: sections.bloque5_cta?.primary_button?.text || "RESERVAR EXPERIENCIA",
          href: sections.bloque5_cta?.primary_button?.link || "/reservas"
        }}
        botonSecundario={{
          texto: sections.bloque5_cta?.secondary_button?.text || "VER CUATRIMOTOS",
          href: sections.bloque5_cta?.secondary_button?.link || "/cuatrimotos"
        }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}