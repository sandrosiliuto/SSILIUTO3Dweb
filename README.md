# SSILIUTO · Digital Alchemy

> Portfolio 3D-first del estudio de **Sandro Siliuto** — Tenerife · Londres · Bilbao.
> Núcleo Líneas Vivas: una escultura abstracta de líneas luminosas reactiva al ratón y al scroll, construida con shaders GLSL personalizados sobre **React Three Fiber**.

---

## Stack

| Capa             | Tecnología |
|------------------|------------|
| Build            | Vite 5 + React 18 |
| 3D               | three 0.169 · `@react-three/fiber` · `@react-three/drei` |
| Post-processing  | `@react-three/postprocessing` (Bloom, Chromatic Aberration, Vignette) |
| Animación scroll | GSAP 3 + ScrollTrigger |
| Estilos          | CSS modular (tokens "Tech Noir") |

## Decisiones técnicas

1. **Núcleo Líneas Vivas** — `src/three/LineCore.jsx` combina tres capas de líneas:
   - Wireframe icosaédrico deformado por **simplex noise** + un *force-field* localizado alrededor del puntero del ratón.
   - Tres anillos orbitales con velocidades distintas, ligados al progreso de scroll.
   - "NET": puntos aleatorios sobre la esfera conectados a sus vecinos, con fade por distancia al ratón.
2. **Shaders GLSL** custom (`vertexShader` + `fragmentShader`) generan el efecto neón sin texturas, gracias a `AdditiveBlending`.
3. **Cursor personalizado** con dot + ring + estela de partículas, controlado vía `requestAnimationFrame` (sin re-renders React).
4. **Scroll → 3D**: rotación, escala y posición del objeto se interpolan con el progreso del scroll. El scroll dirige la cámara.
5. **Performance**: `dpr=[1, 1.6]`, `AdaptiveDpr`, `BufferGeometry`, una sola draw-call para las partículas, cleanup de geometrías/materiales en `useEffect`.

## Estructura

```
src/
├── App.jsx                  # Composición y GSAP ScrollTrigger
├── main.jsx
├── styles/global.css        # Tokens "Tech Noir" + UI
├── three/
│   ├── Scene.jsx            # Canvas R3F + EffectComposer + Bloom
│   ├── LineCore.jsx         # Núcleo Líneas Vivas (shaders GLSL)
│   └── ParticleField.jsx    # Campo de partículas
├── components/
│   ├── Cursor.jsx           # Cursor tecnológico con estela
│   ├── Nav.jsx
│   └── sections/
│       ├── Hero.jsx
│       ├── Philosophy.jsx
│       ├── Projects.jsx
│       ├── Testimonials.jsx
│       ├── CTA.jsx
│       └── Footer.jsx
├── hooks/
│   ├── useMouse.js          # Pointer normalizado (ref-based)
│   ├── useScrollProgress.js # Scroll progress 0..1
│   └── useReveal.js         # IntersectionObserver fade-in
└── data/portfolio.js        # Contenido completo del portfolio
```

## Scripts

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # genera /dist
npm run preview   # sirve /dist
```

## Despliegue

Compatible con **Vercel** (Vite preset). El `dist/` es 100% estático.

## Paleta

| Token         | Hex        | Uso |
|---------------|------------|-----|
| `--bg-0`      | `#05060a`  | Fondo del canvas/sitio |
| `--line-cool` | `#B0B0B0`  | Líneas frías (base) |
| `--accent-blue` | `#00BFFF` | Líneas activas / acento |
| `--accent-pink` | `#FF007F` | Estado hover / energía |
| `--text-hi`   | `#F4F6FB`  | Texto principal |
