"use client";

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Star, ArrowDown,
  Instagram, Facebook, Youtube, Phone, MapPin, Mail,
  ChevronDown, ArrowRight, Play, Heart, ArrowUp
} from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { usePageContent } from '@/hooks/use-page-content';
import { migrateHomepageToCMS } from '@/scripts/migrate-homepage';

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

async function fetchCuatrimotos(): Promise<{cuatrimotos: Cuatrimoto[]}> {
  const response = await fetch('/api/cuadriciclos');
  if (!response.ok) {
    throw new Error('Error fetching cuatrimotos');
  }
  return response.json();
}

export default function Homepage() {
  const [sideCartOpen, setSideCartOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['cuatrimotos'],
    queryFn: fetchCuatrimotos,
  });

  // 🚀 Hook simple para CMS - con fallback seguro
  const pageContent = usePageContent('homepage');

  // 🎯 Secciones específicas de homepage con fallbacks
  const sections = pageContent.sections || {};

  // 🔧 Migración automática: crea homepage en CMS si no existe
  useEffect(() => {
    if (!pageContent.isLoading && !pageContent.titulo) {
      console.log('🔄 Migrando homepage al CMS...');
      migrateHomepageToCMS();
      // Recargar para ver los cambios
      window.location.reload();
    }
  }, [pageContent.isLoading, pageContent.titulo]);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [animatedTextIndex, setAnimatedTextIndex] = useState(0);

  const animatedTexts = ["LA AVENTURA", "TU ADRENALINA", "EL CHOCÓ"];

  useEffect(() => {
    const texts = sections.bloque8_animated_text?.animated_words || animatedTexts;
    const speed = sections.bloque8_animated_text?.animation_speed || 2000;

    const interval = setInterval(() => {
      setAnimatedTextIndex((prev) => (prev + 1) % texts.length);
    }, speed);
    return () => clearInterval(interval);
  }, [sections.bloque8_animated_text, animatedTexts]);


  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section con Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            className="absolute inset-0 w-full h-full object-cover"
            src={sections.bloque1_hero?.video_url || "https://www.youtube.com/embed/1vISNKDpBno?autoplay=1&mute=1&loop=1&controls=0&playlist=1vISNKDpBno"}
            allow="autoplay; fullscreen"
            style={{ pointerEvents: 'none' }}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-sm text-white/80 mb-4">
              {sections.bloque1_hero?.welcome_text || "- Bienvenido -"}
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              {/* 🚀 CMS Integration - Usar secciones específicas */}
              {sections.bloque1_hero?.title ? (
                sections.bloque1_hero.title.split('\n').map((line, i) => (
                  <span key={i} className={i === 0 ? "text-emerald-400" : "text-white"}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))
              ) : (
                <>
                  <span className="text-emerald-400">CHOCÓ</span>
                  <br />
                  <span className="text-white">AVENTURAS</span>
                </>
              )}
            </h1>
            <p className="text-lg text-white/90 mb-8">
              {sections.bloque1_hero?.subtitle || "Dispara, acelera y conquista la aventura"}
            </p>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg rounded-none uppercase font-semibold"
              onClick={() => document.getElementById('cuatrimotos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {sections.bloque1_hero?.button_text || "Reservar"}
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
            src={sections.bloque2_hero_secondary?.video_url || "https://www.youtube.com/embed/uq49IDyz4e4?autoplay=1&mute=1&loop=1&controls=0&playlist=uq49IDyz4e4"}
            allow="autoplay; fullscreen"
            style={{ pointerEvents: 'none' }}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
            {sections.bloque2_hero_secondary?.title || "EXPLORA ELIGE Y VIVE LA ACCIÓN"}
          </h2>
          <p className="text-lg text-white/90 mb-12">
            {sections.bloque2_hero_secondary?.subtitle || "Cuatrimotos y paintball en el corazón del Chocó: pensados para aventureros como tú."}
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {sections.bloque2_hero_secondary?.buttons?.map((button, index) => (
              <div key={index}>
                {button.enabled ? (
                  <Link href={button.link}>
                    <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-3 md:px-8 md:py-4 backdrop-blur-sm text-sm md:text-base">
                      {button.text}
                    </Button>
                  </Link>
                ) : (
                  <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-3 md:px-8 md:py-4 backdrop-blur-sm text-sm md:text-base cursor-not-allowed">
                    {button.text}
                  </Button>
                )}
              </div>
            )) || (
              // Fallback a botones originales
              <>
                <Link href="/reservas">
                  <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-3 md:px-8 md:py-4 backdrop-blur-sm text-sm md:text-base">
                    CUATRIMOTOS
                  </Button>
                </Link>
                <div className="relative group">
                  <Button
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-3 md:px-8 md:py-4 backdrop-blur-sm text-sm md:text-base cursor-pointer transition-all duration-300"
                    onClick={() => {
                      // Para móviles - mostrar alert
                      if (window.innerWidth < 768) {
                        alert('Próximamente disponible');
                      }
                    }}
                  >
                    PAINTBALL
                  </Button>
                  {/* Tooltip para hover en desktop */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden md:block">
                    Próximamente disponible
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                  </div>
                </div>
                <Link href="/experiencias">
                  <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-3 md:px-8 md:py-4 backdrop-blur-sm text-sm md:text-base">
                    EXPERIENCIAS
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Flip Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 - Cuatrimotos */}
            <div className="group relative h-80 perspective-1000">
              <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180 md:group-hover:rotate-y-180 [&.flipped]:rotate-y-180">
                {/* Frente */}
                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url("${sections.bloque3_services?.cuatrimotos?.image || '/choco-aventuras-hero.jpg'}")` }}
                  >
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                      <p className="text-sm mb-2">
                        {sections.bloque3_services?.cuatrimotos?.subtitle || "Aventura en la selva tropical"}
                      </p>
                      <h3 className="text-3xl font-bold">
                        {sections.bloque3_services?.cuatrimotos?.title || "RUTAS EN CUATRIMOTO"}
                      </h3>
                    </div>
                    {/* Botón para móvil */}
                    <div className="absolute inset-0 flex items-center justify-center md:hidden">
                      <Link href={sections.bloque3_services?.cuatrimotos?.link || "/reservas"}>
                        <Button
                          className="bg-emerald-600/90 text-white hover:bg-emerald-700 px-6 py-3 text-sm font-semibold backdrop-blur-sm"
                        >
                          {sections.bloque3_services?.cuatrimotos?.button_text || "Ver más"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Reverso */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-emerald-600 flex items-center justify-center">
                  <Link href={sections.bloque3_services?.cuatrimotos?.link || "/reservas"}>
                    <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                      RESERVAR
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 - Paintball */}
            <div className="group relative h-80 perspective-1000">
              <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180 md:group-hover:rotate-y-180 [&.flipped]:rotate-y-180">
                {/* Frente */}
                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url("${sections.bloque3_services?.paintball?.image || '/choco-aventuras-hero.jpg'}")` }}
                  >
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                      <p className="text-sm mb-2">
                        {sections.bloque3_services?.paintball?.subtitle || "Combate con adrenalina pura"}
                      </p>
                      <h3 className="text-3xl font-bold">
                        {sections.bloque3_services?.paintball?.title || "BATALLAS DE PAINTBALL"}
                      </h3>
                    </div>
                    {/* Botón para móvil */}
                    <div className="absolute inset-0 flex items-center justify-center md:hidden">
                      {sections.bloque3_services?.paintball?.enabled ? (
                        <Link href={sections.bloque3_services.paintball.link}>
                          <Button className="bg-orange-600/90 text-white hover:bg-orange-700 px-6 py-3 text-sm font-semibold backdrop-blur-sm">
                            {sections.bloque3_services.paintball.button_text}
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          className="bg-orange-600/90 text-white hover:bg-orange-700 px-6 py-3 text-sm font-semibold backdrop-blur-sm"
                          disabled
                        >
                          {sections.bloque3_services?.paintball?.button_text || "PRÓXIMAMENTE"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Reverso */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-orange-600 flex items-center justify-center">
                  {sections.bloque3_services?.paintball?.enabled ? (
                    <Link href={sections.bloque3_services.paintball.link}>
                      <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                        RESERVAR
                      </Button>
                    </Link>
                  ) : (
                    <Button className="bg-white text-orange-600 px-8 py-4 text-lg font-semibold cursor-not-allowed">
                      {sections.bloque3_services?.paintball?.button_text || "PRÓXIMAMENTE"}
                    </Button>
                  )}
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center text-white mb-16">
            <p className="text-lg mb-4">
              {sections.bloque4_vehicles?.section_subtitle || "Vive la aventura, siente la adrenalina."}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {sections.bloque4_vehicles?.section_title ? (
                sections.bloque4_vehicles.section_title.split('\n').map((line, i) => (
                  <span key={i} className={i === 0 ? "text-emerald-400" : "text-white"}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))
              ) : (
                <>
                  <span className="text-emerald-400">CHOCÓ</span>
                  <br />
                  <span className="text-white">CUATRIMOTOS</span>
                </>
              )}
            </h2>
          </div>

          {/* Grid de Cuatrimotos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {isLoading && <p className="text-white">Cargando cuatrimotos...</p>}
            {error && <p className="text-white">Error al cargar las cuatrimotos.</p>}
            {data?.cuatrimotos.slice(0, sections.bloque4_vehicles?.vehicles_to_show || 3).map((cuatrimoto) => (
              <div key={cuatrimoto.id} className="group relative h-80 rounded-lg overflow-hidden cursor-pointer">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url(${cuatrimoto.fotos[0] || '/choco-aventuras-hero.jpg'})` }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <div className="mb-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {cuatrimoto.marca}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{cuatrimoto.nombre}</h3>
                  <p className="text-sm text-white/90 mb-4">{cuatrimoto.descripcion}</p>
                  <div className="text-xl font-bold text-red-400">
                    ${cuatrimoto.precio_hora.toLocaleString()}/hora
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link href="/reservas">
                    <Button className="bg-red-600 text-white hover:bg-red-700 px-8 py-3">
                      RESERVAR
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section - Modern Cards */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="text-emerald-600">SÍGUENOS</span> EN REDES
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Únete a nuestra comunidad y vive las aventuras más emocionantes del Chocó
            </p>
          </div>

          {/* Social Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Instagram Card */}
            <a
              href="https://www.instagram.com/choco.aventuras2025"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-600/5 group-hover:from-pink-500/10 group-hover:to-purple-600/10 transition-all duration-500"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Instagram className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">Instagram</h3>
                <p className="text-gray-600 mb-6">Fotos y stories de nuestras aventuras diarias</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-pink-600">@choco.aventuras2025</span>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-pink-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </a>

            {/* YouTube Card */}
            <a
              href="https://youtube.com/@chocoaventuras"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-700/5 group-hover:from-red-500/10 group-hover:to-red-700/10 transition-all duration-500"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">YouTube</h3>
                <p className="text-gray-600 mb-6">Videos épicos de nuestras rutas extremas</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-red-600">Ver videos</span>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </a>

            {/* Facebook Card */}
            <a
              href="https://www.facebook.com/share/1D4semVk7u/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-700/5 group-hover:from-blue-500/10 group-hover:to-blue-700/10 transition-all duration-500"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Facebook className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">Facebook</h3>
                <p className="text-gray-600 mb-6">Eventos, noticias y comunidad activa</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-blue-600">Únete a la comunidad</span>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </a>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">¡No te pierdas nada!</h3>
              <p className="text-gray-600 mb-6">Síguenos en todas nuestras redes sociales para estar al día con las últimas aventuras, promociones especiales y contenido exclusivo.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg">
                  <Instagram className="h-5 w-5 mr-2" />
                  Instagram
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg">
                  <Play className="h-5 w-5 mr-2" />
                  YouTube
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
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
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-8">
            {sections.bloque7_cta?.title ? (
              sections.bloque7_cta.title.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))
            ) : (
              <>
                Contáctanos
                <br />
                en un clic
              </>
            )}
          </h2>
          <p className="text-xl mb-12">
            {sections.bloque7_cta?.subtitle || "Reserva tu aventura por WhatsApp"}
          </p>

          <Link href={sections.bloque7_cta?.button_link || "/reservas"} className="inline-block w-full sm:w-auto">
            <Button className="bg-white text-green-600 hover:bg-gray-100 px-4 py-3 text-base font-bold rounded-full shadow-2xl hover:scale-105 transition-all duration-300 w-full max-w-xs sm:max-w-none sm:px-8 sm:py-4 sm:text-lg">
              {sections.bloque7_cta?.button_text || "RESERVAR AVENTURA"}
            </Button>
          </Link>
        </div>
      </section>

      {/* Texto Animado */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl md:text-4xl lg:text-5xl font-bold">
            {sections.bloque8_animated_text?.prefix || "DESCUBRE"}{' '}
            <span className="text-emerald-400 transition-all duration-1000">
              {(sections.bloque8_animated_text?.animated_words || animatedTexts)[animatedTextIndex]}
            </span>
            <br />
            {sections.bloque8_animated_text?.suffix || "VIVE HOY TU AVENTURA"}
          </h2>
        </div>
      </section>

      {/* Footer */}
      <Footer />

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
      <div className="fixed left-6 bottom-6 z-40 group chaty-widget">
        <div className="flex flex-col-reverse gap-3">
          {/* Botón principal */}
          <button
            className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
            onClick={() => document.querySelector('.contact-buttons')?.classList.toggle('show')}
          >
            <Phone className="h-6 w-6 text-white" />
          </button>

          {/* Botones secundarios */}
          <div className="contact-buttons flex flex-col-reverse gap-3 opacity-0 scale-95 transition-all duration-300 transform translate-y-4">
            <a
              href="https://wa.me/573117030436"
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
              href="https://www.instagram.com/choco.aventuras2025?igsh=NXJnMGUwZjV3MTNk"
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <Instagram className="h-6 w-6 text-white" />
            </a>
            <a
              href="https://www.facebook.com/share/1D4semVk7u/?mibextid=wwXIfr"
              className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <Facebook className="h-6 w-6 text-white" />
            </a>
            <a
              href="https://www.tiktok.com/@choco.aventuras2025?_t=ZS-90kLr23nJpp&_r=1"
              className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <span className="text-white font-bold text-xs">TikTok</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .contact-buttons.show {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        @keyframes pulse-hint {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .chaty-widget {
          animation: pulse-hint 2s ease-in-out 3s infinite 3;
        }
      `}</style>

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