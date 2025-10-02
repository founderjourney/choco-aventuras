"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulación de autenticación básica
    if (formData.email === 'admin@chocoaventuras.com' && formData.password === 'admin123') {
      // Guardar estado de autenticación
      localStorage.setItem('admin_authenticated', 'true');
      localStorage.setItem('admin_user', JSON.stringify({
        email: formData.email,
        name: 'Administrador',
        role: 'admin',
        loginTime: new Date().toISOString()
      }));

      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente.",
      });

      router.push('/admin');
    } else {
      toast({
        title: "Error de autenticación",
        description: "Email o contraseña incorrectos.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/3 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      {/* Back to Home */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="text-white/90 hover:text-white transition-all duration-300 flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20 hover:bg-white/15 hover:border-white/30"
        >
          ← Volver al inicio
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-2xl bg-white/95 backdrop-blur-xl border-0 relative z-10">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-xl">
            <Lock className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text text-transparent mb-2">
            Chocó Aventuras
          </CardTitle>
          <p className="text-slate-600 font-medium text-lg">Panel de Administración</p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  className="pl-12 pr-4 py-3 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl bg-slate-50/50 backdrop-blur-sm"
                  placeholder="admin@chocoaventuras.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-slate-700 font-medium">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                  className="pl-12 pr-12 py-3 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl bg-slate-50/50 backdrop-blur-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div className="mt-8 p-5 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200">
            <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Credenciales de Demo:
            </h4>
            <div className="text-sm space-y-2">
              <p className="text-slate-600"><strong className="text-slate-800">Email:</strong> admin@chocoaventuras.com</p>
              <p className="text-slate-600"><strong className="text-slate-800">Contraseña:</strong> admin123</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-emerald-600 transition-colors font-medium"
            >
              ¿Necesitas ayuda? Contacta soporte
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}