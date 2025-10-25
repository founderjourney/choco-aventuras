"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Eye, Trash2, Save, Image, Type, Layout, HelpCircle, GalleryHorizontal } from 'lucide-react';
import { getPages, savePage, deletePage, PageContent, PageElement, FAQ, GalleryItem } from '@/lib/pageContent';
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
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [homepageSections, setHomepageSections] = useState<any>({});
  const [nosotrosSections, setNosotrosSections] = useState<any>({});
  const [cuatrimotosSections, setCuatrimotosSections] = useState<any>({});
  const [experienciasSections, setExperienciasSections] = useState<any>({});
  const [contactoSections, setContactoSections] = useState<any>({});
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('bloque1');

  useEffect(() => {
    if (paginaSeleccionada) {
      setActiveTab('bloque1');
    }
  }, [paginaSeleccionada]);

  // Detectar el tipo de página que estamos editando
  const isHomepage = paginaSeleccionada?.slug === 'homepage';
  const isNosotros = paginaSeleccionada?.slug === 'nosotros';
  const isCuatrimotos = paginaSeleccionada?.slug === 'cuatrimotos';
  const isExperiencias = paginaSeleccionada?.slug === 'experiencias';
  const isContacto = paginaSeleccionada?.slug === 'contacto';

  // Cargar páginas al montar el componente
  useEffect(() => {
    const loadPaginas = async () => {
      try {
        const paginasData = await getPages();
        setPaginas(paginasData);
      } catch (error) {
        console.error('Error loading pages:', error);
        setPaginas([]);
        toast({
          title: "Error",
          description: "No se pudieron cargar las páginas",
          variant: "destructive"
        });
      }
    };

    loadPaginas();
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
    setFaqs([]);
    setGallery([]);
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
    setFaqs(pagina.faqs || []);
    setGallery(pagina.gallery || []);

    // 🚀 Cargar secciones específicas de homepage
    if (pagina.slug === 'homepage' && pagina.sections) {
      setHomepageSections(pagina.sections);
    }

    // 🚀 Cargar secciones específicas de nosotros
    if (pagina.slug === 'nosotros' && pagina.nosotros_sections) {
      setNosotrosSections(pagina.nosotros_sections);
    }

    // 🚀 Cargar secciones específicas de cuatrimotos
    if (pagina.slug === 'cuatrimotos' && pagina.cuatrimotos_sections) {
      setCuatrimotosSections(pagina.cuatrimotos_sections);
    }

    // 🚀 Cargar secciones específicas de experiencias
    if (pagina.slug === 'experiencias' && pagina.experiencias_sections) {
      setExperienciasSections(pagina.experiencias_sections);
    }

    // 🚀 Cargar secciones específicas de contacto
    if (pagina.slug === 'contacto' && pagina.contacto_sections) {
      setContactoSections(pagina.contacto_sections);
    }
  };

  const handleGuardarPagina = async () => {
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
          elementos: elementos,
          faqs: faqs,
          gallery: gallery
        };
        await savePage(nuevaPag);
        const paginasData = await getPages();
        setPaginas(paginasData);
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
          elementos: elementos,
          faqs: faqs,
          gallery: gallery,
          // 🚀 Guardar secciones específicas de homepage
          ...(paginaSeleccionada.slug === 'homepage' && { sections: homepageSections }),
          // 🚀 Guardar secciones específicas de nosotros
          ...(paginaSeleccionada.slug === 'nosotros' && { nosotros_sections: nosotrosSections }),
          // 🚀 Guardar secciones específicas de cuatrimotos
          ...(paginaSeleccionada.slug === 'cuatrimotos' && { cuatrimotos_sections: cuatrimotosSections }),
          // 🚀 Guardar secciones específicas de experiencias
          ...(paginaSeleccionada.slug === 'experiencias' && { experiencias_sections: experienciasSections }),
          // 🚀 Guardar secciones específicas de contacto
          ...(paginaSeleccionada.slug === 'contacto' && { contacto_sections: contactoSections })
        };
        await savePage(paginaActualizada);
        const paginasData = await getPages();
        setPaginas(paginasData);
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

  const handleEliminarPagina = async (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta página?')) {
      try {
        await deletePage(id);
        const paginasData = await getPages();
        setPaginas(paginasData);
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

  const agregarFaq = () => {
    const nuevaFaq: FAQ = {
      id: Date.now().toString(),
      question: '',
      answer: ''
    };
    setFaqs([...faqs, nuevaFaq]);
  };

  const actualizarFaq = (id: string, field: 'question' | 'answer', value: string) => {
    setFaqs(faqs.map(faq =>
      faq.id === id ? { ...faq, [field]: value } : faq
    ));
  };

  const eliminarFaq = (id: string) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  const agregarGalleryItem = () => {
    const nuevoItem: GalleryItem = {
      id: Date.now().toString(),
      imageUrl: '',
      title: '',
      description: ''
    };
    setGallery([...gallery, nuevoItem]);
  };

  const actualizarGalleryItem = (id: string, field: 'imageUrl' | 'title' | 'description', value: string) => {
    setGallery(gallery.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const eliminarGalleryItem = (id: string) => {
    setGallery(gallery.filter(item => item.id !== id));
  };

  // 🚀 Funciones para actualizar secciones de homepage
  const updateHomepageSection = (sectionKey: string, field: string, value: any) => {
    setHomepageSections((prev: any) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: value
      }
    }));
  };

  const updateHomepageSectionNested = (sectionKey: string, nestedKey: string, field: string, value: any) => {
    setHomepageSections((prev: any) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [nestedKey]: {
          ...prev[sectionKey]?.[nestedKey],
          [field]: value
        }
      }
    }));
  };

  // 🚀 Funciones para actualizar secciones de nosotros
  const updateNosotrosSection = (sectionKey: string, field: string, value: any) => {
    setNosotrosSections((prev: any) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: value
      }
    }));
  };

  const updateNosotrosSectionArray = (sectionKey: string, field: string, index: number, value: any) => {
    setNosotrosSections((prev: any) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: prev[sectionKey]?.[field]?.map((item: any, i: number) =>
          i === index ? value : item
        ) || []
      }
    }));
  };

  // 🚀 Funciones para actualizar secciones de cuatrimotos
  const updateCuatrimotosSection = (sectionKey: string, field: string, value: any) => {
    setCuatrimotosSections((prev: any) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: value
      }
    }));
  };

  const updateCuatrimotosSectionNested = (sectionKey: string, nestedKey: string, field: string, value: any) => {
    setCuatrimotosSections((prev: any) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [nestedKey]: {
          ...prev[sectionKey]?.[nestedKey],
          [field]: value
        }
      }
    }));
  };

  const updateCuatrimotosSectionArray = (sectionKey: string, field: string, index: number, value: any) => {
    setCuatrimotosSections((prev: any) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: prev[sectionKey]?.[field]?.map((item: any, i: number) =>
          i === index ? value : item
        ) || []
      }
    }));
  };

  // 🚀 Funciones para actualizar secciones de experiencias
  const updateExperienciasSection = (sectionKey: string, field: string, value: any) => {
    setExperienciasSections((prev: any) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: value
      }
    }));
  };

  const updateExperienciasSectionNested = (sectionKey: string, nestedKey: string, field: string, value: any) => {
    setExperienciasSections((prev: any) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [nestedKey]: {
          ...prev[sectionKey]?.[nestedKey],
          [field]: value
        }
      }
    }));
  };

  const updateExperienciasSectionArray = (sectionKey: string, field: string, index: number, value: any) => {
    setExperienciasSections((prev: any) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: prev[sectionKey]?.[field]?.map((item: any, i: number) =>
          i === index ? value : item
        ) || []
      }
    }));
  };

  // 🚀 Funciones para actualizar secciones de contacto
  const updateContactoSection = (sectionKey: string, field: string, value: any) => {
    setContactoSections((prev: any) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: value
      }
    }));
  };

  const updateContactoSectionNested = (sectionKey: string, nestedKey: string, field: string, value: any) => {
    setContactoSections((prev: any) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [nestedKey]: {
          ...prev[sectionKey]?.[nestedKey],
          [field]: value
        }
      }
    }));
  };

  const updateContactoSectionArray = (sectionKey: string, field: string, index: number, value: any) => {
    setContactoSections((prev: any) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: prev[sectionKey]?.[field]?.map((item: any, i: number) =>
          i === index ? value : item
        ) || []
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/" className="font-bold text-base sm:text-xl text-[#145A32] truncate">
              Chocó Aventuras - CMS
            </Link>
            <nav className="flex space-x-3 sm:space-x-6">
              <Link href="/admin" className="text-gray-700 hover:text-[#145A32] text-sm">
                Dashboard
              </Link>
              <Link href="/admin/paginas" className="text-[#145A32] font-semibold text-sm">
                <span className="hidden sm:inline">Gestión de </span>Páginas
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <Link href="/admin" className="flex items-center gap-2 text-gray-600 hover:text-[#145A32] text-sm">
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Volver al </span>Panel Admin
          </Link>
        </div>

        {!modoEdicion ? (
          <>
            {/* Header con botón crear */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
              <div className="flex-1">
                <h1 className="text-xl sm:text-3xl font-bold text-[#145A32]">Gestión de Páginas</h1>
                <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Crea, edita y gestiona las páginas de tu sitio web</p>
              </div>
              <Button
                onClick={handleCrearPagina}
                className="bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Nueva Página
              </Button>
            </div>

            {/* Lista de páginas */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {paginas.map((pagina) => (
                <Card key={pagina.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-base sm:text-xl text-[#145A32] truncate flex-1">{pagina.titulo}</CardTitle>
                      <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                        pagina.estado === 'publicada'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {pagina.estado}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm truncate">/{pagina.slug}</p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                      <p className="text-xs sm:text-sm text-gray-600">
                        <strong>Creada:</strong> {new Date(pagina.fechaCreacion).toLocaleDateString()}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        <strong>Modificada:</strong> {new Date(pagina.ultimaModificacion).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/${pagina.slug}`, '_blank')}
                        className="flex-1 text-xs sm:text-sm"
                      >
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Ver
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleEditarPagina(pagina)}
                        className="flex-1 bg-[#1565C0] hover:bg-[#1565C0]/90 text-white text-xs sm:text-sm"
                      >
                        <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleEliminarPagina(pagina.id)}
                        className="px-2 sm:px-3 sm:flex-initial"
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
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
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
              <div className="flex-1">
                <h1 className="text-xl sm:text-3xl font-bold text-[#145A32] truncate">
                  {nuevaPagina ? 'Nueva Página' : `Editando: ${formData.titulo}`}
                </h1>
                <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Editor visual de contenido</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setModoEdicion(false);
                    setNuevaPagina(false);
                  }}
                  className="text-sm sm:text-base"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleGuardarPagina}
                  className="bg-[#145A32] hover:bg-[#145A32]/90 text-white text-sm sm:text-base"
                >
                  <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Guardar Página
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
              {/* Panel de configuración */}
              <Card className="lg:col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">Configuración de Página</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 pt-0">
                  <div>
                    <label className="block text-sm font-medium text-[#145A32] mb-2">
                      Título de la Página
                    </label>
                    <Input
                      value={formData.titulo}
                      onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                      placeholder="Ej: Sobre Nosotros"
                      className="text-sm"
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
                      className="text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#145A32] mb-2">
                      Estado
                    </label>
                    <select
                      value={formData.estado}
                      onChange={(e) => setFormData({...formData, estado: e.target.value as 'publicada' | 'borrador'})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="borrador">Borrador</option>
                      <option value="publicada">Publicada</option>
                    </select>
                  </div>

                  <hr />

                  <div>
                    <h3 className="font-bold text-[#145A32] mb-2 sm:mb-3 text-sm sm:text-base">Agregar Elementos</h3>
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => agregarElemento('titulo')}
                        className="w-full justify-start text-xs sm:text-sm"
                      >
                        <Type className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Título
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => agregarElemento('texto')}
                        className="w-full justify-start text-xs sm:text-sm"
                      >
                        <Layout className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Texto
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => agregarElemento('imagen')}
                        className="w-full justify-start text-xs sm:text-sm"
                      >
                        <Image className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Imagen
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => agregarElemento('boton')}
                        className="w-full justify-start text-xs sm:text-sm"
                      >
                        <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Botón
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Editor de contenido */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">
                    {isHomepage ? '🎯 Editor de Bloques - Página de Inicio' :
                     isNosotros ? '📋 Editor de Bloques - Página Nosotros' :
                     'Editor de Contenido'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isHomepage ? (
                    // 🚀 EDITOR ESPECÍFICO PARA HOMEPAGE CON 8 BLOQUES
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <div className="md:hidden mb-4">
                        <Select onValueChange={setActiveTab} value={activeTab}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar bloque" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bloque1">🎬 Hero</SelectItem>
                            <SelectItem value="bloque2">🎥 Explora</SelectItem>
                            <SelectItem value="bloque3">🎯 Servicios</SelectItem>
                            <SelectItem value="bloque4">🏍️ Vehículos</SelectItem>
                            <SelectItem value="bloque5">📱 Redes</SelectItem>
                            <SelectItem value="bloque6">📝 Formulario</SelectItem>
                            <SelectItem value="bloque7">💪 CTA</SelectItem>
                            <SelectItem value="bloque8">✨ Animado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <TabsList className="hidden md:grid w-full grid-cols-4 lg:grid-cols-8">
                        <TabsTrigger value="bloque1">🎬 Hero</TabsTrigger>
                        <TabsTrigger value="bloque2">🎥 Explora</TabsTrigger>
                        <TabsTrigger value="bloque3">🎯 Servicios</TabsTrigger>
                        <TabsTrigger value="bloque4">🏍️ Vehículos</TabsTrigger>
                        <TabsTrigger value="bloque5">📱 Redes</TabsTrigger>
                        <TabsTrigger value="bloque6">📝 Formulario</TabsTrigger>
                        <TabsTrigger value="bloque7">💪 CTA</TabsTrigger>
                        <TabsTrigger value="bloque8">✨ Animado</TabsTrigger>
                      </TabsList>

                      {/* BLOQUE 1: HERO PRINCIPAL */}
                      <TabsContent value="bloque1" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">🎬 BLOQUE 1: Hero Principal</h3>
                        <p className="text-sm text-gray-600">Video superior con título principal</p>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Video URL (YouTube)</label>
                            <Input
                              value={homepageSections.bloque1_hero?.video_url || ''}
                              onChange={(e) => updateHomepageSection('bloque1_hero', 'video_url', e.target.value)}
                              placeholder="https://www.youtube.com/embed/..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Texto de Bienvenida</label>
                            <Input
                              value={homepageSections.bloque1_hero?.welcome_text || ''}
                              onChange={(e) => updateHomepageSection('bloque1_hero', 'welcome_text', e.target.value)}
                              placeholder="- Bienvenido -"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Título Principal</label>
                            <Textarea
                              value={homepageSections.bloque1_hero?.title || ''}
                              onChange={(e) => updateHomepageSection('bloque1_hero', 'title', e.target.value)}
                              placeholder="CHOCÓ\nAVENTURAS"
                              rows={2}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Subtítulo</label>
                            <Input
                              value={homepageSections.bloque1_hero?.subtitle || ''}
                              onChange={(e) => updateHomepageSection('bloque1_hero', 'subtitle', e.target.value)}
                              placeholder="Dispara, acelera y conquista la aventura"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Texto del Botón</label>
                            <Input
                              value={homepageSections.bloque1_hero?.button_text || ''}
                              onChange={(e) => updateHomepageSection('bloque1_hero', 'button_text', e.target.value)}
                              placeholder="Reservar"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      {/* BLOQUE 2: HERO SECUNDARIO */}
                      <TabsContent value="bloque2" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">🎥 BLOQUE 2: Hero Secundario</h3>
                        <p className="text-sm text-gray-600">Sección "EXPLORA" con video de fondo</p>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Video URL (YouTube)</label>
                            <Input
                              value={homepageSections.bloque2_hero_secondary?.video_url || ''}
                              onChange={(e) => updateHomepageSection('bloque2_hero_secondary', 'video_url', e.target.value)}
                              placeholder="https://www.youtube.com/embed/..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Título</label>
                            <Input
                              value={homepageSections.bloque2_hero_secondary?.title || ''}
                              onChange={(e) => updateHomepageSection('bloque2_hero_secondary', 'title', e.target.value)}
                              placeholder="EXPLORA ELIGE Y VIVE LA ACCIÓN"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Subtítulo</label>
                            <Textarea
                              value={homepageSections.bloque2_hero_secondary?.subtitle || ''}
                              onChange={(e) => updateHomepageSection('bloque2_hero_secondary', 'subtitle', e.target.value)}
                              placeholder="Cuatrimotos y paintball en el corazón del Chocó..."
                              rows={2}
                            />
                          </div>
                        </div>
                      </TabsContent>

                      {/* BLOQUE 3: SERVICIOS */}
                      <TabsContent value="bloque3" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">🎯 BLOQUE 3: Servicios</h3>
                        <p className="text-sm text-gray-600">Tarjetas flip de Cuatrimotos y Paintball</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Cuatrimotos */}
                          <div className="border rounded-lg p-4">
                            <h4 className="font-semibold text-green-600 mb-3">Cuatrimotos</h4>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-sm font-medium mb-1">Título</label>
                                <Input
                                  value={homepageSections.bloque3_services?.cuatrimotos?.title || ''}
                                  onChange={(e) => updateHomepageSectionNested('bloque3_services', 'cuatrimotos', 'title', e.target.value)}
                                  placeholder="RUTAS EN CUATRIMOTO"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Subtítulo</label>
                                <Input
                                  value={homepageSections.bloque3_services?.cuatrimotos?.subtitle || ''}
                                  onChange={(e) => updateHomepageSectionNested('bloque3_services', 'cuatrimotos', 'subtitle', e.target.value)}
                                  placeholder="Aventura en la selva tropical"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Imagen URL</label>
                                <Input
                                  value={homepageSections.bloque3_services?.cuatrimotos?.image || ''}
                                  onChange={(e) => updateHomepageSectionNested('bloque3_services', 'cuatrimotos', 'image', e.target.value)}
                                  placeholder="/choco-aventuras-hero.jpg"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Paintball */}
                          <div className="border rounded-lg p-4">
                            <h4 className="font-semibold text-orange-600 mb-3">Paintball</h4>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-sm font-medium mb-1">Título</label>
                                <Input
                                  value={homepageSections.bloque3_services?.paintball?.title || ''}
                                  onChange={(e) => updateHomepageSectionNested('bloque3_services', 'paintball', 'title', e.target.value)}
                                  placeholder="BATALLAS DE PAINTBALL"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Subtítulo</label>
                                <Input
                                  value={homepageSections.bloque3_services?.paintball?.subtitle || ''}
                                  onChange={(e) => updateHomepageSectionNested('bloque3_services', 'paintball', 'subtitle', e.target.value)}
                                  placeholder="Combate con adrenalina pura"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Estado</label>
                                <select
                                  value={homepageSections.bloque3_services?.paintball?.enabled ? 'true' : 'false'}
                                  onChange={(e) => updateHomepageSectionNested('bloque3_services', 'paintball', 'enabled', e.target.value === 'true')}
                                  className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                  <option value="false">Próximamente</option>
                                  <option value="true">Activo</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      {/* BLOQUE 4: VEHÍCULOS */}
                      <TabsContent value="bloque4" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">🏍️ BLOQUE 4: Vehículos</h3>
                        <p className="text-sm text-gray-600">Sección que muestra los cuatrimotos (ya sincronizada automáticamente)</p>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Título de Sección</label>
                            <Textarea
                              value={homepageSections.bloque4_vehicles?.section_title || ''}
                              onChange={(e) => updateHomepageSection('bloque4_vehicles', 'section_title', e.target.value)}
                              placeholder="CHOCÓ\nCUATRIMOTOS"
                              rows={2}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Subtítulo de Sección</label>
                            <Input
                              value={homepageSections.bloque4_vehicles?.section_subtitle || ''}
                              onChange={(e) => updateHomepageSection('bloque4_vehicles', 'section_subtitle', e.target.value)}
                              placeholder="Vive la aventura, siente la adrenalina."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Cantidad de Vehículos a Mostrar</label>
                            <Input
                              type="number"
                              value={homepageSections.bloque4_vehicles?.vehicles_to_show || 3}
                              onChange={(e) => updateHomepageSection('bloque4_vehicles', 'vehicles_to_show', parseInt(e.target.value))}
                              placeholder="3"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      {/* OTROS BLOQUES - Continuaré en el siguiente fragmento... */}
                      <TabsContent value="bloque5" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">📱 BLOQUE 5: Redes Sociales</h3>
                        <p className="text-sm text-gray-600">Acordeón de redes sociales</p>

                        <div className="grid grid-cols-1 gap-4">
                          {/* Instagram */}
                          <div className="border rounded-lg p-4">
                            <h4 className="font-semibold text-pink-600 mb-3">Instagram</h4>
                            <div className="space-y-2">
                              <Input
                                placeholder="URL de Instagram"
                                value={homepageSections.bloque5_social_media?.instagram?.url || ''}
                                onChange={(e) => updateHomepageSectionNested('bloque5_social_media', 'instagram', 'url', e.target.value)}
                              />
                              <Input
                                placeholder="Texto del panel"
                                value={homepageSections.bloque5_social_media?.instagram?.text || ''}
                                onChange={(e) => updateHomepageSectionNested('bloque5_social_media', 'instagram', 'text', e.target.value)}
                              />
                            </div>
                          </div>

                          {/* YouTube */}
                          <div className="border rounded-lg p-4">
                            <h4 className="font-semibold text-red-600 mb-3">YouTube</h4>
                            <div className="space-y-2">
                              <Input
                                placeholder="URL de YouTube"
                                value={homepageSections.bloque5_social_media?.youtube?.url || ''}
                                onChange={(e) => updateHomepageSectionNested('bloque5_social_media', 'youtube', 'url', e.target.value)}
                              />
                              <Input
                                placeholder="Texto del panel"
                                value={homepageSections.bloque5_social_media?.youtube?.text || ''}
                                onChange={(e) => updateHomepageSectionNested('bloque5_social_media', 'youtube', 'text', e.target.value)}
                              />
                            </div>
                          </div>

                          {/* Facebook */}
                          <div className="border rounded-lg p-4">
                            <h4 className="font-semibold text-blue-600 mb-3">Facebook</h4>
                            <div className="space-y-2">
                              <Input
                                placeholder="URL de Facebook"
                                value={homepageSections.bloque5_social_media?.facebook?.url || ''}
                                onChange={(e) => updateHomepageSectionNested('bloque5_social_media', 'facebook', 'url', e.target.value)}
                              />
                              <Input
                                placeholder="Texto del panel"
                                value={homepageSections.bloque5_social_media?.facebook?.text || ''}
                                onChange={(e) => updateHomepageSectionNested('bloque5_social_media', 'facebook', 'text', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="bloque6" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">📝 BLOQUE 6: Formulario</h3>
                        <p className="text-sm text-gray-600">Formulario multi-step de contacto</p>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Título del Formulario</label>
                            <Input
                              value={homepageSections.bloque6_form?.title || ''}
                              onChange={(e) => updateHomepageSection('bloque6_form', 'title', e.target.value)}
                              placeholder="Dudas sobre nuestros paseos"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Subtítulo</label>
                            <Input
                              value={homepageSections.bloque6_form?.subtitle || ''}
                              onChange={(e) => updateHomepageSection('bloque6_form', 'subtitle', e.target.value)}
                              placeholder="Queremos que vivas la aventura con total seguridad."
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="bloque7" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">💪 BLOQUE 7: CTA WhatsApp</h3>
                        <p className="text-sm text-gray-600">Sección verde de llamada a la acción</p>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Título</label>
                            <Textarea
                              value={homepageSections.bloque7_cta?.title || ''}
                              onChange={(e) => updateHomepageSection('bloque7_cta', 'title', e.target.value)}
                              placeholder="Contáctanos\nen un clic"
                              rows={2}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Subtítulo</label>
                            <Input
                              value={homepageSections.bloque7_cta?.subtitle || ''}
                              onChange={(e) => updateHomepageSection('bloque7_cta', 'subtitle', e.target.value)}
                              placeholder="Reserva tu aventura por WhatsApp"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Texto del Botón</label>
                            <Input
                              value={homepageSections.bloque7_cta?.button_text || ''}
                              onChange={(e) => updateHomepageSection('bloque7_cta', 'button_text', e.target.value)}
                              placeholder="RESERVAR AVENTURA"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Enlace del Botón</label>
                            <Input
                              value={homepageSections.bloque7_cta?.button_link || ''}
                              onChange={(e) => updateHomepageSection('bloque7_cta', 'button_link', e.target.value)}
                              placeholder="/reservas"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="bloque8" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">✨ BLOQUE 8: Texto Animado</h3>
                        <p className="text-sm text-gray-600">Sección negra final con texto que cambia</p>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Texto Fijo (Inicio)</label>
                            <Input
                              value={homepageSections.bloque8_animated_text?.prefix || ''}
                              onChange={(e) => updateHomepageSection('bloque8_animated_text', 'prefix', e.target.value)}
                              placeholder="DESCUBRE"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Palabras Animadas (separadas por coma)</label>
                            <Input
                              value={homepageSections.bloque8_animated_text?.animated_words?.join(', ') || ''}
                              onChange={(e) => updateHomepageSection('bloque8_animated_text', 'animated_words', e.target.value.split(', '))}
                              placeholder="LA AVENTURA, TU ADRENALINA, EL CHOCÓ"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Texto Fijo (Final)</label>
                            <Input
                              value={homepageSections.bloque8_animated_text?.suffix || ''}
                              onChange={(e) => updateHomepageSection('bloque8_animated_text', 'suffix', e.target.value)}
                              placeholder="VIVE HOY TU AVENTURA"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Velocidad de Animación (ms)</label>
                            <Input
                              type="number"
                              value={homepageSections.bloque8_animated_text?.animation_speed || 2000}
                              onChange={(e) => updateHomepageSection('bloque8_animated_text', 'animation_speed', parseInt(e.target.value))}
                              placeholder="2000"
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  ) : isNosotros ? (
                    // 🚀 EDITOR ESPECÍFICO PARA NOSOTROS CON 5 BLOQUES
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <div className="md:hidden mb-4">
                        <Select onValueChange={setActiveTab} value={activeTab}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar bloque" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bloque1">🎬 Hero</SelectItem>
                            <SelectItem value="bloque2">📹 Historia</SelectItem>
                            <SelectItem value="bloque3">🖼️ Galería</SelectItem>
                            <SelectItem value="bloque4">💬 Contacto</SelectItem>
                            <SelectItem value="bloque5">❓ FAQs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <TabsList className="hidden md:grid w-full grid-cols-5">
                        <TabsTrigger value="bloque1">🎬 Hero</TabsTrigger>
                        <TabsTrigger value="bloque2">📹 Historia</TabsTrigger>
                        <TabsTrigger value="bloque3">🖼️ Galería</TabsTrigger>
                        <TabsTrigger value="bloque4">💬 Contacto</TabsTrigger>
                        <TabsTrigger value="bloque5">❓ FAQs</TabsTrigger>
                      </TabsList>

                      {/* BLOQUE 1: HERO */}
                      <TabsContent value="bloque1" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">🎬 BLOQUE 1: Hero</h3>
                        <p className="text-sm text-gray-600">Imagen de fondo y título principal</p>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Imagen de Fondo (URL)</label>
                            <Input
                              value={nosotrosSections.bloque1_hero?.hero_image || ''}
                              onChange={(e) => updateNosotrosSection('bloque1_hero', 'hero_image', e.target.value)}
                              placeholder="https://images.unsplash.com/..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Título Principal</label>
                            <Textarea
                              value={nosotrosSections.bloque1_hero?.title || ''}
                              onChange={(e) => updateNosotrosSection('bloque1_hero', 'title', e.target.value)}
                              placeholder="AVENTURA EN CUATRIMOTOS Y PAINTBALL EN EL CHOCÓ"
                              rows={3}
                            />
                          </div>
                        </div>
                      </TabsContent>

                      {/* BLOQUE 2: HISTORIA */}
                      <TabsContent value="bloque2" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">📹 BLOQUE 2: Nuestra Historia</h3>
                        <p className="text-sm text-gray-600">Video y contenido de historia</p>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Subtítulo de Sección</label>
                            <Input
                              value={nosotrosSections.bloque2_historia?.section_subtitle || ''}
                              onChange={(e) => updateNosotrosSection('bloque2_historia', 'section_subtitle', e.target.value)}
                              placeholder="NUESTRA HISTORIA"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Título de Sección</label>
                            <Input
                              value={nosotrosSections.bloque2_historia?.section_title || ''}
                              onChange={(e) => updateNosotrosSection('bloque2_historia', 'section_title', e.target.value)}
                              placeholder="NUESTRA HISTORIA"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Imagen Miniatura Video</label>
                            <Input
                              value={nosotrosSections.bloque2_historia?.video_thumbnail || ''}
                              onChange={(e) => updateNosotrosSection('bloque2_historia', 'video_thumbnail', e.target.value)}
                              placeholder="https://images.unsplash.com/..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">URL del Video (YouTube)</label>
                            <Input
                              value={nosotrosSections.bloque2_historia?.video_url || ''}
                              onChange={(e) => updateNosotrosSection('bloque2_historia', 'video_url', e.target.value)}
                              placeholder="https://www.youtube.com/embed/..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Párrafos de Contenido (separar con |)</label>
                            <Textarea
                              value={nosotrosSections.bloque2_historia?.content_paragraphs?.join(' | ') || ''}
                              onChange={(e) => updateNosotrosSection('bloque2_historia', 'content_paragraphs', e.target.value.split(' | '))}
                              placeholder="Párrafo 1 | Párrafo 2 | Párrafo 3 | Párrafo 4"
                              rows={4}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Texto del Botón</label>
                            <Input
                              value={nosotrosSections.bloque2_historia?.booking_button_text || ''}
                              onChange={(e) => updateNosotrosSection('bloque2_historia', 'booking_button_text', e.target.value)}
                              placeholder="Reserva tu aventura"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      {/* BLOQUE 3: GALERÍA */}
                      <TabsContent value="bloque3" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">🖼️ BLOQUE 3: Galería</h3>
                        <p className="text-sm text-gray-600">Títulos y descripción de galería</p>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Subtítulo de Sección</label>
                            <Input
                              value={nosotrosSections.bloque3_galeria?.section_subtitle || ''}
                              onChange={(e) => updateNosotrosSection('bloque3_galeria', 'section_subtitle', e.target.value)}
                              placeholder="NUESTRAS AVENTURAS"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Título Primera Parte</label>
                            <Input
                              value={nosotrosSections.bloque3_galeria?.section_title_part1 || ''}
                              onChange={(e) => updateNosotrosSection('bloque3_galeria', 'section_title_part1', e.target.value)}
                              placeholder="NUESTRA PASIÓN"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Título Segunda Parte</label>
                            <Input
                              value={nosotrosSections.bloque3_galeria?.section_title_part2 || ''}
                              onChange={(e) => updateNosotrosSection('bloque3_galeria', 'section_title_part2', e.target.value)}
                              placeholder="POR LA AVENTURA"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Descripción de Galería</label>
                            <Textarea
                              value={nosotrosSections.bloque3_galeria?.gallery_description || ''}
                              onChange={(e) => updateNosotrosSection('bloque3_galeria', 'gallery_description', e.target.value)}
                              placeholder="La selva tropical del Chocó nos inspira..."
                              rows={3}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Texto CTA</label>
                            <Input
                              value={nosotrosSections.bloque3_galeria?.cta_text || ''}
                              onChange={(e) => updateNosotrosSection('bloque3_galeria', 'cta_text', e.target.value)}
                              placeholder="¿Listo para vivir tu próxima gran aventura?"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Texto del Botón CTA</label>
                            <Input
                              value={nosotrosSections.bloque3_galeria?.cta_button_text || ''}
                              onChange={(e) => updateNosotrosSection('bloque3_galeria', 'cta_button_text', e.target.value)}
                              placeholder="Reserva Tu Aventura"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      {/* BLOQUE 4: CONTACTO */}
                      <TabsContent value="bloque4" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">💬 BLOQUE 4: Contacto</h3>
                        <p className="text-sm text-gray-600">Sección de contacto por WhatsApp</p>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Título Primera Parte</label>
                            <Input
                              value={nosotrosSections.bloque4_contacto?.title_part1 || ''}
                              onChange={(e) => updateNosotrosSection('bloque4_contacto', 'title_part1', e.target.value)}
                              placeholder="CONTÁCTANOS"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Título Segunda Parte</label>
                            <Input
                              value={nosotrosSections.bloque4_contacto?.title_part2 || ''}
                              onChange={(e) => updateNosotrosSection('bloque4_contacto', 'title_part2', e.target.value)}
                              placeholder="EN UN CLIC"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Descripción</label>
                            <Input
                              value={nosotrosSections.bloque4_contacto?.description || ''}
                              onChange={(e) => updateNosotrosSection('bloque4_contacto', 'description', e.target.value)}
                              placeholder="Reserva tu aventura por"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Descripción Destacada</label>
                            <Input
                              value={nosotrosSections.bloque4_contacto?.description_highlight || ''}
                              onChange={(e) => updateNosotrosSection('bloque4_contacto', 'description_highlight', e.target.value)}
                              placeholder="WhatsApp"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Número de WhatsApp</label>
                            <Input
                              value={nosotrosSections.bloque4_contacto?.whatsapp_number || ''}
                              onChange={(e) => updateNosotrosSection('bloque4_contacto', 'whatsapp_number', e.target.value)}
                              placeholder="+57 311 703 0436"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Enlace de WhatsApp</label>
                            <Input
                              value={nosotrosSections.bloque4_contacto?.whatsapp_link || ''}
                              onChange={(e) => updateNosotrosSection('bloque4_contacto', 'whatsapp_link', e.target.value)}
                              placeholder="https://wa.me/573117030436"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      {/* BLOQUE 5: FAQs */}
                      <TabsContent value="bloque5" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">❓ BLOQUE 5: Preguntas Frecuentes</h3>
                        <p className="text-sm text-gray-600">Títulos de la sección FAQ (las preguntas se gestionan en el sistema existente)</p>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Subtítulo de Sección</label>
                            <Input
                              value={nosotrosSections.bloque5_faqs?.section_subtitle || ''}
                              onChange={(e) => updateNosotrosSection('bloque5_faqs', 'section_subtitle', e.target.value)}
                              placeholder="RESPUESTAS RÁPIDAS"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Título de Sección</label>
                            <Input
                              value={nosotrosSections.bloque5_faqs?.section_title || ''}
                              onChange={(e) => updateNosotrosSection('bloque5_faqs', 'section_title', e.target.value)}
                              placeholder="PREGUNTAS FRECUENTES"
                            />
                          </div>

                          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-700">
                              <strong>Nota:</strong> Las preguntas y respuestas se gestionan con el sistema existente de FAQs.
                              Aquí solo puedes editar los títulos de la sección.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  ) : isCuatrimotos ? (
                    // 🚀 EDITOR DE CUATRIMOTOS CON TABS
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                      <div className="md:hidden mb-4">
                        <Select onValueChange={setActiveTab} value={activeTab}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar bloque" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bloque1">BLOQUE 1: Hero</SelectItem>
                            <SelectItem value="bloque2">BLOQUE 2: Seguridad</SelectItem>
                            <SelectItem value="bloque3">BLOQUE 3: Vehículos</SelectItem>
                            <SelectItem value="bloque4">BLOQUE 4: CTA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <TabsList className="hidden md:grid w-full grid-cols-4">
                        <TabsTrigger value="bloque1">BLOQUE 1: Hero</TabsTrigger>
                        <TabsTrigger value="bloque2">BLOQUE 2: Seguridad</TabsTrigger>
                        <TabsTrigger value="bloque3">BLOQUE 3: Vehículos</TabsTrigger>
                        <TabsTrigger value="bloque4">BLOQUE 4: CTA</TabsTrigger>
                      </TabsList>

                      {/* BLOQUE 1: HERO */}
                      <TabsContent value="bloque1" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">🏎️ BLOQUE 1: Hero Principal</h3>
                        <p className="text-sm text-gray-600">Información principal de cuatrimotos y reservas</p>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Título de Página</label>
                            <Input
                              value={cuatrimotosSections.bloque1_hero?.page_title || ''}
                              onChange={(e) => updateCuatrimotosSection('bloque1_hero', 'page_title', e.target.value)}
                              placeholder="Nuestras Cuatrimotos"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Nombre del Vehículo</label>
                            <Input
                              value={cuatrimotosSections.bloque1_hero?.vehicle_name || ''}
                              onChange={(e) => updateCuatrimotosSection('bloque1_hero', 'vehicle_name', e.target.value)}
                              placeholder="YAMAHA GRIZZLY 700"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Modelo del Vehículo</label>
                            <Input
                              value={cuatrimotosSections.bloque1_hero?.vehicle_model || ''}
                              onChange={(e) => updateCuatrimotosSection('bloque1_hero', 'vehicle_model', e.target.value)}
                              placeholder="Grizzly 700"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Año del Vehículo</label>
                            <Input
                              value={cuatrimotosSections.bloque1_hero?.vehicle_year || ''}
                              onChange={(e) => updateCuatrimotosSection('bloque1_hero', 'vehicle_year', e.target.value)}
                              placeholder="Modelo 2009"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Características (separar con |)</label>
                            <Textarea
                              value={cuatrimotosSections.bloque1_hero?.features?.join(' | ') || ''}
                              onChange={(e) => updateCuatrimotosSection('bloque1_hero', 'features', e.target.value.split(' | '))}
                              placeholder="Experiencias 100% en la selva del Chocó | Tours por rutas extremas | Paintball en escenarios naturales"
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Edad Mínima</label>
                            <Input
                              value={cuatrimotosSections.bloque1_hero?.reservation_info?.min_age || ''}
                              onChange={(e) => updateCuatrimotosSectionNested('bloque1_hero', 'reservation_info', 'min_age', e.target.value)}
                              placeholder="16 años"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Licencia Requerida</label>
                            <Input
                              value={cuatrimotosSections.bloque1_hero?.reservation_info?.license_required || ''}
                              onChange={(e) => updateCuatrimotosSectionNested('bloque1_hero', 'reservation_info', 'license_required', e.target.value)}
                              placeholder="Obligatoria para el conductor"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Depósito</label>
                            <Input
                              value={cuatrimotosSections.bloque1_hero?.reservation_info?.deposit || ''}
                              onChange={(e) => updateCuatrimotosSectionNested('bloque1_hero', 'reservation_info', 'deposit', e.target.value)}
                              placeholder="50% del valor del servicio"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Horarios</label>
                            <Input
                              value={cuatrimotosSections.bloque1_hero?.reservation_info?.schedule || ''}
                              onChange={(e) => updateCuatrimotosSectionNested('bloque1_hero', 'reservation_info', 'schedule', e.target.value)}
                              placeholder="7:00 AM - 5:00 PM"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Texto del Botón</label>
                            <Input
                              value={cuatrimotosSections.bloque1_hero?.button_text || ''}
                              onChange={(e) => updateCuatrimotosSection('bloque1_hero', 'button_text', e.target.value)}
                              placeholder="RESERVAR AHORA"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Enlace del Botón</label>
                            <Input
                              value={cuatrimotosSections.bloque1_hero?.button_link || ''}
                              onChange={(e) => updateCuatrimotosSection('bloque1_hero', 'button_link', e.target.value)}
                              placeholder="/reservas"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      {/* BLOQUE 2: SEGURIDAD */}
                      <TabsContent value="bloque2" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">🛡️ BLOQUE 2: Requerimientos de Seguridad</h3>
                        <p className="text-sm text-gray-600">Información de seguridad y requerimientos</p>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Título de Sección</label>
                            <Input
                              value={cuatrimotosSections.bloque2_seguridad?.section_title || ''}
                              onChange={(e) => updateCuatrimotosSection('bloque2_seguridad', 'section_title', e.target.value)}
                              placeholder="Requerimientos de Seguridad"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Ropa Obligatoria</label>
                            <Input
                              value={cuatrimotosSections.bloque2_seguridad?.safety_requirements?.clothing || ''}
                              onChange={(e) => updateCuatrimotosSectionNested('bloque2_seguridad', 'safety_requirements', 'clothing', e.target.value)}
                              placeholder="Ropa cómoda, resistente y que se pueda ensuciar"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Calzado</label>
                            <Input
                              value={cuatrimotosSections.bloque2_seguridad?.safety_requirements?.footwear || ''}
                              onChange={(e) => updateCuatrimotosSectionNested('bloque2_seguridad', 'safety_requirements', 'footwear', e.target.value)}
                              placeholder="Obligatorio calzado cerrado y resistente"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Protección</label>
                            <Input
                              value={cuatrimotosSections.bloque2_seguridad?.safety_requirements?.protection || ''}
                              onChange={(e) => updateCuatrimotosSectionNested('bloque2_seguridad', 'safety_requirements', 'protection', e.target.value)}
                              placeholder="Uso obligatorio de casco, chaleco y protección provista"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Guías</label>
                            <Input
                              value={cuatrimotosSections.bloque2_seguridad?.safety_requirements?.guides || ''}
                              onChange={(e) => updateCuatrimotosSectionNested('bloque2_seguridad', 'safety_requirements', 'guides', e.target.value)}
                              placeholder="Locales expertos que conocen el territorio"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Grupos</label>
                            <Input
                              value={cuatrimotosSections.bloque2_seguridad?.safety_requirements?.groups || ''}
                              onChange={(e) => updateCuatrimotosSectionNested('bloque2_seguridad', 'safety_requirements', 'groups', e.target.value)}
                              placeholder="Ideal para integración y team building empresarial"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Responsabilidad</label>
                            <Input
                              value={cuatrimotosSections.bloque2_seguridad?.safety_requirements?.responsibility || ''}
                              onChange={(e) => updateCuatrimotosSectionNested('bloque2_seguridad', 'safety_requirements', 'responsibility', e.target.value)}
                              placeholder="Cliente responsable por daños por mal uso"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      {/* BLOQUE 3: VEHÍCULOS */}
                      <TabsContent value="bloque3" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">🚗 BLOQUE 3: Listado de Vehículos</h3>
                        <p className="text-sm text-gray-600">Configuración del listado sincronizado con la base de datos</p>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-800 mb-2">Sincronización Automática</h4>
                            <p className="text-sm text-green-700">
                              Esta sección se sincroniza automáticamente con el panel de administración de vehículos.
                              Los vehículos mostrados provienen directamente de la base de datos.
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Sincronizar con Base de Datos</label>
                            <select
                              value={cuatrimotosSections.bloque3_vehiculos?.sync_with_database ? 'true' : 'false'}
                              onChange={(e) => updateCuatrimotosSection('bloque3_vehiculos', 'sync_with_database', e.target.value === 'true')}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            >
                              <option value="true">Sí, sincronizar automáticamente</option>
                              <option value="false">No, usar datos estáticos</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Vehículos por Página</label>
                            <Input
                              type="number"
                              value={cuatrimotosSections.bloque3_vehiculos?.vehicles_per_page || ''}
                              onChange={(e) => updateCuatrimotosSection('bloque3_vehiculos', 'vehicles_per_page', parseInt(e.target.value))}
                              placeholder="12"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Mostrar Disponibilidad</label>
                            <select
                              value={cuatrimotosSections.bloque3_vehiculos?.show_availability ? 'true' : 'false'}
                              onChange={(e) => updateCuatrimotosSection('bloque3_vehiculos', 'show_availability', e.target.value === 'true')}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            >
                              <option value="true">Sí, mostrar estado de disponibilidad</option>
                              <option value="false">No, ocultar estado</option>
                            </select>
                          </div>
                        </div>
                      </TabsContent>

                      {/* BLOQUE 4: CTA */}
                      <TabsContent value="bloque4" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">📢 BLOQUE 4: Call to Action</h3>
                        <p className="text-sm text-gray-600">Sección final de llamado a la acción</p>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Título</label>
                            <Input
                              value={cuatrimotosSections.bloque4_cta?.title || ''}
                              onChange={(e) => updateCuatrimotosSection('bloque4_cta', 'title', e.target.value)}
                              placeholder="¿Listo para la Máxima Aventura?"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Descripción</label>
                            <Textarea
                              value={cuatrimotosSections.bloque4_cta?.description || ''}
                              onChange={(e) => updateCuatrimotosSection('bloque4_cta', 'description', e.target.value)}
                              placeholder="Reserva tu Yamaha Grizzly 700 y vive experiencias extremas en la selva del Chocó"
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Texto del Botón Primario</label>
                            <Input
                              value={cuatrimotosSections.bloque4_cta?.primary_button?.text || ''}
                              onChange={(e) => updateCuatrimotosSectionNested('bloque4_cta', 'primary_button', 'text', e.target.value)}
                              placeholder="RESERVAR CUATRIMOTO"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Enlace del Botón Primario</label>
                            <Input
                              value={cuatrimotosSections.bloque4_cta?.primary_button?.link || ''}
                              onChange={(e) => updateCuatrimotosSectionNested('bloque4_cta', 'primary_button', 'link', e.target.value)}
                              placeholder="/reservas"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Texto del Botón Secundario</label>
                            <Input
                              value={cuatrimotosSections.bloque4_cta?.secondary_button?.text || ''}
                              onChange={(e) => updateCuatrimotosSectionNested('bloque4_cta', 'secondary_button', 'text', e.target.value)}
                              placeholder="VER EXPERIENCIAS"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Enlace del Botón Secundario</label>
                            <Input
                              value={cuatrimotosSections.bloque4_cta?.secondary_button?.link || ''}
                              onChange={(e) => updateCuatrimotosSectionNested('bloque4_cta', 'secondary_button', 'link', e.target.value)}
                              placeholder="/experiencias"
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  ) : isExperiencias ? (
                    // 🚀 EDITOR DE EXPERIENCIAS CON TABS
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                      <div className="md:hidden mb-4">
                        <Select onValueChange={setActiveTab} value={activeTab}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar bloque" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bloque1">BLOQUE 1: Hero</SelectItem>
                            <SelectItem value="bloque2">BLOQUE 2: Servicios</SelectItem>
                            <SelectItem value="bloque3">BLOQUE 3: Políticas</SelectItem>
                            <SelectItem value="bloque4">BLOQUE 4: Galería</SelectItem>
                            <SelectItem value="bloque5">BLOQUE 5: CTA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <TabsList className="hidden md:grid w-full grid-cols-5">
                        <TabsTrigger value="bloque1">BLOQUE 1: Hero</TabsTrigger>
                        <TabsTrigger value="bloque2">BLOQUE 2: Servicios</TabsTrigger>
                        <TabsTrigger value="bloque3">BLOQUE 3: Políticas</TabsTrigger>
                        <TabsTrigger value="bloque4">BLOQUE 4: Galería</TabsTrigger>
                        <TabsTrigger value="bloque5">BLOQUE 5: CTA</TabsTrigger>
                      </TabsList>

                      {/* BLOQUE 1: HERO */}
                      <TabsContent value="bloque1" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">🌟 BLOQUE 1: Hero Principal</h3>
                        <p className="text-sm text-gray-600">Sección principal con título y descripción</p>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Imagen de Fondo (URL)</label>
                            <Input
                              value={experienciasSections.bloque1_hero?.background_image || ''}
                              onChange={(e) => updateExperienciasSection('bloque1_hero', 'background_image', e.target.value)}
                              placeholder="https://images.unsplash.com/..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Título Principal</label>
                            <Input
                              value={experienciasSections.bloque1_hero?.title || ''}
                              onChange={(e) => updateExperienciasSection('bloque1_hero', 'title', e.target.value)}
                              placeholder="NUESTROS SERVICIOS"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Descripción</label>
                            <Textarea
                              value={experienciasSections.bloque1_hero?.description || ''}
                              onChange={(e) => updateExperienciasSection('bloque1_hero', 'description', e.target.value)}
                              placeholder="Tu próxima aventura comienza aquí..."
                              rows={3}
                            />
                          </div>
                        </div>
                      </TabsContent>

                      {/* BLOQUE 2: SERVICIOS */}
                      <TabsContent value="bloque2" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">🎯 BLOQUE 2: Servicios y Experiencias</h3>
                        <p className="text-sm text-gray-600">Configuración de servicios personalizados</p>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Título de Sección</label>
                            <Input
                              value={experienciasSections.bloque2_servicios?.section_title || ''}
                              onChange={(e) => updateExperienciasSection('bloque2_servicios', 'section_title', e.target.value)}
                              placeholder="NUESTROS SERVICIOS"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Descripción de Sección</label>
                            <Input
                              value={experienciasSections.bloque2_servicios?.section_description || ''}
                              onChange={(e) => updateExperienciasSection('bloque2_servicios', 'section_description', e.target.value)}
                              placeholder="Tu próxima aventura comienza aquí..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Sincronizar con Paseos de BD</label>
                            <select
                              value={experienciasSections.bloque2_servicios?.sync_with_paseos ? 'true' : 'false'}
                              onChange={(e) => updateExperienciasSection('bloque2_servicios', 'sync_with_paseos', e.target.value === 'true')}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            >
                              <option value="false">No, usar experiencias personalizadas</option>
                              <option value="true">Sí, sincronizar con paseos de BD</option>
                            </select>
                          </div>
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-700">
                              <strong>Nota:</strong> Las experiencias personalizadas se configuran en el código.
                              Para gestionarlas completamente desde el admin, activa la sincronización con paseos.
                            </p>
                          </div>
                        </div>
                      </TabsContent>

                      {/* BLOQUE 3: POLÍTICAS */}
                      <TabsContent value="bloque3" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">📋 BLOQUE 3: Políticas y Condiciones</h3>
                        <p className="text-sm text-gray-600">Política de cancelación, clima e información adicional</p>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Título - Política de Cancelación</label>
                            <Input
                              value={experienciasSections.bloque3_politicas?.cancellation_policy?.title || ''}
                              onChange={(e) => updateExperienciasSectionNested('bloque3_politicas', 'cancellation_policy', 'title', e.target.value)}
                              placeholder="Política de cancelación"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Descripción - Política de Cancelación</label>
                            <Textarea
                              value={experienciasSections.bloque3_politicas?.cancellation_policy?.description || ''}
                              onChange={(e) => updateExperienciasSectionNested('bloque3_politicas', 'cancellation_policy', 'description', e.target.value)}
                              placeholder="Para recibir el reembolso íntegro de la experiencia..."
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Título - Política de Clima</label>
                            <Input
                              value={experienciasSections.bloque3_politicas?.weather_policy?.title || ''}
                              onChange={(e) => updateExperienciasSectionNested('bloque3_politicas', 'weather_policy', 'title', e.target.value)}
                              placeholder="Importante"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Descripción - Política de Clima</label>
                            <Textarea
                              value={experienciasSections.bloque3_politicas?.weather_policy?.description || ''}
                              onChange={(e) => updateExperienciasSectionNested('bloque3_politicas', 'weather_policy', 'description', e.target.value)}
                              placeholder="Las rutas pueden variar según condiciones climáticas..."
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Título - Información Adicional</label>
                            <Input
                              value={experienciasSections.bloque3_politicas?.additional_info?.title || ''}
                              onChange={(e) => updateExperienciasSectionNested('bloque3_politicas', 'additional_info', 'title', e.target.value)}
                              placeholder="Información adicional"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Información General (separar con |)</label>
                            <Textarea
                              value={experienciasSections.bloque3_politicas?.additional_info?.general_info?.join(' | ') || ''}
                              onChange={(e) => updateExperienciasSectionNested('bloque3_politicas', 'additional_info', 'general_info', e.target.value.split(' | '))}
                              placeholder="La confirmación se recibirá cuando se realice la reserva | La mayoría de viajeros pueden participar"
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">No Recomendado Para (separar con |)</label>
                            <Textarea
                              value={experienciasSections.bloque3_politicas?.additional_info?.not_recommended?.join(' | ') || ''}
                              onChange={(e) => updateExperienciasSectionNested('bloque3_politicas', 'additional_info', 'not_recommended', e.target.value.split(' | '))}
                              placeholder="Personas en silla de ruedas | Viajeros con problemas de espalda | Embarazadas"
                              rows={3}
                            />
                          </div>
                        </div>
                      </TabsContent>

                      {/* BLOQUE 4: GALERÍA */}
                      <TabsContent value="bloque4" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">🖼️ BLOQUE 4: Galería de Experiencias</h3>
                        <p className="text-sm text-gray-600">Configuración de la galería de fotos</p>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Título Primera Parte</label>
                            <Input
                              value={experienciasSections.bloque4_galeria?.section_title_part1 || ''}
                              onChange={(e) => updateExperienciasSection('bloque4_galeria', 'section_title_part1', e.target.value)}
                              placeholder="NUESTRAS AVENTURAS"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Título Segunda Parte</label>
                            <Input
                              value={experienciasSections.bloque4_galeria?.section_title_part2 || ''}
                              onChange={(e) => updateExperienciasSection('bloque4_galeria', 'section_title_part2', e.target.value)}
                              placeholder="EN IMÁGENES"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Descripción de Galería</label>
                            <Textarea
                              value={experienciasSections.bloque4_galeria?.section_description || ''}
                              onChange={(e) => updateExperienciasSection('bloque4_galeria', 'section_description', e.target.value)}
                              placeholder="Descubre la emoción y la belleza del Chocó a través de nuestras fotos..."
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Sincronizar con Galería de BD</label>
                            <select
                              value={experienciasSections.bloque4_galeria?.sync_with_gallery_db ? 'true' : 'false'}
                              onChange={(e) => updateExperienciasSection('bloque4_galeria', 'sync_with_gallery_db', e.target.value === 'true')}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            >
                              <option value="true">Sí, usar galería de la BD</option>
                              <option value="false">No, usar fotos personalizadas</option>
                            </select>
                          </div>
                          <div className="mt-4 p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-700">
                              <strong>Sincronización Automática:</strong> Las fotos se sincronizan con el sistema existente de galería.
                              Las fotos personalizadas se configuran en el código.
                            </p>
                          </div>
                        </div>
                      </TabsContent>

                      {/* BLOQUE 5: CTA */}
                      <TabsContent value="bloque5" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">📢 BLOQUE 5: Call to Action</h3>
                        <p className="text-sm text-gray-600">Sección final de llamado a la acción</p>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Título</label>
                            <Input
                              value={experienciasSections.bloque5_cta?.title || ''}
                              onChange={(e) => updateExperienciasSection('bloque5_cta', 'title', e.target.value)}
                              placeholder="¿Listo para Vivir la Aventura?"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Descripción</label>
                            <Textarea
                              value={experienciasSections.bloque5_cta?.description || ''}
                              onChange={(e) => updateExperienciasSection('bloque5_cta', 'description', e.target.value)}
                              placeholder="Experimenta lo que solo el Chocó puede ofrecerte..."
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Texto del Botón Primario</label>
                            <Input
                              value={experienciasSections.bloque5_cta?.primary_button?.text || ''}
                              onChange={(e) => updateExperienciasSectionNested('bloque5_cta', 'primary_button', 'text', e.target.value)}
                              placeholder="RESERVAR EXPERIENCIA"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Enlace del Botón Primario</label>
                            <Input
                              value={experienciasSections.bloque5_cta?.primary_button?.link || ''}
                              onChange={(e) => updateExperienciasSectionNested('bloque5_cta', 'primary_button', 'link', e.target.value)}
                              placeholder="/reservas"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Texto del Botón Secundario</label>
                            <Input
                              value={experienciasSections.bloque5_cta?.secondary_button?.text || ''}
                              onChange={(e) => updateExperienciasSectionNested('bloque5_cta', 'secondary_button', 'text', e.target.value)}
                              placeholder="VER CUATRIMOTOS"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Enlace del Botón Secundario</label>
                            <Input
                              value={experienciasSections.bloque5_cta?.secondary_button?.link || ''}
                              onChange={(e) => updateExperienciasSectionNested('bloque5_cta', 'secondary_button', 'link', e.target.value)}
                              placeholder="/cuatrimotos"
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  ) : isContacto ? (
                    // 🚀 EDITOR DE CONTACTO CON TABS
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                      <div className="md:hidden mb-4">
                        <Select onValueChange={setActiveTab} value={activeTab}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar bloque" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bloque1">BLOQUE 1: Hero</SelectItem>
                            <SelectItem value="bloque2">BLOQUE 2: Info</SelectItem>
                            <SelectItem value="bloque3">BLOQUE 3: Formulario</SelectItem>
                            <SelectItem value="bloque4">BLOQUE 4: Servicios</SelectItem>
                            <SelectItem value="bloque5">BLOQUE 5: WhatsApp</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <TabsList className="hidden md:grid w-full grid-cols-5">
                        <TabsTrigger value="bloque1">BLOQUE 1: Hero</TabsTrigger>
                        <TabsTrigger value="bloque2">BLOQUE 2: Info</TabsTrigger>
                        <TabsTrigger value="bloque3">BLOQUE 3: Formulario</TabsTrigger>
                        <TabsTrigger value="bloque4">BLOQUE 4: Servicios</TabsTrigger>
                        <TabsTrigger value="bloque5">BLOQUE 5: WhatsApp</TabsTrigger>
                      </TabsList>

                      {/* BLOQUE 1: HERO */}
                      <TabsContent value="bloque1" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">🌟 BLOQUE 1: Hero Principal</h3>
                        <p className="text-sm text-gray-600">Sección principal con título y navegación</p>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Imagen de Fondo (URL)</label>
                            <Input
                              value={contactoSections.bloque1_hero?.background_image || ''}
                              onChange={(e) => updateContactoSection('bloque1_hero', 'background_image', e.target.value)}
                              placeholder="/choco-aventuras-hero.jpg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Texto de Bienvenida</label>
                            <Input
                              value={contactoSections.bloque1_hero?.welcome_text || ''}
                              onChange={(e) => updateContactoSection('bloque1_hero', 'welcome_text', e.target.value)}
                              placeholder="- Conectemos -"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Título Principal</label>
                            <Input
                              value={contactoSections.bloque1_hero?.title || ''}
                              onChange={(e) => updateContactoSection('bloque1_hero', 'title', e.target.value)}
                              placeholder="CONTACTO"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Subtítulo</label>
                            <Textarea
                              value={contactoSections.bloque1_hero?.subtitle || ''}
                              onChange={(e) => updateContactoSection('bloque1_hero', 'subtitle', e.target.value)}
                              placeholder="Estamos aquí para hacer realidad tu próxima aventura"
                              rows={2}
                            />
                          </div>
                        </div>
                      </TabsContent>

                      {/* BLOQUE 2: INFORMACIÓN DE CONTACTO */}
                      <TabsContent value="bloque2" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">📍 BLOQUE 2: Información de Contacto</h3>
                        <p className="text-sm text-gray-600">Datos de ubicación, teléfono, email y redes sociales</p>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-4 p-4 border rounded-lg">
                            <h4 className="font-semibold text-[#145A32]">📍 Ubicación</h4>
                            <div>
                              <label className="block text-sm font-medium mb-2">Título</label>
                              <Input
                                value={contactoSections.bloque2_info_contacto?.location?.title || ''}
                                onChange={(e) => updateContactoSectionNested('bloque2_info_contacto', 'location', 'title', e.target.value)}
                                placeholder="Visítanos"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Dirección</label>
                              <Input
                                value={contactoSections.bloque2_info_contacto?.location?.address || ''}
                                onChange={(e) => updateContactoSectionNested('bloque2_info_contacto', 'location', 'address', e.target.value)}
                                placeholder="Quibdó, Chocó, Colombia"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Detalles</label>
                              <Input
                                value={contactoSections.bloque2_info_contacto?.location?.details || ''}
                                onChange={(e) => updateContactoSectionNested('bloque2_info_contacto', 'location', 'details', e.target.value)}
                                placeholder="Centro de la ciudad"
                              />
                            </div>
                          </div>

                          <div className="space-y-4 p-4 border rounded-lg">
                            <h4 className="font-semibold text-[#145A32]">📞 Teléfono</h4>
                            <div>
                              <label className="block text-sm font-medium mb-2">Título</label>
                              <Input
                                value={contactoSections.bloque2_info_contacto?.phone?.title || ''}
                                onChange={(e) => updateContactoSectionNested('bloque2_info_contacto', 'phone', 'title', e.target.value)}
                                placeholder="Llámanos"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Número</label>
                              <Input
                                value={contactoSections.bloque2_info_contacto?.phone?.number || ''}
                                onChange={(e) => updateContactoSectionNested('bloque2_info_contacto', 'phone', 'number', e.target.value)}
                                placeholder="+57 300 123 4567"
                              />
                            </div>
                          </div>

                          <div className="space-y-4 p-4 border rounded-lg">
                            <h4 className="font-semibold text-[#145A32]">✉️ Email</h4>
                            <div>
                              <label className="block text-sm font-medium mb-2">Título</label>
                              <Input
                                value={contactoSections.bloque2_info_contacto?.email?.title || ''}
                                onChange={(e) => updateContactoSectionNested('bloque2_info_contacto', 'email', 'title', e.target.value)}
                                placeholder="Escríbenos"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Dirección Email</label>
                              <Input
                                value={contactoSections.bloque2_info_contacto?.email?.address || ''}
                                onChange={(e) => updateContactoSectionNested('bloque2_info_contacto', 'email', 'address', e.target.value)}
                                placeholder="info@chocoaventuras.com"
                              />
                            </div>
                          </div>

                          <div className="space-y-4 p-4 border rounded-lg">
                            <h4 className="font-semibold text-[#145A32]">📱 Redes Sociales</h4>
                            <div>
                              <label className="block text-sm font-medium mb-2">Título</label>
                              <Input
                                value={contactoSections.bloque2_info_contacto?.social_links?.title || ''}
                                onChange={(e) => updateContactoSectionNested('bloque2_info_contacto', 'social_links', 'title', e.target.value)}
                                placeholder="Síguenos"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Nombre Facebook</label>
                              <Input
                                value={contactoSections.bloque2_info_contacto?.social_links?.facebook_name || ''}
                                onChange={(e) => updateContactoSectionNested('bloque2_info_contacto', 'social_links', 'facebook_name', e.target.value)}
                                placeholder="Chocó Aventuras"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Handle Instagram</label>
                              <Input
                                value={contactoSections.bloque2_info_contacto?.social_links?.instagram_handle || ''}
                                onChange={(e) => updateContactoSectionNested('bloque2_info_contacto', 'social_links', 'instagram_handle', e.target.value)}
                                placeholder="@choco.aventuras2025"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Teléfono Mostrar</label>
                              <Input
                                value={contactoSections.bloque2_info_contacto?.social_links?.phone_display || ''}
                                onChange={(e) => updateContactoSectionNested('bloque2_info_contacto', 'social_links', 'phone_display', e.target.value)}
                                placeholder="+57 300 123 4567"
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      {/* BLOQUE 3: FORMULARIO */}
                      <TabsContent value="bloque3" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">📝 BLOQUE 3: Formulario de Contacto</h3>
                        <p className="text-sm text-gray-600">Configuración de etiquetas y opciones del formulario</p>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Etiqueta Nombre</label>
                            <Input
                              value={contactoSections.bloque3_formulario?.name_label || ''}
                              onChange={(e) => updateContactoSection('bloque3_formulario', 'name_label', e.target.value)}
                              placeholder="Nombre completo"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Placeholder Nombre</label>
                            <Input
                              value={contactoSections.bloque3_formulario?.name_placeholder || ''}
                              onChange={(e) => updateContactoSection('bloque3_formulario', 'name_placeholder', e.target.value)}
                              placeholder="Tu nombre y apellido"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Etiqueta Email</label>
                            <Input
                              value={contactoSections.bloque3_formulario?.email_label || ''}
                              onChange={(e) => updateContactoSection('bloque3_formulario', 'email_label', e.target.value)}
                              placeholder="Correo electrónico"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Placeholder Email</label>
                            <Input
                              value={contactoSections.bloque3_formulario?.email_placeholder || ''}
                              onChange={(e) => updateContactoSection('bloque3_formulario', 'email_placeholder', e.target.value)}
                              placeholder="tu@correo.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Etiqueta Asunto</label>
                            <Input
                              value={contactoSections.bloque3_formulario?.subject_label || ''}
                              onChange={(e) => updateContactoSection('bloque3_formulario', 'subject_label', e.target.value)}
                              placeholder="Asunto"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Etiqueta Mensaje</label>
                            <Input
                              value={contactoSections.bloque3_formulario?.message_label || ''}
                              onChange={(e) => updateContactoSection('bloque3_formulario', 'message_label', e.target.value)}
                              placeholder="Mensaje"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Placeholder Mensaje</label>
                            <Textarea
                              value={contactoSections.bloque3_formulario?.message_placeholder || ''}
                              onChange={(e) => updateContactoSection('bloque3_formulario', 'message_placeholder', e.target.value)}
                              placeholder="Cuéntanos en qué podemos ayudarte..."
                              rows={2}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Texto Botón Envío</label>
                            <Input
                              value={contactoSections.bloque3_formulario?.submit_button_text || ''}
                              onChange={(e) => updateContactoSection('bloque3_formulario', 'submit_button_text', e.target.value)}
                              placeholder="ENVIAR MENSAJE"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      {/* BLOQUE 4: SERVICIOS */}
                      <TabsContent value="bloque4" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">🎯 BLOQUE 4: Galería de Servicios</h3>
                        <p className="text-sm text-gray-600">Servicios destacados mostrados en la página de contacto</p>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Título Primera Parte</label>
                            <Input
                              value={contactoSections.bloque4_servicios?.section_title_part1 || ''}
                              onChange={(e) => updateContactoSection('bloque4_servicios', 'section_title_part1', e.target.value)}
                              placeholder="NUESTROS"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Título Segunda Parte</label>
                            <Input
                              value={contactoSections.bloque4_servicios?.section_title_part2 || ''}
                              onChange={(e) => updateContactoSection('bloque4_servicios', 'section_title_part2', e.target.value)}
                              placeholder="SERVICIOS"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Descripción de Sección</label>
                            <Textarea
                              value={contactoSections.bloque4_servicios?.section_description || ''}
                              onChange={(e) => updateContactoSection('bloque4_servicios', 'section_description', e.target.value)}
                              placeholder="Descubre todas las aventuras que tenemos preparadas para ti"
                              rows={3}
                            />
                          </div>
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-700">
                              <strong>Nota:</strong> Los servicios específicos (cuatrimotos, paintball, experiencias) se configuran directamente en el código.
                              Aquí puedes personalizar los títulos y descripciones generales.
                            </p>
                          </div>
                        </div>
                      </TabsContent>

                      {/* BLOQUE 5: WHATSAPP CTA */}
                      <TabsContent value="bloque5" className="space-y-4">
                        <h3 className="font-bold text-[#145A32] text-lg">💬 BLOQUE 5: WhatsApp CTA</h3>
                        <p className="text-sm text-gray-600">Llamada a la acción para contactar por WhatsApp</p>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Título Primera Parte</label>
                            <Input
                              value={contactoSections.bloque5_whatsapp?.title_part1 || ''}
                              onChange={(e) => updateContactoSection('bloque5_whatsapp', 'title_part1', e.target.value)}
                              placeholder="¿Tienes dudas?"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Título Segunda Parte</label>
                            <Input
                              value={contactoSections.bloque5_whatsapp?.title_part2 || ''}
                              onChange={(e) => updateContactoSection('bloque5_whatsapp', 'title_part2', e.target.value)}
                              placeholder="ESCRÍBENOS"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Subtítulo 1</label>
                            <Input
                              value={contactoSections.bloque5_whatsapp?.subtitle_1 || ''}
                              onChange={(e) => updateContactoSection('bloque5_whatsapp', 'subtitle_1', e.target.value)}
                              placeholder="Respuesta inmediata por WhatsApp"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Subtítulo 2</label>
                            <Input
                              value={contactoSections.bloque5_whatsapp?.subtitle_2 || ''}
                              onChange={(e) => updateContactoSection('bloque5_whatsapp', 'subtitle_2', e.target.value)}
                              placeholder="Estamos disponibles de 7:00 AM a 8:00 PM"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Número WhatsApp (solo números)</label>
                            <Input
                              value={contactoSections.bloque5_whatsapp?.phone_number || ''}
                              onChange={(e) => updateContactoSection('bloque5_whatsapp', 'phone_number', e.target.value)}
                              placeholder="573001234567"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Mensaje Predeterminado</label>
                            <Textarea
                              value={contactoSections.bloque5_whatsapp?.message_text || ''}
                              onChange={(e) => updateContactoSection('bloque5_whatsapp', 'message_text', e.target.value)}
                              placeholder="Hola! Tengo una consulta sobre Chocó Aventuras"
                              rows={2}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Texto Botón WhatsApp</label>
                            <Input
                              value={contactoSections.bloque5_whatsapp?.button_text || ''}
                              onChange={(e) => updateContactoSection('bloque5_whatsapp', 'button_text', e.target.value)}
                              placeholder="CHATEAR EN WHATSAPP"
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  ) : (
                    // EDITOR NORMAL PARA OTRAS PÁGINAS
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
                  )}

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

                  {/* FAQs */}
                  <div className="space-y-4 mt-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-[#145A32]">Preguntas Frecuentes (FAQ)</h3>
                      <Button size="sm" onClick={agregarFaq}>
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar FAQ
                      </Button>
                    </div>

                    {faqs.map((faq) => (
                      <Card key={faq.id} className="border-l-4 border-blue-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-medium text-[#145A32] capitalize">
                              FAQ
                            </span>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => eliminarFaq(faq.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <Input
                              value={faq.question}
                              onChange={(e) => actualizarFaq(faq.id, 'question', e.target.value)}
                              placeholder="Pregunta..."
                            />
                            <Textarea
                              value={faq.answer}
                              onChange={(e) => actualizarFaq(faq.id, 'answer', e.target.value)}
                              rows={3}
                              placeholder="Respuesta..."
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {faqs.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No hay preguntas frecuentes.
                      </div>
                    )}
                  </div>

                  {/* Gallery */}
                  <div className="space-y-4 mt-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-[#145A32]">Galería de Imágenes</h3>
                      <Button size="sm" onClick={agregarGalleryItem}>
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Imagen a Galería
                      </Button>
                    </div>

                    {gallery.map((item) => (
                      <Card key={item.id} className="border-l-4 border-purple-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-medium text-[#145A32] capitalize">
                              Imagen de Galería
                            </span>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => eliminarGalleryItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <Input
                              value={item.imageUrl}
                              onChange={(e) => actualizarGalleryItem(item.id, 'imageUrl', e.target.value)}
                              placeholder="URL de la imagen..."
                            />
                            <Input
                              value={item.title}
                              onChange={(e) => actualizarGalleryItem(item.id, 'title', e.target.value)}
                              placeholder="Título..."
                            />
                            <Textarea
                              value={item.description}
                              onChange={(e) => actualizarGalleryItem(item.id, 'description', e.target.value)}
                              rows={2}
                              placeholder="Descripción..."
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {gallery.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No hay imágenes en la galería.
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