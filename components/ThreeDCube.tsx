'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

/**
 * Hook that tracks scroll progress (0..1) of the whole document
 * and exposes it as a mutable ref readable from inside useFrame
 * without triggering React re-renders.
 */
function useScrollProgress() {
  const ref = useRef(0);

  useEffect(() => {
    const update = () => {
      const max = Math.max(
        document.body.scrollHeight - window.innerHeight,
        1
      );
      const p = Math.min(Math.max(window.scrollY / max, 0), 1);
      ref.current = p;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return ref;
}

/**
 * Decorative orbital rings around the cube. Speed scales with scroll.
 */
function OrbitalRings({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const g1 = useRef<THREE.Mesh>(null);
  const g2 = useRef<THREE.Mesh>(null);
  const g3 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const s = scrollRef.current;
    const speed = 1 + s * 3;
    if (g1.current) {
      g1.current.rotation.x += delta * 0.5 * speed;
      g1.current.rotation.y += delta * 0.3 * speed;
    }
    if (g2.current) {
      g2.current.rotation.y += delta * 0.8 * speed;
      g2.current.rotation.z += delta * 0.4 * speed;
    }
    if (g3.current) {
      g3.current.rotation.x += delta * 0.6 * speed;
      g3.current.rotation.z += delta * 0.7 * speed;
    }
  });

  return (
    <group>
      <mesh ref={g1}>
        <torusGeometry args={[2.4, 0.018, 16, 120]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.55} />
      </mesh>
      <mesh ref={g2}>
        <torusGeometry args={[2.9, 0.014, 16, 120]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.45} />
      </mesh>
      <mesh ref={g3}>
        <torusGeometry args={[3.4, 0.01, 16, 120]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

/**
 * A field of particles that fades and rotates with scroll.
 */
function ParticleField({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const points = useRef<THREE.Points>(null);
  const COUNT = 220;

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i += 1) {
      // distribute in a sphere shell for nicer 3D feel
      const r = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!points.current) return;
    const s = scrollRef.current;
    points.current.rotation.y += delta * 0.05 * (1 + s);
    points.current.rotation.x += delta * 0.02;
    const mat = points.current.material as THREE.PointsMaterial;
    mat.opacity = 0.35 + s * 0.55;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#22d3ee"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * The hero element: a cube that, as the user scrolls, separates into
 * its 8 corner pieces (the "thinking out of the cube" idea) and shifts
 * color across the Becubo palette (cyan -> violet -> amber).
 *
 * Scroll segments (rough):
 *  0.00 - 0.25  : assembled cube, rotating
 *  0.25 - 0.55  : expand, corners drift outward (3 pillars)
 *  0.55 - 0.80  : reform into ring (cooperative)
 *  0.80 - 1.00  : final pulse / re-assembled
 */
function CubeAssembly({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const innerWire = useRef<THREE.Mesh>(null);
  const cornerRefs = useRef<(THREE.Mesh | null)[]>([]);

  // 8 cube corners
  const corners = useMemo(
    () =>
      [
        [1, 1, 1],
        [-1, 1, 1],
        [1, -1, 1],
        [-1, -1, 1],
        [1, 1, -1],
        [-1, 1, -1],
        [1, -1, -1],
        [-1, -1, -1],
      ] as [number, number, number][],
    []
  );

  // Pre-allocated THREE objects (avoid GC churn each frame)
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const tmpColor2 = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const s = scrollRef.current;

    // ---- Color shift -------------------------------------------------
    // Cycle hue across Becubo palette: cyan(0.5) -> violet(0.78) -> amber(0.13)
    const hue = (0.5 + s * 0.6) % 1;
    tmpColor.setHSL(hue, 0.85, 0.55);
    tmpColor2.setHSL((hue + 0.08) % 1, 0.7, 0.6);

    if (wire.current) {
      (wire.current.material as THREE.MeshBasicMaterial).color.copy(tmpColor);
    }
    if (innerWire.current) {
      (innerWire.current.material as THREE.MeshBasicMaterial).color.copy(tmpColor2);
    }

    // ---- Group rotation + scale -------------------------------------
    if (group.current) {
      group.current.rotation.y = t * 0.25 + s * Math.PI * 2;
      group.current.rotation.x = Math.sin(t * 0.3) * 0.18 + s * 0.4;
      const scale = 1 + s * 0.25;
      group.current.scale.setScalar(scale);
    }

    if (wire.current) {
      wire.current.rotation.x += 0.0035;
      wire.current.rotation.y += 0.0055;
      // Cube wireframe fades as the corners separate
      const opacity = THREE.MathUtils.lerp(1, 0.15, THREE.MathUtils.smoothstep(s, 0.2, 0.6));
      (wire.current.material as THREE.MeshBasicMaterial).opacity = opacity;
      (wire.current.material as THREE.MeshBasicMaterial).transparent = true;
    }

    if (innerWire.current) {
      innerWire.current.rotation.x -= 0.005;
      innerWire.current.rotation.y -= 0.0035;
    }

    // ---- Pulsing core ------------------------------------------------
    if (core.current) {
      const pulse = 1 + Math.sin(t * 4) * 0.18 + s * 0.4;
      core.current.scale.setScalar(pulse);
      (core.current.material as THREE.MeshBasicMaterial).color.copy(tmpColor);
    }

    // ---- Corner pieces: expand outward then re-cluster --------------
    // 0..0.5 : push outward up to distance 2.6
    // 0.5..0.8 : flatten onto an XY ring (cooperative)
    // 0.8..1.0 : converge back near the cube
    const expand = THREE.MathUtils.smoothstep(s, 0.2, 0.55) * 2.6;
    const ringMix = THREE.MathUtils.smoothstep(s, 0.55, 0.8);
    const collapse = THREE.MathUtils.smoothstep(s, 0.8, 1);

    cornerRefs.current.forEach((m, i) => {
      if (!m) return;
      const base = corners[i];
      // outward radial position
      const dir = new THREE.Vector3(base[0], base[1], base[2]).normalize();
      const outward = dir.clone().multiplyScalar(1 + expand);

      // ring position (flatten to xz plane, angle by index)
      const angle = (i / corners.length) * Math.PI * 2;
      const ringPos = new THREE.Vector3(
        Math.cos(angle) * 2.8,
        Math.sin(t * 0.6 + i) * 0.15,
        Math.sin(angle) * 2.8
      );

      // collapse target near origin
      const collapsePos = dir.clone().multiplyScalar(1.05);

      // lerp outward -> ringPos -> collapsePos
      const a = outward.clone().lerp(ringPos, ringMix);
      const b = a.lerp(collapsePos, collapse);

      m.position.copy(b);
      m.rotation.x = t * (0.4 + i * 0.05);
      m.rotation.y = t * (0.3 + i * 0.04);

      // corner color follows palette but offset per-corner
      const ch = (hue + i * 0.04) % 1;
      (m.material as THREE.MeshBasicMaterial).color.setHSL(ch, 0.85, 0.6);
    });
  });

  return (
    <group ref={group}>
      {/* Outer wireframe cube */}
      <mesh ref={wire}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="#22d3ee" wireframe />
      </mesh>

      {/* Inner shadow cube */}
      <mesh ref={innerWire}>
        <boxGeometry args={[1.55, 1.55, 1.55]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.18} wireframe />
      </mesh>

      {/* Pulsing core (icosahedron) */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.45, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe />
      </mesh>

      {/* 8 corner pieces that fly outward */}
      {corners.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => {
            cornerRefs.current[i] = el;
          }}
          position={pos}
        >
          <boxGeometry args={[0.22, 0.22, 0.22]} />
          <meshBasicMaterial color="#22d3ee" />
        </mesh>
      ))}

      {/* Subtle connecting lines from core to each corner */}
      {corners.map((pos, i) => {
        const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...pos)];
        const geom = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <primitive
            key={`line-${i}`}
            object={
              new THREE.Line(
                geom,
                new THREE.LineBasicMaterial({
                  color: '#22d3ee',
                  transparent: true,
                  opacity: 0.15,
                })
              )
            }
          />
        );
      })}
    </group>
  );
}

function Scene() {
  const scrollRef = useScrollProgress();

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -6, -10]} intensity={0.4} color="#a855f7" />

      <CubeAssembly scrollRef={scrollRef} />
      <OrbitalRings scrollRef={scrollRef} />
      <ParticleField scrollRef={scrollRef} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </>
  );
}

export default function ThreeDCube() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 w-full h-screen pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <div className="absolute inset-0 pointer-events-auto">
        <Canvas
          camera={{ position: [0, 0, 6.5], fov: 55 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Vignette overlay so the cube blends into the background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, rgba(5,6,10,0.55) 65%, #05060a 100%)',
        }}
      />
    </div>
  );
}
