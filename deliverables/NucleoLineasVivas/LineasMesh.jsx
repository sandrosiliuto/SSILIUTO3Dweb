/**
 * LineasMesh.jsx
 * -------------
 * Núcleo visual del efecto "Líneas Vivas":
 *  - Red de N puntos flotantes interconectados por segmentos de línea
 *  - Cada punto deriva suavemente en el espacio 3D
 *  - El ratón proyecta una "fuerza de campo" que energiza los nodos cercanos
 *  - Las líneas y nodos energizados transicionan de gris/azul → fucsia (#FF007F)
 *  - La cámara orbita coreografiada por el progreso del scroll
 *
 * Todas las operaciones están optimizadas para 60 fps:
 *  - Buffers pre-asignados (sin GC por frame)
 *  - Temp-objects reutilizados (THREE.Vector3 alloc única)
 *  - O(n²) con n ≤ 90 → ~4000 comprobaciones/frame (< 1 ms)
 */

import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ── Paleta de color ──────────────────────────────────────────────────────────
const C_GRAY = new THREE.Color('#B0B0B0')   // Línea base — gris frío
const C_BLUE = new THREE.Color('#00BFFF')   // Acento azul tecnológico
const C_PINK = new THREE.Color('#FF007F')   // Energía / interacción

// ── Constantes de geometría ──────────────────────────────────────────────────
const MAX_SEGMENTS = 6000   // Máx. segmentos de línea pre-asignados
const SPREAD_X     = 10     // Semiancho del volumen de distribución
const SPREAD_Y     = 6
const SPREAD_Z     = 5

// ── Objetos temporales reutilizables (evitan allocaciones en useFrame) ───────
const _tmpVec      = new THREE.Vector3()
const _raycaster   = new THREE.Raycaster()
const _interPlane  = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
const _mouseWorld  = new THREE.Vector3()

// ── Shaders para los nodos (puntos redondos auto-luminosos) ─────────────────
const VERT_POINTS = /* glsl */`
  attribute float aSize;
  attribute vec3  aColor;
  varying   vec3  vColor;

  void main() {
    vColor = aColor;
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    // Atenuación de tamaño por distancia + boost cuando energizado
    gl_PointSize  = aSize * (380.0 / -mvPos.z);
    gl_Position   = projectionMatrix * mvPos;
  }
`

const FRAG_POINTS = /* glsl */`
  varying vec3 vColor;

  void main() {
    // Círculo suave con halo exterior
    vec2  uv   = gl_PointCoord - 0.5;
    float r    = length(uv) * 2.0;
    float core = 1.0 - smoothstep(0.0, 0.5, r);
    float halo = 1.0 - smoothstep(0.5, 1.0, r);
    float a    = core * 0.95 + halo * 0.25;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor * (1.0 + core * 0.6), a);
  }
`

