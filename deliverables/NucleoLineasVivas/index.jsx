/**
 * NucleoLineasVivas — index.jsx
 * ──────────────────────────────
 * Componente principal listo para integrar en ssiliutodesign-web.
 *
 * USO BÁSICO (Hero background persistente):
 * ─────────────────────────────────────────
 *   import NucleoLineasVivas from './components/NucleoLineasVivas'
 *
 *   // En tu App.jsx o layout raíz, ANTES de todo el contenido:
 *   <NucleoLineasVivas />
 *   <main>{...tu contenido...}</main>
 *
 * El canvas es `position: fixed; z-index: 0; pointer-events: none`
 * → actúa como fondo vivo sin bloquear la interacción con el DOM.
 *
 * PROPS:
 *   numPoints      {number}  Nodos en la red (default: 80, max recomendado: 120)
 *   connectionDist {number}  Distancia máxima para trazar línea (default: 3.2)
 *   mouseRadius    {number}  Radio de influencia del cursor (default: 3.8)
 *   bloomIntensity {number}  Intensidad del bloom (default: 1.4)
 *   withBloom      {boolean} Activar/desactivar postprocessing (default: true)
 *   showCursor     {boolean} Cursor personalizado (default: true)
 *   className      {string}  Clase CSS extra para el wrapper del canvas
 *
 * PAQUETES REQUERIDOS (añadir a package.json del proyecto destino):
 *   npm install gsap @react-three/postprocessing
 *   (three, @react-three/fiber, @react-three/drei ya deben estar instalados)
 *
 * NOTA NEXT.JS: añade 'use client' en la primera línea de este archivo.
 */

import { useEffect, useRef, Suspense } from 'react'
import { Canvas }                      from '@react-three/fiber'
import gsap                            from 'gsap'
import { ScrollTrigger }               from 'gsap/ScrollTrigger'
import LineasScene                     from './LineasScene'
import CustomCursor                    from './CustomCursor'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

// ─── Helper: detectar soporte de WebGL ──────────────────────────────────────
function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

// ────────────────────────────────────────────────────────────────────────────
export default function NucleoLineasVivas({
  numPoints      = 80,
  connectionDist = 3.2,
  mouseRadius    = 3.8,
  bloomIntensity = 1.4,
  withBloom      = true,
  showCursor     = true,
  className      = '',
}) {
  // ── Refs compartidos entre DOM y WebGL (sin re-renders) ──────────────────
  const mouseRef  = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(0)

  // ── Tracking del ratón en NDC (-1 a +1) ──────────────────────────────────
  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x =  (e.clientX / window.innerWidth)  * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    // Touch support (mobile)
    const onTouch = (e) => {
      if (!e.touches[0]) return
      mouseRef.current.x =  (e.touches[0].clientX / window.innerWidth)  * 2 - 1
      mouseRef.current.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove,  { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  // ── GSAP ScrollTrigger — orquesta el progreso del scroll ─────────────────
  useEffect(() => {
    /*
     * Crea un ScrollTrigger que abarca toda la página (start=0, end=max).
     * `onUpdate` alimenta scrollRef.current con el progreso 0→1.
     * En LineasMesh, useFrame lee este valor cada frame para coreografiar
     * la cámara y otras propiedades de la escena.
     *
     * scrub: falso intencionalmente aquí porque el suavizado se realiza
     * con lerp en useFrame (más control y sin overhead de GSAP timeline).
     */
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start   : 0,
        end     : 'max',
        onUpdate: (self) => {
          scrollRef.current = self.progress
        },
      })
    })

    return () => ctx.revert()
  }, [])

  // Fallback sin WebGL (SSR / dispositivos antiguos)
  if (typeof window !== 'undefined' && !hasWebGL()) return null

  return (
    <>
      {/* Cursor tecnológico personalizado (solo desktop) */}
      {showCursor && <CustomCursor mouseRef={mouseRef} />}

      {/*
       * Canvas fijo a pantalla completa, detrás del contenido (z-index: 0).
       * pointer-events: none → no bloquea clics ni scroll del DOM.
       */}
      <div
        className={`nlv-canvas-root ${className}`}
        aria-hidden="true"
        style={{
          position     : 'fixed',
          inset        : 0,
          zIndex       : 0,
          pointerEvents: 'none',
        }}
      >
        <Canvas
          camera={{
            position: [0, 0, 11],
            fov     : 50,
            near    : 0.1,
            far     : 100,
          }}
          dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
          gl={{
            antialias       : true,
            alpha           : true,
            powerPreference : 'high-performance',
            // Desactiva stencil/depth innecesarios para ahorrar VRAM
            stencil         : false,
            depth           : true,
          }}
          style={{ width: '100%', height: '100%' }}
          // Evitar que R3F suspenda todo si hay un error en la escena
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0) // fondo transparente
          }}
        >
          <Suspense fallback={null}>
            <LineasScene
              mouseRef={mouseRef}
              scrollRef={scrollRef}
              numPoints={numPoints}
              connectionDist={connectionDist}
              mouseRadius={mouseRadius}
              bloomIntensity={bloomIntensity}
              withBloom={withBloom}
            />
          </Suspense>
        </Canvas>
      </div>
    </>
  )
}
