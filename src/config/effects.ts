/**
 * Configuration Module for Ambient & Global Effects
 * Can be tuned at runtime or toggled via Quality Governor & Navbar
 */

export type QualityTier = 'high' | 'medium' | 'low' | 'off';

/**
 * Opacity ranges for the 3 depth layers of tech sprites.
 * Multiply with EFFECTS_CONFIG.intensity to adjust overall brightness.
 */
export const AMBIENT_OPACITY = {
  far: { min: 0.10, max: 0.18 },
  mid: { min: 0.16, max: 0.26 },
  near: { min: 0.12, max: 0.22 },
} as const;

export interface EffectsConfig {
  /**
   * Master intensity coefficient (0.0 to 1.0)
   * Easily adjust all opacity and visual density from here.
   */
  intensity: number;

  /**
   * Feature flags to independently toggle every effect module
   */
  flags: {
    techSprites: boolean;
    comets: boolean;
    packets: boolean;
    warp: boolean;
    dust: boolean;
    cursorTrail: boolean;
    clickBurst: boolean;
    spaceship: boolean;
    flyingLetters: boolean;
    orbitTags: boolean;
    velocityMarquee: boolean;
  };

  /**
   * Quantities per quality tier
   */
  tierBudgets: Record<
    QualityTier,
    {
      sprites: number;
      dust: number;
      packetNodes: number;
      maxDpr: number;
    }
  >;
}

export const EFFECTS_CONFIG: EffectsConfig = {
  // Master visual intensity: 0 (invisible) to 1.0 (full visual fidelity)
  intensity: 1.0,

  flags: {
    techSprites: true,
    comets: true,
    packets: true,
    warp: true,
    dust: true,
    cursorTrail: true,
    clickBurst: true,
    spaceship: true,
    flyingLetters: true,
    orbitTags: true,
    velocityMarquee: true,
  },

  tierBudgets: {
    high: {
      sprites: 28,
      dust: 16,
      packetNodes: 6,
      maxDpr: 2.0,
    },
    medium: {
      sprites: 14,
      dust: 8,
      packetNodes: 4,
      maxDpr: 1.5,
    },
    low: {
      sprites: 6,
      dust: 0,
      packetNodes: 2,
      maxDpr: 1.0,
    },
    off: {
      sprites: 0,
      dust: 0,
      packetNodes: 0,
      maxDpr: 1.0,
    },
  },
};

/**
 * Tech sprites definitions: Real icons and code snippets from Linh's stack
 */
export const TECH_SPRITES_DATA = [
  // Tech Logos
  { id: 'react', label: 'React 19', type: 'tech' as const },
  { id: 'laravel', label: 'Laravel', type: 'tech' as const },
  { id: 'node', label: 'Node.js', type: 'tech' as const },
  { id: 'mysql', label: 'MySQL', type: 'tech' as const },
  { id: 'mongodb', label: 'MongoDB', type: 'tech' as const },
  { id: 'redis', label: 'Redis', type: 'tech' as const },
  { id: 'docker', label: 'Docker', type: 'tech' as const },
  { id: 'git', label: 'Git / Gitea', type: 'tech' as const },
  { id: 'tailwind', label: 'Tailwind CSS', type: 'tech' as const },
  { id: 'ts', label: 'TypeScript', type: 'tech' as const },
  { id: 'vite', label: 'Vite', type: 'tech' as const },

  // Code Snippets
  { id: 'code_div', label: '<div />', type: 'code' as const },
  { id: 'code_obj', label: '{ ...props }', type: 'code' as const },
  { id: 'code_arrow', label: '() => void', type: 'code' as const },
  { id: 'code_sql', label: 'SELECT * FROM bookings', type: 'code' as const },
  { id: 'code_git', label: 'git push origin main', type: 'code' as const },
  { id: 'code_200', label: '200 OK', type: 'code' as const },
  { id: 'code_npm', label: 'npm run dev', type: 'code' as const },
  { id: 'code_vnpay', label: 'VNPay.createPaymentUrl()', type: 'code' as const },
  { id: 'code_async', label: 'async/await', type: 'code' as const },
  { id: 'code_auth', label: 'Bearer eyJhbGci...', type: 'code' as const },
];
