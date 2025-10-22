"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { ArrowLeft, Save, X, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';

interface Cuatrimoto {
  id: number;
  nombre: string;
  marca: string;
  modelo: string;
  año: number | null;
  color: string;
  precio_hora: number;
  precio_dia: number;
  descripcion: string | null;
  fotos: string[];
  estado: 'disponible' | 'ocupado' | 'mantenimiento';
  caracteristicas: string[];
  created_at: Date;
  updated_at: Date;
}

interface CuatriciloForm {
  nombre: string;
  marca: string;
  modelo: string;
  año: string;
  color: string;
  precio_hora: string;
  precio_dia: string;
  descripcion: string;
  estado: 'disponible' | 'ocupado' | 'mantenimiento';
  caracteristicas: string[];
  fotos: string[];
}

export default function EditarCuatrimoto() {
  const router = useRouter();
  const params = useParams();
  const cuatriciloId = params.id as string;
  const { toast } = useToast();
  const { user, isLoading: authLoading, requireAuth } = useAuth();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<CuatriciloForm>({
    nombre: '',
    marca: 'Yamaha',
    modelo: '',
    año: '',
    color: '',
    precio_hora: '',
    precio_dia: '',
    descripcion: '',
    estado: 'disponible',
    caracteristicas: [],
    fotos: []
  });

  const [newCaracteristica, setNewCaracteristica] = useState('');
  const [uploading, setUploading] = useState(false);

  const { data: cuatriciloData, isLoading: loadingCuatricilo } = useQuery({
    queryKey: ['cuatricilo', cuatriciloId],
    queryFn: async () => {
      const response = await fetch(`/api/cuadriciclos/${cuatriciloId}`);
      if (!response.ok) throw new Error('Error al cargar cuatrimoto');
      return response.json() as Promise<{cuatrimoto: Cuatrimoto}>;
    },
    enabled: !!cuatriciloId
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<Cuatrimoto>) => {
      const response = await fetch(`/api/cuadriciclos/${cuatriciloId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Error al actualizar cuatrimoto');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-cuatrimotos'] });
      queryClient.invalidateQueries({ queryKey: ['cuatricilo', cuatriciloId] });
      toast({
        title: "¡Cuatrimoto actualizada!",
        description: "Los cambios se han guardado exitosamente.",
      });
      router.push('/admin/cuadriciclos');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Hubo un problema al actualizar la cuatrimoto.",
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    if (!authLoading) {
      requireAuth();
    }
  }, [authLoading, requireAuth]);

  useEffect(() => {
    if (cuatriciloData?.cuatrimoto) {
      const cuatrimoto = cuatriciloData.cuatrimoto;
      setFormData({
        nombre: cuatrimoto.nombre,
        marca: cuatrimoto.marca,
        modelo: cuatrimoto.modelo,
        año: cuatrimoto.año ? cuatrimoto.año.toString() : '',
        color: cuatrimoto.color,
        precio_hora: cuatrimoto.precio_hora.toString(),
        precio_dia: cuatrimoto.precio_dia.toString(),
        descripcion: cuatrimoto.descripcion || '',
        estado: cuatrimoto.estado,
        caracteristicas: cuatrimoto.caracteristicas,
        fotos: cuatrimoto.fotos || []
      });
    }
  }, [cuatriciloData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!formData.nombre.trim()) {
      toast({
        title: "Error de validación",
        description: "El nombre es requerido.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.precio_hora || !formData.precio_dia) {
      toast({
        title: "Error de validación",
        description: "Los precios son requeridos.",
        variant: "destructive",
      });
      return;
    }

    const cuatriciloData = {
      ...formData,
      año: formData.año ? parseInt(formData.año) : null,
      precio_hora: parseInt(formData.precio_hora),
      precio_dia: parseInt(formData.precio_dia),
      descripcion: formData.descripcion || null,
      fotos: formData.fotos
    };

    updateMutation.mutate(cuatriciloData);
  };

  const addCaracteristica = () => {
    if (newCaracteristica.trim() && !formData.caracteristicas.includes(newCaracteristica.trim())) {
      setFormData(prev => ({
        ...prev,
        caracteristicas: [...prev.caracteristicas, newCaracteristica.trim()]
      }));
      setNewCaracteristica('');
    }
  };

  const removeCaracteristica = (index: number) => {
    setFormData(prev => ({
      ...prev,
      caracteristicas: prev.caracteristicas.filter((_, i) => i !== index)
    }));
  };

  // Función para subir foto
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
          toast({
            title: "Error",
            description: "Solo se permiten archivos de imagen.",
            variant: "destructive",
          });
          continue;
        }

        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "Error",
            description: `La imagen ${file.name} es muy grande. Máximo 5MB.`,
            variant: "destructive",
          });
          continue;
        }

        // Crear FormData para envío
        const formData = new FormData();
        formData.append('file', file);

        // Subir a servicio (por ahora simularemos con URL temporal)
        // En producción esto se conectaría a Cloudinary/AWS S3
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          setFormData(prev => ({
            ...prev,
            fotos: [...prev.fotos, imageUrl]
          }));
        };
        reader.readAsDataURL(file);
      }

      toast({
        title: "¡Fotos subidas!",
        description: "Las fotos han sido agregadas exitosamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al subir las fotos.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  // Función para remover foto
  const removeFoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index)
    }));
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'disponible': return 'text-green-600';
      case 'ocupado': return 'text-red-600';
      case 'mantenimiento': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  if (authLoading || loadingCuatricilo) {
    return <div className="p-8">Cargando cuatrimoto...</div>;
  }

  if (!user) {
    return null; // Redirecting to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-bold text-xl text-[#145A32]">
              Chocó Aventuras - Admin
            </Link>
            <nav className="flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-[#145A32]">
                Inicio
              </Link>
              <Link href="/cuadriciclos" className="text-gray-700 hover:text-[#145A32]">
                Cuatrimotos
              </Link>
              <Link href="/reservas" className="text-gray-700 hover:text-[#145A32]">
                Reservar
              </Link>
              <Link href="/admin" className="text-[#145A32] font-semibold">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/admin" className="text-gray-600 hover:text-[#145A32]">
            Panel
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/admin/cuadriciclos" className="text-gray-600 hover:text-[#145A32]">
            Cuatrimotos
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#145A32] font-medium">Editar</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#145A32]">Editar Cuatrimoto</h1>
            <p className="text-gray-600 mt-2">Modifica los datos de la cuatrimoto</p>
          </div>
          <Link href="/admin/cuadriciclos">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información Básica */}
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombre">Nombre *</Label>
                    <Input
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                      placeholder="Ej: Grizzly Rojo Edition Special"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="marca">Marca *</Label>
                    <Select value={formData.marca} onValueChange={(value) => setFormData(prev => ({ ...prev, marca: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yamaha">Yamaha</SelectItem>
                        <SelectItem value="Honda">Honda</SelectItem>
                        <SelectItem value="Suzuki">Suzuki</SelectItem>
                        <SelectItem value="Kawasaki">Kawasaki</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="modelo">Modelo *</Label>
                    <Input
                      id="modelo"
                      value={formData.modelo}
                      onChange={(e) => setFormData(prev => ({ ...prev, modelo: e.target.value }))}
                      placeholder="Ej: Grizzly 700"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="año">Año</Label>
                    <Input
                      id="año"
                      type="number"
                      value={formData.año}
                      onChange={(e) => setFormData(prev => ({ ...prev, año: e.target.value }))}
                      placeholder="Ej: 2009"
                      min="2000"
                      max={new Date().getFullYear()}
                    />
                  </div>

                  <div>
                    <Label htmlFor="color">Color *</Label>
                    <Input
                      id="color"
                      value={formData.color}
                      onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                      placeholder="Ej: Rojo"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="estado">Estado *</Label>
                    <Select value={formData.estado} onValueChange={(value: 'disponible' | 'ocupado' | 'mantenimiento') => setFormData(prev => ({ ...prev, estado: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disponible">Disponible</SelectItem>
                        <SelectItem value="ocupado">Ocupado</SelectItem>
                        <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    value={formData.descripcion}
                    onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
                    placeholder="Descripción detallada de la cuatrimoto..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Precios */}
            <Card>
              <CardHeader>
                <CardTitle>Precios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="precio_hora">Precio por Hora (COP) *</Label>
                    <Input
                      id="precio_hora"
                      type="number"
                      value={formData.precio_hora}
                      onChange={(e) => setFormData(prev => ({ ...prev, precio_hora: e.target.value }))}
                      placeholder="Ej: 150000"
                      required
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="precio_dia">Precio por Día (COP) *</Label>
                    <Input
                      id="precio_dia"
                      type="number"
                      value={formData.precio_dia}
                      onChange={(e) => setFormData(prev => ({ ...prev, precio_dia: e.target.value }))}
                      placeholder="Ej: 800000"
                      required
                      min="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Características */}
            <Card>
              <CardHeader>
                <CardTitle>Características</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newCaracteristica}
                    onChange={(e) => setNewCaracteristica(e.target.value)}
                    placeholder="Agregar nueva característica..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCaracteristica())}
                  />
                  <Button type="button" onClick={addCaracteristica} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.caracteristicas.map((caracteristica, index) => (
                    <div key={index} className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      <span>{caracteristica}</span>
                      <button
                        type="button"
                        onClick={() => removeCaracteristica(index)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {formData.caracteristicas.length === 0 && (
                  <p className="text-sm text-gray-500">No hay características agregadas</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Fotos y Acciones */}
          <div className="space-y-6">
            {/* Gestión de Fotos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Fotos de la Cuatrimoto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Upload de fotos */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Agregar Fotos:</Label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Clic para subir</span> o arrastra fotos aquí
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, JPEG (máx. 5MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                      />
                    </label>
                  </div>
                  {uploading && (
                    <p className="text-sm text-gray-500 text-center">Subiendo fotos...</p>
                  )}
                </div>

                {/* Galería de fotos */}
                {formData.fotos.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Fotos agregadas ({formData.fotos.length}):</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {formData.fotos.map((foto, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={foto}
                            alt={`Foto ${index + 1}`}
                            className="w-full h-20 object-cover rounded border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeFoto(index)}
                            className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {formData.fotos.length === 0 && (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    No hay fotos agregadas
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Vista Previa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Nombre:</span>
                    <p className="text-gray-600">{formData.nombre || 'Sin nombre'}</p>
                  </div>

                  <div>
                    <span className="font-medium">Vehículo:</span>
                    <p className="text-gray-600">{formData.marca} {formData.modelo} {formData.año}</p>
                  </div>

                  <div>
                    <span className="font-medium">Estado:</span>
                    <p className={getEstadoColor(formData.estado)}>{formData.estado}</p>
                  </div>

                  <div>
                    <span className="font-medium">Precios:</span>
                    <p className="text-gray-600">
                      ${parseInt(formData.precio_hora || '0').toLocaleString()}/hora<br />
                      ${parseInt(formData.precio_dia || '0').toLocaleString()}/día
                    </p>
                  </div>

                  {formData.caracteristicas.length > 0 && (
                    <div>
                      <span className="font-medium">Características:</span>
                      <ul className="text-gray-600 text-xs mt-1">
                        {formData.caracteristicas.map((car, index) => (
                          <li key={index}>• {car}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {formData.fotos.length > 0 && (
                    <div className="text-sm">
                      <span className="font-medium">Fotos:</span>
                      <div className="mt-2 grid grid-cols-2 gap-1">
                        {formData.fotos.slice(0, 4).map((foto, index) => (
                          <img
                            key={index}
                            src={foto}
                            alt={`Foto ${index + 1}`}
                            className="w-full h-12 object-cover rounded border"
                          />
                        ))}
                        {formData.fotos.length > 4 && (
                          <div className="flex items-center justify-center h-12 bg-gray-100 rounded border text-xs text-gray-500">
                            +{formData.fotos.length - 4} más
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Acciones */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-[#145A32] hover:bg-[#0f4428]"
                  disabled={updateMutation.isPending}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {updateMutation.isPending ? 'Guardando...' : 'Guardar Cambios'}
                </Button>

                <Link href="/admin/cuadriciclos" className="block">
                  <Button variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}