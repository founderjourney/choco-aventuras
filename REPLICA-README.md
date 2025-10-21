# Réplica Oro18K Quibdó

## Descripción
Esta es una réplica exacta de la página principal de Oro18K Quibdó, implementada en Next.js 15 con TypeScript y Tailwind CSS.

## Características Implementadas

###  Estructura Completa
- **Header sticky** con navegación responsive y menús desplegables
- **Hero section** con video de fondo de YouTube embebido
- **Sección EXPLORA** con segundo video de fondo
- **Flip cards 3D** para "Tu Propia Joya" y "Relojería"
- **Grid de 12 categorías** con efectos hover y overlays
- **Image accordion** de 3 paneles expandibles
- **Formulario multi-step** de 3 pasos con validación
- **Sección WhatsApp** con enlace directo
- **Texto animado** con morphing entre palabras
- **Footer completo** con 4 columnas de información

###  Widgets Flotantes
- **Side cart** deslizable desde la derecha
- **Chaty widget** con 6 canales de contacto (teléfono, WhatsApp, email, Instagram, SMS, formulario)
- **Back to top** button con scroll suave
- **Modales** para búsqueda y cuenta de usuario

###  Efectos y Animaciones
- **Videos de fondo** en hero y sección explora
- **Flip cards 3D** con rotación en hover
- **Hover effects** en categorías con zoom y overlays
- **Image accordion** expandible
- **Formulario multi-step** con barra de progreso
- **Texto morphing** con transiciones suaves
- **Sticky header** con animaciones
- **Loading states** y transiciones

###  Responsive Design
- **Mobile-first** approach
- **Breakpoints** para mobile, tablet y desktop
- **Menú hamburguesa** en mobile
- **Grid adaptativo** para categorías
- **Accordion vertical** en mobile

###  Paleta de Colores Oro18K
- **Dorado principal**: #eab308, #f59e0b
- **Grises**: #1f2937, #111827, #000000
- **Blancos**: #ffffff, #f8f9fa
- **Acentos**: Verde WhatsApp, azules, rojos

## Tecnologías Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Lucide React** - Iconos
- **Radix UI** - Componentes base
- **YouTube Embed** - Videos de fondo

## Estructura de Archivos

```
src/
├── app/
│   ├── replica/
│   │   └── page.tsx          # Página principal de la réplica
│   ├── layout.tsx            # Layout con estilos CSS
│   └── globals.css           # Estilos globales
└── components/
    └── ui/                   # Componentes UI reutilizables

public/
└── oro18k-effects.css        # Estilos personalizados y animaciones
```

## Cómo Acceder

1. **Servidor en desarrollo**: http://localhost:3000
2. **Página de réplica**: http://localhost:3000/replica

## Funcionalidades Específicas

### Videos de Fondo
- **Hero section**: https://www.youtube.com/watch?v=1vISNKDpBno
- **Sección EXPLORA**: https://www.youtube.com/embed/uq49IDyz4e4
- Videos con autoplay, mute, loop y sin controles

### Formulario Multi-Step
1. **Paso 1**: Método de contacto, interés, nombre
2. **Paso 2**: Email (requerido), teléfono
3. **Paso 3**: Mensaje detallado
- Barra de progreso visual
- Validación en tiempo real

### Grid de Categorías (12 items)
**Fila 1**: Anillos, Bolas, Pulseras, Piezas
**Fila 2**: Cadenas, Rosarios, Pulseras, Dijes
**Fila 3**: Topos, Candongas, Herrajes, Diamantes

### Chaty Widget (6 canales)
1. **Teléfono**: +573117030436 (#03E78B)
2. **WhatsApp**: 573117030436 (#49E670)
3. **Email**: ventas@oro18kquibdo.com (#FF485F)
4. **Instagram**: oro18kquibdo (gradient)
5. **SMS**: +573117030436 (#FF549C)
6. **Formulario**: Contacto (#253974)

### Enlaces Sociales
- **Facebook**: https://www.facebook.com/oro18kquibdo
- **WhatsApp**: https://wa.link/8y34sh
- **Instagram**: https://www.instagram.com/oro18kquibdo/
- **YouTube**: https://www.youtube.com/@oro18kquibdo

## Estados Interactivos

### Header
- Sticky con cambio de opacidad en scroll
- Menús desplegables en hover
- Contador de carrito dinámico
- Búsqueda modal con AJAX

### Flip Cards
- Rotación 3D en hover (eje Y)
- Frente con imagen y texto
- Reverso con botón de acción

### Categorías
- Hover con zoom de imagen (scale 1.1)
- Overlay oscuro progresivo
- Botón "VER" aparece con slide-up

### Image Accordion
- 3 paneles con expansión en hover
- Panel central activo por defecto (flex: 2)
- Hover expande a flex: 3

## Animaciones CSS

### Keyframes Personalizados
- `fadeInUp`: Entrada desde abajo
- `fadeInDown`: Entrada desde arriba
- `pulse`: Pulsación continua
- `float`: Flotación vertical
- `sink`: Hundimiento en click

### Delays Escalonados
- 200ms, 400ms, 800ms para efectos en cascada

### Transiciones
- Duración estándar: 0.3s
- Ease: ease-in-out
- Transform: translateY, scale, rotate

## Optimizaciones

### Performance
- Lazy loading en imágenes
- Videos optimizados para web
- CSS con will-change para animaciones
- Componentes con memo donde necesario

### SEO y Accesibilidad
- Meta tags completos
- Alt text en imágenes
- ARIA labels en botones
- Focus visible en elementos interactivos
- Contraste adecuado (4.5:1 mínimo)

### Mobile
- Touch-friendly (44px mínimo)
- Viewport optimizado
- Gestos nativos respetados

## Testing Checklist

###  Funcional
- [x] Todos los enlaces funcionan
- [x] Formularios validan correctamente
- [x] Carrito abre/cierra
- [x] Modales funcionan
- [x] Videos se reproducen
- [x] Menús desplegables funcionan
- [x] WhatsApp links correctos

###  Visual
- [x] Responsive en todos los breakpoints
- [x] Animaciones fluidas
- [x] Fuentes cargan correctamente
- [x] Colores consistentes
- [x] Hover effects funcionan
- [x] Overlays correctos

###  Performance
- [x] Carga rápida inicial
- [x] Animaciones 60fps
- [x] Videos optimizados
- [x] CSS minificado

## Próximos Pasos

### Integraciones Pendientes
- [ ] Google Analytics (GT-5MRWDKB8)
- [ ] reCAPTCHA v3 en formularios
- [ ] WooCommerce para carrito real
- [ ] Base de datos para productos
- [ ] Sistema de autenticación

### Mejoras Opcionales
- [ ] PWA capabilities
- [ ] Dark mode toggle
- [ ] Cookie consent banner
- [ ] Lazy loading avanzado
- [ ] Service worker para cache

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar producción
npm start

# Linting
npm run lint
```

## Notas Técnicas

### Compatibilidad
- **Next.js**: 15.5.4
- **React**: 19.1.0
- **Node.js**: >=18.0.0
- **Navegadores**: Chrome 90+, Firefox 88+, Safari 14+

### Estructura CSS
- Tailwind para utilidades base
- CSS personalizado para animaciones complejas
- Variables CSS para temas
- Mobile-first responsive design

---

**Desarrollado como réplica exacta del sitio original Oro18K Quibdó**