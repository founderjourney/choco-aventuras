"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Eye, Trash2, Save, Image, Type, Layout } from 'lucide-react';
import { getPages, savePage, deletePage, PageContent, PageElement } from '@/lib/pageContent';
import { useToast } from '@/hooks/use-toast';

export default function AdminPaginasPage() {
  const [paginaSeleccionada, setPaginaSeleccionada] = useState<PageContent | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nuevaPagina, setNuevaPagina] = useState(false);
  const [paginas, setPaginas] = useState<PageContent[]>([]);
  const [formData, setFormData] = useState({
    titulo: '',
    slug: '',
    contenido: '',
    estado: 'borrador' as 'publicada' | 'borrador'
  });
  const [elementos, setElementos] = useState<PageElement[]>([]);
  const { toast } = useToast();

  // Cargar páginas al montar el componente
  useEffect(() => {
    setPaginas(getPages());
  }, []);

  const handleCrearPagina = () => {
    setNuevaPagina(true);
    setModoEdicion(true);
    setPaginaSeleccionada(null);
    setFormData({
      titulo: '',
      slug: '',
      contenido: '',
      estado: 'borrador'
    });
    setElementos([]);
  };

  const handleEditarPagina = (pagina: PageContent) => {
    setPaginaSeleccionada(pagina);
    setModoEdicion(true);
    setNuevaPagina(false);
    setFormData({
      titulo: pagina.titulo,
      slug: pagina.slug,
      contenido: pagina.contenido,
      estado: pagina.estado
    });
    setElementos(pagina.elementos || []);
  };

  const handleGuardarPagina = () => {
    try {
      if (nuevaPagina) {
        const nuevaPag: PageContent = {
          id: Date.now().toString(),
          titulo: formData.titulo,
          slug: formData.slug,
          contenido: formData.contenido,
          estado: formData.estado,
          fechaCreacion: new Date().toISOString(),
          ultimaModificacion: new Date().toISOString(),
          elementos: elementos
        };
        savePage(nuevaPag);
        setPaginas(getPages());
        toast({
          title: "Página creada",
          description: "La nueva página ha sido creada exitosamente."
        });
      } else if (paginaSeleccionada) {
        const paginaActualizada: PageContent = {
          ...paginaSeleccionada,
          titulo: formData.titulo,
          slug: formData.slug,
          contenido: formData.contenido,
          estado: formData.estado,
          elementos: elementos
        };
        savePage(paginaActualizada);
        setPaginas(getPages());
        toast({
          title: "Página actualizada",
          description: "Los cambios han sido guardados exitosamente."
        });
      }
      setModoEdicion(false);
      setNuevaPagina(false);
      setPaginaSeleccionada(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al guardar la página.",
        variant: "destructive"
      });
    }
  };

  const handleEliminarPagina = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta página?')) {
      try {
        deletePage(id);
        setPaginas(getPages());
        toast({
          title: "Página eliminada",
          description: "La página ha sido eliminada exitosamente."
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Hubo un problema al eliminar la página.",
          variant: "destructive"
        });
      }
    }
  };

  const agregarElemento = (tipo: 'texto' | 'imagen' | 'titulo' | 'boton') => {
    const nuevoElemento: PageElement = {
      id: Date.now().toString(),
      tipo,
      contenido: '',
      orden: elementos.length
    };
    setElementos([...elementos, nuevoElemento]);
  };

  const actualizarElemento = (id: string, contenido: string) => {
    setElementos(elementos.map(el =>
      el.id === id ? { ...el, contenido } : el
    ));
  };

  const eliminarElemento = (id: string) => {
    setElementos(elementos.filter(el => el.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-bold text-xl text-[#145A32]">
              Chocó Aventuras - CMS
            </Link>
            <nav className="flex space-x-6">
              <Link href="/admin" className="text-gray-700 hover:text-[#145A32]">
                Dashboard
              </Link>
              <Link href="/admin/paginas" className="text-[#145A32] font-semibold">
                Gestión de Páginas
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/admin" className="flex items-center gap-2 text-gray-600 hover:text-[#145A32]">
            <ArrowLeft className="h-4 w-4" />
            Volver al Panel Admin
          </Link>
        </div>

        {!modoEdicion ? (
          <>
            {/* Header con botón crear */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-[#145A32]">Gestión de Páginas</h1>
                <p className="text-gray-600 mt-2">Crea, edita y gestiona las páginas de tu sitio web</p>
              </div>
              <Button
                onClick={handleCrearPagina}
                className="bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold px-6 py-3"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nueva Página
              </Button>
            </div>

            {/* Lista de páginas */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginas.map((pagina) => (
                <Card key={pagina.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl text-[#145A32]">{pagina.titulo}</CardTitle>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        pagina.estado === 'publicada'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {pagina.estado}
                      </span>
                    </div>
                    <p className="text-gray-600">/{pagina.slug}</p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <strong>Creada:</strong> {new Date(pagina.fechaCreacion).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Modificada:</strong> {new Date(pagina.ultimaModificacion).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/${pagina.slug}`, '_blank')}
                        className="flex-1"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleEditarPagina(pagina)}
                        className="flex-1 bg-[#1565C0] hover:bg-[#1565C0]/90 text-white"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleEliminarPagina(pagina.id)}
                        className="px-3"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Editor de páginas */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-[#145A32]">
                  {nuevaPagina ? 'Nueva Página' : `Editando: ${formData.titulo}`}
                </h1>
                <p className="text-gray-600 mt-2">Editor visual de contenido</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setModoEdicion(false);
                    setNuevaPagina(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleGuardarPagina}
                  className="bg-[#145A32] hover:bg-[#145A32]/90 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Página
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Panel de configuración */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Configuración de Página</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#145A32] mb-2">
                      Título de la Página
                    </label>
                    <Input
                      value={formData.titulo}
                      onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                      placeholder="Ej: Sobre Nosotros"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#145A32] mb-2">
                      URL (Slug)
                    </label>
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      placeholder="Ej: nosotros"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#145A32] mb-2">
                      Estado
                    </label>
                    <select
                      value={formData.estado}
                      onChange={(e) => setFormData({...formData, estado: e.target.value as 'publicada' | 'borrador'})}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="borrador">Borrador</option>
                      <option value="publicada">Publicada</option>
                    </select>
                  </div>

                  <hr />

                  <div>
                    <h3 className="font-bold text-[#145A32] mb-3">Agregar Elementos</h3>
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => agregarElemento('titulo')}
                        className="w-full justify-start"
                      >
                        <Type className="h-4 w-4 mr-2" />
                        Título
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => agregarElemento('texto')}
                        className="w-full justify-start"
                      >
                        <Layout className="h-4 w-4 mr-2" />
                        Texto
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => agregarElemento('imagen')}
                        className="w-full justify-start"
                      >
                        <Image className="h-4 w-4 mr-2" />
                        Imagen
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => agregarElemento('boton')}
                        className="w-full justify-start"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Botón
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Editor de contenido */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Editor de Contenido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-[#145A32] mb-2">
                        Contenido Principal
                      </label>
                      <Textarea
                        value={formData.contenido}
                        onChange={(e) => setFormData({...formData, contenido: e.target.value})}
                        rows={6}
                        placeholder="Escribe el contenido principal de la página..."
                      />
                    </div>
                  </div>

                  {/* Elementos dinámicos */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-[#145A32]">Elementos Adicionales</h3>
                    {elementos.map((elemento) => (
                      <Card key={elemento.id} className="border-l-4 border-[#F1C40F]">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-medium text-[#145A32] capitalize">
                              {elemento.tipo}
                            </span>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => eliminarElemento(elemento.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {elemento.tipo === 'titulo' && (
                            <Input
                              value={elemento.contenido}
                              onChange={(e) => actualizarElemento(elemento.id, e.target.value)}
                              placeholder="Escribe el título..."
                            />
                          )}

                          {elemento.tipo === 'texto' && (
                            <Textarea
                              value={elemento.contenido}
                              onChange={(e) => actualizarElemento(elemento.id, e.target.value)}
                              rows={3}
                              placeholder="Escribe el texto..."
                            />
                          )}

                          {elemento.tipo === 'imagen' && (
                            <div className="space-y-2">
                              <Input
                                value={elemento.contenido}
                                onChange={(e) => actualizarElemento(elemento.id, e.target.value)}
                                placeholder="URL de la imagen..."
                              />
                              {elemento.contenido && (
                                <img
                                  src={elemento.contenido}
                                  alt="Preview"
                                  className="max-w-full h-32 object-cover rounded"
                                />
                              )}
                            </div>
                          )}

                          {elemento.tipo === 'boton' && (
                            <div className="space-y-2">
                              <Input
                                value={elemento.contenido.split('|')[0] || ''}
                                onChange={(e) => {
                                  const url = elemento.contenido.split('|')[1] || '';
                                  actualizarElemento(elemento.id, `${e.target.value}|${url}`);
                                }}
                                placeholder="Texto del botón..."
                              />
                              <Input
                                value={elemento.contenido.split('|')[1] || ''}
                                onChange={(e) => {
                                  const texto = elemento.contenido.split('|')[0] || '';
                                  actualizarElemento(elemento.id, `${texto}|${e.target.value}`);
                                }}
                                placeholder="URL del enlace..."
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}

                    {elementos.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No hay elementos adicionales. Usa el panel lateral para agregar contenido.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}