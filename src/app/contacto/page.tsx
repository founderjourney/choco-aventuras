"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center"
             style={{backgroundImage: "url('https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3')"}} />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8">
            <span className="text-emerald-400">CONTÁC</span>
            <span className="text-white">TANOS</span>
          </h1>

          <div className="w-24 h-1 bg-emerald-400 mx-auto mb-8"></div>

          <p className="text-lg text-gray-200">
            SOPORTE
          </p>

          {/* Breadcrumb */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>›</span>
            <span className="text-emerald-400">Contacto</span>
          </div>
        </div>

        {/* Bottom Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-6 border-b-2 border-r-2 border-emerald-400 transform rotate-45 animate-bounce"></div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Info */}
            <div>
              <div className="mb-8">
                <p className="text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-4">
                  NOS COMPLACE ASESORARTE
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contactenos
                </h2>
                <div className="w-16 h-1 bg-emerald-600 mb-6"></div>
                <p className="text-gray-600 leading-relaxed">
                  Si deseas realizar cualquier consulta acerca de nuestras aventuras,
                  ponte en contacto con nosotros y estaremos encantados de ayudarte.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">INFORMACIÓN</h3>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Ubicación</h4>
                    <p className="text-gray-600">KM7 Vía Yuto, Quibdó - Chocó</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Teléfono</h4>
                    <p className="text-gray-600">(311) 703-04-36</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">chocoaventurascuatri@gmail.com</p>
                  </div>
                </div>

                {/* Links Section */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">LINKS</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Facebook className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-600 text-sm">Chocó Aventuras</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-600 text-sm">@chocoaventuras</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-600 text-sm">(311) 703-04-36</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    ¿Cómo te llamas? *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Tu Nombre"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    ¿Con qué necesitas ayuda?
                  </label>
                  <select className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors">
                    <option value="">Selecciona una opción</option>
                    <option value="cuatrimotos">Tours en Cuatrimoto</option>
                    <option value="paintball">Combate de Paintball</option>
                    <option value="grupos">Aventuras Grupales</option>
                    <option value="reservas">Hacer una Reserva</option>
                    <option value="otro">Otra consulta</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    ¿Cuál es tu pregunta, comentario o sugerencia? *
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Cuéntanos sobre tu consulta o la aventura que tienes en mente..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Enviar
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 h-96">
            {/* Photo 1 */}
            <div className="group relative overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3')"}}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-center">
                  <h3 className="text-2xl font-bold mb-2">Aventuras Extremas</h3>
                  <p className="text-sm">Cuatrimotos en la selva</p>
                </div>
              </div>
            </div>

            {/* Photo 2 */}
            <div className="group relative overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3')"}}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-center">
                  <h3 className="text-2xl font-bold mb-2">Paintball Extremo</h3>
                  <p className="text-sm">Combates en escenarios naturales</p>
                </div>
              </div>
            </div>

            {/* Photo 3 */}
            <div className="group relative overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3')"}}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-center">
                  <h3 className="text-2xl font-bold mb-2">Hay Mucho Por Descubrir</h3>
                  <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">
                    Facebook
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-8">
            <span className="text-emerald-400">CONTÁCTANOS</span>
            <span className="text-white">EN UN CLIC</span>
          </h2>

          <div className="w-24 h-1 bg-emerald-400 mx-auto mb-8"></div>

          <p className="text-base text-gray-300 mb-4">
            ATENCIÓN RÁPIDA
          </p>
          <p className="text-emerald-400 text-base font-semibold mb-12">
            POR WHATSAPP
          </p>

          <a
            href="https://wa.me/573117030436"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <div className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl">
              📱 +57 311703 0436
            </div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
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
                Nuestra amplia experiencia en el sector nos permite crear la gran variedad de
                servicios. Contamos desde aventuras en cuatrimoto hasta combates de paintball
                y experiencias culturales únicas.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">LINKS</h3>
              <div className="space-y-2">
                {['Inicio', 'Tours', 'Cuatrimotos', 'Experiencias'].map((link) => (
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
                <div className="text-gray-400 text-sm">Chocó-Quibdó</div>
                <div className="text-gray-400 text-sm">Aventuras</div>
                <div className="text-gray-400 text-sm">Escríbenos</div>
                <div className="text-emerald-400 text-sm">+57 311703 0436</div>
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