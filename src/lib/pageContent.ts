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

  // 🚀 SECCIONES ESPECÍFICAS DE HOMEPAGE
  sections?: {
    bloque1_hero?: {
      video_url: string;
      welcome_text: string;
      title: string;
      subtitle: string;
      button_text: string;
      button_action: string;
    };
    bloque2_hero_secondary?: {
      video_url: string;
      title: string;
      subtitle: string;
      buttons: Array<{
        text: string;
        link: string;
        enabled: boolean;
      }>;
    };
    bloque3_services?: {
      cuatrimotos: {
        title: string;
        subtitle: string;
        image: string;
        link: string;
        button_text: string;
        enabled: boolean;
      };
      paintball: {
        title: string;
        subtitle: string;
        image: string;
        link: string;
        button_text: string;
        enabled: boolean;
      };
    };
    bloque4_vehicles?: {
      section_title: string;
      section_subtitle: string;
      vehicles_to_show: number;
    };
    bloque5_social_media?: {
      instagram: {
        url: string;
        text: string;
        button_text: string;
      };
      youtube: {
        url: string;
        text: string;
        button_text: string;
      };
      facebook: {
        url: string;
        text: string;
        button_text: string;
      };
    };
    bloque6_form?: {
      title: string;
      subtitle: string;
      steps: number;
      step_texts: string[];
    };
    bloque7_cta?: {
      title: string;
      subtitle: string;
      button_text: string;
      button_link: string;
    };
    bloque8_animated_text?: {
      prefix: string;
      animated_words: string[];
      suffix: string;
      animation_speed: number;
    };
  };

  // 🚀 SECCIONES ESPECÍFICAS DE NOSOTROS
  nosotros_sections?: {
    bloque1_hero?: {
      hero_image: string;
      title: string;
    };
    bloque2_historia?: {
      section_subtitle: string;
      section_title: string;
      video_thumbnail: string;
      video_url: string;
      content_paragraphs: string[];
      booking_button_text: string;
    };
    bloque3_galeria?: {
      section_subtitle: string;
      section_title_part1: string;
      section_title_part2: string;
      gallery_description: string;
      cta_text: string;
      cta_button_text: string;
      fixed_photos: Array<{
        id: string;
        imageUrl: string;
        title: string;
        description: string;
      }>;
    };
    bloque4_contacto?: {
      title_part1: string;
      title_part2: string;
      description: string;
      description_highlight: string;
      whatsapp_number: string;
      whatsapp_link: string;
    };
    bloque5_faqs?: {
      section_subtitle: string;
      section_title: string;
    };
  };

  // 🚀 SECCIONES ESPECÍFICAS DE CUATRIMOTOS
  cuatrimotos_sections?: {
    bloque1_hero?: {
      page_title: string;
      vehicle_name: string;
      vehicle_model: string;
      vehicle_year: string;
      features: string[];
      reservation_info: {
        min_age: string;
        license_required: string;
        deposit: string;
        schedule: string;
      };
      button_text: string;
      button_link: string;
    };
    bloque2_seguridad?: {
      section_title: string;
      safety_requirements: {
        clothing: string;
        footwear: string;
        protection: string;
        guides: string;
        groups: string;
        responsibility: string;
      };
    };
    bloque3_vehiculos?: {
      sync_with_database: boolean;
      vehicles_per_page: number;
      show_availability: boolean;
    };
    bloque4_cta?: {
      title: string;
      description: string;
      primary_button: {
        text: string;
        link: string;
      };
      secondary_button: {
        text: string;
        link: string;
      };
    };
  };

  // 🚀 SECCIONES ESPECÍFICAS DE EXPERIENCIAS
  experiencias_sections?: {
    bloque1_hero?: {
      background_image: string;
      title: string;
      description: string;
    };
    bloque2_servicios?: {
      section_title: string;
      section_description: string;
      sync_with_paseos: boolean;
      custom_experiences: Array<{
        id: string;
        title: string;
        subtitle?: string;
        subtitle2?: string;
        time?: string;
        groups: boolean;
        description: string;
        details: string[];
        price?: string;
        color: string;
        available: boolean;
        background_image?: string;
      }>;
    };
    bloque3_politicas?: {
      cancellation_policy: {
        title: string;
        description: string;
      };
      weather_policy: {
        title: string;
        description: string;
      };
      additional_info: {
        title: string;
        general_info: string[];
        not_recommended: string[];
      };
    };
    bloque4_galeria?: {
      section_title_part1: string;
      section_title_part2: string;
      section_description: string;
      gallery_photos: Array<{
        id: string;
        image_url: string;
        title: string;
        description: string;
      }>;
      sync_with_gallery_db: boolean;
    };
    bloque5_cta?: {
      title: string;
      description: string;
      primary_button: {
        text: string;
        link: string;
      };
      secondary_button: {
        text: string;
        link: string;
      };
    };
  };

  // 🚀 SECCIONES ESPECÍFICAS DE CONTACTO
  contacto_sections?: {
    bloque1_hero?: {
      background_image: string;
      title_part1: string;
      title_part2: string;
      subtitle: string;
      breadcrumb_home: string;
      breadcrumb_current: string;
    };
    bloque2_info?: {
      section_subtitle: string;
      section_title: string;
      section_description: string;
      info_title: string;
      location: {
        title: string;
        address: string;
      };
      phone: {
        title: string;
        number: string;
      };
      email: {
        title: string;
        address: string;
      };
      social_links: {
        title: string;
        facebook_name: string;
        instagram_handle: string;
        phone_display: string;
      };
    };
    bloque3_formulario?: {
      name_label: string;
      name_placeholder: string;
      email_label: string;
      email_placeholder: string;
      subject_label: string;
      subject_options: Array<{
        value: string;
        label: string;
      }>;
      message_label: string;
      message_placeholder: string;
      submit_button_text: string;
    };
    bloque4_servicios?: {
      section_title_part1: string;
      section_title_part2: string;
      section_description: string;
      services: Array<{
        id: string;
        title: string;
        description: string;
        image_url: string;
        button_text: string;
        button_link: string;
        available: boolean;
      }>;
    };
    bloque5_whatsapp?: {
      title_part1: string;
      title_part2: string;
      subtitle_1: string;
      subtitle_2: string;
      phone_number: string;
      whatsapp_link: string;
    };
  };

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



