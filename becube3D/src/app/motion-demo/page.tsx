/**
 * Ejemplo simple de animación con `motion` (sucesor de framer-motion).
 *
 * Ejecuta este archivo en cualquier proyecto Next.js / React copiándolo a
 * `src/app/motion-demo/page.tsx` y abriendo /motion-demo, o úsalo como
 * referencia para añadir scroll-animations en tu web.
 *
 * Conceptos cubiertos:
 *  - `motion.div` con `whileHover` / `whileTap`
 *  - `useScroll` + `useTransform` para parallax dependiente del scroll
 *  - `whileInView` con stagger para revelar tarjetas al entrar en pantalla
 *  - `AnimatePresence` para enter/exit
 */

'use client';

import { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  type Variants,
} from 'motion/react';

const cards = [
  { title: 'Bementory', color: '#22d3ee' },
  { title: 'Begitality', color: '#a855f7' },
  { title: 'Beventy', color: '#fbbf24' },
];

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function MotionExample() {
  const [open, setOpen] = useState(true);
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 1]);

  return (
    <main className="min-h-[300vh] bg-becubo-ink text-white">
      {/* 1 · Parallax box driven by scroll */}
      <section className="h-screen flex items-center justify-center">
        <motion.div
          style={{ rotate, scale }}
          className="w-40 h-40 rounded-2xl bg-gradient-to-br from-becubo-cyan to-becubo-violet shadow-2xl"
        />
      </section>

      {/* 2 · Stagger reveal on scroll */}
      <section className="py-32 px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map((c) => (
            <motion.div
              key={c.title}
              variants={item}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="p-8 rounded-2xl border border-white/10 bg-white/[0.03]"
              style={{ boxShadow: `0 20px 60px -20px ${c.color}55` }}
            >
              <div
                className="w-3 h-3 rotate-45 mb-4"
                style={{ background: c.color }}
              />
              <h3 className="text-2xl font-bold">{c.title}</h3>
              <p className="mt-3 text-white/60">
                Hover para subir, tap para encoger.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3 · AnimatePresence enter/exit */}
      <section className="py-32 px-6 text-center">
        <button
          onClick={() => setOpen((v) => !v)}
          className="px-6 py-3 rounded-full border border-becubo-cyan text-becubo-cyan hover:bg-becubo-cyan hover:text-becubo-ink transition-colors text-sm tracking-widest"
        >
          {open ? 'Ocultar' : 'Mostrar'}
        </button>

        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 max-w-xl mx-auto p-6 rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden"
            >
              <p className="text-white/70">
                Bloque animado con entrada y salida suaves usando
                <code className="px-1 mx-1 rounded bg-white/10">AnimatePresence</code>.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
