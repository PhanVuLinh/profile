/**
 * Design Tokens: Ngôn ngữ chuyển động chuẩn Awwwards/FWA
 * Tập trung hóa easing, duration, stagger và physics constants.
 */

export const MOTION = {
  // GSAP & CSS Curves
  ease: {
    // Xuất hiện (Enter)
    enter: 'expo.out',
    enterCss: 'cubic-bezier(0.16, 1, 0.3, 1)',

    // Rời đi (Exit)
    exit: 'power2.in',
    exitCss: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',

    // Di chuyển & chuyển cảnh (Transition)
    transition: 'power3.inOut',
    transitionCss: 'cubic-bezier(0.65, 0, 0.35, 1)',

    // Vui nhộn (Bounce / Elastic physics cho chữ hero & footer)
    bounce: 'back.out(1.7)',
    bounceCss: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    elastic: 'elastic.out(1, 0.5)',

    // Tuyến tính chỉ cho Marquee
    linear: 'linear',
  },

  // Thời lượng chuẩn (giây)
  duration: {
    micro: 0.25,     // 0.2 - 0.35s: Hover, ripple, icon pop
    reveal: 0.85,    // 0.7 - 1.0s: Title & section reveal
    transition: 1.2, // 1.0 - 1.4s: Page / large element transitions
    loader: 1.6,     // <= 2.0s: Boot sequence loader
  },

  // Độ trễ so le (Stagger)
  stagger: {
    letters: 0.04, // 0.03 - 0.05s: Từng ký tự
    lines: 0.09,   // 0.08 - 0.12s: Từng dòng text
    cards: 0.12,   // Từng card dự án / skill
  },

  // Hệ số nội suy quán tính (Lerp factor)
  lerp: {
    cursor: 0.16,  // Con trỏ chuột theo sau
    spring: 0.12,  // Vật lý hạt & chữ
    scroll: 0.09,  // Quán tính cuộn mượt
  },
} as const;

/**
 * Utility: Tuyến tính nội suy (Linear Interpolation)
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Utility: Tính khoảng cách Euclidean 2D
 */
export function getDistance2D(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

