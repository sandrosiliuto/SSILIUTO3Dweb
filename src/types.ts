export type LanguageCode = 'es' | 'en' | 'de' | 'fr' | 'ru' | 'nl' | 'zh' | 'ja';

export interface Project {
  id: string;
  title: string;
  url: string;
  techs: string[];
  category: { [key in LanguageCode]: string };
  description: { [key in LanguageCode]: string };
  caseStudy: {
    [key in LanguageCode]: {
      challenge: string;
      solution: string;
      technologies: string;
    }
  };
  mockColor: string; // Background visual placeholder for elegant mockup preview
}

export interface Testimonial {
  name: string;
  role: string;
  quote: { [key in LanguageCode]: string };
  avatar: string;
}

export interface TranslationSchema {
  hero: {
    tagline: string;
    subtagline: string;
    cta: string;
  };
  philosophy: {
    title: string;
    body: string;
    digitalAlchemy: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    demoBtn: string;
    caseBtn: string;
    closeBtn: string;
    externalBtn: string;
    technologies: string;
    caseStudyTitle: string;
    challengeTitle: string;
    solutionTitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    glowingText: string;
    button: string;
    placeholderMessage: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
  };
  footer: {
    rights: string;
    location: string;
  };
}
