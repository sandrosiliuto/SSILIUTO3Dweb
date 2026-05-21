import React, { useState, useEffect } from 'react';
import { Project, LanguageCode } from '../types';
import { translations } from '../data/translations';
import { X, RefreshCw, ExternalLink, Cpu, BookOpen, Globe, Layout, ShieldCheck, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectDetailModalProps {
  project: Project;
  lang: LanguageCode;
  onClose: () => void;
}

export default function ProjectDetailModal({
  project,
  lang,
  onClose
}: ProjectDetailModalProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [activeTab, setActiveTab] = useState<'demo' | 'case'>('demo');

  const t = translations[lang].gallery;

  // Reset iframe loading state when project or reloadKey changes
  useEffect(() => {
    setIframeLoaded(false);
  }, [project, reloadKey]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleReload = () => {
    setReloadKey((prev) => prev + 1);
  };

  return (
    <div
      id="portal-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-2 sm:p-4 md:p-6"
    >
      {/* Modal Container */}
      <motion.div
        id={`portal-expanded-${project.id}`}
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full max-w-7xl bg-[#09090b] border border-gray-900 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,0,110,0.15)] flex flex-col"
      >
        {/* 1. FUTURISTIC BROWSER HEADER BAR */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-[#0d0d10] border-b border-gray-950/80">
          {/* OS Window dots and navigation */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              id="close-portal-dot"
              onClick={onClose}
              className="w-3.5 h-3.5 rounded-full bg-red-600/90 flex items-center justify-center hover:bg-red-500 transition-colors focus:outline-none focus:ring-1 focus:ring-red-400 group"
              title="Cerrar Portal"
            >
              <X className="w-2 h-2 text-red-950 font-bold opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/30 hidden sm:inline-block" />
            <span className="w-3.5 h-3.5 rounded-full bg-green-500/30 hidden sm:inline-block" />
            
            {/* Reload and Back Control Buttons */}
            <button
              onClick={handleReload}
              className="ml-3 p-1.5 rounded-md hover:bg-gray-900 text-gray-500 hover:text-[#00BFFF] transition-colors focus:outline-none"
              title="Recargar Demo"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Browser Address Bar with actual URL */}
          <div className="flex-1 max-w-lg mx-3 sm:mx-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 border border-gray-900 text-xs font-mono justify-center text-center">
              <Globe className="w-3 h-3 text-[#FF006E]" />
              <input
                type="text"
                readOnly
                value={project.url}
                className="bg-transparent text-gray-300 w-full text-center focus:outline-none text-[10px] sm:text-xs select-all text-ellipsis overflow-hidden"
              />
              <span className="text-[8px] px-1 py-0.5 rounded bg-green-950/40 border border-green-900 text-green-400/90 flex items-center gap-0.5">
                <ShieldCheck className="w-2.5 h-2.5" />
                <span>SSL</span>
              </span>
            </div>
          </div>

          {/* Close of view and direct external links */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 bg-black/60 border border-gray-900 rounded-lg text-xs text-gray-300 hover:text-white hover:border-[#FF006E] transition-all duration-300"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#00BFFF]" />
              <span className="hidden sm:inline text-[11px]">{t.externalBtn}</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-gray-900 bg-black/60 hover:bg-red-500/10 hover:border-red-500/40 text-gray-400 hover:text-white transition-all duration-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* MOBILE ACTIVE TAB SWITCHER */}
        <div className="flex md:hidden bg-[#0a0a0d] border-b border-gray-900 text-xs">
          <button
            onClick={() => setActiveTab('demo')}
            className={`flex-1 py-3 text-center border-b-2 font-medium tracking-wider transition-colors duration-300 ${
              activeTab === 'demo'
                ? 'border-[#FF006E] text-[#FF006E] bg-black/50'
                : 'border-transparent text-gray-500 bg-transparent'
            }`}
          >
            LIVE DEMO
          </button>
          <button
            onClick={() => setActiveTab('case')}
            className={`flex-1 py-3 text-center border-b-2 font-medium tracking-wider transition-colors duration-300 ${
              activeTab === 'case'
                ? 'border-[#00BFFF] text-[#00BFFF] bg-black/50'
                : 'border-transparent text-gray-500 bg-transparent'
            }`}
          >
            CASE STUDY
          </button>
        </div>

        {/* 2. MAIN LAYOUT AREA */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* A. IFRAME COMPONENT (Left Side) */}
          <div
            id="iframe-preview-container"
            className={`flex-1 h-full bg-[#111115] relative ${
              activeTab === 'case' ? 'hidden md:block' : 'block'
            }`}
          >
            {/* Loader Skeleton */}
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 p-6 text-center z-10 font-mono">
                <Loader2 className="w-8 h-8 text-[#FF006E] animate-spin mb-4" />
                <span className="text-[#FF006E] text-sm tracking-widest font-bold uppercase animate-pulse">
                  Conectando Portal...
                </span>
                <span className="text-gray-500 text-[10px] mt-1 tracking-wider uppercase">
                  {project.title} • {project.url}
                </span>
                <p className="text-gray-500 text-[11px] mt-6 max-w-sm font-sans leading-relaxed">
                  Si la demo tarda en cargar o se bloquea por políticas de seguridad del navegador, puedes pulsar en el botón externo para abrir una pestaña separada.
                </p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-xs text-gray-300 hover:text-white hover:border-[#00BFFF]"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#00BFFF]" />
                  <span>{t.externalBtn}</span>
                </a>
              </div>
            )}

            {/* Live iframe */}
            <iframe
              key={`${project.id}-frame-${reloadKey}`}
              src={project.url}
              title={project.title}
              onLoad={() => setIframeLoaded(true)}
              className="w-full h-full border-none bg-black"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              loading="lazy"
            />
          </div>

          {/* B. DETAILED CASE-STUDY SIDEBAR (Right Side) */}
          <div
            id="modal-case-sidebar"
            className={`w-full md:w-[350px] lg:w-[400px] h-full border-l border-gray-950/80 bg-[#0c0c0f] flex flex-col overflow-y-auto custom-scrollbar ${
              activeTab === 'demo' ? 'hidden md:flex' : 'flex'
            }`}
          >
            {/* Header / Meta */}
            <div className="p-6 border-b border-gray-950/80 space-y-3 bg-[#0a0a0d]">
              <div className="flex items-center gap-1.5">
                <Layout className="w-3.5 h-3.5 text-[#00BFFF]" />
                <span className="text-[10px] font-mono text-[#00BFFF] tracking-widest uppercase">
                  {project.category[lang]}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight leading-none font-sans">
                {project.title}
              </h2>
              <div className="pt-2 flex flex-wrap gap-1.5">
                {project.techs.map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] font-mono px-2 py-0.5 rounded bg-gray-950 border border-gray-900 text-gray-400 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Body Info */}
            <div className="p-6 space-y-6 flex-1">
              {/* Multilingual Description */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Resumen del Proyecto</span>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">{project.description[lang]}</p>
              </div>

              {/* Technical study */}
              <div className="border border-gray-950 rounded-xl bg-black/40 p-5 space-y-5">
                <div className="flex items-center gap-2 text-[#FF006E] border-b border-gray-950 pb-2">
                  <Cpu className="w-4 h-4" />
                  <span className="font-mono text-xs font-bold tracking-widest uppercase">{t.caseStudyTitle}</span>
                </div>

                {/* Challenge */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#FF006E] uppercase tracking-wider block">▪ {t.challengeTitle}</span>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    {project.caseStudy[lang].challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#00BFFF] uppercase tracking-wider block">▪ {t.solutionTitle}</span>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    {project.caseStudy[lang].solution}
                  </p>
                </div>

                {/* Technologies */}
                <div className="p-2.5 rounded bg-gray-950/80 border border-gray-900">
                  <span className="text-[9px] font-mono text-gray-500 block">ARQUITECTURA DE DATOS</span>
                  <p className="text-gray-300 text-xs font-mono leading-tight mt-1">
                    {project.caseStudy[lang].technologies}
                  </p>
                </div>
              </div>

              {/* Direct Open CTA */}
              <div className="pt-4">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF006E] to-[#00BFFF] hover:from-[#E0007A] hover:to-[#1E90FF] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,0,110,0.2)] hover:shadow-[0_0_25px_rgba(255,0,110,0.4)] hover:scale-[1.01]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t.externalBtn}</span>
                </a>
              </div>
            </div>

            {/* Footer Tag */}
            <div className="p-4 bg-black/60 border-t border-gray-950 text-center">
              <span className="text-[8px] font-mono text-gray-500 tracking-wider">
                ssiliutodesign-web • DIGITAL ALCHEMY LAB 2026
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
