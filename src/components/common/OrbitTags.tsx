import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../context/ThemeContext';
import { useQuality } from '../../context/QualityContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EFFECTS_CONFIG } from '../../config/effects';

export interface OrbitChip {
  id: string;
  label: string;
  tag?: string;
  color?: string;
}

interface OrbitTagsProps {
  chips: OrbitChip[];
  radiusX?: number;
  radiusY?: number;
  className?: string;
}

export const OrbitTags: React.FC<OrbitTagsProps> = ({
  chips,
  radiusX = 220,
  radiusY = 65,
  className = '',
}) => {
  const { theme } = useTheme();
  const { tier } = useQuality();
  const reducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isHoveredRef = useRef<number | null>(null);
  const isVisibleRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Only run animation on desktop, when tier is high/medium, and flag is on
    if (
      isMobile ||
      tier === 'off' ||
      tier === 'low' ||
      reducedMotion ||
      !EFFECTS_CONFIG.flags.orbitTags
    ) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // 1. IntersectionObserver: Pause when outside viewport (Item 4)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const count = chips.length;
    let angleOffset = 0;

    // 2. Single unified loop plugged into GSAP ticker
    const tickerCallback = () => {
      if (!isVisibleRef.current || document.hidden) return;

      angleOffset += 0.007;

      for (let i = 0; i < count; i++) {
        const el = chipRefs.current[i];
        if (!el) continue;

        // If user is hovering this chip, pause it and keep highlighted
        if (isHoveredRef.current === i) continue;

        const baseAngle = (i / count) * Math.PI * 2;
        const currentAngle = baseAngle + angleOffset;

        const x = Math.cos(currentAngle) * radiusX;
        const y = Math.sin(currentAngle) * radiusY;

        // Depth perspective (0 = back, 1 = front)
        const depth = (Math.sin(currentAngle) + 1) / 2;
        const scale = 0.82 + depth * 0.28;
        const opacity = 0.65 + depth * 0.35;
        const zIndex = Math.round(depth * 10);

        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(2)})`;
        el.style.opacity = opacity.toFixed(2);
        el.style.zIndex = `${zIndex}`;
      }
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      gsap.ticker.remove(tickerCallback);
      observer.disconnect();
    };
  }, [chips.length, radiusX, radiusY, isMobile, tier, reducedMotion]);

  const isDark = theme === 'dark';

  // Mobile or Static View: Clean static row of chips
  if (
    isMobile ||
    tier === 'off' ||
    tier === 'low' ||
    reducedMotion ||
    !EFFECTS_CONFIG.flags.orbitTags
  ) {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-2 pt-3 ${className}`}>
        {chips.map((chip) => (
          <div
            key={chip.id}
            className="inline-flex items-center space-x-1.5 rounded-full border border-slate-300 bg-white px-3 py-1 font-mono text-xs font-semibold text-slate-800 shadow-xs dark:border-white/15 dark:bg-[#101018]/90 dark:text-[#EDEDF2]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-[#C8FF2E]" />
            <span>{chip.label}</span>
          </div>
        ))}
      </div>
    );
  }

  // Desktop Orbiting View (3D Elliptical Orbit)
  return (
    <div
      ref={containerRef}
      aria-label="Interactive Orbiting Stack Tags"
      className={`relative mx-auto flex h-28 w-full max-w-2xl items-center justify-center overflow-visible select-none my-6 ${className}`}
    >
      {chips.map((chip, idx) => (
        <div
          key={chip.id}
          ref={(el) => {
            chipRefs.current[idx] = el;
          }}
          onMouseEnter={() => {
            isHoveredRef.current = idx;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = null;
          }}
          className={`absolute cursor-pointer transition-transform duration-200 hover:scale-120 hover:z-30 ${
            isDark
              ? 'rounded-full border border-[#C8FF2E]/35 bg-[#0E0E18]/95 px-3.5 py-1.5 font-mono text-xs font-bold text-[#EDEDF2] shadow-[0_0_15px_rgba(200,255,46,0.15)] hover:border-[#C8FF2E] hover:text-[#C8FF2E] hover:shadow-[0_0_25px_rgba(200,255,46,0.4)]'
              : 'rounded-full border-2 border-slate-900 bg-white px-3.5 py-1.5 font-mono text-xs font-bold text-slate-950 shadow-sm hover:bg-slate-950 hover:text-white hover:shadow-md'
          }`}
        >
          <div className="flex items-center space-x-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isDark ? 'bg-[#C8FF2E]' : 'bg-emerald-600'
              }`}
            />
            <span>{chip.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
