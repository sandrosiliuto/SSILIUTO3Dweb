// =============================================================
// CubeStructure.jsx
// Estructura cúbica 3D wireframe estilo BeCube:
//   - Cubo central wireframe (12 edges) con ShaderMaterial neón
//   - 3 cubos concéntricos a distintas escalas (RGB-style: cool,
//     azul, magenta) rotando con velocidades cruzadas
//   - Vertex displacement: distorsión sutil con simplex noise +
//     atracción/repulsión local cuando el ratón se aproxima
//   - Borde nítido (no additive), grosor controlado por
//     gl_LineWidth fallback + bloom postprocessing en el composer
// =============================================================
import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ---------- shaders ---------- */

const cubeVert = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform vec3  uMouse;
  uniform float uMouseStrength;
  uniform float uNoiseAmp;
  varying float vEnergy;
  varying float vMouseDist;

  // Hash para pseudo-noise barato (sin tablas)
  float hash(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
  float vnoise(vec3 p){
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f*f*(3.0-2.0*f);
    float n = mix(
      mix(mix(hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)), f.x),
          mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
          mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y),
      f.z);
    return n * 2.0 - 1.0;
  }

  void main() {
    vec3 pos = position;
    // Distorsión orgánica sutil
    float n = vnoise(pos * 1.6 + vec3(uTime * 0.25));
    pos += normalize(pos + 0.0001) * n * uNoiseAmp;

    // Pulse según scroll
    pos *= 1.0 + sin(uScroll * 6.2831 + uTime * 0.4) * 0.04;

    // Atracción local al ratón
    float md = distance(pos, uMouse);
    vMouseDist = md;
    float falloff = smoothstep(1.4, 0.0, md);
    pos += normalize(uMouse - pos) * falloff * uMouseStrength;

    vEnergy = clamp(falloff * 1.4 + abs(n) * 0.5, 0.0, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const cubeFrag = /* glsl */ `
  precision mediump float;
  uniform vec3  uColorBase;
  uniform vec3  uColorHot;
  uniform float uOpacity;
  varying float vEnergy;
  varying float vMouseDist;

  void main() {
    vec3 col = mix(uColorBase, uColorHot, smoothstep(0.0, 0.85, vEnergy));
    // halo magenta cuando el ratón está cerca
    float halo = smoothstep(1.1, 0.0, vMouseDist) * 0.6;
    col += uColorHot * halo * 0.4;
    float a = uOpacity * (0.55 + vEnergy * 0.6);
    gl_FragColor = vec4(col, a);
  }
`

/* ---------- helpers ---------- */

// Construye un BufferGeometry con SOLO las 12 aristas de un cubo.
// 24 vértices (par por arista) — perfecto para LineSegments.
function buildCubeEdgesGeometry(size = 1) {
  const s = size * 0.5
  // 8 vértices del cubo
  const v = [
    [-s, -s, -s], [ s, -s, -s], [ s,  s, -s], [-s,  s, -s],
    [-s, -s,  s], [ s, -s,  s], [ s,  s,  s], [-s,  s,  s]
  ]
  const edges = [
    [0,1],[1,2],[2,3],[3,0], // back face
    [4,5],[5,6],[6,7],[7,4], // front face
    [0,4],[1,5],[2,6],[3,7]  // pillars
  ]
  const positions = []
  edges.forEach(([a, b]) => {
    positions.push(...v[a], ...v[b])
  })
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  return g
}

// Subdivide cada arista en segmentos pequeños para que el vertex
// shader pueda deformarlas suavemente.
function buildSubdividedCube(size = 1, segs = 32) {
  const s = size * 0.5
  const v = [
    [-s, -s, -s], [ s, -s, -s], [ s,  s, -s], [-s,  s, -s],
    [-s, -s,  s], [ s, -s,  s], [ s,  s,  s], [-s,  s,  s]
  ]
  const edges = [
    [0,1],[1,2],[2,3],[3,0],
    [4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7]
  ]
  const positions = []
  edges.forEach(([a, b]) => {
    const va = v[a], vb = v[b]
    for (let i = 0; i < segs; i++) {
      const t1 = i / segs
      const t2 = (i + 1) / segs
      positions.push(
        va[0] + (vb[0] - va[0]) * t1,
        va[1] + (vb[1] - va[1]) * t1,
        va[2] + (vb[2] - va[2]) * t1
      )
      positions.push(
        va[0] + (vb[0] - va[0]) * t2,
        va[1] + (vb[1] - va[1]) * t2,
        va[2] + (vb[2] - va[2]) * t2
      )
    }
  })
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  return g
}

/* ---------- componente ---------- */

const COLORS = {
  cool: new THREE.Color('#b0b0b0'),
  blue: new THREE.Color('#00bfff'),
  pink: new THREE.Color('#ff007f')
}

export default function CubeStructure({ mouseRef, scrollRef }) {
  const groupRef = useRef()
  const cubesRef = useRef([])

  // 3 cubos concéntricos a distintas escalas y colores
  const cubes = useMemo(() => {
    const data = [
      { size: 1.0, base: COLORS.cool, hot: COLORS.pink, noise: 0.06, mouseK: 0.10, opacity: 0.95 },
      { size: 1.7, base: COLORS.blue, hot: COLORS.pink, noise: 0.05, mouseK: 0.16, opacity: 0.55 },
      { size: 2.5, base: COLORS.cool, hot: COLORS.blue, noise: 0.04, mouseK: 0.22, opacity: 0.30 }
    ]
    return data.map(({ size, base, hot, noise, mouseK, opacity }) => {
      const geo = buildSubdividedCube(size, 24)
      const mat = new THREE.ShaderMaterial({
        vertexShader: cubeVert,
        fragmentShader: cubeFrag,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime:           { value: 0 },
          uScroll:         { value: 0 },
          uMouse:          { value: new THREE.Vector3() },
          uMouseStrength:  { value: mouseK },
          uNoiseAmp:       { value: noise },
          uOpacity:        { value: opacity },
          uColorBase:      { value: base },
          uColorHot:       { value: hot }
        }
      })
      return { geo, mat }
    })
  }, [])

  // Vértices/esquinas como puntos brillantes (estilo BeCube "calibrated")
  const cornerPoints = useMemo(() => {
    const positions = []
    const sizes = []
    cubes.forEach((_, i) => {
      const s = (i === 0 ? 1.0 : i === 1 ? 1.7 : 2.5) * 0.5
      const v = [
        [-s,-s,-s],[s,-s,-s],[s,s,-s],[-s,s,-s],
        [-s,-s,s],[s,-s,s],[s,s,s],[-s,s,s]
      ]
      v.forEach((p) => {
        positions.push(...p)
        sizes.push(2.5 + i * 0.5)
      })
    })
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('aSize', new THREE.Float32BufferAttribute(sizes, 1))
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: COLORS.blue }
      },
      vertexShader: /* glsl */`
        attribute float aSize;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (220.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */`
        precision mediump float;
        uniform vec3 uColor;
        void main(){
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(uColor, a * 0.85);
        }
      `
    })
    return { geo, mat }
  }, [cubes])

  // Damped mouse target (compartido lógicamente con LineCore para
  // coherencia visual; se calcula localmente porque cada material
  // necesita su propio uniform Vector3).
  const mouseTarget = useRef(new THREE.Vector3())
  const dampedMouse = useRef(new THREE.Vector3())

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const t  = state.clock.elapsedTime

    const m = mouseRef?.current
    if (m) {
      mouseTarget.current.set(m.nx * 1.7, m.ny * 1.0, 1.2)
      dampedMouse.current.lerp(mouseTarget.current, 0.08)
    }

    const scroll = scrollRef?.current?.progress || 0

    cubes.forEach((c, i) => {
      const u = c.mat.uniforms
      u.uTime.value   = t
      u.uScroll.value = scroll
      u.uMouse.value.copy(dampedMouse.current)
    })

    // Cada cubo rota a velocidad y eje distinto
    cubesRef.current.forEach((mesh, i) => {
      if (!mesh) return
      const dir = i % 2 === 0 ? 1 : -1
      mesh.rotation.x += dt * (0.10 + i * 0.05) * dir
      mesh.rotation.y += dt * (0.14 - i * 0.02) * dir
      mesh.rotation.z = scroll * Math.PI * (0.5 + i * 0.25) * dir
    })

    // Conjunto: leve flotación
    if (groupRef.current) {
      groupRef.current.position.x = Math.sin(t * 0.18) * 0.08
      groupRef.current.position.y = Math.cos(t * 0.22) * 0.06
    }
  })

  React.useEffect(() => {
    return () => {
      cubes.forEach((c) => { c.geo.dispose(); c.mat.dispose() })
      cornerPoints.geo.dispose()
      cornerPoints.mat.dispose()
    }
  }, [cubes, cornerPoints])

  return (
    <group ref={groupRef}>
      {cubes.map((c, i) => (
        <lineSegments
          key={i}
          ref={(el) => (cubesRef.current[i] = el)}
          geometry={c.geo}
          material={c.mat}
        />
      ))}
      <points geometry={cornerPoints.geo} material={cornerPoints.mat} />
    </group>
  )
}
