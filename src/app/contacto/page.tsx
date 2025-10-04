"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { MapPin, Clock, Mail, Phone, Facebook, Instagram, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import Footer from '@/components/Footer';
import CallToAction from '@/components/CallToAction';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se manejaría el envío del formulario
    console.log('Formulario enviado:', formData);
    alert('¡Mensaje enviado! Te contactaremos pronto.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
              <Link href="/nosotros" className="nav-item text-gray-700 hover:text-[#145A32]">
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
              <Link href="/contacto" className="nav-item text-[#145A32] font-semibold">
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
      <section className="relative bg-gradient-to-r from-[#145A32] to-[#1565C0] py-20 jungle-particles mountain-parallax">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-6 jungle-text wind-effect">
            Contáctanos
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            ¿Listo para vivir la aventura? Estamos aquí para ayudarte a planear tu experiencia perfecta en el Chocó
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 glass-effect particle-hover">
            <MessageCircle className="h-5 w-5 text-[#F1C40F]" />
            <span className="font-medium">Te respondemos en menos de 24 horas</span>
          </div>
        </div>
      </section>

      {/* Información de Contacto */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#145A32] mb-12 jungle-text">
            Información de Contacto
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-all duration-300 card-3d">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#145A32] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-[#145A32] mb-2">Ubicación</h3>
                <p className="text-gray-700">KM7 VIA YUTO</p>
                <p className="text-gray-600 text-sm">Quibdó, Chocó</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 card-3d">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#1565C0] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-[#145A32] mb-2">Horarios</h3>
                <p className="text-gray-700">7:00 AM - 5:00 PM</p>
                <p className="text-gray-600 text-sm">Todos los días</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 card-3d">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#F1C40F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-[#145A32] mb-2">Email</h3>
                <p className="text-gray-700 text-sm">chocoaventurascuatri@gmail.com</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 card-3d">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#E53935] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-[#145A32] mb-2">Reservas</h3>
                <p className="text-gray-700">WhatsApp</p>
                <p className="text-gray-600 text-sm">Disponible 24/7</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulario */}
            <div>
              <h2 className="text-3xl font-bold text-[#145A32] mb-6 jungle-text">
                Envíanos un Mensaje
              </h2>
              <p className="text-gray-700 mb-8">
                Completa el formulario y te contactaremos para ayudarte a planear tu aventura perfecta.
              </p>

              <Card className="card-3d">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-[#145A32] mb-2">
                        Nombre Completo *
                      </label>
                      <Input
                        id="nombre"
                        name="nombre"
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#145A32] focus:border-transparent"
                        placeholder="Tu nombre completo"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#145A32] mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#145A32] focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-[#145A32] mb-2">
                        Teléfono / WhatsApp
                      </label>
                      <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#145A32] focus:border-transparent"
                        placeholder="+57 300 123 4567"
                      />
                    </div>

                    <div>
                      <label htmlFor="mensaje" className="block text-sm font-medium text-[#145A32] mb-2">
                        Mensaje *
                      </label>
                      <Textarea
                        id="mensaje"
                        name="mensaje"
                        required
                        rows={5}
                        value={formData.mensaje}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#145A32] focus:border-transparent"
                        placeholder="Cuéntanos qué tipo de aventura te interesa, cuántas personas son, fechas aproximadas..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold py-4 text-lg adrenaline-button magnetic-button wave-button"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      ENVIAR MENSAJE
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Información Adicional */}
            <div className="space-y-8">
              <Card className="card-3d">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-[#145A32] mb-6">¿Tienes Preguntas?</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-[#F1C40F] pl-4">
                      <h4 className="font-bold text-[#145A32]">¿Necesito experiencia previa?</h4>
                      <p className="text-gray-700">No necesitas experiencia. Nuestros guías te enseñarán todo lo necesario.</p>
                    </div>
                    <div className="border-l-4 border-[#F1C40F] pl-4">
                      <h4 className="font-bold text-[#145A32]">¿Qué debo llevar?</h4>
                      <p className="text-gray-700">Ropa cómoda que se pueda ensuciar y calzado cerrado. Todo el equipo de seguridad lo proporcionamos.</p>
                    </div>
                    <div className="border-l-4 border-[#F1C40F] pl-4">
                      <h4 className="font-bold text-[#145A32]">¿Hacen tours para grupos?</h4>
                      <p className="text-gray-700">Sí, somos especialistas en actividades para grupos empresariales y team building.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-[#145A32] to-[#1565C0] text-white card-3d">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Políticas de Reserva</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#F1C40F] rounded-full mt-2"></div>
                      <p><strong>Depósito:</strong> 50% del valor del servicio</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#F1C40F] rounded-full mt-2"></div>
                      <p><strong>Edad mínima:</strong> 14 años (menores con adulto)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#F1C40F] rounded-full mt-2"></div>
                      <p><strong>Documentos:</strong> Cédula o pasaporte obligatorio</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#F1C40F] rounded-full mt-2"></div>
                      <p><strong>Cancelación:</strong> 24 horas de anticipación</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Redes Sociales */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#145A32] mb-8 jungle-text">
            Síguenos en Redes Sociales
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Mantente al día con nuestras aventuras y promociones especiales
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 card-3d particle-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Facebook className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-[#145A32] mb-2">Facebook</h3>
                <p className="text-gray-700 mb-4">Fotos y videos de nuestras aventuras</p>
                <Button variant="outline" className="border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2] hover:text-white magnetic-button">
                  Seguir
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 card-3d particle-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-[#F58529] to-[#DD2A7B] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Instagram className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-[#145A32] mb-2">Instagram</h3>
                <p className="text-gray-700 mb-4">Stories y reels de nuestras experiencias</p>
                <Button variant="outline" className="border-[#E4405F] text-[#E4405F] hover:bg-[#E4405F] hover:text-white magnetic-button">
                  Seguir
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 card-3d particle-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">TT</span>
                </div>
                <h3 className="font-bold text-[#145A32] mb-2">TikTok</h3>
                <p className="text-gray-700 mb-4">Videos cortos llenos de adrenalina</p>
                <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white magnetic-button">
                  Seguir
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mapa y Ubicación */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#145A32] mb-12 jungle-text">
            Cómo Llegar
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="card-3d">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[#145A32] mb-6">Ubicación</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-[#145A32] mt-1" />
                    <div>
                      <p className="font-bold">KM7 VIA YUTO</p>
                      <p className="text-gray-700">Quibdó, Chocó, Colombia</p>
                    </div>
                  </div>
                  <div className="bg-[#F5F5F5] p-4 rounded-lg">
                    <h4 className="font-bold text-[#145A32] mb-2">Instrucciones:</h4>
                    <ol className="text-gray-700 space-y-2 text-sm">
                      <li>1. Desde Quibdó, tomar la vía hacia Yuto</li>
                      <li>2. Avanzar 7 kilómetros por la carretera principal</li>
                      <li>3. Buscar las señales de "Chocó Aventuras"</li>
                      <li>4. Llegar a nuestras instalaciones en plena selva</li>
                    </ol>
                  </div>
                  <div className="bg-gradient-to-r from-[#145A32] to-[#1565C0] text-white p-4 rounded-lg">
                    <p className="font-bold mb-2">💡 Consejo:</p>
                    <p className="text-sm">Te recomendamos usar GPS o contactarnos por WhatsApp para guiarte mejor al lugar.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[#145A32] mb-6">Contacto Directo</h3>
                <div className="space-y-6">
                  <div className="bg-[#25D366] text-white p-4 rounded-lg text-center">
                    <h4 className="font-bold mb-2">WhatsApp</h4>
                    <p className="mb-4">La forma más rápida de contactarnos</p>
                    <Button className="bg-white text-[#25D366] hover:bg-gray-100 font-bold magnetic-button">
                      Enviar WhatsApp
                    </Button>
                  </div>

                  <div className="bg-[#145A32] text-white p-4 rounded-lg text-center">
                    <h4 className="font-bold mb-2">Email</h4>
                    <p className="mb-2 text-sm">chocoaventurascuatri@gmail.com</p>
                    <p className="text-xs opacity-90">Respuesta en menos de 24 horas</p>
                  </div>

                  <div className="border-2 border-[#F1C40F] p-4 rounded-lg text-center">
                    <h4 className="font-bold text-[#145A32] mb-2">Horarios de Atención</h4>
                    <p className="text-gray-700">Lunes a Domingo</p>
                    <p className="font-bold text-[#145A32]">7:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <CallToAction
        botonSecundario={{ texto: "VER TOURS", href: "/tours" }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}