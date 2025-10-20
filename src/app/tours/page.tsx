"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Clock, Users, MapPin, Star, ArrowRight, Shield } from 'lucide-react';
import Footer from '@/components/Footer';
import CallToAction from '@/components/CallToAction';

export default function ToursPage() {
  const tours = [
    {
      id: 1,
      nombre: "Tour Extremo en Cuatrimoto",
      descripcion: "Aventura sobre barro, trochas y selva en nuestras Yamaha Grizzly 700",
      duracion: "3-4 horas",
      dificultad: "Intermedio",
      precio: "Desde $120.000",
      incluye: ["Cuatrimoto Yamaha Grizzly 700", "Equipo de seguridad completo", "Guía local experto", "Seguro de accidentes"],
      destacado: true
    },
    {
      id: 2,
      nombre: "Paintball en la Selva",
      descripcion: "Combate con adrenalina en plena selva tropical en escenarios naturales únicos",
      duracion: "2-3 horas",
      dificultad: "Fácil",
      precio: "Desde $80.000",
      incluye: ["Equipo de paintball completo", "300 balas incluidas", "Máscaras y protección", "Escenarios naturales"]
    },
    {
      id: 3,
      nombre: "Experiencia Cultural Chocoana",
      descripcion: "Descubre la magia del Chocó auténtico con música y fiestas de San Pacho",
      duracion: "4-5 horas",
      dificultad: "Fácil",
      precio: "Desde $150.000",
      incluye: ["Tour cultural", "Música tradicional", "Comida típica", "Guía cultural especializado"]
    },
    {
      id: 4,
      nombre: "Combo Aventura Completa",
      descripcion: "Cuatrimoto + Paintball + Cultura chocoana en una experiencia única",
      duracion: "6-8 horas",
      dificultad: "Intermedio",
      precio: "Desde $280.000",
      incluye: ["Tour en cuatrimoto", "Sesión de paintball", "Experiencia cultural", "Almuerzo típico"],
      destacado: true
    }
  ];

  const getDifficultyColor = (dificultad: string) => {
    switch (dificultad) {
      case 'Fácil': return 'bg-green-100 text-green-800';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'Difícil': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
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
              <Link href="/tours" className="nav-item text-[#145A32] font-semibold">
                Tours
              </Link>
              <Link href="/cuadriciclos" className="nav-item text-gray-700 hover:text-[#145A32]">
                Cuatrimotos
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
      <section className="relative bg-gradient-to-r from-[#145A32] to-[#1565C0] py-20 jungle-particles mountain-parallax">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-6 jungle-text wind-effect">
            Nuestros Tours de Aventura
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Vive experiencias únicas que combinan adrenalina, naturaleza y cultura chocoana en plena selva tropical
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 glass-effect particle-hover">
            <Star className="h-5 w-5 text-[#F1C40F] fill-current neon-glow" />
            <span className="font-medium">Tours diseñados para vivir al máximo</span>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#145A32] mb-4 jungle-text">
              Experiencias de Aventura
            </h2>
            <p className="text-xl text-gray-600">
              Desde tours extremos en cuatrimoto hasta experiencias culturales auténticas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {tours.map((tour) => (
              <Card key={tour.id} className={`overflow-hidden hover:shadow-2xl transition-all duration-300 card-3d particle-hover ${tour.destacado ? 'ring-2 ring-[#F1C40F]' : ''}`}>
                {tour.destacado && (
                  <div className="bg-[#F1C40F] text-black px-4 py-2 text-center font-bold">
                    ⭐ TOUR MÁS POPULAR
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <CardTitle className="text-2xl text-[#145A32]">{tour.nombre}</CardTitle>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(tour.dificultad)}`}>
                      {tour.dificultad}
                    </span>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">{tour.descripcion}</p>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-[#1565C0]" />
                      <span className="text-gray-700">{tour.duracion}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-[#1565C0]" />
                      <span className="text-gray-700">Grupos</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold text-[#145A32] mb-3">Incluye:</h4>
                    <ul className="space-y-2">
                      {tour.incluye.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#F1C40F] rounded-full"></div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-3xl font-bold text-[#145A32]">{tour.precio}</span>
                      <span className="text-gray-600 block">por persona</span>
                    </div>
                    <Link href="/reservas">
                      <Button className="bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold px-6 py-3 adrenaline-button magnetic-button wave-button">
                        RESERVAR
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Información Importante */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#145A32] mb-12 jungle-text">
            Información Importante
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="text-xl text-[#145A32] flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  Requerimientos de Seguridad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li><strong>Edad mínima:</strong> 14 años (menores con adulto responsable)</li>
                  <li><strong>Documentos:</strong> Cédula de ciudadanía o pasaporte para extranjeros</li>
                  <li><strong>Ropa:</strong> Cómoda, resistente y que se pueda ensuciar</li>
                  <li><strong>Calzado:</strong> Obligatorio calzado cerrado y resistente</li>
                  <li><strong>Protección:</strong> Uso obligatorio de casco, chaleco y protección provista</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="text-xl text-[#145A32] flex items-center gap-2">
                  <MapPin className="h-6 w-6" />
                  Políticas de Reserva
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li><strong>Depósito:</strong> 50% del valor del servicio para reservar</li>
                  <li><strong>Horarios:</strong> 7:00 AM - 5:00 PM todos los días</li>
                  <li><strong>Ubicación:</strong> KM7 VIA YUTO, Quibdó - Chocó</li>
                  <li><strong>Guías:</strong> Locales expertos que conocen el territorio</li>
                  <li><strong>Responsabilidad:</strong> Cliente responsable por daños por mal uso</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#145A32] mb-12 jungle-text">
            Lo que Dicen Nuestros Aventureros
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center card-3d">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#F1C40F] fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &quot;Una experiencia increíble! Los cuatrimotos son potentes y los guías conocen cada rincón de la selva.&quot;
                </p>
                <h4 className="font-bold text-[#145A32]">María González</h4>
                <span className="text-gray-600 text-sm">Bogotá</span>
              </CardContent>
            </Card>

            <Card className="text-center card-3d">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#F1C40F] fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &quot;El paintball en la selva es único! Nunca había jugado en un escenario tan natural y emocionante.&quot;
                </p>
                <h4 className="font-bold text-[#145A32]">Carlos Ramírez</h4>
                <span className="text-gray-600 text-sm">Medellín</span>
              </CardContent>
            </Card>

            <Card className="text-center card-3d">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#F1C40F] fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &quot;La cultura chocoana es fascinante. Los guías locales te hacen sentir parte de la comunidad.&quot;
                </p>
                <h4 className="font-bold text-[#145A32]">Ana Martínez</h4>
                <span className="text-gray-600 text-sm">Cali</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction
        titulo="¿Listo para tu Próxima Aventura?"
        descripcion="Reserva ahora y vive experiencias que recordarás para siempre"
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}