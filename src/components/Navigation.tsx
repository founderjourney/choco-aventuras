"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, User, ShoppingCart } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'INICIO' },
    { href: '/nosotros', label: 'NOSOTROS' },
    { href: '/cuadriciclos', label: 'CUATRIMOTOS' },
    { href: '/experiencias', label: 'EXPERIENCIAS' },
    { href: '/reservas', label: 'RESERVAS' },
    { href: '/contacto', label: 'CONTACTO' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CA</span>
            </div>
            <div className="ml-3 hidden sm:block">
              <div className="text-2xl font-bold text-emerald-600">Chocó</div>
              <div className="text-sm text-gray-600">AVENTURAS</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-medium transition-colors ${
                  isActive(href)
                    ? 'text-emerald-600 font-semibold'
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Header Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-700 hover:text-emerald-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-700 hover:text-emerald-600 transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors">
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
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-1">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 transition-colors ${
                  isActive(href)
                    ? 'text-emerald-600 font-semibold'
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}