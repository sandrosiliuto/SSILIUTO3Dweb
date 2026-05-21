/**
 * CustomCursor.jsx
 * ────────────────
 * Cursor tecnológico "Tech Noir" con dos capas:
 *
 *  1. DOT    — punto pequeño fucsia que sigue el cursor al instante
 *  2. RING   — aro azul-cian que persigue el dot con suavizado (lerp)
 *  3. TRAIL  — partículas que se desvanecen tras el cursor (canvas 2D)
 *
 * El cursor DOM nativo queda oculto vía CSS (cursor: none en body).
 * Se restaura al desmontar el componente.
 *
 * Comportamiento en hover sobre elementos interactivos (a, button, [data-cursor]):
 *  → El ring se expande y cambia a fucsia
 *  → El dot desaparece
 */

import { useEffect, useRef } from 'react'

// ── Constantes de estilo ──────────────────────────────────────────────────
const DOT_SIZE    = 6
const RING_SIZE   = 38
const RING_EXPAND = 56     // tamaño del ring en estado hover
const TRAIL_MAX   = 28     // partículas activas máximas
const TRAIL_FADE  = 0.055  // velocidad de desvanecimiento (por frame)
const LERP_SPEED  = 0.12   // suavizado de persecución del ring

// ── Paleta ────────────────────────────────────────────────────────────────
const COL_DOT   = '#FF007F'
const COL_RING  = 'rgba(0, 191, 255, 0.75)'
const COL_HOVER = '#FF007F'
const COL_TRAIL_START = '255, 0, 127'   // RGB para rgba()

export default function CustomCursor({ mouseRef }) {
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  const trailRef = useRef(null)

  useEffect(() => {
    // Ocultar cursor nativo
    document.body.style.cursor = 'none'

    const dot    = dotRef.current
    const ring   = ringRef.current
    const canvas = trailRef.current
    if (!dot || !ring || !canvas) return

    const ctx = canvas.getContext('2d')

    // ── Variables de animación ────────────────────────────────────────────
    let curX = window.innerWidth  / 2
    let curY = window.innerHeight / 2
    let ringX = curX, ringY = curY
    let isHover  = false
    let rafId    = 0
    const trail  = []  // [{x, y, life}]  life: 1 → 0

    // ── Resize canvas ─────────────────────────────────────────────────────
    const resizeCanvas = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // ── Mouse events ──────────────────────────────────────────────────────
    const onMove = (e) => {
      curX = e.clientX
      curY = e.clientY
      // Añadir partícula al trail
      if (trail.length < TRAIL_MAX) {
        trail.push({ x: curX, y: curY, life: 1.0 })
      }
    }

    const onEnterInteractive = () => { isHover = true  }
    const onLeaveInteractive = () => { isHover = false }

    // Delegar en el document para capturar todos los interactivos
    const onMouseOver = (e) => {
      if (e.target.matches('a, button, [data-cursor], input, textarea, select, label')) {
        onEnterInteractive()
      }
    }
    const onMouseOut = (e) => {
      if (e.target.matches('a, button, [data-cursor], input, textarea, select, label')) {
        onLeaveInteractive()
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout',  onMouseOut)

    // ── Loop principal ────────────────────────────────────────────────────
    const animate = () => {
      // -- Dot: sigue el cursor inmediatamente --
      dot.style.transform = `translate(${curX - DOT_SIZE / 2}px, ${curY - DOT_SIZE / 2}px)`
      dot.style.opacity   = isHover ? '0' : '1'

      // -- Ring: sigue al dot con lerp --
      ringX += (curX - ringX) * LERP_SPEED
      ringY += (curY - ringY) * LERP_SPEED

      const rSize = isHover ? RING_EXPAND : RING_SIZE
      ring.style.transform       = `translate(${ringX - rSize / 2}px, ${ringY - rSize / 2}px)`
      ring.style.width           = `${rSize}px`
      ring.style.height          = `${rSize}px`
      ring.style.borderColor     = isHover ? COL_HOVER : COL_RING
      ring.style.backgroundColor = isHover ? 'rgba(255,0,127,0.08)' : 'transparent'

      // -- Trail canvas --
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i]
        p.life -= TRAIL_FADE
        if (p.life <= 0) {
          trail.splice(i, 1)
          continue
        }
        const radius = p.life * 3.5
        const alpha  = p.life * 0.7
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${COL_TRAIL_START}, ${alpha})`
        ctx.fill()
      }

      rafId = requestAnimationFrame(animate)
    }
    animate()

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      document.body.style.cursor = ''
      window.removeEventListener('resize',    resizeCanvas)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout',  onMouseOut)
    }
  }, [])

  // Styles en línea para evitar dependencia de CSS externo en este componente
  const shared = {
    position      : 'fixed',
    pointerEvents : 'none',
    zIndex        : 99999,
    willChange    : 'transform',
  }

  return (
    <>
      {/* Partículas trail — canvas full-screen */}
      <canvas
        ref={trailRef}
        style={{ ...shared, inset: 0, zIndex: 99998 }}
        aria-hidden="true"
      />

      {/* Dot central — punto fucsia */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          ...shared,
          top           : 0,
          left          : 0,
          width         : `${DOT_SIZE}px`,
          height        : `${DOT_SIZE}px`,
          borderRadius  : '50%',
          backgroundColor: COL_DOT,
          boxShadow     : `0 0 8px 2px ${COL_DOT}`,
        }}
      />

      {/* Ring exterior — aro cian con suavizado */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          ...shared,
          top          : 0,
          left         : 0,
          width        : `${RING_SIZE}px`,
          height       : `${RING_SIZE}px`,
          borderRadius : '50%',
          border       : `1px solid ${COL_RING}`,
          transition   : 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background-color 0.25s ease, opacity 0.2s ease',
          mixBlendMode : 'screen',
        }}
      />
    </>
  )
}
