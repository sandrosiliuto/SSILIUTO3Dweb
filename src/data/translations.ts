import { TranslationSchema, LanguageCode, Testimonial } from '../types';

export const languages: { code: LanguageCode; name: string }[] = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'ru', name: 'Русский' },
  { code: 'nl', name: 'Vlaams (NL)' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' }
];

export const testimonials: Testimonial[] = [
  {
    name: 'José Manuel Cabello',
    role: 'Co-Founder & Lead Producer @ BeCube',
    quote: {
      es: 'Sandro unifica lo que parece imposible: una robusta destreza en código WebGL tridimensional junto a una sensibilidad artística asombrosa.',
      en: 'Sandro unifies what seems impossible: a robust expertise in three-dimensional WebGL code paired with an astonishing artistic sensitivity.',
      de: 'Sandro vereint, was unmöglich erscheint: eine robuste Expertise im dreidimensionalen WebGL-Code gepaart mit einer erstaunlichen künstlerischen Sensibilität.',
      fr: 'Sandro unit ce qui semble impossible : une expertise solide dans le code WebGL tridimensionnel associée à une sensibilité artistique étonnante.',
      ru: 'Сандро объединяет невозможное: глубокие технические знания трехмерного WebGL-кода с потрясающей художественной чуткостью.',
      nl: 'Sandro verenigt wat onmogelijk lijkt: een robuuste expertise in driedimensionale WebGL-code gecombineerd met een verbluffende artistieke gevoeligheid.',
      zh: '桑德罗将看似不可能的事情融为一体：扎实的三维WebGL代码专业能力与惊人的艺术触觉。',
      ja: 'サンドロは、一見不可能に思えるWebGLの高度な立体プログラミング能力と、圧倒的な芸術的感性を高次元で融合させてくれます。'
    },
    avatar: 'JC'
  },
  {
    name: 'John Astorquiza',
    role: 'Creative Director @ Digital Alchemy London',
    quote: {
      es: 'Sus desarrollos web no son meras interfaces, son mundos inmersivos interactivos de primer nivel. Un verdadero pionero de la Alquimia Digital.',
      en: 'His web developments are not mere interfaces; they are premium level interactive immersive worlds. A true pioneer of Digital Alchemy.',
      de: 'Seine Webentwicklungen sind keine bloßen Schnittstellen; sie sind interaktive, immersive Welten auf Premium-Niveau. Ein wahrer Pionier der Digitalen Alchemie.',
      fr: 'Ses développements web ne sont pas de simples interfaces ; ce sont des mondes immersifs interactifs haut de gamme. Un vrai pionnier de l\'Alchimie Digitale.',
      ru: 'Его веб-разработки — это не просто интерфейсы, это интерактивные иммерсивные миры премиум-уровня. Настоящий пионер цифровой алхимии.',
      nl: 'Zijn webontwikkelingen zijn geen loutere interfaces; het zijn interactieve, meeslepende werelden van topniveau. Een echte pionier van de Digitale Alchemie.',
      zh: '他的网页开发作品不仅是界面，更是顶级的沉浸式交互世界。真正的数字炼金术先驱。',
      ja: '彼のWeb開発は単なるインターフェースの枠を超え、第一線級の没入型インタラクティブ空間です。まさに「デジタルアルケミー」の先駆者。'
    },
    avatar: 'JA'
  }
];

