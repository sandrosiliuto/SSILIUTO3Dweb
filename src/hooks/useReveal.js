// =============================================================
// useReveal.js
// Tiny IntersectionObserver hook adding `.in` to elements with
// the `.reveal` class once they enter the viewport.  No external
// animation lib needed for content fades.
// =============================================================
import { useEffect } from 'react'

export function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)')
    if (!('IntersectionObserver' in window) || els.length === 0) return

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' })

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
