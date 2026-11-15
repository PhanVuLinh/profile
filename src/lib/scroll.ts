import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

let refreshTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Debounced helper to recalculate ScrollTrigger positions and pin geometries.
 * Ready for Bước 2 (Spaceship MotionPath) and dynamic content expansions.
 */
export function refreshScrollLayout(delay = 100): void {
  if (typeof window === 'undefined') return;

  if (refreshTimer) {
    clearTimeout(refreshTimer);
  }

  refreshTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, delay);
}

// Automatically trigger refresh once web fonts are fully loaded
if (typeof document !== 'undefined' && 'fonts' in document) {
  document.fonts.ready.then(() => {
    refreshScrollLayout(80);
  });
}
