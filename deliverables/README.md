# Núcleo Líneas Vivas — Guía de Integración

Objeto 3D central para **ssiliutodesign-web**: red de líneas auto-luminosas que reacciona al cursor y al scroll, alineada con la identidad "Tech Noir" del portfolio.

---

## Instalación de dependencias

En el directorio raíz de `ssiliutodesign-web`:

```bash
npm install gsap @react-three/postprocessing
# (three, @react-three/fiber, @react-three/drei deben estar ya instalados)
```

Versiones validadas:
| Paquete | Versión |
|---|---|
| `three` | ^0.164 |
| `@react-three/fiber` | ^8.16 |
| `@react-three/drei` | ^9.105 |
| `gsap` | ^3.12 |
| `@react-three/postprocessing` | ^2.16 |

---

## Estructura de archivos a copiar

```
ssiliutodesign-web/
└── src/
    └── components/
        └── NucleoLineasVivas/
            ├── index.jsx          ← componente principal (exportación default)
            ├── LineasScene.jsx    ← escena R3F + postprocessing
            ├── LineasMesh.jsx     ← red 3D dinámica (el núcleo)
            ├── CustomCursor.jsx   ← cursor tecnológico con trail
            └── styles.css         ← estilos base
```

---

## Integración en App.jsx / layout raíz

```jsx
// src/App.jsx (o layout.jsx si usas Next.js)
import NucleoLineasVivas from './components/NucleoLineasVivas'

export default function App() {
  return (
    <>
      {/*
        Colocar ANTES que cualquier sección.
        El canvas es fixed + pointer-events:none → no bloquea el DOM.
      */}
      <NucleoLineasVivas />

      {/*
        Todo el contenido normal encima.
        Añade className="nlv-above" a las secciones para asegurarte
        de que reciben eventos y se renderizan sobre el canvas.
      */}
      <main>
        <section id="hero" className="nlv-above">
          {/* ... */}
        </section>
        <section id="portales" className="nlv-above">
          {/* ... */}
        </section>
      </main>
    </>
  )
}
```

---

## Props disponibles

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `numPoints` | number | `80` | Nodos en la red (recomendado: 60–120) |
| `connectionDist` | number | `3.2` | Distancia máx. para trazar línea entre nodos |
| `mouseRadius` | number | `3.8` | Radio de influencia del cursor en unidades 3D |
| `bloomIntensity` | number | `1.4` | Intensidad del efecto bloom |
| `withBloom` | boolean | `true` | Activa/desactiva el postprocessing |
| `showCursor` | boolean | `true` | Activa/desactiva el cursor personalizado |
| `className` | string | `''` | Clase CSS extra para el wrapper del canvas |

---

## Paleta de colores

| Elemento | Color | Hex |
|---|---|---|
| Líneas / nodos base | Gris frío | `#B0B0B0` |
| Líneas / nodos acento | Azul cian | `#00BFFF` |
| Interacción (ratón / energía) | Fucsia | `#FF007F` |

Para cambiar la paleta, edita las constantes en `LineasMesh.jsx`:
```js
const C_GRAY = new THREE.Color('#B0B0B0')
const C_BLUE = new THREE.Color('#00BFFF')
const C_PINK = new THREE.Color('#FF007F')
```

---

## Ajuste de rendimiento

| Dispositivo | `numPoints` recomendado | `withBloom` |
|---|---|---|
| Desktop high-end | 100–120 | `true` |
| Desktop mid | 80 (default) | `true` |
| Laptop / tablet | 60 | `true` |
| Mobile | 40 | `false` |

Detección automática de rendimiento (opcional):

```jsx
const isMobile = /Mobi|Android/i.test(navigator.userAgent)

<NucleoLineasVivas
  numPoints={isMobile ? 40 : 80}
  withBloom={!isMobile}
/>
```

---

## Interacción con el scroll — Cómo funciona

GSAP ScrollTrigger monitoriza el progreso de scroll `0 → 1` de la página y lo almacena en un `ref` compartido con el canvas WebGL. En cada frame (`useFrame`), la cámara interpola su posición hacia una trayectoria orbital definida por ese progreso:

- **0% scroll** → cámara frontal en `z=11`
- **25% scroll** → cámara en órbita lateral derecha
- **60% scroll** → cámara baja y se acerca a `z=6`
- **100% scroll** → cámara completa la órbita y sube

La transición es continua y reversible: scrollear hacia arriba revierte la animación.

---

## Nota para Next.js

Añade `'use client'` al inicio de `index.jsx` y usa carga dinámica:

```jsx
// page.jsx o layout.jsx
import dynamic from 'next/dynamic'

const NucleoLineasVivas = dynamic(
  () => import('@/components/NucleoLineasVivas'),
  { ssr: false }
)
```

---

## Arquitectura interna

```
NucleoLineasVivas (index.jsx)
│
├── useEffect → window.mousemove → mouseRef {x,y} (NDC)
├── useEffect → gsap.ScrollTrigger → scrollRef (0→1)
│
└── <Canvas>
      └── <LineasScene>
            ├── <LineasMesh>          ← useFrame: actualiza buffers cada frame
            │     ├── nodePositions   ← Float32Array mutable (sin GC)
            │     ├── lineSegments    ← Float32Array pre-asignado (MAX_SEGMENTS=6000)
            │     └── camera.lerp()  ← interpolación suave basada en scroll
            │
            └── <EffectComposer>
                  ├── <Bloom>         ← resplandor neón real
                  └── <Vignette>      ← oscurecimiento de bordes
```
