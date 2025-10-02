"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Phone, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function Homepage() {
  return (
    <div className="min-h-screen">
      {/* Simple Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-[#145A32]">
              Chocó Aventuras
            </div>
            <nav className="flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-[#145A32]">
                Inicio
              </Link>
              <Link href="/cuadriciclos" className="text-gray-700 hover:text-[#145A32]">
                Cuadriciclos
              </Link>
              <Link href="/reservas" className="text-gray-700 hover:text-[#145A32]">
                Reservar
              </Link>
              <Link href="/admin/login" className="text-gray-700 hover:text-[#145A32]">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-[#145A32] to-[#1565C0] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            CHOCÓ AVENTURAS
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Experiencias 100% en la selva del Chocó - Tours extremos, paintball y cultura local
          </p>
          <p className="text-lg mb-8 text-white/90">
            Aquí la aventura no se cuenta… ¡se vive!
          </p>
          <Link href="/cuadriciclos">
            <Button size="lg" className="text-lg px-8 py-3 bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold">
              RESERVA YA
            </Button>
          </Link>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <MapPin className="h-12 w-12 text-[#145A32] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ubicación</h3>
                <p className="text-gray-600">Chocó, Colombia</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-[#1565C0] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Horarios</h3>
                <p className="text-gray-600">
                  Todos los días: 8:00 AM - 6:00 PM
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Phone className="h-12 w-12 text-[#F1C40F] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Contacto</h3>
                <p className="text-gray-600">
                  info@chocoaventuras.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#145A32]">Nuestras Experiencias</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-[#145A32]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏍️</span>
              </div>
              <h3 className="font-semibold mb-2">Tours Extremos</h3>
              <p className="text-gray-600 text-sm">Aventura sobre barro, trochas y selva tropical</p>
            </div>
            <div className="text-center">
              <div className="bg-[#E53935]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold mb-2">Paintball Natural</h3>
              <p className="text-gray-600 text-sm">Combate con adrenalina en escenarios naturales</p>
            </div>
            <div className="text-center">
              <div className="bg-[#F1C40F]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="font-semibold mb-2">Cultura Chocoana</h3>
              <p className="text-gray-600 text-sm">Identidad local, música y tradiciones auténticas</p>
            </div>
            <div className="text-center">
              <div className="bg-[#1565C0]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="font-semibold mb-2">Guías Locales</h3>
              <p className="text-gray-600 text-sm">Expertos que conocen cada rincón del territorio</p>
            </div>
            <div className="text-center">
              <div className="bg-[#FB8C00]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-semibold mb-2">Seguridad Total</h3>
              <p className="text-gray-600 text-sm">Equipos de protección y acompañamiento garantizado</p>
            </div>
            <div className="text-center">
              <div className="bg-[#145A32]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-semibold mb-2">Grupos y Empresas</h3>
              <p className="text-gray-600 text-sm">Ideal para integración y team building</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Chocó Aventuras</h3>
              <p className="text-gray-300">
                Experiencias únicas en la selva del Chocó
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <p className="text-gray-300 mb-2">+57 300 123 4567</p>
              <p className="text-gray-300 mb-2">info@chocoaventuras.com</p>
              <p className="text-gray-300">Chocó, Colombia</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Chocó Aventuras. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
