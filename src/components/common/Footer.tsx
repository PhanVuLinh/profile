import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { lang } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#07070B] py-10 text-slate-400 not-dark:bg-slate-50 not-dark:border-slate-200">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center sm:items-start space-y-1">
          <div className="flex items-center space-x-2 font-mono text-xs text-slate-300 not-dark:text-slate-800">
            <Terminal className="h-4 w-4 text-cyan-400" />
            <span className="font-bold">Phan Vũ Linh</span>
            <span>—</span>
            <span className="text-cyan-400">Web Developer Portfolio</span>
          </div>
          <p className="font-mono text-[11px] text-slate-500">
            © 2026 Phan Vũ Linh. Built with React 19, TypeScript & Tailwind CSS.
          </p>
        </div>

        {/* Back to top button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={scrollToTop}
            aria-label={lang === 'vi' ? 'Cuộn lên đầu trang' : 'Scroll to top'}
            className="group flex items-center space-x-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs font-semibold text-slate-300 hover:border-cyan-400 hover:text-cyan-300 transition-all active:scale-95 not-dark:border-slate-300 not-dark:text-slate-700 not-dark:hover:bg-slate-100"
          >
            <span>{lang === 'vi' ? 'Lên đầu trang' : 'Back to top'}</span>
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};
