import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { businessConfig } from '../config';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[#145A32]">
            {businessConfig.name}
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-[#145A32] transition-colors"
            >
              Inicio
            </Link>
            <Link 
              to="/cuadriciclos" 
              className="text-gray-700 hover:text-[#145A32] transition-colors"
            >
              Cuatrimotos
            </Link>
            <a 
              href={`mailto:${businessConfig.email}`}
              className="flex items-center text-gray-700 hover:text-[#145A32] transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              Contacto
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/cuadriciclos">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                Ver Cuatrimotos
              </Button>
            </Link>
            <Link to="/reservar">
              <Button size="sm" className="bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold">
                RESERVA YA
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
