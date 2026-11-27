import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Copy,
  X,
  ChevronUp,
  Sparkles,
  ArrowUpRight,
  Send,
} from 'lucide-react';
import { ZaloIcon } from './Icons';
import { profileData } from '../../data/profile';
import { copyRecruiterBrief } from '../../data/recruiterBrief';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from './Toast';
import { fireConfetti } from './ConfettiTrigger';

interface QuickConnectDockProps {
  onOpenJobInquiry: (topic?: string) => void;
}

export const QuickConnectDock: React.FC<QuickConnectDockProps> = ({
  onOpenJobInquiry,
}) => {
  const { lang } = useLanguage();
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isNearContact, setIsNearContact] = useState(false);
  const dockRef = useRef<HTMLDivElement | null>(null);

  // Detect when user is in or near Contact section to dim the dock
  useEffect(() => {
    const handleScroll = () => {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        // If contact section is in viewport or close
        if (rect.top <= window.innerHeight * 0.75) {
          setIsNearContact(true);
        } else {
          setIsNearContact(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dock on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Don't show dock if scrolled deep inside contact section
  if (isNearContact && !isOpen) {
    return null;
  }

  return (
    <div
      ref={dockRef}
      className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end transition-all duration-300"
    >
      {/* Expanded Floating Micro-Dock Menu */}
      {isOpen && (
        <div className="mb-3 w-[310px] sm:w-[340px] rounded-2xl border border-cyan-500/30 bg-[#0A0A14]/95 p-4 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-4 duration-200 text-slate-100 not-dark:bg-white/95 not-dark:border-slate-300 not-dark:text-slate-900 not-dark:shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 not-dark:border-slate-200">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <div>
                <h4 className="font-mono text-xs font-bold text-white not-dark:text-slate-900">
                  Phan Vũ Linh
                </h4>
                <p className="font-sans text-[11px] text-emerald-400 not-dark:text-emerald-700 font-medium">
                  {lang === 'vi' ? 'Sẵn sàng nhận việc ngay' : 'Ready for Work (Immediate)'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="flex h-6 w-6 items-center justify-center rounded-lg text-slate-400 hover:text-white not-dark:hover:text-slate-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Action List */}
          <div className="mt-3 space-y-1.5">
            {/* Action 1: Zalo Direct Chat */}
            <a
              href={profileData.contact.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                fireConfetti();
                setIsOpen(false);
              }}
              className="group flex items-center justify-between rounded-xl border border-blue-500/20 bg-blue-500/10 p-2.5 transition-all hover:bg-blue-600 hover:text-white not-dark:bg-blue-50 not-dark:border-blue-200 not-dark:hover:bg-blue-600 not-dark:hover:text-white cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 group-hover:bg-white/20 group-hover:text-white not-dark:bg-blue-100 not-dark:text-blue-700">
                  <ZaloIcon className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-mono text-xs font-bold text-slate-100 group-hover:text-white not-dark:text-slate-900">
                    {lang === 'vi' ? 'Nhắn Zalo tức thì' : 'Chat via Zalo'}
                  </div>
                  <div className="font-sans text-[11px] text-slate-400 group-hover:text-blue-100 not-dark:text-slate-600">
                    0343842424 (Phản hồi &lt; 30p)
                  </div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-blue-400 group-hover:text-white not-dark:text-blue-700" />
            </a>

            {/* Action 2: Open Job Inquiry Modal */}
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenJobInquiry();
              }}
              className="w-full group flex items-center justify-between rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2.5 transition-all hover:bg-gradient-to-r hover:from-cyan-500 hover:to-emerald-500 hover:text-black not-dark:bg-cyan-50 not-dark:border-cyan-200 not-dark:hover:bg-cyan-600 cursor-pointer text-left"
            >
              <div className="flex items-center space-x-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:bg-black/20 group-hover:text-black not-dark:bg-cyan-100 not-dark:text-cyan-800">
                  <Send className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-slate-100 group-hover:text-black not-dark:text-slate-900">
                    {lang === 'vi' ? 'Gửi lời mời phỏng vấn' : 'Job & Interview Invitation'}
                  </div>
                  <div className="font-sans text-[11px] text-slate-400 group-hover:text-slate-900 not-dark:text-slate-600">
                    {lang === 'vi' ? 'Mẫu thư & thiết lập lịch hẹn' : 'Pre-filled invitation form'}
                  </div>
                </div>
              </div>
              <Sparkles className="h-4 w-4 text-cyan-400 group-hover:text-black" />
            </button>

            {/* Action 3: Copy Recruiter Candidate Brief */}
            <button
              onClick={() => {
                copyRecruiterBrief(lang, showToast);
                setIsOpen(false);
              }}
              className="w-full group flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2.5 transition-all hover:bg-emerald-600 hover:text-white not-dark:bg-emerald-50 not-dark:border-emerald-200 not-dark:hover:bg-emerald-600 not-dark:hover:text-white cursor-pointer text-left"
            >
              <div className="flex items-center space-x-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:bg-white/20 group-hover:text-white not-dark:bg-emerald-100 not-dark:text-emerald-800">
                  <Copy className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-slate-100 group-hover:text-white not-dark:text-slate-900">
                    {lang === 'vi' ? 'Copy HR Candidate Brief' : '1-Click HR Brief (MD)'}
                  </div>
                  <div className="font-sans text-[11px] text-slate-400 group-hover:text-emerald-100 not-dark:text-slate-600">
                    {lang === 'vi' ? 'Tóm tắt kỹ năng & 2 live demo' : 'Markdown candidate summary'}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-emerald-400 group-hover:text-white" />
            </button>

            {/* Action 4: Direct Phone Call */}
            <a
              href={`tel:${profileData.contact.phone}`}
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-2.5 transition-all hover:bg-white/10 not-dark:border-slate-200 not-dark:bg-slate-50 not-dark:hover:bg-slate-100 cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-slate-300 not-dark:bg-slate-200 not-dark:text-slate-700">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-mono text-xs font-bold text-slate-200 not-dark:text-slate-800">
                    {lang === 'vi' ? 'Gọi điện trực tiếp' : 'Direct Call'}
                  </div>
                  <div className="font-sans text-[11px] text-slate-400 not-dark:text-slate-600">
                    {profileData.contact.phone}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </a>
          </div>

          <div className="mt-3 pt-2 text-center border-t border-white/5 not-dark:border-slate-100">
            <span className="font-mono text-[10px] text-slate-400 not-dark:text-slate-500">
              📍 TP. Hồ Chí Minh • Phỏng vấn Onsite & Online
            </span>
          </div>
        </div>
      )}

      {/* Floating Trigger Pill / Capsule Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex items-center space-x-2.5 rounded-full border border-cyan-400/40 bg-[#0E0E18]/90 py-2.5 px-4 shadow-[0_8px_30px_rgba(0,240,255,0.25)] backdrop-blur-xl transition-all duration-200 hover:scale-105 hover:border-cyan-300 hover:shadow-[0_12px_40px_rgba(0,240,255,0.4)] active:scale-95 cursor-pointer not-dark:bg-white not-dark:border-emerald-600/40 not-dark:shadow-lg"
      >
        {/* Blinking Live Indicator */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>

        {/* Text */}
        <div className="flex items-center space-x-1.5 font-mono text-xs font-bold">
          <span className="text-white not-dark:text-slate-900">
            {lang === 'vi' ? 'Liên hệ công việc' : 'Hire / Connect'}
          </span>
          <span className="text-cyan-400 not-dark:text-emerald-700">
            (Zalo/HR)
          </span>
        </div>

        <ChevronUp
          className={`h-4 w-4 text-cyan-400 not-dark:text-emerald-700 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
    </div>
  );
};
