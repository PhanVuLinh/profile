import React from 'react';
import {
  ExternalLink,
  Lock,
  QrCode,
  ShieldCheck,
  CreditCard,
  ShoppingBag,
  Compass,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ProjectBrowserMockupProps {
  projectId: string;
  title: string;
  demoUrl: string;
}

export const ProjectBrowserMockup: React.FC<ProjectBrowserMockupProps> = ({
  projectId,
  demoUrl,
}) => {
  const { lang } = useLanguage();
  const isTravelGo = projectId === 'travelgo';

  return (
    <div className="relative mt-5 mb-6 overflow-hidden rounded-xl border border-white/15 bg-[#080811] shadow-2xl transition-all duration-300 group-hover:border-cyan-400/50 not-dark:border-slate-300 not-dark:bg-slate-100/90">
      {/* Browser Window Chrome Topbar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#12121E] px-3.5 py-2 not-dark:border-slate-200 not-dark:bg-slate-200/80">
        {/* macOS Window Controls */}
        <div className="flex items-center space-x-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] opacity-90 shadow-xs" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] opacity-90 shadow-xs" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F] opacity-90 shadow-xs" />
        </div>

        {/* Browser URL Bar */}
        <div className="flex max-w-[220px] sm:max-w-[280px] flex-1 items-center justify-center mx-2 rounded-md bg-black/40 px-2.5 py-1 font-mono text-[10px] text-slate-300 border border-white/5 not-dark:bg-white not-dark:border-slate-300 not-dark:text-slate-700">
          <Lock className="mr-1.5 h-2.5 w-2.5 text-emerald-400" />
          <span className="truncate">
            {isTravelGo ? 'travelgo.vercel.app' : 'titisport.onrender.com'}
          </span>
          <ExternalLink className="ml-1.5 h-2.5 w-2.5 text-slate-500 opacity-70" />
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center space-x-1 text-[9px] font-mono text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">200 OK</span>
        </div>
      </div>

      {/* Browser Viewport Area (Interactive Visual Wireframe Preview) */}
      <div className="relative p-4 sm:p-5 select-none overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]">
        {/* Subtle background glow */}
        <div
          className={`absolute -right-10 -top-10 h-44 w-44 rounded-full blur-[60px] pointer-events-none opacity-40 transition-opacity group-hover:opacity-80 ${
            isTravelGo ? 'bg-cyan-500/20' : 'bg-emerald-500/20'
          }`}
        />

        {isTravelGo ? (
          /* ================= TRAVELGO PREVIEW ================= */
          <div className="space-y-3 font-sans">
            {/* Mini Nav header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2 not-dark:border-slate-200">
              <div className="flex items-center space-x-1.5">
                <Compass className="h-4 w-4 text-cyan-400" />
                <span className="font-syne font-bold text-xs text-white not-dark:text-slate-900">
                  TravelGo
                </span>
                <span className="rounded bg-cyan-500/20 px-1 py-0.2 font-mono text-[8px] text-cyan-300">
                  React 19
                </span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>VNPay IPN</span>
              </span>
            </div>

            {/* Tour Hero Card Simulation */}
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-cyan-950/70 via-slate-900/80 to-blue-950/70 p-3.5 border border-cyan-500/20 not-dark:from-cyan-100 not-dark:via-sky-50 not-dark:to-emerald-50 not-dark:border-cyan-200">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-300 font-semibold not-dark:text-cyan-700">
                    Phú Quốc 3N2Đ • 5 Sao
                  </span>
                  <h4 className="mt-0.5 font-syne text-sm font-bold text-white not-dark:text-slate-900">
                    Tour Nghỉ Dưỡng Biển Đảo VIP
                  </h4>
                </div>
                <span className="rounded-full bg-cyan-400/20 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-300 not-dark:bg-cyan-600 not-dark:text-white">
                  3.490.000₫
                </span>
              </div>

              {/* 3-Step Booking Stepper */}
              <div className="mt-3 grid grid-cols-3 gap-1.5 text-center font-mono text-[9px]">
                <div className="rounded bg-cyan-500/20 py-1 text-cyan-300 border border-cyan-500/30 not-dark:bg-cyan-200 not-dark:text-cyan-900">
                  ✓ 1. Chọn ngày
                </div>
                <div className="rounded bg-cyan-500/20 py-1 text-cyan-300 border border-cyan-500/30 not-dark:bg-cyan-200 not-dark:text-cyan-900">
                  ✓ 2. Coupon
                </div>
                <div className="rounded bg-emerald-500/25 py-1 text-emerald-300 font-bold border border-emerald-500/40 animate-pulse not-dark:bg-emerald-200 not-dark:text-emerald-900">
                  ⚡ 3. VNPay
                </div>
              </div>
            </div>

            {/* Smart QR E-Ticket Boarding Pass Bar */}
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 p-2.5 text-xs not-dark:bg-white not-dark:border-slate-200">
              <div className="flex items-center space-x-2">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <QrCode className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-mono text-[10px] font-bold text-slate-200 not-dark:text-slate-900">
                    E-Ticket QR Scanner
                  </div>
                  <div className="font-mono text-[9px] text-slate-400 not-dark:text-slate-500">
                    Quét camera tra cứu tức thì
                  </div>
                </div>
              </div>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[9px] text-emerald-400 font-semibold border border-emerald-500/30">
                ACTIVE PASS
              </span>
            </div>
          </div>
        ) : (
          /* ================= TITISPORT PREVIEW ================= */
          <div className="space-y-3 font-sans">
            {/* Mini Nav header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2 not-dark:border-slate-200">
              <div className="flex items-center space-x-1.5">
                <ShoppingBag className="h-4 w-4 text-emerald-400" />
                <span className="font-syne font-bold text-xs text-white not-dark:text-slate-900">
                  TitiSport Pro
                </span>
                <span className="rounded bg-emerald-500/20 px-1 py-0.2 font-mono text-[8px] text-emerald-300">
                  Node · Express
                </span>
              </div>
              <div className="flex items-center space-x-2 font-mono text-[9px]">
                <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-purple-300 border border-purple-500/30 flex items-center space-x-1">
                  <ShieldCheck className="h-2.5 w-2.5" />
                  <span>RBAC Admin</span>
                </span>
              </div>
            </div>

            {/* Sporting Goods Product Showcase */}
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-emerald-950/70 via-slate-900/80 to-teal-950/70 p-3.5 border border-emerald-500/20 not-dark:from-emerald-100 not-dark:via-teal-50 not-dark:to-slate-100 not-dark:border-emerald-200">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-300 font-semibold not-dark:text-emerald-700">
                    Bóng Đá Chuyên Nghiệp • Size 40-44
                  </span>
                  <h4 className="mt-0.5 font-syne text-sm font-bold text-white not-dark:text-slate-900">
                    Giày Cỏ Nhân Tạo Elite Speed
                  </h4>
                </div>
                <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300 not-dark:bg-emerald-600 not-dark:text-white">
                  1.250.000₫
                </span>
              </div>

              {/* Multi-Size Variant Selector with Concurrency Lock indicator */}
              <div className="mt-3 flex items-center justify-between font-mono text-[9px]">
                <div className="flex items-center space-x-1">
                  <span className="text-slate-400 text-[9px]">Size:</span>
                  {['39', '40', '41', '42'].map((size, idx) => (
                    <span
                      key={idx}
                      className={`px-1.5 py-0.5 rounded border ${
                        size === '41'
                          ? 'border-emerald-400 bg-emerald-500/30 text-emerald-300 font-bold not-dark:bg-emerald-200 not-dark:text-emerald-900'
                          : 'border-white/10 bg-white/5 text-slate-400 not-dark:border-slate-300 not-dark:bg-white'
                      }`}
                    >
                      {size}
                    </span>
                  ))}
                </div>
                <span className="text-emerald-400 text-[9px] font-semibold flex items-center space-x-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Atomic Lock: Còn 3</span>
                </span>
              </div>
            </div>

            {/* Dual Payment Verification Bar */}
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 p-2.5 text-xs not-dark:bg-white not-dark:border-slate-200">
              <div className="flex items-center space-x-2">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div className="font-mono text-[10px] text-slate-200 not-dark:text-slate-900">
                  <span className="text-emerald-400 font-bold">ZaloPay</span> +{' '}
                  <span className="text-cyan-400 font-bold">VNPay</span>
                </div>
              </div>
              <span className="font-mono text-[9px] text-slate-400 flex items-center space-x-1">
                <Sparkles className="h-3 w-3 text-amber-400" />
                <span>Anti-Abuse Coupon</span>
              </span>
            </div>
          </div>
        )}

        {/* Hover Action Overlay Pill */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-2 font-mono text-xs font-bold text-black shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <span>{lang === 'vi' ? 'Mở sản phẩm thực tế' : 'Open Live Product'}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
