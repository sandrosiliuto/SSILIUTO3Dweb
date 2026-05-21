import { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PlexusScene from './PlexusScene';

gsap.registerPlugin(ScrollTrigger);

export default function Background3D() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  // Track mouse in NDC
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      mouseRef.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  // GSAP ScrollTrigger for scroll progress
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          scrollRef.current = self.progress;
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: '#070708' }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 13], fov: 50, near: 0.1, far: 100 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        style={{ width: '100%', height: '100%' }}
        onCreated={({ gl }) => {
          gl.setClearColor('#070708', 1);
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.02} />
          <PlexusScene mouseRef={mouseRef} scrollRef={scrollRef} />
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={1.3}
              kernelSize={KernelSize.LARGE}
              luminanceThreshold={0.12}
              luminanceSmoothing={0.8}
              blendFunction={BlendFunction.ADD}
            />
            <Vignette darkness={0.6} offset={0.1} blendFunction={BlendFunction.NORMAL} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
