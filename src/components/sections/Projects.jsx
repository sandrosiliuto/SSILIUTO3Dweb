// =============================================================
// Projects.jsx
// =============================================================
import React from 'react'
import { PROJECTS } from '../../data/portfolio.js'

export default function Projects() {
  return (
    <section id="proyectos" className="block">
      <div className="container">
        <div className="section-head reveal">
          <h2>PORTALES DE CÓDIGO</h2>
          <p>Una selección de portales activos: configuradores 3D, sistemas reactivos, identidades, e-commerce y producto digital. Cada portal abre una capa distinta del estudio.</p>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <a
              key={p.id}
              href={p.url || '#contacto'}
              target={p.url ? '_blank' : undefined}
              rel={p.url ? 'noreferrer noopener' : undefined}
              className={`project-card reveal${p.highlight ? ' highlight' : ''}`}
              data-cursor="hover"
            >
              <div>
                <div className="id">PORTAL {p.id}{p.metrics ? ` · ${p.metrics}` : ''}</div>
                <h3 className="name">{p.name}</h3>
                <div className="cat">{p.category}</div>
                <p style={{ color: 'var(--text-mid)', marginTop: 14, fontSize: 14 }}>{p.description}</p>
                <div className="stack">
                  {p.stack.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
              <div className="read">{p.url ? 'VER PORTAL →' : 'CASO DE ESTUDIO →'}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
