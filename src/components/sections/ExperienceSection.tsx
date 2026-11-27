import React from 'react';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  GitBranch,
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { useLanguage } from '../../context/LanguageContext';
import { FlyingTitle } from '../common/FlyingTitle';
import { SpotlightCard } from '../common/SpotlightCard';

export const ExperienceSection: React.FC = () => {
  const { lang } = useLanguage();
  const exp = profileData.experience[0];

  return (
    <section id="experience" aria-label="Experience Section" className="relative py-24 sm:py-32 overflow-clip">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="inline-flex items-center space-x-2 font-mono text-xs text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>03 // HANDS-ON EXPERIENCE</span>
          </div>
          <FlyingTitle
            text={lang === 'vi' ? 'Kinh nghiệm Thực tế' : 'Work Experience'}
            className="mt-3 font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white not-dark:text-slate-900"
          />
          <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-400 not-dark:text-slate-600 font-sans">
            {lang === 'vi'
              ? 'Trưởng thành qua các bài toán thực tế trên enterprise codebase: làm quen với kiến trúc tách lớp Event-Service, đón nhận code review và bảo vệ tính toàn vẹn hệ thống bằng kiểm thử.'
              : 'Shaped by real-world enterprise engineering: embracing decoupled Event-Service architecture, welcoming constructive code reviews, and defending system resilience through testing.'}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 md:pl-12">
          {/* Vertical Glowing Timeline Line */}
          <div
            className="absolute left-2.5 sm:left-4 top-3 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-amber-400 to-transparent shadow-[0_0_12px_rgba(0,240,255,0.4)]"
            aria-hidden="true"
          />

          {/* Experience Item */}
          <div className="relative mb-12">
            {/* Timeline Node Point */}
            <div
              className="absolute -left-[27px] sm:-left-[35px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-cyan-400 bg-[#0A0A0F] shadow-[0_0_15px_rgba(0,240,255,0.6)]"
              aria-hidden="true"
            >
              <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            {/* Main Experience Card with Spotlight Glow */}
            <SpotlightCard
              glowColor="rgba(245, 158, 11, 0.4)"
              className="shadow-2xl"
            >
              <div className="p-6 sm:p-8">
                {/* Header: Role, Company, Period */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5 not-dark:border-slate-200">
                  <div>
                    <div className="inline-flex items-center space-x-2 rounded-md bg-amber-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-amber-400 border border-amber-500/20 not-dark:bg-amber-100 not-dark:text-amber-800">
                      <Briefcase className="h-3.5 w-3.5" />
                      <span>{exp.role[lang]}</span>
                    </div>
                    <h3 className="mt-2.5 text-2xl font-bold font-syne text-white not-dark:text-slate-900 tracking-tight">
                      {exp.company}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 not-dark:text-slate-600">
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                        <span>{exp.location}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                        <span>{exp.period}</span>
                      </span>
                    </div>
                  </div>

                  {/* Architecture badge */}
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 font-mono text-[11px] font-semibold text-cyan-300 not-dark:border-cyan-600/30 not-dark:bg-cyan-50 not-dark:text-cyan-800">
                      Event Handler – Service
                    </span>
                    <span className="mt-1 font-mono text-[10px] text-slate-500">
                      Enterprise Simulation & Sandbox
                    </span>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.stack.map((item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs font-medium text-slate-300 not-dark:bg-slate-100 not-dark:border-slate-200 not-dark:text-slate-800"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>

                {/* Responsibilities list */}
                <div className="mt-6 space-y-3.5">
                  {exp.responsibilities[lang].map((resp, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 text-sm text-slate-300 not-dark:text-slate-700 leading-relaxed"
                    >
                      <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-400 not-dark:bg-amber-100 not-dark:text-amber-800">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <span>
                        {resp.includes(': ') ? (
                          <>
                            <strong className="text-white not-dark:text-slate-900 font-bold">
                              {resp.split(': ')[0]}:
                            </strong>{' '}
                            <span>{resp.split(': ').slice(1).join(': ')}</span>
                          </>
                        ) : (
                          resp
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Workflow & QA Callout box */}
                <div className="mt-6 rounded-xl border border-white/5 bg-black/40 p-4 font-mono text-xs text-slate-400 not-dark:bg-slate-50 not-dark:border-slate-200">
                  <div className="flex items-center space-x-2 text-cyan-300 font-semibold mb-1.5 not-dark:text-emerald-800">
                    <GitBranch className="h-3.5 w-3.5" />
                    <span>{lang === 'vi' ? 'Bài học Kỹ thuật & Tinh thần Đồng đội' : 'Engineering Lessons & Team Rigor'}</span>
                  </div>
                  <p className="font-sans text-xs text-slate-400 not-dark:text-slate-600 leading-relaxed">
                    {lang === 'vi'
                      ? 'Code tốt không chỉ chạy đúng logic, mà phải an toàn trước dữ liệu lỗi, có tính kế thừa cho team và luôn được bảo vệ bằng kiểm thử.'
                      : 'Good code does not just work on happy paths; it stays resilient against edge-case data, remains maintainable, and is defended by automated tests.'}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};

