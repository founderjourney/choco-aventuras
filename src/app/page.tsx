"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Menu, X, ShoppingCart, Search, User, Star, ArrowDown,
  Instagram, Facebook, Youtube, Phone, MapPin, Mail,
  ChevronDown, ArrowRight, Play, Heart, ArrowUp
} from 'lucide-react';
import Link from 'next/link';

export default function Homepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sideCartOpen, setSideCartOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [animatedTextIndex, setAnimatedTextIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  const animatedTexts = ["LA AVENTURA", "TU ADRENALINA", "EL CHOCÓ"];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedTextIndex((prev) => (prev + 1) % animatedTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Sticky */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isSticky ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CA</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-2xl font-bold text-emerald-600">Chocó</div>
                  <div className="text-sm text-gray-600">AVENTURAS</div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                INICIO
              </Link>
              <Link href="/nosotros" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                NOSOTROS
              </Link>
              <Link href="/tours" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                TOURS
              </Link>
              <Link href="/cuadriciclos" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                CUATRIMOTOS
              </Link>
              <Link href="/experiencias" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                EXPERIENCIAS
              </Link>
              <Link href="/reservas" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                RESERVAS
              </Link>
              <Link href="/contacto" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                CONTACTO
              </Link>
            </nav>

            {/* Header Icons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2 text-gray-700 hover:text-emerald-600 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={() => setAccountModalOpen(true)}
                className="p-2 text-gray-700 hover:text-emerald-600 transition-colors"
              >
                <User className="h-5 w-5" />
              </button>
              <button
                onClick={() => setSideCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-emerald-600 transition-colors"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t">
            <div className="px-4 py-2 space-y-1">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">INICIO</Link>
              <Link href="/nosotros" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">NOSOTROS</Link>
              <Link href="/tours" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">TOURS</Link>
              <Link href="/cuadriciclos" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">CUATRIMOTOS</Link>
              <Link href="/experiencias" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">EXPERIENCIAS</Link>
              <Link href="/reservas" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">RESERVAS</Link>
              <Link href="/contacto" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">CONTACTO</Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section con Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            className="absolute inset-0 w-full h-full object-cover"
            src="https://www.youtube.com/embed/1vISNKDpBno?autoplay=1&mute=1&loop=1&controls=0&playlist=1vISNKDpBno"
            allow="autoplay; fullscreen"
            style={{ pointerEvents: 'none' }}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <p className="text-sm text-white/80 mb-4">- Bienvenido -</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-emerald-400">CHOCÓ</span>
              <br />
              <span className="text-white">AVENTURAS</span>
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Dispara, acelera y conquista la aventura
            </p>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg rounded-none uppercase font-semibold"
              onClick={() => document.getElementById('cuatrimotos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Reservar
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Shape Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z" fill="white"></path>
          </svg>
        </div>
      </section>

      {/* Segunda Sección - EXPLORA */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            className="absolute inset-0 w-full h-full object-cover"
            src="https://www.youtube.com/embed/uq49IDyz4e4?autoplay=1&mute=1&loop=1&controls=0&playlist=uq49IDyz4e4"
            allow="autoplay; fullscreen"
            style={{ pointerEvents: 'none' }}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            EXPLORA ELIGE Y VIVE LA ACCIÓN
          </h2>
          <p className="text-lg text-white/90 mb-12">
            Cuatrimotos y paintball en el corazón del Chocó: pensados para aventureros como tú.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-4 backdrop-blur-sm">
              CUATRIMOTOS
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-4 backdrop-blur-sm">
              PAINTBALL
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-4 backdrop-blur-sm">
              EXPERIENCIAS
            </Button>
          </div>
        </div>
      </section>

      {/* Flip Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 - Paseo Selva */}
            <div className="group relative h-80 perspective-1000">
              <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                {/* Frente */}
                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center relative"
                    style={{ backgroundImage: 'url("/choco-aventuras-hero.jpg")' }}
                  >
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                      <p className="text-sm mb-2">Aventura en la selva tropical</p>
                      <h3 className="text-3xl font-bold">RUTAS EN CUATRIMOTO</h3>
                    </div>
                  </div>
                </div>

                {/* Reverso */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-emerald-600 flex items-center justify-center">
                  <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                    Reservar
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 2 - Aventura Extrema */}
            <div className="group relative h-80 perspective-1000">
              <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                {/* Frente */}
                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center relative"
                    style={{ backgroundImage: 'url("/choco-aventuras-hero.jpg")' }}
                  >
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                      <p className="text-sm mb-2">Combate con adrenalina pura</p>
                      <h3 className="text-3xl font-bold">BATALLAS DE PAINTBALL</h3>
                    </div>
                  </div>
                </div>

                {/* Reverso */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-orange-600 flex items-center justify-center">
                  <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                    Próximamente
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Cuatrimotos */}
      <section id="cuatrimotos" className="relative py-20 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <div className="w-full h-full bg-gradient-to-r from-emerald-900 to-gray-900" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center text-white mb-16">
            <p className="text-lg mb-4">Vive la aventura, siente la adrenalina.</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-emerald-400">CHOCÓ</span>
              <br />
              <span className="text-white">CUATRIMOTOS</span>
            </h2>
          </div>

          {/* Grid de Cuatrimotos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Cuatrimoto Principal - YAMAHA GRIZZLY 700 */}
            <div className="group relative h-80 rounded-lg overflow-hidden cursor-pointer">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: 'url("/choco-aventuras-hero.jpg")' }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <div className="mb-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    🔥 YAMAHA GRIZZLY
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">YAMAHA GRIZZLY 700</h3>
                <p className="text-sm text-white/90 mb-4">Modelo 2009 - Edición Roja. Potencia máxima para aventura extrema</p>
                <div className="text-xl font-bold text-red-400">Consultar precios</div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button className="bg-red-600 text-white hover:bg-red-700 px-8 py-3">
                  RESERVAR
                </Button>
              </div>
            </div>

            {/* Cuatrimoto 2 - Disponible según inventario */}
            <div className="group relative h-80 rounded-lg overflow-hidden cursor-pointer opacity-60">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: 'url("/choco-aventuras-hero.jpg")' }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-white text-center">
                <div className="mb-4">
                  <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    🔧 PRÓXIMAMENTE
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">SEGUNDO CUATRIMOTO</h3>
                <p className="text-sm text-white/90">Ampliando nuestra flota para más aventuras</p>
              </div>
            </div>

            {/* Cuatrimoto 3 - Futuro */}
            <div className="group relative h-80 rounded-lg overflow-hidden cursor-pointer opacity-60">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: 'url("/choco-aventuras-hero.jpg")' }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-white text-center">
                <div className="mb-4">
                  <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    🚀 EN DESARROLLO
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">TERCER CUATRIMOTO</h3>
                <p className="text-sm text-white/90">Más opciones para tu aventura perfecta</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Accordion */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row h-96 rounded-2xl overflow-hidden shadow-2xl">
            {/* Panel 1 - Instagram Community */}
            <div className="group flex-1 relative overflow-hidden cursor-pointer transition-all duration-500 hover:flex-[2]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: 'url("/choco-aventuras-hero.jpg")' }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/60 to-purple-600/60" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Sé parte de nuestra comunidad aventurera</h3>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white w-fit">
                  Instagram
                </Button>
              </div>
            </div>

            {/* Panel 2 - YouTube Adventures (Activo por defecto) */}
            <div className="group flex-[2] relative overflow-hidden cursor-pointer transition-all duration-500 hover:flex-[3]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: 'url("/choco-aventuras-hero.jpg")' }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/60 to-red-700/60" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Quieres ver nuestras aventuras extremas</h3>
                <Button className="bg-red-600 hover:bg-red-700 text-white w-fit">
                  <Youtube className="h-5 w-5 mr-2" />
                  YouTube
                </Button>
              </div>
            </div>

            {/* Panel 3 - Facebook Discovery */}
            <div className="group flex-1 relative overflow-hidden cursor-pointer transition-all duration-500 hover:flex-[2]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: 'url("/choco-aventuras-hero.jpg")' }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/60 to-blue-700/60" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Hay mucho por explorar en el Chocó</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-fit">
                  <Facebook className="h-5 w-5 mr-2" />
                  Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario Multi-Step */}
      <section className="relative py-20 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <div className="w-full h-full bg-gradient-to-r from-gray-900 to-black" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <p className="text-sm mb-4">-aventura extrema-</p>
          <h2 className="text-2xl md:text-4xl font-bold mb-8">
            Dudas sobre nuestros paseos
          </h2>
          <p className="text-xl mb-12">
            Queremos que vivas la aventura con total seguridad.
          </p>

          {/* Formulario */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm">Step {currentStep} of 3</span>
                <div className="flex gap-2">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-3 h-3 rounded-full ${
                        step <= currentStep ? 'bg-emerald-400' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-emerald-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-left mb-2 text-sm">Como deseas que te contactemos</label>
                  <select className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70">
                    <option value="">Selecciona una opción</option>
                    <option value="email">Correo Electrónico</option>
                    <option value="phone">Teléfono</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>
                <div>
                  <label className="block text-left mb-2 text-sm">Qué tipo de aventura te interesa</label>
                  <select className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70">
                    <option value="">Selecciona una opción</option>
                    <option value="paseo-selva">Paseo en la Selva</option>
                    <option value="aventura-extrema">Aventura Extrema</option>
                    <option value="alquiler-cuatrimotos">Alquiler de Cuatrimotos</option>
                    <option value="reservar-paseo">Reservar Paseo Completo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-left mb-2 text-sm">Cual es tu nombre</label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70"
                  />
                </div>
                <Button
                  onClick={() => setCurrentStep(2)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
                >
                  Siguiente
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-left mb-2 text-sm">Cual es tu Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70"
                    required
                  />
                </div>
                <div>
                  <label className="block text-left mb-2 text-sm">Cual es tu número de Teléfono</label>
                  <input
                    type="tel"
                    placeholder="+57 300 000 0000"
                    className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70"
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={() => setCurrentStep(1)}
                    variant="outline"
                    className="flex-1 border-white/30 text-white hover:bg-white/10"
                  >
                    Anterior
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-left mb-2 text-sm">
                    Queremos que nos compartas información acerca del paseo o cuatrimoto que te interesa
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Cuéntanos sobre tu experiencia deseada, nivel de adrenalina, duración del paseo..."
                    className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 resize-none"
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    variant="outline"
                    className="flex-1 border-white/30 text-white hover:bg-white/10"
                  >
                    Anterior
                  </Button>
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Enviar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sección WhatsApp */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-8">
            Contáctanos
            <br />
            en un clic
          </h2>
          <p className="text-xl mb-12">
            Reserva tu aventura por WhatsApp
          </p>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button className="bg-white text-green-600 hover:bg-gray-100 px-12 py-6 text-2xl font-bold rounded-full shadow-2xl hover:scale-105 transition-all duration-300">
              🏍️ RESERVAR AVENTURA
            </Button>
          </a>
        </div>
      </section>

      {/* Texto Animado */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold">
            DESCUBRE{' '}
            <span className="text-emerald-400 transition-all duration-1000">
              {animatedTexts[animatedTextIndex]}
            </span>
            <br />
            VIVE HOY TU AVENTURA
          </h2>
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

      {/* Side Cart */}
      {sideCartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSideCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold">Carrito</h3>
              <button onClick={() => setSideCartOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-500 text-center">Tu carrito está vacío</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-gray-50">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mb-3">
                Ver carrito
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Finalizar compra
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSearchModalOpen(false)} />
          <div className="relative bg-white rounded-2xl p-8 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Buscar aventuras</h3>
              <button onClick={() => setSearchModalOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="¿Qué aventura buscas?"
                className="flex-1 p-3 border border-gray-300 rounded-lg"
              />
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Account Modal */}
      {accountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setAccountModalOpen(false)} />
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Mi Cuenta</h3>
              <button onClick={() => setAccountModalOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                Iniciar Sesión
              </Button>
              <p className="text-center text-sm text-gray-600">
                ¿No tienes cuenta? <a href="#" className="text-emerald-600 hover:underline">Regístrate</a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chaty Widget */}
      <div className="fixed left-6 bottom-6 z-40">
        <div className="flex flex-col gap-3">
          <a
            href="tel:+57300000000"
            className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            style={{ backgroundColor: '#03E78B' }}
          >
            <Phone className="h-6 w-6 text-white" />
          </a>
          <a
            href="#"
            className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            style={{ backgroundColor: '#49E670' }}
          >
            <span className="text-white text-xl">📱</span>
          </a>
          <a
            href="mailto:chocoaventurascuatri@gmail.com"
            className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            style={{ backgroundColor: '#FF485F' }}
          >
            <Mail className="h-6 w-6 text-white" />
          </a>
          <a
            href="#"
            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <Instagram className="h-6 w-6 text-white" />
          </a>
          <a
            href="sms:+57300000000"
            className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            style={{ backgroundColor: '#FF549C' }}
          >
            <span className="text-white text-xl">💬</span>
          </a>
          <button
            className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            style={{ backgroundColor: '#253974' }}
          >
            <Mail className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed right-6 bottom-6 w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-lg hover:scale-110 transition-all"
      >
        <ArrowUp className="h-6 w-6 mx-auto" />
      </button>
    </div>
  );
}