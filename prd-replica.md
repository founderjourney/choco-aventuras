# PRD - Réplica Index Oro18K Quibdó

## 1. ESTRUCTURA GENERAL DE LA PÁGINA

### 1.1 Header (Cabecera)
- **Navegación sticky** que se mantiene fija al hacer scroll
- Logo centrado en mobile, izquierda en desktop
- Menú horizontal con submenús desplegables:
  - INICIO
  - NOSOTROS
  - RELOJES (con submenú: Philipp Plein, Technomarine, Invicta, Cubitt Smartwatch)
  - ORO18K (con submenús multinivel: Cadenas, Dijes, Pulseras, Anillos, Topos, Candongas, Bolas, Herrajes)
  - ORO LAMINADO 18K (con submenús)
  - CONTACTO
  - Icono de carrito con contador de productos
- Iconos de:
  - Cuenta/Login
  - Búsqueda
  - Menú hamburguesa (mobile)

### 1.2 Hero Section (Sección Principal)
- **Video de fondo** (YouTube embebido):
  - URL: https://www.youtube.com/watch?v=1vISNKDpBno
  - Autoplay, loop, sin controles
  - Overlay oscuro semi-transparente sobre el video
- **Textos centrados sobre el video:**
  - Subtítulo: "- Bienvenido -" (pequeño, color claro)
  - Título principal: "Oro18k" (grande, dorado/amarillo)
  - Subtítulo: "quibdo" (grande, blanco)
  - Descripción: "Joyería que habla de ti, contigo y para ti."
- **Botón CTA:**
  - Texto: "Tienda" con icono de flecha hacia abajo
  - Animación: fadeInUp con delay
  - Efecto hover: sink (hundimiento)
  - Scroll suave al hacer clic hacia sección de categorías
- **Shape divider** en la parte inferior (forma de flecha)

---

## 2. SEGUNDA SECCIÓN - VIDEO EXPLORA

### 2.1 Características
- **Video de fondo diferente**:
  - URL: https://www.youtube.com/watch?v=uq49IDyz4e4
  - Similar configuración al hero
- **Textos:**
  - "EXPLORA" (grande)
  - "ELIJE & BRILLA" (grande)
  - "Joyería que habla de ti, contigo y para ti."
- **Tres botones horizontales:**
  - "MERCADO EXCLUSIVO" (icono: cocktail)
  - "ORO LAMINADO" (icono: fire)
  - "OFERTAS" (icono: crown)
  - Animación: fadeInDown
  - Efecto hover: float

---

## 3. FLIP CARDS (TARJETAS VOLTEABLES)

### 3.1 Card 1 - Fabricación a Medida
- **Frente:**
  - Imagen de fondo
  - Título: "Fabricamos a medida. Fabrica"
  - Subtítulo: "TU PROPIA JOYA."
- **Reverso:**
  - Botón: "CREA TU JOYA"
  - Link a página de joyas personalizadas
- **Efecto:** flip 3D en hover (izquierda a derecha)

### 3.2 Card 2 - Relojes
- **Frente:**
  - Imagen de fondo
  - Título: "Las marcas más prestigiosas"
  - Subtítulo: "relojería de alta gama"
- **Reverso:**
  - Botón: "VER RELOJES"
  - Link a sección de relojes
- **Efecto:** flip 3D en hover

---

## 4. SECCIÓN CATEGORÍAS (con ID #categorias)

### 4.1 Encabezado
- Video de fondo (sin URL visible en el HTML proporcionado)
- Overlay oscuro
- Textos:
  - "Brilla con distinción, brilla con alma."
  - "Oro18k" (dorado)
  - "CATEGORIAS" (blanco)

### 4.2 Grid de Categorías - FILA 1 (4 columnas)
Todas con **efecto fade en hover**:

1. **ORO18K - ANILLOS**
   - Imagen de fondo
   - Hover: overlay oscuro + botón "VER"
   
2. **ORO18K - BOLAS**
   - Imagen de fondo
   - Hover: overlay oscuro + botón "VER"
   
3. **ORO18K - PULSERAS**
   - Imagen de fondo
   - Hover: overlay oscuro + botón "VER"
   
4. **ORO18K - PIEZAS (DIJES)**
   - Imagen de fondo
   - Hover: overlay oscuro + botón "VER"

### 4.3 Grid de Categorías - FILA 2 (4 columnas)

5. **ORO18K - CADENAS**
6. **ORO18K - ROSARIOS**
7. **ORO18K - PULSERAS**
8. **ORO18K - DIJES**

