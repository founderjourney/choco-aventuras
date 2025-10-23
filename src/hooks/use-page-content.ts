// Hook para conectar páginas con CMS basado en base de datos
import { useState, useEffect } from 'react';
import { FAQ, GalleryItem } from '@/lib/pageContent';

interface UsePageContentReturn {
  titulo?: string;
  contenido?: string;
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
  isLoading: boolean;
  error?: string;
}

export function usePageContent(slug: string): UsePageContentReturn {
  const [data, setData] = useState<UsePageContentReturn>({
    isLoading: true
  });

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        console.log(`Fetching page content for slug: ${slug}`);
        const response = await fetch(`/api/paginas/${slug}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const pageData = result.page;

        if (pageData) {
          setData({
            ...pageData,
            titulo: pageData.titulo,
            contenido: pageData.contenido,
            faqs: pageData.faqs || [],
            gallery: pageData.gallery || [],
            videoUrl: pageData.videoUrl,
            historySubtitle: pageData.historySubtitle,
            bookingButtonText: pageData.bookingButtonText,
            heroImageUrl: pageData.heroImageUrl,
            galleryTitle: pageData.galleryTitle,
            galleryDescription: pageData.galleryDescription,
            contactTitle: pageData.contactTitle,
            contactDescription: pageData.contactDescription,
            whatsappNumber: pageData.whatsappNumber,
            whatsappLink: pageData.whatsappLink,
            isLoading: false
          });
        } else {
          throw new Error('Page data not found');
        }
      } catch (error) {
        console.warn(`CMS: No se pudo cargar contenido para ${slug}:`, error);
        setData({
          isLoading: false,
          error: 'CMS no disponible'
        });
      }
    };

    fetchPageContent();
  }, [slug]);

  return data;
}