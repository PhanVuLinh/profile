import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowDown,
  Mail,
  Phone,
  FileDown,
  FileText,
  Terminal,
  Clock,
  Code2,
  Rocket,
  CreditCard,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { profileData, CV_URL, HERO_ROLES, TLDR_CHIPS } from '../../data/profile';
import { copyRecruiterBrief } from '../../data/recruiterBrief';
import { useLanguage } from '../../context/LanguageContext';
import { useTextScramble } from '../../hooks/useTextScramble';
import { useMagnetic } from '../../hooks/useMagnetic';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useToast } from '../common/Toast';
import { GithubIcon, ZaloIcon } from '../common/Icons';
import { CVModal } from '../common/CVModal';

export const HeroSection: React.FC = () => {
  const { lang } = useLanguage();
  const { showToast } = useToast();
  const reducedMotion = useReducedMotion();
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  // Roles cycling with text scramble
  const scrambledRole = useTextScramble(HERO_ROLES[lang], 3600);

  // Magnetic CTA buttons
  const magneticProjectsRef = useMagnetic<HTMLAnchorElement>({ strength: 0.35 });
  const magneticCvRef = useMagnetic<HTMLAnchorElement>({ strength: 0.35 });

  // Real-time Ho Chi Minh City Clock (Asia/Ho_Chi_Minh)
  const [hcmcTime, setHcmcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setHcmcTime(`${formatted} GMT+7`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Split Name Letters Physics Simulation with Unicode NFC Normalization
  const rawName = useMemo(() => {
    return (profileData.name || 'Phan Vũ Linh').normalize('NFC').toUpperCase();
  }, []);

  const words = useMemo(() => rawName.split(' '), [rawName]);

  // Pre-calculate word and letter structures with global sequential indices
  const wordData = useMemo(() => {
    let offset = 0;
    return words.map((word) => {
      const chars = word.split('').map((char, charIdx) => {
        return { char, globalIndex: offset + charIdx };
      });
      offset += word.length;
      return { word, chars };
    });
  }, [words]);

  const totalLetters = useMemo(() => {
    return wordData.reduce((acc, w) => acc + w.chars.length, 0);
  }, [wordData]);

  // Refs for each letter element to calculate cursor distance
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [charWeights, setCharWeights] = useState<number[]>(() =>
    Array(12).fill(700)
  );
  const [clickedCharIndex, setClickedCharIndex] = useState<number | null>(null);
  const heroContainerRef = useRef<HTMLElement | null>(null);

  // Mouse distance -> Variable font weight lerp
  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const newWeights = Array.from({ length: totalLetters }, (_, i) => {
          const el = letterRefs.current[i];
          if (!el) return 700;

          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const dx = mouseX - centerX;
          const dy = mouseY - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 200; // Radius of influence
          if (dist < maxDist) {
            const proximity = 1 - dist / maxDist; // 0 to 1
            // Interpolate font weight between 700 and 900
            return Math.round(700 + proximity * 200);
          }
          return 700;
        });

        setCharWeights(newWeights);
      });
    };

    const handleMouseLeave = () => {
      setCharWeights(Array(totalLetters).fill(700));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [totalLetters, reducedMotion]);

  const handleCharClick = (index: number) => {
    setClickedCharIndex(index);
    setTimeout(() => {
      setClickedCharIndex(null);
    }, 450);
  };

  const handleCopyContact = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(
      lang === 'vi'
        ? `Đã sao chép ${label} vào bộ nhớ tạm!`
        : `Copied ${label} to clipboard!`
    );
  };

  return (
    <section
      ref={heroContainerRef}
      id="hero"
      aria-label="Hero Section"
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24"
    >
      {/* Hero Central Content */}
      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Status Badge: Open To Work + Live HCMC Clock */}
          <div className="mb-8 inline-flex flex-wrap items-center justify-center gap-2.5 rounded-full border border-slate-200/90 bg-white/90 pl-2 pr-4 py-1.5 font-mono text-xs text-slate-800 shadow-sm backdrop-blur-xl dark:border-[#C8FF2E]/30 dark:bg-[#101018]/90 dark:text-[#EDEDF2] dark:shadow-[0_0_25px_rgba(200,255,46,0.15)]">
            <div className="relative h-7 w-7 overflow-hidden rounded-full border border-emerald-500/50 shadow-xs dark:border-[#C8FF2E]/60 dark:shadow-[0_0_8px_rgba(200,255,46,0.4)] shrink-0">
              <img
                src="/avatar.png"
                alt="Phan Vũ Linh"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/avatar.svg.png';
                }}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-bold text-emerald-700 dark:text-[#C8FF2E]">
              OPEN TO WORK
            </span>
            <span className="text-slate-400 dark:text-[#8A8A9A]">•</span>
            <span className="text-slate-600 dark:text-[#8A8A9A] font-medium">Fullstack / Backend Developer</span>
            <span className="text-slate-400 dark:text-[#8A8A9A]">•</span>
            <span className="flex items-center space-x-1 text-slate-700 dark:text-[#5CE1E6]">
              <Clock className="h-3 w-3 text-emerald-600 dark:text-[#5CE1E6]" />
              <span>{hcmcTime || 'TP.HCM (GMT+7)'}</span>
            </span>
          </div>

          {/* Huge Splitting Name Headline with Dual-Layer CSS Grid & Word Protection */}
          <h1
            aria-label={rawName}
            className="hero-name-headline relative font-syne uppercase tracking-tight text-slate-950 dark:text-[#EDEDF2] select-none flex flex-wrap justify-center items-center pt-4 sm:pt-6 md:pt-8 pb-2 overflow-visible"
          >
            {wordData.map((wordObj, wordIdx) => (
              <React.Fragment key={wordIdx}>
                {/* On mobile (< 768px), guarantee clean break between "PHAN VŨ" and "LINH" */}
                {wordIdx === 2 && (
                  <div className="w-full md:hidden h-0" aria-hidden="true" />
                )}

                {/* Word Container: Never breaks mid-word */}
                <span className="inline-flex whitespace-nowrap items-center overflow-visible">
                  {wordObj.chars.map((charObj) => {
                    const isClicked = clickedCharIndex === charObj.globalIndex;
                    const currentWeight = charWeights[charObj.globalIndex] || 700;
                    const isHeavy = currentWeight > 760;

                    return (
                      <span
                        key={charObj.globalIndex}
                        className="inline-grid grid-cols-1 grid-rows-1 place-items-center relative select-none overflow-visible py-1"
                      >
                        {/* 1. Ghost Layer: Dictates invariant letter width at maximum font-weight (900) */}
                        <span
                          aria-hidden="true"
                          className="invisible pointer-events-none select-none col-start-1 row-start-1"
                          style={{
                            fontWeight: 900,
                          }}
                        >
                          {charObj.char}
                        </span>

                        {/* 2. Live Layer: Dynamically updates font-weight with cursor physics */}
                        <span
                          ref={(el) => {
                            letterRefs.current[charObj.globalIndex] = el;
                          }}
                          aria-hidden="true"
                          onClick={() => handleCharClick(charObj.globalIndex)}
                          className={`col-start-1 row-start-1 cursor-pointer transition-all duration-150 overflow-visible ${
                            isClicked
                              ? '-translate-y-8 scale-130 text-emerald-600 dark:text-[#C8FF2E] rotate-6'
                              : isHeavy
                              ? '-translate-y-3 scale-110 text-emerald-700 dark:text-[#C8FF2E]'
                              : 'text-slate-950 hover:-translate-y-4 hover:scale-115 hover:text-emerald-600 dark:text-[#EDEDF2] dark:hover:text-[#5CE1E6]'
                          }`}
                          style={{
                            fontWeight: currentWeight,
                            // Load drop animation & idle float
                            animation: reducedMotion
                              ? 'none'
                              : `dropBounce 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${charObj.globalIndex * 0.05}s backwards, sineFloat 4.2s ease-in-out infinite ${charObj.globalIndex * 0.14}s`,
                          }}
                        >
                          {charObj.char}
                        </span>
                      </span>
                    );
                  })}
                </span>

                {/* Space between words if not the last word */}
                {wordIdx < wordData.length - 1 && (
                  <span
                    className={`inline-block select-none ${
                      wordIdx === 1
                        ? 'hidden md:inline-block w-[0.28em] sm:w-[0.32em]'
                        : 'w-[0.28em] sm:w-[0.32em]'
                    }`}
                    aria-hidden="true"
                  >
                    &nbsp;
                  </span>
                )}
              </React.Fragment>
            ))}
          </h1>

          {/* Cycling Roles via Text Scramble */}
          <div className="mt-6 flex min-h-[48px] items-center justify-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-[#C8FF2E]/10 dark:text-[#C8FF2E] dark:border-[#C8FF2E]/20">
              <Terminal className="h-4 w-4" />
            </div>
            <span className="font-mono text-lg sm:text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-950 dark:from-[#C8FF2E] dark:via-[#5CE1E6] dark:to-[#EDEDF2]">
              {scrambledRole}
            </span>
            <span className="inline-block h-6 w-2.5 animate-pulse bg-emerald-600 dark:bg-[#C8FF2E]" />
          </div>

          {/* Short Editorial Pitch */}
          <p className="mt-6 max-w-2xl font-sans text-sm sm:text-base md:text-lg text-slate-700 dark:text-[#8A8A9A] leading-relaxed font-normal">
            {profileData.heroPitch[lang]}
          </p>

          {/* 3 Action CTA Buttons: Explore Projects, Preview CV, Download CV */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {/* View Projects Magnetic Button */}
            <a
              ref={magneticProjectsRef}
              href="#projects"
              className="group relative inline-flex items-center space-x-3 overflow-hidden rounded-xl bg-slate-950 px-7 py-4 font-mono text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-slate-800 hover:scale-105 active:scale-95 dark:bg-[#C8FF2E] dark:text-[#07070B] dark:shadow-[0_0_25px_rgba(200,255,46,0.3)] dark:hover:shadow-[0_0_40px_rgba(200,255,46,0.6)] cursor-pointer"
            >
              <span className="relative z-10 font-bold uppercase tracking-wider">
                {lang === 'vi' ? 'Xem dự án của tôi' : 'Explore My Projects'}
              </span>
              <ArrowDown className="relative z-10 h-4 w-4 transition-transform group-hover:translate-y-1" />
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>

            {/* Xem CV trực tiếp (Modal Previewer) - High Contrast in Both Modes */}
            <button
              onClick={() => setIsCVModalOpen(true)}
              className="group relative inline-flex items-center space-x-2.5 overflow-hidden rounded-xl border-2 border-slate-900 bg-white px-6 py-4 font-mono text-xs sm:text-sm font-bold text-slate-950 shadow-sm backdrop-blur-xl transition-all duration-200 hover:bg-slate-900 hover:text-white active:scale-95 cursor-pointer dark:border-[#C8FF2E]/60 dark:bg-[#101018] dark:text-[#C8FF2E] dark:hover:bg-[#C8FF2E]/20 dark:shadow-[0_0_20px_rgba(200,255,46,0.15)]"
            >
              <FileText className="h-4 w-4 text-slate-950 group-hover:text-white dark:text-[#C8FF2E]" />
              <span className="uppercase tracking-wider">
                {lang === 'vi' ? 'Xem CV trực tiếp' : 'Preview CV'}
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>

            {/* Tải CV (PDF) trực tiếp */}
            <a
              ref={magneticCvRef}
              href={CV_URL}
              download="CV_PhanVuLinh_FullstackDeveloper.pdf"
              className="group relative inline-flex items-center space-x-2.5 overflow-hidden rounded-xl border border-slate-300 bg-slate-100 px-6 py-4 font-mono text-xs sm:text-sm font-semibold text-slate-800 backdrop-blur-xl transition-all duration-200 hover:bg-slate-200 hover:text-slate-950 active:scale-95 dark:border-white/15 dark:bg-[#101018]/80 dark:text-[#EDEDF2] dark:hover:border-[#5CE1E6] dark:hover:text-[#5CE1E6] cursor-pointer"
            >
              <FileDown className="h-4 w-4 text-emerald-700 dark:text-[#5CE1E6] transition-transform group-hover:-translate-y-0.5" />
              <span className="uppercase tracking-wider">
                {lang === 'vi' ? 'Tải CV (PDF)' : 'Download PDF'}
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
          </div>

          {/* Social Quick Links with Gentle Hover Lift */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-slate-700 dark:text-[#8A8A9A]">
            <a
              href={profileData.contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex items-center space-x-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 hover:border-slate-400 hover:text-slate-950 transition-all hover:-translate-y-0.5 shadow-xs dark:border-white/10 dark:bg-white/5 dark:hover:border-[#C8FF2E] dark:hover:text-[#C8FF2E]"
            >
              <GithubIcon className="h-4 w-4 text-slate-900 dark:text-[#EDEDF2]" />
              <span>github.com/PhanVuLinh</span>
            </a>

            <button
              onClick={() => handleCopyContact(profileData.contact.email, 'Email')}
              title={lang === 'vi' ? 'Nhấn để sao chép email' : 'Click to copy email'}
              className="flex items-center space-x-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 hover:border-emerald-600 hover:text-emerald-700 transition-all hover:-translate-y-0.5 shadow-xs cursor-pointer dark:border-white/10 dark:bg-white/5 dark:hover:border-[#5CE1E6] dark:hover:text-[#5CE1E6]"
            >
              <Mail className="h-4 w-4 text-emerald-600 dark:text-[#5CE1E6]" />
              <span>{profileData.contact.email}</span>
            </button>

            <button
              onClick={() =>
                handleCopyContact(
                  profileData.contact.phone,
                  lang === 'vi' ? 'Số điện thoại' : 'Phone'
                )
              }
              title={lang === 'vi' ? 'Nhấn để sao chép SĐT' : 'Click to copy phone'}
              className="flex items-center space-x-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 hover:border-rose-600 hover:text-rose-700 transition-all hover:-translate-y-0.5 shadow-xs cursor-pointer dark:border-white/10 dark:bg-white/5 dark:hover:border-[#FF6B4A] dark:hover:text-[#FF6B4A]"
            >
              <Phone className="h-4 w-4 text-rose-600 dark:text-[#FF6B4A]" />
              <span>{profileData.contact.phone}</span>
            </button>

            {/* Direct Zalo Quick Contact */}
            <a
              href={profileData.contact.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={lang === 'vi' ? 'Nhắn tin Zalo trực tiếp: 0343842424' : 'Chat via Zalo: 0343842424'}
              className="flex items-center space-x-2 rounded-lg border border-blue-500/30 bg-blue-50/70 px-3.5 py-2 font-semibold text-blue-700 hover:border-blue-500 hover:bg-blue-100 transition-all hover:-translate-y-0.5 shadow-xs cursor-pointer dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
            >
              <ZaloIcon className="h-4 w-4 shrink-0" />
              <span>Zalo: {profileData.contact.phone}</span>
            </a>

            {/* Quick HR / Recruiter Candidate Brief (Recruiter Utility) */}
            <button
              onClick={() => copyRecruiterBrief(lang, showToast)}
              title={
                lang === 'vi'
                  ? 'Sao chép tóm tắt ứng viên định dạng Markdown gửi cho HR / Tech Lead'
                  : 'Copy markdown brief for HR / Tech Lead'
              }
              className="flex items-center space-x-2 rounded-lg border border-emerald-500/30 bg-emerald-50/70 px-3.5 py-2 font-semibold text-emerald-800 hover:border-emerald-600 hover:bg-emerald-100 transition-all hover:-translate-y-0.5 shadow-xs cursor-pointer dark:border-[#C8FF2E]/30 dark:bg-[#C8FF2E]/10 dark:text-[#C8FF2E] dark:hover:bg-[#C8FF2E]/20"
            >
              <Sparkles className="h-4 w-4 text-emerald-600 dark:text-[#C8FF2E] animate-pulse" />
              <span>{lang === 'vi' ? 'Copy Brief cho HR' : 'Copy Recruiter Brief'}</span>
            </button>
          </div>

          {/* Recruiter-First TL;DR 3-Chip Strip (Nguyên tắc cốt lõi 2) */}
          <div className="mt-10 w-full max-w-4xl">
            <div className="mb-2.5 flex items-center justify-center space-x-2 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-[#8A8A9A]">
              <span className="h-1 w-1 rounded-full bg-emerald-600 dark:bg-[#C8FF2E]" />
              <span>RECRUITER TL;DR // KEY TAKEAWAYS</span>
              <span className="h-1 w-1 rounded-full bg-emerald-600 dark:bg-[#C8FF2E]" />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {TLDR_CHIPS.map((chip, idx) => {
                const icon =
                  chip.id === 'stack' ? (
                    <Code2 className="h-4 w-4 text-emerald-600 dark:text-[#C8FF2E]" />
                  ) : chip.id === 'deployed' ? (
                    <Rocket className="h-4 w-4 text-teal-600 dark:text-[#5CE1E6]" />
                  ) : (
                    <CreditCard className="h-4 w-4 text-emerald-600 dark:text-[#C8FF2E]" />
                  );

                return (
                  <a
                    key={idx}
                    href={chip.href}
                    className="group relative flex flex-col items-start justify-between rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-slate-400 hover:shadow-md dark:border-white/10 dark:bg-[#101018]/90 dark:hover:border-[#C8FF2E]/50 dark:hover:shadow-[0_0_20px_rgba(200,255,46,0.12)] cursor-pointer"
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center space-x-1.5 font-mono text-[10px] font-bold text-slate-500 group-hover:text-emerald-700 transition-colors dark:text-[#8A8A9A] dark:group-hover:text-[#C8FF2E]">
                        {icon}
                        <span>{chip.tag[lang]}</span>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-600 dark:text-[#8A8A9A] dark:group-hover:text-[#C8FF2E]" />
                    </div>

                    <div className="mt-2.5">
                      <h4 className="font-syne text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors dark:text-[#EDEDF2] dark:group-hover:text-[#C8FF2E]">
                        {chip.title[lang]}
                      </h4>
                      <p className="mt-0.5 font-sans text-xs text-slate-600 line-clamp-2 dark:text-[#8A8A9A]">
                        {chip.subtitle[lang]}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="mt-14 flex flex-col items-center space-y-2 opacity-75 hover:opacity-100 transition-opacity">
            <div className="flex h-9 w-5 justify-center rounded-full border-2 border-slate-300 dark:border-white/20 p-1">
              <div className="h-2 w-1 rounded-full bg-emerald-600 dark:bg-[#C8FF2E] animate-[scrollBounce_1.8s_infinite]" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-[#8A8A9A]">
              SCROLL // EXPLORE
            </span>
          </div>
        </div>
      </div>

      {/* Interactive In-App CV Previewer Modal */}
      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </section>
  );
};