### 4.4 Grid de Categorías - FILA 3 (4 columnas)

9. **ORO18K - TOPOS**
10. **ORO18K - CANDONGAS**
11. **ORO18K - HERRAJES**
12. **ORO18K - DIAMANTES**

**Nota:** Cada flip-box tiene background-color diferente al hacer hover

---

## 5. IMAGE ACCORDION (ACORDEÓN DE IMÁGENES)

### 5.1 Características
- **3 paneles expandibles horizontalmente**
- **Interacción:** click o hover
- **Panel activo:** se expande, los demás se contraen

### 5.2 Contenido de cada panel:

**Panel 1:**
- Imagen: imagen relacionada con comunidad
- Título: "Sé parte de nuestra comunidad"
- Botón: "Instagram"
- URL: https://www.instagram.com/oro18kquibdo/

**Panel 2 (activo por defecto):**
- Imagen: imagen de aprendizaje
- Título: "Quieres aprender sobre Joyas"
- Botón: "YouTube"
- URL: https://www.youtube.com/@oro18kquibdo

**Panel 3:**
- Imagen: imagen de descubrimiento
- Título: "hay mucho por descubrir."
- Botón: "Facebook"
- URL: https://www.facebook.com/oro18kquibdo

**Layout:** Horizontal en desktop, vertical en mobile

---

## 6. SECCIÓN FORMULARIO DE CONTACTO

### 6.1 Características Visuales
- Video de fondo con overlay
- Textos:
  - "-drone footage-"
  - "Dudas sobre nuestras piezas"
  - "Queremos que compres con total confianza."

### 6.2 Formulario Multi-Step (3 pasos)

#### **Paso 1:**
- Select múltiple: "Como deseas que te contactemos"
  - Opciones: Correo Electrónico, Teléfono, WhatsApp
- Select: "Estás interesado en"
  - Opciones: ORO18K, Oro Laminado, Joyería customizada, Relojería
- Input text: "Cual es tu nombre"
- Botón: "Siguiente"

#### **Paso 2:**
- Input email: "Cual es tu Correo Electrónico" (requerido)
- Input tel: "Cual es tu número de Teléfono"
- Botón: "Siguiente"

#### **Paso 3:**
- Textarea: "Queremos que nos compartas información acerca del producto que estás interesado"
- Botón: "Enviar"

### 6.3 Indicador de Progreso
- Barra de progreso visual
- Texto: "Step X of 3"
- Color: #000000

### 6.4 Recaptcha
- Invisible recaptcha integrado

---

## 7. SECCIÓN CONTACTO WHATSAPP

### 7.1 Características
- Background con overlay
- Textos:
  - "Contáctanos"
  - "en un clic"
  - "Atención rápida por WhatsApp"
- **Botón grande:**
  - Texto: "+57 3117030436"
  - Icono: WhatsApp
  - Animación: fadeInDown
  - Efecto hover: float
  - Link: https://wa.link/8y34sh

---

## 8. ANIMATED TEXT SECTION

### 8.1 Texto Animado con Morphing
- **Texto estático antes:** "DESCUBRE"
- **Textos que rotan:**
  - "TU ESTILO"
  - "HAZLO BRILLAR"
  - "SORPRENDETE"
- **Texto estático después:** "ENCUENTRA HOY TU FAVORITO"
- **Efecto:** morphing/fadeInUp
- **Velocidad:** 1000ms
- **Librería:** Morphext o similar

---

## 9. FOOTER

### 9.1 Columna 1 - Logo e Info
- Logo de la empresa
- Imagen animada con efecto pulse (delay 400ms)
- Texto descriptivo:
  - "Nuestra amplia experiencia en el sector nos permite hacer una gran variedad de servicios, que van desde la creación de diseños, joyas personalizadas, regalos de empresa, reparación de joyería"

### 9.2 Columna 2 - LINKS
- **Título:** "LINKS"
- Lista de enlaces:
  - Inicio
  - Oro18K
  - Oro Laminado
  - Contactenos
  - Devoluciones y Reembolsos
  - Privacidad

### 9.3 Columna 3 - ACERCA DE
- **Título:** "ACERCA DE"
- Lista con iconos:
  - 📍 Choco-Quibdó
  - 📍 Medellín
  - ✉️ Escríbenos (mailto:ventas@oro18kquibdo.com)
  - 💍 Joyas Personalizadas
  - 📱 +57 3117030436 (WhatsApp)

### 9.4 Columna 4 - SOCIAL MEDIA
- **Título:** "SOCIAL MEDIA"
- Iconos de redes sociales cuadrados:
  - Facebook
  - WhatsApp
  - Instagram
