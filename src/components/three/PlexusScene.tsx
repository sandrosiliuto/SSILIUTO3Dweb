import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Color palette matching ssiliutodesign-web
const C_BLUE = new THREE.Color('#00BFFF');
const C_GRAY = new THREE.Color('#3a3a4a');
const C_PINK = new THREE.Color('#FF006E');

const MAX_SEGMENTS = 5000;
const SPREAD_X = 12;
const SPREAD_Y = 8;
const SPREAD_Z = 7;

// Reusable temp objects (zero GC pressure)
const _tmpVec = new THREE.Vector3();
const _raycaster = new THREE.Raycaster();
const _plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const _mouseWorld = new THREE.Vector3();

// Point shaders for glowing nodes
const VERT_POINTS = `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  void main() {
    vColor = aColor;
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (350.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const FRAG_POINTS = `
  varying vec3 vColor;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv) * 2.0;
    float core = 1.0 - smoothstep(0.0, 0.45, r);
    float halo = 1.0 - smoothstep(0.45, 1.0, r);
    float a = core * 0.9 + halo * 0.2;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor * (1.0 + core * 0.5), a);
  }
`;

interface PlexusSceneProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  scrollRef: React.MutableRefObject<number>;
  numPoints?: number;
  connectionDist?: number;
  mouseRadius?: number;
}

export default function PlexusScene({
  mouseRef,
  scrollRef,
  numPoints = 70,
  connectionDist = 3.5,
  mouseRadius = 4.0,
}: PlexusSceneProps) {
  const { camera } = useThree();

  // Initialize nodes
  const nodes = useMemo(() => {
    return Array.from({ length: numPoints }, () => {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * SPREAD_X * 2,
        (Math.random() - 0.5) * SPREAD_Y * 2,
        (Math.random() - 0.5) * SPREAD_Z * 2
      );
      return {
        pos,
        origPos: pos.clone(),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.005
        ),
        energy: 0,
        colorType: Math.random() < 0.25 ? 1 : 0, // 25% pink, 75% blue
        baseSize: 1.5 + Math.random() * 2.5,
      };
    });
  }, [numPoints]);

  // Line geometry (pre-allocated)
  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MAX_SEGMENTS * 6), 3));
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(MAX_SEGMENTS * 6), 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, []);

  const lineMat = useMemo(
    () => new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
    []
  );

  // Point geometry
  const { pointGeo, pointMat } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(numPoints * 3);
    const colors = new Float32Array(numPoints * 3);
    const sizes = new Float32Array(numPoints);

    nodes.forEach((n, i) => {
      positions[i * 3] = n.pos.x;
      positions[i * 3 + 1] = n.pos.y;
      positions[i * 3 + 2] = n.pos.z;
      const c = n.colorType === 1 ? C_PINK : C_BLUE;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = n.baseSize;
    });

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT_POINTS,
      fragmentShader: FRAG_POINTS,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { pointGeo: geo, pointMat: mat };
  }, [nodes, numPoints]);

  // Cleanup
  useEffect(() => {
    return () => {
      lineGeo.dispose();
      lineMat.dispose();
      pointGeo.dispose();
      pointMat.dispose();
    };
  }, [lineGeo, lineMat, pointGeo, pointMat]);

  // Animation loop
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scroll = scrollRef.current;
    const mouse = mouseRef.current;

    // Project mouse to world z=0 plane
    _raycaster.setFromCamera({ x: mouse.x, y: mouse.y }, camera);
    const hit = _raycaster.ray.intersectPlane(_plane, _mouseWorld);
    if (!hit) _mouseWorld.set(0, 0, 0);

    // Update nodes
    const pPos = pointGeo.attributes.position.array as Float32Array;
    const pCol = pointGeo.attributes.aColor.array as Float32Array;
    const pSiz = pointGeo.attributes.aSize.array as Float32Array;

    nodes.forEach((n, i) => {
      // Drift
      n.pos.add(n.vel);

      // Boundary bounce
      if (Math.abs(n.pos.x) > SPREAD_X + 2) n.vel.x *= -1;
      if (Math.abs(n.pos.y) > SPREAD_Y + 2) n.vel.y *= -1;
      if (Math.abs(n.pos.z) > SPREAD_Z + 2) n.vel.z *= -1;

      // Mouse energy
      const distMouse = n.pos.distanceTo(_mouseWorld);
      const targetEnergy = Math.max(0, 1 - distMouse / mouseRadius);
      n.energy += (targetEnergy - n.energy) * 0.06;

      // Mouse repulsion
      if (distMouse < mouseRadius && distMouse > 0.01) {
        const force = (1 - distMouse / mouseRadius) * 0.02;
        _tmpVec.copy(n.pos).sub(_mouseWorld).normalize().multiplyScalar(force);
        n.pos.add(_tmpVec);
      }

      // Breathing
      const breath = Math.sin(time * 0.5 + i * 0.4) * 0.01;
      n.pos.y += breath;

      // Update buffers
      pPos[i * 3] = n.pos.x;
      pPos[i * 3 + 1] = n.pos.y;
      pPos[i * 3 + 2] = n.pos.z;

      // Color: energized -> brighter + pink tint
      const base = n.colorType === 1 ? C_PINK : C_BLUE;
      const bright = 1 + n.energy * 0.8;
      pCol[i * 3] = base.r * bright;
      pCol[i * 3 + 1] = base.g * bright;
      pCol[i * 3 + 2] = base.b * bright;

      // Size grows with energy
      pSiz[i] = n.baseSize * (1 + n.energy * 2.0);
    });

    pointGeo.attributes.position.needsUpdate = true;
    pointGeo.attributes.aColor.needsUpdate = true;
    pointGeo.attributes.aSize.needsUpdate = true;

    // Build line segments
    const lPos = lineGeo.attributes.position.array as Float32Array;
    const lCol = lineGeo.attributes.color.array as Float32Array;
    let segCount = 0;

    for (let i = 0; i < nodes.length && segCount < MAX_SEGMENTS - 1; i++) {
      for (let j = i + 1; j < nodes.length && segCount < MAX_SEGMENTS - 1; j++) {
        const dist = nodes[i].pos.distanceTo(nodes[j].pos);
        if (dist >= connectionDist) continue;

        const distAlpha = 1 - dist / connectionDist;
        const energy = Math.max(nodes[i].energy, nodes[j].energy);
        const base = (nodes[i].colorType === 1 || nodes[j].colorType === 1) ? C_PINK : C_BLUE;

        const r = (base.r + (C_PINK.r - base.r) * energy * 0.5) * distAlpha;
        const g = (base.g + (C_PINK.g - base.g) * energy * 0.5) * distAlpha;
        const b = (base.b + (C_PINK.b - base.b) * energy * 0.5) * distAlpha;

        const idx = segCount * 6;
        lPos[idx] = nodes[i].pos.x; lPos[idx + 1] = nodes[i].pos.y; lPos[idx + 2] = nodes[i].pos.z;
        lPos[idx + 3] = nodes[j].pos.x; lPos[idx + 4] = nodes[j].pos.y; lPos[idx + 5] = nodes[j].pos.z;
        lCol[idx] = r; lCol[idx + 1] = g; lCol[idx + 2] = b;
        lCol[idx + 3] = r; lCol[idx + 4] = g; lCol[idx + 5] = b;

        segCount++;
      }
    }

    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;
    lineGeo.setDrawRange(0, segCount * 2);

    // Camera choreography based on scroll
    const camX = Math.sin(scroll * Math.PI * 1.2) * 3 + Math.sin(time * 0.06) * 0.3;
    const camY = Math.cos(scroll * Math.PI * 0.6) * 1.5 + Math.sin(time * 0.04) * 0.2;
    const camZ = Math.max(7, 13 - scroll * 4);

    camera.position.lerp(_tmpVec.set(camX, camY, camZ), 0.018);
    camera.lookAt(0, scroll * 1.2 - 0.6, 0);
    camera.updateMatrixWorld();
  });

  return (
    <group>
      <lineSegments geometry={lineGeo} material={lineMat} />
      <points geometry={pointGeo} material={pointMat} />
    </group>
  );
}
