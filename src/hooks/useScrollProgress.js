// =============================================================
// useScrollProgress.js
// Tracks the document scroll progress (0..1) without triggering
// React renders.  Synced via rAF; consumers read .current.
// =============================================================
import { useEffect, useRef } from 'react'

export function useScrollProgressRef() {
  const ref = useRef({ progress: 0, velocity: 0, last: 0 })

  useEffect(() => {
    let raf
    const update = () => {
      const doc = document.documentElement
      const max = (doc.scrollHeight - window.innerHeight) || 1
      const p = Math.min(1, Math.max(0, window.scrollY / max))
      const dt = Math.max(1, performance.now() - ref.current.last)
      ref.current.velocity = (p - ref.current.progress) * (1000 / dt)
      ref.current.progress = p
      ref.current.last = performance.now()
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  return ref
}
