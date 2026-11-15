import React, { useState } from 'react';
import {
  Rocket,
  CheckCircle,
  Copy,
  MapPin,
  GraduationCap,
  Briefcase,
  Layers,
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { useLanguage } from '../../context/LanguageContext';
import { useCounter } from '../../hooks/useCounter';
import { useToast } from '../common/Toast';
import { FlyingTitle } from '../common/FlyingTitle';

type TerminalTab = 'whoami' | 'cat_about' | 'internship' | 'stats';

export const AboutSection: React.FC = () => {
  const { lang } = useLanguage();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<TerminalTab>('cat_about');

  // 3 Real counters
  const [deployCount, deployRef] = useCounter(profileData.stats[0].value, 1500);
  const [paymentCount, paymentRef] = useCounter(profileData.stats[1].value, 1500);
  const [internCount, internRef] = useCounter(profileData.stats[2].value, 1500);

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email);
    showToast(
      lang === 'vi'
        ? 'Đã sao chép email vào bộ nhớ tạm!'
        : 'Copied email to clipboard!'
    );
  };

  return (
    <section id="about" aria-label="About Section" className="relative py-24 sm:py-32 overflow-clip">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center space-x-2 font-mono text-xs text-cyan-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>01 // BIO & ARCHITECTURE</span>
          </div>
          <FlyingTitle
            text={lang === 'vi' ? 'Giới thiệu & Triết lý' : 'About & Engineering'}
            className="mt-3 font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white not-dark:text-slate-900"
          />
          <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
        </div>

        {/* 3 Real Metric Counters */}
        <div className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Stat 1: Deployed Products */}
          <div
            ref={deployRef}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0E0E18]/55 p-6 shadow-lg transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1 not-dark:bg-white/65 not-dark:border-slate-200"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">
                01. DEPLOYED
              </span>
              <Rocket className="h-5 w-5 text-cyan-400 opacity-80 group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="font-mono text-5xl font-extrabold text-white not-dark:text-slate-900 tracking-tight">
                {deployCount}
              </span>
              <span className="font-mono text-xl font-bold text-cyan-400">+</span>
            </div>
            <h3 className="mt-2 text-base font-bold text-slate-100 not-dark:text-slate-800">
              {profileData.stats[0].label[lang]}
            </h3>
            <p className="mt-1 text-xs text-slate-400 not-dark:text-slate-600 leading-relaxed">
              {profileData.stats[0].description[lang]}
            </p>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-cyan-500/20 group-hover:bg-cyan-500 transition-colors" />
          </div>

          {/* Stat 2: Payment Gateways */}
          <div
            ref={paymentRef}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0E0E18]/55 p-6 shadow-lg transition-all duration-300 hover:border-emerald-500/40 hover:-translate-y-1 not-dark:bg-white/65 not-dark:border-slate-200"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
                02. PAYMENTS
              </span>
              <CheckCircle className="h-5 w-5 text-emerald-400 opacity-80 group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="font-mono text-5xl font-extrabold text-white not-dark:text-slate-900 tracking-tight">
                {paymentCount}
              </span>
              <span className="font-mono text-xl font-bold text-emerald-400">GATEWAYS</span>
            </div>
            <h3 className="mt-2 text-base font-bold text-slate-100 not-dark:text-slate-800">
              {profileData.stats[1].label[lang]}
            </h3>
            <p className="mt-1 text-xs text-slate-400 not-dark:text-slate-600 leading-relaxed">
              {profileData.stats[1].description[lang]}
            </p>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors" />
          </div>

          {/* Stat 3: Real Codebase Internship */}
          <div
            ref={internRef}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0E0E18]/55 p-6 shadow-lg transition-all duration-300 hover:border-amber-500/40 hover:-translate-y-1 not-dark:bg-white/65 not-dark:border-slate-200"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-400">
                03. ENTERPRISE
              </span>
              <Briefcase className="h-5 w-5 text-amber-400 opacity-80 group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="font-mono text-5xl font-extrabold text-white not-dark:text-slate-900 tracking-tight">
                {internCount}
              </span>
              <span className="font-mono text-xl font-bold text-amber-400">KỲ</span>
            </div>
            <h3 className="mt-2 text-base font-bold text-slate-100 not-dark:text-slate-800">
              {profileData.stats[2].label[lang]}
            </h3>
            <p className="mt-1 text-xs text-slate-400 not-dark:text-slate-600 leading-relaxed">
              {profileData.stats[2].description[lang]}
            </p>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-amber-500/20 group-hover:bg-amber-500 transition-colors" />
          </div>
        </div>

        {/* Terminal Window with Avatar & Commands */}
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0A0A12]/80 shadow-xl not-dark:bg-white/85 not-dark:border-slate-300">
          {/* Terminal Window Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-[#121220] px-4 py-3 gap-2 not-dark:bg-slate-100 not-dark:border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-rose-500/90" />
              <div className="h-3 w-3 rounded-full bg-amber-500/90" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/90" />
              <span className="ml-2 font-mono text-xs text-slate-400 not-dark:text-slate-600 font-medium">
                bash - linh@portfolio:~ (zsh)
              </span>
            </div>

            {/* Terminal Command Quick Switch Tabs */}
            <div className="flex items-center space-x-1.5 font-mono text-xs">
              <button
                onClick={() => setActiveTab('cat_about')}
                className={`rounded-md px-2.5 py-1 transition-colors ${
                  activeTab === 'cat_about'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                cat about.md
              </button>
              <button
                onClick={() => setActiveTab('whoami')}
                className={`rounded-md px-2.5 py-1 transition-colors ${
                  activeTab === 'whoami'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                whoami
              </button>
              <button
                onClick={() => setActiveTab('internship')}
                className={`rounded-md px-2.5 py-1 transition-colors ${
                  activeTab === 'internship'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                git log -1
              </button>
            </div>
          </div>

          {/* Terminal Window Body */}
          <div className="p-6 sm:p-8 font-mono">
            {/* Terminal prompt header */}
            <div className="mb-4 text-xs text-slate-400 not-dark:text-slate-500">
              <span className="text-emerald-400">linh@portfolio</span>
              <span className="text-slate-500">:</span>
              <span className="text-cyan-400">~/profile</span>
              <span className="text-slate-400">$ </span>
              <span className="text-slate-100 not-dark:text-slate-900 font-semibold">
                {activeTab === 'cat_about' && 'cat about.md'}
                {activeTab === 'whoami' && 'whoami --details'}
                {activeTab === 'internship' && 'git show --stat HEAD'}
                {activeTab === 'stats' && 'curl -s https://api.linh.dev/metrics'}
              </span>
            </div>

            {/* Tab: cat about.md */}
            {activeTab === 'cat_about' && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-center">
                {/* Avatar Placeholder */}
                <div className="md:col-span-4 flex flex-col items-center text-center">
                  <div className="relative group">
                    <div className="relative h-48 w-48 overflow-hidden rounded-2xl border-2 border-[#C8FF2E]/50 shadow-[0_0_30px_rgba(200,255,46,0.25)] transition-transform duration-300 group-hover:scale-105 bg-[#101018]">
                      {/* Avatar image: loads /avatar.png, falls back to /avatar-placeholder.svg */}
                      <img
                        src="/avatar.png"
                        alt="Phan Vũ Linh — Web Developer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/avatar-placeholder.svg';
                        }}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    {/* Live pulse indicator */}
                    <div className="absolute -bottom-2 right-2 flex items-center space-x-1.5 rounded-full border border-[#10B981]/50 bg-[#07070B] px-3 py-0.5 text-[10px] font-mono text-[#10B981] shadow-lg">
                      <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                      <span>Ready for Work</span>
                    </div>
                  </div>
                  <div className="mt-3 text-xs font-mono text-[#8A8A9A]">
                    <span className="text-[#C8FF2E] font-semibold">Phan Vũ Linh</span> (Fullstack Intern)
                  </div>
                </div>

                {/* Bio text */}
                <div className="md:col-span-8 font-sans">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-5 leading-relaxed not-dark:bg-slate-50 not-dark:border-slate-200">
                    <p className="text-sm sm:text-base text-slate-200 not-dark:text-slate-800">
                      {profileData.intro[lang]}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs font-mono text-slate-300 not-dark:text-slate-700">
                    <div className="flex items-center space-x-2 rounded-lg bg-white/5 p-2.5 border border-white/5 not-dark:bg-slate-100">
                      <GraduationCap className="h-4 w-4 text-cyan-400 shrink-0" />
                      <span>ĐH Công nghệ Sài Gòn (2022 - nay)</span>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg bg-white/5 p-2.5 border border-white/5 not-dark:bg-slate-100">
                      <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{profileData.contact.location[lang]}</span>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg bg-white/5 p-2.5 border border-white/5 not-dark:bg-slate-100">
                      <Layers className="h-4 w-4 text-amber-400 shrink-0" />
                      <span>Event-Service & RBAC Architecture</span>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg bg-white/5 p-2.5 border border-white/5 not-dark:bg-slate-100">
                      <Briefcase className="h-4 w-4 text-purple-400 shrink-0" />
                      <span>TechVanguard Intern (2026)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: whoami */}
            {activeTab === 'whoami' && (
              <div className="space-y-3 text-xs sm:text-sm text-slate-300 not-dark:text-slate-700">
                <div className="flex">
                  <span className="w-32 text-cyan-400 font-semibold">User:</span>
                  <span className="text-slate-100 not-dark:text-slate-900 font-bold">{profileData.name}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-cyan-400 font-semibold">Role:</span>
                  <span>{profileData.title[lang]}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-cyan-400 font-semibold">Status:</span>
                  <span className="text-emerald-400">Final-year Student @ Saigon Technology University</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-cyan-400 font-semibold">Phone:</span>
                  <span>{profileData.contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-32 text-cyan-400 font-semibold">Email:</span>
                  <span className="mr-2">{profileData.contact.email}</span>
                  <button
                    onClick={copyEmail}
                    title="Copy Email"
                    className="inline-flex items-center space-x-1 rounded px-1.5 py-0.5 text-[10px] bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"
                  >
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </button>
                </div>
                <div className="flex">
                  <span className="w-32 text-cyan-400 font-semibold">GitHub:</span>
                  <a
                    href={profileData.contact.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 underline hover:text-cyan-200"
                  >
                    https://github.com/PhanVuLinh
                  </a>
                </div>
              </div>
            )}

            {/* Tab: internship */}
            {activeTab === 'internship' && (
              <div className="space-y-3 text-xs sm:text-sm text-slate-300 not-dark:text-slate-700">
                <div className="text-amber-400 font-semibold">
                  commit e4a79b2 (HEAD -&gt; main, origin/main)
                </div>
                <div>Author: Phan Vũ Linh &lt;linhphanzzz04@gmail.com&gt;</div>
                <div>Date: TechVanguard Enterprise Internship (2026)</div>
                <div className="mt-2 text-cyan-300 font-bold">
                  feat(hotel-management): implement Booking, Room, Billing & Incident workflow
                </div>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-400 font-sans text-xs">
                  <li>Architecture: Event Handler - Service layer pattern for decoupled modules.</li>
                  <li>Database & Cache: Optimized MySQL queries, integrated Redis simulation/sandbox.</li>
                  <li>Quality: Unit/Integration tests coverage with full edge case audit.</li>
                  <li>Workflow: Team collaboration via Git/Gitea with strict code review loops.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

