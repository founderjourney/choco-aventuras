import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Home, Settings, Calendar, Users, LogOut, Mountain, Menu, X } from 'lucide-react';
import { businessConfig } from '../config';

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/admin';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <Link to="/admin" className="text-xl lg:text-2xl font-bold text-blue-600">
                <span className="hidden sm:inline">Admin - {businessConfig.name}</span>
                <span className="sm:hidden">Admin</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  Ver Sitio Público
                </Button>
                <Button variant="outline" size="sm" className="sm:hidden">
                  <Home className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 lg:mr-2" />
                <span className="hidden lg:inline">Salir</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={cn(
          "bg-white shadow-sm min-h-[calc(100vh-80px)] transition-transform duration-300 ease-in-out z-50",
          "fixed lg:static lg:translate-x-0",
          "w-64 lg:w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <nav className="p-4">
            <div className="space-y-2">
              <Link to="/admin" onClick={() => setSidebarOpen(false)}>
                <Button
                  variant={isActive('/admin') ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    isActive('/admin') && 'bg-blue-600 text-white hover:bg-blue-700'
                  )}
                >
                  <Home className="h-4 w-4 mr-3" />
                  Dashboard
                </Button>
              </Link>

              <Link to="/admin/paseos" onClick={() => setSidebarOpen(false)}>
                <Button
                  variant={isActive('/admin/paseos') ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    isActive('/admin/paseos') && 'bg-blue-600 text-white hover:bg-blue-700'
                  )}
                >
                  <Mountain className="h-4 w-4 mr-3" />
                  Paseos
                </Button>
              </Link>

              <Link to="/admin/cuatrimotos" onClick={() => setSidebarOpen(false)}>
                <Button
                  variant={isActive('/admin/cuatrimotos') ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    isActive('/admin/cuatrimotos') && 'bg-blue-600 text-white hover:bg-blue-700'
                  )}
                >
                  <Users className="h-4 w-4 mr-3" />
                  Cuatrimotos
                </Button>
              </Link>

              <Link to="/admin/reservas" onClick={() => setSidebarOpen(false)}>
                <Button
                  variant={isActive('/admin/reservas') ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    isActive('/admin/reservas') && 'bg-blue-600 text-white hover:bg-blue-700'
                  )}
                >
                  <Calendar className="h-4 w-4 mr-3" />
                  Reservas
                </Button>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 lg:ml-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
