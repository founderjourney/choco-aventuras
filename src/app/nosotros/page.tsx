"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Play, ChevronDown, Facebook, Instagram, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function NosotrosPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
             style={{backgroundImage: "url('https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')"}} />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 text-white">
            <span className="text-emerald-400">SOBRE</span>{" "}
            <span className="text-white">NOSOTROS</span>
          </h1>

          <div className="w-24 h-1 bg-emerald-400 mx-auto mb-8"></div>

          <p className="text-lg text-gray-200 mb-4">
            OFRECEMOS ALQUILER DE CUATRIMOTOS EN LA
          </p>
          <p className="text-base text-emerald-400 font-semibold">
            SELVA DEL CHOCÓ
          </p>
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
                         style={{backgroundImage: "url('https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3')"}} />
                  </div>
                ) : (
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/uq49IDyz4e4?autoplay=1"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                )}
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="order-2 lg:order-2">
              <p className="text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-4">
                NUESTRA HISTORIA
              </p>

              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">
                <span className="text-emerald-600">ALQUILER</span> DE CUATRIMOTOS<br />
                <span className="text-xl font-normal text-gray-600">Y AVENTURAS</span>
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-base">
                  <strong className="text-gray-900">Chocó Aventuras</strong> se especializa en el alquiler
                  de cuatrimotos para turismo de aventura. Ofrecemos experiencias únicas que combinan
                  emoción y conexión con la naturaleza en la selva tropical del Chocó.
                </p>

                <p>
                  Ubicados en el <strong className="text-emerald-600">
                  KM7 Vía Yuto, Quibdó - Chocó</strong>, ofrecemos alquiler de cuatrimotos
                  con guías especializados para aventuras seguras que te permiten explorar
                  la biodiversidad y cultura de nuestra región.
                </p>

                <p>
                  <strong className="text-gray-900">Servicios que Ofrecemos:</strong> Alquiler de cuatrimotos
                  para recorridos por la selva tropical, con equipos de seguridad incluidos.
                  Próximamente también tendremos disponible paintball para complementar tu experiencia de aventura.
                </p>
              </div>

              <div className="mt-8">
                <Link href="/contacto">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg">
                    Contactanos
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
              NUESTRAS AVENTURAS
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              <span className="text-emerald-600">MOMENTOS</span> ÉPICOS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre la magia del Chocó a través de nuestras experiencias capturadas
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
                <span className="text-white font-bold"></span>
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
                <span className="text-white font-bold"></span>
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
                <span className="text-white font-bold"></span>
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
                <span className="text-white font-bold"></span>
              </div>
            </div>
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

            {/* Photo 6 - Equipos */}
            <div className="group relative overflow-hidden rounded-2xl bg-gray-200 aspect-[3/2] cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3')"}}
              />
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
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3')"}}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Cultura Chocoana</h3>
                <p className="text-sm opacity-90">Tradiciones y gastronomía local</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">¿Listo para crear tus propios momentos épicos?</p>
            <Link href="/contacto">
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
          <h2 className="text-2xl md:text-4xl font-bold mb-8">
            <span className="text-emerald-400">CONTÁCTANOS</span> EN UN CLIC
          </h2>

          <div className="w-24 h-1 bg-emerald-400 mx-auto mb-8"></div>

          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            Reserva tu aventura por <span className="text-emerald-400">WhatsApp</span>
          </p>

          <a
            href="https://wa.me/573117030436"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 md:px-12 py-4 md:py-6 text-base md:text-lg rounded-full shadow-xl flex items-center gap-2 md:gap-4 mx-auto">
              <MessageCircle className="w-5 h-5 md:w-7 md:h-7" />
              <span className="font-bold text-lg md:text-xl">+57 311 703 0436</span>
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
            {[
              {
                question: "¿Qué incluye el tour en cuatrimoto?",
                answer: "Incluye equipo de seguridad, guía especializado, recorrido por la selva tropical y refrigerio."
              },
              {
                question: "¿Cuánto dura una aventura típica?",
                answer: "Nuestros tours varían entre 2 a 6 horas dependiendo del paquete seleccionado."
              },
              {
                question: "¿Es necesario tener experiencia previa?",
                answer: "No, ofrecemos tours para principiantes y avanzados. Nuestros guías te enseñarán todo lo necesario."
              },
              {
                question: "¿Cuál es la edad mínima para participar?",
                answer: "La edad mínima es 16 años para cuatrimotos y 12 años para paintball con supervisión de adultos."
              }
            ].map((faq, index) => (
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
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo y descripción */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">CA</span>
                </div>
                <div className="ml-3">
                  <div className="text-emerald-400 font-bold text-lg">CHOCÓ AVENTURAS</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ofrecemos alquiler de cuatrimotos para turismo de aventura en la selva tropical del Chocó.
                Próximamente también paintball y experiencias culturales locales.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">LINKS</h3>
              <div className="space-y-2">
                {['Inicio', 'Tours', 'Cuatrimotos', 'Experiencias', 'Contáctanos'].map((link) => (
                  <Link key={link} href="#" className="block text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                    {link}
                  </Link>
                ))}
              </div>
            </div>

            {/* Acerca de */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">ACERCA DE</h3>
              <div className="space-y-2">
                {['KM7 Vía Yuto', 'Quibdó - Chocó', 'chocoaventurascuatri@gmail.com'].map((item) => (
                  <div key={item} className="text-gray-400 text-sm">{item}</div>
                ))}
                <div className="text-emerald-400 text-sm">+57 311 703 0436</div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">SOCIAL MEDIA</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-all duration-300">
                  <Facebook className="w-5 h-5 text-gray-400 hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-all duration-300">
                  <MessageCircle className="w-5 h-5 text-gray-400 hover:text-green-400" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-all duration-300">
                  <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-400" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2024 Chocó Aventuras. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}