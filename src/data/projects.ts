import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'becube-3-d',
    title: 'BeCube 3D',
    url: 'https://becube-3-d.vercel.app/',
    techs: ['Three.js', 'React', 'WebGL', 'Tailwind', '3D Printing'],
    category: {
      es: 'Impresión 3D y Configurador Web',
      en: '3D Printing & Web Configurator',
      de: '3D-Druck & Web-Konfigurator',
      fr: 'Impression 3D & Configurateur Web',
      ru: '3D-печать и веб-конфигуратор',
      nl: '3D-printen & Webconfigurator',
      zh: '3D打印与网页配置器',
      ja: '3Dプリント＆Webコンフィギュレーター'
    },
    description: {
      es: 'Ecosistema de modelado e impresión 3D interconectado con un visor interactivo en tiempo real para visualizar prototipos físicos en la web.',
      en: '3D modeling and printing ecosystem interconnected with an interactive real-time viewer for physical prototyping on the web.',
      de: '3D-Modellierungs- und Druck-Ökosystem, verbunden mit einem interaktiven Echtzeit-Viewer für physisches Prototyping im Web.',
      fr: 'Écosystème de modélisation et d\'impression 3D relié à un visualiseur interactif en temps réel pour le prototypage physique sur le web.',
      ru: 'Экосистема 3D-моделирования и печати, объединенная с интерактивным просмотрщиком в реальном времени для физического прототипирования.',
      nl: '3D-modellerings- en print-ecosysteem verbonden met een interactieve realtime viewer voor fysieke prototyping op het web.',
      zh: '与网页交互式实时观察器互连 of 3D 建模和打印生态系统，用于物理原型制作。',
      ja: 'Web上での物理的な試作のために、リアルタイムのインタラクティブ・ビューアと相互接続された3Dモデリングおよび印刷エコシステム。'
    },
    caseStudy: {
      es: {
        challenge: 'Crear una interfaz capaz de renderizar modelos CAD complejos en navegadores móviles con alta fidelidad y velocidad.',
        solution: 'Implementación de WebGL optimizado mediante Three.js, compresión de mallas Draco y shaders personalizados de material físico.',
        technologies: 'React Three Fiber, GLSL, Vite, Draco Decoders.'
      },
      en: {
        challenge: 'Create an interface capable of rendering complex CAD models in mobile browsers with high fidelity and speed.',
        solution: 'Implementation of WebGL optimized via Three.js, Draco mesh compression, and custom physical material shaders.',
        technologies: 'React Three Fiber, GLSL, Vite, Draco Decoders.'
      },
      de: {
        challenge: 'Erstellung einer Schnittstelle, die komplexe CAD-Modelle in mobilen Browsern mit hoher Wiedergabetreue und Geschwindigkeit rendern kann.',
        solution: 'Implementierung von WebGL optimiert über Three.js, Draco-Netzkomprimierung und benutzerdefinierten physikalischen Material-Shadern.',
        technologies: 'React Three Fiber, GLSL, Vite, Draco Decoders.'
      },
      fr: {
        challenge: 'Créer une interface capable de restituer des modèles CAO complexes dans des navigateurs mobiles avec une fidélité et une vitesse élevées.',
        solution: 'Implémentation de WebGL optimisé via Three.js, compression de maillage Draco et shaders de matériaux physiques personnalisés.',
        technologies: 'React Three Fiber, GLSL, Vite, Draco Decoders.'
      },
      ru: {
        challenge: 'Создание интерфейса, способного отображать сложные CAD-модели в мобильных браузерах с высокой точностью и скоростью.',
        solution: 'Внедрение WebGL, оптимизированного с помощью Three.js, сжатие сеток Draco и пользовательские шейдеры физических материалов.',
        technologies: 'React Three Fiber, GLSL, Vite, Draco Decoders.'
      },
      nl: {
        challenge: 'Creëer een interface die complexe CAD-modellen in mobiele browsers kan renderen met hoge getrouwheid en snelheid.',
        solution: 'Implementatie van geoptimaliseerde WebGL via Three.js, Draco mesh compressie en aangepaste fysieke materiaal shaders.',
        technologies: 'React Three Fiber, GLSL, Vite, Draco Decoders.'
      },
      zh: {
        challenge: '在高保真度和高速度下在移动浏览器中渲染复杂的CAD模型。',
        solution: '通过Three.js优化WebGL，Draco网格压缩和自定义物理材质着色器。',
        technologies: 'React Three Fiber, GLSL, Vite, Draco Decoders.'
      },
      ja: {
        challenge: 'モバイルブラウザ上で、複雑なCADモデルを高忠実度かつ高速にレンダリング可能なインターフェースの構築。',
        solution: 'Three.js経由で最適化されたWebGL、Dracoメッシュ圧縮、およびカスタム物理マテリアルシェーダーの実装。',
        technologies: 'React Three Fiber, GLSL, Vite, Draco Decoders.'
      }
    },
    mockColor: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #581c87 100%)'
  },
  {
    id: 'soundreact',
    title: 'SoundReact Studio',
    url: 'https://sandrosiliuto.github.io/soundreact/',
    techs: ['Web Audio API', 'Canvas 2D', 'Svelte', 'Creative Coding', 'DSP'],
    category: {
      es: 'Alquimia de Audio y Reactividad Visual',
      en: 'Audio Alchemy & Visual Reactivity',
      de: 'Audio-Alchemie & Visuelle Reaktivität',
      fr: 'Alchimie Audio & Réactivité Visuelle',
      ru: 'Аудиоалхимия и визуальная реактивность',
      nl: 'Audio-alchemie & Visuele Reactiviteit',
      zh: '音频炼金术与视觉反应',
      ja: 'オーディオ錬金術＆ビジュアルリアクティビティ'
    },
    description: {
      es: 'Generador de partículas y frecuencias abstractas que reaccionan de manera milimétrica al espectro de entrada del micrófono o de pistas seleccionadas.',
      en: 'Abstract frequencies and particle generator that react millimetrically to the microphone input spectrum or selected tracks.',
      de: 'Abstrakte Frequenzen und Partikelgenerator, die millimetergenau auf das Mikrofoneingangsspektrum oder ausgewählte Titel reagieren.',
      fr: 'Générateur abstrait de fréquences et de particules qui réagit au millimètre près au spectre d\'entrée du micro ou des pistes sélectionnées.',
      ru: 'Генератор абстрактных частот и частиц, с миллиметровой точностью реагирующий на спектр микрофонного входа или выбранных треков.',
      nl: 'Abstract spectrum- en deeltjesgenerator die tot op de millimeter reageert op de microfooningang of geselecteerde nummers.',
      zh: '抽象频率和粒子生成器，可对麦克风输入光谱或选定轨道做出毫米级反应。',
      ja: 'マイク入力のスペクトルや選択したトラックにミリ単位で反応する、抽象的な周波数と粒子のジェネレーター。'
    },
    caseStudy: {
      es: {
        challenge: 'Procesar transformadas rápidas de Fourier (FFT) en tiempo real sin obstruir el hilo principal de renderizado.',
        solution: 'Uso de analizadores de audio en Web Workers y un bucle de animación optimizado con requestAnimationFrame con retroalimentación cromática.',
        technologies: 'Web Audio API, Fast Fourier Transform, HTML5 Canvas, SvelteJS.'
      },
      en: {
        challenge: 'Process Fast Fourier Transforms (FFT) in real-time without blocking the main rendering thread.',
        solution: 'Integration of audio analyzers in Web Workers and an animation loop optimized with requestAnimationFrame featuring chromatic feedback.',
        technologies: 'Web Audio API, Fast Fourier Transform, HTML5 Canvas, SvelteJS.'
      },
      de: {
        challenge: 'Verarbeitung von Schnellen Fourier-Transformationen (FFT) in Echtzeit, ohne den Haupt-Rendering-Thread zu blockieren.',
        solution: 'Integration von Audio-Analysatoren in Web Workern und einer mit requestAnimationFrame optimierten Animationsschleife mit chromatischem Feedback.',
        technologies: 'Web Audio API, Fast Fourier Transform, HTML5 Canvas, SvelteJS.'
      },
      fr: {
        challenge: 'Traiter des transformées de Fourier rapides (FFT) en temps réel sans bloquer le thread de rendu principal.',
        solution: 'Intégration d\'analyseurs audio dans Web Workers et d\'une boucle d\'animation optimisée avec requestAnimationFrame avec retour chromatique.',
        technologies: 'Web Audio API, Fast Fourier Transform, HTML5 Canvas, SvelteJS.'
      },
      ru: {
        challenge: 'Обработка быстрого преобразования Фурье (БПФ) в реальном времени без блокировки основного потока рендеринга.',
        solution: 'Интеграция аудиоанализаторов в Web Workers и цикл анимации, оптимизированный с помощью requestAnimationFrame с хроматической обратной связью.',
        technologies: 'Web Audio API, Fast Fourier Transform, HTML5 Canvas, SvelteJS.'
      },
      nl: {
        challenge: 'Verwerk Fast Fourier Transforms (FFT) in realtime zonder de hoofd-renderingthread te blokkeren.',
        solution: 'Integratie van audio-analyzers in Web Workers en een animatieloop geoptimaliseerd met requestAnimationFrame met chromatische feedback.',
        technologies: 'Web Audio API, Fast Fourier Transform, HTML5 Canvas, SvelteJS.'
      },
      zh: {
        challenge: '实时处理快速傅里叶变换（FFT），而不会阻碍主渲染线程。',
        solution: '在Web Workers中集成音频分析器，并使用包含色调反馈的requestAnimationFrame优化动画循环。',
        technologies: 'Web Audio API, Fast Fourier Transform, HTML5 Canvas, SvelteJS.'
      },
      ja: {
        challenge: 'メインのレンダリングスレッドをブロックすることなく、高速フーリエ変換（FFT）をリアルタイムで処理する。',
        solution: 'Web Workersでのオーディオアナライザーの統合、およびクロマティックフィードバックを備えたrequestAnimationFrameで最適化されたアニメーションループ。',
        technologies: 'Web Audio API, Fast Fourier Transform, HTML5 Canvas, SvelteJS.'
      }
    },
    mockColor: 'linear-gradient(135deg, #090514 0%, #311042 50%, #a21caf 100%)'
  },
  {
    id: 'plus-dental',
    title: 'Plus Dental',
    url: 'https://plus-dental.vercel.app/',
    techs: ['Vite', 'React', 'Interacciones Premium', 'UX/UI Médica'],
    category: {
      es: 'Diseño Médico de Alta Tecnología',
      en: 'High-Tech Medical Design',
      de: 'High-Tech Medizinisches Design',
      fr: 'Conception Médicale High-Tech',
      ru: 'Высокотехнологичный медицинский дизайн',
      nl: 'High-Tech Medisch Ontwerp',
      zh: '高科技医疗设计',
      ja: 'ハイテクメディカルデザイン'
    },
    description: {
      es: 'Plataforma corporativa e interactiva para odontología avanzada, con un diseño pulcro, higiénico y transiciones interconectadas.',
      en: 'Corporate and interactive platform for advanced dentistry, with a pristine, hygienic design and interconnected transitions.',
      de: 'Interaktive Plattform für fortschrittliche Zahnmedizin mit einem makellosen, hygienischen Design und miteinander verbundenen Übergängen.',
      fr: 'Plateforme d\'entreprise et interactive pour l\'odontologie de pointe, avec un design soigné, hygiénique et des transitions interconnectées.',
      ru: 'Интерактивная платформа для передовой стоматологии с безупречным дизайном и взаимосвязанными переходами.',
      nl: 'Interactief platform voor geavanceerde tandheelkunde, met een ongerept, hygiënisch ontwerp en onderling verbonden overgangen.',
      zh: '用于先进牙科的互动型医院网站，具有整洁卫生的界面和交织过渡。',
      ja: '最高水準の歯科医療のための高機能インタラクティブWebデザイン。徹底した清潔感、整ったタイポグラフィ、シームレスな体験。'
    },
    caseStudy: {
      es: {
        challenge: 'Mitigar la ansiedad tradicional del paciente clínico mediante un entorno visual pulcro y de carga instantánea.',
        solution: 'Arquitectura SPA de servidor ultra-liviana con carga asíncrona de recursos multimedia y maquetación geométrica sofisticada.',
        technologies: 'React 18, Tailwind CSS, Framer Motion, Cloudflare.'
      },
      en: {
        challenge: 'Mitigate traditional clinical patient anxiety through a pristine and instant-loading visual environment.',
        solution: 'Ultra-light static SPA architecture with asynchronous media asset loading and sophisticated geometric layout.',
        technologies: 'React 18, Tailwind CSS, Framer Motion, Cloudflare.'
      },
      de: {
        challenge: 'Minderung traditioneller klinischer Patientenängste durch eine makellose und sofort ladende visuelle Umgebung.',
        solution: 'Ultraleichte statische SPA-Architektur mit asynchronem Laden von Medien-Assets und anspruchsvollem geometrischem Layout.',
        technologies: 'React 18, Tailwind CSS, Framer Motion, Cloudflare.'
      },
      fr: {
        challenge: 'Atténuer l\'anxiété traditionnelle des patients cliniques grâce à un environnement visuel soigné et à chargement instantané.',
        solution: 'Architecture SPA statique ultra-légère avec chargement asynchrone des médias et mise en page géométrique sophistiquée.',
        technologies: 'React 18, Tailwind CSS, Framer Motion, Cloudflare.'
      },
      ru: {
        challenge: 'Снижение традиционной триггерной тревоги пациентов с помощью лаконичного визуального окружения и мгновенной загрузки.',
        solution: 'Сверхлегкая статическая архитектура SPA с асинхронной загрузкой ресурсов и сложной геометрической версткой.',
        technologies: 'React 18, Tailwind CSS, Framer Motion, Cloudflare.'
      },
      nl: {
        challenge: 'Traditionele klinische angst bij patiënten verminderen door een smetteloze en direct geladen visuele omgeving.',
        solution: 'Ultralichte statische SPA-architectuur met asynchrone mediabelasting en een geavanceerde geometrische lay-out.',
        technologies: 'React 18, Tailwind CSS, Framer Motion, Cloudflare.'
      },
      zh: {
        challenge: '通过极简和即时加载的视觉场景，缓解传统临床患者看牙的焦虑症。',
        solution: '超轻量级静态SPA架构，异步加载多媒体资源与精致的几何网格排版。',
        technologies: 'React 18, Tailwind CSS, Framer Motion, Cloudflare.'
      },
      ja: {
        challenge: '清潔感のある即時ロード可能な環境によって、歯科特有の恐怖心や不安を和らげる体験設計。',
        solution: 'メディアの非同期読み込み、グリッドレイアウト、Framer Motionを活用したリラックス感を与えるトランジション。',
        technologies: 'React 18, Tailwind CSS, Framer Motion, Cloudflare.'
      }
    },
    mockColor: 'linear-gradient(135deg, #020617 0%, #0369a1 100%)'
  },
  {
    id: 'xinyuan',
    title: 'Xinyuan Tech',
    url: 'https://xinyuan-nine.vercel.app/',
    techs: ['Minimalism', 'React', 'Motion', 'Next-gen Portfolio', 'CSS Grid'],
    category: {
      es: 'Minimalismo y Geometría Oriental',
      en: 'Minimalism & Oriental Geometry',
      de: 'Minimalismus & Fernöstliche Geometrie',
      fr: 'Minimalisme & Géométrie Orientale',
      ru: 'Минимализм и восточная геометрия',
      nl: 'Minimalisme & Oosterse Geometrie',
      zh: '极简与东方几何美学',
      ja: 'ミニマリズム＆東洋幾何学'
    },
    description: {
      es: 'Un portal conceptual de estética limpia inspirada en la arquitectura asiática, unificando espacio en blanco y grandes contrastes tipográficos.',
      en: 'A conceptual portal with clean aesthetics inspired by Asian architecture, unifying white space and strong typographic contrasts.',
      de: 'Ein konzeptionelles Portal mit sauberer Ästhetik, inspiriert von asiatischer Architektur, das Weißraum und starke typografische Kontraste vereint.',
      fr: 'Un portail conceptuel à l\'esthétique épurée inspirée de l\'architecture asiatique, unifiant l\'espace blanc et de grands contrastes typographiques.',
      ru: 'Концептуальный портал с чистой эстетикой, вдохновленной азиатской архитектурой, объединяющий белое пространство и сильные контрасты.',
      nl: 'Een conceptueel portaal met een schone esthetiek geïnspireerd op Aziatische architectuur, waarin witruimte en sterke contrasten worden verenigd.',
      zh: '一个受东亚建筑学启发的极简概念性门户，融合负空间与高对比度排版。',
      ja: 'アジアの近代建築からインスピレーションを得た、余白とタイポグラフィの対比が美しいコンセプチュアルな作品。'
    },
    caseStudy: {
      es: {
        challenge: 'Lograr una asimetría armónica en pantallas de cualquier relación de aspecto con una respuesta táctil óptima.',
        solution: 'Sólida estructura CSS Grid con paddings relativos al ancho de pantalla (vw/vh) y atenuaciones adaptativas al hacer foco.',
        technologies: 'React, Tailwind CSS, Custom Gestures API.'
      },
      en: {
        challenge: 'Achieve harmonic asymmetry on any aspect-ratio screen with optimal touch response.',
        solution: 'Solid CSS Grid architecture with viewport-relative spacers (vw/vh) and smooth adaptive hover attenuations.',
        technologies: 'React, Tailwind CSS, Custom Gestures API.'
      },
      de: {
        challenge: 'Harmonische Asymmetrie auf Bildschirmen aller Seitenverhältnisse mit optimalem Touch-Feedback erzielen.',
        solution: 'Solide CSS-Grid-Architektur mit Viewport-bezogenen Abständen und sanften, adaptiven Hover-Dämpfungen.',
        technologies: 'React, Tailwind CSS, Custom Gestures API.'
      },
      fr: {
        challenge: 'Atteindre une asymétrie harmonieuse sur tout écran avec une réponse tactile optimale.',
        solution: 'Structure solide en grille CSS avec des espacements relatifs (vw/vh) et des atténuations adaptatives fluides.',
        technologies: 'React, Tailwind CSS, Custom Gestures API.'
      },
      ru: {
        challenge: 'Добиться гармоничной асимметрии на экранах с любым соотношением сторон при оптимальном сенсорном отклике.',
        solution: 'Надежная структура CSS Grid с адаптивными отступами (vw/vh) и плавным затуханием при наведении.',
        technologies: 'React, Tailwind CSS, Custom Gestures API.'
      },
      nl: {
        challenge: 'Zorg voor harmonische asymmetrie op elk schermformaat met een optimale touch-respons.',
        solution: 'Solide CSS Grid-architectuur met viewport-relatieve marges (vw/vh) en soepele adaptieve hover-effecten.',
        technologies: 'React, Tailwind CSS, Custom Gestures API.'
      },
      zh: {
        challenge: '在任何屏幕宽高比上实现谐振非对称视觉布局，并具备优异的移动端触控。',
        solution: '深度结合CSS Grid与视口比例单位（vw/vh）以及流畅的过渡阻尼效果。',
        technologies: 'React, Tailwind CSS, Custom Gestures API.'
      },
      ja: {
        challenge: 'あらゆる画面比率において、モバイルフレンドリーなタッチ感度と非対称な美を保つ設計。',
        solution: '視口（vw/vh）に基づくCSS Gridシステム、エレガントなフェードインアニメーションの融合。',
        technologies: 'React, Tailwind CSS, Custom Gestures API.'
      }
    },
    mockColor: 'linear-gradient(135deg, #0a0a0a 0%, #1c1917 100%)'
  },
  {
    id: 'lagula',
    title: 'La Gula',
    url: 'https://lagula-eta.vercel.app/',
    techs: ['UX Editorial', 'WebGL Transition', 'Framer Motion', 'Gastronomy'],
    category: {
      es: 'Gastronomía de Alta Costura',
      en: 'Haute Couture Gastronomy',
      de: 'Haute Couture Gastronomie',
      fr: 'Gastronomie Haute Couture',
      ru: 'Высокая гастрономия',
      nl: 'Haute Couture Gastronomie',
      zh: '高端定制美食视觉',
      ja: '美食のプレミアム・インターフェース'
    },
    description: {
      es: 'Alineación conceptual para un restaurante gourmet de prestigio, redefiniendo el clásico menú a través de un scroll narrativo fluido y envolvente.',
      en: 'Conceptual landing for a prestigious gourmet restaurant, redefining the classic menu through a fluid, immersive narrative scroll.',
      de: 'Konzeptionelles Design für ein renommiertes Gourmet-Restaurant, das die klassische Speisekarte durch einen fließenden, immersiven narrativen Scroll neu definiert.',
      fr: 'Landing conceptuelle pour un restaurant gastronomique prestigieux, redéfinissant le menu classique à travers un défilement narratif fluide et immersif.',
      ru: 'Концептуальный лендинг для престижного ресторана высокой кухни, переосмысляющий обычное меню с помощью интерактивного нарративного скролла.',
      nl: 'Conceptuele landingspagina voor een prestigieus gastronomisch restaurant, waarbij het klassieke menu opnieuw wordt gedefinieerd via vloeiende verhalende scroll.',
      zh: '极富美感的高级餐厅网站，通过流动式的视差场景与排版重新定义奢华。',
      ja: '格式高いレストランのためのシネマティックなWeb。流れるような縦型ストーリーテリングにより卓越した格調の高さを提示。'
    },
    caseStudy: {
      es: {
        challenge: 'Despertar la sensación táctil y orgánica de los ingredientes a través de una pantalla fría de un ordenador.',
        solution: 'Uso de tipografías serif editoriales emparejadas con máscaras de recorte SVGs de alta precisión y paralaje flotante.',
        technologies: 'Vite, PostCSS Custom Fonts, IntersectionObserver, GSAP-like ease.'
      },
      en: {
        challenge: 'Awaken the tactile and organic feeling of ingredients through a cold computer screen.',
        solution: 'Use of editorial serif typography paired with high-precision SVG clipping masks and floating parallax.',
        technologies: 'Vite, PostCSS Custom Fonts, IntersectionObserver, GSAP-like ease.'
      },
      de: {
        challenge: 'Das taktile und organische Gefühl von Zutaten durch einen kalten Computerbildschirm wecken.',
        solution: 'Verwendung redaktioneller Serif-Typografie gepaart mit hochpräzisen SVG-Beschneidungsmasken und schwebender Parallaxe.',
        technologies: 'Vite, PostCSS Custom Fonts, IntersectionObserver, GSAP-like ease.'
      },
      fr: {
        challenge: 'Éveiller la sensation tactile et organique des ingrédients à travers un écran d\'ordinateur froid.',
        solution: 'Utilisation d\'une typographie serif éditoriale associée à des masques de détourage SVG de haute précision et un parallaxe flottant.',
        technologies: 'Vite, PostCSS Custom Fonts, IntersectionObserver, GSAP-like ease.'
      },
      ru: {
        challenge: 'Пробудить тактильное и органическое вкусовое ощущение продуктов через холодный цифровой экран.',
        solution: 'Использование изящной редакционной антиквы в сочетании с высокоточными масками обрезки SVG и плавающим параллаксом.',
        technologies: 'Vite, PostCSS Custom Fonts, IntersectionObserver, GSAP-like ease.'
      },
      nl: {
        challenge: 'Het tactiele en organische gevoel van ingrediënten opwekken via een koud computerscherm.',
        solution: 'Gebruik van redactionele schreef-typografie gecombineerd met vlijmscherpe SVG-clipping-masks en zwevende parallax.',
        technologies: 'Vite, PostCSS Custom Fonts, IntersectionObserver, GSAP-like ease.'
      },
      zh: {
        challenge: '通过冰冷的数字屏幕让人感受到食材的新鲜与手工美味的质感。',
        solution: '经典衬线字体排版，配合SVG高精密形状路径剪裁和漂浮式视差特效。',
        technologies: 'Vite, PostCSS Custom Fonts, IntersectionObserver, GSAP-like ease.'
      },
      ja: {
        challenge: '画面の冷たさを排し、食材のシズル感や手仕事のぬくもりを伝えるデザイン設計。',
        solution: 'クラシックなセリフフォントの併用、SVGクリッピングマスクによる有機的な曲線表現。',
        technologies: 'Vite, PostCSS Custom Fonts, IntersectionObserver, GSAP-like ease.'
      }
    },
    mockColor: 'linear-gradient(135deg, #180509 0%, #450a0a 50%, #991b1b 100%)'
  },
  {
    id: 'manaya',
    title: 'Manaya',
    url: 'https://manaya-beige.vercel.app/',
    techs: ['Beige Design', 'React', 'Premium Interaction', 'Layout Brutalista'],
    category: {
      es: 'Arquitectura Interior Contemporánea',
      en: 'Contemporary Interior Architecture',
      de: 'Zeitgenössische Innenarchitektur',
      fr: 'Architecture d\'Intérieur Contemporaine',
      ru: 'Современная интерьерная архитектура',
      nl: 'Eigentijdse Interieurarchitectuur',
      zh: '现代室内设计与建筑学',
      ja: '現代インテリア＆空間アーキテクチャ'
    },
    description: {
      es: 'Espacio curado en tonalidades arenas y beiges que alberga proyectos arquitectónicos con un ritmo de cuadrícula roto e iconografía sumamente discreta.',
      en: 'Curated space in sand and beige tones that houses architectural projects with a broken grid rhythm and highly discreet iconography.',
      de: 'Ausgewählter Raum in Sand- und Beigetönen, der Architekturprojekte mit einem aufgebrochenen Raster-Rhythmus und sehr diskreter Ikonografie beherbergt.',
      fr: 'Espace organisé dans des tons sable et beige qui abrite des projets architecturaux avec un rythme de grille brisé et une iconographie très discrète.',
      ru: 'Курируемое пространство в песчаных и бежевых тонах, представляющее архитектурные проекты со сложным асимметричным ритмом сетки.',
      nl: 'Georganiseerde ruimte in zand- en beigetinten met architectonische projecten met een asymmetrisch gridritme en bescheiden iconografie.',
      zh: '沙米色调的大气建筑艺术画廊，使用不对称的网格构造、静谧的转场。',
      ja: 'サンド＆ベージュカラーを採用した洗練された空間デザイン。不規則なグリッドと繊細な空間配置を組み込んだ作品カタログ。'
    },
    caseStudy: {
      es: {
        challenge: 'Crear un equilibrio aséptico y minimalista donde el sitio no compita visualmente con el diseño de interiores expuesto.',
        solution: 'Uso de un espectro cromático monótono cálido, espaciado exagerado (negative margins) y tipografía de ultra-fino grosor.',
        technologies: 'React 19, Vanilla CSS variables, Custom Transitions.'
      },
      en: {
        challenge: 'Create an aseptic and minimalist balance where the site does not visually compete with the showcased interior design.',
        solution: 'Use of a warm monotone chromatic spectrum, exaggerated spacing (negative margins), and ultra-light typography.',
        technologies: 'React 19, Vanilla CSS variables, Custom Transitions.'
      },
      de: {
        challenge: 'Schaffung eines aseptischen und minimalistischen Gleichgewichts, bei dem die Website visuell nicht mit dem ausgestellten Innendesign konkurriert.',
        solution: 'Verwendung eines warmen, eintönigen Farbspektrums, übertriebener Abstände (negative Margen) und ultraleichter Typografie.',
        technologies: 'React 19, Vanilla CSS variables, Custom Transitions.'
      },
      fr: {
        challenge: 'Créer un équilibre aseptique et minimaliste où le site ne fait pas de concurrence visuelle au design d\'intérieur présenté.',
        solution: 'Utilisation d\'un spectre chromatique monotone chaud, d\'espacements exagérés (marges négatives) et d\'une typographie ultra-légère.',
        technologies: 'React 19, Vanilla CSS variables, Custom Transitions.'
      },
      ru: {
        challenge: 'Создание безукоризненного баланса, при котором веб-сайт минималистичен и не подавляет выставляемые работы интерьеров.',
        solution: 'Использование теплого монотонного спектра, просторных негативных отступов и ультратонких начертаний шрифта.',
        technologies: 'React 19, Vanilla CSS variables, Custom Transitions.'
      },
      nl: {
        challenge: 'Creëer een aseptische en minimalistische balans waarbij de website niet concurreert met het gepresenteerde interieurontwerp.',
        solution: 'Gebruik van een warm monotoon kleurenspectrum, gedurfde witruimte (negatieve marges) en uiterst lichte typografie.',
        technologies: 'React 19, Vanilla CSS variables, Custom Transitions.'
      },
      zh: {
        challenge: '让网页布局高度克制，绝不抢占其展示的室内空间硬装摄影作品的视觉重点。',
        solution: '采用极低饱和度的温暖单色调、极为宽阔的黄金白空间，以及细线字重。',
        technologies: 'React 19, Vanilla CSS variables, Custom Transitions.'
      },
      ja: {
        challenge: '掲載している空間インテリアの素材感を邪魔せず、Webサイト自体が美しい静的な額縁となるような引き算の美学。',
        solution: '暖かみのあるベージュトーン。大胆な負の余白（ネガティブマージン）、超極細のタイпоグラフィの採用。',
        technologies: 'React 19, Vanilla CSS variables, Custom Transitions.'
      }
    },
    mockColor: 'linear-gradient(135deg, #1c1917 0%, #78716c 50%, #d6d3d1 100%)'
  },
  {
    id: 'lacasadecrepe',
    title: 'La Casa de Crêpe',
    url: 'https://lacasadecrepe.vercel.app/',
    techs: ['Gourmet UI', 'Tailwind', 'Vector Animations', 'Micro-interactions'],
    category: {
      es: 'Arte Culinario y Boutique',
      en: 'Culinary Art & Boutique',
      de: 'Kulinarische Kunst & Boutique',
      fr: 'Art Culinaire & Boutique',
      ru: 'Кулинарный бутик',
      nl: 'Culinaire Kunst & Boetiek',
      zh: '精品烘焙与视觉艺术',
      ja: 'クラフト・クレープ＆ブティックWeb'
    },
    description: {
      es: 'Una cautivadora experiencia web para una crepería boutique, que integra tipografías script de cortes clásicos e ilustraciones flotantes.',
      en: 'An engaging web experience for a boutique creperie, integrating classic-cut script typographies and floating vector elements.',
      de: 'Ein fesselndes Web-Erlebnis für eine Boutique-Creperie, das klassisch geschnittene Schreibschriften und schwebende Vektorelemente integriert.',
      fr: 'Une expérience web captivante pour une crêperie boutique, intégrant des typographies script classiques et des illustrations flottantes.',
      ru: 'Увлекательный сайт для бутик-блинной, сочетающий в себе классические шрифты ручной работы и парящие векторные иллюстрации.',
      nl: 'Een boeiende webervaring voor een boutique-creperie, waarin klassiek gesneden script-typografie en zwevende vectorelementen worden gecombineerd.',
      zh: '专为精品法式可丽饼甜品屋打造的体验型网站，融合复古手写排版与流畅动画。',
      ja: '手作りの温かみとおしゃれなブティック感を併せ持つ。細やかなアニメーションとエレgantなスクリプト体の絶妙なマリアージュ。'
    },
    caseStudy: {
      es: {
        challenge: 'Unificar la calidez artesanal y los procesos tradicionales con una interfaz moderna y veloz para reservas sólidas.',
        solution: 'Visualización de vectores fluidos, paletas de colores pastel profundos y efectos de hover suaves que simulan papel.',
        technologies: 'HTML5 Canvas, CSS Bezier Animation, React, Vercel Edge.'
      },
      en: {
        challenge: 'Unify artisanal warmth and traditional processes with a modern, fast interface for solid conversions.',
        solution: 'Fluid vector styling, deep warm pastel palettes, and soft paper-like hover interactions.',
        technologies: 'HTML5 Canvas, CSS Bezier Animation, React, Vercel Edge.'
      },
      de: {
        challenge: 'Handwerkliche Wärme und traditionelle Prozesse mit einer modernen, schnellen Schnittstelle für solide Konversionen vereinen.',
        solution: 'Flüssiges Vektor-Styling, tiefe warme Pastellpaletten und weiche, papierähnliche Hover-Interaktionen.',
        technologies: 'HTML5 Canvas, CSS Bezier Animation, React, Vercel Edge.'
      },
      fr: {
        challenge: 'Unifier la chaleur artisanale et les processus traditionnels avec une interface moderne et rapide pour des conversions solides.',
        solution: 'Stylisation vectorielle fluide, palettes de pastels profonds et chauds, et douces interactions au survol rappelant le papier.',
        technologies: 'HTML5 Canvas, CSS Bezier Animation, React, Vercel Edge.'
      },
      ru: {
        challenge: 'Объединить крафтовую ремесленную теплоту с современным и быстрым интерфейсом для стабильной конверсии.',
        solution: 'Рендеринг плавных векторных силуэтов, теплая пастельная гамма и мягкие интерактивные переходы, имитирующие бумагу.',
        technologies: 'HTML5 Canvas, CSS Bezier Animation, React, Vercel Edge.'
      },
      nl: {
        challenge: 'Artisanale warmte en traditionele processen verenigen met een moderne, snelle interface voor solide conversies.',
        solution: 'Vloeiende vectorstyling, diepe warme pastelpaletten en zachte, papierachtige hover-interacties.',
        technologies: 'HTML5 Canvas, CSS Bezier Animation, React, Vercel Edge.'
      },
      zh: {
        challenge: '将手工可丽饼的烘焙温暖感与卓越和快速的数字端交互融为一体，提升预约率。',
        solution: '高饱和温润色系，配合流体矢量边框与质感过渡，赋予纸张般细腻的呼吸动效。',
        technologies: 'HTML5 Canvas, CSS Bezier Animation, React, Vercel Edge.'
      },
      ja: {
        challenge: '焼き立ての手作り感、伝統技術の豊かさを、滑らかな予約体験画面に統合する試み。',
        solution: '温かみのあるパステルグラデーション、紙マテリアル風シャドウ、ベジェ曲線イージングの実装。',
        technologies: 'HTML5 Canvas, CSS Bezier Animation, React, Vercel Edge.'
      }
    },
    mockColor: 'linear-gradient(135deg, #451a03 0%, #78350f 50%, #fef3c7 100%)'
  },
  {
    id: 'hongkong-restaurante',
    title: 'Hong Kong El Médano',
    url: 'https://hongkong-restaurante-elmedano.vercel.app/',
    techs: ['Branding', 'Gourmet Web', 'Vite', 'Responsive Grid', 'SEO Plan'],
    category: {
      es: 'Fusión Culinaria Asiática Real',
      en: 'Real Asian Culinary Fusion',
      de: 'Echte asiatische kulinarische Fusion',
      fr: 'Fusion Culinaire Asiatique Réelle',
      ru: 'Азиатская кулинария и брендинг',
      nl: 'Echte Aziatische Culinaire Fusie',
      zh: '港式美食与滨海度假融合视觉',
      ja: 'アジア料理・モダンメニューシアター'
    },
    description: {
      es: 'El templo gastronómico de El Médano llevado a la web. Un menú interactivo enriquecido gráficamente con una navegación optimizada para dispositivos móviles.',
      en: 'The gastronomic temple of El Médano brought to the web. An interactive menu graphically enriched with optimized mobile navigation.',
      de: 'Der gastronomische Tempel von El Médano im Web. Eine reich bebilderte, interaktive Speisekarte mit optimierter mobiler Navigation.',
      fr: 'Ambiance du restaurant mythique d\'El Médano. Un menu interactif enrichi de photos, optimisé pour les smartphones.',
      ru: 'Известный гастрономический ресторан Эль Медано в цифровом пространстве. Интерактивное меню с отзывчивой адаптацией для смартфонов.',
      nl: 'Het gastronomische icoon van El Médano op internet. Een grafisch rijk interactief menu met geoptimaliseerde mobiele navigatie.',
      zh: '极速加载的数字化菜单，完美契合海滨度假区的快节奏与视觉质感。',
      ja: 'リゾートテラスレストランの本格的な多国籍体験。スマホに完全最適化されたリアルタイムビジュアルメニューカタログ。'
    },
    caseStudy: {
      es: {
        challenge: 'Cargar grandes menús con docenas de imágenes en alta definición sobre conexiones 4G/5G inestables por el viento de El Médano.',
        solution: 'Compresión WebP ultra-agresiva, técnicas de Lazy Loading nativo de imágenes y un esqueleto optimizado de carga (skeletons).',
        technologies: 'Vite, Preact-like light footprint, Image-optim, Edge CDN.'
      },
      en: {
        challenge: 'Load large menus with dozens of high-definition images over unstable 4G/5G mobile connections due to wind conditions.',
        solution: 'Aggressive WebP image compression, native Lazy Loading strategies, and clean layout placeholder skeletons.',
        technologies: 'Vite, Preact-like light footprint, Image-optim, Edge CDN.'
      },
      de: {
        challenge: 'Laden großer Menüs mit Dutzenden hochauflösender Bilder über instabile mobile 4G/5G-Verbindungen aufgrund der Windverhältnisse.',
        solution: 'Aggressive WebP-Bildkompression, native Lazy-Loading-Strategien und saubere Platzhalter-Skelette für das Layout.',
        technologies: 'Vite, Preact-like light footprint, Image-optim, Edge CDN.'
      },
      fr: {
        challenge: 'Charger de grands menus avec des dizaines d\'images HD sur des connexions mobiles 4G/5G instables en raison du vent d\'El Médano.',
        solution: 'Compression d\'image WebP ultra-agressive, stratégies de chargement différé (Lazy Loading) natif et squelettes de mise en page.',
        technologies: 'Vite, Preact-like light footprint, Image-optim, Edge CDN.'
      },
      ru: {
        challenge: 'Обеспечить загрузку тяжелого меню с десятками HD-изображений на нестабильном мобильном интернете 4G/5G на побережье.',
        solution: 'Агрессивное сжатие изображений в WebP, нативная ленивая загрузка и скелетоны для мгновенного визуального ответа.',
        technologies: 'Vite, Preact-like light footprint, Image-optim, Edge CDN.'
      },
      nl: {
        challenge: 'Grote menukaarten met tientallen foto\'s laden over onstabiele mobiele 4G/5G-verbindingen vanwege windsituaties op het terras.',
        solution: 'Agressieve WebP-beeldcompressie, ingebouwde lazy loading en placeholders voor directe visuele feedback.',
        technologies: 'Vite, Preact-like light footprint, Image-optim, Edge CDN.'
      },
      zh: {
        challenge: '在风力巨大的海滨户外无稳定4G/5G信号下，让含有大量高清图片的菜单达到瞬间响应。',
        solution: '高保真级WebP图片极致压缩，完全Lazy-Loading设计，骨架屏（Skeleton Loader）优先渲染。',
        technologies: 'Vite, Preact-like light footprint, Image-optim, Edge CDN.'
      },
      ja: {
        challenge: '海沿いの風などで不安定になりやすいモバイル4G/5G環境でも、画像を乱さずメニューを高速表示させる手法。',
        solution: '徹底的なWebP画像最適化、ネイティブのLazy-Loading、一瞬で切り替わるスケルトン・ローダーの実装。',
        technologies: 'Vite, Preact-like light footprint, Image-optim, Edge CDN.'
      }
    },
    mockColor: 'linear-gradient(135deg, #3f0712 0%, #000000 100%)'
  },
  {
    id: 'panna-cioccolato',
    title: 'Panna & Cioccolato',
    url: 'https://heladeria-panna-cioccolato.vercel.app/',
    techs: ['React', 'Framer Motion', 'Micro-Interactions', 'Fresh Palettes'],
    category: {
      es: 'Heladería Boutique y Branding',
      en: 'Boutique Gelato & Branding',
      de: 'Boutique Gelateria & Branding',
      fr: 'Glace Artisanale & Branding',
      ru: 'Брендинг премиум джелатерии',
      nl: 'Boutique Ijssalon & Branding',
      zh: '意式精品冰淇淋美学',
      ja: 'プレミアムアイスクリーム・グラフィックス'
    },
    description: {
      es: 'Una oleada de frescura interactiva. Paletas pastel combinadas con sutiles efectos de burbujas flotantes que elevan el sabor visual del helado artesanal.',
      en: 'An interactive wave of freshness. Pastel palettes combined with subtle floating bubble effects that elevate the visual flavor of artisan gelato.',
      de: 'Eine interaktive Welle der Frische. Pastellpaletten kombiniert mit subtilen schwebenden Blaseneffekten, die den geschmacklichen Eindruck von handwerklich hergestelltem Gelato verstärken.',
      fr: 'Une vague de fraîcheur interactive. Des palettes pastel combinées à de subtils effets de bulles flottantes qui rehaussent la texture visuelle du gelato artisanal.',
      ru: 'Интерактивная волна свежести. Пастельная айдентика с парящими «молекулами вкуса», визуально отражающая премиальное джелато.',
      nl: 'Een interactieve golf van frisheid. Pastelkleuren gecombineerd met subtiele zwevende bellen die de visuele beleving van ambachtelijk ijs versterken.',
      zh: '极具夏日清爽感的可读性排版，柔和的马卡龙色调搭配细腻气泡浮动特效。',
      ja: '色彩豊かなソルベのようなパステルパレット。細やかな気泡やフロートエフェクトが作り出す至高のアナログ・クラフト体験。'
    },
    caseStudy: {
      es: {
        challenge: 'Evocar sensaciones de frescura instantánea mediante flujos animados interactivos ultra-fluidos.',
        solution: 'Implementación de físicas de flotación utilizando Canvas 2D asíncrono y aceleración por GPU para las transiciones.',
        technologies: 'React, Framer Motion, HTML5 Canvas, Performance Helpers.'
      },
      en: {
        challenge: 'Evoke immediate sensations of freshness through ultra-fluid interactive animated flows.',
        solution: 'Floating physics implementation utilizing asynchronous Canvas 2D and GPU acceleration for visual transitions.',
        technologies: 'React, Framer Motion, HTML5 Canvas, Performance Helpers.'
      },
      de: {
        challenge: 'Sofortige Gefühle von Frische durch ultra-flüssige interaktive animierte Abläufe hervorrufen.',
        solution: 'Schwebende Physik-Implementierung mit asynchronem Canvas 2D und GPU-Beschleunigung für visuelle Übergänge.',
        technologies: 'React, Framer Motion, HTML5 Canvas, Performance Helpers.'
      },
      fr: {
        challenge: 'Évoquer des sensations immédiates de fraîcheur grâce à des flux animés interactifs ultra-fluides.',
        solution: 'Implémentation de physiques de flottaison à l\'aide d\'un Canvas 2D asynchrone et d\'une accélération GPU pour les transitions.',
        technologies: 'React, Framer Motion, HTML5 Canvas, Performance Helpers.'
      },
      ru: {
        challenge: 'Передать свежесть и легкость через ультраплавные интерактивные анимационные потоки.',
        solution: 'Реализация физики покачивания элементов на асинхронном Canvas 2D с GPU-акселерацией графических элементов.',
        technologies: 'React, Framer Motion, HTML5 Canvas, Performance Helpers.'
      },
      nl: {
        challenge: 'Directe frisheid oproepen via ultra-vloeiende interactieve geanimeerde bewegingen.',
        solution: 'Zwevende deeltjes-fysica met asynchroon Canvas 2D en GPU-versnelling voor soepele overgangen.',
        technologies: 'React, Framer Motion, HTML5 Canvas, Performance Helpers.'
      },
      zh: {
        challenge: '通过温和且高性能的流动式界面，唤醒产品冰凉丝滑的食欲感。',
        solution: '基于Canvas 2D的异步小粒子浮动物理学，同时应用GPU硬件加速。',
        technologies: 'React, Framer Motion, HTML5 Canvas, Performance Helpers.'
      },
      ja: {
        challenge: '画面から伝わる「滑らかさ」・「冷たさ」をWeb上の物理挙動でいかに忠実にシミュレートするか。',
        solution: 'Canvas 2D、GPUアクセラレーションを組み込んだトランジション、マイクロアニメーションの最適化。',
        technologies: 'React, Framer Motion, HTML5 Canvas, Performance Helpers.'
      }
    },
    mockColor: 'linear-gradient(135deg, #164e63 0%, #ec4899 100%)'
  },
  {
    id: 'poker-yacht',
    title: 'Poker Yacht Charter',
    url: 'https://poker-yacht-charter.vercel.app/',
    techs: ['Luxury Design', 'Vite', 'Fluid Layout', 'Video Integration', 'Interactive Forms'],
    category: {
      es: 'Yates de Lujo y Estilo de Vida',
      en: 'Luxury Yachts & Lifestyle',
      de: 'Luxusyachten & Lifestyle',
      fr: 'Yachts de Luxe & Art de Vivre',
      ru: 'Аренда суперъяхт и лакшери',
      nl: 'Luxe jachten & Levensstijl',
      zh: '极奢游艇租赁体验',
      ja: 'ラグジュアリーヨット・ライフスタイル'
    },
    description: {
      es: 'Portal de élite para el alquiler de yates en entornos paradisíacos, entrelazando fondos cinemáticos pesados de video y tipografías sans finas con contrastes dorados/fucsia.',
      en: 'Elite portal for yacht charters in paradisiacal destinations, weaving heavy cinematic video backdrops and thin sans-typographies with gold/fuchsia contrast.',
      de: 'Elite-Portal für Yachtcharter in paradiesischen Destinationen, das schwere filmische Videohintergründe und feine serifenlose Typografien mit Gold-/Fuchsia-Kontrasten verbindet.',
      fr: 'Portail d\'élite pour la location de yachts de luxe, associant des arrière-plans vidéo cinématographiques et des typographies fines à un contraste or/fuchsia.',
      ru: 'Премиум-портал для аренды яхт класса люкс. Интеграция широкоформатного фонового видео, элегантных тонких шрифтов и тонкой неоновой подсветки.',
      nl: 'Elite portaal voor jachtcharters op paradijselijke bestemmingen, met filmische video-achtergronden, fijne typografie en sterke contrasten.',
      zh: '极奢游艇出租门户，无缝呈现宽屏电影质感视频背景与尊贵金色/霓虹配色的交互。',
      ja: 'プライベートチャーターヨットのためのWebサイト。シネマティックな動画背景、静的なゴールドとフューシャのネオン光彩が語る至上体験。'
    },
    caseStudy: {
      es: {
        challenge: 'Integrar pesadas secuencias de video en ultra alta definición sin penalizar el rendimiento inicial ni provocar descargas de batería críticas.',
        solution: 'Streaming optimizado mediante codificación H.265 con un fallback inmediato de imágenes vectoriales y reproducción dinámica basada en hardware.',
        technologies: 'HTML5 Video API, Adaptive Buffer, Modern CSS Blends, H.265 codec.'
      },
      en: {
        challenge: 'Integrate heavy ultra-high-definition video sequences without penalizing initial load or draining mobile batteries.',
        solution: 'Optimized streaming via H.265 encoding with fallback vector graphics and custom conditional viewport playback controls.',
        technologies: 'HTML5 Video API, Adaptive Buffer, Modern CSS Blends, H.265 codec.'
      },
      de: {
        challenge: 'Schwere Ultra-HD-Videosequenzen integrieren, ohne die Anfangsladezeit zu beeinträchtigen oder mobile Batterien zu belasten.',
        solution: 'Optimiertes Streaming über H.265-Codierung mit Fallback-Vektorgrafiken und benutzerdefinierten ereignisgesteuerten Steuerelementen.',
        technologies: 'HTML5 Video API, Adaptive Buffer, Modern CSS Blends, H.265 codec.'
      },
      fr: {
        challenge: 'Intégrer de lourdes séquences vidéo UHD sans pénaliser le chargement initial ni épuiser les batteries des appareils mobiles.',
        solution: 'Streaming optimisé via le codage H.265, repli sur des graphiques vectoriels et commandes de lecture conditionnelles.',
        technologies: 'HTML5 Video API, Adaptive Buffer, Modern CSS Blends, H.265 codec.'
      },
      ru: {
        challenge: 'Обеспечить мгновенный старт тяжелых UHD-видеороликов без просадки FPS и излишнего разряда аккумулятора мобильных телефонов.',
        solution: 'Потоковое медиа по кодеку H.265, векторный заглушечный постер и условное отключение автоплея на слабых девайсах.',
        technologies: 'HTML5 Video API, Adaptive Buffer, Modern CSS Blends, H.265 codec.'
      },
      nl: {
        challenge: 'Zware ultra-high-definition videosequenties integreren zonder de laadtijd te schaden of mobiele batterijen leeg te trekken.',
        solution: 'Geoptimaliseerde streaming via H.265-codering met vectorafbeeldingen als terugvaloptie en conditionele afspeelregels per apparaat.',
        technologies: 'HTML5 Video API, Adaptive Buffer, Modern CSS Blends, H.265 codec.'
      },
      zh: {
        challenge: '引入超高清影视级环绕实拍视频的同时，严防长载入时间或导致手持端CPU发烫耗电。',
        solution: '经H.265高级编码压缩的自适应推流，配合轻量矢量遮罩和基于电池状态的感知控制。',
        technologies: 'HTML5 Video API, Adaptive Buffer, Modern CSS Blends, H.265 codec.'
      },
      ja: {
        challenge: '高ビットレートのUHDシネマビデオを、CPUオーバーヘッドやバッテリー消費を防ぎつつ美しくループ起動させる技術。',
        solution: 'H.265圧縮ストリーミング、スマートプレースホルダーベクトル、環境依存型の再生コントロール。',
        technologies: 'HTML5 Video API, Adaptive Buffer, Modern CSS Blends, H.265 codec.'
      }
    },
    mockColor: 'linear-gradient(135deg, #020617 0%, #172554 100%)'
  },
  {
    id: 'tumbao-dates',
    title: 'Tumbao Dates',
    url: 'https://tumbao-dates-oxg9.vercel.app/',
    techs: ['Vite', 'React', 'Motion', 'Interacciones Exclusivas', 'Performance'],
    category: {
      es: 'Gestión de Eventos y Cultura',
      en: 'Event Management & Culture',
      de: 'Event-Management & Kultur',
      fr: 'Gestion d\'Événements & Culture',
      ru: 'Портал шоу и ивентов',
      nl: 'Evenementenbeheer & Cultuur',
      zh: '前卫艺术与票务交互',
      ja: 'イベント＆カルチャーステージ'
    },
    description: {
      es: 'Plataforma dinámica de encuentros y agenda cultural, que fusiona un flujo ágil de fechas con efectos de barrido lateral y transiciones de alto impacto cromático.',
      en: 'Dynamic community meeting and cultural agenda platform, blending a swift dates engine with lateral sweep effects and high impact chromatic transitions.',
      de: 'Dynamische Plattform für Community-Treffen und Kulturagenden, die eine schnelle Terminverwaltung mit seitlichen Sweeps und farbintensiven Übergängen verbindet.',
      fr: 'Plateforme dynamique de rencontres et d\'agenda culturel, mêlant un moteur de dates fluide à des effets de balayage latéral et des transitions chromatiques.',
      ru: 'Динамичное культурное расписание и бронирование, сочетающее горизонтальные слайды, чистые сетки и контрастные оверлеи.',
      nl: 'Dynamisch community- en cultureel agendaplatform dat een snelle datummotor combineert met zijdelingse overgangseffecten.',
      zh: '极佳的演出及前卫派对预定平台，横向滚动与多色彩过渡的杰作。',
      ja: 'エネルギッシュなライフスタイルイベントスケジュール。横方向のシームレスなスワイプと、動きのあるインターフェース。'
    },
    caseStudy: {
      es: {
        challenge: 'Desarrollar un filtrado instantáneo para múltiples flujos de eventos sin parpadeos visuales en el DOM.',
        solution: 'Sincronización de estados locales mediante hooks personalizados y transiciones controladas de Motion Layout.',
        technologies: 'React 18, motion/react, Layout Animations, Memoization.'
      },
      en: {
        challenge: 'Develop instantaneous event filtering across multiple date streams with zero visual flickering.',
        solution: 'Local state synchronization via custom hooks and curated Motion Layout custom transitions.',
        technologies: 'React 18, motion/react, Layout Animations, Memoization.'
      },
      de: {
        challenge: 'Entwicklung einer sofortigen Filterung von Veranstaltungen über mehrere Datenströme hinweg, ohne visuelles Flackern.',
        solution: 'Lokale Zustandssynchronisierung über benutzerdefinierte Hooks und kuratierte Übergänge von Motion Layout.',
        technologies: 'React 18, motion/react, Layout Animations, Memoization.'
      },
      fr: {
        challenge: 'Développer un filtrage d\'événements instantané sur plusieurs flux de dates sans scintillement visuel.',
        solution: 'Synchronisation des états locaux via des hooks personnalisés et des transitions contrôlées de Motion Layout.',
        technologies: 'React 18, motion/react, Layout Animations, Memoization.'
      },
      ru: {
        challenge: 'Обеспечить мгновенную фильтрацию ивентов по времени без артефактов и мигания DOM.',
        solution: 'Локальная синхронизация состояний через кастомные хуки в связке с Motion Layout для плавного положения карточек.',
        technologies: 'React 18, motion/react, Layout Animations, Memoization.'
      },
      nl: {
        challenge: 'Instant evenementenfiltering ontwikkelen over meerdere datumstromen met nul visuele trillingen.',
        solution: 'Synchronisatie van lokale status via aangepaste hooks en verfijnde Motion Layout-overgangen.',
        technologies: 'React 18, motion/react, Layout Animations, Memoization.'
      },
      zh: {
        challenge: '构建针对大量活动日历的瞬时流式筛选，保持完全不闪烁的沉浸感知。',
        solution: 'React轻量级状态流，叠加Motion Layout架构提供的动画重组帧插值。',
        technologies: 'React 18, motion/react, Layout Animations, Memoization.'
      },
      ja: {
        challenge: 'レイアウト移動時に一瞬のガタつき（Flicker）も出さず、膨大なライブイベントのソート処理と同期をとる手法。',
        solution: '状態遷移フックのカスタム、motion/react によるレイアウト変更アニメーションの最適化。',
        technologies: 'React 18, motion/react, Layout Animations, Memoization.'
      }
    },
    mockColor: 'linear-gradient(135deg, #120b24 0%, #3b0764 50%, #db2777 100%)'
  },
  {
    id: 'tanteo',
    title: 'Tanteo',
    url: 'https://tanteo.vercel.app/',
    techs: ['Brutalist UI', 'Next.js/React', 'Tailwind', 'Mathematical Engine', 'Analytical Charts'],
    category: {
      es: 'Motores Analíticos y Visualización',
      en: 'Analytical Engines & Visualization',
      de: 'Analytische Engines & Visualisierung',
      fr: 'Moteurs Analytiques & Visualisation',
      ru: 'Аналитические дашборды',
      nl: 'Analytische Engines & Visualisatie',
      zh: '极客风即时得分与数据图表',
      ja: 'リアルタイム・データインテグレーション'
    },
    description: {
      es: 'Una calculadora y dashboard analítico de alta precisión, que combina rigidez geométrica, fuentes monoespaciadas y micro-comentarios técnicos.',
      en: 'A high-precision analytical dashboard and calculator, combining geometric rigidity, monospaced fonts, and tiny technical logs.',
      de: 'Ein hochpräzises analytisches Dashboard und Rechner, das geometrische Rigidität, monospaced Schriftarten und kleine technische Protokolle kombiniert.',
      fr: 'Un tableau de bord et calculateur analytique de haute précision, combinant rigidité géométrique, polices monospaced et micro-rapports techniques.',
      ru: 'Высокоточная аналитическая приборная панель и калькулятор, сочетающая строгую геометрию, моноширинные шрифты и аккуратные логи.',
      nl: 'Een uiterst nauwkeurig analytisch dashboard en calculator, met geometrische strakheid, monospaced lettertypen en verfijnde technische logs.',
      zh: '高精密分析仪表盘和计算框架，融合纯粹网格系统、等宽代码字体及实时数据流。',
      ja: '工業製品のように無駄のない分析ダッシュボード。完璧なレスポンシブ、等幅フォント、計器を思わせるグラフィック。'
    },
    caseStudy: {
      es: {
        challenge: 'Procesar y actualizar gráficos matemáticos interactivos ante flujos rápidos de datos con excelente estabilidad.',
        solution: 'Estructuración modular de componentes puros estructurados para aislar renders junto a cálculos debounced.',
        technologies: 'React Hooks, SVG Path Dynamism, Tailwind Grid, UI Brutalista.'
      },
      en: {
        challenge: 'Process and update interactive mathematical charts against rapid data flows with outstanding stability.',
        solution: 'Modular design focusing on pure React component isolation and debounced reactive formula recalculation.',
        technologies: 'React Hooks, SVG Path Dynamism, Tailwind Grid, Brutalist Design.'
      },
      de: {
        challenge: 'Verarbeitung und Aktualisierung interaktiver mathematischer Diagramme bei schnellen Datenflüssen mit hervorragender Stabilität.',
        solution: 'Modulares Design mit Fokus auf die Isolierung reiner React-Komponenten und entprellte reaktive Formelneuberechnungen.',
        technologies: 'React Hooks, SVG Path Dynamism, Tailwind Grid, Brutalist Design.'
      },
      fr: {
        challenge: 'Traiter et mettre à jour des graphiques mathématiques interactifs face à des flux de données rapides avec une excellente stabilité.',
        solution: 'Structure modulaire de composants purs pour isoler les rendus, associée à des recalculs asynchrones.',
        technologies: 'React Hooks, SVG Path Dynamism, Tailwind Grid, Brutalist Design.'
      },
      ru: {
        challenge: 'Обеспечить перерисовку сложных математических графиков при динамическом изменении формул без фризов.',
        solution: 'Концепция чистых изолированных функциональных компонентов в связке с дебаунсом реактивных математических операций.',
        technologies: 'React Hooks, SVG Path Dynamism, Tailwind Grid, Brutalist Design.'
      },
      nl: {
        challenge: 'Interactieve wiskundige grafieken verwerken en updaten bij snelle datastromen met uitmuntende stabiliteit.',
        solution: 'Modulair ontwerp dat zich richt op pure componentisolatie en debounced berekeningen.',
        technologies: 'React Hooks, SVG Path Dynamism, Tailwind Grid, Brutalist Design.'
      },
      zh: {
        challenge: '在前端快速修改数学因数时，即时生成平滑的SVG概率矢量轨迹。',
        solution: '针对部分交互组件采用Memoized，并将核心物理公式代入防抖防断流计算。',
        technologies: 'React Hooks, SVG Path Dynamism, Tailwind Grid, Brutalist Design.'
      },
      ja: {
        challenge: '急なデータ流に際しても、UIのレンダリングや数式計算をフリーズさせない高負荷制御。',
        solution: '純粋型コンポーネントへの分離、デバウンス（Debounce）処理を取り入れた演算フロー。',
        technologies: 'React Hooks, SVG Path Dynamism, Tailwind Grid, Brutalist Design.'
      }
    },
    mockColor: 'linear-gradient(135deg, #020617 0%, #0c0a09 50%, #16a34a 100%)'
  }
];
