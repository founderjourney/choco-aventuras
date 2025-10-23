"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Play, ChevronDown, Facebook, Instagram, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { usePageContent } from '@/hooks/use-page-content';

export default function NosotrosPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // 🚀 CMS Integration - Simple y seguro
  const pageContent = usePageContent('nosotros');

  // 🎯 Secciones específicas de nosotros con fallbacks
  const sections = pageContent.nosotros_sections || {};

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
             style={{backgroundImage: `url('${sections.bloque1_hero?.hero_image || pageContent.heroImageUrl || 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80'}')`}} />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 text-white">
            {sections.bloque1_hero?.title || pageContent.titulo || 'AVENTURA EN CUATRIMOTOS Y PAINTBALL (PROXIMAMENTE) EN EL CHOCÓ'}
          </h1>
        </div>
      </section>

      {/* Nuestra Historia Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Video */}
            <div className="order-1 lg:order-1">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-lg">
                {!isVideoPlaying ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-gray-900/60 flex items-center justify-center">
                    <div
                      className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-700 transition-all duration-300 group shadow-lg"
                      onClick={() => setIsVideoPlaying(true)}
                    >
                      <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="absolute inset-0 bg-cover bg-center"
                         style={{backgroundImage: `url('${sections.bloque2_historia?.video_thumbnail || "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3"}')`}} />
                  </div>
                ) : (
                  <iframe
                    className="w-full h-full"
                    src={sections.bloque2_historia?.video_url || pageContent.videoUrl || "https://www.youtube.com/embed/uq49IDyz4e4?autoplay=1"}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                )}
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="order-2 lg:order-2">
              <p className="text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-4">
                {sections.bloque2_historia?.section_subtitle || pageContent.historySubtitle || 'NUESTRA HISTORIA'}
              </p>

              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">
                <span className="text-emerald-600">
                  {sections.bloque2_historia?.section_title?.split(' ')[0] || 'NUESTRA'}
                </span> {sections.bloque2_historia?.section_title?.split(' ').slice(1).join(' ') || 'HISTORIA'}
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                {sections.bloque2_historia?.content_paragraphs?.map((paragraph, index) => (
                  <p key={index} className="text-base">
                    {index === 0 ? (
                      <>
                        <strong className="text-gray-900">Chocó Aventuras</strong> {paragraph.replace('Chocó Aventuras', '')}
                      </>
                    ) : paragraph.includes('KM7 vía Yuto') ? (
                      <>
                        {paragraph.split('KM7 vía Yuto, Quibdó – Chocó')[0]}
                        <strong className="text-emerald-600">KM7 vía Yuto, Quibdó – Chocó</strong>
                        {paragraph.split('KM7 vía Yuto, Quibdó – Chocó')[1]}
                      </>
                    ) : (
                      paragraph
                    )}
                  </p>
                )) || (
                  // Fallback a párrafos originales
                  <>
                    <p className="text-base">
                      {pageContent.contenido || (
                        <>
                          <strong className="text-gray-900">Chocó Aventuras</strong> es una empresa pionera en el turismo de aventura en la región, creada para quienes buscan experiencias auténticas, llenas de adrenalina y diversión. Ofrecemos recorridos en cuatrimotos Yamaha diseñados para explorar la selva tropical del Chocó, sus paisajes naturales y su energía vibrante.
                        </>
                      )}
                    </p>
                    <p className="text-base">
                      Más que una guía, brindamos una experiencia inolvidable, ideal para quienes quieren vivir algo diferente en Quibdó, donde la emoción, la naturaleza y la libertad se encuentran en cada ruta.
                    </p>
                    <p className="text-base">
                      Nuestras instalaciones están ubicadas en el <strong className="text-emerald-600">KM7 vía Yuto, Quibdó – Chocó</strong>, un punto estratégico rodeado de naturaleza donde podrás disfrutar de esta nueva forma de turismo activo en la región.
                    </p>
                    <p className="text-base">
                      Somos un espacio pensado para quienes quieren desconectarse de la rutina y vivir una experiencia única sobre cuatro ruedas.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-8">
                <Link href="/reservas">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg">
                    {sections.bloque2_historia?.booking_button_text || pageContent.bookingButtonText || 'Reserva tu aventura'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Photo Slider Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-4">
              {sections.bloque3_galeria?.section_subtitle || 'NUESTRAS AVENTURAS'}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              <span className="text-emerald-600">
                {sections.bloque3_galeria?.section_title_part1 || 'NUESTRA PASIÓN'}
              </span> {sections.bloque3_galeria?.section_title_part2 || 'POR LA AVENTURA'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {sections.bloque3_galeria?.gallery_description || pageContent.galleryDescription || 'La selva tropical del Chocó nos inspira a forjar momentos llenos de energía y emoción. Próximamente contaremos también con una zona de paintball (proximamente), ideal para compartir con amigos, liberar adrenalina y vivir la acción al máximo.'}
            </p>
          </div>

          {/* Photo Grid Slider */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(pageContent.gallery || []).map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-2xl bg-gray-200 aspect-[4/5] cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{backgroundImage: `url('${item.imageUrl}')`}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.description}</p>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                  <span className="text-white font-bold"></span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Photos Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Photo 5 - Panorámica */}
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


          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">¿Listo para vivir tu próxima gran aventura?</p>
            <Link href="/reservas">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Reserva Tu Aventura
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contáctanos Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl md:text-3xl font-bold mb-8">
            <span className="text-emerald-400">{pageContent.contactTitle || 'CONTÁCTANOS'}</span> EN UN CLIC
          </h2>

          <div className="w-24 h-1 bg-emerald-400 mx-auto mb-8"></div>

          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            {pageContent.contactDescription || 'Reserva tu aventura por'} <span className="text-emerald-400">WhatsApp</span>
          </p>

          <a
            href={pageContent.whatsappLink || "https://wa.me/573117030436"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 text-base rounded-full shadow-xl flex items-center gap-2 mx-auto max-w-full sm:max-w-none sm:px-8 sm:py-4 sm:text-lg">
              <MessageCircle className="w-5 h-5" />
              <span className="font-bold text-lg">{pageContent.whatsappNumber || '+57 311 703 0436'}</span>
            </Button>
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-4">
              RESPUESTAS RÁPIDAS
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              PREGUNTAS FRECUENTES
            </h2>
          </div>

          <div className="space-y-4">
            {(pageContent.faqs || []).map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full text-left p-6 bg-white hover:bg-gray-50 transition-all duration-300 flex justify-between items-center"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-gray-900 font-medium text-lg">{faq.question}</span>
                  <ChevronDown className={`w-6 h-6 text-emerald-600 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="p-6 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 text-base leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}