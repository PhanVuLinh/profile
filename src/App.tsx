import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { QualityProvider, useQuality } from './context/QualityContext';
import { ToastProvider } from './components/common/Toast';
import { CustomCursor } from './components/common/CustomCursor';
import { BootLoader } from './components/common/BootLoader';
import { ConfettiListener } from './components/common/ConfettiTrigger';
import { CommandPalette } from './components/common/CommandPalette';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroCanvas } from './components/canvas/HeroCanvas';
import { AmbientLayer } from './components/canvas/AmbientLayer';
import { CursorEffects } from './components/canvas/CursorEffects';
import { ScrollCompanion } from './components/common/ScrollCompanion';
import { BackgroundMarquee } from './components/sections/BackgroundMarquee';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { EducationSection } from './components/sections/EducationSection';
import { ScrollRevealQuote } from './components/sections/ScrollRevealQuote';
import { ContactSection } from './components/sections/ContactSection';
import { refreshScrollLayout } from './lib/scroll';
import { updateGlobalScrollState } from './lib/scrollState';

export function PortfolioApp() {
  const [bootCompleted, setBootCompleted] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const { tier, setBootReady } = useQuality();
  const { lang } = useLanguage();
  const { theme } = useTheme();

  // Refresh scroll and pin geometries when language or theme changes
  useEffect(() => {
    refreshScrollLayout(80);
  }, [lang, theme]);

  // Unified Lenis + GSAP Ticker Loop (Quy tắc 5 & Mục 4)
  useEffect(() => {
    if (tier === 'off' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: false,
    });

    // Notify ScrollTrigger on every Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis inside the single unified GSAP Ticker
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      updateGlobalScrollState(lenis.scroll, maxScroll);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, [tier]);

  // Global keyboard shortcut for Ctrl/Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07070B] text-[#EDEDF2] not-dark:bg-[#F5F5F8] not-dark:text-[#0D0D12] transition-colors duration-300">
      {/* Global Grain/Noise Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Terminal Boot Sequence (0. Loader) */}
      {!bootCompleted && (
        <BootLoader
          onComplete={() => {
            setBootCompleted(true);
            setBootReady(true);
          }}
        />
      )}

      {/* Full-Page 2D Ambient Canvas: Tech Sprites, Comets, Backend Data Packets, Dust */}
      <AmbientLayer />

      {/* Cyber Shuttle Scroll Companion (Item 2) */}
      <ScrollCompanion />

      {/* Dynamic Cursor Comet Tail & Click Shockwave */}
      <CursorEffects />

      {/* Awwwards Custom Difference Cursor */}
      <CustomCursor />

      {/* Easter Egg Listener (type "konami") */}
      <ConfettiListener />

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* Sticky Auto-Hide Dynamic Island Navbar with Quality FX Popover */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Persistent WebGL Hero Scene */}
      <HeroCanvas />

      {/* Giant Background Outline Marquee */}
      <BackgroundMarquee />

      {/* Main Page Content (z-10 ensures readable priority over ambient layer) */}
      <main id="main-content" className="relative z-10 flex flex-col">
        {/* Phase 1 Hero Section */}
        <HeroSection />

        {/* Existing Sections with transparent/semi-translucent cards */}
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ScrollRevealQuote />
        <ContactSection />
      </main>

      {/* Minimalist Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <QualityProvider>
          <ToastProvider>
            <PortfolioApp />
          </ToastProvider>
        </QualityProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
