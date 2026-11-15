import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../context/ThemeContext';
import { useQuality } from '../../context/QualityContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EFFECTS_CONFIG } from '../../config/effects';
import {
  scrollState,
  pushSpaceshipExhaust,
  spaceshipPose,
} from '../../lib/scrollState';

export const ScrollCompanion: React.FC = () => {
  const { theme } = useTheme();
  const { tier } = useQuality();
  const reducedMotion = useReducedMotion();

  const shipRef = useRef<HTMLDivElement | null>(null);
  const [isLanded, setIsLanded] = useState(false);
  const [isNearHeroCta, setIsNearHeroCta] = useState(false);
  const [isNearProjects, setIsNearProjects] = useState(false);

  // Ship coordinates (smoothed via lerp)
  const posRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500,
    y: 200,
    angle: 0,
    prevX: 500,
    prevY: 200,
  });

  const isDark = theme === 'dark';

  useEffect(() => {
    // 1. Check eligibility: Hidden on Mobile (< 768px), Low/Off tier, reduced-motion
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    if (
      tier === 'low' ||
      tier === 'off' ||
      !EFFECTS_CONFIG.flags.spaceship ||
      reducedMotion ||
      isMobile
    ) {
      spaceshipPose.active = false;
      return;
    }

    spaceshipPose.active = true;

    // 2. Setup ScrollTriggers for Section Interactions
    const ctx = gsap.context(() => {
      // Near Hero CTA buttons trigger
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top 30%',
        end: 'bottom 40%',
        onEnter: () => setIsNearHeroCta(true),
        onLeave: () => setIsNearHeroCta(false),
        onEnterBack: () => setIsNearHeroCta(true),
        onLeaveBack: () => setIsNearHeroCta(false),
      });

      // Projects section trigger (spark dropping)
      ScrollTrigger.create({
        trigger: '#projects',
        start: 'top 70%',
        end: 'bottom 20%',
        onEnter: () => setIsNearProjects(true),
        onLeave: () => setIsNearProjects(false),
        onEnterBack: () => setIsNearProjects(true),
        onLeaveBack: () => setIsNearProjects(false),
      });

      // Contact landing trigger
      ScrollTrigger.create({
        trigger: '#contact',
        start: 'top 60%',
        end: 'bottom bottom',
        onEnter: () => setIsLanded(true),
        onLeaveBack: () => setIsLanded(false),
      });
    });

    // 3. Frame Update Loop inside GSAP Ticker
    const tickerCallback = () => {
      if (document.hidden) return;

      const sw = window.innerWidth;
      const sh = window.innerHeight;
      const progress = scrollState.progress;
      const smoothV = scrollState.smoothVelocity;
      const time = performance.now() * 0.001;

      let targetX: number;
      let targetY: number;

      // Contact Landing mode
      if (isLanded) {
        const contactEmailBtn = document.querySelector('#contact a[href^="mailto:"]');
        if (contactEmailBtn) {
          const rect = contactEmailBtn.getBoundingClientRect();
          targetX = rect.left + rect.width / 2;
          targetY = rect.top - 28 + Math.sin(time * 3) * 3;
        } else {
          targetX = sw * 0.5;
          targetY = sh * 0.65;
        }
      } else {
        // Normal Flight Path: Sinusoidal wave across screen + gentle floating bob
        const waveAngle = progress * Math.PI * 5.2;
        const waveX = Math.sin(waveAngle) * (sw * 0.35) + Math.cos(progress * Math.PI * 1.8) * (sw * 0.08);
        targetX = sw * 0.5 + waveX;

        const verticalBob = Math.sin(time * 2.5) * 14;
        const scrollOffset = (progress - 0.5) * (sh * 0.3);
        targetY = sh * 0.35 + scrollOffset + verticalBob;

        // Hover around section titles
        if (isNearHeroCta) {
          targetX += Math.sin(time * 4) * 20;
        }
      }

      // Smooth position with lerp
      const pos = posRef.current;
      pos.prevX = pos.x;
      pos.prevY = pos.y;
      pos.x += (targetX - pos.x) * 0.09;
      pos.y += (targetY - pos.y) * 0.09;

      // Compute heading angle from movement vector
      const dx = pos.x - pos.prevX;
      const dy = pos.y - pos.prevY;
      let targetAngle = pos.angle;

      if (Math.hypot(dx, dy) > 0.4) {
        // Oriented upwards as base, atan2 yields direction
        targetAngle = Math.atan2(dy, dx) + Math.PI / 2;
      } else if (isLanded) {
        // Upright touchdown angle
        targetAngle = 0;
      }

      // Bank angle proportional to scroll velocity
      const bank = Math.max(-0.4, Math.min(0.4, smoothV * 0.025));
      targetAngle += bank;

      // Smooth rotation
      pos.angle += (targetAngle - pos.angle) * 0.12;

      // Broadcast pose
      spaceshipPose.x = pos.x;
      spaceshipPose.y = pos.y;
      spaceshipPose.angle = pos.angle;

      // Emit Exhaust Trail to AmbientLayer Canvas
      if (EFFECTS_CONFIG.flags.spaceship) {
        const engineOffsetX = -Math.sin(pos.angle) * 15;
        const engineOffsetY = Math.cos(pos.angle) * 15;
        const exhaustX = pos.x + engineOffsetX;
        const exhaustY = pos.y + engineOffsetY;

        const exhaustColor = isDark
          ? isNearProjects
            ? '#5CE1E6'
            : '#C8FF2E'
          : isNearProjects
          ? '#0D9488'
          : '#059669';

        pushSpaceshipExhaust({
          x: exhaustX,
          y: exhaustY,
          vx: -Math.sin(pos.angle) * (Math.random() * 2 + 1) + (Math.random() - 0.5) * 0.8,
          vy: Math.cos(pos.angle) * (Math.random() * 2 + 1) + (Math.random() - 0.5) * 0.8,
          alpha: Math.min(0.9, 0.4 + Math.abs(smoothV) * 0.04),
          size: (Math.random() * 2.5 + 1.8),
          color: exhaustColor,
        });

        // Extra sparks when passing Projects
        if (isNearProjects && Math.random() < 0.25) {
          pushSpaceshipExhaust({
            x: exhaustX + (Math.random() - 0.5) * 10,
            y: exhaustY + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            alpha: 1,
            size: 3.2,
            color: '#5CE1E6',
          });
        }
      }

      // Render Ship Position & Rotation
      if (shipRef.current) {
        const scale = isLanded ? 1.05 : Math.min(1.2, 0.95 + Math.abs(smoothV) * 0.015);
        shipRef.current.style.transform = `translate3d(${pos.x - 16}px, ${pos.y - 16}px, 0) rotate(${pos.angle}rad) scale(${scale})`;
      }
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      gsap.ticker.remove(tickerCallback);
      ctx.revert();
      spaceshipPose.active = false;
    };
  }, [tier, reducedMotion, isDark, isLanded, isNearHeroCta, isNearProjects]);

  // Hidden on Low/Off tier or mobile
  if (
    tier === 'low' ||
    tier === 'off' ||
    !EFFECTS_CONFIG.flags.spaceship ||
    reducedMotion
  ) {
    return null;
  }

  return (
    <div
      ref={shipRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[25] select-none will-change-transform"
      style={{
        width: '32px',
        height: '32px',
      }}
    >
      {/* Sleek Cyber Shuttle SVG (Aligned with PL.dev aesthetics) */}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_12px_rgba(200,255,46,0.65)] dark:drop-shadow-[0_0_12px_rgba(200,255,46,0.65)] not-dark:drop-shadow-[0_0_8px_rgba(5,150,105,0.4)]"
      >
        {/* Thruster Flame Core */}
        <polygon
          points="16,28 13.5,31.5 16,30.5 18.5,31.5"
          fill={isDark ? '#5CE1E6' : '#0D9488'}
          className="animate-pulse"
        />

        {/* Wings */}
        <path
          d="M16 2 L28 24 L16 19 L4 24 Z"
          fill={isDark ? '#141424' : '#FFFFFF'}
          stroke={isDark ? '#C8FF2E' : '#059669'}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* Fuselage Spine */}
        <path
          d="M16 2 L19 18 L16 21 L13 18 Z"
          fill={isDark ? '#C8FF2E' : '#059669'}
        />

        {/* Cockpit Canopy Glass */}
        <polygon
          points="16,7 18,14 16,16 14,14"
          fill={isDark ? '#5CE1E6' : '#0D9488'}
        />

        {/* Wingtip Accents */}
        <circle cx="26" cy="22" r="1.2" fill={isDark ? '#C8FF2E' : '#059669'} />
        <circle cx="6" cy="22" r="1.2" fill={isDark ? '#C8FF2E' : '#059669'} />
      </svg>
    </div>
  );
};
