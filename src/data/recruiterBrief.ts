import { TRAVELGO_URL, TITISPORT_URL, GITHUB_URL, EMAIL, PHONE } from './profile';
import { fireConfetti } from '../components/common/ConfettiTrigger';

export const generateRecruiterBrief = (lang: 'vi' | 'en'): string => {
  if (lang === 'vi') {
    return `# ỨNG VIÊN: PHAN VŨ LINH — WEB DEVELOPER (FULLSTACK / BACKEND)
📍 Khu vực: TP. Hồ Chí Minh | Sẵn sàng phỏng vấn & nhận việc
📞 Điện thoại: ${PHONE} | ✉️ Email: ${EMAIL}
🔗 GitHub: ${GITHUB_URL}
📄 Portfolio: https://github.com/PhanVuLinh

--------------------------------------------------
1. TỔNG QUAN NĂNG LỰC & KIẾN TRÚC
• Backend & Dịch vụ: Laravel 11, Node.js (Express), kiến trúc Event Handler – Service, RESTful API
• Frontend hiện đại: React 19, TypeScript, Tailwind CSS, React Router v7, Responsive UI
• Cơ sở dữ liệu & Cache: MySQL, MongoDB (Mongoose), Redis Cache, SQL Server
• DevOps & Công cụ: Docker Sandbox, Git/Gitea workflow, Postman, ERD/Sequence Diagram

--------------------------------------------------
2. SẢN PHẨM PRODUCTION TIÊU BIỂU (ĐÃ DEPLOY)
• TravelGo (Hệ thống đặt tour du lịch & Vé điện tử QR):
  - Link Live: ${TRAVELGO_URL}
  - Điểm nhấn: Độc lập làm chủ phân hệ Client (React 19 + API orchestration), tích hợp cổng thanh toán VNPay IPN bảo mật, tính năng tạo và quét mã QR vé qua camera trực tiếp trên trình duyệt.

• TitiSport (Nền tảng thương mại điện tử thể thao):
  - Link Live: ${TITISPORT_URL}
  - Điểm nhấn: Phân quyền quản trị RBAC đa cấp, tích hợp song song ZaloPay & VNPay Webhook, xử lý atomic update tồn kho đa biến thể (size, màu) chống xung đột race condition.

--------------------------------------------------
3. KINH NGHIỆM CODEBASE DOANH NGHIỆP
• Web Developer tại TechVanguard (2026):
  - Tham gia phát triển backend hệ thống khách sạn đa phân hệ: Booking, Room, Billing, Incident.
  - Áp dụng kiến trúc Event-Service, vận hành Redis & Docker simulation, viết Unit/Integration tests và tuân thủ quy trình code review chặt chẽ qua Git/Gitea.
`;
  }

  return `# CANDIDATE: PHAN VU LINH — WEB DEVELOPER (FULLSTACK / BACKEND)
📍 Location: Ho Chi Minh City, Vietnam | Available for immediate interviews
📞 Phone: ${PHONE} | ✉️ Email: ${EMAIL}
🔗 GitHub: ${GITHUB_URL}

--------------------------------------------------
1. CORE STACK & ARCHITECTURAL FOUNDATION
• Backend & Services: Laravel 11, Node.js (Express), Event Handler – Service Architecture, RESTful API
• Modern Frontend: React 19, TypeScript, Tailwind CSS, React Router v7, Adaptive Design
• Database & Cache: MySQL, MongoDB, Redis Cache, SQL Server
• DevOps & Tooling: Docker Sandbox, Git/Gitea team workflows, Postman, ERD/Sequence Modeling

--------------------------------------------------
2. LIVE PRODUCTION DEPLOYED APPLICATIONS
• TravelGo (Tour Booking & Digital QR Boarding Pass):
  - Live Demo: ${TRAVELGO_URL}
  - Highlights: Owned entire Client subsystem (React 19 + API orchestration), secure VNPay IPN digital signatures, in-browser camera QR ticketing scanner & PDF exports.

• TitiSport (Sporting Goods E-Commerce Platform):
  - Live Demo: ${TITISPORT_URL}
  - Highlights: Multi-tier RBAC authorization, dual payment gateways (ZaloPay & VNPay) with real-time Webhooks, atomic inventory concurrency locking for multi-variant products.

--------------------------------------------------
3. ENTERPRISE CODEBASE EXPERIENCE
• Web Developer at TechVanguard (2026):
  - Engineered backend services for a multi-domain hotel operations system: Booking, Room, Billing, Incident.
  - Implemented Event-Service architecture, optimized Redis caching and Docker simulation sandboxes, with full Unit/Integration test coverage and strict Git/Gitea code audits.
`;
};

export const copyRecruiterBrief = async (
  lang: 'vi' | 'en',
  onSuccess?: (msg: string) => void
): Promise<void> => {
  const brief = generateRecruiterBrief(lang);
  try {
    await navigator.clipboard.writeText(brief);
    fireConfetti();
    if (onSuccess) {
      onSuccess(
        lang === 'vi'
          ? '📋 Đã sao chép tóm tắt hồ sơ (Markdown) cho Recruiter!'
          : '📋 Copied Recruiter Candidate Brief (Markdown) to clipboard!'
      );
    }
  } catch (err) {
    console.error('Failed to copy recruiter brief:', err);
  }
};
