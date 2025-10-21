import Link from 'next/link';
import { Facebook, Instagram, MapPin, Clock, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#145A32] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CA</span>
              </div>
              <h3 className="text-xl font-bold">Chocó Aventuras</h3>
            </div>
            <p className="text-emerald-100 mb-4 leading-relaxed">
              La primera experiencia de turismo extremo en Quibdó que combina cuatrimotos, paintball y cultura local.
            </p>
            <p className="text-[#F1C40F] font-bold italic">
              &quot;Aquí la aventura no se cuenta... ¡se vive!&quot;
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#F1C40F]">Enlaces Rápidos</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-emerald-100 hover:text-[#F1C40F] transition-colors">
                Inicio
              </Link>
              <Link href="/nosotros" className="block text-emerald-100 hover:text-[#F1C40F] transition-colors">
                Nosotros
              </Link>
              <Link href="/reservas" className="block text-emerald-100 hover:text-[#F1C40F] transition-colors">
                Reservas
              </Link>
              <Link href="/cuadriciclos" className="block text-emerald-100 hover:text-[#F1C40F] transition-colors">
                Cuatrimotos
              </Link>
              <Link href="/experiencias" className="block text-emerald-100 hover:text-[#F1C40F] transition-colors">
                Experiencias
              </Link>
              <Link href="/contacto" className="block text-emerald-100 hover:text-[#F1C40F] transition-colors">
                Contacto
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#F1C40F]">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-[#F1C40F] mt-0.5" />
                <div>
                  <p className="text-emerald-100">KM7 VIA YUTO</p>
                  <p className="text-emerald-200 text-sm">Quibdó, Chocó</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#F1C40F]" />
                <p className="text-emerald-100">7:00 AM - 5:00 PM</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#F1C40F]" />
                <p className="text-emerald-100 text-sm">chocoaventurascuatri@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#F1C40F]">Nuestros Servicios</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[#F1C40F]"></span>
                <span className="text-emerald-100 text-sm">Tours en Cuatrimoto</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#F1C40F]"></span>
                <span className="text-emerald-100 text-sm">Paintball Natural</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#F1C40F]"></span>
                <span className="text-emerald-100 text-sm">Experiencias de Selva</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#F1C40F]"></span>
                <span className="text-emerald-100 text-sm">Cultura Chocoana</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#F1C40F]"></span>
                <span className="text-emerald-100 text-sm">Team Building</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-emerald-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div>
              <h4 className="font-bold mb-3 text-[#F1C40F]">Síguenos</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-[#1877F2] rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Facebook className="h-5 w-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-r from-[#F58529] to-[#DD2A7B] rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Instagram className="h-5 w-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-black rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <span className="text-white font-bold text-sm">TT</span>
                </a>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="text-center md:text-right">
              <h4 className="font-bold mb-3 text-[#F1C40F]">¿Listo para la Aventura?</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/reservas"
                  className="bg-[#E53935] hover:bg-[#D32F2F] text-white px-6 py-2 rounded-lg font-bold transition-colors adrenaline-button"
                >
                  RESERVAR AHORA
                </Link>
                <Link
                  href="/contacto"
                  className="border border-[#F1C40F] text-[#F1C40F] hover:bg-[#F1C40F] hover:text-[#145A32] px-6 py-2 rounded-lg font-bold transition-colors"
                >
                  CONTACTAR
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0F4124] border-t border-emerald-600">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="text-emerald-200">
              © 2024 Chocó Aventuras. Todos los derechos reservados.
            </div>
            <div className="flex gap-6 text-emerald-200">
              <Link href="#" className="hover:text-[#F1C40F] transition-colors">
                Términos de Servicio
              </Link>
              <Link href="#" className="hover:text-[#F1C40F] transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/admin/login" className="hover:text-[#F1C40F] transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}