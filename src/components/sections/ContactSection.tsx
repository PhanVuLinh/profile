import React from 'react';
import {
  Mail,
  Phone,
  Copy,
  ArrowUpRight,
  Send,
  MapPin,
  Clock,
} from 'lucide-react';
import { GithubIcon, ZaloIcon } from '../common/Icons';
import { profileData } from '../../data/profile';
import { copyRecruiterBrief } from '../../data/recruiterBrief';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../common/Toast';
import { useMagnetic } from '../../hooks/useMagnetic';
import { fireConfetti } from '../common/ConfettiTrigger';
import { FlyingTitle } from '../common/FlyingTitle';

export const ContactSection: React.FC = () => {
  const { lang } = useLanguage();
  const { showToast } = useToast();
  const magneticMailBtnRef = useMagnetic<HTMLAnchorElement>({ strength: 0.35 });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(
      lang === 'vi'
        ? `Đã sao chép ${label} vào bộ nhớ tạm!`
        : `Copied ${label} to clipboard!`
    );
  };

  return (
    <section id="contact" aria-label="Contact Section" className="relative py-24 sm:py-36 overflow-clip">
      {/* Background neon glows */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[500px] w-[600px] rounded-full bg-gradient-to-t from-cyan-500/10 via-emerald-500/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Status badge */}
          <div className="inline-flex items-center space-x-2 font-mono text-xs text-cyan-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>06 // READY TO COLLABORATE</span>
          </div>

          {/* Flying Headline (Item 3) */}
          <FlyingTitle
            text={
              lang === 'vi'
                ? 'Cùng làm điều gì đó thú vị nhé?'
                : "Let's build something extraordinary."
            }
            className="mt-4 font-syne text-[clamp(2.4rem,7vw,5.5rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-white not-dark:text-slate-900"
          />

          <p className="mt-6 max-w-xl text-balance font-sans text-sm sm:text-base md:text-lg text-slate-400 not-dark:text-slate-600 leading-relaxed">
            {lang === 'vi'
              ? 'Tôi đang tìm kiếm cơ hội làm việc ở vị trí Backend / Fullstack Developer tại TP. Hồ Chí Minh. Tôi trân trọng mọi cơ hội được cống hiến, học hỏi từ đội ngũ kỹ sư giàu kinh nghiệm và sẵn sàng tham gia phỏng vấn ngay!'
              : 'Actively seeking Fullstack / Backend Developer opportunities in Ho Chi Minh City. Eager to contribute dependable code, learn from seasoned engineering mentors, and ready for interviews!'}
          </p>

          {/* Action Buttons: Primary Email + Direct Zalo Button */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              ref={magneticMailBtnRef}
              href={`mailto:${profileData.contact.email}?subject=Trao%20đổi%20cơ%20hội%20nghề%20nghiệp%20-%20Phan%20Vũ%20Linh`}
              onClick={() => {
                fireConfetti();
              }}
              className="group relative inline-flex items-center space-x-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 px-8 py-5 font-mono text-base sm:text-lg font-bold text-black shadow-2xl shadow-cyan-500/30 transition-all duration-200 hover:scale-105 hover:shadow-cyan-500/50 active:scale-95 cursor-pointer"
            >
              <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              <span>{profileData.contact.email}</span>
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Direct Zalo Chat Button */}
            <a
              href={profileData.contact.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                fireConfetti();
              }}
              className="group relative inline-flex items-center space-x-3 rounded-2xl border-2 border-blue-500/40 bg-blue-500/10 px-8 py-5 font-mono text-base sm:text-lg font-bold text-blue-400 shadow-xl shadow-blue-500/10 transition-all duration-200 hover:scale-105 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-blue-500/30 active:scale-95 cursor-pointer not-dark:bg-blue-50 not-dark:text-blue-700 not-dark:border-blue-300 not-dark:hover:bg-blue-600 not-dark:hover:text-white"
            >
              <ZaloIcon className="h-5 w-5 shrink-0" />
              <span>{lang === 'vi' ? 'Nhắn Zalo ngay' : 'Chat via Zalo'}</span>
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Quick Copy Contact Cards */}
          <div className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Copy Email */}
            <div className="flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-[#0E0E18]/60 p-5 shadow-lg not-dark:bg-white/70 not-dark:border-slate-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <Mail className="h-5 w-5" />
              </div>
              <span className="mt-3 font-mono text-xs text-slate-400">Email</span>
              <span className="mt-1 font-mono text-xs font-semibold text-slate-200 not-dark:text-slate-900 break-all">
                {profileData.contact.email}
              </span>
              <button
                onClick={() => handleCopy(profileData.contact.email, 'Email')}
                className="mt-4 inline-flex items-center space-x-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 font-mono text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition-colors"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>{lang === 'vi' ? 'Sao chép' : 'Copy'}</span>
              </button>
            </div>

            {/* Copy Phone */}
            <div className="flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-[#0E0E18]/60 p-5 shadow-lg not-dark:bg-white/70 not-dark:border-slate-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Phone className="h-5 w-5" />
              </div>
              <span className="mt-3 font-mono text-xs text-slate-400">{lang === 'vi' ? 'Điện thoại' : 'Phone'}</span>
              <span className="mt-1 font-mono text-sm font-semibold text-slate-200 not-dark:text-slate-900">
                {profileData.contact.phone}
              </span>
              <button
                onClick={() => handleCopy(profileData.contact.phone, lang === 'vi' ? 'Số điện thoại' : 'Phone')}
                className="mt-4 inline-flex items-center space-x-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs font-medium text-emerald-300 hover:bg-emerald-500/20 transition-colors"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>{lang === 'vi' ? 'Sao chép' : 'Copy'}</span>
              </button>
            </div>

            {/* Direct Zalo Chat Card */}
            <div className="flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-[#0E0E18]/60 p-5 shadow-lg not-dark:bg-white/70 not-dark:border-slate-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <ZaloIcon className="h-5 w-5" />
              </div>
              <span className="mt-3 font-mono text-xs text-slate-400">Zalo Chat</span>
              <span className="mt-1 font-mono text-sm font-semibold text-slate-200 not-dark:text-slate-900">
                {profileData.contact.phone}
              </span>
              <a
                href={profileData.contact.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center space-x-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 font-mono text-xs font-medium text-blue-300 hover:bg-blue-500/20 transition-colors not-dark:text-blue-700 not-dark:bg-blue-50 not-dark:border-blue-300"
              >
                <span>{lang === 'vi' ? 'Mở Zalo' : 'Open Zalo'}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* GitHub */}
            <div className="flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-[#0E0E18]/60 p-5 shadow-lg not-dark:bg-white/70 not-dark:border-slate-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <GithubIcon className="h-5 w-5" />
              </div>
              <span className="mt-3 font-mono text-xs text-slate-400">GitHub</span>
              <span className="mt-1 font-mono text-sm font-semibold text-slate-200 not-dark:text-slate-900">
                PhanVuLinh
              </span>
              <a
                href={profileData.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center space-x-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 font-mono text-xs font-medium text-purple-300 hover:bg-purple-500/20 transition-colors"
              >
                <span>{lang === 'vi' ? 'Mở GitHub' : 'View Profile'}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Recruiter 1-Click Candidate Brief Card */}
          <div className="mt-4 w-full max-w-4xl">
            <div className="flex flex-col sm:flex-row items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 shadow-lg backdrop-blur-xl not-dark:bg-emerald-50/80 not-dark:border-emerald-300 gap-4">
              <div className="flex items-center space-x-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 not-dark:bg-emerald-200 not-dark:text-emerald-800">
                  <Send className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-mono text-xs font-bold text-white not-dark:text-slate-900">
                    {lang === 'vi' ? 'Dành riêng cho HR & Tech Lead' : 'For HR & Tech Leads'}
                  </h4>
                  <p className="font-sans text-xs text-slate-400 not-dark:text-slate-600 mt-0.5">
                    {lang === 'vi'
                      ? 'Sao chép tóm tắt định dạng Markdown đầy đủ (kỹ năng, 2 sản phẩm live, kinh nghiệm TechVanguard).'
                      : '1-click copy formatted Markdown summary (skills, 2 live products, enterprise background).'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyRecruiterBrief(lang, showToast)}
                className="inline-flex shrink-0 items-center space-x-2 rounded-xl bg-emerald-400 px-4 py-2.5 font-mono text-xs font-bold text-black shadow-md hover:bg-emerald-300 transition-all active:scale-95 cursor-pointer not-dark:bg-emerald-700 not-dark:text-white not-dark:hover:bg-emerald-800"
              >
                <Copy className="h-4 w-4" />
                <span>{lang === 'vi' ? 'Copy HR Brief' : 'Copy Candidate Brief'}</span>
              </button>
            </div>
          </div>

          {/* Location & Timezone info */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center space-x-1.5">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span>{profileData.contact.location[lang]}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1.5">
              <Clock className="h-4 w-4 text-cyan-400" />
              <span>GMT+7 (Indochina Time)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

