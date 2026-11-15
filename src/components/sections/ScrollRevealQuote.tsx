import React, { useRef, useEffect, useState } from 'react';
import { profileData } from '../../data/profile';
import { useLanguage } from '../../context/LanguageContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Quote } from 'lucide-react';

export const ScrollRevealQuote: React.FC = () => {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  const quoteText = profileData.quote[lang];
  const words = quoteText.split(' ');

  useEffect(() => {
    if (reducedMotion) {
      setScrollProgress(1);
      return;
    }

    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start revealing when top enters middle of viewport, full reveal when it reaches top third
      const totalDist = windowHeight * 0.9;
      const currentDist = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Philosophy Quote"
      className="relative my-20 py-24 sm:py-32 overflow-hidden border-y border-white/10 bg-transparent not-dark:border-slate-200"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
            <Quote className="h-6 w-6" />
          </div>
        </div>

        {/* Scroll-linked Opacity Typography */}
        <p className="font-syne text-2xl sm:text-3xl md:text-5xl font-extrabold leading-snug tracking-tight">
          {words.map((word, index) => {
            const wordThreshold = index / words.length;
            const isLit = scrollProgress >= wordThreshold;
            return (
              <span
                key={index}
                className={`inline-block mr-2 sm:mr-3 transition-colors duration-200 ${
                  isLit
                    ? 'text-white not-dark:text-slate-900 drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                    : 'text-slate-700 not-dark:text-slate-300'
                }`}
              >
                {word}
              </span>
            );
          })}
        </p>

        <div className="mt-8 flex items-center justify-center space-x-3 font-mono text-xs sm:text-sm text-cyan-400">
          <span className="h-px w-8 bg-cyan-400/50" />
          <span>{profileData.quote.author} — Software Engineering Principle</span>
          <span className="h-px w-8 bg-cyan-400/50" />
        </div>
      </div>
    </section>
  );
};

