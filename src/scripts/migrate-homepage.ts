// Script simple para agregar homepage al CMS
import { savePage } from '@/lib/pageContent';

export function migrateHomepageToCMS() {
  // Crear página homepage en el CMS
  const homepageContent = {
    id: 'homepage',
    titulo: 'CHOCÓ\nAVENTURAS',
    slug: 'homepage',
    contenido: 'Dispara, acelera y conquista la aventura',
    estado: 'publicada' as const,
    fechaCreacion: '2024-10-22',
    ultimaModificacion: new Date().toISOString(),
    elementos: [
      {
        id: 'hero-title',
        tipo: 'titulo' as const,
        contenido: 'CHOCÓ\nAVENTURAS',
        orden: 1
      },
      {
        id: 'hero-subtitle',
        tipo: 'texto' as const,
        contenido: 'Dispara, acelera y conquista la aventura',
        orden: 2
      }
    ]
  };

  // Guardar en localStorage
  savePage(homepageContent);

  console.log('✅ Homepage migrada al CMS exitosamente');
  return homepageContent;
}