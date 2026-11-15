import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

const CHARS = '!<>-_\\/[]{}—=+*^?#010101XYZ';

export function useTextScramble(texts: string[], intervalMs = 3800) {
  const [displayText, setDisplayText] = useState(texts[0] || '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (texts.length === 0) return;
    if (reducedMotion) {
      setDisplayText(texts[currentIndex % texts.length]);
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }, intervalMs);
      return () => clearInterval(timer);
    }

    const targetText = texts[currentIndex % texts.length];
    let frame = 0;
    const totalFrames = 30; // duration of scramble

    const scramble = () => {
      frame++;
      const progress = frame / totalFrames;
      let output = '';

      for (let i = 0; i < targetText.length; i++) {
        if (targetText[i] === ' ') {
          output += ' ';
          continue;
        }
        // If this char has resolved according to progress
        if (i < Math.floor(progress * targetText.length)) {
          output += targetText[i];
        } else {
          // random glitch character
          output += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(output);

      if (frame < totalFrames) {
        frameRef.current = requestAnimationFrame(scramble);
      } else {
        setDisplayText(targetText);
      }
    };

    scramble();

    const switchTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, intervalMs);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      clearInterval(switchTimer);
    };
  }, [currentIndex, texts, intervalMs, reducedMotion]);

  return displayText;
}

