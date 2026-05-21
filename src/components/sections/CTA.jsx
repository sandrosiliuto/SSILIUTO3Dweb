// =============================================================
// CTA.jsx
// =============================================================
import React from 'react'
import { CTA } from '../../data/portfolio.js'

export default function CTASection() {
  return (
    <section id="contacto" className="cta-block">
      <div className="container">
        <span className="eyebrow reveal">{CTA.badge}</span>
        <h2 className="reveal">{CTA.title}</h2>
        <p className="reveal">{CTA.body}</p>
        <a
          href={CTA.ctaHref}
          className="hero__cta reveal"
          target="_blank"
          rel="noreferrer noopener"
          data-cursor="hover"
          style={{ display: 'inline-flex', marginTop: 8 }}
        >
          <span>{CTA.ctaLabel}</span>
          <span>↗</span>
        </a>
        <div className="meta reveal">{CTA.meta}</div>
      </div>
    </section>
  )
}
