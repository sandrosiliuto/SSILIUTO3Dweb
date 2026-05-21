import React, { useState } from 'react';
import { Project, LanguageCode } from '../types';
import { translations } from '../data/translations';
import { Play, BookOpen, ExternalLink, Cpu, Layout, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface ProjectCardProps {
  project: Project;
  lang: LanguageCode;
  onOpenLiveDemo: (project: Project) => void;
  index: number;
}

export default function ProjectCard({
  project,
  lang,
  onOpenLiveDemo,
  index
}: ProjectCardProps) {
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const t = translations[lang].gallery;

  // Custom preview drawings so each project has an authentic, responsive visual mockup
  const renderSimulatedContent = () => {
    switch (project.id) {
      case 'becube-3-d':
        return (
          <div className="space-y-6 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-[#00BFFF]/80">SYS.STATUS: CALIBRATED</span>
              <span className="text-[10px] font-mono text-gray-500">LAYER 280 / 350</span>
            </div>
            <div className="h-28 border border-dashed border-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden bg-black/60 group/cube">
              {/* Spinning Mock 3D Wireframe Cube */}
              <div className="absolute inset-0 bg-radial-gradient from-[#00BFFF]/5 to-transparent pointer-events-none" />
              <div className="w-14 h-14 border border-[#00BFFF] rounded relative animate-spin duration-[10000ms] ease-linear flex items-center justify-center">
                <div className="w-8 h-8 border border-dashed border-[#FF006E] absolute transform rotate-45 animate-pulse" />
              </div>
              <div className="absolute bottom-1 right-2 font-mono text-[8px] text-[#00BFFF]/60">X: 120.4 Y: 89.2 Z: 45.0</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-950/80 p-2 border border-gray-900 rounded-md">
                <div className="text-[9px] font-mono text-gray-500">MALLA DRACO</div>
                <div className="text-sm font-medium text-gray-300 font-mono">1.2 MB</div>
              </div>
              <div className="bg-gray-950/80 p-2 border border-gray-900 rounded-md">
                <div className="text-[9px] font-mono text-gray-500">VELOCIDAD REND</div>
                <div className="text-sm font-medium text-[#00BFFF] font-mono">60 FPS</div>
              </div>
            </div>
          </div>
        );
      case 'soundreact':
        return (
          <div className="space-y-6 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-[#FF006E]">SPECTRUM: LIVE</span>
              <span className="text-[10px] font-mono text-gray-500">AUDIO IN: OK</span>
            </div>
            {/* Pulsing Visualizer Waves */}
            <div className="h-28 rounded-lg flex items-end justify-between px-4 pb-2 relative overflow-hidden bg-black/60">
              <div className="absolute inset-0 bg-radial-gradient from-[#FF006E]/10 to-transparent pointer-events-none" />
              {[35, 75, 45, 90, 60, 85, 55, 100, 40, 70, 50, 80, 65, 30].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-[#FF006E] to-[#00BFFF] rounded-t-sm"
                  style={{
                    height: `${h}%`,
                    animation: `pulse ${1.2 + i * 0.15}s ease-in-out infinite alternate`
                  }}
                />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1">
              {['BASS', 'MID', 'TREBLE'].map((v, idx) => (
                <div key={v} className="bg-gray-950/80 p-1.5 border border-gray-900 rounded-md text-center">
                  <div className="text-[8px] font-mono text-gray-500">{v}</div>
                  <div className="text-xs font-semibold text-gray-300 font-mono">
                    {idx === 0 ? '0.82v' : idx === 1 ? '1.45v' : '0.94v'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'plus-dental':
        return (
          <div className="space-y-6 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-cyan-400">PATIENT HUB</span>
              <span className="text-[10px] font-mono text-gray-500">SECURE CONNECTED</span>
            </div>
            <div className="h-28 border border-gray-900 rounded-lg p-3 bg-gradient-to-br from-cyan-950/20 to-black/40 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl" />
              <div className="text-xs font-semibold text-gray-200">Plataforma Dental Avanzada</div>
              <p className="text-[9px] text-gray-400 leading-relaxed mt-1">Garantiza sonrisas mediante software de análisis digital 3D.</p>
              <div className="mt-4 flex gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[8px] font-mono text-gray-500">CLÍNICAS ADHERIDAS</span>
              </div>
            </div>
            <div className="h-8 border border-dashed border-cyan-950/40 rounded flex items-center justify-around px-2 bg-black/40">
              <div className="text-[9px] font-mono text-gray-400">REDUCCIÓN DE ANSIEDAD</div>
              <div className="text-[10px] font-mono text-cyan-400 font-bold">-45%</div>
            </div>
          </div>
        );
      case 'xinyuan':
        return (
          <div className="space-y-6 pt-4 font-sans text-left">
            <div className="flex justify-between items-center border-b border-gray-900 pb-2">
              <span className="text-[9px] font-mono text-gray-500">XIN YUAN ARCHITECTURE</span>
              <span className="text-[9px] font-mono text-gray-500">東方 幾何</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <h4 className="text-lg font-bold font-sans text-gray-100 tracking-tighter leading-none">極簡主義</h4>
                <p className="text-[8px] text-gray-400 leading-relaxed">Minimalism as a spiritual structural connection rather than just decorative absence.</p>
              </div>
              <div className="h-24 bg-stone-900 border border-stone-800 rounded relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 border-r border-b border-stone-850/50" />
                <div className="w-12 h-12 border border-stone-700 transform rotate-45 relative">
                  <div className="absolute inset-1 border border-stone-800" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'lagula':
        return (
          <div className="space-y-5 pt-4">
            <div className="text-center">
              <span className="text-[9px] font-mono text-red-500/80 tracking-widest uppercase">LA GULA GOURMET</span>
            </div>
            <div className="h-28 border border-red-950 rounded-lg p-3 bg-gradient-to-tr from-stone-950 to-red-950/20 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-2 -bottom-2 w-16 h-16 rounded-full border border-red-500/10" />
              <div className="font-serif italic text-lg text-amber-100">"Sabor sin Límites"</div>
              <div className="space-y-1">
                <div className="h-1 w-20 bg-red-800 rounded-full" />
                <div className="h-1 w-12 bg-amber-850/40 rounded-full" />
              </div>
            </div>
            <div className="text-center font-mono text-[9px] text-gray-500">MENÚ DE DEGUSTACIÓN AUTÓNOMO</div>
          </div>
        );
      case 'manaya':
        return (
          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono text-[#78716c]">MANAYA INTERIORISMO</span>
              <span className="text-[9px] font-mono text-gray-500">GRID.ASYMMETRIC</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 h-24 bg-stone-900 rounded p-2 flex flex-col justify-between border border-stone-850">
                <div className="text-[8px] font-mono text-stone-500">PROYECTO: ESTUDIO BEIGE</div>
                <div className="text-sm font-semibold text-stone-300 font-sans tracking-tight">KØBENHAVN ARCH</div>
              </div>
              <div className="h-24 bg-stone-950 border border-dashed border-stone-800 rounded flex flex-col justify-around items-center p-1">
                <div className="h-2 w-2 rounded-full bg-amber-700/80" />
                <div className="h-6 w-0.5 bg-stone-800" />
                <span className="text-[10px] font-mono text-stone-500">32M²</span>
              </div>
            </div>
            <p className="text-[8px] text-stone-400 font-mono text-left leading-tight">Quiet spatial compositions focusing on light filtration.</p>
          </div>
        );
      case 'lacasadecrepe':
        return (
          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono text-amber-600">LA CASA DE CRÊPE</span>
              <span className="text-[9px] font-mono text-gray-500">BOUTIQUE BRUNCH</span>
            </div>
            <div className="h-28 rounded-lg p-3 bg-amber-950/20 border border-amber-900/60 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute right-2 top-2 w-10 h-10 rounded-full bg-amber-500/5 border border-dashed border-amber-500/20 animate-spin duration-[20000ms]" />
              <div className="text-lg font-serif tracking-tight text-amber-200">Hecho con Amor</div>
              <p className="text-[8px] text-amber-100/60 leading-tight">Tradición repostera francesa en formato interactivo moderno.</p>
            </div>
            <div className="flex gap-2 justify-center">
              {['CRÊPES', 'GALETTES', 'CAFÉ'].map((item) => (
                <span key={item} className="px-2 py-0.5 rounded bg-amber-950/40 border border-amber-900/30 text-[8px] font-mono text-amber-200/80">
                  {item}
                </span>
              ))}
            </div>
          </div>
        );
      case 'hongkong-restaurante':
        return (
          <div className="space-y-5 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono text-red-600">HONG KONG MEDANO</span>
              <span className="text-[9px] font-mono text-gray-500">ONLINE ORDER</span>
            </div>
            <div className="h-24 rounded-lg bg-red-950/10 border border-red-950 p-3 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute -right-4 -top-4 w-12 h-12 bg-red-600/10 blur-xl" />
              <div className="text-base font-bold text-red-100 tracking-wider">香 港 餐 厅</div>
              <span className="text-[9px] font-mono text-gray-400">Platos tradicionales directos a tu mesa con alta fidelidad</span>
            </div>
            <div className="h-6 border border-dashed border-red-950/60 rounded flex items-center justify-center bg-black/40">
              <span className="text-[8px] font-mono text-red-400">COMPRESIÓN WEBP EXTREMA - CACHE OK</span>
            </div>
          </div>
        );
      case 'panna-cioccolato':
        return (
          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono text-pink-500">PANNA & CIOCCOLATO</span>
              <span className="text-[9px] font-mono text-gray-500">GELATERIA FRESCA</span>
            </div>
            <div className="h-28 border border-pink-900/40 rounded-lg bg-pink-950/10 p-3 relative overflow-hidden flex flex-col justify-between">
              {/* Floating Pink Bubble Elements */}
              <div className="absolute top-2 left-1/3 w-3 h-3 rounded-full bg-pink-500/20 animate-bounce" />
              <div className="absolute bottom-4 right-1/4 w-4 h-4 rounded-full bg-sky-500/10 animate-pulse" />
              <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-sky-300 font-sans tracking-tight">
                El Sabor del Sol
              </div>
              <p className="text-[8px] text-gray-400 leading-normal">Helados artesanos elaborados diariamente con los mejores frutos tropicales de Canarias.</p>
            </div>
          </div>
        );
      case 'poker-yacht':
        return (
          <div className="space-y-5 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono text-blue-500">POKER YACHT CHARTER</span>
              <span className="text-[9px] font-mono text-gray-500">RADAR ACTIVE</span>
            </div>
            <div className="h-24 rounded-lg border border-blue-900 bg-gradient-to-b from-blue-950/20 to-black/50 p-3 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute right-2 top-2 w-8 h-8 rounded-full border border-blue-500/40 flex items-center justify-center animate-pulse">
                <div className="w-4 h-4 rounded-full border border-blue-500/20" />
              </div>
              <span className="text-sm font-semibold text-gray-200">Luxury Sea Charters</span>
              <span className="text-[8px] font-mono text-blue-400">GPS ACCURACY: 99.8%</span>
            </div>
          </div>
        );
      case 'tumbao-dates':
        return (
          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono text-purple-400">TUMBAO TIMELINE</span>
              <span className="text-[9px] font-mono text-gray-500">EVENTS ACTIVE</span>
            </div>
            <div className="space-y-1.5 font-mono text-[9px]">
              <div className="h-7 bg-purple-950/40 border border-purple-900/60 rounded flex items-center justify-between px-2">
                <span className="text-[#FF006E] font-bold">24 MAY</span>
                <span className="text-gray-300">Acoustic Session</span>
                <span className="text-gray-550">Tenerife</span>
              </div>
              <div className="h-7 bg-[#070708] border border-gray-900 rounded flex items-center justify-between px-2">
                <span className="text-purple-400">12 JUN</span>
                <span className="text-gray-400">Live DJ Sunset</span>
                <span className="text-gray-550">Bilbao</span>
              </div>
              <div className="h-7 bg-[#070708] border border-gray-900 rounded flex items-center justify-between px-2">
                <span className="text-purple-400">04 JUL</span>
                <span className="text-gray-400">Techno Alchemy</span>
                <span className="text-gray-550">London</span>
              </div>
            </div>
          </div>
        );
      case 'tanteo':
        return (
          <div className="space-y-5 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono text-green-500">TANTEO ANALYTICS</span>
              <span className="text-[9px] font-mono text-gray-500">STABILITY: 100%</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-16 bg-[#070708] border border-gray-900 rounded p-2 flex flex-col justify-between font-mono">
                <span className="text-[8px] text-gray-500">FORMULA COMPILATION</span>
                <span className="text-xs text-green-500 font-bold">SUCCESS</span>
              </div>
              <div className="h-16 bg-[#070708] border border-gray-900 rounded p-2 flex flex-col justify-between font-mono">
                <span className="text-[8px] text-gray-500">METRIC DEV. RATIO</span>
                <span className="text-xs text-gray-300 font-bold">98.42%</span>
              </div>
            </div>
            <div className="h-8 border border-green-950 bg-green-950/10 rounded flex items-center justify-center font-mono text-[9px] text-green-400">
              [DEBUG STATS]: COMPLETE MEMOIZATION ACTIVE
            </div>
          </div>
        );
      default:
        return (
          <div className="py-12 text-center text-xs text-gray-500">
            Interactive Digital Showcase
          </div>
        );
    }
  };

  return (
    <motion.div
      id={`project-card-${project.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.4) }}
      className="flex flex-col h-full bg-[#0d0d10]/40 backdrop-blur-md border border-gray-900 rounded-xl overflow-hidden shadow-xl hover:border-[#FF006E]/40 transition-all duration-300 group"
    >
      {/* 1. Technical Mockup Operating System Window header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0e0e12] border-b border-gray-950/80">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        {/* Mock System Address bar showing URL */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-gray-900/80 w-1/2 max-w-sm text-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF]/60 animate-pulse" />
          <span className="text-[9px] font-mono text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
            {project.url}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-gray-950/80 border border-gray-900 text-gray-500 group-hover:text-[#FF006E] transition-colors duration-300">
            {project.techs[0]}
          </span>
        </div>
      </div>

      {/* 2. Visual Content Viewport (Scroll simulation placeholder on desktop hover) */}
      <div
        onClick={() => onOpenLiveDemo(project)}
        className="cursor-pointer relative overflow-hidden h-72 border-b border-gray-950/80 bg-[#070708] group"
      >
        {/* Fine Neon Glowing Border Lines on hover */}
        <div className="absolute inset-0 border border-transparent group-hover:border-[#FF006E]/10 transition-colors duration-300 z-10 pointer-events-none" />

        {/* Hover overlay instructing user */}
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center px-4 z-10 backdrop-blur-[2px]">
          <span className="p-3.5 rounded-full border border-[#FF006E] text-[#FF006E] bg-[#FF006E]/5 shadow-[0_0_15px_rgba(255,0,110,0.3)] animate-pulse mb-3">
            <Play className="w-5 h-5 fill-[#FF006E]" />
          </span>
          <span className="text-xs font-semibold text-white tracking-widest font-sans uppercase">
            {t.demoBtn}
          </span>
          <span className="text-[10px] text-gray-400 font-mono mt-1.5">
            {project.url}
          </span>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-[#00BFFF]">
            <span>{t.caseBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* The Animated content that translates upwardly as if scrolled on hover */}
        <div className="h-full p-6 transition-transform duration-[4500ms] ease-in-out group-hover:transform group-hover:-translate-y-[45%]" style={{ background: 'transparent' }}>
          {/* Main screen area */}
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#00BFFF] tracking-wider uppercase">
                {project.category[lang]}
              </span>
              <h3 className="text-2xl font-bold font-sans text-white tracking-tight leading-none">
                {project.title}
              </h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-md">
              {project.description[lang]}
            </p>
          </div>

          {/* Render individual responsive screen mockup elements */}
          {renderSimulatedContent()}

          {/* Scrolling Tail Element so hover has continuous flow */}
          <div className="pt-24 space-y-4 border-t border-gray-900 mt-20">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF006E]" />
              <span className="text-[10px] font-mono text-[#FF006E] tracking-widest">{translations[lang].hero.tagline}</span>
            </div>
            <h4 className="text-sm font-bold text-gray-300 uppercase">TECNOLOGÍA EN ACCIÓN</h4>
            <p className="text-[10px] text-gray-500 font-mono leading-relaxed">
              Diseño estructural, orquestación WebGL y despliegue autogestionado con la más alta optimización de rendimiento en Canarias, Londres y Bilbao.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Under Footer Information: Action row & Case Study Toggle */}
      <div className="p-4 bg-[#0a0a0c]/80 flex flex-col gap-3 mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex gap-1 overflow-x-auto py-0.5 no-scrollbar max-w-[65%]">
            {project.techs.map((tech) => (
              <span
                key={tech}
                className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-gray-950 border border-gray-900 text-gray-400 whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowCaseStudy(!showCaseStudy)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-300 ${
                showCaseStudy
                  ? 'bg-gray-900 border border-[#FF006E] text-[#FF006E]'
                  : 'bg-[#101015] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Info</span>
            </button>
            <button
              onClick={() => onOpenLiveDemo(project)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-medium bg-[#FF006E] hover:bg-[#E0007A] text-white hover:shadow-[0_0_15px_rgba(255,0,110,0.4)] transition-all duration-300"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Demo</span>
            </button>
          </div>
        </div>

        {/* Expandable Case Study Panel */}
        <AnimatePresence>
          {showCaseStudy && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-gray-900/60 pt-3 mt-1"
            >
              <div className="space-y-3 font-mono text-[11px]">
                <div className="flex gap-1.5 items-center text-[#00BFFF]">
                  <Cpu className="w-3.5 h-3.5" />
                  <span className="font-bold uppercase tracking-wider text-[10px]">{t.caseStudyTitle}</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-[10px] text-[#FF006E] block mb-0.5">▪ {t.challengeTitle}</span>
                    <p className="text-gray-400 line-clamp-3 leading-tight">{project.caseStudy[lang].challenge}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#00BFFF] block mb-0.5">▪ {t.solutionTitle}</span>
                    <p className="text-gray-400 line-clamp-3 leading-tight">{project.caseStudy[lang].solution}</p>
                  </div>
                </div>

                <div className="p-2 rounded bg-black/60 border border-gray-950 mt-1">
                  <span className="text-[9px] text-gray-500 block">SISTEMA INFRAESTRUCTURA DE DESPLIEGUE</span>
                  <p className="text-gray-300 text-[10px] leading-none mt-1">{project.caseStudy[lang].technologies}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