- **Efecto hover:** cambio de color

---

## 10. WIDGETS FLOTANTES

### 10.1 Side Cart (Carrito Lateral)
- **Posición:** Derecha
- **Trigger:** Click en icono de carrito
- **Animación:** Slide desde la derecha
- **Contenido:**
  - Header con título "Carrito" y botón cerrar
  - Lista de productos
  - Subtotal
  - Botones: "Ver carrito" y "Finalizar compra"
- **Estilo:**
  - Background: #f8f9fa
  - Botones: #00774b
  - Max width: 365px

### 10.2 Chaty Widget (Chat Flotante)
- **Posición:** Izquierda, bottom 25px
- **Canales:**
  1. Phone: +573117030436 (color: #03E78B)
  2. WhatsApp: 573117030436 (color: #49E670)
  3. Email: ventas@oro18kquibdo.com (color: #FF485F)
  4. Instagram: oro18kquibdo (gradient)
  5. SMS: +573117030436 (color: #FF549C)
  6. Contact Form (color: #253974)
- **Estado inicial:** first_click
- **Animación:** Canales aparecen desde abajo
- **Tamaño widget:** 54px
- **Efecto hover:** Tooltip a la derecha

### 10.3 Back to Top Button
- **Posición:** Derecha, bottom
- **Forma:** Cuadrado
- **Icono:** Flecha hacia arriba
- **Comportamiento:** Aparece después de scroll
- **Animación:** Smooth scroll al hacer click

---

## 11. MODALES Y PANELES

### 11.1 Search Modal
- **Trigger:** Click en icono de búsqueda
- **Tipo:** Modal centrado
- **Contenido:**
  - Input de búsqueda con placeholder
  - Botón de búsqueda
  - Resultados en vivo (AJAX)
  - Filtro por tipo de post: page:product
- **Animación:** Fade in
- **Cierre:** Click fuera o botón X

### 11.2 Offcanvas Menu (Mobile)
- **Posición:** Derecha
- **Trigger:** Botón hamburguesa
- **Contenido:**
  - Menú completo de navegación
  - Submenús colapsables
  - Icono de carrito con contador
- **Animación:** Slide desde derecha
- **Overlay:** Background oscuro semi-transparente

### 11.3 Account Modal
- **Trigger:** Click en icono de cuenta
- **Tabs:**
  - Login
  - Sign Up
- **Contenido Login:**
  - Username/Email
  - Password con show/hide toggle
  - Remember me checkbox
  - Forgot password link
  - Login button con loader
- **Contenido Sign Up:**
  - Email
  - Password strength indicator
  - Privacy policy checkbox
  - Register button
- **Forgot Password Form:**
  - Username/Email
  - Submit button
  - Back to login link

---

## 12. PALETA DE COLORES

### 12.1 Colores Principales
- **Primary Verde Oscuro:** #1E643D
- **Secondary Verde:** #1c6a00
- **Texto Oscuro:** #242424
- **Negro:** #000000
- **Gris:** #7d7d7d
- **Background Claro:** #f2f5f7
- **Background Muy Claro:** #FAFBFC
- **Blanco:** #ffffff

### 12.2 Colores de Acento
- **Dorado/Amarillo:** (usado en títulos principales)
- **WhatsApp Verde:** #00774b
- **Hover Negro:** #000000

---

## 13. TIPOGRAFÍA

### 13.1 Fuentes Principales
- **Roboto** - Para texto general
- **Roboto Slab** - Para títulos secundarios
- **Oswald** - Para títulos grandes
- **Barlow** - Alternativa
- **Poppins** - Para UI elements
- **Archivo** - Para menús

### 13.2 Tamaños
- **Hero Titles:** Muy grandes, responsive (clamp)
- **Section Titles:** 30-50px
- **Body Text:** 16px
- **Small Text:** 13px

---

## 14. ANIMACIONES Y EFECTOS

### 14.1 Animaciones de Entrada
- **fadeIn** - Aparición suave
- **fadeInUp** - Subida con fade
- **fadeInDown** - Bajada con fade
- **pulse** - Pulsación (para elementos destacados)
- **sink** - Hundimiento en hover
- **float** - Flotación en hover

### 14.2 Delays
- **200ms** - Elementos rápidos
- **400ms** - Elementos normales
- **800ms** - Elementos con retraso notable

### 14.3 Efectos de Hover
- **Flip cards:** Rotación 3D
- **Botones:** Cambio de color, transform scale
- **Imágenes:** Overlay oscuro + zoom
- **Links:** Underline animado

### 14.4 Transiciones
- **Duración estándar:** 0.3s
- **Ease:** ease-in-out
- **Transform:** translateY, scale, rotate

---

## 15. RESPONSIVE BREAKPOINTS

### 15.1 Breakpoints Elementor
- **Mobile Portrait:** 0-767px (max)
- **Mobile Landscape:** 768-880px (si está habilitado)
- **Tablet Portrait:** 768-1024px (max)
- **Tablet Landscape:** 1025-1200px (si está habilitado)
- **Desktop:** 1025px+
- **Widescreen:** 2400px+ (si está habilitado)

### 15.2 Comportamientos Responsive

#### Mobile:
- Menú hamburguesa
- Columnas apiladas verticalmente
- Video backgrounds mantienen proporción
- Textos más pequeños
- Botones full-width

#### Tablet:
- 2 columnas en grids
- Menú colapsado
- Spacing reducido

#### Desktop:
- 4 columnas en grids de categorías
- Menú horizontal completo
- Espaciado completo
- Efectos hover activos

---

## 16. PLUGINS Y TECNOLOGÍAS REQUERIDAS

### 16.1 Esenciales
- **Elementor Pro** - Constructor visual
- **WooCommerce** - E-commerce
- **WPForms** - Formularios multi-step
- **Exclusive Addons for Elementor** - Image accordion, animated text
- **ElementsKit** - Widgets adicionales

### 16.2 Opcionales
- **Side Cart WooCommerce** - Carrito lateral
- **Chaty** - Widget de chat multi-canal
- **Blocksy Theme** - Tema base
- **Yoast SEO** - SEO optimization

---

## 17. FUNCIONALIDADES JAVASCRIPT

### 17.1 Sticky Header
- Detectar scroll
- Añadir clase cuando scroll > 0
- Smooth transition
- Cambio de altura del header

### 17.2 Smooth Scroll
- Click en anchor links
- Scroll animado a sección
- Offset para header sticky

### 17.3 Modal Management
- Abrir/cerrar con animaciones
- Click fuera para cerrar
- ESC key para cerrar
- Bloquear scroll del body cuando modal abierto

### 17.4 Form Validation
- Validación en tiempo real
- Mensajes de error inline
- Indicador de progress en multi-step
- Submit con AJAX

### 17.5 Cart Functions
- Añadir producto sin recargar página
- Update cart count
- Mini cart preview
- Remove items con animación

---

## 18. SEO Y META TAGS

### 18.1 Meta Tags Requeridos
```html
<title>Inicio - Oro18K Quibdó</title>
<meta name="description" content="Joyería que habla de ti, contigo y para ti. Oro 18K y laminado.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://oro18kquibdo.com/">
```

### 18.2 Open Graph
```html
<meta property="og:locale" content="es_ES">
<meta property="og:type" content="website">
<meta property="og:title" content="Inicio - Oro18K Quibdó">
<meta property="og:url" content="https://oro18kquibdo.com/">
<meta property="og:image" content="[imagen-destacada]">
```

### 18.3 Schema.org
- Organization schema
- WebPage schema
- BreadcrumbList

---

## 19. RENDIMIENTO Y OPTIMIZACIÓN

### 19.1 Assets
- **CSS:** Minificado, critical CSS inline
- **JS:** Defer, async cuando posible
- **Images:** Lazy loading, srcset, WebP
- **Videos:** Optimizados, diferentes resoluciones

### 19.2 Carga
- Preload fuentes críticas
- DNS prefetch para CDNs
- Resource hints
- Service worker para cache (opcional)

### 19.3 Fonts Loading
- font-display: swap
- Local fonts cuando posible
- Subset de caracteres necesarios

---

## 20. INTEGRACIONES EXTERNAS

### 20.1 Google Services
- Google Analytics (GT-5MRWDKB8)
- Google Tag Manager
- reCAPTCHA v3 (invisible)

### 20.2 Social Media
- Facebook Pixel (si aplica)
- Instagram feed/API
- YouTube API para videos embebidos

### 20.3 Payment Gateways
- Wompi (gateway de pago colombiano)
- Credenciales live y sandbox
- Webhooks para eventos
- Integrity secrets

---

## 21. ESTRUCTURA DE URLs

### 21.1 Páginas Principales
- `/` - Home
- `/nosotros/` - Acerca de
- `/relojes/` - Categoría relojes
- `/oro18k/` - Categoría oro 18k
- `/orolaminado/` - Categoría oro laminado
- `/contactenos/` - Contacto
- `/tienda/` - Shop
- `/cart-2/` - Carrito
- `/checkout/` - Checkout

### 21.2 Subcategorías Oro18K
- `/cadenas-oro18k/`
- `/dijes-oro18k/`
- `/pulseras-oro18k/`
- `/anillosoro18k/`
- `/topos-oro18k/`
- `/candongas-oro18k/`
- `/bolas-oro18k/`
- `/herrajes-oro18k/`

### 21.3 Subcategorías Laminado
- `/cadenasorolaminado/`
- `/dijesorolaminado/`
- `/anillos-laminado/`
- Etc.

---

## 22. ACCESIBILIDAD (A11Y)

### 22.1 Requerimientos
- **ARIA labels** en todos los botones de iconos
- **Alt text** en todas las imágenes
- **Keyboard navigation** funcional
- **Focus visible** en elementos interactivos
- **Skip to content** link
- **Screen reader** compatible

### 22.2 Contraste
- Ratio mínimo 4.5:1 para texto normal
- Ratio mínimo 3:1 para texto grande
- Verificar contraste en overlays sobre videos

---

## 23. ELEMENTOS CRÍTICOS NO OLVIDAR

### 23.1 Must Have
✅ Video backgrounds en 3 secciones principales
✅ Flip cards con efecto 3D
✅ Image accordion expandible
✅ Formulario multi-step con validación
✅ Side cart funcional
✅ Chaty widget con 6 canales
✅ Grid de 12 categorías con hover effects
✅ Animated text con morphing
✅ Sticky header con animación
✅ Modal de búsqueda con AJAX
✅ Back to top button
✅ Footer con 4 columnas

### 23.2 Nice to Have
- Lazy loading en imágenes
- Preload de recursos críticos
- Service worker para PWA
- Dark mode toggle
- Cookie consent banner

---

## 24. TESTING CHECKLIST

### 24.1 Funcional
- [ ] Todos los enlaces funcionan
- [ ] Formularios envían correctamente
- [ ] Carrito añade/elimina productos
- [ ] Modales abren/cierran correctamente
- [ ] Videos se reproducen automáticamente
- [ ] Menú desplegable funciona en todos los niveles
- [ ] Búsqueda en vivo funciona
- [ ] WhatsApp links correctos

### 24.2 Visual
- [ ] Responsive en todos los breakpoints
- [ ] Animaciones fluidas (60fps)
- [ ] Fuentes cargan correctamente
- [ ] Imágenes optimizadas
- [ ] Colores consistentes con brand
- [ ] Hover effects funcionan
- [ ] Overlays transparentes correctos

### 24.3 Performance
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Videos optimizados

### 24.4 Navegadores
- [ ] Chrome/Edge (últimas 2 versiones)
- [ ] Firefox (últimas 2 versiones)
- [ ] Safari Desktop
- [ ] Safari iOS
- [ ] Chrome Android

---

## 25. NOTAS FINALES

### 25.1 Consideraciones Especiales
- La página está en **español colombiano**
- Moneda: **Pesos colombianos (COP)**
- Formato de teléfono: **+57 (Colombia)**
- Zona horaria: **America/Bogota**

### 25.2 Contenido Dinámico
- Productos del carrito son dinámicos (WooCommerce)
- Contador de productos actualiza en tiempo real
- Precios pueden cambiar según usuario/sesión
- Stock products debe verificarse

### 25.3 Mantenimiento
- Actualizar regularmente plugins
- Backup diario de base de datos
- Monitorear uptime
- Revisar formularios spam
- Optimizar imágenes nuevas

---

## RESUMEN EJECUTIVO

**Stack Tecnológico:**
- WordPress + Elementor Pro
- WooCommerce
- WPForms
- Theme: Blocksy
- Múltiples addons de Elementor

**Características Clave:**
- 3 secciones con video background
- 12 categorías de productos con flip effect
- Formulario multi-step de 3 pasos
- Side cart WooCommerce
- Widget de chat multi-canal (6 canales)
- Image accordion de 3 paneles
- Animated text con morphing
- Sticky header responsivo
- 4 columnas en footer

**Tiempo Estimado de Desarrollo:**
- Estructura HTML/CSS: 2-3 días
- Implementación JavaScript: 2 días
- Integración WordPress: 2 días
- Testing y ajustes: 1 día
- **Total:** 7-8 días (1 developer)

**Prioridad de Implementación:**
1. Header + Hero con video
2. Grid de categorías
3. Formulario contacto
4. Footer
5. Modales y widgets
6. Animaciones y efectos
7. Testing responsive

---