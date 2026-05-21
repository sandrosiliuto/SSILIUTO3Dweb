// =============================================================
// useMouse.js
// Smoothed pointer tracker shared across the app.
// We expose normalised coords (-1..1) and a damped version that
// matches the responsiveness expected by the 3D scene.
// =============================================================
import { useEffect, useRef } from 'react'

/**
 * Returns a stable ref-object holding pointer state.
 * Using a ref avoids React re-renders for every pointer move.
 *
 *   { x, y, nx, ny, sx, sy, sxNorm, syNorm, hovering }
 *   - x, y: raw pixel coordinates
 *   - nx, ny: normalised [-1, 1]
 *   - sxNorm, syNorm: smoothed normalised coords (damped)
 */
export function useMouseRef() {
  const ref = useRef({
    x: 0, y: 0,
    nx: 0, ny: 0,
    sxNorm: 0, syNorm: 0,
    active: false,
    moving: false,
    lastMove: 0
  })

  useEffect(() => {
    const onMove = (e) => {
      const t = e.touches ? e.touches[0] : e
      const w = window.innerWidth
      const h = window.innerHeight
      ref.current.x = t.clientX
      ref.current.y = t.clientY
      ref.current.nx = (t.clientX / w) * 2 - 1
      ref.current.ny = -((t.clientY / h) * 2 - 1)
      ref.current.active = true
      ref.current.moving = true
      ref.current.lastMove = performance.now()
    }
    const onLeave = () => { ref.current.active = false }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return ref
}
