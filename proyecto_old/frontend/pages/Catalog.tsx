import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar, DollarSign } from 'lucide-react';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import backend from '~backend/client';
import type { Cuadriciclo } from '~backend/cuadriciclos/list';
import { appConfig } from '../config';

export default function Catalog() {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { data, isLoading, error } = useQuery({
    queryKey: ['cuadriciclos'],
    queryFn: async () => {
      const response = await backend.cuadriciclos.list();
      return response.cuadriciclos;
    },
  });

  const filteredCuadriciclos = data?.filter(cuad => 
    statusFilter === 'all' || cuad.estado === statusFilter
  ) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-red-600">
            Error al cargar los cuadriciclos. Por favor, inténtalo de nuevo.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Cuadriciclos Disponibles</h1>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="disponible">Disponible</SelectItem>
                <SelectItem value="ocupado">Ocupado</SelectItem>
                <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cuadriciclos Grid */}
        {filteredCuadriciclos.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              No hay cuadriciclos disponibles
            </h3>
            <p className="text-gray-400">
              {statusFilter === 'disponible' 
                ? 'No hay cuadriciclos disponibles en este momento.'
                : 'No se encontraron cuadriciclos con el filtro seleccionado.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCuadriciclos.map((cuadriciclo) => (
              <CuadricicloCard key={cuadriciclo.id} cuadriciclo={cuadriciclo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CuadricicloCard({ cuadriciclo }: { cuadriciclo: Cuadriciclo }) {
  const isAvailable = cuadriciclo.estado === 'disponible';
  
  return (
    <Card className="overflow-hidden transition-transform hover:scale-105">
      <div className="aspect-video bg-gray-200 relative">
        {cuadriciclo.fotos.length > 0 ? (
          <img
            src={cuadriciclo.fotos[0]}
            alt={cuadriciclo.nombre}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl"></span>
          </div>
        )}
        <Badge 
          className={`absolute top-2 right-2 ${
            isAvailable 
              ? 'bg-green-500 hover:bg-green-600' 
              : cuadriciclo.estado === 'ocupado'
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
        >
          {cuadriciclo.estado.charAt(0).toUpperCase() + cuadriciclo.estado.slice(1)}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2">{cuadriciclo.nombre}</h3>
        <p className="text-gray-600 mb-2">
          {cuadriciclo.marca} {cuadriciclo.modelo} {cuadriciclo.año && `(${cuadriciclo.año})`}
        </p>
        <p className="text-gray-500 text-sm mb-4">{cuadriciclo.descripcion}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="h-4 w-4 mr-1" />
              Por Hora
            </div>
            <div className="text-lg font-bold">{appConfig.currency}{cuadriciclo.precio_hora}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="h-4 w-4 mr-1" />
              Por Día
            </div>
            <div className="text-lg font-bold">{appConfig.currency}{cuadriciclo.precio_dia}</div>
          </div>
        </div>

        {cuadriciclo.caracteristicas.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {cuadriciclo.caracteristicas.slice(0, 3).map((caracteristica, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {caracteristica}
                </Badge>
              ))}
              {cuadriciclo.caracteristicas.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{cuadriciclo.caracteristicas.length - 3} más
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link to={`/reservar?cuadriciclo=${cuadriciclo.id}`} className="w-full">
          <Button 
            className="w-full" 
            disabled={!isAvailable}
            variant={isAvailable ? "default" : "secondary"}
          >
            {isAvailable ? 'Reservar Ahora' : 'No Disponible'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
