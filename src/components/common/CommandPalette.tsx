import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  User,
  Cpu,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Mail,
  Moon,
  Sun,
  Languages,
  Copy,
  Sparkles,
  ExternalLink,
  Phone,
  FileText,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from './Toast';
import { fireConfetti } from './ConfettiTrigger';
import { profileData, CV_URL } from '../../data/profile';
import { ZaloIcon } from './Icons';
import { copyRecruiterBrief } from '../../data/recruiterBrief';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenJobInquiry?: (topic?: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenJobInquiry,
}) => {
  const { lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const scrollTo = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(
      lang === 'vi'
        ? `Đã sao chép ${label} vào bộ nhớ tạm!`
        : `Copied ${label} to clipboard!`
    );
    onClose();
  };

  const actions = [
    {
      id: 'sec-hero',
      title: lang === 'vi' ? 'Đầu trang (Hero)' : 'Top of page (Hero)',
      category: lang === 'vi' ? 'Điều hướng' : 'Navigation',
      icon: <Sparkles className="h-4 w-4 text-cyan-400" />,
      run: () => scrollTo('hero'),
    },
    {
      id: 'sec-about',
      title: lang === 'vi' ? 'Giới thiệu & Số liệu' : 'About & Metrics',
      category: lang === 'vi' ? 'Điều hướng' : 'Navigation',
      icon: <User className="h-4 w-4 text-cyan-400" />,
      run: () => scrollTo('about'),
    },
    {
      id: 'sec-skills',
      title: lang === 'vi' ? 'Kỹ năng công nghệ' : 'Tech Skills',
      category: lang === 'vi' ? 'Điều hướng' : 'Navigation',
      icon: <Cpu className="h-4 w-4 text-emerald-400" />,
      run: () => scrollTo('skills'),
    },
    {
      id: 'sec-exp',
      title: lang === 'vi' ? 'Kinh nghiệm (TechVanguard)' : 'Experience (TechVanguard)',
      category: lang === 'vi' ? 'Điều hướng' : 'Navigation',
      icon: <Briefcase className="h-4 w-4 text-amber-400" />,
      run: () => scrollTo('experience'),
    },
    {
      id: 'sec-proj',
      title: lang === 'vi' ? 'Dự án (TravelGo, TitiSport)' : 'Projects (TravelGo, TitiSport)',
      category: lang === 'vi' ? 'Điều hướng' : 'Navigation',
      icon: <FolderGit2 className="h-4 w-4 text-cyan-400" />,
      run: () => scrollTo('projects'),
    },
    {
      id: 'sec-edu',
      title: lang === 'vi' ? 'Học vấn (ĐH Công nghệ Sài Gòn)' : 'Education (STU)',
      category: lang === 'vi' ? 'Điều hướng' : 'Navigation',
      icon: <GraduationCap className="h-4 w-4 text-emerald-400" />,
      run: () => scrollTo('education'),
    },
    {
      id: 'sec-contact',
      title: lang === 'vi' ? 'Liên hệ tuyển dụng' : 'Contact Recruiter',
      category: lang === 'vi' ? 'Điều hướng' : 'Navigation',
      icon: <Mail className="h-4 w-4 text-rose-400" />,
      run: () => scrollTo('contact'),
    },
    // Actions
    {
      id: 'act-job-inquiry',
      title: lang === 'vi' ? '💼 Gửi lời mời phỏng vấn & Kết nối công việc' : '💼 Send Job & Interview Invitation',
      category: lang === 'vi' ? 'Hành động nhanh' : 'Quick Actions',
      icon: <Sparkles className="h-4 w-4 text-cyan-400" />,
      run: () => {
        onOpenJobInquiry?.();
        onClose();
      },
    },
    {
      id: 'act-recruiter-brief',
      title: lang === 'vi' ? '📋 Sao chép tóm tắt ứng viên cho Recruiter (Markdown)' : '📋 Copy Recruiter Candidate Brief (Markdown)',
      category: lang === 'vi' ? 'Hành động nhanh' : 'Quick Actions',
      icon: <Sparkles className="h-4 w-4 text-emerald-400" />,
      run: () => {
        copyRecruiterBrief(lang, showToast);
        onClose();
      },
    },
    {
      id: 'act-download-cv',
      title: lang === 'vi' ? 'Xem / Tải CV (PDF) — Phan Vũ Linh' : 'Preview / Download CV (PDF) — Phan Vu Linh',
      category: lang === 'vi' ? 'Tài liệu' : 'Documents',
      icon: <FileText className="h-4 w-4 text-[#C8FF2E]" />,
      run: () => {
        window.open(CV_URL, '_blank');
        onClose();
      },
    },
    {
      id: 'act-zalo',
      title: `${lang === 'vi' ? 'Nhắn tin qua Zalo' : 'Chat via Zalo'}: ${profileData.contact.phone}`,
      category: lang === 'vi' ? 'Hành động nhanh' : 'Quick Actions',
      icon: <ZaloIcon className="h-4 w-4 text-blue-500" />,
      run: () => {
        window.open(profileData.contact.zaloUrl || 'https://zalo.me/0343842424', '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'act-copy-email',
      title: `${lang === 'vi' ? 'Sao chép Email' : 'Copy Email'}: ${profileData.contact.email}`,
      category: lang === 'vi' ? 'Hành động nhanh' : 'Quick Actions',
      icon: <Copy className="h-4 w-4 text-cyan-400" />,
      run: () => copyToClipboard(profileData.contact.email, 'Email'),
    },
    {
      id: 'act-copy-phone',
      title: `${lang === 'vi' ? 'Sao chép SĐT' : 'Copy Phone'}: ${profileData.contact.phone}`,
      category: lang === 'vi' ? 'Hành động nhanh' : 'Quick Actions',
      icon: <Phone className="h-4 w-4 text-emerald-400" />,
      run: () => copyToClipboard(profileData.contact.phone, lang === 'vi' ? 'Số điện thoại' : 'Phone'),
    },
    {
      id: 'act-lang',
      title: lang === 'vi' ? 'Chuyển sang Tiếng Anh (English)' : 'Switch to Vietnamese (Tiếng Việt)',
      category: lang === 'vi' ? 'Cài đặt' : 'Preferences',
      icon: <Languages className="h-4 w-4 text-amber-400" />,
      run: () => {
        setLang(lang === 'vi' ? 'en' : 'vi');
        onClose();
      },
    },
    {
      id: 'act-theme',
      title: theme === 'dark' ? (lang === 'vi' ? 'Chuyển giao diện Sáng' : 'Switch to Light Mode') : (lang === 'vi' ? 'Chuyển giao diện Tối' : 'Switch to Dark Mode'),
      category: lang === 'vi' ? 'Cài đặt' : 'Preferences',
      icon: theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-cyan-400" />,
      run: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: 'act-github',
      title: 'GitHub Profile (PhanVuLinh)',
      category: lang === 'vi' ? 'Liên kết' : 'External Links',
      icon: <ExternalLink className="h-4 w-4 text-slate-300" />,
      run: () => {
        window.open(profileData.contact.githubUrl, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'act-confetti',
      title: lang === 'vi' ? 'Bắn Confetti Ăn Mừng! 🎉' : 'Celebrate with Confetti! 🎉',
      category: 'Easter Egg',
      icon: <Sparkles className="h-4 w-4 text-yellow-400" />,
      run: () => {
        fireConfetti();
        onClose();
      },
    },
  ];

  const filtered = actions.filter((act) =>
    act.title.toLowerCase().includes(query.toLowerCase()) ||
    act.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].run();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-9999 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#0E0E18]/95 shadow-2xl backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div className="flex items-center border-b border-white/10 px-4 py-3.5">
          <Search className="h-5 w-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={
              lang === 'vi'
                ? 'Gõ lệnh hoặc tìm kiếm (ví dụ: dự án, skills, copy, email)...'
                : 'Type a command or search (e.g., projects, skills, email)...'
            }
            className="ml-3 w-full bg-transparent font-mono text-sm text-slate-100 placeholder-slate-500 outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center rounded border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-slate-400">
            ESC
          </kbd>
        </div>

        {/* List of actions */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center font-mono text-xs text-slate-500">
              {lang === 'vi' ? 'Không tìm thấy kết quả phù hợp.' : 'No matching commands found.'}
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={item.run}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-colors duration-100 ${
                    isSelected
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium font-sans">{item.title}</div>
                      <div className="text-[11px] font-mono text-slate-500">{item.category}</div>
                    </div>
                  </div>
                  <kbd className="text-[10px] font-mono text-slate-500 opacity-60">↵ Enter</kbd>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-white/10 bg-white/5 px-4 py-2 font-mono text-[11px] text-slate-400">
          <span>{lang === 'vi' ? 'Dùng phím ↑ ↓ để chọn, Enter để chạy' : 'Use ↑ ↓ to navigate, Enter to run'}</span>
          <span>Phan Vũ Linh Portfolio</span>
        </div>
      </div>
    </div>
  );
};

