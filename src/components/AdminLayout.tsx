import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Home, Settings, Calendar, Users, LogOut, Mountain } from 'lucide-react';
import { businessConfig } from '../config';

export default function AdminLayout() {
  const location = useLocation();

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
            <Link to="/admin" className="text-2xl font-bold text-blue-600">
              Admin - {businessConfig.name}
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  Ver Sitio Público
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-80px)]">
          <nav className="p-4">
            <div className="space-y-2">
              <Link to="/admin">
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

              <Link to="/admin/paseos">
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

              <Link to="/admin/cuatrimotos">
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

              <Link to="/admin/reservas">
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
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
