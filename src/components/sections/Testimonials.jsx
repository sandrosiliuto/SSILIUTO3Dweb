// =============================================================
// Testimonials.jsx
// =============================================================
import React from 'react'
import { TESTIMONIALS } from '../../data/portfolio.js'

export default function Testimonials() {
  return (
    <section id="testimonios" className="block">
      <div className="container">
        <div className="section-head reveal">
          <h2>TESTIMONIOS</h2>
          <p>Voces de directores creativos y co-fundadores con los que hemos transformado ideas en sistemas físico-digitales.</p>
        </div>

        <div className="testimonials">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="testimonial reveal">
              <blockquote>"{t.quote}"</blockquote>
              <cite>
                {t.name}
                <span className="role" style={{ marginLeft: 8 }}>· {t.role}</span>
              </cite>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
