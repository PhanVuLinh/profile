import React, { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiTriggerProps {
  onTrigger?: () => void;
}

export const fireConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#00F0FF', '#10B981', '#F59E0B', '#3B82F6', '#EC4899'],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const ConfettiListener: React.FC<ConfettiTriggerProps> = ({ onTrigger }) => {
  const triggerConfetti = useCallback(() => {
    fireConfetti();
    if (onTrigger) onTrigger();
  }, [onTrigger]);

  useEffect(() => {
    let keyBuffer: string[] = [];
    const konamiWord = 'konami';

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      keyBuffer.push(e.key.toLowerCase());
      if (keyBuffer.length > 20) {
        keyBuffer = keyBuffer.slice(-20);
      }

      const joined = keyBuffer.join('');
      if (joined.endsWith(konamiWord)) {
        triggerConfetti();
        keyBuffer = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerConfetti]);

  return null;
};

