"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { usePageContent } from '@/hooks/use-page-content';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  // 🚀 CMS Integration
  const pageContent = usePageContent('contacto');
  const sections = pageContent.contacto_sections || {};

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

      {/* BLOQUE 1: Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center"
             style={{backgroundImage: `url('${sections.bloque1_hero?.background_image || 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3'}')`}} />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-emerald-400 text-lg mb-4 font-medium">
            {sections.bloque1_hero?.welcome_text || '- Conectemos -'}
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8">
            {sections.bloque1_hero?.title || 'CONTACTO'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            {sections.bloque1_hero?.subtitle || 'Estamos aquí para hacer realidad tu próxima aventura'}
          </p>

          {/* Breadcrumb */}
          <nav className="flex justify-center space-x-2 text-sm">
            {(sections.bloque1_hero?.breadcrumb_items || [
              { text: 'Inicio', link: '/', active: false },
              { text: 'Contacto', link: '/contacto', active: true }
            ]).map((item, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-300">/</span>}
                {item.active ? (
                  <span className="text-emerald-400">{item.text}</span>
                ) : (
                  <Link href={item.link} className="text-gray-300 hover:text-white transition-colors">
                    {item.text}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-6 border-b-2 border-r-2 border-emerald-400 transform rotate-45 animate-bounce"></div>
        </div>
      </section>

      {/* BLOQUE 2: Contact Information & Form Section */}
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
                  Contáctenos
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

                {/* Ubicación */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {sections.bloque2_info_contacto?.location?.title || 'Visítanos'}
                    </h4>
                    <p className="text-gray-600">
                      {sections.bloque2_info_contacto?.location?.address || 'Quibdó, Chocó, Colombia'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {sections.bloque2_info_contacto?.location?.details || 'Centro de la ciudad'}
                    </p>
                  </div>
                </div>

                {/* Teléfono */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {sections.bloque2_info_contacto?.phone?.title || 'Llámanos'}
                    </h4>
                    <p className="text-gray-600">
                      {sections.bloque2_info_contacto?.phone?.number || '+57 300 123 4567'}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {sections.bloque2_info_contacto?.email?.title || 'Escríbenos'}
                    </h4>
                    <p className="text-gray-600">
                      {sections.bloque2_info_contacto?.email?.address || 'info@chocoaventuras.com'}
                    </p>
                  </div>
                </div>

                {/* Redes Sociales */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {sections.bloque2_info_contacto?.social_links?.title || 'Síguenos'}
                    </h4>
                    <p className="text-gray-600">
                      Facebook: {sections.bloque2_info_contacto?.social_links?.facebook_name || 'Chocó Aventuras'}
                    </p>
                    <p className="text-gray-600">
                      Instagram: {sections.bloque2_info_contacto?.social_links?.instagram_handle || '@choco.aventuras2025'}
                    </p>
                    <p className="text-gray-600">
                      Tel: {sections.bloque2_info_contacto?.social_links?.phone_display || '+57 300 123 4567'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* BLOQUE 3: Right Column - Contact Form */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {sections.bloque3_formulario?.name_label || 'Nombre completo'} *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder={sections.bloque3_formulario?.name_placeholder || 'Tu nombre y apellido'}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {sections.bloque3_formulario?.email_label || 'Correo electrónico'} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={sections.bloque3_formulario?.email_placeholder || 'tu@correo.com'}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {sections.bloque3_formulario?.subject_label || 'Asunto'}
                  </label>
                  <select className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors">
                    {(sections.bloque3_formulario?.subject_options || [
                      { value: '', label: 'Selecciona un tema' },
                      { value: 'reservas', label: 'Reservas de cuatrimotos' },
                      { value: 'experiencias', label: 'Consultas sobre experiencias' },
                      { value: 'grupos', label: 'Eventos grupales y empresariales' },
                      { value: 'precios', label: 'Información de precios' },
                      { value: 'otros', label: 'Otros temas' }
                    ]).map((option, index) => (
                      <option key={index} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {sections.bloque3_formulario?.message_label || 'Mensaje'} *
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder={sections.bloque3_formulario?.message_placeholder || 'Cuéntanos en qué podemos ayudarte...'}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {sections.bloque3_formulario?.submit_button_text || 'ENVIAR MENSAJE'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE 4: Services Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              <span className="text-emerald-600">{sections.bloque4_servicios?.section_title_part1 || 'NUESTROS'}</span> {sections.bloque4_servicios?.section_title_part2 || 'SERVICIOS'}
            </h2>
            <p className="text-lg text-gray-600">
              {sections.bloque4_servicios?.section_description || 'Descubre todas las aventuras que tenemos preparadas para ti'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(sections.bloque4_servicios?.services || [
              {
                id: 'cuatrimotos',
                title: 'Rutas en Cuatrimoto',
                description: 'Aventuras extremas por la selva del Chocó',
                image_url: '/choco-aventuras-hero.jpg',
                button_text: 'RESERVAR',
                button_link: '/cuatrimotos',
                available: true
              },
              {
                id: 'paintball',
                title: 'Paintball Extremo',
                description: 'Batallas épicas en escenarios naturales',
                image_url: '/choco-aventuras-hero.jpg',
                button_text: 'PRÓXIMAMENTE',
                button_link: '#',
                available: false
              },
              {
                id: 'experiencias',
                title: 'Experiencias Culturales',
                description: 'Conoce la cultura chocoana auténtica',
                image_url: '/choco-aventuras-hero.jpg',
                button_text: 'EXPLORAR',
                button_link: '/experiencias',
                available: true
              }
            ]).map((service) => (
              <div key={service.id} className="group relative overflow-hidden rounded-2xl shadow-lg h-80 bg-white">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{backgroundImage: `url('${service.image_url}')`}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-sm mb-4 opacity-90">{service.description}</p>
                  {service.available ? (
                    <Link href={service.button_link}>
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2">
                        {service.button_text}
                      </Button>
                    </Link>
                  ) : (
                    <Button disabled className="bg-gray-600 text-white text-sm px-4 py-2 opacity-75">
                      {service.button_text}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOQUE 5: WhatsApp Contact Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-8">
            <span className="text-white">{sections.bloque5_whatsapp?.title_part1 || '¿Tienes dudas?'}</span>
            <br />
            <span className="text-white">{sections.bloque5_whatsapp?.title_part2 || 'ESCRÍBENOS'}</span>
          </h2>

          <div className="w-24 h-1 bg-emerald-400 mx-auto mb-8"></div>

          <p className="text-base text-emerald-100 mb-4">
            {sections.bloque5_whatsapp?.subtitle_1 || 'Respuesta inmediata por WhatsApp'}
          </p>
          <p className="text-white text-base font-semibold mb-12">
            {sections.bloque5_whatsapp?.subtitle_2 || 'Estamos disponibles de 7:00 AM a 8:00 PM'}
          </p>

          <a
            href={`https://wa.me/${sections.bloque5_whatsapp?.phone_number || '573001234567'}?text=${encodeURIComponent(sections.bloque5_whatsapp?.message_text || 'Hola! Tengo una consulta sobre Chocó Aventuras')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <div className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl flex items-center gap-3 mx-auto w-fit">
              <MessageCircle className="w-6 h-6" />
              {sections.bloque5_whatsapp?.button_text || 'CHATEAR EN WHATSAPP'}
            </div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}