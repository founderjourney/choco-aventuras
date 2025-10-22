"use client";

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { ArrowLeft, Save, X, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

interface Paseo {
  id: number;
  nombre: string;
  descripcion: string;
  duracion_horas: number;
  precio: number;
  dificultad: 'facil' | 'intermedio' | 'dificil';
  ubicacion: string;
  incluye: string[];
  fotos: string[];
  activo: boolean;
  created_at: Date;
  updated_at: Date;
}

interface PaseoForm {
  nombre: string;
  descripcion: string;
  duracion_horas: string;
  precio: string;
  dificultad: 'facil' | 'intermedio' | 'dificil';
  ubicacion: string;
  incluye: string[];
  fotos: string[];
  activo: boolean;
}

async function fetchPaseo(id: string): Promise<{paseo: Paseo}> {
  const response = await fetch(`/api/paseos/${id}`);
  if (!response.ok) throw new Error('Error fetching paseo');
  return response.json();
}

async function updatePaseo(id: string, data: any) {
  const response = await fetch(`/api/paseos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error updating paseo');
  return response.json();
}

const INCLUYE_SUGERENCIAS = [
  'Guía experto', 'Casco de seguridad', 'Equipo de protección completo',
  'Seguro de accidentes', 'Almuerzo típico', 'Refrigerios', 'Agua',
  'Transporte', 'Fotografías', 'Certificado de participación',
  'Kit de primeros auxilios', 'Instructor especializado', 'Equipo técnico'
];

export default function EditarPaseo() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user, isLoading: authLoading, requireAuth } = useAuth();

  const paseoId = params.id as string;

  const [formData, setFormData] = useState<PaseoForm>({
    nombre: '',
    descripcion: '',
    duracion_horas: '',
    precio: '',
    dificultad: 'facil',
    ubicacion: '',
    incluye: [],
    fotos: [],
    activo: true
  });

  const [newIncluye, setNewIncluye] = useState('');
  const [uploading, setUploading] = useState(false);

  const { data: paseoData, isLoading: loadingPaseo } = useQuery({
    queryKey: ['paseo', paseoId],
    queryFn: () => fetchPaseo(paseoId),
    enabled: !!paseoId
  });

  useEffect(() => {
    if (!authLoading) {
      requireAuth();
    }
  }, [authLoading, requireAuth]);

  useEffect(() => {
    if (paseoData?.paseo) {
      const paseo = paseoData.paseo;
      setFormData({
        nombre: paseo.nombre,
        descripcion: paseo.descripcion,
        duracion_horas: paseo.duracion_horas.toString(),
        precio: paseo.precio.toString(),
        dificultad: paseo.dificultad,
        ubicacion: paseo.ubicacion,
        incluye: paseo.incluye,
        fotos: paseo.fotos || [],
        activo: paseo.activo
      });
    }
  }, [paseoData]);

  const updateMutation = useMutation({
    mutationFn: (data: any) => updatePaseo(paseoId, data),
    onSuccess: () => {
      toast({
        title: "¡Paseo actualizado!",
        description: "El paseo ha sido actualizado exitosamente.",
      });
      queryClient.invalidateQueries({ queryKey: ['admin-paseos'] });
      queryClient.invalidateQueries({ queryKey: ['paseo', paseoId] });
      router.push('/admin/paseos');
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Hubo un problema al actualizar el paseo.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.descripcion || !formData.duracion_horas ||
        !formData.precio || !formData.ubicacion) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    const paseoData = {
      ...formData,
      duracion_horas: parseInt(formData.duracion_horas),
      precio: parseInt(formData.precio),
      fotos: formData.fotos // Incluir fotos
    };

    updateMutation.mutate(paseoData);
  };

  const addIncluye = (item: string) => {
    if (item && !formData.incluye.includes(item)) {
      setFormData(prev => ({
        ...prev,
        incluye: [...prev.incluye, item]
      }));
    }
  };

  const removeIncluye = (item: string) => {
    setFormData(prev => ({
      ...prev,
      incluye: prev.incluye.filter(i => i !== item)
    }));
  };

  const addCustomIncluye = () => {
    if (newIncluye.trim()) {
      addIncluye(newIncluye.trim());
      setNewIncluye('');
    }
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

  const getDificultadColor = (dificultad: string) => {
    switch (dificultad) {
      case 'facil': return 'text-green-600';
      case 'intermedio': return 'text-yellow-600';
      case 'dificil': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (authLoading || loadingPaseo) {
    return <div className="p-8">Cargando...</div>;
  }

  if (!user) {
    return null;
  }

  if (!paseoData?.paseo) {
    return <div className="p-8">Paseo no encontrado</div>;
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
            <div className="flex items-center space-x-6">
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
              <span className="text-sm text-gray-600">Hola, {user.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/admin" className="text-gray-600 hover:text-[#145A32]">
            Admin
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/admin/paseos" className="text-gray-600 hover:text-[#145A32]">
            Paseos
          </Link>
          <span className="text-gray-400">/</span>
          <Link href={`/admin/paseos/${paseoId}`} className="text-gray-600 hover:text-[#145A32]">
            {paseoData.paseo.nombre}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#1565C0]">Editar</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1565C0]">Editar Paseo</h1>
            <p className="text-gray-600 mt-2">Modifica la información de la experiencia</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/admin/paseos/${paseoId}`}>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
            </Link>
          </div>
        </div>

        {/* Form */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Información del Paseo</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Información Básica */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="nombre">Nombre del Paseo *</Label>
                      <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData(prev => ({...prev, nombre: e.target.value}))}
                        placeholder="Ej: Aventura en la Selva Tropical"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duracion">Duración (horas) *</Label>
                      <Input
                        id="duracion"
                        type="number"
                        value={formData.duracion_horas}
                        onChange={(e) => setFormData(prev => ({...prev, duracion_horas: e.target.value}))}
                        placeholder="3"
                        min="1"
                        max="12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="precio">Precio (COP) *</Label>
                      <Input
                        id="precio"
                        type="number"
                        value={formData.precio}
                        onChange={(e) => setFormData(prev => ({...prev, precio: e.target.value}))}
                        placeholder="200000"
                        min="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dificultad">Nivel de Dificultad *</Label>
                      <Select value={formData.dificultad} onValueChange={(value: 'facil' | 'intermedio' | 'dificil') => setFormData(prev => ({...prev, dificultad: value}))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="facil">
                            <span className="text-green-600">🟢 Fácil</span>
                          </SelectItem>
                          <SelectItem value="intermedio">
                            <span className="text-yellow-600">🟡 Intermedio</span>
                          </SelectItem>
                          <SelectItem value="dificil">
                            <span className="text-red-600"> Difícil</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ubicacion">Ubicación *</Label>
                      <Input
                        id="ubicacion"
                        value={formData.ubicacion}
                        onChange={(e) => setFormData(prev => ({...prev, ubicacion: e.target.value}))}
                        placeholder="Ej: Bosque Nacional del Chocó"
                      />
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="space-y-2">
                    <Label htmlFor="descripcion">Descripción *</Label>
                    <Textarea
                      id="descripcion"
                      value={formData.descripcion}
                      onChange={(e) => setFormData(prev => ({...prev, descripcion: e.target.value}))}
                      placeholder="Describe la experiencia, qué verán los aventureros, qué actividades incluye..."
                      rows={4}
                    />
                  </div>

                  {/* Estado */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="activo"
                      checked={formData.activo}
                      onCheckedChange={(checked) => setFormData(prev => ({...prev, activo: checked as boolean}))}
                    />
                    <Label htmlFor="activo" className="text-sm">
                      Paseo activo (disponible para reservas)
                    </Label>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-6">
                    <Button
                      type="submit"
                      className="bg-[#1565C0] hover:bg-[#0d47a1] flex items-center gap-2"
                      disabled={updateMutation.isPending}
                    >
                      <Save className="h-4 w-4" />
                      {updateMutation.isPending ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                    <Link href="/admin/paseos">
                      <Button variant="outline" className="flex items-center gap-2">
                        <X className="h-4 w-4" />
                        Cancelar
                      </Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Fotos e Incluye */}
          <div className="space-y-6">
            {/* Gestión de Fotos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Fotos del Paseo
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

            {/* Qué Incluye */}
            <Card>
              <CardHeader>
                <CardTitle>¿Qué Incluye?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items seleccionados */}
                {formData.incluye.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Incluido:</Label>
                    {formData.incluye.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded border">
                        <span className="text-sm">{item}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeIncluye(item)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sugerencias */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Sugerencias:</Label>
                  <div className="grid grid-cols-1 gap-1">
                    {INCLUYE_SUGERENCIAS.filter(item => !formData.incluye.includes(item)).map((item) => (
                      <Button
                        key={item}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addIncluye(item)}
                        className="justify-start text-xs h-8"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        {item}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Agregar personalizado */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Agregar personalizado:</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newIncluye}
                      onChange={(e) => setNewIncluye(e.target.value)}
                      placeholder="Ej: Equipo especializado"
                      className="text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomIncluye())}
                    />
                    <Button
                      type="button"
                      onClick={addCustomIncluye}
                      size="sm"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Vista Previa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold">{formData.nombre || 'Nombre del Paseo'}</h3>
                    <p className="text-sm text-gray-600">{formData.descripcion || 'Descripción del paseo...'}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <span className={getDificultadColor(formData.dificultad)}>
                      {formData.dificultad}
                    </span>
                    <span>{formData.duracion_horas}h</span>
                    <span className="font-semibold">${parseInt(formData.precio || '0').toLocaleString()}</span>
                  </div>

                  <div className="text-sm">
                    <span className="font-medium">Ubicación:</span> {formData.ubicacion || 'Por definir'}
                  </div>

                  <div className="text-sm">
                    <span className="font-medium">Estado:</span>
                    <span className={formData.activo ? 'text-green-600' : 'text-red-600'}>
                      {formData.activo ? ' Activo' : ' Inactivo'}
                    </span>
                  </div>

                  {formData.incluye.length > 0 && (
                    <div className="text-sm">
                      <span className="font-medium">Incluye:</span>
                      <ul className="mt-1 space-y-1">
                        {formData.incluye.slice(0, 3).map((item, index) => (
                          <li key={index} className="text-xs text-gray-600">• {item}</li>
                        ))}
                        {formData.incluye.length > 3 && (
                          <li className="text-xs text-gray-500">+ {formData.incluye.length - 3} más...</li>
                        )}
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
          </div>
        </div>
      </div>
    </div>
  );
}