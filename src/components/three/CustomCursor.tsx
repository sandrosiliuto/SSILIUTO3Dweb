import { useEffect, useRef } from 'react';

const DOT_SIZE = 6;
const RING_SIZE = 36;
const RING_EXPAND = 52;
const TRAIL_MAX = 24;
const TRAIL_FADE = 0.06;
const LERP_SPEED = 0.12;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.style.cursor = 'none';
    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = trailRef.current;
    if (!dot || !ring || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let curX = window.innerWidth / 2;
    let curY = window.innerHeight / 2;
    let ringX = curX, ringY = curY;
    let isHover = false;
    let rafId = 0;
    const trail: { x: number; y: number; life: number }[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const onMove = (e: MouseEvent) => {
      curX = e.clientX;
      curY = e.clientY;
      if (trail.length < TRAIL_MAX) {
        trail.push({ x: curX, y: curY, life: 1.0 });
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).matches?.('a, button, [data-cursor], input, textarea, select')) {
        isHover = true;
      }
    };
    const onMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).matches?.('a, button, [data-cursor], input, textarea, select')) {
        isHover = false;
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    const animate = () => {
      // Dot follows instantly
      dot.style.transform = `translate(${curX - DOT_SIZE / 2}px, ${curY - DOT_SIZE / 2}px)`;
      dot.style.opacity = isHover ? '0' : '1';

      // Ring follows with lerp
      ringX += (curX - ringX) * LERP_SPEED;
      ringY += (curY - ringY) * LERP_SPEED;

      const rSize = isHover ? RING_EXPAND : RING_SIZE;
      ring.style.transform = `translate(${ringX - rSize / 2}px, ${ringY - rSize / 2}px)`;
      ring.style.width = `${rSize}px`;
      ring.style.height = `${rSize}px`;
      ring.style.borderColor = isHover ? '#FF006E' : 'rgba(0, 191, 255, 0.7)';
      ring.style.backgroundColor = isHover ? 'rgba(255,0,110,0.06)' : 'transparent';

      // Trail
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.life -= TRAIL_FADE;
        if (p.life <= 0) { trail.splice(i, 1); continue; }
        const radius = p.life * 3;
        const alpha = p.life * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 110, ${alpha})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.cursor = '';
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  const base: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 99999,
    willChange: 'transform',
  };

  return (
    <>
      <canvas ref={trailRef} style={{ ...base, inset: 0, zIndex: 99998 }} aria-hidden="true" />
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          ...base,
          top: 0, left: 0,
          width: `${DOT_SIZE}px`, height: `${DOT_SIZE}px`,
          borderRadius: '50%',
          backgroundColor: '#FF006E',
          boxShadow: '0 0 8px 2px #FF006E',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          ...base,
          top: 0, left: 0,
          width: `${RING_SIZE}px`, height: `${RING_SIZE}px`,
          borderRadius: '50%',
          border: '1px solid rgba(0, 191, 255, 0.7)',
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background-color 0.25s ease',
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
}
