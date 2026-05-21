// =============================================================
// Nav.jsx — top fixed navigation
// =============================================================
import React from 'react'

export default function Nav() {
  return (
    <nav className="top-nav">
      <a href="#top" className="top-nav__brand">
        <span className="dot" />
        <span>SSILIUTO · DIGITAL ALCHEMY</span>
      </a>
      <div className="top-nav__links">
        <a href="#filosofia">Filosofía</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#testimonios">Testimonios</a>
        <a href="#contacto">Contacto</a>
      </div>
      <div className="top-nav__meta">
        <span>TFN · GMT+0</span>
        <span>BIO · GMT+1</span>
        <span>LDN · GMT+0</span>
      </div>
    </nav>
  )
}
