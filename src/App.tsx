import React, { useState, useEffect } from 'react';
import { LanguageCode, Project } from './types';
import { projects } from './data/projects';
import { translations, testimonials } from './data/translations';
import Background3D from './components/three/Background3D';
import CustomCursor from './components/three/CustomCursor';
import LanguageSelector from './components/LanguageSelector';
import ProjectCard from './components/ProjectCard';
import ProjectDetailModal from './components/ProjectDetailModal';
import {
  ChevronDown,
  Cpu,
  MessageSquare,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  Layers,
  Terminal,
  Volume2
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  // Check if there is an existing language choice, default to 'es' (Sandro Siliuto's main language)
  const [lang, setLang] = useState<LanguageCode>(() => {
    const stored = localStorage.getItem('sandro-portfolio-lang');
    return (stored as LanguageCode) || 'es';
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Update language setting
  const handleLanguageChange = (newLang: LanguageCode) => {
    setLang(newLang);
    localStorage.setItem('sandro-portfolio-lang', newLang);
  };

  const currentTranslations = translations[lang];

  // Helper code to scroll smoothly
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Prevent background scroll when modal is active
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <div id="full-portfolio-wrapper" className="min-h-screen text-gray-100 selection:bg-[#FF006E] selection:text-white relative">
      {/* HTML5 Interactive Digital Plexus Background */}
      <Background3D />
      <CustomCursor />

      {/* 1. FLOATING NAVIGATION HEADER */}
      <header
        id="main-app-header"
        className="fixed top-0 left-0 right-0 z-40 bg-black/40 backdrop-blur-xl border-b border-gray-950/80 px-4 sm:px-6 lg:px-8 py-3"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo with glowing index */}
          <div
            onClick={() => scrollToSection('hero-section')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#FF006E] to-[#00BFFF] p-[1.5px] transition-transform duration-500 group-hover:rotate-180">
              <div className="w-full h-full bg-black rounded-[6px] flex items-center justify-center font-mono text-[10px] text-white font-bold">
                SS
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-widest text-white font-mono group-hover:text-[#FF006E] transition-colors duration-300">
                ssiliutodesign-web
              </span>
              <span className="text-[8px] font-mono text-gray-500 tracking-wider">
                DIGITAL ALCHEMIST
              </span>
            </div>
          </div>

          {/* Minimalist Navigation middle menu */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-gray-400">
            <button
              onClick={() => scrollToSection('philosophy-section')}
              className="hover:text-white transition-colors duration-300 cursor-pointer"
            >
              // filosofÃ­a
            </button>
            <button
              onClick={() => scrollToSection('portals-section')}
              className="hover:text-white transition-colors duration-300 cursor-pointer"
            >
              // portales
            </button>
            <button
              onClick={() => scrollToSection('testimonials-section')}
              className="hover:text-white transition-colors duration-300 cursor-pointer"
            >
              // confianza
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              className="hover:text-white transition-colors duration-300 cursor-pointer"
            >
              // contacto
            </button>
          </nav>

          {/* Right Area: Language Selector & Status */}
          <div className="flex items-center gap-3">
            <span className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-gray-900 text-[10px] font-mono text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>LIVE CORE</span>
            </span>

            <LanguageSelector
              currentLanguage={lang}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section
        id="hero-section"
        className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative pt-20 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-[#FF006E]/10 to-transparent pointer-none blur-3xl" />
        
        {/* Entrance animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-4xl z-10"
        >
          {/* Subordinate banner */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-900 bg-[#0e0e12]/80 backdrop-blur-md text-xs font-mono text-gray-450 tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF006E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF006E]"></span>
            </span>
            <span className="text-[10px] uppercase text-gray-400">
              {currentTranslations.hero.subtagline}
            </span>
          </div>

          {/* Primary Branding */}
          <div className="space-y-2">
            <h1 className="text-4 block text-xs tracking-[0.4em] font-mono text-gray-400 uppercase">
              SANDRO SILIUTO
            </h1>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black font-sans tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-250 to-gray-500 py-2 leading-none">
              {currentTranslations.hero.tagline}
            </h2>
          </div>

          {/* Slogan */}
          <p className="text-sm sm:text-lg text-gray-400 max-w-xl mx-auto font-sans leading-relaxed pt-2">
            {currentTranslations.philosophy.body.split('.')[1]}.
          </p>

          {/* Navigation CTA Actions */}
          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              id="hero-cta-button"
              onClick={() => scrollToSection('portals-section')}
              className="px-8 py-4 rounded-xl font-semibold text-xs tracking-wider uppercase bg-[#FF006E] hover:bg-[#E0007A] text-white hover:shadow-[0_0_25px_rgba(255,0,110,0.45)] hover:scale-[1.02] transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>{currentTranslations.hero.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection('philosophy-section')}
              className="px-8 py-4 rounded-xl font-semibold text-xs tracking-wider uppercase bg-black/40 border border-gray-900 text-gray-400 hover:text-white hover:border-gray-700 transition-all duration-300 cursor-pointer"
            >
              // {currentTranslations.philosophy.title}
            </button>
          </div>
        </motion.div>

        {/* Scroll down indicator */}
        <div
          onClick={() => scrollToSection('philosophy-section')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1.5 text-gray-500 hover:text-[#00BFFF] transition-colors duration-400 z-10"
        >
          <span className="text-[9px] font-mono uppercase tracking-widest">SCROLL</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* 3. PHILOSOPHY / ABOUT SECTION */}
      <section
        id="philosophy-section"
        className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-950/80 skew-y-0"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Title Grid */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#00BFFF]" />
              <span className="text-[10px] font-mono text-[#00BFFF] tracking-widest uppercase">
                {currentTranslations.philosophy.digitalAlchemy}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-none uppercase">
              {currentTranslations.philosophy.title}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#FF006E] to-[#00BFFF] rounded-full" />
            
            {/* Design locations tags */}
            <div className="pt-6 grid grid-cols-3 gap-2 font-mono text-[10px] text-gray-500">
              <div className="border border-gray-900 px-2.5 py-1.5 rounded-lg bg-[#0a0a0d]/60">
                <span className="text-[#FF006E] block font-bold">TFN</span>
                Tenerife Lab
              </div>
              <div className="border border-gray-900 px-2.5 py-1.5 rounded-lg bg-[#0a0a0d]/60">
                <span className="text-[#00BFFF] block font-bold">LDN</span>
                London Agency
              </div>
              <div className="border border-gray-900 px-2.5 py-1.5 rounded-lg bg-[#0a0a0d]/60">
                <span className="text-[#AF9FF0] block font-bold">BIO</span>
                Bilbao Workshop
              </div>
            </div>
          </div>

          {/* Right Description Grid */}
          <div className="lg:col-span-7 space-y-8 font-sans">
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed font-light first-letter:text-4xl first-letter:font-bold first-letter:text-[#FF006E]">
              {currentTranslations.philosophy.body}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-xl border border-gray-900 bg-black/40 space-y-3 relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-16 h-16 bg-[#FF006E]/5 rounded-full blur-xl group-hover:bg-[#FF006E]/10 transition-colors" />
                <div className="w-8 h-8 rounded-lg bg-gray-900 text-[#FF006E] flex items-center justify-center border border-gray-850">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">El Mundo FÃ­sico</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Desarrollos en fabricaciÃ³n aditiva, impresiÃ³n 3D a gran escala, microelectrÃ³nica de sensores e instalaciones interactivas espaciales.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-gray-900 bg-black/40 space-y-3 relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-16 h-16 bg-[#00BFFF]/5 rounded-full blur-xl group-hover:bg-[#00BFFF]/10 transition-colors" />
                <div className="w-8 h-8 rounded-lg bg-gray-900 text-[#00BFFF] flex items-center justify-center border border-gray-850">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">El Mundo Digital</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Visualizaciones WebGL, configuradores paramÃ©tricos complejos en tiempo real, anÃ¡lisis espectral de sonido y desarrollo web robusto e interactivo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CODE PORTALS SECTION (The Core Gallery in strict requested sequence) */}
      <section
        id="portals-section"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#09090b]/40 to-transparent border-t border-gray-950/80"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 justify-center py-1 px-3 border border-gray-900 rounded-full bg-black/60 text-[9px] font-mono text-gray-400 tracking-wider">
              <Terminal className="w-3.5 h-3.5 text-[#FF006E]" />
              <span>ALBUM: SSILIUTODESIGN-WEB</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-sans text-white tracking-tight leading-none uppercase">
              {currentTranslations.gallery.title}
            </h2>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              {currentTranslations.gallery.subtitle}
            </p>
          </div>

          {/* Asymmetric Prototyped Project Mockup Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {projects.map((project, i) => {
              // Apply asymmetric margin offsets on large screens as requested: "con un espaciado asimÃ©trico y dinÃ¡mico."
              // Odd project items will have a slight offset in height
              const isEven = i % 2 !== 0;
              return (
                <div
                  key={`${project.id}-grid-item-${i}`}
                  style={{ marginTop: isEven ? '3rem' : '0px' }}
                  className="w-full"
                >
                  <ProjectCard
                    project={project}
                    lang={lang}
                    onOpenLiveDemo={setSelectedProject}
                    index={i}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. TRUST / TESTIMONIALS SECTION */}
      <section
        id="testimonials-section"
        className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-950/80"
      >
        <div className="space-y-16">
          {/* Section subtitle */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-[#FF006E]">
              <Users className="w-4 h-4" />
              <span className="font-mono text-[10px] tracking-widest uppercase">TESTIMONIOS REALES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none uppercase">
              {currentTranslations.testimonials.title}
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-md mx-auto">
              {currentTranslations.testimonials.subtitle}
            </p>
          </div>

          {/* Bento Grid structured reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((test, i) => (
              <div
                key={test.name}
                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-950/80 to-[#0e0e12]/40 border border-gray-900 hover:border-[#00BFFF]/30 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#00BFFF]/5 rounded-full blur-xl" />
                
                {/* Visual quote tag */}
                <div className="text-4xl text-[#FF006E] font-serif leading-none opacity-40 select-none pb-4">
                  â€œ
                </div>

                <p className="text-sm sm:text-base text-gray-300 italic leading-relaxed z-10 font-sans">
                  {test.quote[lang]}
                </p>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-900/60">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF006E] to-[#AF9FF0] flex items-center justify-center text-xs font-mono font-bold text-white shadow-md">
                    {test.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-wider block font-sans">
                      {test.name}
                    </h4>
                    <span className="text-[10px] text-gray-500 font-mono block mt-0.5">
                      {test.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT DIRECT SECTION WITH WHATSAPP STRATEGY */}
      <section
        id="contact-section"
        className="py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-950/80 bg-black/60 relative overflow-hidden"
      >
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#FF006E]/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 z-10 relative">
          
          {/* Availability Status Dot */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-950 bg-green-950/10 text-[10px] font-mono text-green-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="tracking-widest uppercase font-bold text-[9px]">{currentTranslations.contact.glowingText}</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-4xl sm:text-6xl font-black font-sans text-white uppercase tracking-tight leading-none">
              {currentTranslations.contact.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto font-sans leading-relaxed">
              {currentTranslations.contact.subtitle}
            </p>
          </div>

          {/* Glowing Instant Conversion WhatsApp Button */}
          <div className="pt-4">
            <a
              id="whatsapp-cta-direct"
              href={`https://wa.me/34618514254?text=${encodeURIComponent(
                currentTranslations.contact.placeholderMessage
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-5 rounded-2xl bg-[#FF006E] hover:bg-[#E0007A] text-white text-xs font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(255,0,110,0.35)] hover:shadow-[0_0_40px_rgba(255,0,110,0.55)] hover:scale-[1.03] transition-all duration-300 transform"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>{currentTranslations.contact.button}</span>
            </a>
          </div>

          <div className="text-[10px] font-mono text-gray-500 max-w-xs mx-auto leading-tight">
            âš¡ Respuesta directa en menos de 12 horas. Tenerife (GMT+0) â€¢ Bilbao (GMT+1) â€¢ Londres (GMT+0)
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer id="main-app-footer" className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-950/80 bg-black/90">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-gray-500">
          <div className="text-center sm:text-left space-y-1 font-mono">
            <span className="text-gray-400 block font-bold text-[11px] tracking-wider uppercase">SSILIUTODESIGN - WEB</span>
            <span>{currentTranslations.footer.rights}</span>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-1.5 text-center sm:text-right font-mono text-[10px] text-gray-400">
            <span>{currentTranslations.footer.location}</span>
            <span className="text-gray-600 block">ALQUIMIA DIGITAL FÃSICA-VIRTUAL EST. 2026</span>
          </div>
        </div>
      </footer>

      {/* 8. EXPANDABLE IFRAME PORTAL MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            lang={lang}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}


