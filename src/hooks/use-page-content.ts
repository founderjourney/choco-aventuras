// Hook simple para conectar páginas con CMS existente
import { useState, useEffect } from 'react';
import { getPageBySlug } from '@/lib/pageContent';

interface UsePageContentReturn {
  titulo?: string;
  contenido?: string;
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