import React, { useState, useEffect, useCallback } from 'react';
import { Terminal, Check, Zap, FastForward } from 'lucide-react';

interface BootLoaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  { text: 'system.init() -> Loading kernel v6.12-linh...', delay: 100 },
  { text: 'export STACK = [React 19, Laravel, Node.js, Redis, Docker]', delay: 280 },
  { text: 'mount /dev/payments --endpoints=vnpay,zalopay --ipn=verified', delay: 460 },
  { text: 'auth.verify(RBAC, JWT, Google_OAuth) -> status: 200 OK', delay: 640 },
  { text: 'building event_handler.service -> hotel_operations [READY]', delay: 820 },
  { text: 'compiling portfolio visual matrix [##########] 100%', delay: 1000 },
  { text: 'boot sequence complete. Launching workspace...', delay: 1180 },
];

export const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [counter, setCounter] = useState(0);
  const [isSplitting, setIsSplitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Check sessionStorage
  useEffect(() => {
    try {
      const alreadyBooted = sessionStorage.getItem('pvl_booted');
      if (alreadyBooted === 'true') {
        setIsDone(true);
        onComplete();
        return;
      }
    } catch {
      // ignore storage restriction
    }
  }, [onComplete]);

  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem('pvl_booted', 'true');
    } catch {
      // ignore
    }
    setIsSplitting(true);
    setTimeout(() => {
      setIsDone(true);
      onComplete();
    }, 700); // Duration of the split curtain
  }, [onComplete]);

  // Sequential log printing & counter
  useEffect(() => {
    if (isDone) return;

    // Log lines schedule
    const timeouts = BOOT_LOGS.map((item) => {
      return setTimeout(() => {
        setLogs((prev) => [...prev, item.text]);
      }, item.delay);
    });

    // 0 to 100 counter interval
    const counterInterval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(counterInterval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 45);

    // Auto-finish after 1.5s
    const endTimeout = setTimeout(() => {
      finishBoot();
    }, 1500);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(counterInterval);
      clearTimeout(endTimeout);
    };
  }, [isDone, finishBoot]);

  // Keyboard skip on Esc or Space or Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        finishBoot();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [finishBoot]);

  if (isDone) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={finishBoot}
      className="fixed inset-0 z-99999 flex cursor-pointer select-none overflow-hidden bg-transparent"
    >
      {/* Left Curtain Panel */}
      <div
        className={`relative flex h-full w-1/2 flex-col justify-between border-r border-[#C8FF2E]/20 bg-[#07070B] transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isSplitting ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="p-8 sm:p-12 font-mono text-xs text-[#8A8A9A]">
          <div className="flex items-center space-x-2 text-[#C8FF2E]">
            <Terminal className="h-4 w-4" />
            <span className="font-bold tracking-widest uppercase">PL_OS // BOOT_LOADER_v1.0</span>
          </div>
          <div className="mt-8 space-y-2 text-[11px] sm:text-xs">
            {logs.slice(0, Math.ceil(logs.length / 2)).map((msg, i) => (
              <div key={i} className="flex items-center space-x-2 text-[#EDEDF2]">
                <Check className="h-3 w-3 text-[#C8FF2E] shrink-0" />
                <span className="font-mono">{msg}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 sm:p-12 font-mono text-[11px] text-[#8A8A9A]">
          <span className="text-[#C8FF2E]">&gt;</span> MEM_ALLOC: 64MB / CACHE: REDIS
        </div>
      </div>

      {/* Right Curtain Panel */}
      <div
        className={`relative flex h-full w-1/2 flex-col justify-between border-l border-[#C8FF2E]/20 bg-[#07070B] transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isSplitting ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="flex items-center justify-end p-8 sm:p-12">
          {/* Skip button pill */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              finishBoot();
            }}
            className="flex items-center space-x-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-[#8A8A9A] hover:border-[#C8FF2E] hover:text-[#C8FF2E] transition-colors"
          >
            <span>Skip [ESC]</span>
            <FastForward className="h-3 w-3" />
          </button>
        </div>

        {/* Center Progress Counter in Right Panel */}
        <div className="px-8 sm:px-12 py-4">
          <div className="flex items-baseline justify-end space-x-3">
            <span className="font-syne text-5xl sm:text-7xl font-extrabold text-[#EDEDF2]">
              {counter}
            </span>
            <span className="font-mono text-xl sm:text-2xl font-bold text-[#C8FF2E]">%</span>
          </div>
          <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C8FF2E] to-[#5CE1E6] transition-all duration-75"
              style={{ width: `${counter}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between font-mono text-[10px] text-[#8A8A9A]">
            <span>PHAN_VU_LINH.WORKSPACE</span>
            <span>READY_SIGNAL: 1.0</span>
          </div>
        </div>

        <div className="p-8 sm:p-12 text-right font-mono text-[11px] text-[#8A8A9A]">
          <span className="inline-flex items-center space-x-1.5 text-[#5CE1E6]">
            <Zap className="h-3.5 w-3.5 animate-pulse" />
            <span>CLICK TO UNLOCK</span>
          </span>
        </div>
      </div>
    </div>
  );
};
