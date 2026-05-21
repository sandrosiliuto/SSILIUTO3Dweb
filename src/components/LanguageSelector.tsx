import React, { useState } from 'react';
import { languages } from '../data/translations';
import { LanguageCode } from '../types';
import { Globe, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

export default function LanguageSelector({
  currentLanguage,
  onLanguageChange
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLanguage = languages.find((l) => l.code === currentLanguage) || languages[0];

  return (
    <div className="relative inline-block text-left z-50">
      <button
        id="lang-selector-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-800 bg-black/40 backdrop-blur-md text-xs text-gray-300 hover:text-white hover:border-[#FF006E] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#FF006E]"
      >
        <Globe className="w-3.5 h-3.5 text-[#FF006E]" />
        <span>{selectedLanguage.name}</span>
        <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Overlay to close the dropdown */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          <div
            id="lang-dropdown-menu"
            className="absolute right-0 mt-2 w-44 rounded-xl border border-gray-800 bg-black/95 backdrop-blur-xl shadow-2xl overflow-hidden focus:outline-none z-50 animate-in fade-in slide-in-from-top-1 duration-200"
          >
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors duration-200 flex items-center justify-between ${
                    currentLanguage === lang.code
                      ? 'bg-gradient-to-r from-[#FF006E]/10 to-[#00BFFF]/10 text-[#FF006E] font-medium'
                      : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                  }`}
                >
                  <span>{lang.name}</span>
                  {currentLanguage === lang.code && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF006E] animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
