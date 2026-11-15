import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'project' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device is touch-enabled
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Physics lerp for ring trailing
    const render = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      rafId = requestAnimationFrame(render);
    };

    // Detect clickable hover
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectCard = target.closest('[data-cursor="project"]');
      if (projectCard) {
        setCursorType('project');
        return;
      }

      const isInteractive = target.closest(
        'a, button, input, textarea, select, [role="button"], .cursor-pointer'
      );
      if (isInteractive) {
        setCursorType('pointer');
        return;
      }

      const isText = target.closest('p, h1, h2, h3, h4, span, li');
      if (isText && !isInteractive) {
        setCursorType('text');
        return;
      }

      setCursorType('default');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const isPointer = cursorType === 'pointer';
  const isProject = cursorType === 'project';
  const isText = cursorType === 'text';

  return (
    <>
      {/* Center sharp dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="custom-cursor-dot"
        style={{
          width: isPointer ? '10px' : isText ? '4px' : '7px',
          height: isPointer ? '10px' : isText ? '16px' : '7px',
          borderRadius: isText ? '2px' : '50%',
          backgroundColor: '#C8FF2E',
        }}
      />

      {/* Trailing lerped ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="custom-cursor-ring flex items-center justify-center font-mono text-[9px] font-bold text-[#07070B]"
        style={{
          width: isProject ? '64px' : isPointer ? '48px' : '28px',
          height: isProject ? '64px' : isPointer ? '48px' : '28px',
          borderColor: isProject ? '#C8FF2E' : isPointer ? '#C8FF2E' : 'rgba(200, 255, 46, 0.4)',
          backgroundColor: isProject
            ? 'rgba(200, 255, 46, 0.9)'
            : isPointer
            ? 'rgba(200, 255, 46, 0.12)'
            : 'transparent',
        }}
      >
        {isProject && <span>XEM</span>}
      </div>
    </>
  );
};
