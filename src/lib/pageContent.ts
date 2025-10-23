// Sistema de almacenamiento de contenido de páginas
// En producción esto se conectaría a una base de datos

export interface PageContent {

  id: string;

  titulo: string;

  slug: string;

  contenido: string;

  estado: 'publicada' | 'borrador';

  fechaCreacion: string;

  ultimaModificacion: string;

  elementos: PageElement[];

  faqs?: FAQ[];

  gallery?: GalleryItem[];

  videoUrl?: string;

  historySubtitle?: string;

  bookingButtonText?: string;

  heroImageUrl?: string;

  galleryTitle?: string;

  galleryDescription?: string;

  contactTitle?: string;

  contactDescription?: string;

  whatsappNumber?: string;

  whatsappLink?: string;

}



export interface FAQ {

  id: string;

  question: string;

  answer: string;

}



export interface GalleryItem {

  id: string;

  imageUrl: string;

  title: string;

  description: string;

}



export interface PageElement {

  id: string;

  tipo: 'texto' | 'imagen' | 'titulo' | 'boton';

  contenido: string;

  orden: number;

}



// Simulación de base de datos en localStorage

const STORAGE_KEY = 'choco_aventuras_pages';



export function getPages(): PageContent[] {

  if (typeof window === 'undefined') return [];



  try {

    const stored = localStorage.getItem(STORAGE_KEY);

    return stored ? JSON.parse(stored) : getDefaultPages();

  }

  catch {

    return getDefaultPages();

  }

}



export function savePage(page: PageContent): void {

  if (typeof window === 'undefined') return;



  const pages = getPages();

  const existingIndex = pages.findIndex(p => p.id === page.id);



  if (existingIndex >= 0) {

    pages[existingIndex] = { ...page, ultimaModificacion: new Date().toISOString() };

  } else {

    pages.push({ ...page, fechaCreacion: new Date().toISOString(), ultimaModificacion: new Date().toISOString() });

  }



  localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));

}



export function deletePage(id: string): void {

  if (typeof window === 'undefined') return;



  const pages = getPages().filter(p => p.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));

}



export function getPageBySlug(slug: string): PageContent | null {

  return getPages().find(p => p.slug === slug) || null;

}



function getDefaultPages(): PageContent[] {

  return [

    {

      id: 'homepage',

      titulo: 'CHOCÓ\nAVENTURAS',

      slug: 'homepage',

      contenido: 'Dispara, acelera y conquista la aventura',

      estado: 'publicada',

      fechaCreacion: '2024-01-10',

      ultimaModificacion: '2024-10-22',

      elementos: [

        {

          id: 'hero-title',

          tipo: 'titulo',

          contenido: 'CHOCÓ\nAVENTURAS',

          orden: 1

        },

        {

          id: 'hero-subtitle',

          tipo: 'texto',

          contenido: 'Dispara, acelera y conquista la aventura',

          orden: 2

        }

      ]

    },

    {

      id: 'nosotros',

      titulo: 'Nosotros',

      slug: 'nosotros',

      contenido: 'Somos la primera experiencia de turismo extremo en Quibdó que combina cuatrimotos, paintball y cultura local en plena selva tropical.',

      estado: 'publicada',

      fechaCreacion: '2024-01-15',

      ultimaModificacion: '2024-01-20',

      elementos: [],

      faqs: [

        {

          id: 'faq-1',

          question: '¿Qué incluye el alquiler de cuatrimoto?',

          answer: 'Incluye equipo de seguridad (casco), guía especializado, recorrido por la selva tropical e hidratación. No incluye seguro de accidentes.'

        },

        {

          id: 'faq-2',

          question: '¿Cuánto dura una aventura típica?',

          answer: 'Nuestras experiencias en cuatrimoto duran entre 40 a 60 minutos, ideales para grupos y aventuras familiares.'

        },

        {

          id: 'faq-3',

          question: '¿Cuál es la edad mínima y qué necesito?',

          answer: 'La edad mínima es 16 años y es obligatorio tener licencia de conducción vigente para el conductor.'

        },

        {

          id: 'faq-4',

          question: '¿Cómo es la política de cancelación?',

          answer: 'Ofrecemos reembolso íntegro si cancelas con mínimo 24 horas de antelación. Las rutas pueden variar por clima.'

        },

        {

          id: 'faq-5',

          question: '¿Dónde están ubicados?',

          answer: 'Estamos ubicados en KM7 vía Yuto, Quibdó – Chocó. No manejamos múltiples ubicaciones.'

        }

      ],

      gallery: [

        {

          id: 'gallery-1',

          imageUrl: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3',

          title: 'Rutas Extremas',

          description: 'Cuatrimotos por senderos únicos'

        },

        {

          id: 'gallery-2',

          imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3',

          title: 'Selva Tropical',

          description: 'Biodiversidad única del Chocó'

        },

        {

          id: 'gallery-3',

          imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3',

          title: 'Combate Extremo',

          description: 'Paintball (proximamente) en escenarios naturales'

        },

        {

          id: 'gallery-4',

          imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3',

          title: 'Aventura Grupal',

          description: 'Experiencias compartidas'

        },

        {

          id: 'gallery-5',

          imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3',

          title: 'Paisajes Únicos',

          description: 'Vistas panorámicas del Chocó'

        }

      ],

      videoUrl: 'https://www.youtube.com/embed/uq49IDyz4e4?autoplay=1',

      historySubtitle: 'NUESTRA HISTORIA',

      bookingButtonText: 'Reserva tu aventura',

      heroImageUrl: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',

      galleryTitle: 'NUESTRA PASIÓN POR LA AVENTURA',

      galleryDescription: 'La selva tropical del Chocó nos inspira a forjar momentos llenos de energía y emoción. Próximamente contaremos también con una zona de paintball (proximamente), ideal para compartir con amigos, liberar adrenalina y vivir la acción al máximo.',

      contactTitle: 'CONTÁCTANOS EN UN CLIC',

      contactDescription: 'Reserva tu aventura por WhatsApp',

      whatsappNumber: '+573117030436',

      whatsappLink: 'https://wa.me/573117030436'

    },

    {

      id: 'tours',

      titulo: 'Tours',

      slug: 'tours',

      contenido: 'Descubre nuestros emocionantes tours de aventura en la selva del Chocó.',

      estado: 'publicada',

      fechaCreacion: '2024-01-16',

      ultimaModificacion: '2024-01-22',

      elementos: []

    },

    {

      id: 'experiencias',

      titulo: 'Experiencias',

      slug: 'experiencias',

      contenido: 'Vive experiencias únicas 100% en la selva del Chocó.',

      estado: 'publicada',

      fechaCreacion: '2024-01-17',

      ultimaModificacion: '2024-01-23',

      elementos: []

    },

    {

      id: 'contacto',

      titulo: 'Contacto',

      slug: 'contacto',

      contenido: 'Contáctanos para reservar tu próxima aventura.',

      estado: 'publicada',

      fechaCreacion: '2024-01-18',

      ultimaModificacion: '2024-01-24',

      elementos: []

    }

  ];

}