import React, { useState, useRef } from 'react';
import {
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  X,
} from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { profileData } from '../../data/profile';
import { useLanguage } from '../../context/LanguageContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { FlyingTitle } from '../common/FlyingTitle';
import { OrbitTags } from '../common/OrbitTags';

interface ProjectCardProps {
  project: (typeof profileData.projects)[0];
  onOpenModal: (project: (typeof profileData.projects)[0]) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const { lang } = useLanguage();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // Calculate rotation (-6 to 6 deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = -((y - centerY) / centerY) * 5;
    const rotY = ((x - centerX) / centerX) * 5;
    setRotate({ x: rotX, y: rotY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          isHovered && !reducedMotion
            ? `perspective(1000px) rotateX(${rotate.x.toFixed(2)}deg) rotateY(${rotate.y.toFixed(2)}deg) translateY(-4px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0E0E18]/60 p-6 sm:p-8 shadow-xl not-dark:bg-white/75 not-dark:border-slate-200"
    >
      {/* Mouse Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.12), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div>
        {/* Top bar: Badge & Type */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 not-dark:border-slate-200">
          <span className="inline-flex items-center space-x-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>{project.badge}</span>
          </span>
          <span className="font-mono text-xs text-slate-400 not-dark:text-slate-500">
            {project.type[lang]}
          </span>
        </div>

        {/* Project Title & Tagline */}
        <div className="mt-5">
          <h3 className="font-syne text-2xl sm:text-3xl font-extrabold tracking-tight text-white not-dark:text-slate-900 group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-xs sm:text-sm text-cyan-300 not-dark:text-cyan-600">
            {project.tagline[lang]}
          </p>
        </div>

        {/* Key Highlights (first 3) */}
        <div className="mt-5 space-y-2.5">
          {project.highlights[lang].slice(0, 3).map((hl, idx) => (
            <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-300 not-dark:text-slate-700 leading-relaxed">
              <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                <CheckCircle2 className="h-3 w-3" />
              </div>
              <span>{hl}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((tech, idx) => (
            <span
              key={idx}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-slate-300 not-dark:border-slate-200 not-dark:bg-slate-100 not-dark:text-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 not-dark:border-slate-200">
        <div className="flex items-center space-x-2">
          {/* Live Demo */}
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-2 font-mono text-xs font-bold text-black shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <span>Live Demo</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          {/* GitHub Repo */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} GitHub Repository`}
            className="inline-flex items-center space-x-1.5 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 font-mono text-xs font-semibold text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-colors not-dark:border-slate-300 not-dark:text-slate-800 not-dark:hover:bg-slate-100"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Read More / Inspect Architecture Button */}
        <button
          onClick={() => onOpenModal(project)}
          className="inline-flex items-center space-x-1 font-mono text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-4 cursor-pointer"
        >
          <span>{lang === 'vi' ? 'Xem chi tiết tính năng' : 'Full Architecture'}</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const { lang } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<(typeof profileData.projects)[0] | null>(null);

  const projectsOrbitChips = [
    { id: 'vnpay', label: 'VNPay Gateway' },
    { id: 'zalopay', label: 'ZaloPay' },
    { id: 'rbac', label: 'RBAC Security' },
    { id: 'e_ticket', label: 'E-Ticket QR' },
    { id: 'docker_sb', label: 'Docker Sandbox' },
    { id: 'rest_api', label: 'RESTful API' },
  ];

  return (
    <section id="projects" aria-label="Projects Section" className="relative py-24 sm:py-32 overflow-clip">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center space-x-2 font-mono text-xs text-cyan-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>04 // FEATURED WORKS</span>
          </div>

          {/* Flying Heading (Item 3) */}
          <FlyingTitle
            text={lang === 'vi' ? 'Dự án Tiêu biểu' : 'Featured Projects'}
            className="mt-3 font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white not-dark:text-slate-900"
          />

          {/* Orbiting Stack Chips Cluster 2 (Item 4) */}
          <OrbitTags chips={projectsOrbitChips} radiusX={240} radiusY={58} />

          <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-400 not-dark:text-slate-600 font-sans">
            {lang === 'vi'
              ? 'Các sản phẩm Fullstack hoàn chỉnh đã deploy production, tích hợp thanh toán trực tuyến (VNPay, ZaloPay), QR Code và bảo mật RBAC.'
              : 'Fullstack production-deployed applications with integrated online payments (VNPay, ZaloPay), QR ticketing, and RBAC authorization.'}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {profileData.projects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onOpenModal={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-cyan-500/30 bg-[#0E0E18] p-6 sm:p-8 shadow-2xl backdrop-blur-2xl not-dark:bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{selectedProject.badge}</span>
            </div>
            <h3 className="mt-2 text-3xl font-bold font-syne text-white not-dark:text-slate-900">
              {selectedProject.title}
            </h3>
            <p className="mt-1 font-mono text-sm text-cyan-300">
              {selectedProject.tagline[lang]}
            </p>

            {/* Stack */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {selectedProject.stack.map((item, idx) => (
                <span
                  key={idx}
                  className="rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 font-mono text-xs text-cyan-300"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Complete Highlights */}
            <div className="mt-6">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                {lang === 'vi' ? 'Chi tiết tính năng & kiến trúc' : 'Architectural & Feature Highlights'}
              </h4>
              <div className="space-y-3 font-sans text-sm text-slate-200 not-dark:text-slate-700 leading-relaxed">
                {selectedProject.highlights[lang].map((hl, idx) => (
                  <div key={idx} className="flex items-start space-x-3 rounded-lg border border-white/5 bg-white/5 p-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
              <a
                href={selectedProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-2.5 font-mono text-xs font-bold text-black shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all"
              >
                <span>Live Demo</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-mono text-xs font-semibold text-slate-200 hover:border-cyan-400 transition-colors"
              >
                <GithubIcon className="h-4 w-4" />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

