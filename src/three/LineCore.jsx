// =============================================================
// LineCore.jsx
// "Núcleo Líneas Vivas" — A multi-layer line sculpture made
// purely of edges driven by GPU shaders for 60 fps rendering.
//
// Layers
//   1. Icosphere wireframe (LineSegments) deformed by a vertex
//      shader using mouse-pos, scroll-progress and 3D simplex
//      curl noise for organic motion.
//   2. Orbital rings (multiple LineLoops) tilted on different
//      axes; rotation speed bound to scroll velocity.
//   3. NET — long line segments connecting random points on a
//      sphere, fading by distance to mouse for a localised
//      "force-field" feel.
//
// Materials
//   - ShaderMaterial with additive blending so overlap glows.
//   - Per-vertex displacement keeps geometry static on CPU.
//   - Colour interpolation: cool grey → electric blue → magenta
//     based on mouse proximity & scroll zones.
//
// Cleanup
//   - All geometries / materials are disposed via R3F refs &
//     useEffect(return) – no memory leaks across HMR.
// =============================================================
import React, { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ---------- shared shader chunks ---------- */

// Classic 3D simplex-style noise (curl) — kept compact.
const NOISE_GLSL = /* glsl */ `
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m*m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`

/* ---------- shaders ---------- */

const coreVert = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uScrollVel;
  uniform vec3  uMouse;        // world-space mouse target
  uniform float uMouseStrength;
  varying float vEnergy;       // [0..1] hot signal for fragment
  varying float vMouseDist;
  ${NOISE_GLSL}

  void main() {
    vec3 pos = position;

    // 1. organic curl noise displacement
    float n1 = snoise(pos * 1.4 + vec3(uTime * 0.18, 0.0, 0.0));
    float n2 = snoise(pos * 2.8 + vec3(0.0, uTime * 0.22, 0.0));
    vec3 displaced = pos + normal * (n1 * 0.18 + n2 * 0.05);

    // 2. localised mouse "force-field": vertices closer to mouse
    // are pushed outward.
    float md = distance(displaced, uMouse);
    vMouseDist = md;
    float falloff = smoothstep(1.4, 0.0, md);
    displaced += normal * falloff * uMouseStrength;

    // 3. scroll choreography: pulse the radius
    float pulse = sin(uScroll * 6.2831 * 1.5 + uTime * 0.6) * 0.05;
    displaced += normal * pulse;

    // energy combines noise & proximity to mouse / scroll velocity
    vEnergy = clamp(falloff * 1.4 + abs(uScrollVel) * 0.6 + n2 * 0.4, 0.0, 1.0);

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const coreFrag = /* glsl */ `
  precision mediump float;
  uniform vec3 uColorCool;
  uniform vec3 uColorBlue;
  uniform vec3 uColorPink;
  uniform float uOpacity;
  varying float vEnergy;
  varying float vMouseDist;

  void main() {
    // Blend cool grey -> electric blue based on baseline energy,
    // then push toward magenta where energy is high (hover/scroll burst)
    vec3 base = mix(uColorCool, uColorBlue, smoothstep(0.0, 0.6, vEnergy));
    vec3 hot  = mix(base, uColorPink, smoothstep(0.55, 1.0, vEnergy));

    // soft halo around mouse
    float halo = smoothstep(1.2, 0.0, vMouseDist) * 0.8;
    hot += uColorPink * halo * 0.35;

    float alpha = uOpacity * (0.55 + vEnergy * 0.6);
    gl_FragColor = vec4(hot, alpha);
  }
`

const netVert = /* glsl */ `
  uniform float uTime;
  uniform vec3  uMouse;
  varying float vDist;
  varying float vAlpha;
  void main() {
    vec3 pos = position;
    // gentle wobble
    pos.x += sin(uTime * 0.6 + position.y * 2.0) * 0.05;
    pos.y += cos(uTime * 0.5 + position.z * 2.0) * 0.05;
    vDist = distance(pos, uMouse);
    vAlpha = smoothstep(2.4, 0.0, vDist);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const netFrag = /* glsl */ `
  precision mediump float;
  uniform vec3 uColorBlue;
  uniform vec3 uColorPink;
  varying float vAlpha;
  varying float vDist;
  void main() {
    vec3 col = mix(uColorBlue, uColorPink, smoothstep(1.6, 0.0, vDist));
    gl_FragColor = vec4(col, 0.18 + vAlpha * 0.55);
  }
`

/* ---------- helpers ---------- */

// Build a deduplicated edge list from any indexed BufferGeometry.
function buildEdgeIndex(geo) {
  const idx = geo.index ? geo.index.array : null
  const set = new Set()
  const out = []
  if (!idx) return out
  const push = (a, b) => {
    const k = a < b ? `${a}_${b}` : `${b}_${a}`
    if (set.has(k)) return
    set.add(k)
    out.push(a, b)
  }
  for (let i = 0; i < idx.length; i += 3) {
    const a = idx[i], b = idx[i + 1], c = idx[i + 2]
    push(a, b); push(b, c); push(c, a)
  }
  return out
}

// Build line segments connecting nearest neighbours on a sphere.
function buildNetGeometry(count = 80, radius = 1.6, neighbours = 3) {
  const positions = []
  const points = []
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = 2 * Math.PI * Math.random()
    const r = radius * (0.85 + Math.random() * 0.3)
    points.push(new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    ))
  }
  for (let i = 0; i < points.length; i++) {
    const dists = points
      .map((p, j) => ({ j, d: i === j ? Infinity : p.distanceTo(points[i]) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, neighbours)
    for (const { j } of dists) {
      positions.push(points[i].x, points[i].y, points[i].z)
      positions.push(points[j].x, points[j].y, points[j].z)
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  return g
}

/* ---------- component ---------- */

const COLORS = {
  cool: new THREE.Color('#b0b0b0'),
  blue: new THREE.Color('#00bfff'),
  pink: new THREE.Color('#ff007f')
}

export default function LineCore({ mouseRef, scrollRef }) {
  const groupRef = useRef()
  const coreLinesRef = useRef()
  const ringsRef = useRef([])
  const netRef = useRef()
  const { size } = useThree()

  /* --- Layer 1: icosphere wireframe (built once) --- */
  const coreData = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(1.05, 4)
    const edges = buildEdgeIndex(ico)
    const positions = ico.attributes.position
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', positions.clone())
    lineGeo.setAttribute('normal', ico.attributes.normal.clone())
    lineGeo.setIndex(edges)
    ico.dispose()
    const mat = new THREE.ShaderMaterial({
      vertexShader: coreVert,
      fragmentShader: coreFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime:           { value: 0 },
        uScroll:         { value: 0 },
        uScrollVel:      { value: 0 },
        uMouse:          { value: new THREE.Vector3(0, 0, 0) },
        uMouseStrength:  { value: 0.18 },
        uOpacity:        { value: 0.95 },
        uColorCool:      { value: COLORS.cool },
        uColorBlue:      { value: COLORS.blue },
        uColorPink:      { value: COLORS.pink }
      }
    })
    return { geo: lineGeo, mat }
  }, [])

  /* --- Layer 2: orbital rings (3 of them) --- */
  const rings = useMemo(() => {
    const data = []
    const tilts = [
      new THREE.Euler(0, 0, 0),
      new THREE.Euler(Math.PI / 2.2, 0.4, 0),
      new THREE.Euler(0.6, Math.PI / 3, 0.2)
    ]
    const radii = [1.45, 1.7, 2.0]
    for (let i = 0; i < 3; i++) {
      const segments = 256
      const positions = new Float32Array((segments + 1) * 3)
      for (let s = 0; s <= segments; s++) {
        const t = (s / segments) * Math.PI * 2
        positions[s * 3 + 0] = Math.cos(t) * radii[i]
        positions[s * 3 + 1] = Math.sin(t) * radii[i]
        positions[s * 3 + 2] = 0
      }
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const m = new THREE.LineBasicMaterial({
        color: i === 1 ? COLORS.blue : COLORS.cool,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
      data.push({ geo: g, mat: m, tilt: tilts[i], speed: 0.06 + i * 0.04 })
    }
    return data
  }, [])

  /* --- Layer 3: NET (random points connected to neighbours) --- */
  const netData = useMemo(() => {
    const geo = buildNetGeometry(70, 1.85, 3)
    const mat = new THREE.ShaderMaterial({
      vertexShader: netVert,
      fragmentShader: netFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime:      { value: 0 },
        uMouse:     { value: new THREE.Vector3() },
        uColorBlue: { value: COLORS.blue },
        uColorPink: { value: COLORS.pink }
      }
    })
    return { geo, mat }
  }, [])

  /* --- per-frame update --- */
  // Damped mouse target in world space
  const mouseTarget = useRef(new THREE.Vector3())
  const dampedMouse = useRef(new THREE.Vector3())

  useFrame((state, delta) => {
    // Cap delta to avoid huge jumps when tab regains focus
    const dt = Math.min(delta, 0.05)
    const t  = state.clock.elapsedTime

    // Convert pointer to a soft world-space anchor on the front
    // hemisphere of the sphere — gives the impression of poking
    // the surface from the camera side.
    const m = mouseRef?.current
    if (m) {
      mouseTarget.current.set(m.nx * 1.6, m.ny * 1.0, 1.1)
      dampedMouse.current.lerp(mouseTarget.current, 0.08)
    }

    const scroll = scrollRef?.current?.progress || 0
    const scrollVel = scrollRef?.current?.velocity || 0

    /* ---- core wireframe ---- */
    const u = coreData.mat.uniforms
    u.uTime.value       = t
    u.uScroll.value     = scroll
    u.uScrollVel.value  = scrollVel
    u.uMouse.value.copy(dampedMouse.current)

    /* ---- group transform (camera orbit driven by scroll) ---- */
    if (groupRef.current) {
      // Continuous slow rotation + scroll-driven orbit
      groupRef.current.rotation.y += dt * (0.08 + Math.abs(scrollVel) * 0.4)
      groupRef.current.rotation.x =
        Math.sin(scroll * Math.PI * 2) * 0.35 +
        (mouseRef?.current?.ny || 0) * 0.12
      // Subtle parallax on z
      groupRef.current.position.z = Math.cos(scroll * Math.PI * 2) * 0.4
      // Scale grows slightly with scroll progress for the climax
      const targetScale = 1 + Math.sin(scroll * Math.PI) * 0.18
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.05
      )
    }

    /* ---- rings ---- */
    ringsRef.current.forEach((r, i) => {
      if (!r) return
      r.rotation.x = rings[i].tilt.x + t * rings[i].speed * 0.3
      r.rotation.y = rings[i].tilt.y + t * rings[i].speed
      r.rotation.z = rings[i].tilt.z + scroll * Math.PI * 2 * 0.25
    })

    /* ---- net ---- */
    netData.mat.uniforms.uTime.value = t
    netData.mat.uniforms.uMouse.value.copy(dampedMouse.current)
    if (netRef.current) {
      netRef.current.rotation.y = -t * 0.05
    }
  })

  /* --- Cleanup all GPU resources on unmount (HMR-safe) --- */
  React.useEffect(() => {
    return () => {
      coreData.geo.dispose()
      coreData.mat.dispose()
      rings.forEach((r) => { r.geo.dispose(); r.mat.dispose() })
      netData.geo.dispose()
      netData.mat.dispose()
    }
  }, [coreData, rings, netData])

  // Slight scaling for narrow screens so the sculpture stays in frame.
  const groupScale = size.width < 768 ? 0.78 : 1.0

  return (
    <group ref={groupRef} scale={groupScale}>
      {/* Layer 1: deformed icosphere wireframe */}
      <lineSegments
        ref={coreLinesRef}
        geometry={coreData.geo}
        material={coreData.mat}
      />

      {/* Layer 2: orbital rings */}
      {rings.map((r, i) => (
        <line
          key={i}
          ref={(el) => (ringsRef.current[i] = el)}
          geometry={r.geo}
          material={r.mat}
        />
      ))}

      {/* Layer 3: NET connections */}
      <lineSegments
        ref={netRef}
        geometry={netData.geo}
        material={netData.mat}
      />
    </group>
  )
}
