// =============================================================
// Hero.jsx
// =============================================================
import React from 'react'
import { HERO } from '../../data/portfolio.js'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hud">
        <div className="hud__corner hud__tl">
          <div><span className="hud__label">SYS</span> ALCHEMY/3D · v1.0</div>
          <div><span className="hud__label">LOC</span> TFN/LDN/BIO</div>
          {/* Identidad del autor justo debajo de LOC, según UX brief */}
          <div className="hud__signature">// SANDRO SILIUTO</div>
        </div>
        <div className="hud__corner hud__tr">
          <div><span className="hud__label">FPS</span> 60</div>
          <div><span className="hud__label">RND</span> WebGL2</div>
        </div>
        <div className="hud__corner hud__bl">
          <div><span className="hud__label">CORE</span> NÚCLEO LÍNEAS VIVAS</div>
        </div>
        <div className="hud__corner hud__br">
          <div><span className="hud__label">MODE</span> PHYSICAL ⇄ DIGITAL</div>
        </div>
      </div>

      <div className="container">
        <div className="hero__grid">
          <h1 className="hero__title reveal">
            <span className="thin">{HERO.eyebrow}</span>
            <span className="split">{HERO.title}</span>
            <span className="split"><span className="accent">{HERO.titleAccent}</span></span>
          </h1>

          <div className="hero__sub reveal">
            <p>{HERO.description}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a className="hero__cta" href="#proyectos" data-cursor="hover">
                <span>{HERO.primaryCta}</span>
                <span>→</span>
              </a>
              <a className="hero__cta" href="#filosofia" data-cursor="hover" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                <span>{HERO.secondaryCta}</span>
                <span>↘</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-cue">
        <span>SCROLL</span>
        <span className="bar" />
      </div>
    </section>
  )
}
