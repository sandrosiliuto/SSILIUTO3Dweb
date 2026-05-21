// =============================================================
// portfolio.js
// Single source of truth for portfolio content (mirrors the
// existing ssiliutodesign-web data and adds technical metadata).
// =============================================================

export const HERO = {
  eyebrow: 'ALQUIMIA DIGITAL',
  title:   'INTERSECCIÓN ENTRE EL MUNDO',
  titleAccent: 'FÍSICO Y DIGITAL',
  name:    'SANDRO SILIUTO',
  description: 'Creamos soluciones conceptuales, interacciones tridimensionales y desarrollo web de vanguardia para marcas y artistas globales.',
  primaryCta: 'EXPLORAR PORTALES',
  secondaryCta: 'LA FILOSOFÍA DEL ESTUDIO'
}

export const PHILOSOPHY = {
  title: 'LA FILOSOFÍA DEL ESTUDIO',
  intro: 'Sandro Siliuto es un estudio de arte y tecnología basado en Tenerife, Londres y Bilbao, especializado en la intersección entre el mundo físico y digital (#DigitalAlchemy). Creamos soluciones conceptuales, interacciones tridimensionales y desarrollo web de vanguardia para marcas y artistas globales.',
  physical: {
    title: 'EL MUNDO FÍSICO',
    body:  'Desarrollos en fabricación aditiva, impresión 3D a gran escala, microelectrónica de sensores e instalaciones interactivas espaciales.'
  },
  digital: {
    title: 'EL MUNDO DIGITAL',
    body:  'Visualizaciones WebGL, configuradores paramétricos complejos en tiempo real, análisis espectral de sonido y desarrollo web robusto e interactivo.'
  }
}

export const PROJECTS = [
  {
    id: '01',
    name: 'BeCube 3D',
    category: 'Impresión 3D y Configurador Web',
    url:  'https://becube-3-d.vercel.app/',
    description: 'Ecosistema de modelado e impresión 3D interconectado con un visor interactivo en tiempo real para visualizar prototipos físicos en la web.',
    stack: ['Three.js', 'React', 'WebGL', 'Tailwind', '3D Printing'],
    metrics: 'LAYER 280/350 · 60 FPS',
    highlight: true
  },
  {
    id: '02',
    name: 'SoundReact Studio',
    category: 'Alquimia de Audio y Reactividad Visual',
    url:  'https://sandrosiliuto.github.io/soundreact/',
    description: 'Generador de partículas y frecuencias abstractas que reaccionan de manera milimétrica al espectro de entrada del micrófono o de pistas seleccionadas.',
    stack: ['Web Audio API', 'GLSL', 'Canvas', 'JavaScript'],
    metrics: 'BASS 0.82v · MID 1.45v',
    highlight: true
  },
  {
    id: '03',
    name: 'Plus Dental',
    category: 'Identidad y Experiencia Médica Digital',
    description: 'Plataforma web para clínica dental con foco en accesibilidad, sistema visual cálido y reservas online optimizadas.',
    stack: ['Next.js', 'CMS', 'UX Healthcare']
  },
  {
    id: '04',
    name: 'Xinyuan Tech',
    category: 'Industria & Innovación',
    description: 'Comunicación corporativa para empresa de tecnología avanzada: identidad, web institucional y vídeos de proceso productivo.',
    stack: ['Branding', 'Webflow', 'Motion']
  },
  {
    id: '05',
    name: 'La Gula',
    category: 'Hospitality · Branding & Web',
    description: 'Identidad gastronómica, fotografía editorial y web responsive con sistema de reservas para un proyecto culinario en Tenerife.',
    stack: ['Branding', 'Photography', 'Web']
  },
  {
    id: '06',
    name: 'Manaya',
    category: 'Wellness · E-commerce',
    description: 'Tienda online con narrativa visual cuidada, sistema de producto modular y carrito optimizado para conversión.',
    stack: ['Shopify', 'Liquid', 'Performance']
  },
  {
    id: '07',
    name: 'La Casa de Crêpe',
    category: 'F&B · Identity & Site',
    description: 'Concepto integral de marca: naming, mascota ilustrada y micro-site con menú dinámico y redes sociales.',
    stack: ['Illustration', 'Branding', 'Web']
  },
  {
    id: '08',
    name: 'Hong Kong El Médano',
    category: 'Restaurant · Web & Brand',
    description: 'Web con personalidad asiática contemporánea adaptada al sur de Tenerife. Reserva, menú y galería editorial.',
    stack: ['Branding', 'Web', 'Photo']
  },
  {
    id: '09',
    name: 'Panna & Cioccolato',
    category: 'Heladería · Brand System',
    description: 'Sistema visual con iconografía artesanal y aplicación a packaging, redes y web. Tono lúdico y premium.',
    stack: ['Packaging', 'Branding', 'Web']
  },
  {
    id: '10',
    name: 'Poker Yacht Charter',
    category: 'Lujo Náutico · Web & Photo',
    description: 'Plataforma de chárter de yates con flota interactiva, fichas técnicas y sistema de reservas estacionales.',
    stack: ['Next.js', 'CMS', 'Booking']
  },
  {
    id: '11',
    name: 'Tumbao Dates',
    category: 'Producto Gourmet · Brand & E-commerce',
    description: 'Marca de dátiles premium con story-telling editorial, packaging sostenible y tienda online conectada a fábrica.',
    stack: ['Packaging', 'Branding', 'E-commerce']
  },
  {
    id: '12',
    name: 'Tanteo',
    category: 'App / Producto Digital',
    description: 'Producto digital con interfaz limpia y arquitectura de información clara. Diseño de sistema y prototipo interactivo.',
    stack: ['UX', 'UI', 'Prototype']
  }
]

export const TESTIMONIALS = [
  {
    quote: 'Sandro unifica lo que parece imposible: una robusta destreza en código WebGL tridimensional junto a una sensibilidad artística asombrosa.',
    name:  'José Manuel Cabello',
    role:  'Co-Founder & Lead Producer @ BeCube'
  },
  {
    quote: 'Sus desarrollos web no son meras interfaces, son mundos inmersivos interactivos de primer nivel. Un verdadero pionero de la Alquimia Digital.',
    name:  'John Astorquiza',
    role:  'Creative Director @ Digital Alchemy London'
  }
]

export const CTA = {
  badge: 'DISPONIBLE PARA PROYECTOS 2026',
  title: 'INICIAR PROYECTO',
  body:  '¿Tienes una idea que requiera fusionar el diseño físico, 3D, sensorización o interfaces web inmersivas de alto impacto?',
  ctaLabel: 'HABLEMOS POR WHATSAPP',
  ctaHref:  'https://wa.me/34618514254?text=Hola%20Sandro%2C%20he%20visto%20tu%20portfolio%20ssiliutodesign-web%20y%20me%20gustar%C3%ADa%20hablar%20sobre%20un%20proyecto.',
  meta:  'RESPUESTA DIRECTA EN MENOS DE 12 H · TFN GMT+0 · BIO GMT+1 · LDN GMT+0'
}

export const FOOTER = {
  brand: 'SSILIUTODESIGN — WEB',
  copyright: '© 2026 ssiliutodesign-web. Reservados todos los derechos por Sandro Siliuto.',
  tagline: 'ALQUIMIA DIGITAL · FÍSICA-VIRTUAL · EST. 2026',
  cities: 'Tenerife · Londres · Bilbao'
}
