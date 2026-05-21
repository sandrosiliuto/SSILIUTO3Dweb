# Becubo 3D · Thinking out of the Cube

Web cooperativa de [Becubo](https://becubo.vercel.app) con un cubo 3D interactivo que se ensambla y se desensambla con el scroll.

Construido con **Next.js 14 (App Router) · React Three Fiber · drei · Motion (Framer Motion) · Tailwind CSS**.

---

## 🚀 Demo local

```bash
npm install
npm run dev
```

Abre <http://localhost:3000>.

## 🏗️ Build de producción

```bash
npm run build
npm run start
```

El build genera la ruta `/` como **prerender estático** (ideal para Vercel CDN).

---

## ☁️ Despliegue en Vercel

### Opción A — Importar desde GitHub (recomendada)

1. Haz push del repo a GitHub (rama `main`).
2. Entra en <https://vercel.com/sandrosiliutos-projects>.
3. **Add New → Project → Import** el repo `becube3D`.
4. Vercel detectará automáticamente Next.js. **No cambies nada** en la configuración:
   - Framework Preset: `Next.js`
   - Build Command: `next build`
   - Output Directory: (vacío, Next gestiona `.next`)
   - Install Command: `npm install`
5. Click **Deploy**.

### Opción B — Vercel CLI

```bash
npm i -g vercel
vercel        # primera vez, sigue el wizard
vercel --prod # despliegue productivo
```

### Variables de entorno

No hay variables obligatorias. Si añades `NEXT_PUBLIC_*` para analytics, defínelas en
**Project Settings → Environment Variables**.

---

## 🧊 Cómo funciona la animación 3D

El componente [`components/ThreeDCube.tsx`](components/ThreeDCube.tsx) escucha el
scroll global de la ventana y normaliza un valor `0..1` en una `ref` (sin
re-renders). En cada frame de `useFrame`, ese valor controla:

| Rango de scroll | Comportamiento del cubo                                          |
| --------------- | ---------------------------------------------------------------- |
| `0.00 – 0.25`   | Cubo wireframe ensamblado, rotación lenta                        |
| `0.25 – 0.55`   | Las 8 esquinas salen expulsadas hacia fuera                      |
| `0.55 – 0.80`   | Las piezas forman un anillo horizontal (modelo cooperativo)      |
| `0.80 – 1.00`   | Vuelven al núcleo + pulso final                                  |

Además, el matiz HSL viaja por la paleta de Becubo (cyan → violeta → ámbar),
las partículas ganan opacidad y los anillos orbitales aceleran su rotación.

### Animaciones de UI con Motion

[`src/app/page.tsx`](src/app/page.tsx) usa `motion/react` para:

- Barra de progreso de scroll superior (`useScroll` + `useTransform`).
- Fade-in con `whileInView` para cada sección (stagger en stats / pilares).
- Parallax del hero: el texto sube y se desvanece (`useTransform`).
- Hover lift en las cards de pilares (`whileHover`).

---

## 📁 Estructura

```
becube3D/
├── components/
│   └── ThreeDCube.tsx       # Canvas + escena 3D reactiva al scroll
├── src/
│   └── app/
│       ├── globals.css      # Tailwind + estilos globales
│       ├── layout.tsx       # Metadata + html lang
│       └── page.tsx         # Hero, Stats, Pilares, Servicios, Visión, Footer
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🛠️ Stack

| Paquete                  | Versión   | Uso                              |
| ------------------------ | --------- | -------------------------------- |
| `next`                   | 14.2.35   | Framework (App Router, estático) |
| `react` / `react-dom`    | 18        | Render                           |
| `three`                  | 0.164     | WebGL                            |
| `@react-three/fiber`     | 8.16      | React renderer para three        |
| `@react-three/drei`      | 9.105     | Helpers 3D (OrbitControls…)      |
| `motion`                 | 12.39     | Animaciones declarativas / scroll|
| `tailwindcss`            | 3.4       | Estilos                          |

---

## 📝 Licencia

MIT — Becubo.
