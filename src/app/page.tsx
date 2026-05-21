'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, type Variants } from 'motion/react';

const ThreeDCube = dynamic(() => import('@components/ThreeDCube'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center text-becubo-cyan text-sm tracking-widest">
      INITIALIZING CUBE…
    </div>
  ),
});

/* -------------------------------------------------------------------------- */
/* Navbar                                                                     */
/* -------------------------------------------------------------------------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-becubo-ink/80 backdrop-blur-xl py-3 border-b border-white/5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#inicio" className="flex items-center gap-2 group">
          <div className="w-3 h-3 rotate-45 bg-becubo-cyan group-hover:bg-becubo-violet transition-colors" />
          <span className="text-xl font-bold tracking-[0.2em] text-white">
            BECUBO
          </span>
        </a>
        <div className="hidden md:flex gap-8 text-sm tracking-wider">
          {[
            ['Inicio', '#inicio'],
            ['Pilares', '#pilares'],
            ['Servicios', '#servicios'],
            ['Cooperativa', '#cooperativa'],
            ['Visión', '#vision'],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-white/70 hover:text-becubo-cyan transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* Scroll progress bar at the top                                             */
/* -------------------------------------------------------------------------- */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-gradient-to-r from-becubo-cyan via-becubo-violet to-becubo-amber"
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Reusable animated section helpers                                          */
/* -------------------------------------------------------------------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

function SectionHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-xs tracking-[0.4em] text-becubo-cyan/80 mb-4"
      >
        {kicker}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl md:text-6xl font-bold tracking-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-white/60 text-lg leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  const { scrollYProgress } = useScroll();
  // Hero text drifts up & fades as the user scrolls
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center"
    >
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-xs md:text-sm tracking-[0.5em] text-becubo-cyan/80 mb-8"
        >
          COOPERATIVA · INNOVACIÓN · ÉTICA
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.95]"
        >
          Thinking
          <br />
          <span className="gradient-text">out of</span>
          <br />
          the Cube.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 text-white/60 max-w-xl mx-auto text-base md:text-lg"
        >
          Transformamos realidades en un ecosistema de innovación ética.
          Bementory · Begitality · Beventy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <a
            href="#pilares"
            className="px-7 py-3 rounded-full border border-becubo-cyan/60 text-becubo-cyan hover:bg-becubo-cyan hover:text-becubo-ink transition-colors text-sm tracking-widest"
          >
            Descubrir
          </a>
          <a
            href="#cooperativa"
            className="px-7 py-3 rounded-full text-white/70 hover:text-white text-sm tracking-widest"
          >
            Cooperativa →
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-becubo-cyan/70 text-xs tracking-[0.4em]"
      >
        <div className="flex flex-col items-center gap-3">
          <span>SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-becubo-cyan to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Stats                                                                      */
/* -------------------------------------------------------------------------- */