export const translations: Record<LanguageCode, TranslationSchema> = {
  es: {
    hero: {
      tagline: 'ALQUIMIA DIGITAL',
      subtagline: 'INTERSECCIÓN ENTRE EL MUNDO FÍSICO Y DIGITAL',
      cta: 'Explorar Portales'
    },
    philosophy: {
      title: 'LA FILOSOFÍA DEL ESTUDIO',
      body: 'Sandro Siliuto es un estudio de arte y tecnología basado en Tenerife, Londres y Bilbao, especializado en la intersección entre el mundo físico y digital (#DigitalAlchemy). Creamos soluciones conceptuales, interacciones tridimensionales y desarrollo web de vanguardia para marcas y artistas globales.',
      digitalAlchemy: 'FÍSICO ⇄ DIGITAL'
    },
    gallery: {
      title: 'PORTALES DE CÓDIGO',
      subtitle: 'Haz clic en cualquier mockup para desplegar el entorno interactivo en vivo. Pasa el ratón para previsualizar el scroll.',
      demoBtn: 'Ver Demo Interactiva',
      caseBtn: 'Ver Caso de Estudio',
      closeBtn: 'Cerrar Portal',
      externalBtn: 'Visitar Web Externa',
      technologies: 'TECNOLOGÍAS CLAVE',
      caseStudyTitle: 'CASO DE ESTUDIO',
      challengeTitle: 'El Desafío',
      solutionTitle: 'La Solución de Alquimia'
    },
    contact: {
      title: 'INICIAR PROYECTO',
      subtitle: '¿Tienes una idea que requiera fusionar el diseño físico, 3D, sensorización o interfaces web inmersivas de alto impacto?',
      glowingText: 'DISPONIBLE PARA PROYECTOS 2026',
      button: 'Hablemos por WhatsApp',
      placeholderMessage: 'Hola Sandro, he visto tu portfolio ssiliutodesign-web y me gustaría hablar sobre un proyecto.'
    },
    testimonials: {
      title: 'CONFIDENCIA TECNOLÓGICA',
      subtitle: 'Lo que dicen de trabajar con Sandro Siliuto en el nexo entre el hardware, el arte y el píxel.'
    },
    footer: {
      rights: '© 2026 ssiliutodesign-web. Reservados todos los derechos por Sandro Siliuto.',
      location: 'Tenerife • Londres • Bilbao'
    }
  },
  en: {
    hero: {
      tagline: 'DIGITAL ALCHEMY',
      subtagline: 'INTERSECTION OF PHYSICAL AND DIGITAL REALMS',
      cta: 'Explore Portals'
    },
    philosophy: {
      title: 'STUDIO PHILOSOPHY',
      body: 'Sandro Siliuto is an art & technology studio located in Tenerife, London, and Bilbao, specializing in the intersection between the physical and digital world (#DigitalAlchemy). We create conceptual solutions, three-dimensional interactions, and cutting-edge web development for global brands and outstanding artists.',
      digitalAlchemy: 'PHYSICAL ⇄ DIGITAL'
    },
    gallery: {
      title: 'CODE PORTALS',
      subtitle: 'Click on any mockup to play with the live interactive environment. Hover to preview the auto-scroll.',
      demoBtn: 'Launch Live Demo',
      caseBtn: 'View Case Study',
      closeBtn: 'Close Portal',
      externalBtn: 'Visit External Web',
      technologies: 'KEY TECHNOLOGIES',
      caseStudyTitle: 'CASE STUDY',
      challengeTitle: 'The Challenge',
      solutionTitle: 'The Alchemy Solution'
    },
    contact: {
      title: 'START A PROJECT',
      subtitle: 'Have a project requiring the fusion of physical products, 3D config, active sensors, or premium high-impact web interfaces?',
      glowingText: 'AVAILABLE FOR PROJECTS 2026',
      button: 'Chat on WhatsApp',
      placeholderMessage: 'Hello Sandro, I have seen your ssiliutodesign-web portfolio and I would like to talk about a project.'
    },
    testimonials: {
      title: 'TECHNOLOGICAL TRUST',
      subtitle: 'What people say about working with Sandro Siliuto at the nexus of hardware, art, and pixels.'
    },
    footer: {
      rights: '© 2026 ssiliutodesign-web. All rights reserved by Sandro Siliuto.',
      location: 'Tenerife • London • Bilbao'
    }
  },
  de: {
    hero: {
      tagline: 'DIGITALE ALCHEMIE',
      subtagline: 'SCHNITTPUNKTE DER PHYSISCHEN UND DIGITALEN WELT',
      cta: 'Portale Erkunden'
    },
    philosophy: {
      title: 'STUDIOPHILOSOPHIE',
      body: 'Sandro Siliuto ist ein Kunst- und Technologie-Studio mit Sitz in Teneriffa, London und Bilbao, spezialisiert auf das Zusammenspiel der physischen und digitalen Welt (#DigitalAlchemy). Wir schaffen konzeptionelle Lösungen, 3D-Interaktionen und maßgeschneiderte Webentwicklung für anspruchsvolle Marken und Urheber.',
      digitalAlchemy: 'PHYSISCH ⇄ DIGITAL'
    },
    gallery: {
      title: 'CODE-PORTALE',
      subtitle: 'Klicken Sie auf ein Mockup, um die interaktive Live-Umgebung zu starten. Bewegen Sie den Mauszeiger, um Scroll-Vorschau anzuzeigen.',
      demoBtn: 'Live-Demo Starten',
      caseBtn: 'Fallstudie Anzeigen',
      closeBtn: 'Portal Schließen',
      externalBtn: 'Externe Website Besuchen',
      technologies: 'KERNTECHNOLOGIEN',
      caseStudyTitle: 'FALLSTUDIE',
      challengeTitle: 'Die Herausforderung',
      solutionTitle: 'Die Alchemie-Lösung'
    },
    contact: {
      title: 'PROJEKT STARTEN',
      subtitle: 'Haben Sie eine Idee, die das Verschmelzen von Produktdesign, 3D-Scans, Sensorik oder immersivem Web erfordert?',
      glowingText: 'VERFÜGBAR FÜR PROJEKTE 2026',
      button: 'Über WhatsApp Sprechen',
      placeholderMessage: 'Hallo Sandro, ich habe dein Portfolio ssiliutodesign-web gesehen und würde gerne über ein Projekt sprechen.'
    },
    testimonials: {
      title: 'TECHNOLOGISCHES VERTRAUEN',
      subtitle: 'Was Kooperationspartner über die Zusammenarbeit mit Sandro Siliuto an der Schnittstelle von Hardware, Kunst und Pixeln sagen.'
    },
    footer: {
      rights: '© 2026 ssiliutodesign-web. Alle Rechte vorbehalten von Sandro Siliuto.',
      location: 'Teneriffa • London • Bilbao'
    }
  },
  fr: {
    hero: {
      tagline: 'ALCHIMIE DIGITALE',
      subtagline: 'INTERSECTION ENTRE LES MONDES PHYSIQUES ET NUMÉRIQUES',
      cta: 'Explorer les Portails'
    },
    philosophy: {
      title: 'PHILOSOPHIE DU STUDIO',
      body: 'Sandro Siliuto est un studio d\'art et de technologie basé à Tenerife, Londres et Bilbao, spécialisé dans l\'intersection entre le monde physique et numérique (#DigitalAlchemy). Nous créons des concepts originaux, des interactions 3D et du développement web haut de gamme pour marques emblématiques.',
      digitalAlchemy: 'PHYSIQUE ⇄ NUMÉRIQUE'
    },
    gallery: {
      title: 'PORTAILS DE CODE',
      subtitle: 'Cliquez sur n\'importe quelle fenêtre pour charger l\'environnement interactif. Survolez avec la souris pour le défilement automatique.',
      demoBtn: 'Lancer la Démo Live',
      caseBtn: 'Voir le Cas d\'Étude',
      closeBtn: 'Fermer le Portail',
      externalBtn: 'Visiter le Site Web',
      technologies: 'TECHNOLOGIES CLÉS',
      caseStudyTitle: 'CAS D\'ÉTUDE',
      challengeTitle: 'Le Défi',
      solutionTitle: 'La Solution d\'Alchimie'
    },
    contact: {
      title: 'COMMENCER UN PROJET',
      subtitle: 'Avez-vous un projet nécessitant de fusionner design matériel, configurateurs 3D ou interfaces Web immersives ?',
      glowingText: 'DISPONIBLE POUR PROYECTS 2026',
      button: 'Parler sur WhatsApp',
      placeholderMessage: 'Bonjour Sandro, j\'ai vu votre portfolio ssiliutodesign-web et je souhaiterais parler d\'un projet.'
    },
    testimonials: {
      title: 'CONFIANCE TECHNOLOGIQUE',
      subtitle: 'Ce qu\'on dit de la collaboration avec Sandro Siliuto, de l\'art de l\'atelier aux pixels d\'écran.'
    },
    footer: {
      rights: '© 2026 ssiliutodesign-web. Tous droits réservés par Sandro Siliuto.',
      location: 'Tenerife • Londres • Bilbao'
    }
  },
  ru: {
    hero: {
      tagline: 'ЦИФРОВАЯ АЛХИМИЯ',
      subtagline: 'ПЕРЕСЕЧЕНИЕ ФИЗИЧЕСКОГО И ЦИФРОВОГО МИРОВ',
      cta: 'Исследовать порталы'
    },
    philosophy: {
      title: 'ФИЛОСОФИЯ СТУДИИ',
      body: 'Sandro Siliuto — студия искусства и технологий, расположенная на Тенерифе, в Лондоне и Бильбао. Мы специализируемся на стыке физического ремесла и кода (#DigitalAlchemy). Разрабатываем концептуальные трёхмерные интерфейсы и премиальные сайты для мировых брендов и художников.',
      digitalAlchemy: 'РЕАЛЬНОСТЬ ⇄ КОД'
    },
    gallery: {
      title: 'ПОРТАЛЫ КОДА',
      subtitle: 'Нажмите на любой макет, чтобы запустить живой проект во встроенном браузере. Наведите мышь для запуска автопрокрутки.',
      demoBtn: 'Открыть демо',
      caseBtn: 'Кейс-стади',
      closeBtn: 'Закрыть портал',
      externalBtn: 'Посетить внешний сайт',
      technologies: 'КЛЮЧЕВЫЕ ТЕХНОЛОГИИ',
      caseStudyTitle: 'CASE STUDY',
      challengeTitle: 'Задача',
      solutionTitle: 'Решение Алхимии'
    },
    contact: {
      title: 'НАЧАТЬ ПРОЕКТ',
      subtitle: 'У вас есть идея, требующая слияния физических носителей, 3D-моделей или высокотехнологичных иммерсивных интерфейсов?',
      glowingText: 'ДОСТУПЕН ДЛЯ ПРОЕКТОВ 2026',
      button: 'Обсудить в WhatsApp',
      placeholderMessage: 'Здравствуйте, Сандро. Я просмотрел ваше портфолио ssiliutodesign-web и хотел бы предложить проект.'
    },
    testimonials: {
      title: 'ТЕХНОЛОГИЧЕСКОЕ ДОВЕРИЕ',
      subtitle: 'Что говорят о сотрудничестве с Сандро Силиуто на стыке производства, цифрового искусства и дизайна.'
    },
    footer: {
      rights: '© 2026 ssiliutodesign-web. Все права защищены Сандро Силиуто.',
      location: 'Тенерифе • Лондон • Бильбао'
    }
  },
  nl: {
    hero: {
      tagline: 'DIGITALE ALCHEMIE',
      subtagline: 'INTERSECTIE VAN FYSIEKE EN DIGITALE WERELDEN',
      cta: 'Verken Portalen'
    },
    philosophy: {
      title: 'STUDIOPHILOSOFIE',
      body: 'Sandro Siliuto is een studio voor kunst en technologie gevestigd in Tenerife, Londen en Bilbao, gespecialiseerd op de grens tussen de fysieke en digitale wereld (#DigitalAlchemy). We creëren conceptuele webontwerpen, 3D-interactie en bekroonde interfaces voor merken en ambitieuze artiesten.',
      digitalAlchemy: 'FYSIEK ⇄ DIGITAAL'
    },
    gallery: {
      title: 'CODEPORTALEN',
      subtitle: 'Klik op een mockup om de live interactieve pagina te openen. Hover om de autoscroll-preview te bekijken.',
      demoBtn: 'Start Live Demo',
      caseBtn: 'Bekijk Case Study',
      closeBtn: 'Sluit Portaal',
      externalBtn: 'Bezoek Externe Web',
      technologies: 'KERNTECHNOLOGIEEN',
      caseStudyTitle: 'CASE STUDY',
      challengeTitle: 'De Uitdaging',
      solutionTitle: 'De Alchemistische Oplossing'
    },
    contact: {
      title: 'PROJECT STARTEN',
      subtitle: 'Heeft u een concept dat de integratie van fysiek design, 3D-configuratoren, IoT-sensoriek of premium webinterfaces vereist?',
      glowingText: 'BESCHIKBAAR VOOR PROJECTEN 2026',
      button: 'Hectisch praten op WhatsApp',
      placeholderMessage: 'Hallo Sandro, ik heb je portfolio ssiliutodesign-web gezien en wil graag praten over een project.'
    },
    testimonials: {
      title: 'TECHNOLOGISCH VERTROUWEN',
      subtitle: 'Wat partners over de samenwerking met Sandro Siliuto zeggen aan de grens van hardware, kunst en code.'
    },
    footer: {
      rights: '© 2026 ssiliutodesign-web. Alle rechten voorbehouden door Sandro Siliuto.',
      location: 'Tenerife • Londen • Bilbao'
    }
  },
  zh: {
    hero: {
      tagline: '数字炼金术',
      subtagline: '现实空间与虚拟像素的交叉演绎',
      cta: '揭晓互动洞天'
    },
    philosophy: {
      title: '工作室哲学',
      body: '桑德罗·西柳托（Sandro Siliuto）是一家扎根于特内里费岛、伦敦和毕尔巴鄂的艺术与科技工作室。我们专注于物理硬件与尖端代码之间的无缝交织（#DigitalAlchemy），为全球的高端品牌及艺术家塑造极富思想哲理的交互，三维WebGL以及前卫工程。',
      digitalAlchemy: '物理材质 ⇄ 极客代码'
    },
    gallery: {
      title: '代码法阵',
      subtitle: '点击任何轻量浏览器窗口即可将其膨胀为全屏，尽情测试其中每一个高交互体验。鼠标悬停时可预览自动纵深滚动。',
      demoBtn: '启动即时体验',
      caseBtn: '深入研发细节',
      closeBtn: '折合窗口',
      externalBtn: '阅览原站',
      technologies: '核心硬件与代码武器',
      caseStudyTitle: '研发实录',
      challengeTitle: '面临的挑战',
      solutionTitle: '解法之道'
    },
    contact: {
      title: '启封合作',
      subtitle: '您的绝赞构想是否需要融入三维工业设计、WebGL前沿转场、传感器感应或数字艺术融合？',
      glowingText: '2026 预约通道已开启',
      button: '在 WhatsApp 与我畅谈',
      placeholderMessage: '您好桑德罗，在您的 ssiliutodesign-web 看到您的惊艳代表作，非常希望能跟您商讨接下来的重磅合作。'
    },
    testimonials: {
      title: '信任背书',
      subtitle: '听听他们如何评价与桑德罗在硬件极客、空间概念和现代网页上的深度协作体验。'
    },
    footer: {
      rights: '© 2026 ssiliutodesign-web. Sandro Siliuto 全球设计工作室持存所有权。',
      location: '特内里费岛 • 伦敦 • 毕尔巴鄂'
    }
  },
  ja: {
    hero: {
      tagline: 'DIGITAL ALCHEMY / デジタル錬金術',
      subtagline: '物理的リアリティと抽象的なピクセルが交わる地点',
      cta: 'ポータルを展開する'
    },
    philosophy: {
      title: 'スタジオのビジョン',
      body: 'サンドロ・シリウート（Sandro Siliuto）は、テネリフェ、ロンドン、ビルバオを拠点とする、アートとテクノロジーの融合を掲げたスタジオです。3Dプリント、マッピングなどの物理空間技術と、最前線のWebGLやReactなどのピクセルコードを精密に掛け合わせ（#DigitalAlchemy）、唯一無二のインタラクティブ体験を世界のブランドやアーティストに提供します。',
      digitalAlchemy: 'フィジカル ⇄ デジタル'
    },
    gallery: {
      title: 'コードポータル',
      subtitle: '任意のモックアップをクリックすると画面が拡張され、リアルタイムWebをそのまま操作できます。ホバーで縦スクロールが連動します。',
      demoBtn: 'インタラクティブ体験を起動',
      caseBtn: 'ケーススタディを開く',
      closeBtn: 'ポータルを閉じる',
      externalBtn: '外部Webサイトへ',
      technologies: 'コアテクノロジー',
      caseStudyTitle: 'ケーススタディ',
      challengeTitle: '課題',
      solutionTitle: '錬金的な解決アプローチ'
    },
    contact: {
      title: 'プロジェクトの依頼',
      subtitle: '製品の3Dコンフィギュレーター、IoTインタラクション、高精度で洗練されたWebが必要ですか？',
      glowingText: '2026年プロジェクト予約受付中',
      button: 'WhatsAppで相談する',
      placeholderMessage: 'こんにちはサンドロ、ssiliutodesign-webのポートフォリオを拝見し、プロジェクトについてご相談したく連絡しました。'
    },
    testimonials: {
      title: '技術と芸術の信頼関係',
      subtitle: 'ハードウェア、アート、そしてピクセルの架け橋となるサンドロ・シリウートとの協働評価。'
    },
    footer: {
      rights: '© 2026 ssiliutodesign-web. Sandro Siliuto. All rights reserved.',
      location: 'テネリフェ • ロンドン • ビルバオ'
    }
  }
};
