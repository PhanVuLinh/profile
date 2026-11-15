import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { QualityTier } from '../config/effects';

interface QualityContextType {
  tier: QualityTier;
  setTier: (tier: QualityTier) => void;
  fps: number;
  bootReady: boolean;
  setBootReady: (ready: boolean) => void;
}

const QualityContext = createContext<QualityContextType | undefined>(undefined);

function detectInitialTier(): QualityTier {
  try {
    const saved = localStorage.getItem('pvl_effects_tier');
    if (saved === 'high' || saved === 'medium' || saved === 'low' || saved === 'off') {
      return saved;
    }
  } catch {
    // LocalStorage blocked
  }

  if (typeof window !== 'undefined') {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'off';
    }

    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as { deviceMemory?: number }).deviceMemory || 4;
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;

    if (cores <= 4 || memory < 4) {
      return isMobile ? 'low' : 'medium';
    }

    if (isMobile) {
      return 'medium';
    }
  }

  return 'high';
}

export const QualityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tier, setTierState] = useState<QualityTier>(detectInitialTier);
  const [bootReady, setBootReady] = useState(false);
  const [fps, setFps] = useState(60);

  const tierRef = useRef(tier);
  tierRef.current = tier;

  const consecutiveLowWindows = useRef(0);
  const lastDowngradeTime = useRef(0);

  const setTier = (newTier: QualityTier) => {
    setTierState(newTier);
    consecutiveLowWindows.current = 0;
    try {
      localStorage.setItem('pvl_effects_tier', newTier);
    } catch {
      // Ignored
    }
    console.info(`[Quality Governor] Tier manually updated to: "${newTier}"`);
  };

  // Initial console announcement
  useEffect(() => {
    const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : 'N/A';
    const memory = typeof navigator !== 'undefined' ? (navigator as { deviceMemory?: number }).deviceMemory || 'N/A' : 'N/A';
    console.info(
      `%c[Quality Governor]%c Initial tier: "${tier}" | CPU cores: ${cores} | RAM: ${memory}GB`,
      'color: #059669; font-weight: bold;',
      'color: inherit;'
    );
  }, []);

  // Measurement loop (starts only 3s after bootReady)
  useEffect(() => {
    if (!bootReady) return;

    let rafId: number;
    let windowStartTime = 0;
    let frameCount = 0;
    let lastFrameTime = performance.now();
    let measurementAllowed = false;

    // Wait 3 seconds post boot loader
    const warmupTimeout = setTimeout(() => {
      measurementAllowed = true;
      windowStartTime = performance.now();
      lastFrameTime = windowStartTime;
      frameCount = 0;
    }, 3000);

    const checkFrame = (now: number) => {
      const dt = now - lastFrameTime;
      lastFrameTime = now;

      // Rule: Skip frames when tab is hidden or dt > 250ms
      if (document.hidden || dt > 250) {
        windowStartTime = now;
        frameCount = 0;
        rafId = requestAnimationFrame(checkFrame);
        return;
      }

      if (measurementAllowed) {
        frameCount++;
        const elapsed = now - windowStartTime;

        // 2-second measurement window
        if (elapsed >= 2000) {
          const calculatedFps = Math.round((frameCount * 1000) / elapsed);
          setFps(calculatedFps);

          const currentTier = tierRef.current;

          // Rule: Only downgrade when 3 consecutive 2s windows are < 50fps
          if (calculatedFps < 50 && currentTier !== 'low' && currentTier !== 'off') {
            consecutiveLowWindows.current += 1;

            // Rule: Gap between downgrades must be >= 6s
            if (
              consecutiveLowWindows.current >= 3 &&
              now - lastDowngradeTime.current >= 6000
            ) {
              const nextTier: QualityTier = currentTier === 'high' ? 'medium' : 'low';
              console.warn(
                `%c[Quality Governor]%c Sustained low performance (${calculatedFps} fps in 3 windows). Auto-downgrading "${currentTier}" -> "${nextTier}"`,
                'color: #FF6B4A; font-weight: bold;',
                'color: inherit;'
              );

              setTierState(nextTier);
              try {
                localStorage.setItem('pvl_effects_tier', nextTier);
              } catch {
                // Ignore
              }

              lastDowngradeTime.current = now;
              consecutiveLowWindows.current = 0;
            }
          } else if (calculatedFps >= 50) {
            consecutiveLowWindows.current = 0;
          }

          // Reset window
          windowStartTime = now;
          frameCount = 0;
        }
      }

      rafId = requestAnimationFrame(checkFrame);
    };

    rafId = requestAnimationFrame(checkFrame);

    return () => {
      clearTimeout(warmupTimeout);
      cancelAnimationFrame(rafId);
    };
  }, [bootReady]);

  return (
    <QualityContext.Provider value={{ tier, setTier, fps, bootReady, setBootReady }}>
      {children}
    </QualityContext.Provider>
  );
};

export const useQuality = (): QualityContextType => {
  const context = useContext(QualityContext);
  if (!context) {
    throw new Error('useQuality must be used within a QualityProvider');
  }
  return context;
};
