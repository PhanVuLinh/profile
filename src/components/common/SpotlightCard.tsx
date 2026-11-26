import React, { useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  enableTilt?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  glowColor,
  enableTilt = false,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    if (enableTilt && !reducedMotion) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotX = -((y - centerY) / centerY) * 4;
      const rotY = ((x - centerX) / centerX) * 4;
      setRotate({ x: rotX, y: rotY });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setMousePos({ x: -1000, y: -1000 });
  };

  const defaultGlow = 'rgba(0, 240, 255, 0.45)';
  const activeGlow = glowColor || defaultGlow;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          enableTilt && isHovered && !reducedMotion
            ? `perspective(1000px) rotateX(${rotate.x.toFixed(2)}deg) rotateY(${rotate.y.toFixed(2)}deg) translateY(-4px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className={`group relative overflow-hidden rounded-2xl p-[1px] transition-all duration-300 ${className}`}
      {...props}
    >
      {/* 1px Radial Spotlight Glow on Border (Linear / Vercel style) */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${activeGlow}, transparent 65%)`
            : 'transparent',
        }}
        aria-hidden="true"
      />

      {/* Static hairline border fallback */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 not-dark:border-slate-200/90 transition-colors"
        aria-hidden="true"
      />

      {/* Inner Card Content Container */}
      <div className="relative h-full w-full rounded-[calc(theme(borderRadius.2xl)-1px)] bg-[#0E0E18]/70 backdrop-blur-xl not-dark:bg-white/85 not-dark:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {/* Subtle inner surface mouse sheen */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[calc(theme(borderRadius.2xl)-1px)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: isHovered
              ? `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.035), transparent 70%)`
              : 'transparent',
          }}
          aria-hidden="true"
        />

        {children}
      </div>
    </div>
  );
};
