import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

// Generate coordinates forming the "PL" monogram for Hero
function generatePLCoordinates(count: number): Float32Array {
  const target = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const pChoice = Math.random();
    let x = 0;
    let y = 0;
    const z = (Math.random() - 0.5) * 0.8;

    if (pChoice < 0.28) {
      // P vertical stem
      x = -2.2 + (Math.random() - 0.5) * 0.15;
      y = (Math.random() - 0.5) * 3.4;
    } else if (pChoice < 0.50) {
      // P loop
      const angle = (Math.random() - 0.5) * Math.PI;
      const radius = 0.85 + Math.random() * 0.2;
      x = -2.2 + Math.cos(angle) * radius;
      y = 0.85 + Math.sin(angle) * radius;
    } else if (pChoice < 0.74) {
      // L vertical stem
      x = 0.8 + (Math.random() - 0.5) * 0.15;
      y = (Math.random() - 0.5) * 3.4;
    } else if (pChoice < 0.90) {
      // L horizontal base
      x = 0.8 + Math.random() * 1.8;
      y = -1.7 + (Math.random() - 0.5) * 0.15;
    } else {
      // Ambient floating particles
      x = (Math.random() - 0.5) * 16;
      y = (Math.random() - 0.5) * 12;
    }

    target[i * 3] = x;
    target[i * 3 + 1] = y;
    target[i * 3 + 2] = z;
  }

  return target;
}

// Generate coordinates for terrain / commit line
function generateGridCoordinates(count: number): Float32Array {
  const target = new Float32Array(count * 3);
  const cols = Math.floor(Math.sqrt(count));
  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    target[i * 3] = (col / cols - 0.5) * 18;
    target[i * 3 + 1] = (row / cols - 0.5) * 14;
    target[i * 3 + 2] = -1.5;
  }
  return target;
}

function ParticleSimulation({ count = 2000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const { viewport } = useThree();
  const { theme } = useTheme();

  const mouse3D = useRef(new THREE.Vector3(999, 999, 0));
  const scrollRatio = useRef(0);

  const { initialPositions, plPositions, gridPositions, currentPositions, colors } = useMemo(() => {
    const pl = generatePLCoordinates(count);
    const grid = generateGridCoordinates(count);
    const inits = new Float32Array(count * 3);
    const currents = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const isDark = theme === 'dark';
    const c1 = isDark ? new THREE.Color('#C8FF2E') : new THREE.Color('#059669');
    const c2 = isDark ? new THREE.Color('#5CE1E6') : new THREE.Color('#0D9488');
    const c3 = isDark ? new THREE.Color('#EDEDF2') : new THREE.Color('#64748B');

    for (let i = 0; i < count; i++) {
      inits[i * 3] = (Math.random() - 0.5) * 26;
      inits[i * 3 + 1] = (Math.random() - 0.5) * 20;
      inits[i * 3 + 2] = (Math.random() - 0.5) * 16;

      currents[i * 3] = inits[i * 3];
      currents[i * 3 + 1] = inits[i * 3 + 1];
      currents[i * 3 + 2] = inits[i * 3 + 2];

      const r = Math.random();
      const c = r > 0.6 ? c1 : r > 0.25 ? c2 : c3;
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }

    return {
      initialPositions: inits,
      plPositions: pl,
      gridPositions: grid,
      currentPositions: currents,
      colors: cols,
    };
  }, [count, theme]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse3D.current.set(x * (viewport.width / 2), y * (viewport.height / 2), 0);
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRatio.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [viewport]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;

    const time = state.clock.getElapsedTime();
    // Converge factor from initial cloud to monogram
    const convergeFactor = Math.min(time * 0.8, 1);
    const scroll = scrollRatio.current;

    // Repulsion physics constants
    const repulsionRadius = 1.9;
    const repulsionStrength = 0.7;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      const waveX = Math.sin(time * 0.5 + i * 0.015) * 0.08;
      const waveY = Math.cos(time * 0.6 + i * 0.015) * 0.08;

      // Morph between PL monogram (at top) and subtle grid/depth (when scrolled)
      const targetX = THREE.MathUtils.lerp(plPositions[idx], gridPositions[idx], scroll * 1.5) + waveX;
      const targetY = THREE.MathUtils.lerp(plPositions[idx + 1], gridPositions[idx + 1], scroll * 1.5) + waveY;
      const targetZ = THREE.MathUtils.lerp(plPositions[idx + 2], gridPositions[idx + 2], scroll * 1.5);

      const goalX = THREE.MathUtils.lerp(initialPositions[idx], targetX, convergeFactor);
      const goalY = THREE.MathUtils.lerp(initialPositions[idx + 1], targetY, convergeFactor);
      const goalZ = THREE.MathUtils.lerp(initialPositions[idx + 2], targetZ, convergeFactor);

      // Repulsion force from mouse
      const dx = pos[idx] - mouse3D.current.x;
      const dy = pos[idx + 1] - mouse3D.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let forceX = 0;
      let forceY = 0;
      if (dist < repulsionRadius && dist > 0.001) {
        const factor = (1 - dist / repulsionRadius) * repulsionStrength;
        forceX = (dx / dist) * factor;
        forceY = (dy / dist) * factor;
      }

      currentPositions[idx] += (goalX - currentPositions[idx]) * 0.08 + forceX;
      currentPositions[idx + 1] += (goalY - currentPositions[idx + 1]) * 0.08 + forceY;
      currentPositions[idx + 2] += (goalZ - currentPositions[idx + 2]) * 0.08;

      pos[idx] = currentPositions[idx];
      pos[idx + 1] = currentPositions[idx + 1];
      pos[idx + 2] = currentPositions[idx + 2];
    }

    posAttr.needsUpdate = true;
  });

  const isDark = theme === 'dark';

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[currentPositions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isDark ? 0.052 : 0.042}
        vertexColors
        transparent
        opacity={isDark ? 0.7 : 0.32}
        sizeAttenuation
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

const ThreeCanvas: React.FC = () => {
  const [isActive, setIsActive] = React.useState(true);

  useEffect(() => {
    const handleVisibility = () => {
      setIsActive(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 50 }}
        gl={{
          antialias: false,
          powerPreference: 'low-power',
          alpha: true,
        }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2)]}
      >
        <ParticleSimulation count={2000} />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