// ────────────────────────────────────────────────────────────────────────────
export default function LineasMesh({
  mouseRef,
  scrollRef,
  numPoints        = 80,
  connectionDist   = 3.2,
  mouseRadius      = 3.8,
}) {
  const { camera } = useThree()

  // ── 1. Inicializar nodos ──────────────────────────────────────────────────
  const nodes = useMemo(() => {
    return Array.from({ length: numPoints }, () => {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * SPREAD_X * 2,
        (Math.random() - 0.5) * SPREAD_Y * 2,
        (Math.random() - 0.5) * SPREAD_Z * 2,
      )
      return {
        pos,
        origPos  : pos.clone(),
        vel      : new THREE.Vector3(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.004,
        ),
        energy   : 0,
        // 30 % azul, 70 % gris — distribución aleatoria
        colorType: Math.random() < 0.30 ? 1 : 0,
        baseSize : 1.8 + Math.random() * 2.4,
      }
    })
  }, [numPoints])

  // ── 2. Geometría de LÍNEAS (pre-asignada, mutable en useFrame) ────────────
  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(MAX_SEGMENTS * 2 * 3), 3),
    )
    geo.setAttribute(
      'color',
      new THREE.BufferAttribute(new Float32Array(MAX_SEGMENTS * 2 * 3), 3),
    )
    geo.setDrawRange(0, 0)
    return geo
  }, [])

  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors : true,
        transparent  : true,
        opacity      : 0.9,
        depthWrite   : false,
        blending     : THREE.AdditiveBlending,
      }),
    [],
  )

  // ── 3. Geometría de NODOS (puntos luminosos) ──────────────────────────────
  const { pointGeo, pointMat } = useMemo(() => {
    const geo      = new THREE.BufferGeometry()
    const positions = new Float32Array(numPoints * 3)
    const colors    = new Float32Array(numPoints * 3)
    const sizes     = new Float32Array(numPoints)

    nodes.forEach((n, i) => {
      positions[i * 3]     = n.pos.x
      positions[i * 3 + 1] = n.pos.y
      positions[i * 3 + 2] = n.pos.z

      const c = n.colorType === 1 ? C_BLUE : C_GRAY
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      sizes[i] = n.baseSize
    })

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aColor',   new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('aSize',    new THREE.BufferAttribute(sizes, 1))

    const mat = new THREE.ShaderMaterial({
      vertexShader  : VERT_POINTS,
      fragmentShader: FRAG_POINTS,
      transparent   : true,
      depthWrite    : false,
      blending      : THREE.AdditiveBlending,
    })

    return { pointGeo: geo, pointMat: mat }
  }, [nodes, numPoints])

  // ── 4. Cleanup (evitar memory leaks de WebGL) ────────────────────────────
  useEffect(() => {
    return () => {
      lineGeo.dispose()
      lineMat.dispose()
      pointGeo.dispose()
      pointMat.dispose()
    }
  }, [lineGeo, lineMat, pointGeo, pointMat])

  // ── 5. Loop de animación ──────────────────────────────────────────────────
  useFrame((state) => {
    const time   = state.clock.elapsedTime
    const scroll = scrollRef.current       // 0 → 1
    const mouse  = mouseRef.current        // { x: -1..1, y: -1..1 }

    // ── Proyectar cursor al plano z=0 en espacio mundo ──────────────────────
    _raycaster.setFromCamera({ x: mouse.x, y: mouse.y }, camera)
    const hit = _raycaster.ray.intersectPlane(_interPlane, _mouseWorld)
    if (!hit) _mouseWorld.set(0, 0, 0)

    // ── Actualizar nodos ────────────────────────────────────────────────────
    const pPos = pointGeo.attributes.position.array
    const pCol = pointGeo.attributes.aColor.array
    const pSiz = pointGeo.attributes.aSize.array

    nodes.forEach((n, i) => {
      // Deriva suave
      n.pos.add(n.vel)

      // Rebote en fronteras (el volumen es dinámico por scroll)
      if (Math.abs(n.pos.x) > SPREAD_X + 1) n.vel.x *= -1
      if (Math.abs(n.pos.y) > SPREAD_Y + 1) n.vel.y *= -1
      if (Math.abs(n.pos.z) > SPREAD_Z + 1) n.vel.z *= -1

      // Energía del ratón — lerp suave para evitar parpadeos
      const distMouse   = n.pos.distanceTo(_mouseWorld)
      const targetEnergy = Math.max(0, 1 - distMouse / mouseRadius)
      n.energy += (targetEnergy - n.energy) * 0.07

      // Repulsión suave del ratón
      if (distMouse < mouseRadius && distMouse > 0.01) {
        const force = (1 - distMouse / mouseRadius) * 0.018
        _tmpVec.copy(n.pos).sub(_mouseWorld).normalize().multiplyScalar(force)
        n.pos.add(_tmpVec)
      }

      // Respiración sutil (ondas de tiempo desfasadas)
      const breath = Math.sin(time * 0.6 + i * 0.43) * 0.012
      n.pos.y += breath

      // Escribir posición actualizada al buffer
      pPos[i * 3]     = n.pos.x
      pPos[i * 3 + 1] = n.pos.y
      pPos[i * 3 + 2] = n.pos.z

      // Interpolación de color base → fucsia según energía
      const base = n.colorType === 1 ? C_BLUE : C_GRAY
      pCol[i * 3]     = base.r + (C_PINK.r - base.r) * n.energy
      pCol[i * 3 + 1] = base.g + (C_PINK.g - base.g) * n.energy
      pCol[i * 3 + 2] = base.b + (C_PINK.b - base.b) * n.energy

      // Tamaño crece al energizarse
      pSiz[i] = n.baseSize * (1 + n.energy * 2.5)
    })

    pointGeo.attributes.position.needsUpdate = true
    pointGeo.attributes.aColor.needsUpdate   = true
    pointGeo.attributes.aSize.needsUpdate    = true

    // ── Construir segmentos de línea ────────────────────────────────────────
    const lPos = lineGeo.attributes.position.array
    const lCol = lineGeo.attributes.color.array
    let   segCount = 0

    for (let i = 0; i < nodes.length && segCount < MAX_SEGMENTS - 1; i++) {
      for (let j = i + 1; j < nodes.length && segCount < MAX_SEGMENTS - 1; j++) {
        const dist = nodes[i].pos.distanceTo(nodes[j].pos)
        if (dist >= connectionDist) continue

        // Alpha por distancia (más lejos = más tenue)
        const distAlpha = 1 - dist / connectionDist
        // Energía compartida (máxima de los dos extremos)
        const energy = Math.max(nodes[i].energy, nodes[j].energy)
        // Color base: si alguno de los dos es azul, la línea es azul
        const base = (nodes[i].colorType === 1 || nodes[j].colorType === 1)
          ? C_BLUE : C_GRAY

        const r = (base.r + (C_PINK.r - base.r) * energy) * distAlpha
        const g = (base.g + (C_PINK.g - base.g) * energy) * distAlpha
        const b = (base.b + (C_PINK.b - base.b) * energy) * distAlpha

        const idx = segCount * 6
        lPos[idx]     = nodes[i].pos.x;  lPos[idx + 1] = nodes[i].pos.y;  lPos[idx + 2] = nodes[i].pos.z
        lPos[idx + 3] = nodes[j].pos.x;  lPos[idx + 4] = nodes[j].pos.y;  lPos[idx + 5] = nodes[j].pos.z
        lCol[idx]     = r; lCol[idx + 1] = g; lCol[idx + 2] = b
        lCol[idx + 3] = r; lCol[idx + 4] = g; lCol[idx + 5] = b

        segCount++
      }
    }

    lineGeo.attributes.position.needsUpdate = true
    lineGeo.attributes.color.needsUpdate    = true
    lineGeo.setDrawRange(0, segCount * 2)

    // ── Coreografía de cámara dirigida por scroll ───────────────────────────
    // El progreso 0→1 produce una órbita completa con zoom variable
    const camX = Math.sin(scroll * Math.PI * 1.6) * 4.5 + Math.sin(time * 0.08) * 0.4
    const camY = Math.cos(scroll * Math.PI * 1.0) * 2.5 + Math.sin(time * 0.06) * 0.3
    const camZ = Math.max(5.5, 11 - scroll * 5)

    // Lerp suave para evitar saltos bruscos
    camera.position.lerp(_tmpVec.set(camX, camY, camZ), 0.022)

    // El lookAt apunta ligeramente hacia abajo conforme avanza el scroll
    camera.lookAt(0, scroll * 1.8 - 0.9, 0)
    camera.updateMatrixWorld()
  })

  return (
    <group>
      {/* Segmentos de línea interconectados */}
      <lineSegments geometry={lineGeo} material={lineMat} />
      {/* Nodos luminosos sobre las líneas */}
      <points geometry={pointGeo} material={pointMat} />
    </group>
  )
}
