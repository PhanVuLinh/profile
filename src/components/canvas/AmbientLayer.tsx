import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../context/ThemeContext';
import { useQuality } from '../../context/QualityContext';
import {
  EFFECTS_CONFIG,
  AMBIENT_OPACITY,
  TECH_SPRITES_DATA,
} from '../../config/effects';
import { scrollState, spaceshipTrailQueue } from '../../lib/scrollState';

// Atlas Sprite Interface
interface AtlasSprite {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

// Active Tech Sprite Instance
interface ActiveSprite {
  atlasId: string;
  layer: 'far' | 'mid' | 'near';
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  pushX: number;
  pushY: number;
  pushRot: number;
  speedX: number;
  speedY: number;
  scale: number;
  opacity: number;
  depth: number;
}

// Comet Streak
interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

// Backend Node & Packet
interface NetworkNode {
  x: number;
  y: number;
  side: 'left' | 'right';
  flash: number;
}

interface DataPacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

// Ambient Dust Particle
interface DustParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  alpha: number;
  seed: number;
}

// Warp Speed Line
interface WarpStreak {
  x: number;
  y: number;
  length: number;
  speed: number;
  alpha: number;
}

export const AmbientLayer: React.FC = () => {
  const { theme } = useTheme();
  const { tier } = useQuality();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const atlasCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const atlasMapRef = useRef<Map<string, AtlasSprite>>(new Map());

  // Mouse state
  const mouseRef = useRef({ x: -999, y: -999 });

  // Build Offscreen Texture Atlas
  const buildAtlas = (isDark: boolean, dpr: number) => {
    const atlasCanvas = document.createElement('canvas');
    const atlasCtx = atlasCanvas.getContext('2d');
    if (!atlasCtx) return;

    const padding = 16 * dpr;
    const itemHeight = 36 * dpr;
    let currentY = padding;
    let maxAtlasWidth = 320 * dpr;

    atlasCanvas.width = maxAtlasWidth;
    // Estimate total height needed
    atlasCanvas.height = (TECH_SPRITES_DATA.length + 1) * (itemHeight + padding);

    const map = new Map<string, AtlasSprite>();

    atlasCtx.textBaseline = 'middle';

    for (const item of TECH_SPRITES_DATA) {
      const isCode = item.type === 'code';
      const fontSize = Math.round((isCode ? 12 : 13) * dpr);
      atlasCtx.font = isCode
        ? `600 ${fontSize}px "JetBrains Mono", monospace`
        : `700 ${fontSize}px "Space Grotesk", sans-serif`;

      const textMetrics = atlasCtx.measureText(item.label);
      const textWidth = textMetrics.width;
      const boxWidth = textWidth + (isCode ? 24 * dpr : 28 * dpr);
      const boxHeight = itemHeight;

      if (boxWidth + padding * 2 > maxAtlasWidth) {
        maxAtlasWidth = boxWidth + padding * 2;
        atlasCanvas.width = maxAtlasWidth;
      }

      const drawX = padding;
      const drawY = currentY;

      // Draw Badge Container
      const radius = 8 * dpr;
      atlasCtx.save();
      atlasCtx.beginPath();
      atlasCtx.roundRect(drawX, drawY, boxWidth, boxHeight, radius);

      if (isDark) {
        atlasCtx.fillStyle = isCode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(200, 255, 46, 0.08)';
        atlasCtx.strokeStyle = isCode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(200, 255, 46, 0.35)';
      } else {
        atlasCtx.fillStyle = isCode ? 'rgba(15, 23, 42, 0.05)' : 'rgba(5, 150, 105, 0.08)';
        atlasCtx.strokeStyle = isCode ? 'rgba(15, 23, 42, 0.18)' : 'rgba(5, 150, 105, 0.35)';
      }
      atlasCtx.lineWidth = 1 * dpr;
      atlasCtx.fill();
      atlasCtx.stroke();

      // Dot icon on the left
      const dotX = drawX + 10 * dpr;
      const dotY = drawY + boxHeight / 2;
      atlasCtx.beginPath();
      atlasCtx.arc(dotX, dotY, 3 * dpr, 0, Math.PI * 2);
      if (isDark) {
        atlasCtx.fillStyle = isCode ? '#5CE1E6' : '#C8FF2E';
      } else {
        atlasCtx.fillStyle = isCode ? '#0D9488' : '#059669';
      }
      atlasCtx.fill();

      // Text label
      atlasCtx.fillStyle = isDark
        ? isCode
          ? '#5CE1E6'
          : '#EDEDF2'
        : isCode
        ? '#0F172A'
        : '#064E3B';

      atlasCtx.fillText(item.label, drawX + (isCode ? 18 * dpr : 20 * dpr), dotY);
      atlasCtx.restore();

      map.set(item.id, {
        id: item.id,
        x: drawX,
        y: drawY,
        w: boxWidth,
        h: boxHeight,
      });

      currentY += boxHeight + padding;
    }

    atlasCanvasRef.current = atlasCanvas;
    atlasMapRef.current = map;
  };

  useEffect(() => {
    if (tier === 'off') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const isDark = theme === 'dark';
    const budget = EFFECTS_CONFIG.tierBudgets[tier];
    const intensity = EFFECTS_CONFIG.intensity;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, budget.maxDpr);

    // Build Atlas with current theme & dpr
    buildAtlas(isDark, dpr);

    // Resize Canvas handler
    const updateCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    updateCanvasSize();

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    resizeObserver.observe(document.body);

    // Initialize Tech Sprites
    const sprites: ActiveSprite[] = [];
    const layers: ('far' | 'mid' | 'near')[] = ['far', 'mid', 'near'];

    for (let i = 0; i < budget.sprites; i++) {
      const dataItem = TECH_SPRITES_DATA[i % TECH_SPRITES_DATA.length];
      const layer = layers[i % layers.length];

      let baseScale = 0.6;
      let opacity = AMBIENT_OPACITY.far.min * intensity;
      let depth = 0.35;
      let speedY = 0.15;

      if (layer === 'mid') {
        baseScale = 0.85;
        opacity = (AMBIENT_OPACITY.mid.min + AMBIENT_OPACITY.mid.max) * 0.5 * intensity;
        depth = 0.65;
        speedY = 0.28;
      } else if (layer === 'near') {
        baseScale = 1.15;
        opacity = (AMBIENT_OPACITY.near.min + AMBIENT_OPACITY.near.max) * 0.5 * intensity;
        depth = 1.0;
        speedY = 0.42;
      }

      sprites.push({
        atlasId: dataItem.id,
        layer,
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: 0,
        baseY: 0,
        pushX: 0,
        pushY: 0,
        pushRot: 0,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: speedY * (Math.random() * 0.4 + 0.8),
        scale: baseScale,
        opacity,
        depth,
      });
    }

    // Initialize Ambient Dust Particles
    const dustParticles: DustParticle[] = [];
    for (let i = 0; i < budget.dust; i++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: (Math.random() * 1.8 + 1) * dpr,
        speedY: Math.random() * 0.2 + 0.1,
        alpha: Math.random() * 0.3 + 0.15,
        seed: Math.random() * 100,
      });
    }

    // Initialize Network Nodes & Data Packets
    const networkNodes: NetworkNode[] = [];
    const nodeCount = budget.packetNodes;
    for (let i = 0; i < nodeCount; i++) {
      const isLeft = i % 2 === 0;
      networkNodes.push({
        x: isLeft ? 35 : width - 35,
        y: 120 + ((height - 240) / Math.max(1, nodeCount - 1)) * i,
        side: isLeft ? 'left' : 'right',
        flash: 0,
      });
    }

    const dataPackets: DataPacket[] = [];
    const packetColors = isDark
      ? ['#C8FF2E', '#5CE1E6', '#10B981']
      : ['#059669', '#0D9488', '#2563EB'];

    for (let i = 0; i < Math.floor(nodeCount * 0.8); i++) {
      const from = Math.floor(Math.random() * networkNodes.length);
      let to = Math.floor(Math.random() * networkNodes.length);
      if (to === from) to = (to + 1) % networkNodes.length;
      dataPackets.push({
        fromNode: from,
        toNode: to,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        color: packetColors[i % packetColors.length],
      });
    }

    // Comets Array
    const comets: Comet[] = [];
    let nextCometTime = performance.now() + (5000 + Math.random() * 4000);

    const spawnComet = () => {
      const startX = Math.random() * (width * 0.8) + width * 0.2;
      const startY = Math.random() * (height * 0.3) - 50;
      const speed = Math.random() * 7 + 8;
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.25;

      comets.push({
        x: startX,
        y: startY,
        vx: -Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: Math.random() * 110 + 90,
        color: isDark ? (Math.random() > 0.5 ? '#C8FF2E' : '#5CE1E6') : '#059669',
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 50 + 55,
      });
    };

    // Warp Streaks
    const warpStreaks: WarpStreak[] = [];
    const warpCount = 18;
    for (let i = 0; i < warpCount; i++) {
      const onLeft = i < warpCount / 2;
      warpStreaks.push({
        x: onLeft ? Math.random() * (width * 0.12) : width - Math.random() * (width * 0.12),
        y: Math.random() * height,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 4 + 6,
        alpha: 0,
      });
    }

    // Event Listeners: Mouse & Scroll
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -999;
      mouseRef.current.y = -999;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Single unified GSAP Ticker animation loop
    const tickerCallback = () => {
      if (document.hidden) return;

      const atlas = atlasCanvasRef.current;
      const map = atlasMapRef.current;
      if (!atlas) return;

      // 1. Read Unified Scroll Velocity directly from scrollState (Quy tắc 1)
      const smoothV = scrollState.smoothVelocity;
      const absV = Math.abs(smoothV);

      // Fast scrolling spawns comets quicker
      const now = performance.now();
      if (EFFECTS_CONFIG.flags.comets) {
        if (now >= nextCometTime || (absV > 8 && Math.random() < 0.04)) {
          spawnComet();
          const baseCooldown = absV > 6 ? 2200 : 5500;
          nextCometTime = now + (baseCooldown + Math.random() * 3500);
        }
      }

      // Clear Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 2. Render Backend Network Lines & Data Packets (Layer 1)
      if (EFFECTS_CONFIG.flags.packets && networkNodes.length > 1) {
        // Draw Faint Connection Lines
        ctx.save();
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.06)';
        ctx.lineWidth = 1 * dpr;
        ctx.setLineDash([4 * dpr, 6 * dpr]);

        for (let i = 0; i < networkNodes.length - 1; i++) {
          const n1 = networkNodes[i];
          const n2 = networkNodes[i + 1];
          ctx.beginPath();
          ctx.moveTo(n1.x * dpr, n1.y * dpr);
          ctx.lineTo(n2.x * dpr, n2.y * dpr);
          ctx.stroke();
        }
        ctx.restore();

        // Draw and Update Data Packets
        for (const pkt of dataPackets) {
          pkt.progress += pkt.speed + absV * 0.0003;
          if (pkt.progress >= 1) {
            pkt.progress = 0;
            networkNodes[pkt.toNode].flash = 1;
            pkt.fromNode = pkt.toNode;
            let nextTarget = Math.floor(Math.random() * networkNodes.length);
            if (nextTarget === pkt.fromNode) nextTarget = (nextTarget + 1) % networkNodes.length;
            pkt.toNode = nextTarget;
          }

          const nFrom = networkNodes[pkt.fromNode];
          const nTo = networkNodes[pkt.toNode];
          const px = (nFrom.x + (nTo.x - nFrom.x) * pkt.progress) * dpr;
          const py = (nFrom.y + (nTo.y - nFrom.y) * pkt.progress) * dpr;

          ctx.save();
          ctx.fillStyle = pkt.color;
          ctx.shadowColor = pkt.color;
          ctx.shadowBlur = 8 * dpr;
          ctx.beginPath();
          ctx.arc(px, py, 2.5 * dpr, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Draw Nodes
        for (const node of networkNodes) {
          ctx.save();
          const baseRadius = 3.5 * dpr;
          const currentRadius = baseRadius + node.flash * 3 * dpr;

          ctx.beginPath();
          ctx.arc(node.x * dpr, node.y * dpr, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? node.flash > 0.1
              ? '#C8FF2E'
              : 'rgba(255, 255, 255, 0.25)'
            : node.flash > 0.1
            ? '#059669'
            : 'rgba(15, 23, 42, 0.25)';
          ctx.fill();

          if (node.flash > 0) {
            node.flash *= 0.88;
            if (node.flash < 0.02) node.flash = 0;
          }
          ctx.restore();
        }
      }

      // 3. Render Ambient Dust Particles
      if (EFFECTS_CONFIG.flags.dust && dustParticles.length > 0) {
        ctx.save();
        for (const p of dustParticles) {
          p.y += p.speedY + absV * 0.02;
          p.x += Math.sin(p.seed + now * 0.001) * 0.25;

          if (p.y > height) {
            p.y = -10;
            p.x = Math.random() * width;
          }

          ctx.fillStyle = isDark
            ? `rgba(200, 255, 46, ${p.alpha * intensity})`
            : `rgba(5, 150, 105, ${p.alpha * 0.8 * intensity})`;
          ctx.beginPath();
          ctx.arc(p.x * dpr, p.y * dpr, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // 4. Render Tech Sprites (Far, Mid, Near)
      if (EFFECTS_CONFIG.flags.techSprites && sprites.length > 0) {
        const mouseX = mouseRef.current.x;
        const mouseY = mouseRef.current.y;
        const repulsionRadius = 140;

        for (const sprite of sprites) {
          const spriteData = map.get(sprite.atlasId);
          if (!spriteData) continue;

          // Parallax movement with scroll
          sprite.y += sprite.speedY - smoothV * sprite.depth * 0.18;
          sprite.x += sprite.speedX;

          // Loop boundaries
          if (sprite.y < -60) sprite.y = height + 50;
          if (sprite.y > height + 60) sprite.y = -50;
          if (sprite.x < -100) sprite.x = width + 90;
          if (sprite.x > width + 100) sprite.x = -90;

          // Elastic Mouse Repulsion
          if (mouseX > 0 && mouseY > 0) {
            const dx = sprite.x - mouseX;
            const dy = sprite.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < repulsionRadius && dist > 1) {
              const force = (1 - dist / repulsionRadius) * 32 * sprite.depth;
              sprite.pushX += (dx / dist) * force;
              sprite.pushY += (dy / dist) * force;
              sprite.pushRot += (dx / dist) * 0.12;
            }
          }

          // Damped spring return
          sprite.pushX *= 0.92;
          sprite.pushY *= 0.92;
          sprite.pushRot *= 0.90;

          const renderX = (sprite.x + sprite.pushX) * dpr;
          const renderY = (sprite.y + sprite.pushY) * dpr;

          // Velocity tilt & vertical stretch
          const rot = sprite.pushRot - smoothV * 0.0018 * sprite.depth;
          const stretchY = 1 + Math.min(absV * 0.008 * sprite.depth, 0.35);

          const targetW = spriteData.w * sprite.scale;
          const targetH = spriteData.h * sprite.scale * stretchY;

          ctx.save();
          ctx.globalAlpha = Math.min(1, Math.max(0.04, sprite.opacity));
          ctx.translate(renderX, renderY);
          if (rot !== 0) ctx.rotate(rot);

          // Subtle blur on near layer
          if (sprite.layer === 'near') {
            ctx.shadowColor = isDark ? 'rgba(200, 255, 46, 0.25)' : 'rgba(5, 150, 105, 0.2)';
            ctx.shadowBlur = 6 * dpr;
          }

          ctx.drawImage(
            atlas,
            spriteData.x,
            spriteData.y,
            spriteData.w,
            spriteData.h,
            -targetW / 2,
            -targetH / 2,
            targetW,
            targetH
          );

          ctx.restore();
        }
      }

      // 5. Render Comets (Sao băng)
      if (EFFECTS_CONFIG.flags.comets && comets.length > 0) {
        for (let i = comets.length - 1; i >= 0; i--) {
          const comet = comets[i];
          comet.x += comet.vx;
          comet.y += comet.vy;
          comet.life++;

          const progress = comet.life / comet.maxLife;
          comet.alpha = 1 - progress;

          if (comet.life >= comet.maxLife || comet.x < -200 || comet.y > height + 200) {
            comets.splice(i, 1);
            continue;
          }

          const tailX = comet.x - (comet.vx / 10) * comet.length;
          const tailY = comet.y - (comet.vy / 10) * comet.length;

          const grad = ctx.createLinearGradient(
            tailX * dpr,
            tailY * dpr,
            comet.x * dpr,
            comet.y * dpr
          );
          grad.addColorStop(0, 'rgba(0,0,0,0)');
          grad.addColorStop(1, comet.color);

          ctx.save();
          ctx.globalAlpha = comet.alpha * intensity;
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2 * dpr;
          ctx.shadowColor = comet.color;
          ctx.shadowBlur = 10 * dpr;
          ctx.beginPath();
          ctx.moveTo(tailX * dpr, tailY * dpr);
          ctx.lineTo(comet.x * dpr, comet.y * dpr);
          ctx.stroke();

          // Bright head point
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(comet.x * dpr, comet.y * dpr, 2.5 * dpr, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // 6. Render Warp Speed Streaks
      if (EFFECTS_CONFIG.flags.warp) {
        const warpActive = absV > 2.0;
        const warpDirection = smoothV >= 0 ? 1 : -1;

        for (const streak of warpStreaks) {
          if (warpActive) {
            streak.alpha = Math.min(0.7, streak.alpha + 0.08);
            streak.y += streak.speed * warpDirection * (absV * 0.15);
          } else {
            streak.alpha = Math.max(0, streak.alpha - 0.05);
          }

          if (streak.y > height + 80) streak.y = -70;
          if (streak.y < -80) streak.y = height + 70;

          if (streak.alpha > 0.01) {
            ctx.save();
            ctx.globalAlpha = streak.alpha * intensity;
            ctx.strokeStyle = isDark ? '#C8FF2E' : '#059669';
            ctx.lineWidth = 1.2 * dpr;
            ctx.beginPath();
            ctx.moveTo(streak.x * dpr, streak.y * dpr);
            ctx.lineTo(streak.x * dpr, (streak.y + streak.length * warpDirection) * dpr);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // 7. Render Spaceship Exhaust Trail (Item 2: vẽ trực tiếp trên canvas này)
      if (spaceshipTrailQueue.length > 0) {
        for (let i = spaceshipTrailQueue.length - 1; i >= 0; i--) {
          const ex = spaceshipTrailQueue[i];
          ex.x += ex.vx;
          ex.y += ex.vy;
          ex.alpha *= 0.88;
          ex.size *= 0.93;

          if (ex.alpha < 0.02) {
            spaceshipTrailQueue.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(ex.x * dpr, ex.y * dpr, ex.size * dpr, 0, Math.PI * 2);
          ctx.fillStyle = ex.color;
          ctx.globalAlpha = ex.alpha * intensity;
          ctx.shadowColor = ex.color;
          ctx.shadowBlur = 8 * dpr;
          ctx.fill();
          ctx.restore();
        }
      }
    };

    // Register single GSAP ticker callback
    gsap.ticker.add(tickerCallback);

    return () => {
      gsap.ticker.remove(tickerCallback);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme, tier]);

  if (tier === 'off') return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] select-none"
    />
  );
};
