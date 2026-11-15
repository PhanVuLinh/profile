import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useQuality } from '../../context/QualityContext';
import { scrollState } from '../../lib/scrollState';
import { EFFECTS_CONFIG } from '../../config/effects';

export const BackgroundMarquee: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const { tier } = useQuality();

  useEffect(() => {
    if (
      reducedMotion ||
      tier === 'off' ||
      !EFFECTS_CONFIG.flags.velocityMarquee
    ) {
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    // Direct ticker loop driven by scrollState (Item 5)
    const tickerCallback = () => {
      if (document.hidden) return;

      const smoothV = scrollState.smoothVelocity;
      // Gentle idle drift speed when stationary
      const idleSpeed = 0.5;
      const speed = idleSpeed + smoothV * 0.55;

      offsetRef.current -= speed;

      // Wrap around width (one segment ~ 1600-2400px depending on screen)
      const segmentWidth = track.scrollWidth / 3;
      if (offsetRef.current <= -segmentWidth) {
        offsetRef.current += segmentWidth;
      } else if (offsetRef.current > 0) {
        offsetRef.current -= segmentWidth;
      }

      track.style.transform = `translate3d(${offsetRef.current.toFixed(2)}px, 0, 0)`;
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      gsap.ticker.remove(tickerCallback);
    };
  }, [reducedMotion, tier]);

  if (reducedMotion || tier === 'off' || !EFFECTS_CONFIG.flags.velocityMarquee) {
    return null;
  }

  const text = 'FULLSTACK DEVELOPER • LARAVEL • REACT 19 • NODE.JS • VNPAY • ZALOPAY • REDIS • DOCKER • ';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-12 z-0 overflow-hidden select-none opacity-20 dark:opacity-20 not-dark:opacity-10 will-change-transform"
    >
      <div
        ref={trackRef}
        className="flex w-max whitespace-nowrap font-syne text-[clamp(4rem,10vw,8rem)] font-extrabold uppercase tracking-widest text-transparent"
        style={{
          WebkitTextStroke: '1px currentColor',
        }}
      >
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
};
