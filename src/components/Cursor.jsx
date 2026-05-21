// =============================================================
// Cursor.jsx
// Tech cursor: a dot, a smooth ring with mix-blend-mode, and a
// short particle-style trail.  All transforms are applied on
// requestAnimationFrame for buttery motion without React renders.
// =============================================================
import React, { useEffect, useRef } from 'react'

const TRAIL = 8

export default function Cursor() {
  const dotRef  = useRef()
  const ringRef = useRef()
  const trailRefs = useRef([])

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return undefined

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring   = { x: target.x, y: target.y }
    const trail  = Array.from({ length: TRAIL }, () => ({ x: target.x, y: target.y }))

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
    }
    const interactiveSelector = 'a, button, [data-cursor="hover"]'
    const onOver = (e) => {
      if (e.target.closest(interactiveSelector)) {
        ringRef.current?.classList.add('hover')
      } else {
        ringRef.current?.classList.remove('hover')
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)

    let raf
    const tick = () => {
      // Dot follows immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.x}px, ${target.y}px)`
      }
      // Ring eases toward the target
      ring.x += (target.x - ring.x) * 0.18
      ring.y += (target.y - ring.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`
      }
      // Trail propagates
      for (let i = trail.length - 1; i > 0; i--) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.35
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.35
      }
      trail[0].x += (target.x - trail[0].x) * 0.35
      trail[0].y += (target.y - trail[0].y) * 0.35
      trail.forEach((p, i) => {
        const el = trailRefs.current[i]
        if (el) {
          el.style.transform = `translate(${p.x}px, ${p.y}px)`
          el.style.opacity = String(0.6 - i * 0.08)
        }
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="cursor-root" aria-hidden="true">
      {Array.from({ length: TRAIL }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="cursor-trail"
        />
      ))}
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef}  className="cursor-dot"  />
    </div>
  )
}
