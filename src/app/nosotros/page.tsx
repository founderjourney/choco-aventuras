"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Clock, Shield, Users, Heart, Star } from 'lucide-react';
import Footer from '@/components/Footer';
import CallToAction from '@/components/CallToAction';

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-bold text-xl text-[#145A32] logo-container">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center logo-icon">
                  <span className="text-white font-bold text-sm">CA</span>
                </div>
                Chocó Aventuras
              </div>
            </Link>
            <nav className="flex space-x-6">
              <Link href="/" className="nav-item text-gray-700 hover:text-[#145A32]">
                Inicio
              </Link>
              <Link href="/nosotros" className="nav-item text-[#145A32] font-semibold">
                Nosotros
              </Link>
              <Link href="/tours" className="nav-item text-gray-700 hover:text-[#145A32]">
                Tours
              </Link>
              <Link href="/cuadriciclos" className="nav-item text-gray-700 hover:text-[#145A32]">
                Cuadriciclos
              </Link>
              <Link href="/experiencias" className="nav-item text-gray-700 hover:text-[#145A32]">
                Experiencias
              </Link>
              <Link href="/contacto" className="nav-item text-gray-700 hover:text-[#145A32]">
                Contacto
              </Link>
              <Link href="/admin/login" className="nav-item text-gray-700 hover:text-[#145A32]">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#145A32] to-[#1565C0] py-20 jungle-particles adventure-glow">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-6 jungle-text wind-effect">
            Sobre Chocó Aventuras
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Somos la primera experiencia de turismo extremo en Quibdó que combina adrenalina, naturaleza y cultura chocoana
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 glass-effect">
            <Star className="h-5 w-5 text-[#F1C40F] fill-current neon-glow" />
            <span className="font-medium">Aquí la aventura no se cuenta... ¡se vive!</span>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#145A32] mb-6 jungle-text">
                Nuestra Historia
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                <strong>Chocó Aventuras</strong> nace del amor por la selva tropical del Chocó y la pasión por las experiencias extremas. Somos pioneros en ofrecer turismo de aventura en Quibdó, combinando la emoción de los cuatrimotos con la autenticidad de la cultura chocoana.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Nos especializamos en crear experiencias únicas que conectan a nuestros visitantes con la naturaleza exuberante del Chocó, mientras viven la adrenalina de recorrer trochas y senderos únicos en el mundo.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F1C40F] rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#145A32]">Pasión por la Aventura</h3>
                  <p className="text-gray-600">Desde 2020 creando memorias inolvidables</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#145A32] to-[#1565C0] rounded-3xl p-8 text-white card-3d">
              <h3 className="text-2xl font-bold mb-6">Nuestra Misión</h3>
              <p className="text-lg mb-6 leading-relaxed">
                Ofrecer experiencias de turismo extremo auténticas que combinen cuatrimotos, paintball y cultura local en plena selva tropical, garantizando seguridad, diversión y un contacto directo con la naturaleza del Chocó.
              </p>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                <h4 className="font-bold mb-2">Nuestra Visión</h4>
                <p className="text-sm">Ser el referente de turismo de aventura en el Chocó, promoviendo la riqueza natural y cultural de nuestra región.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#145A32] mb-12 jungle-text">
            Nuestros Valores
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-all duration-300 card-3d">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#145A32] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#145A32] mb-4">Seguridad Garantizada</h3>
                <p className="text-gray-700">
                  Equipos de protección profesionales y acompañamiento de guías expertos que conocen el territorio chocoano.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 card-3d">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#1565C0] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#145A32] mb-4">Guías Locales</h3>
                <p className="text-gray-700">
                  Personas expertas de la región que conocen cada sendero, cada trocha y cada secreto de la selva chocoana.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 card-3d">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#F1C40F] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#145A32] mb-4">Cultura Auténtica</h3>
                <p className="text-gray-700">
                  Incluimos la identidad chocoana, música tradicional y las famosas fiestas de San Pacho en nuestras experiencias.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Información de Empresa */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#145A32] mb-8 jungle-text">
                Información de la Empresa
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#145A32] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#145A32] mb-2">Ubicación</h3>
                    <p className="text-gray-700">KM7 VIA YUTO, Quibdó - Chocó</p>
                    <p className="text-sm text-gray-600">En plena selva tropical del Pacífico colombiano</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1565C0] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#145A32] mb-2">Horarios de Atención</h3>
                    <p className="text-gray-700">Todos los días: 7:00 AM - 5:00 PM</p>
                    <p className="text-sm text-gray-600">Disponibles para aventuras durante todo el año</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F1C40F] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#145A32] mb-2">Servicios Especializados</h3>
                    <p className="text-gray-700">Actividades para grupos y empresas</p>
                    <p className="text-sm text-gray-600">Ideal para integración y team building</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#145A32] to-[#1565C0] rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">¿Por qué elegirnos?</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[#F1C40F]">🌿</span>
                  <span>Experiencias 100% en la selva del Chocó</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#F1C40F]">🏍️</span>
                  <span>Tours por rutas extremas únicas</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#F1C40F]">🎯</span>
                  <span>Paintball en escenarios naturales</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#F1C40F]">🎭</span>
                  <span>Enfoque cultural chocoano auténtico</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#F1C40F]">👥</span>
                  <span>Guías locales expertos</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#F1C40F]">🛡️</span>
                  <span>Seguridad garantizada</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white/10 backdrop-blur-md rounded-lg">
                <p className="text-lg font-bold italic text-center">
                  "Aquí la aventura no se cuenta... ¡se vive!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction
        titulo="¿Listo para la Aventura?"
        descripcion="Únete a nosotros y vive experiencias únicas en el corazón de la selva chocoana"
        botonPrimario={{ texto: "VER CUADRICICLOS", href: "/cuadriciclos" }}
        botonSecundario={{ texto: "CONTÁCTANOS", href: "/contacto" }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}