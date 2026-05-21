// =============================================================
// Footer.jsx
// =============================================================
import React from 'react'
import { FOOTER } from '../../data/portfolio.js'

export default function Footer() {
  return (
    <footer className="site">
      <div className="container">
        <div className="row">
          <span>{FOOTER.brand}</span>
          <span>{FOOTER.cities}</span>
          <span>{FOOTER.tagline}</span>
        </div>
        <div style={{ marginTop: 24 }}>{FOOTER.copyright}</div>
      </div>
    </footer>
  )
}
