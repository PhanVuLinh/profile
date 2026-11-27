import React from 'react';
import { GraduationCap, Calendar, BookOpen, CheckCircle } from 'lucide-react';
import { profileData } from '../../data/profile';
import { useLanguage } from '../../context/LanguageContext';
import { FlyingTitle } from '../common/FlyingTitle';
import { SpotlightCard } from '../common/SpotlightCard';

export const EducationSection: React.FC = () => {
  const { lang } = useLanguage();
  const edu = profileData.education;

  return (
    <section id="education" aria-label="Education Section" className="relative py-20 sm:py-28 overflow-clip">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center space-x-2 font-mono text-xs text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>05 // ACADEMIC BACKGROUND</span>
          </div>
          <FlyingTitle
            text={lang === 'vi' ? 'Học vấn & Nền tảng' : 'Academic Foundation'}
            className="mt-3 font-syne text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white not-dark:text-slate-900"
          />
        </div>

        {/* 1 Clean Card with Spotlight Border Glow */}
        <SpotlightCard
          glowColor="rgba(16, 185, 129, 0.4)"
          enableTilt={true}
          className="shadow-2xl"
        >
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5 not-dark:border-slate-200">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] not-dark:bg-emerald-100 not-dark:text-emerald-800">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-syne text-xl sm:text-2xl font-bold text-white not-dark:text-slate-900">
                    {edu.school[lang]}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-cyan-400 not-dark:text-emerald-700 font-medium">
                    {edu.degree[lang]}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="inline-flex items-center space-x-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400 not-dark:bg-emerald-50 not-dark:border-emerald-200 not-dark:text-emerald-800">
                  <Calendar className="h-3 w-3" />
                  <span>{edu.period}</span>
                </span>
                <span className="mt-1 font-mono text-[11px] text-slate-400 not-dark:text-slate-600">
                  {edu.status[lang]}
                </span>
              </div>
            </div>

            {/* Academic Highlights */}
            <div className="mt-6">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-2 not-dark:text-slate-600">
                <BookOpen className="h-3.5 w-3.5 text-cyan-400 not-dark:text-emerald-700" />
                <span>{lang === 'vi' ? 'Nền tảng kiến thức trọng tâm' : 'Core Computer Science Disciplines'}</span>
              </h4>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {edu.focus[lang].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2.5 rounded-lg border border-white/5 bg-white/5 p-3 text-xs sm:text-sm text-slate-300 not-dark:bg-slate-50 not-dark:border-slate-200 not-dark:text-slate-700"
                  >
                    <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400 not-dark:text-emerald-600" />
                    <span>
                      {item.includes(': ') ? (
                        <>
                          <strong className="text-white not-dark:text-slate-900 font-bold">
                            {item.split(': ')[0]}:
                          </strong>{' '}
                          <span>{item.split(': ').slice(1).join(': ')}</span>
                        </>
                      ) : (
                        item
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};

