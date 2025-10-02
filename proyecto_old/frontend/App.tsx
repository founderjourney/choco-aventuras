import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import backend from '~backend/client';
import Homepage from './pages/Homepage';
import Catalog from './pages/Catalog';
import Booking from './pages/Booking';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPaseos from './pages/admin/Paseos';
import AdminCuadriciclos from './pages/admin/Cuadriciclos';
import AdminReservas from './pages/admin/Reservas';
import AdminLayout from './components/AdminLayout';
import './globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function AppInner() {
  useEffect(() => {
    const seedExamples = async () => {
      try {
        const response = await backend.cuadriciclos.list();
        if (response.cuadriciclos.length === 0) {
          await backend.cuadriciclos.seedExamples();
          console.log('Cuadriciclos de ejemplo creados');
        }
      } catch (error) {
        console.error('Error al verificar/crear cuadriciclos de ejemplo:', error);
      }
    };
    
    seedExamples();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/cuadriciclos" element={<Catalog />} />
        <Route path="/reservar" element={<Booking />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="paseos" element={<AdminPaseos />} />
          <Route path="cuadriciclos" element={<AdminCuadriciclos />} />
          <Route path="reservas" element={<AdminReservas />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInner />
    </QueryClientProvider>
  );
}
