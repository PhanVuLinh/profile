import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../context/ThemeContext';
import { useQuality } from '../../context/QualityContext';
import { EFFECTS_CONFIG } from '../../config/effects';

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

interface BurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

export const CursorEffects: React.FC = () => {
  const { theme } = useTheme();
  const { tier } = useQuality();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Disable on touch devices or when tier is off
    if (
      tier === 'off' ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = theme === 'dark';
    const primaryColor = isDark ? '#C8FF2E' : '#059669';
    const secondaryColor = isDark ? '#5CE1E6' : '#0D9488';

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const trailPoints: TrailPoint[] = [];
    const shockwaves: Shockwave[] = [];
    const burstParticles: BurstParticle[] = [];

    let lastX = -100;
    let lastY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      if (!EFFECTS_CONFIG.flags.cursorTrail) return;

      const currentX = e.clientX;
      const currentY = e.clientY;

      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      lastX = currentX;
      lastY = currentY;

      // Spawn trail particle proportional to mouse velocity
      trailPoints.push({
        x: currentX,
        y: currentY,
        alpha: Math.min(0.8, 0.3 + speed * 0.02),
        size: Math.min(5, 2 + speed * 0.08),
      });

      if (trailPoints.length > 24) {
        trailPoints.shift();
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!EFFECTS_CONFIG.flags.clickBurst) return;

      const x = e.clientX;
      const y = e.clientY;

      // 1. Shockwave Ripple
      shockwaves.push({
        x,
        y,
        radius: 4,
        maxRadius: 54,
        alpha: 0.9,
        color: primaryColor,
      });

      // 2. Burst Particles
      const particleCount = tier === 'high' ? 12 : 6;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
        const velocity = Math.random() * 3.5 + 2.5;
        burstParticles.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          alpha: 1,
          size: (Math.random() * 2 + 1.5) * dpr,
          color: Math.random() > 0.4 ? primaryColor : secondaryColor,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });

    // GSAP Ticker callback
    const tickerCallback = () => {
      if (document.hidden) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Render Comet Trail
      if (EFFECTS_CONFIG.flags.cursorTrail && trailPoints.length > 1) {
        for (let i = trailPoints.length - 1; i >= 0; i--) {
          const pt = trailPoints[i];
          pt.alpha *= 0.88;
          pt.size *= 0.94;

          if (pt.alpha < 0.02) {
            trailPoints.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(pt.x * dpr, pt.y * dpr, pt.size * dpr, 0, Math.PI * 2);
          ctx.fillStyle = primaryColor;
          ctx.globalAlpha = pt.alpha * EFFECTS_CONFIG.intensity;
          ctx.shadowColor = primaryColor;
          ctx.shadowBlur = 8 * dpr;
          ctx.fill();
          ctx.restore();
        }
      }

      // 2. Render Shockwaves
      if (shockwaves.length > 0) {
        for (let i = shockwaves.length - 1; i >= 0; i--) {
          const sw = shockwaves[i];
          sw.radius += (sw.maxRadius - sw.radius) * 0.18 + 0.8;
          sw.alpha *= 0.91;

          if (sw.alpha < 0.02 || sw.radius >= sw.maxRadius) {
            shockwaves.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(sw.x * dpr, sw.y * dpr, sw.radius * dpr, 0, Math.PI * 2);
          ctx.strokeStyle = sw.color;
          ctx.lineWidth = 1.8 * dpr;
          ctx.globalAlpha = sw.alpha * EFFECTS_CONFIG.intensity;
          ctx.shadowColor = sw.color;
          ctx.shadowBlur = 10 * dpr;
          ctx.stroke();
          ctx.restore();
        }
      }

      // 3. Render Burst Particles
      if (burstParticles.length > 0) {
        for (let i = burstParticles.length - 1; i >= 0; i--) {
          const bp = burstParticles[i];
          bp.x += bp.vx;
          bp.y += bp.vy;
          bp.vx *= 0.94;
          bp.vy *= 0.94;
          bp.alpha *= 0.92;

          if (bp.alpha < 0.02) {
            burstParticles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(bp.x * dpr, bp.y * dpr, bp.size, 0, Math.PI * 2);
          ctx.fillStyle = bp.color;
          ctx.globalAlpha = bp.alpha * EFFECTS_CONFIG.intensity;
          ctx.shadowColor = bp.color;
          ctx.shadowBlur = 6 * dpr;
          ctx.fill();
          ctx.restore();
        }
      }
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      gsap.ticker.remove(tickerCallback);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [theme, tier]);

  if (tier === 'off') return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[9997] select-none"
    />
  );
};
