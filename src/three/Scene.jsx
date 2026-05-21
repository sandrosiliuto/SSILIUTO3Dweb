// =============================================================
// Scene.jsx
// R3F Canvas wrapper.  Orchestrates the camera, lighting (none
// needed since materials are emissive), the LineCore, the
// ParticleField and the post-processing stack (Bloom + film).
// Mounted as a fixed full-viewport canvas behind the page.
// =============================================================
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction, KernelSize } from 'postprocessing'
import LineCore from './LineCore.jsx'
import CubeStructure from './CubeStructure.jsx'
import ParticleField from './ParticleField.jsx'

export default function Scene({ mouseRef, scrollRef }) {
  return (
    <Canvas
      className="scene-canvas"
      dpr={[1, 1.6]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true
      }}
      // Cap pixel ratio adaptively for low-end devices
      performance={{ min: 0.5 }}
    >
      <color attach="background" args={[0x05060a]} />
      <fog attach="fog" args={[0x05060a, 5, 14]} />

      <PerspectiveCamera
        makeDefault
        fov={45}
        position={[0, 0, 4.6]}
        near={0.1}
        far={50}
      />

      <Suspense fallback={null}>
        {/* Estructura cúbica wireframe BeCube-style en primer plano */}
        <CubeStructure mouseRef={mouseRef} scrollRef={scrollRef} />
        {/* Núcleo orgánico de líneas (icosaedro + anillos + NET) */}
        <LineCore mouseRef={mouseRef} scrollRef={scrollRef} />
        <ParticleField count={650} scrollRef={scrollRef} />
        <Preload all />
      </Suspense>

      <EffectComposer multisampling={0} disableNormalPass>
        <Bloom
          intensity={0.95}
          luminanceThreshold={0.18}
          luminanceSmoothing={0.6}
          kernelSize={KernelSize.LARGE}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0006, 0.0009]}
        />
        <Vignette eskil={false} offset={0.3} darkness={0.85} />
      </EffectComposer>

      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  )
}
