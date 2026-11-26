import React, { useState } from 'react';
import {
  Code2,
  Server,
  Database,
  Layers,
  GitBranch,
  Box,
  Key,
  Palette,
  FileCode2,
  Workflow,
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { useLanguage } from '../../context/LanguageContext';
import { FlyingTitle } from '../common/FlyingTitle';
import { OrbitTags } from '../common/OrbitTags';

export const SkillsSection: React.FC = () => {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');

  const marqueeRow1 = [
    { name: 'React 19', role: 'Frontend' },
    { name: 'Laravel', role: 'Backend' },
    { name: 'Node.js', role: 'Backend' },
    { name: 'Express.js', role: 'API' },
    { name: 'MySQL', role: 'Database' },
    { name: 'Redis', role: 'Cache' },
    { name: 'Docker', role: 'DevOps' },
    { name: 'Tailwind CSS', role: 'Styling' },
    { name: 'MongoDB', role: 'NoSQL' },
    { name: 'JavaScript ES6+', role: 'Language' },
  ];

  const marqueeRow2 = [
    { name: 'VNPay Gateway', role: 'Payment' },
    { name: 'ZaloPay Gateway', role: 'Payment' },
    { name: 'JWT & OAuth 2.0', role: 'Security' },
    { name: 'RBAC Authorization', role: 'Security' },
    { name: 'Git / Gitea', role: 'VCS' },
    { name: 'Postman', role: 'Testing' },
    { name: 'ERD / DFD / UML', role: 'Architecture' },
    { name: 'Event-Service Architecture', role: 'Pattern' },
    { name: 'Figma', role: 'UI/UX' },
    { name: 'SQL Server', role: 'Database' },
  ];

  // Helper icon resolver
  const getSkillIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('react')) return <Code2 className="h-5 w-5 text-cyan-400" />;
    if (n.includes('node') || n.includes('express')) return <Server className="h-5 w-5 text-emerald-400" />;
    if (n.includes('laravel')) return <Layers className="h-5 w-5 text-rose-400" />;
    if (n.includes('mysql') || n.includes('sql') || n.includes('mongo') || n.includes('redis')) return <Database className="h-5 w-5 text-amber-400" />;
    if (n.includes('docker')) return <Box className="h-5 w-5 text-blue-400" />;
    if (n.includes('git')) return <GitBranch className="h-5 w-5 text-orange-400" />;
    if (n.includes('jwt') || n.includes('rbac')) return <Key className="h-5 w-5 text-purple-400" />;
    if (n.includes('tailwind') || n.includes('figma')) return <Palette className="h-5 w-5 text-cyan-400" />;
    if (n.includes('erd') || n.includes('sequence')) return <Workflow className="h-5 w-5 text-emerald-400" />;
    return <FileCode2 className="h-5 w-5 text-slate-300" />;
  };

  const allSkills = profileData.skills.flatMap((cat, catIdx) =>
    cat.items.map((item) => ({ ...item, categoryIdx: catIdx, categoryName: cat.category[lang] }))
  );

  const displayedSkills =
    activeCategory === 'all'
      ? allSkills
      : allSkills.filter((s) => s.categoryIdx === activeCategory);

  const skillsOrbitChips = [
    { id: 'react', label: 'React 19' },
    { id: 'laravel', label: 'Laravel 11' },
    { id: 'node', label: 'Node.js' },
    { id: 'mysql', label: 'MySQL' },
    { id: 'redis', label: 'Redis Cache' },
    { id: 'docker', label: 'Docker Sandbox' },
  ];

  return (
    <section id="skills" aria-label="Skills Section" className="relative py-24 sm:py-32 overflow-clip">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center space-x-2 font-mono text-xs text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>02 // TECH STACK & TOOLING</span>
          </div>

          {/* Flying Heading (Item 3) */}
          <FlyingTitle
            text={lang === 'vi' ? 'Hệ thống Kỹ năng' : 'Technical Skills'}
            className="mt-3 font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white not-dark:text-slate-900"
          />

          {/* Orbiting Stack Chips Cluster 1 (Item 4) */}
          <OrbitTags chips={skillsOrbitChips} radiusX={240} radiusY={62} />

          <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-400 not-dark:text-slate-600 font-sans">
            {lang === 'vi'
              ? 'Công cụ là phương tiện, cốt lõi là tư duy: thành thạo Backend (Laravel, Node.js), làm chủ Frontend hiện đại (React 19) và luôn đặt tính toàn vẹn dữ liệu, hiệu năng bộ đệm lên hàng đầu.'
              : 'Tools serve the architecture, grounded in core engineering principles: proficient in Backend (Laravel, Node.js), modern Frontend (React 19), prioritizing data integrity and caching performance.'}
          </p>
        </div>
      </div>

      {/* Dual Row Reverse Marquee */}
      <div className="mb-16 space-y-4">
        {/* Row 1 (moving left) */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] space-x-4">
            {[...marqueeRow1, ...marqueeRow1, ...marqueeRow1].map((skill, index) => (
              <div
                key={index}
                className="group flex items-center space-x-2.5 rounded-xl border border-white/10 bg-[#0E0E18]/55 px-4 py-2.5 shadow-sm transition-colors hover:border-cyan-400 not-dark:bg-white/70 not-dark:border-slate-200"
              >
                <div className="group-hover:scale-110 transition-transform">
                  {getSkillIcon(skill.name)}
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs font-semibold text-slate-200 not-dark:text-slate-800">
                    {skill.name}
                  </span>
                  <span className="font-mono text-[10px] text-cyan-400">
                    {skill.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 (moving right) */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-[marqueeReverse_28s_linear_infinite] hover:[animation-play-state:paused] space-x-4">
            {[...marqueeRow2, ...marqueeRow2, ...marqueeRow2].map((skill, index) => (
              <div
                key={index}
                className="group flex items-center space-x-2.5 rounded-xl border border-white/10 bg-[#0E0E18]/55 px-4 py-2.5 shadow-sm transition-colors hover:border-emerald-400 not-dark:bg-white/70 not-dark:border-slate-200"
              >
                <div className="group-hover:scale-110 transition-transform">
                  {getSkillIcon(skill.name)}
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs font-semibold text-slate-200 not-dark:text-slate-800">
                    {skill.name}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400">
                    {skill.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categorized Skills Grid */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Category Filter Tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold shadow-lg shadow-cyan-500/20'
                : 'border border-white/10 bg-white/5 text-slate-400 hover:text-slate-200 not-dark:border-slate-300 not-dark:text-slate-700 not-dark:bg-white not-dark:hover:bg-slate-100'
            }`}
          >
            {lang === 'vi' ? 'Tất cả kỹ năng' : 'All Technologies'}
          </button>
          {profileData.skills.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-medium transition-all ${
                activeCategory === idx
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold shadow-lg shadow-cyan-500/20'
                  : 'border border-white/10 bg-white/5 text-slate-400 hover:text-slate-200 not-dark:border-slate-300 not-dark:text-slate-700 not-dark:bg-white not-dark:hover:bg-slate-100'
              }`}
            >
              {cat.category[lang]}
            </button>
          ))}
        </div>

        {/* Grid of skills */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {displayedSkills.map((skill, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0E0E18]/55 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] not-dark:bg-white/85 not-dark:border-slate-200/90 not-dark:shadow-[0_4px_16px_rgba(0,0,0,0.03)] not-dark:hover:border-emerald-600/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 group-hover:bg-cyan-500/10 group-hover:scale-105 transition-all not-dark:bg-slate-100">
                  {getSkillIcon(skill.name)}
                </div>
                {skill.featured && (
                  <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-cyan-300 border border-cyan-500/30 not-dark:bg-emerald-50 not-dark:border-emerald-200 not-dark:text-emerald-800">
                    CORE
                  </span>
                )}
              </div>
              <h3 className="mt-3 font-mono text-xs sm:text-sm font-semibold text-slate-100 not-dark:text-slate-900 group-hover:text-cyan-300 not-dark:group-hover:text-emerald-700 transition-colors">
                {skill.name}
              </h3>
              <p className="mt-0.5 text-[10px] font-mono text-slate-500 not-dark:text-slate-600">
                {skill.categoryName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

