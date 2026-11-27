import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Copy,
  Building,
  Phone,
  MessageSquare,
  Calendar,
  Briefcase,
} from 'lucide-react';
import { ZaloIcon } from './Icons';
import { profileData } from '../../data/profile';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from './Toast';
import { fireConfetti } from './ConfettiTrigger';

interface JobInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const JobInquiryModal: React.FC<JobInquiryModalProps> = ({
  isOpen,
  onClose,
  initialTopic,
}) => {
  const { lang } = useLanguage();
  const { showToast } = useToast();

  const [company, setCompany] = useState('');
  const [roleType, setRoleType] = useState('fullstack');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [interviewFormat, setInterviewFormat] = useState('online');

  // Templates
  const templates = [
    {
      id: 'interview',
      label: lang === 'vi' ? '🎯 Mời phỏng vấn tuyển dụng' : '🎯 Interview Invitation',
      getMsg: (comp: string) =>
        lang === 'vi'
          ? `Chào Linh, mình từ ${comp || '[Tên công ty]'}, hiện bên mình đang tìm kiếm vị trí Web Developer (Fullstack / Backend) tại TP.HCM. Mình rất ấn tượng với dự án TravelGo, TitiSport và kinh nghiệm thực tế của em. Bên mình muốn mời em tham gia buổi phỏng vấn trao đổi chi tiết hơn.`
          : `Hi Linh, I am reaching out from ${comp || '[Company Name]'}. We are seeking a Web Developer (Fullstack / Backend) in Ho Chi Minh City. We are very impressed by your live projects (TravelGo, TitiSport) and enterprise background, and would love to invite you for an interview.`,
    },
    {
      id: 'architecture',
      label: lang === 'vi' ? '🏗️ Trao đổi kiến trúc dự án' : '🏗️ Architecture Discussion',
      getMsg: (comp: string) =>
        lang === 'vi'
          ? `Chào Linh, mình từ ${comp || '[Tên công ty/Tech Lead]'}, đã xem qua kiến trúc Event-Service, xử lý thanh toán VNPay/ZaloPay và concurrency tồn kho của em. Mình muốn trao đổi kỹ thuật sâu hơn về các giải pháp em đã áp dụng.`
          : `Hi Linh, I am from ${comp || '[Company/Tech Lead]'}. I reviewed your Event-Service architecture, VNPay/ZaloPay webhook flows, and concurrency handling. I would love to schedule a technical deep-dive discussion with you.`,
    },
    {
      id: 'project',
      label: lang === 'vi' ? '💼 Hợp tác dự án / Freelance' : '💼 Project / Contract',
      getMsg: (comp: string) =>
        lang === 'vi'
          ? `Chào Linh, mình từ ${comp || '[Tên công ty/Khách hàng]'}, đang có dự án web cần phát triển backend và tích hợp cổng thanh toán. Muốn trao đổi với em về kế hoạch và thời gian triển khai.`
          : `Hi Linh, I am reaching out from ${comp || '[Company/Client]'}. Our team has an upcoming web system project requiring backend engineering and payment integration. We would like to discuss scope and timelines.`,
    },
  ];

  // Set initial template or topic
  useEffect(() => {
    if (isOpen) {
      if (initialTopic) {
        setMessage(
          lang === 'vi'
            ? `Chào Linh, mình muốn trao đổi cụ thể về: ${initialTopic}. Bạn có thể sắp xếp một buổi thảo luận kỹ thuật hoặc phỏng vấn không?`
            : `Hi Linh, I would like to discuss: ${initialTopic}. Are you available for a technical discussion or interview?`
        );
      } else if (!message) {
        setMessage(templates[0].getMsg(company));
      }
    }
  }, [isOpen, initialTopic, lang]);

  if (!isOpen) return null;

  // Format the complete invitation message
  const getFormattedMessage = () => {
    const roleLabels: Record<string, { vi: string; en: string }> = {
      fullstack: { vi: 'Fullstack Developer', en: 'Fullstack Developer' },
      backend: { vi: 'Backend Developer', en: 'Backend Developer' },
      contract: { vi: 'Dự án / Hợp đồng', en: 'Contract / Project' },
      other: { vi: 'Vị trí khác', en: 'Other Role' },
    };

    const formatLabels: Record<string, { vi: string; en: string }> = {
      online: { vi: 'Phỏng vấn Online (Google Meet / Zoom)', en: 'Online (Google Meet / Zoom)' },
      onsite: { vi: 'Gặp trực tiếp tại TP.HCM', en: 'On-site in HCMC' },
      flexible: { vi: 'Linh hoạt theo thỏa thuận', en: 'Flexible' },
    };

    const targetRole = roleLabels[roleType]?.[lang] || roleType;
    const interviewPref = formatLabels[interviewFormat]?.[lang] || interviewFormat;

    return (
      `[THÔNG TIN LỜI MỜI PHỎNG VẤN & KẾT NỐI CÔNG VIỆC]\n` +
      `----------------------------------------\n` +
      `• Người gửi / Công ty: ${company || (lang === 'vi' ? 'Nhà tuyển dụng' : 'Recruiter')}\n` +
      `• Vị trí đề xuất: ${targetRole}\n` +
      `• Kênh liên hệ lại: ${contactInfo || (lang === 'vi' ? 'Chưa cung cấp' : 'Not provided')}\n` +
      `• Hình thức phỏng vấn: ${interviewPref}\n` +
      `----------------------------------------\n` +
      `Nội dung tin nhắn:\n${message}\n` +
      `----------------------------------------\n` +
      `Gửi tới ứng viên: Phan Vũ Linh (0343842424 - linhphanzzz04@gmail.com)`
    );
  };

  const handleCopy = () => {
    const text = getFormattedMessage();
    navigator.clipboard.writeText(text);
    fireConfetti();
    showToast(
      lang === 'vi'
        ? 'Đã sao chép nội dung lời mời vào bộ nhớ tạm!'
        : 'Copied invitation details to clipboard!'
    );
  };

  const handleSendZalo = () => {
    const text = getFormattedMessage();
    navigator.clipboard.writeText(text);
    fireConfetti();
    showToast(
      lang === 'vi'
        ? 'Đã copy nội dung! Đang mở Zalo của Linh...'
        : 'Details copied! Opening Zalo...'
    );
    setTimeout(() => {
      window.open(profileData.contact.zaloUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(
      `[Lời mời phỏng vấn & Hợp tác] - ${company ? company + ' - ' : ''}Phan Vũ Linh`
    );
    const body = encodeURIComponent(getFormattedMessage());
    fireConfetti();
    window.location.href = `mailto:${profileData.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-cyan-500/40 bg-[#0B0B14] p-5 sm:p-8 shadow-2xl backdrop-blur-2xl text-slate-100 not-dark:bg-white not-dark:border-slate-300 not-dark:text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors not-dark:border-slate-200 not-dark:text-slate-600 not-dark:hover:bg-slate-100 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span>06 // DIRECT JOB INQUIRY</span>
        </div>

        <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold font-syne tracking-tight text-white not-dark:text-slate-900">
          {lang === 'vi'
            ? 'Gửi lời mời phỏng vấn & Kết nối'
            : 'Job & Interview Invitation'}
        </h3>
        <p className="mt-1 font-sans text-xs sm:text-sm text-slate-400 not-dark:text-slate-600">
          {lang === 'vi'
            ? 'Phan Vũ Linh sẵn sàng nhận việc ngay tại TP.HCM. Phản hồi cam kết dưới 30 phút qua Zalo/Điện thoại!'
            : 'Phan Vu Linh is ready for immediate start in HCMC. Guaranteed response under 30 minutes via Zalo/Phone!'}
        </p>

        {/* Quick Template Switcher */}
        <div className="mt-5">
          <label className="font-mono text-xs font-semibold text-slate-300 not-dark:text-slate-700 uppercase tracking-wider block mb-2">
            {lang === 'vi' ? 'Mẫu nội dung nhanh' : 'Quick Message Presets'}:
          </label>
          <div className="flex flex-wrap gap-2">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setMessage(tpl.getMsg(company))}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-sans text-xs text-slate-300 hover:border-cyan-400 hover:text-cyan-300 transition-colors not-dark:border-slate-300 not-dark:bg-slate-100 not-dark:text-slate-800 not-dark:hover:border-cyan-600 cursor-pointer"
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <div className="mt-6 space-y-4">
          {/* Row 1: Company / Recruiter Name & Target Role */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="flex items-center space-x-1.5 font-mono text-xs text-slate-300 not-dark:text-slate-700 mb-1.5 font-medium">
                <Building className="h-3.5 w-3.5 text-cyan-400" />
                <span>{lang === 'vi' ? 'Tên Công ty / Người liên hệ' : 'Company / Recruiter Name'}</span>
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder={lang === 'vi' ? 'VD: Tech Corp, Anh Tuấn...' : 'e.g. Acme Inc, Alex...'}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 font-sans text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none not-dark:border-slate-300 not-dark:bg-slate-50 not-dark:text-slate-900"
              />
            </div>

            <div>
              <label className="flex items-center space-x-1.5 font-mono text-xs text-slate-300 not-dark:text-slate-700 mb-1.5 font-medium">
                <Briefcase className="h-3.5 w-3.5 text-emerald-400" />
                <span>{lang === 'vi' ? 'Vị trí tìm kiếm' : 'Position / Role'}</span>
              </label>
              <select
                value={roleType}
                onChange={(e) => setRoleType(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-[#121220] px-3.5 py-2.5 font-sans text-sm text-white focus:border-cyan-400 focus:outline-none not-dark:border-slate-300 not-dark:bg-slate-50 not-dark:text-slate-900"
              >
                <option value="fullstack">Web Developer (Fullstack)</option>
                <option value="backend">Backend Developer (Node.js / Laravel)</option>
                <option value="contract">Dự án Phần mềm / Freelance</option>
                <option value="other">{lang === 'vi' ? 'Vị trí khác' : 'Other'}</option>
              </select>
            </div>
          </div>

          {/* Row 2: Recruiter Contact Info & Interview Format */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="flex items-center space-x-1.5 font-mono text-xs text-slate-300 not-dark:text-slate-700 mb-1.5 font-medium">
                <Phone className="h-3.5 w-3.5 text-blue-400" />
                <span>{lang === 'vi' ? 'Email / SĐT / Zalo của bạn' : 'Your Email / Phone / Zalo'}</span>
              </label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder={lang === 'vi' ? 'VD: hr@company.com hoặc 090xxx...' : 'e.g. hr@company.com...'}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 font-sans text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none not-dark:border-slate-300 not-dark:bg-slate-50 not-dark:text-slate-900"
              />
            </div>

            <div>
              <label className="flex items-center space-x-1.5 font-mono text-xs text-slate-300 not-dark:text-slate-700 mb-1.5 font-medium">
                <Calendar className="h-3.5 w-3.5 text-amber-400" />
                <span>{lang === 'vi' ? 'Hình thức phỏng vấn mong muốn' : 'Interview Preference'}</span>
              </label>
              <select
                value={interviewFormat}
                onChange={(e) => setInterviewFormat(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-[#121220] px-3.5 py-2.5 font-sans text-sm text-white focus:border-cyan-400 focus:outline-none not-dark:border-slate-300 not-dark:bg-slate-50 not-dark:text-slate-900"
              >
                <option value="online">Online (Google Meet / Zoom)</option>
                <option value="onsite">Trực tiếp tại TP.HCM (Onsite)</option>
                <option value="flexible">Linh hoạt theo lịch hai bên</option>
              </select>
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <label className="flex items-center space-x-1.5 font-mono text-xs text-slate-300 not-dark:text-slate-700 mb-1.5 font-medium">
              <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
              <span>{lang === 'vi' ? 'Lời nhắn & Đề xuất' : 'Message & Proposal'}</span>
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/5 p-3.5 font-sans text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none not-dark:border-slate-300 not-dark:bg-slate-50 not-dark:text-slate-900 leading-relaxed"
            />
          </div>
        </div>

        {/* 3 Instant Action Buttons */}
        <div className="mt-8 border-t border-white/10 pt-5 not-dark:border-slate-200">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* Action 1: Zalo Direct Send */}
            <button
              type="button"
              onClick={handleSendZalo}
              className="flex items-center justify-center space-x-2 rounded-xl bg-blue-600 px-4 py-3 font-mono text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 active:scale-95 transition-all cursor-pointer"
            >
              <ZaloIcon className="h-4 w-4 shrink-0" />
              <span>{lang === 'vi' ? 'Nhắn Zalo ngay' : 'Send via Zalo'}</span>
            </button>

            {/* Action 2: Direct Email */}
            <button
              type="button"
              onClick={handleSendEmail}
              className="flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-3 font-mono text-xs sm:text-sm font-bold text-black shadow-lg shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span>{lang === 'vi' ? 'Gửi qua Email' : 'Send Email'}</span>
            </button>

            {/* Action 3: Copy Text */}
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center justify-center space-x-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 font-mono text-xs sm:text-sm font-semibold text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-colors not-dark:border-slate-300 not-dark:text-slate-800 not-dark:hover:bg-slate-100 cursor-pointer"
            >
              <Copy className="h-4 w-4 shrink-0" />
              <span>{lang === 'vi' ? 'Sao chép tin nhắn' : 'Copy Message'}</span>
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 not-dark:text-slate-500">
            <span>SĐT/Zalo: 0343842424</span>
            <span>Email: linhphanzzz04@gmail.com</span>
            <span>Địa điểm: TP. Hồ Chí Minh</span>
          </div>
        </div>
      </div>
    </div>
  );
};
