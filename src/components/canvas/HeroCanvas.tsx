import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useQuality } from '../../context/QualityContext';

const LazyThreeCanvas = lazy(() => import('./ThreeCanvas'));

export const HeroCanvasFallback: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Aurora glow blobs with Acid Lime & Cyan */}
      <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-[#C8FF2E]/10 blur-[120px] animate-pulse" />
      <div
        className="absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full bg-[#5CE1E6]/10 blur-[120px] animate-pulse"
        style={{ animationDelay: '3.5s' }}
      />
      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
};

export const HeroCanvas: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const { tier } = useQuality();
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    // Only load Three.js on desktop non-touch screens when tier is high or medium
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    const isQualityAllowed = tier === 'high' || tier === 'medium';

    if (!isMobile && !reducedMotion && isQualityAllowed) {
      setShouldRender3D(true);
    } else {
      setShouldRender3D(false);
    }
  }, [reducedMotion, tier]);

  return (
    <>
      <HeroCanvasFallback />
      {shouldRender3D && (
        <Suspense fallback={null}>
          <LazyThreeCanvas />
        </Suspense>
      )}
    </>
  );
};

export default HeroCanvas;
