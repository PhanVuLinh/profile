import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../../context/LanguageContext';
import { useQuality } from '../../context/QualityContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EFFECTS_CONFIG } from '../../config/effects';
import { refreshScrollLayout } from '../../lib/scroll';

interface FlyingTitleProps {
  text: string;
  as?: 'h2' | 'h3' | 'p';
  className?: string;
  subtitle?: string;
  highlightText?: string;
}

export const FlyingTitle: React.FC<FlyingTitleProps> = ({
  text,
  as: Component = 'h2',
  className = '',
  subtitle,
  highlightText,
}) => {
  const { lang } = useLanguage();
  const { tier } = useQuality();
  const reducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLHeadingElement | null>(null);

  // Normalize text to Unicode NFC
  const normalizedText = useMemo(() => text.normalize('NFC'), [text]);

  const words = useMemo(() => {
    return normalizedText.split(' ').map((word) => {
      const chars = word.split('');
      return { word, chars };
    });
  }, [normalizedText]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Static fallback for Low/Off tier, reduced motion, or disabled flag
    if (
      tier === 'off' ||
      tier === 'low' ||
      reducedMotion ||
      !EFFECTS_CONFIG.flags.flyingLetters
    ) {
      return;
    }

    const charElements = el.querySelectorAll<HTMLElement>('.flying-char');
    if (charElements.length === 0) return;

    // Create GSAP animation context (ensures 100% clean revert on unmount/lang switch)
    const ctx = gsap.context(() => {
      if (tier === 'medium') {
        // Medium tier: Clean fade + slide
        gsap.fromTo(
          charElements,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.02,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      } else {
        // High tier: Full 3D entrance scatter + scrub out
        // 1. Entrance timeline
        const entranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });

        charElements.forEach((charEl, i) => {
          const randX = (Math.random() - 0.5) * 70;
          const randY = (Math.random() - 0.5) * 50;
          const randRot = (Math.random() - 0.5) * 35;

          entranceTl.fromTo(
            charEl,
            {
              opacity: 0,
              x: randX,
              y: randY,
              rotate: randRot,
              scale: 0.75,
              filter: 'blur(6px)',
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              ease: 'expo.out',
            },
            i * 0.022
          );
        });

        // 2. Gentle scatter on scroll exit (scrubbed, doesn't conflict with entrance)
        gsap.to(charElements, {
          x: (i) => (i % 2 === 0 ? -1 : 1) * ((i % 4) + 1) * 7,
          y: -18,
          opacity: 0.35,
          stagger: 0.01,
          scrollTrigger: {
            trigger: el,
            start: 'bottom 35%',
            end: 'bottom -10%',
            scrub: 1.2,
          },
        });
      }
    }, el);

    // Refresh scroll geometry after split
    refreshScrollLayout(60);

    return () => {
      ctx.revert();
    };
  }, [normalizedText, tier, reducedMotion, lang]);

  return (
    <Component
      ref={containerRef}
      aria-label={normalizedText}
      className={`${className} overflow-clip select-none`}
    >
      {words.map((wordObj, wordIdx) => (
        <span key={wordIdx} className="inline-flex whitespace-nowrap overflow-clip">
          {wordObj.chars.map((char, charIdx) => (
            <span
              key={charIdx}
              aria-hidden="true"
              className="flying-char inline-block will-change-transform"
            >
              {char}
            </span>
          ))}
          {/* Space between words */}
          {wordIdx < words.length - 1 && (
            <span aria-hidden="true" className="inline-block w-[0.25em]">
              &nbsp;
            </span>
          )}
        </span>
      ))}
      {highlightText && (
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-cyan-200">
          {highlightText}
        </span>
      )}
      {subtitle && (
        <span className="block mt-2 font-mono text-xs text-slate-400 dark:text-[#8A8A9A]">
          {subtitle}
        </span>
      )}
    </Component>
  );
};
