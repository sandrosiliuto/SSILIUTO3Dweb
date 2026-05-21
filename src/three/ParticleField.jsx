// =============================================================
// ParticleField.jsx
// Subtle background particle field. Uses a single Points mesh
// with a custom shader for pixel-style glowing dots so the cost
// is one draw call.
// =============================================================
import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vert = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  attribute float aSize;
  attribute float aSeed;
  varying float vSeed;
  void main() {
    vec3 pos = position;
    pos.x += sin(uTime * 0.3 + aSeed * 6.28) * 0.1;
    pos.y += cos(uTime * 0.4 + aSeed * 6.28) * 0.1;
    pos.z += sin(uScroll * 6.28 + aSeed * 12.0) * 0.4;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (250.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
    vSeed = aSeed;
  }
`

const frag = /* glsl */ `
  precision mediump float;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vSeed;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    vec3 col = mix(uColorA, uColorB, vSeed);
    gl_FragColor = vec4(col, a * 0.55);
  }
`

export default function ParticleField({ count = 800, scrollRef }) {
  const ref = useRef()

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes     = new Float32Array(count)
    const seeds     = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      sizes[i] = 1.0 + Math.random() * 1.6
      seeds[i] = Math.random()
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSize',    new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('aSeed',    new THREE.BufferAttribute(seeds, 1))
    const mat = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime:   { value: 0 },
        uScroll: { value: 0 },
        uColorA: { value: new THREE.Color('#00bfff') },
        uColorB: { value: new THREE.Color('#ff007f') }
      }
    })
    return { geometry: geo, material: mat }
  }, [count])

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime
    material.uniforms.uScroll.value = scrollRef?.current?.progress || 0
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  React.useEffect(() => {
    return () => { geometry.dispose(); material.dispose() }
  }, [geometry, material])

  return <points ref={ref} geometry={geometry} material={material} />
}