// Funciones para trabajar con la API de páginas

export async function getPages(): Promise<PageContent[]> {
  try {
    const response = await fetch('/api/paginas');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.paginas || [];
  } catch (error) {
    console.warn('Error fetching pages from API, using defaults:', error);
    return getDefaultPages();
  }
}

export async function savePage(page: PageContent): Promise<PageContent> {
  try {
    const response = await fetch('/api/paginas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(page),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.page;
  } catch (error) {
    console.error('Error saving page:', error);
    throw error;
  }
}

export async function deletePage(id: string): Promise<boolean> {
  try {
    // Necesitamos encontrar el slug basado en el ID
    const pages = await getPages();
    const page = pages.find(p => p.id === id);
    if (!page) {
      throw new Error('Page not found');
    }

    const response = await fetch(`/api/paginas/${page.slug}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error deleting page:', error);
    return false;
  }
}

export async function getPageBySlug(slug: string): Promise<PageContent | null> {
  try {
    const response = await fetch(`/api/paginas/${slug}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.page;
  } catch (error) {
    console.warn(`Error fetching page ${slug}:`, error);
    return null;
  }
}



export function getDefaultPages(): PageContent[] {

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

      ],

      // 🚀 SECCIONES ESPECÍFICAS DE HOMEPAGE
      sections: {
        bloque1_hero: {
          video_url: 'https://www.youtube.com/embed/1vISNKDpBno?autoplay=1&mute=1&loop=1&controls=0&playlist=1vISNKDpBno',
          welcome_text: '- Bienvenido -',
          title: 'CHOCÓ\nAVENTURAS',
          subtitle: 'Dispara, acelera y conquista la aventura',
          button_text: 'Reservar',
          button_action: 'scroll'
        },
        bloque2_hero_secondary: {
          video_url: 'https://www.youtube.com/embed/uq49IDyz4e4?autoplay=1&mute=1&loop=1&controls=0&playlist=uq49IDyz4e4',
          title: 'EXPLORA ELIGE Y VIVE LA ACCIÓN',
          subtitle: 'Cuatrimotos y paintball en el corazón del Chocó: pensados para aventureros como tú.',
          buttons: [
            { text: 'CUATRIMOTOS', link: '/reservas', enabled: true },
            { text: 'PRÓXIMAMENTE', link: '#', enabled: false },
            { text: 'EXPERIENCIAS', link: '/experiencias', enabled: true }
          ]
        },
        bloque3_services: {
          cuatrimotos: {
            title: 'RUTAS EN CUATRIMOTO',
            subtitle: 'Aventura en la selva tropical',
            image: '/choco-aventuras-hero.jpg',
            link: '/reservas',
            button_text: 'Ver más',
            enabled: true
          },
          paintball: {
            title: 'BATALLAS DE PAINTBALL',
            subtitle: 'Combate con adrenalina pura',
            image: '/choco-aventuras-hero.jpg',
            link: '#',
            button_text: 'PRÓXIMAMENTE',
            enabled: false
          }
        },
        bloque4_vehicles: {
          section_title: 'CHOCÓ\nCUATRIMOTOS',
          section_subtitle: 'Vive la aventura, siente la adrenalina.',
          vehicles_to_show: 3
        },
        bloque5_social_media: {
          instagram: {
            url: 'https://www.instagram.com/choco.aventuras2025?igsh=NXJnMGUwZjV3MTNk',
            text: 'Únete a nuestra comunidad',
            button_text: 'Instagram'
          },
          youtube: {
            url: '#',
            text: 'Mira nuestras aventuras',
            button_text: 'YouTube'
          },
          facebook: {
            url: 'https://www.facebook.com/share/1D4semVk7u/?mibextid=wwXIfr',
            text: 'Explora el Chocó',
            button_text: 'Facebook'
          }
        },
        bloque6_form: {
          title: 'Dudas sobre nuestros paseos',
          subtitle: 'Queremos que vivas la aventura con total seguridad.',
          steps: 3,
          step_texts: [
            'Step 1 of 3',
            'Step 2 of 3',
            'Step 3 of 3'
          ]
        },
        bloque7_cta: {
          title: 'Contáctanos\nen un clic',
          subtitle: 'Reserva tu aventura por WhatsApp',
          button_text: 'RESERVAR AVENTURA',
          button_link: '/reservas'
        },
        bloque8_animated_text: {
          prefix: 'DESCUBRE',
          animated_words: ['LA AVENTURA', 'TU ADRENALINA', 'EL CHOCÓ'],
          suffix: 'VIVE HOY TU AVENTURA',
          animation_speed: 2000
        }
      }

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

      whatsappLink: 'https://wa.me/573117030436',

      // 🚀 SECCIONES ESPECÍFICAS DE NOSOTROS
      nosotros_sections: {
        bloque1_hero: {
          hero_image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
          title: 'AVENTURA EN CUATRIMOTOS Y PAINTBALL (PROXIMAMENTE) EN EL CHOCÓ'
        },
        bloque2_historia: {
          section_subtitle: 'NUESTRA HISTORIA',
          section_title: 'NUESTRA HISTORIA',
          video_thumbnail: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3',
          video_url: 'https://www.youtube.com/embed/uq49IDyz4e4?autoplay=1',
          content_paragraphs: [
            'Chocó Aventuras es una empresa pionera en el turismo de aventura en la región, creada para quienes buscan experiencias auténticas, llenas de adrenalina y diversión. Ofrecemos recorridos en cuatrimotos Yamaha diseñados para explorar la selva tropical del Chocó, sus paisajes naturales y su energía vibrante.',
            'Más que una guía, brindamos una experiencia inolvidable, ideal para quienes quieren vivir algo diferente en Quibdó, donde la emoción, la naturaleza y la libertad se encuentran en cada ruta.',
            'Nuestras instalaciones están ubicadas en el KM7 vía Yuto, Quibdó – Chocó, un punto estratégico rodeado de naturaleza donde podrás disfrutar de esta nueva forma de turismo activo en la región.',
            'Somos un espacio pensado para quienes quieren desconectarse de la rutina y vivir una experiencia única sobre cuatro ruedas.'
          ],
          booking_button_text: 'Reserva tu aventura'
        },
        bloque3_galeria: {
          section_subtitle: 'NUESTRAS AVENTURAS',
          section_title_part1: 'NUESTRA PASIÓN',
          section_title_part2: 'POR LA AVENTURA',
          gallery_description: 'La selva tropical del Chocó nos inspira a forjar momentos llenos de energía y emoción. Próximamente contaremos también con una zona de paintball (proximamente), ideal para compartir con amigos, liberar adrenalina y vivir la acción al máximo.',
          cta_text: '¿Listo para vivir tu próxima gran aventura?',
          cta_button_text: 'Reserva Tu Aventura',
          fixed_photos: [
            {
              id: 'fixed-1',
              imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3',
              title: 'Paisajes Únicos',
              description: 'Vistas panorámicas del Chocó'
            }
          ]
        },
        bloque4_contacto: {
          title_part1: 'CONTÁCTANOS',
          title_part2: 'EN UN CLIC',
          description: 'Reserva tu aventura por',
          description_highlight: 'WhatsApp',
          whatsapp_number: '+57 311 703 0436',
          whatsapp_link: 'https://wa.me/573117030436'
        },
        bloque5_faqs: {
          section_subtitle: 'RESPUESTAS RÁPIDAS',
          section_title: 'PREGUNTAS FRECUENTES'
        }
      }

    },

    {
      id: 'cuatrimotos',
      titulo: 'Cuatrimotos',
      slug: 'cuatrimotos',
      contenido: 'Descubre nuestras cuatrimotos Yamaha y vive la aventura extrema en la selva del Chocó.',
      estado: 'publicada',
      fechaCreacion: '2024-01-25',
      ultimaModificacion: '2024-10-23',
      elementos: [],
      // 🚀 SECCIONES ESPECÍFICAS DE CUATRIMOTOS
      cuatrimotos_sections: {
        bloque1_hero: {
          page_title: 'Nuestras Cuatrimotos',
          vehicle_name: 'YAMAHA GRIZZLY 700',
          vehicle_model: 'Grizzly 700',
          vehicle_year: 'Modelo 2009',
          features: [
            'Experiencias 100% en la selva del Chocó',
            'Tours por rutas extremas (aventura sobre barro, trochas y selva)',
            'Paintball en escenarios naturales',
            'Enfoque cultural chocoano (música y fiestas de San Pacho)'
          ],
          reservation_info: {
            min_age: '16 años',
            license_required: 'Obligatoria para el conductor',
            deposit: '50% del valor del servicio',
            schedule: '7:00 AM - 5:00 PM'
          },
          button_text: 'RESERVAR AHORA',
          button_link: '/reservas'
        },
        bloque2_seguridad: {
          section_title: 'Requerimientos de Seguridad',
          safety_requirements: {
            clothing: 'Ropa cómoda, resistente y que se pueda ensuciar',
            footwear: 'Obligatorio calzado cerrado y resistente',
            protection: 'Uso obligatorio de casco, chaleco y protección provista',
            guides: 'Locales expertos que conocen el territorio',
            groups: 'Ideal para integración y team building empresarial',
            responsibility: 'Cliente responsable por daños por mal uso'
          }
        },
        bloque3_vehiculos: {
          sync_with_database: true,
          vehicles_per_page: 12,
          show_availability: true
        },
        bloque4_cta: {
          title: '¿Listo para la Máxima Aventura?',
          description: 'Reserva tu Yamaha Grizzly 700 y vive experiencias extremas en la selva del Chocó',
          primary_button: {
            text: 'RESERVAR CUATRIMOTO',
            link: '/reservas'
          },
          secondary_button: {
            text: 'VER EXPERIENCIAS',
            link: '/experiencias'
          }
        }
      }
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
      ultimaModificacion: '2024-10-23',
      elementos: [],

      // 🚀 SECCIONES ESPECÍFICAS DE CONTACTO
      contacto_sections: {
        bloque1_hero: {
          background_image: '/choco-aventuras-hero.jpg',
          welcome_text: '- Conectemos -',
          title: 'CONTACTO',
          subtitle: 'Estamos aquí para hacer realidad tu próxima aventura',
          breadcrumb_items: [
            { text: 'Inicio', link: '/', active: false },
            { text: 'Contacto', link: '/contacto', active: true }
          ]
        },
        bloque2_info_contacto: {
          location: {
            title: 'Visítanos',
            address: 'Quibdó, Chocó, Colombia',
            details: 'Centro de la ciudad'
          },
          phone: {
            title: 'Llámanos',
            number: '+57 300 123 4567'
          },
          email: {
            title: 'Escríbenos',
            address: 'info@chocoaventuras.com'
          },
          social_links: {
            title: 'Síguenos',
            facebook_name: 'Chocó Aventuras',
            instagram_handle: '@choco.aventuras2025',
            phone_display: '+57 300 123 4567'
          }
        },
        bloque3_formulario: {
          name_label: 'Nombre completo',
          name_placeholder: 'Tu nombre y apellido',
          email_label: 'Correo electrónico',
          email_placeholder: 'tu@correo.com',
          subject_label: 'Asunto',
          subject_options: [
            { value: '', label: 'Selecciona un tema' },
            { value: 'reservas', label: 'Reservas de cuatrimotos' },
            { value: 'experiencias', label: 'Consultas sobre experiencias' },
            { value: 'grupos', label: 'Eventos grupales y empresariales' },
            { value: 'precios', label: 'Información de precios' },
            { value: 'otros', label: 'Otros temas' }
          ],
          message_label: 'Mensaje',
          message_placeholder: 'Cuéntanos en qué podemos ayudarte...',
          submit_button_text: 'ENVIAR MENSAJE'
        },
        bloque4_servicios: {
          section_title_part1: 'NUESTROS',
          section_title_part2: 'SERVICIOS',
          section_description: 'Descubre todas las aventuras que tenemos preparadas para ti',
          services: [
            {
              id: 'cuatrimotos',
              title: 'Rutas en Cuatrimoto',
              description: 'Aventuras extremas por la selva del Chocó',
              image_url: '/choco-aventuras-hero.jpg',
              button_text: 'RESERVAR',
              button_link: '/cuatrimotos',
              available: true
            },
            {
              id: 'paintball',
              title: 'Paintball Extremo',
              description: 'Batallas épicas en escenarios naturales',
              image_url: '/choco-aventuras-hero.jpg',
              button_text: 'PRÓXIMAMENTE',
              button_link: '#',
              available: false
            },
            {
              id: 'experiencias',
              title: 'Experiencias Culturales',
              description: 'Conoce la cultura chocoana auténtica',
              image_url: '/choco-aventuras-hero.jpg',
              button_text: 'EXPLORAR',
              button_link: '/experiencias',
              available: true
            }
          ]
        },
        bloque5_whatsapp: {
          title_part1: '¿Tienes dudas?',
          title_part2: 'ESCRÍBENOS',
          subtitle_1: 'Respuesta inmediata por WhatsApp',
          subtitle_2: 'Estamos disponibles de 7:00 AM a 8:00 PM',
          phone_number: '573001234567',
          message_text: 'Hola! Tengo una consulta sobre Chocó Aventuras',
          button_text: 'CHATEAR EN WHATSAPP'
        }
      },

      // 🚀 SECCIONES ESPECÍFICAS DE EXPERIENCIAS
      experiencias_sections: {
        bloque1_hero: {
          background_image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3',
          title: 'NUESTROS SERVICIOS',
          description: 'Tu próxima aventura comienza aquí...'
        },
        bloque2_servicios: {
          section_title: 'NUESTROS SERVICIOS',
          section_description: 'Tu próxima aventura comienza aquí...',
          sync_with_paseos: false,
          custom_experiences: [
            {
              id: '1',
              title: 'Tour en cuatrimoto',
              subtitle: 'Experiencias aventura 4x4',
              subtitle2: 'Experiencias en cuatrimoto',
              time: '40min - 60min',
              groups: true,
              description: 'Aventura extrema sobre barro, trochas y selva tropical',
              details: [
                'Equipo de seguridad (casco)',
                'Asistencia médica',
                'Hidratación',
                'Yamaha Grizzly 700'
              ],
              price: '$250.000 por cuatrimoto (hasta 2 pasajeros por moto, mismo precio)',
              color: 'from-green-500 to-green-700',
              available: true
            },
            {
              id: '2',
              title: 'Batalla de Paintball (proximamente)',
              description: 'Prepárate para la acción y la estrategia en un campo de batalla natural. El paintball (proximamente) es una experiencia emocionante donde la adrenalina y el trabajo en equipo son clave. ¡Próximamente en Chocó Aventuras!',
              details: [],
              color: 'from-red-500 to-red-700',
              available: false,
              groups: false,
              background_image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3'
            }
          ]
        },
        bloque3_politicas: {
          cancellation_policy: {
            title: 'Política de cancelación',
            description: 'Para recibir el reembolso íntegro de la experiencia, debes cancelarla como mínimo con 24 horas de antelación.'
          },
          weather_policy: {
            title: 'Importante',
            description: 'Las rutas pueden variar según condiciones climáticas. En caso de lluvias intensas o aumento del nivel del río, el recorrido acuático será reemplazado por una ruta rural alternativa, garantizando siempre la seguridad de nuestros turistas.'
          },
          additional_info: {
            title: 'Información adicional',
            general_info: [
              'La confirmación se recibirá cuando se realice la reserva',
              'La mayoría de viajeros pueden participar en la experiencia',
              'Se trata de un tour o una actividad de carácter privado. Solo puede participar su grupo'
            ],
            not_recommended: [
              'Personas en silla de ruedas (no está adaptado)',
              'Viajeros con problemas de espalda',
              'Embarazadas',
              'Viajeros con afecciones cardíacas u otros problemas médicos graves'
            ]
          }
        },
        bloque4_galeria: {
          section_title_part1: 'NUESTRAS AVENTURAS',
          section_title_part2: 'EN IMÁGENES',
          section_description: 'Descubre la emoción y la belleza del Chocó a través de nuestras fotos. Cada imagen es un recuerdo de la aventura que te espera.',
          sync_with_gallery_db: true,
          gallery_photos: [
            {
              id: '1',
              image_url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3',
              title: 'Rutas Extremas',
              description: 'Cuatrimotos por senderos únicos'
            },
            {
              id: '2',
              image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3',
              title: 'Selva Tropical',
              description: 'Biodiversidad única del Chocó'
            },
            {
              id: '3',
              image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3',
              title: 'Combate Extremo',
              description: 'Paintball (proximamente) en escenarios naturales'
            },
            {
              id: '4',
              image_url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3',
              title: 'Aventura Grupal',
              description: 'Experiencias compartidas'
            }
          ]
        },
        bloque5_cta: {
          title: '¿Listo para Vivir la Aventura?',
          description: 'Experimenta lo que solo el Chocó puede ofrecerte: naturaleza, adrenalina y cultura en un solo lugar',
          primary_button: {
            text: 'RESERVAR EXPERIENCIA',
            link: '/reservas'
          },
          secondary_button: {
            text: 'VER CUATRIMOTOS',
            link: '/cuatrimotos'
          }
        }
      }
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