function Stats() {
  const stats = [
    { value: '+200', label: 'Empresas impactadas' },
    { value: '50k', label: 'Personas alcanzadas' },
    { value: '100%', label: 'Compromiso ético' },
  ];
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm"
          >
            <div className="text-5xl md:text-6xl font-bold gradient-text">
              {s.value}
            </div>
            <div className="mt-3 text-xs tracking-[0.3em] text-white/60">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Pillars                                                                    */
/* -------------------------------------------------------------------------- */

function Pillars() {
  const pillars = [
    {
      id: '01',
      name: 'Bementory',
      tag: 'Mentoría & consultoría',
      desc: 'Acompañamos a emprendedores con mentoría estratégica, consultoría y formación enfocada en propósito y rentabilidad.',
      color: 'from-becubo-cyan to-cyan-700',
      accent: '#22d3ee',
    },
    {
      id: '02',
      name: 'Begitality',
      tag: 'Transformación digital',
      desc: 'Diseñamos productos digitales con valores humanos: experiencia, accesibilidad y tecnología responsable.',
      color: 'from-becubo-violet to-purple-800',
      accent: '#a855f7',
    },
    {
      id: '03',
      name: 'Beventy',
      tag: 'Eventos & networking',
      desc: 'Activamos cultura, comunidad y conocimiento a través de eventos y experiencias que conectan personas.',
      color: 'from-becubo-amber to-orange-700',
      accent: '#fbbf24',
    },
  ];

  return (
    <section id="pilares" className="relative py-32 px-6">
      <SectionHeader
        kicker="NUESTROS PILARES VITALES"
        title={
          <>
            Tres caras de un mismo <span className="gradient-text">cubo.</span>
          </>
        }
        subtitle="Bementory, Begitality y Beventy son las tres dimensiones cooperativas que conforman Becubo."
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p, i) => (
          <motion.article
            key={p.id}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group relative p-8 rounded-2xl bg-white/[0.025] border border-white/10 backdrop-blur-sm overflow-hidden"
          >
            <div
              className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
              style={{ background: p.accent }}
            />
            <div className="relative">
              <div
                className="text-xs tracking-[0.3em]"
                style={{ color: p.accent }}
              >
                {p.id} · {p.tag.toUpperCase()}
              </div>
              <h3 className="mt-5 text-3xl font-bold">{p.name}</h3>
              <p className="mt-4 text-white/60 leading-relaxed">{p.desc}</p>
              <div
                className={`mt-8 h-px w-12 bg-gradient-to-r ${p.color} group-hover:w-full transition-all duration-500`}
              />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Services                                                                   */
/* -------------------------------------------------------------------------- */

function Services() {
  const services = [
    {
      n: '01',
      title: 'Aceleración Estratégica',
      items: ['Mentoring 1:1', 'Diagnóstico de impacto', 'Hoja de ruta cooperativa'],
    },
    {
      n: '02',
      title: 'Producto Digital Ético',
      items: ['UX/UI con propósito', 'Webs y plataformas', 'IA responsable'],
    },
    {
      n: '03',
      title: 'Comunidad & Eventos',
      items: ['Encuentros temáticos', 'Networking honesto', 'Activación cultural'],
    },
  ];

  return (
    <section id="servicios" className="relative py-32 px-6">
      <SectionHeader
        kicker="QUÉ HACEMOS"
        title={
          <>
            Servicios que <span className="gradient-text">rompen moldes.</span>
          </>
        }
      />

      <div className="max-w-5xl mx-auto space-y-4">
        {services.map((s, i) => (
          <motion.div
            key={s.n}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="group grid grid-cols-12 gap-6 items-center p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-becubo-cyan/40 transition-colors"
          >
            <div className="col-span-2 text-becubo-cyan text-2xl md:text-3xl font-bold">
              {s.n}
            </div>
            <div className="col-span-10 md:col-span-4">
              <h4 className="text-xl md:text-2xl font-bold">{s.title}</h4>
            </div>
            <div className="col-span-12 md:col-span-6 flex flex-wrap gap-2">
              {s.items.map((it) => (
                <span
                  key={it}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70"
                >
                  {it}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Cooperative model                                                          */
/* -------------------------------------------------------------------------- */

function Cooperative() {
  return (
    <section id="cooperativa" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-[0.4em] text-becubo-violet/80 mb-6"
        >
          MODELO COOPERATIVO
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Una cooperativa que <span className="gradient-text">rompe moldes.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 text-white/60 text-lg leading-relaxed max-w-2xl mx-auto"
        >
          Decisiones colectivas, propiedad democrática, beneficios compartidos.
          Diseñamos un modelo donde el talento, el impacto y la ética conviven
          en equilibrio.
        </motion.p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Vision                                                                     */
/* -------------------------------------------------------------------------- */

function Vision() {
  const values = ['Ética', 'Impacto', 'Comunidad', 'Innovación'];
  return (
    <section id="vision" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9 }}
          className="text-2xl md:text-4xl font-light leading-snug text-center text-white/80"
        >
          “Imaginamos un{' '}
          <span className="gradient-text font-semibold">2026</span> donde la
          tecnología y la cooperación construyan un futuro humano, justo y
          regenerativo.”
        </motion.blockquote>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {values.map((v, i) => (
            <motion.div
              key={v}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="aspect-square flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] text-lg tracking-widest hover:border-becubo-cyan/50 transition-colors"
            >
              {v.toUpperCase()}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer
      id="contacto"
      className="relative py-20 px-6 border-t border-white/10 bg-becubo-ink/60 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rotate-45 bg-becubo-cyan" />
          <span className="text-lg font-bold tracking-[0.2em]">BECUBO</span>
        </div>
        <p className="text-sm text-white/50">
          © {new Date().getFullYear()} Becubo · Cooperativa de innovación ética.
        </p>
        <p className="text-xs text-white/40 tracking-widest">
          NEXT.JS · THREE.JS · MOTION
        </p>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function Home() {
  return (
    <>
      {/* Fixed 3D background reacting to scroll */}
      <ThreeDCube />

      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Stats />
        <Pillars />
        <Services />
        <Cooperative />
        <Vision />
        <Footer />
      </main>
    </>
  );
}
