// =============================================================
// App.jsx
// Top-level composition:
//   - Persistent fixed Canvas (Scene)
//   - Page content sections in normal flow
//   - Custom cursor
//   - GSAP ScrollTrigger orchestrating section-level pacing
// =============================================================
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import Scene from './three/Scene.jsx'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/sections/Hero.jsx'
import Philosophy from './components/sections/Philosophy.jsx'
import Projects from './components/sections/Projects.jsx'
import Testimonials from './components/sections/Testimonials.jsx'
import CTASection from './components/sections/CTA.jsx'
import Footer from './components/sections/Footer.jsx'

import { useMouseRef } from './hooks/useMouse.js'
import { useScrollProgressRef } from './hooks/useScrollProgress.js'
import { useReveal } from './hooks/useReveal.js'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const mouseRef  = useMouseRef()
  const scrollRef = useScrollProgressRef()
  const [loaded, setLoaded] = useState(false)

  useReveal([])

  // Loader
  useEffect(() => {
    const id = window.setTimeout(() => setLoaded(true), 900)
    return () => window.clearTimeout(id)
  }, [])

  // GSAP ScrollTrigger pacing on section labels
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('section.block, .cta-block').forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 80%',
          end:   'bottom 20%',
          onEnter: () => sec.classList.add('is-active'),
          onLeaveBack: () => sec.classList.remove('is-active')
        })
      })

      // Subtle parallax on .hero__title (fade & lift on scroll)
      gsap.to('.hero__title', {
        yPercent: -20,
        opacity:  0.5,
        scrollTrigger: {
          trigger: '.hero',
          start:   'top top',
          end:     'bottom top',
          scrub:   true
        }
      })
    })

    // ScrollTrigger needs to know the document size after lazy
    // images / fonts settle.
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      ctx.revert()
      window.removeEventListener('load', onLoad)
    }
  }, [])

  return (
    <>
      <div className={`loader ${loaded ? 'hidden' : ''}`} aria-hidden={loaded}>
        <span>BOOTING · DIGITAL ALCHEMY ENGINE</span>
        <div className="bar" />
        <span>NÚCLEO LÍNEAS VIVAS · v1.0</span>
      </div>

      <Scene mouseRef={mouseRef} scrollRef={scrollRef} />

      <div className="scanlines" aria-hidden="true" />

      <Nav />

      <main>
        <Hero />
        <Philosophy />
        <Projects />
        <Testimonials />
        <CTASection />
        <Footer />
      </main>

      <Cursor />
    </>
  )
}
