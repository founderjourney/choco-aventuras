"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TreePine, Target, Music, Users, Clock, Shield, MapPin, ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';
import CallToAction from '@/components/CallToAction';
import Navigation from '@/components/Navigation';

export default function ExperienciasPage() {
  const experiencias = [
    {
      id: 1,
      titulo: "Cuatrimotos en la Selva",
      icono: <TreePine className="h-8 w-8" />,
      descripcion: "Aventura extrema sobre barro, trochas y selva tropical",
      detalles: [
        "Contacto directo con la naturaleza chocoana",
        "Rutas extremas diseñadas para la aventura",
        "Yamaha Grizzly 700 - Edición Especial Roja 2009",
        "Guías locales expertos en el territorio"
      ],
      color: "from-green-500 to-green-700"
    },
    {
      id: 2,
      titulo: "Paintball Natural",
      icono: <Target className="h-8 w-8" />,
      descripcion: "Combate con adrenalina en escenarios naturales únicos",
      detalles: [
        "Escenarios en plena selva tropical",
        "Combate estratégico entre la vegetación",
        "Equipos profesionales de paintball",
        "Experiencia única en Colombia"
      ],
      color: "from-red-500 to-red-700"
    },
    {
      id: 3,
      titulo: "Cultura Chocoana",
      icono: <Music className="h-8 w-8" />,
      descripcion: "Identidad auténtica con música y fiestas de San Pacho",
      detalles: [
        "Música tradicional del Pacífico",
        "Fiestas de San Pacho auténticas",
        "Historia y tradiciones locales",
        "Gastronomía típica chocoana"
      ],
      color: "from-yellow-500 to-orange-600"
    },
    {
      id: 4,
      titulo: "Actividades Grupales",
      icono: <Users className="h-8 w-8" />,
      descripcion: "Team building y actividades empresariales",
      detalles: [
        "Ideal para integración empresarial",
        "Actividades de team building",
        "Experiencias para grupos grandes",
        "Fortalecimiento de vínculos"
      ],
      color: "from-blue-500 to-blue-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#145A32] to-[#1565C0] py-20 jungle-particles mountain-parallax">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl font-bold mb-6 jungle-text wind-effect">
            Experiencias Únicas
          </h1>
          <p className="text-xl mb-8 max-w-4xl mx-auto">
            100% en la selva del Chocó - Vive la adrenalina, descubre la cultura y conecta con la naturaleza más pura de Colombia
          </p>
        </div>
      </section>

      {/* Experiencias Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#145A32] mb-4 jungle-text">
              Nuestras 4 Experiencias Principales
            </h2>
            <p className="text-xl text-gray-600">
              Cada experiencia diseñada para conectarte con la esencia del Chocó
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {experiencias.map((exp, index) => (
              <Card key={exp.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 card-3d particle-hover">
                <CardContent className="p-8">
                  <div className={`bg-gradient-to-r ${exp.color} rounded-2xl w-16 h-16 flex items-center justify-center mb-6 text-white`}>
                    {exp.icono}
                  </div>

                  <h3 className="text-2xl font-bold text-[#145A32] mb-4">{exp.titulo}</h3>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">{exp.descripcion}</p>

                  <div className="space-y-3 mb-6">
                    {exp.detalles.map((detalle, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#F1C40F] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{detalle}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/reservas">
                    <Button className="w-full bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold py-3 adrenaline-button magnetic-button">
                      RESERVAR EXPERIENCIA
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Destacada - ¿Por qué somos únicos? */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#145A32] mb-6 jungle-text">
              ¿Por qué somos únicos en Colombia?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos la primera experiencia de turismo extremo en Quibdó que combina todo en un solo lugar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center card-3d">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#145A32] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl"></span>
                </div>
                <h3 className="text-xl font-bold text-[#145A32] mb-4">Yamaha Grizzly 700</h3>
                <p className="text-gray-700">
                  Edición Especial Roja 2009, las cuatrimotos más potentes y seguras para aventuras extremas en la selva.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center card-3d">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#1565C0] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl"></span>
                </div>
                <h3 className="text-xl font-bold text-[#145A32] mb-4">100% Selva Tropical</h3>
                <p className="text-gray-700">
                  Experiencias auténticas en el corazón de la selva del Pacífico colombiano, biodiversidad única en el mundo.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center card-3d">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#F1C40F] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl"></span>
                </div>
                <h3 className="text-xl font-bold text-[#145A32] mb-4">Cultura Auténtica</h3>
                <p className="text-gray-700">
                  Guías locales que te introducen a la verdadera identidad chocoana, música y tradiciones milenarias.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Lo que incluye cada experiencia */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-[#145A32] mb-12 jungle-text">
            Qué Incluye Cada Experiencia
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-3d">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#145A32] rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#145A32]">Seguridad Garantizada</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#F1C40F] rounded-full"></div>
                    <span>Equipos de protección profesionales</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#F1C40F] rounded-full"></div>
                    <span>Casco, chaleco y protección completa</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#F1C40F] rounded-full"></div>
                    <span>Acompañamiento de guías expertos</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#F1C40F] rounded-full"></div>
                    <span>Seguro de accidentes incluido</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#1565C0] rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#145A32]">Guías Locales</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#F1C40F] rounded-full"></div>
                    <span>Personas expertas que conocen el territorio</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#F1C40F] rounded-full"></div>
                    <span>Conocimiento ancestral de la selva</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#F1C40F] rounded-full"></div>
                    <span>Historias y tradiciones auténticas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#F1C40F] rounded-full"></div>
                    <span>Apoyo constante durante la aventura</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Requerimientos */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#145A32] mb-12 jungle-text">
            Requerimientos para las Experiencias
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center card-3d">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#E53935] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl"></span>
                </div>
                <h3 className="font-bold text-[#145A32] mb-3">Edad y Documentos</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Edad mínima: 14 años</li>
                  <li>• Menores con adulto responsable</li>
                  <li>• Cédula o pasaporte obligatorio</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center card-3d">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#F1C40F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl"></span>
                </div>
                <h3 className="font-bold text-[#145A32] mb-3">Ropa Adecuada</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Ropa cómoda y resistente</li>
                  <li>• Que se pueda ensuciar</li>
                  <li>• Calzado cerrado obligatorio</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center card-3d">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#145A32] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl"></span>
                </div>
                <h3 className="font-bold text-[#145A32] mb-3">Reserva</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Depósito: 50% del valor</li>
                  <li>• Horarios: 7am - 5pm</li>
                  <li>• Ubicación: KM7 VIA YUTO</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction
        titulo="¿Listo para Vivir la Aventura?"
        descripcion="Experimenta lo que solo el Chocó puede ofrecerte: naturaleza, adrenalina y cultura en un solo lugar"
        botonPrimario={{ texto: "RESERVAR EXPERIENCIA", href: "/reservas" }}
        botonSecundario={{ texto: "VER CUATRIMOTOS", href: "/cuatrimotos" }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}