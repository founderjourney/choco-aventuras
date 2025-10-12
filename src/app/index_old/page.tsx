"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Phone, Facebook, Instagram, Star, ArrowRight, Play, Menu, X } from 'lucide-react';
import Link from 'next/link';

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

async function fetchPaseos(): Promise<{paseos: Paseo[]}> {
  const response = await fetch('/api/paseos');
  if (!response.ok) throw new Error('Error fetching paseos');
  return response.json();
}

export default function Homepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: paseosData, isLoading: loadingPaseos } = useQuery({
    queryKey: ['paseos'],
    queryFn: fetchPaseos,
  });

  const paseos = paseosData?.paseos || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Responsive Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 sm:gap-3 logo-container">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center logo-icon">
                <span className="text-white font-bold text-sm">CA</span>
              </div>
              <div className="font-bold text-lg sm:text-xl bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text text-transparent">
                Chocó Aventuras
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6">
              <Link href="/" className="nav-item text-slate-700 hover:text-emerald-600 font-medium transition-colors relative group">
                Inicio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/nosotros" className="nav-item text-slate-700 hover:text-emerald-600 font-medium transition-colors relative group">
                Nosotros
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/tours" className="nav-item text-slate-700 hover:text-emerald-600 font-medium transition-colors relative group">
                Tours
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/cuatrimotos" className="nav-item text-slate-700 hover:text-emerald-600 font-medium transition-colors relative group">
                Cuatrimotos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full"></span>
              </Link>
              <span className="nav-item text-slate-500 font-medium cursor-not-allowed relative group opacity-60">
                Paintball
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full ml-2 particle-hover">Próximamente</span>
              </span>
              <Link href="/experiencias" className="nav-item text-slate-700 hover:text-emerald-600 font-medium transition-colors relative group">
                Experiencias
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/reservas" className="nav-item text-slate-700 hover:text-emerald-600 font-medium transition-colors relative group">
                Reservas
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/contacto" className="nav-item text-slate-700 hover:text-emerald-600 font-medium transition-colors relative group">
                Contacto
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-700 hover:text-emerald-600 hover:bg-slate-100 transition-colors burger-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden">
              <div className="pb-3 pt-2 space-y-1 bg-white/95 backdrop-blur-md border-t border-slate-100">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-menu-item block px-3 py-2 text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50 transition-colors rounded-md"
                >
                  Inicio
                </Link>
                <Link
                  href="/nosotros"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-menu-item block px-3 py-2 text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50 transition-colors rounded-md"
                >
                  Nosotros
                </Link>
                <Link
                  href="/tours"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-menu-item block px-3 py-2 text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50 transition-colors rounded-md"
                >
                  Tours
                </Link>
                <Link
                  href="/cuatrimotos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-menu-item block px-3 py-2 text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50 transition-colors rounded-md"
                >
                  Cuatrimotos
                </Link>
                <div className="mobile-menu-item block px-3 py-2 text-base font-medium text-slate-500 opacity-60 cursor-not-allowed">
                  Paintball
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full ml-2 particle-hover">Próximamente</span>
                </div>
                <Link
                  href="/experiencias"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-menu-item block px-3 py-2 text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50 transition-colors rounded-md"
                >
                  Experiencias
                </Link>
                <Link
                  href="/reservas"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-menu-item block px-3 py-2 text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50 transition-colors rounded-md"
                >
                  Reservas
                </Link>
                <Link
                  href="/contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-menu-item block px-3 py-2 text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50 transition-colors rounded-md"
                >
                  Contacto
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Responsive Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-800 flex items-center justify-center overflow-hidden mountain-parallax jungle-particles">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/choco-aventuras-hero.jpg')"
          }}
        />

        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-emerald-800/60 to-teal-800/70" />

        {/* Optimized animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-40 sm:w-80 h-40 sm:h-80 bg-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-24 sm:w-48 h-24 sm:h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />

        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 glass-effect particle-hover">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current neon-glow" />
              <span className="text-xs sm:text-sm font-medium">Experiencia Premium en el Chocó</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent leading-tight wind-effect">
            CHOCÓ
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl">AVENTURAS</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 text-emerald-100 max-w-3xl mx-auto leading-relaxed px-4">
            La primera experiencia de turismo extremo en Quibdó
          </p>

          <p className="text-base sm:text-lg mb-8 sm:mb-12 text-white/90 max-w-2xl mx-auto px-4">
            Cuatrimotos, paintball y cultura local en plena selva tropical.
          </p>

          <p className="text-lg sm:text-xl mb-8 sm:mb-12 text-emerald-200 font-bold max-w-2xl mx-auto px-4">
            ¡Aquí la aventura no se cuenta... se vive! 🏍️ 🎯
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Link href="/cuadriciclos">
              <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold rounded-xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 flex items-center justify-center gap-2 adrenaline-button magnetic-button wave-button">
                RESERVA AHORA
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 glass-effect play-button-effect"
            >
              <Play className="h-4 w-4 sm:h-5 sm:w-5" />
              Ver Video
            </Button>
          </div>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-center px-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 stat-pulse">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-300 mb-2 stat-number neon-glow">100%</div>
              <div className="text-xs sm:text-sm text-white/80">Experiencia Natural</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 stat-pulse">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-300 mb-2 stat-number neon-glow">24/7</div>
              <div className="text-xs sm:text-sm text-white/80">Disponibilidad</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 stat-pulse">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-300 mb-2 stat-number neon-glow">5★</div>
              <div className="text-xs sm:text-sm text-white/80">Calificación</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator - hidden on mobile */}
        <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Responsive Info Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm card-3d">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-4 sm:mb-6 inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl group-hover:scale-110 transition-transform">
                  <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-slate-800">Ubicación</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">Quibdó, Chocó<br />KM7 VIA YUTO</p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm card-3d">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-4 sm:mb-6 inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl group-hover:scale-110 transition-transform">
                  <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-slate-800">Horarios</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Todos los días<br />7:00 AM - 5:00 PM
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm card-3d">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-4 sm:mb-6 inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl group-hover:scale-110 transition-transform">
                  <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-slate-800">Contacto</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  chocoaventurascuatri@gmail.com<br />KM7 VIA YUTO
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-blue-50/50"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text text-transparent">
              Nuestras Experiencias
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Aventuras únicas que combinan adrenalina, naturaleza y cultura chocoana
            </p>
          </div>

          {/* Responsive Dynamic Paseos Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {loadingPaseos ? (
              <div className="col-span-full text-center py-8 sm:py-12">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-emerald-600 mx-auto"></div>
                <p className="text-slate-600 mt-4 text-sm sm:text-base">Cargando experiencias...</p>
              </div>
            ) : (
              paseos.map((paseo, index) => {
                const getDifficultyColor = (dificultad: string) => {
                  switch (dificultad) {
                    case 'facil': return 'from-emerald-500 to-emerald-700';
                    case 'intermedio': return 'from-amber-500 to-orange-600';
                    case 'dificil': return 'from-red-500 to-red-700';
                    default: return 'from-blue-500 to-blue-700';
                  }
                };

                const getDifficultyIcon = (dificultad: string) => {
                  switch (dificultad) {
                    case 'facil': return '🌱';
                    case 'intermedio': return '⚡';
                    case 'dificil': return '🔥';
                    default: return '🏍️';
                  }
                };

                const getDifficultyText = (dificultad: string) => {
                  switch (dificultad) {
                    case 'facil': return 'Principiante';
                    case 'intermedio': return 'Intermedio';
                    case 'dificil': return 'Experto';
                    default: return 'Cualquier nivel';
                  }
                };

                return (
                  <div key={paseo.id} className="group p-4 sm:p-6 lg:p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 card-3d particle-hover">
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                      <div className={`bg-gradient-to-br ${getDifficultyColor(paseo.dificultad)} rounded-2xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0 mx-auto sm:mx-0`}>
                        <span className="text-2xl sm:text-3xl">{getDifficultyIcon(paseo.dificultad)}</span>
                      </div>

                      <div className="flex-1 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                          <h3 className="font-bold text-xl sm:text-2xl text-slate-800">{paseo.nombre}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                            paseo.dificultad === 'facil' ? 'bg-emerald-100 text-emerald-700' :
                            paseo.dificultad === 'intermedio' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {getDifficultyText(paseo.dificultad)}
                          </span>
                        </div>

                        <p className="text-slate-600 leading-relaxed mb-4 text-sm sm:text-base">{paseo.descripcion}</p>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500 mb-4">
                          <div className="flex items-center justify-center sm:justify-start gap-1">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>{paseo.duracion_horas}h duración</span>
                          </div>
                          <div className="flex items-center justify-center sm:justify-start gap-1">
                            <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>{paseo.ubicacion}</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0 sm:justify-between">
                          <div className="text-xl sm:text-2xl font-bold text-emerald-600">
                            ${paseo.precio.toLocaleString()}
                          </div>
                          <Link href="/reservas">
                            <Button className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base">
                              Reservar
                              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Static Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">Guías Locales</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Expertos nativos del territorio</p>
            </div>

            <div className="group text-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">Seguridad Total</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Equipos de protección profesional</p>
            </div>

            <div className="group text-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">Cultura Chocoana</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Tradiciones auténticas locales</p>
            </div>

            <div className="group text-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
              <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">Grupos y Empresas</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Team building empresarial</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">CA</span>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  Chocó Aventuras
                </h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                Somos la primera experiencia de turismo extremo en Quibdó que combina cuatrimotos, paintball y cultura local en plena selva tropical.
              </p>
              <div className="flex items-center gap-2 text-emerald-400">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-semibold">Experiencia Premium Garantizada</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-emerald-400">Contacto</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-emerald-400" />
                  <span className="text-slate-300">KM7 VIA YUTO</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400">✉</span>
                  <span className="text-slate-300">chocoaventurascuatri@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-emerald-400" />
                  <span className="text-slate-300">Quibdó, Chocó</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-emerald-400">Síguenos</h4>
              <div className="flex space-x-4 mb-6">
                <a
                  href="#"
                  className="w-12 h-12 bg-slate-700 hover:bg-emerald-600 rounded-xl flex items-center justify-center transition-all duration-300 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-6 w-6 text-slate-300 group-hover:text-white" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-slate-700 hover:bg-emerald-600 rounded-xl flex items-center justify-center transition-all duration-300 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-6 w-6 text-slate-300 group-hover:text-white" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-slate-700 hover:bg-emerald-600 rounded-xl flex items-center justify-center transition-all duration-300 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-slate-300 group-hover:text-white font-bold text-lg">📱</span>
                </a>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Mantente conectado para conocer nuestras últimas aventuras y ofertas especiales.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-700/50 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-sm">
                &copy; 2024 Chocó Aventuras. Todos los derechos reservados.
              </p>
              <div className="flex gap-6 text-sm text-slate-400">
                <a href="#" className="hover:text-emerald-400 transition-colors">Términos</a>
                <a href="#" className="hover:text-emerald-400 transition-colors">Privacidad</a>
                <a href="#" className="hover:text-emerald-400 transition-colors">Política</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
