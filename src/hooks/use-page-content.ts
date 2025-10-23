// Hook simple para conectar páginas con CMS existente
import { useState, useEffect } from 'react';
import { getPageBySlug, FAQ, GalleryItem } from '@/lib/pageContent';

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
    try {
      const pageData = getPageBySlug(slug);

      setData({
        titulo: pageData?.titulo,
        contenido: pageData?.contenido,
        faqs: pageData?.faqs,
        gallery: pageData?.gallery,
        videoUrl: pageData?.videoUrl,
        historySubtitle: pageData?.historySubtitle,
        bookingButtonText: pageData?.bookingButtonText,
        heroImageUrl: pageData?.heroImageUrl,
        galleryTitle: pageData?.galleryTitle,
        galleryDescription: pageData?.galleryDescription,
        contactTitle: pageData?.contactTitle,
        contactDescription: pageData?.contactDescription,
        whatsappNumber: pageData?.whatsappNumber,
        whatsappLink: pageData?.whatsappLink,
        isLoading: false
      });
    } catch (error) {
      console.warn(`CMS: No se pudo cargar contenido para ${slug}, usando fallback`);
      setData({
        isLoading: false,
        error: 'CMS no disponible'
      });
    }
  }, [slug]);

  return data;
}