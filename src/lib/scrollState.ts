/**
 * Single Source of Truth for Global Scroll State
 * Driven directly by Lenis inside the single unified gsap.ticker.
 * AmbientLayer, BackgroundMarquee, ScrollCompanion, and FlyingLetters all read from here.
 */

export interface ScrollState {
  progress: number;       // 0 to 1
  scrollY: number;        // current scroll position in px
  velocity: number;       // raw delta
  smoothVelocity: number; // smoothed lerped velocity
  direction: 1 | -1 | 0;  // 1 = down, -1 = up, 0 = stationary
  isScrolling: boolean;
}

export const scrollState: ScrollState = {
  progress: 0,
  scrollY: 0,
  velocity: 0,
  smoothVelocity: 0,
  direction: 1,
  isScrolling: false,
};

/**
 * Spaceship Exhaust particle queue
 * Emitted by ScrollCompanion, rendered by AmbientLayer on its single canvas.
 */
export interface SpaceshipExhaust {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

export const spaceshipTrailQueue: SpaceshipExhaust[] = [];

export function pushSpaceshipExhaust(exhaust: SpaceshipExhaust): void {
  if (spaceshipTrailQueue.length < 90) {
    spaceshipTrailQueue.push(exhaust);
  }
}

/**
 * Real-time Spaceship position & heading
 */
export interface SpaceshipPose {
  x: number;
  y: number;
  angle: number;
  active: boolean;
}

export const spaceshipPose: SpaceshipPose = {
  x: -100,
  y: -100,
  angle: 0,
  active: false,
};

let lastY = 0;
let stopTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * Update scroll state on each ticker tick
 */
export function updateGlobalScrollState(currentY: number, maxScroll: number): void {
  const delta = currentY - lastY;
  lastY = currentY;

  scrollState.scrollY = currentY;
  scrollState.progress = maxScroll > 0 ? Math.min(1, Math.max(0, currentY / maxScroll)) : 0;
  scrollState.velocity = delta;

  // Damped smoothing
  scrollState.smoothVelocity += (delta - scrollState.smoothVelocity) * 0.15;

  if (Math.abs(delta) > 0.05) {
    scrollState.direction = delta >= 0 ? 1 : -1;
    scrollState.isScrolling = true;

    if (stopTimeout) clearTimeout(stopTimeout);
    stopTimeout = setTimeout(() => {
      scrollState.isScrolling = false;
      scrollState.velocity = 0;
    }, 100);
  }
}
