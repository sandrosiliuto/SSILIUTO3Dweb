// =============================================================
// Philosophy.jsx
// =============================================================
import React from 'react'
import { PHILOSOPHY } from '../../data/portfolio.js'

export default function Philosophy() {
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <section id="filosofia" className="block">
      <div className="container">
        <div className="section-head reveal">
          <h2>{PHILOSOPHY.title}</h2>
          <p>{PHILOSOPHY.intro}</p>
        </div>

        <div className="philosophy__split reveal">
          <article className="pill" onMouseMove={handleMove}>
            <h3>{PHILOSOPHY.physical.title}</h3>
            <p>{PHILOSOPHY.physical.body}</p>
          </article>
          <article className="pill" onMouseMove={handleMove}>
            <h3>{PHILOSOPHY.digital.title}</h3>
            <p>{PHILOSOPHY.digital.body}</p>
          </article>
        </div>

        <div className="duality reveal">
          <span>FÍSICO</span>
          <span className="arrow">⇄</span>
          <span>DIGITAL</span>
        </div>
      </div>
    </section>
  )
}
