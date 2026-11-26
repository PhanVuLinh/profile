import React, { useEffect } from 'react';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { CV_URL } from '../../data/profile';
import { useLanguage } from '../../context/LanguageContext';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Xem CV Phan Vũ Linh"
      className="fixed inset-0 z-99999 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-2xl backdrop-blur-2xl dark:border-[#C8FF2E]/30 dark:bg-[#0E0E18]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 sm:px-6 dark:border-white/10 dark:bg-[#141422]">
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-[#C8FF2E]/10 dark:text-[#C8FF2E] dark:border-[#C8FF2E]/30">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-syne font-bold text-sm sm:text-base text-slate-900 dark:text-[#EDEDF2]">
                  CV_PhanVuLinh_FullstackDeveloper.pdf
                </span>
                <span className="hidden sm:inline-flex items-center space-x-1 rounded bg-emerald-50 px-2 py-0.5 font-mono text-[10px] text-emerald-700 border border-emerald-200 dark:bg-[#10B981]/15 dark:text-[#10B981] dark:border-[#10B981]/30">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Verified</span>
                </span>
              </div>
              <p className="font-mono text-[11px] text-slate-600 dark:text-[#8A8A9A]">
                Phan Vũ Linh — Web Developer (Fullstack / Backend)
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Direct Download Button */}
            <a
              href={CV_URL}
              download="CV_PhanVuLinh_FullstackDeveloper.pdf"
              className="inline-flex items-center space-x-1.5 rounded-lg bg-slate-900 px-3.5 py-1.5 font-mono text-xs font-bold text-white shadow-sm hover:bg-slate-800 active:scale-95 transition-all dark:bg-[#C8FF2E] dark:text-[#07070B] dark:shadow-[0_0_15px_rgba(200,255,46,0.25)] dark:hover:brightness-110"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">{lang === 'vi' ? 'Tải PDF' : 'Download'}</span>
            </a>

            {/* Open in new tab */}
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              title={lang === 'vi' ? 'Mở trong tab mới' : 'Open in new tab'}
              className="inline-flex items-center space-x-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-mono text-xs text-slate-700 hover:border-slate-400 hover:text-slate-950 transition-colors dark:border-white/15 dark:bg-white/5 dark:text-[#EDEDF2] dark:hover:border-[#5CE1E6] dark:hover:text-[#5CE1E6]"
            >
              <ExternalLink className="h-4 w-4" />
            </a>

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Đóng cửa sổ"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-950 transition-colors dark:border-white/10 dark:bg-white/5 dark:text-[#8A8A9A] dark:hover:bg-white/10 dark:hover:text-[#EDEDF2]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="relative flex-1 w-full bg-slate-100 dark:bg-[#1A1A28] overflow-hidden">
          <object
            data={CV_URL}
            type="application/pdf"
            className="h-full w-full border-none"
          >
            <iframe
              src={`${CV_URL}#toolbar=1&navpanes=0`}
              title="Phan Vũ Linh CV Preview"
              className="h-full w-full border-none"
            >
              <div className="flex h-full flex-col items-center justify-center p-8 text-center font-mono text-sm text-slate-900 dark:text-[#EDEDF2]">
                <p className="mb-4">
                  {lang === 'vi'
                    ? 'Trình duyệt không hỗ trợ xem trực tiếp PDF.'
                    : 'Your browser does not support inline PDF viewing.'}
                </p>
                <a
                  href={CV_URL}
                  download="CV_PhanVuLinh_FullstackDeveloper.pdf"
                  className="rounded-lg bg-slate-900 px-4 py-2 text-white font-bold dark:bg-[#C8FF2E] dark:text-[#07070B]"
                >
                  {lang === 'vi' ? 'Nhấn vào đây để tải CV PDF' : 'Click here to download PDF'}
                </a>
              </div>
            </iframe>
          </object>
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-2 font-mono text-[11px] text-slate-600 dark:border-white/10 dark:bg-[#12121E] dark:text-[#8A8A9A]">
          <span>Phan Vũ Linh • 0343842424 • linhphanzzz04@gmail.com</span>
          <span className="hidden sm:inline">Nhấn ESC hoặc click bên ngoài để đóng</span>
        </div>
      </div>
    </div>
  );
};
