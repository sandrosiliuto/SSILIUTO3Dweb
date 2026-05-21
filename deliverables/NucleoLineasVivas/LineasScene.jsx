/**
 * LineasScene.jsx
 * ---------------
 * Escena React Three Fiber completa:
 *  - Iluminación mínima (el efecto neón es auto-luminoso via AdditiveBlending)
 *  - LineasMesh: la red dinámica
 *  - EffectComposer: Bloom real + Viñeta para el acabado "tech noir"
 *
 * Requiere: npm install @react-three/postprocessing
 * Si no se dispone del paquete, establece `withBloom={false}` en <NucleoLineasVivas />
 */

import { Suspense } from 'react'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { BlendFunction, KernelSize } from 'postprocessing'
import LineasMesh from './LineasMesh'

export default function LineasScene({
  mouseRef,
  scrollRef,
  numPoints,
  connectionDist,
  mouseRadius,
  bloomIntensity = 1.4,
  withBloom      = true,
}) {
  return (
    <>
      {/*
       * Luz ambiente extremadamente tenue.
       * La mayor parte del brillo proviene del AdditiveBlending en los materiales,
       * que simula emisión sin depender de iluminación.
       */}
      <ambientLight intensity={0.04} />

      {/* La red 3D principal */}
      <LineasMesh
        mouseRef={mouseRef}
        scrollRef={scrollRef}
        numPoints={numPoints}
        connectionDist={connectionDist}
        mouseRadius={mouseRadius}
      />

      {/*
       * Post-procesado: Bloom + Vignette
       * Bloom: resalta los elementos más brillantes → efecto neón real
       * Vignette: oscurece los bordes para focalizar la atención en el centro
       */}
      {withBloom && (
        <Suspense fallback={null}>
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={bloomIntensity}
              kernelSize={KernelSize.LARGE}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.85}
              blendFunction={BlendFunction.ADD}
            />
            <Vignette
              darkness={0.55}
              offset={0.08}
              blendFunction={BlendFunction.NORMAL}
            />
          </EffectComposer>
        </Suspense>
      )}
    </>
  )
}
