import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Menu,
  X,
  Moon,
  Sun,
  Search,
  FileDown,
  Eye,
  EyeOff,
  Check,
  Zap,
  Activity,
  Feather,
  PowerOff,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useQuality } from '../../context/QualityContext';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { fireConfetti } from './ConfettiTrigger';
import { useToast } from './Toast';
import { CV_URL } from '../../data/profile';
import { copyRecruiterBrief } from '../../data/recruiterBrief';
import type { QualityTier } from '../../config/effects';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { tier, setTier } = useQuality();
  const scrollProgress = useScrollProgress();
  const { showToast } = useToast();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [qualityMenuOpen, setQualityMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  const qualityMenuRef = useRef<HTMLDivElement | null>(null);

  // Auto-hide navbar on scroll down, show on scroll up
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 10) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 10) {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // Active section detection
      const sectionIds = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const scrollPos = currentScrollY + 220;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close quality menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (qualityMenuRef.current && !qualityMenuRef.current.contains(e.target as Node)) {
        setQualityMenuOpen(false);
      }
    };
    if (qualityMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [qualityMenuOpen]);

  const navLinks = [
    { id: 'about', label: lang === 'vi' ? 'Về tôi' : 'About' },
    { id: 'skills', label: lang === 'vi' ? 'Kỹ năng' : 'Skills' },
    { id: 'experience', label: lang === 'vi' ? 'Kinh nghiệm' : 'Experience' },
    { id: 'projects', label: lang === 'vi' ? 'Dự án' : 'Projects' },
    { id: 'education', label: lang === 'vi' ? 'Học vấn' : 'Education' },
    { id: 'contact', label: lang === 'vi' ? 'Liên hệ' : 'Contact' },
  ];

  const qualityOptions: { id: QualityTier; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'high',
      label: lang === 'vi' ? 'Đầy đủ (High)' : 'Full / High',
      desc: lang === 'vi' ? 'Tất cả hiệu ứng bay, 28 tech sprites + warp' : 'All ambient sprites, comets & warp',
      icon: <Zap className="h-4 w-4 text-emerald-500 dark:text-[#C8FF2E]" />,
    },
    {
      id: 'medium',
      label: lang === 'vi' ? 'Vừa (Medium)' : 'Medium',
      desc: lang === 'vi' ? '14 sprites, sao băng, cân bằng mượt mà' : '14 sprites, comets, balanced 60fps',
      icon: <Activity className="h-4 w-4 text-cyan-500 dark:text-[#5CE1E6]" />,
    },
    {
      id: 'low',
      label: lang === 'vi' ? 'Tối thiểu (Low)' : 'Minimal',
      desc: lang === 'vi' ? '6 sprites, siêu nhẹ cho máy yếu' : '6 sprites, ultra lightweight',
      icon: <Feather className="h-4 w-4 text-amber-500" />,
    },
    {
      id: 'off',
      label: lang === 'vi' ? 'Tắt (Off)' : 'Off',
      desc: lang === 'vi' ? 'Tắt hoàn toàn lớp hiệu ứng nền' : 'Disable all ambient background layers',
      icon: <PowerOff className="h-4 w-4 text-rose-500" />,
    },
  ];

  const handleLogoClick = () => {
    const next = logoClickCount + 1;
    setLogoClickCount(next);
    if (next >= 5) {
      fireConfetti();
      showToast('🎉 Easter Egg Unlocked: Party Mode!');
      setLogoClickCount(0);
    }
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Top Thin Acid Lime Scroll Progress Bar */}
      <div className="h-[2px] w-full bg-transparent overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#C8FF2E] via-[#5CE1E6] to-[#C8FF2E] shadow-[0_0_10px_#C8FF2E] transition-all duration-75"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Floating Editorial Island Navbar */}
      <div className="mx-auto max-w-6xl px-2 pt-3 sm:px-4 md:px-6">
        <nav
          aria-label="Thanh điều hướng chính"
          className="flex h-13 sm:h-14 items-center justify-between rounded-full border border-slate-200/80 bg-white/90 px-2.5 sm:px-4 shadow-lg backdrop-blur-2xl transition-colors dark:border-white/10 dark:bg-[#07070B]/85 dark:shadow-[0_10px_35px_rgba(0,0,0,0.4)]"
        >
          {/* Brand Logo / Terminal Monogram */}
          <button
            onClick={handleLogoClick}
            title={lang === 'vi' ? 'Nhấn 5 lần để nhận bất ngờ!' : 'Click 5 times for a surprise!'}
            className="group flex items-center space-x-2 rounded-full transition-transform hover:scale-105 focus:outline-none cursor-pointer pl-1 shrink-0 whitespace-nowrap"
          >
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-slate-800 shadow-xs transition-colors dark:border-[#C8FF2E]/40 dark:bg-[#C8FF2E]/10 dark:text-[#C8FF2E]">
              <Terminal className="h-3.5 w-3.5" />
            </div>
            <div className="flex items-baseline space-x-0.5 font-mono whitespace-nowrap">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors dark:text-[#EDEDF2] dark:group-hover:text-[#C8FF2E]">
                PL
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-emerald-600 dark:text-[#C8FF2E]">
                .dev
              </span>
            </div>
          </button>

          {/* Desktop Nav Items (Clean Editorial Floating Pill Group - Protected from Text Wrapping) */}
          <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 rounded-full bg-slate-100/80 p-1 border border-slate-200/60 dark:bg-white/5 dark:border-white/5 shrink-0">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`rounded-full px-2.5 xl:px-3 py-1 text-xs font-mono whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-950 font-bold shadow-xs dark:bg-white/15 dark:text-[#C8FF2E]'
                      : 'text-slate-600 hover:text-slate-950 dark:text-[#8A8A9A] dark:hover:text-[#EDEDF2]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Group: Search, Quality Menu, Lang, Theme, CV Button */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 shrink-0">
            {/* Command palette pill (⌘K) */}
            <button
              onClick={onOpenCommandPalette}
              title={lang === 'vi' ? 'Mở thanh lệnh (Ctrl+K)' : 'Command palette (Ctrl+K)'}
              className="flex h-8 items-center space-x-1 rounded-full border border-slate-200/80 bg-white/80 px-2 sm:px-2.5 font-mono text-xs text-slate-600 shadow-xs hover:border-slate-300 hover:text-slate-950 transition-colors cursor-pointer whitespace-nowrap shrink-0 dark:border-white/10 dark:bg-white/5 dark:text-[#8A8A9A] dark:hover:border-[#C8FF2E] dark:hover:text-[#C8FF2E]"
            >
              <Search className="h-3.5 w-3.5" />
              <kbd className="hidden sm:inline-block rounded bg-slate-100 px-1 py-0.2 text-[9px] font-bold text-slate-700 dark:bg-white/10 dark:text-[#EDEDF2]">
                ⌘K
              </kbd>
            </button>

            {/* Quality Governor Menu Trigger (Mục 5) */}
            <div className="relative" ref={qualityMenuRef}>
              <button
                onClick={() => setQualityMenuOpen((prev) => !prev)}
                title={
                  lang === 'vi'
                    ? `Hiệu ứng nền: ${tier.toUpperCase()} (Bấm để điều chỉnh)`
                    : `Effects Quality: ${tier.toUpperCase()} (Click to configure)`
                }
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs transition-colors cursor-pointer ${
                  tier === 'off'
                    ? 'border-slate-200/80 bg-white/80 text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-[#8A8A9A]'
                    : tier === 'high'
                    ? 'border-emerald-600 text-emerald-700 bg-emerald-50 dark:border-[#C8FF2E] dark:text-[#C8FF2E] dark:bg-[#C8FF2E]/15'
                    : 'border-cyan-500 text-cyan-600 bg-cyan-50 dark:border-[#5CE1E6] dark:text-[#5CE1E6] dark:bg-[#5CE1E6]/15'
                }`}
              >
                {tier === 'off' ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>

              {/* Quality Dropdown Popover */}
              {qualityMenuOpen && (
                <div className="absolute right-0 top-10 z-50 w-64 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 dark:border-white/15 dark:bg-[#0E0E18]/95">
                  <div className="px-2.5 py-1.5 border-b border-slate-100 dark:border-white/10 mb-1 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#8A8A9A]">
                      {lang === 'vi' ? 'Mức độ hiệu ứng' : 'Visual FX Quality'}
                    </span>
                    <span className="font-mono text-[10px] font-semibold text-emerald-600 dark:text-[#C8FF2E]">
                      {tier.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {qualityOptions.map((opt) => {
                      const isSelected = tier === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setTier(opt.id);
                            setQualityMenuOpen(false);
                            showToast(
                              lang === 'vi'
                                ? `Đã chuyển hiệu ứng sang: ${opt.label}`
                                : `Visual effects set to: ${opt.label}`
                            );
                          }}
                          className={`w-full flex items-start space-x-2.5 rounded-xl px-2.5 py-2 text-left transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-slate-100 text-slate-950 font-semibold dark:bg-white/10 dark:text-[#EDEDF2]'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-[#8A8A9A] dark:hover:bg-white/5 dark:hover:text-[#EDEDF2]'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">{opt.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-bold">{opt.label}</span>
                              {isSelected && (
                                <Check className="h-3 w-3 text-emerald-600 dark:text-[#C8FF2E]" />
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400 dark:text-[#8A8A9A] font-sans leading-tight mt-0.5">
                              {opt.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Language Toggle: Segmented Pill */}
            <button
              onClick={toggleLang}
              aria-label={lang === 'vi' ? 'Chuyển sang Tiếng Anh' : 'Switch to Vietnamese'}
              className="flex h-8 items-center rounded-full border border-slate-200/80 bg-white/80 px-2.5 font-mono text-[11px] font-bold text-slate-700 shadow-xs hover:border-slate-300 transition-colors cursor-pointer whitespace-nowrap shrink-0 dark:border-white/10 dark:bg-white/5 dark:text-[#EDEDF2] dark:hover:border-white/20"
            >
              <span className={lang === 'vi' ? 'text-emerald-700 dark:text-[#C8FF2E] font-black' : 'opacity-40'}>
                VI
              </span>
              <span className="mx-1 text-slate-400 opacity-50 dark:text-[#8A8A9A]">/</span>
              <span className={lang === 'en' ? 'text-emerald-700 dark:text-[#C8FF2E] font-black' : 'opacity-40'}>
                EN
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Chuyển giao diện sáng' : 'Switch to dark theme'}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-700 shadow-xs hover:text-slate-950 transition-colors cursor-pointer whitespace-nowrap shrink-0 dark:border-white/10 dark:bg-white/5 dark:text-[#8A8A9A] dark:hover:text-[#C8FF2E]"
            >
              {theme === 'dark' ? (
                <Sun className="h-3.5 w-3.5 text-[#C8FF2E]" />
              ) : (
                <Moon className="h-3.5 w-3.5 text-slate-800" />
              )}
            </button>

            {/* Quick Recruiter Candidate Brief (HR Utility - Visible on XL desktop, keeps navbar breathable on laptops) */}
            <button
              onClick={() => copyRecruiterBrief(lang, showToast)}
              title={
                lang === 'vi'
                  ? 'Sao chép tóm tắt ứng viên cho Recruiter (Markdown)'
                  : 'Copy Recruiter Candidate Brief (Markdown)'
              }
              className="hidden xl:inline-flex h-8 items-center space-x-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 font-mono text-xs font-semibold text-emerald-700 hover:bg-emerald-500/20 transition-all cursor-pointer whitespace-nowrap shrink-0 dark:border-[#C8FF2E]/30 dark:bg-[#C8FF2E]/10 dark:text-[#C8FF2E] dark:hover:bg-[#C8FF2E]/20"
            >
              <Sparkles className="h-3 w-3 animate-pulse" />
              <span>{lang === 'vi' ? 'HR Brief' : 'Recruiter Brief'}</span>
            </button>

            {/* Recruiter-First: CV Download Pill */}
            <a
              href={CV_URL}
              download="CV_PhanVuLinh_FullstackDeveloper.pdf"
              className="inline-flex h-8 items-center space-x-1 rounded-full px-3 font-mono text-xs font-bold shadow-sm transition-all active:scale-95 bg-slate-900 text-white hover:bg-slate-800 whitespace-nowrap shrink-0 dark:bg-[#C8FF2E] dark:text-[#07070B] dark:hover:brightness-110 dark:shadow-[0_0_15px_rgba(200,255,46,0.3)]"
            >
              <FileDown className="h-3.5 w-3.5" />
              <span>CV</span>
            </a>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-800 shadow-xs lg:hidden cursor-pointer whitespace-nowrap shrink-0 dark:border-white/10 dark:bg-white/5 dark:text-[#EDEDF2]"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mx-4 mt-2 lg:hidden rounded-2xl border border-slate-200/90 bg-white/95 p-4 backdrop-blur-2xl shadow-xl animate-in slide-in-from-top-2 duration-150 dark:border-white/10 dark:bg-[#07070B]/95 dark:shadow-2xl">
          <div className="flex flex-col space-y-1 font-mono text-sm">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-left text-slate-800 hover:bg-slate-100 hover:text-emerald-700 dark:text-[#EDEDF2] dark:hover:bg-white/5 dark:hover:text-[#C8FF2E]"
              >
                <span>{link.label}</span>
              </button>
            ))}

            {/* Quality Tier Selector on Mobile Drawer */}
            <div className="py-2 border-t border-slate-200 dark:border-white/10">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block mb-1.5">
                {lang === 'vi' ? 'Chế độ hiệu ứng:' : 'Visual FX:'}
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {(['high', 'medium', 'low', 'off'] as QualityTier[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTier(t)}
                    className={`py-1 rounded-lg text-xs font-mono font-bold capitalize transition-colors ${
                      tier === t
                        ? 'bg-slate-900 text-white dark:bg-[#C8FF2E] dark:text-black'
                        : 'bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-[#8A8A9A]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="flex items-center space-x-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-800 dark:border-white/10 dark:text-[#EDEDF2]"
              >
                <Search className="h-3.5 w-3.5 text-emerald-600 dark:text-[#C8FF2E]" />
                <span>Tìm lệnh (⌘K)</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  copyRecruiterBrief(lang, showToast);
                }}
                className="flex items-center space-x-1 rounded-lg border border-emerald-500/30 bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-800 dark:border-[#C8FF2E]/30 dark:bg-[#C8FF2E]/15 dark:text-[#C8FF2E]"
              >
                <Sparkles className="h-3 w-3" />
                <span>HR Brief</span>
              </button>
              <a
                href={CV_URL}
                download="CV_PhanVuLinh_FullstackDeveloper.pdf"
                className="rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white dark:bg-[#C8FF2E] dark:text-[#07070B]"
              >
                Tải CV PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
