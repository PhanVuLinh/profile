import type { ProfileData } from '../types/portfolio';

export const TRAVELGO_URL = 'https://tralvelgo.vercel.app/';
export const TITISPORT_URL = 'https://titisport.onrender.com/';
export const GITHUB_URL = 'https://github.com/PhanVuLinh';
export const CV_URL = '/CV_PhanVuLinh_FullstackIntern.pdf';
export const EMAIL = 'linhphanzzz04@gmail.com';
export const PHONE = '0343842424';
export const ZALO_URL = 'https://zalo.me/0343842424';
export const LOCATION_VI = 'TP. Hồ Chí Minh';
export const LOCATION_EN = 'Ho Chi Minh City, Vietnam';

export const HERO_ROLES = {
  vi: [
    'Fullstack Developer',
    'Backend & Systems Mindset',
    'Event-Service Architecture',
    'Payment & Data Integrity',
  ],
  en: [
    'Fullstack Developer',
    'Backend & Systems Mindset',
    'Event-Service Architecture',
    'Payment & Data Integrity',
  ],
};

export const TLDR_CHIPS = [
  {
    id: 'stack',
    tag: { vi: 'KIẾN TRÚC & STACK', en: 'ARCHITECTURE & STACK' },
    title: { vi: 'Laravel · React 19 · Node.js', en: 'Laravel · React 19 · Node.js' },
    subtitle: {
      vi: 'Kiến trúc Event-Service, RESTful API, Redis Cache, Docker Sandbox',
      en: 'Event-Service Layer, RESTful APIs, Redis Cache, Docker Simulation',
    },
    href: '#skills',
  },
  {
    id: 'deployed',
    tag: { vi: 'SẢN PHẨM PRODUCTION', en: 'PRODUCTION DEPLOYMENTS' },
    title: { vi: '2 Hệ thống chạy thực tế', en: '2 Live Deployed Systems' },
    subtitle: {
      vi: 'TravelGo (Tour & Vé QR) · TitiSport (E-commerce & RBAC)',
      en: 'TravelGo (Tours & QR Tickets) · TitiSport (E-commerce & RBAC)',
    },
    href: '#projects',
  },
  {
    id: 'payment',
    tag: { vi: 'GIAO DỊCH & TOÀN VẸN', en: 'TRANSACTIONS & INTEGRITY' },
    title: { vi: 'Thanh toán VNPay / ZaloPay', en: 'VNPay & ZaloPay Gateways' },
    subtitle: {
      vi: 'IPN/Webhook chữ ký số, xử lý concurrency chặn đặt vượt tồn',
      en: 'Digital signature IPN/Webhooks, atomic inventory race safety',
    },
    href: '#projects',
  },
];

export const profileData: ProfileData = {
  name: 'Phan Vũ Linh',
  title: {
    vi: 'Web Developer (Fullstack / Backend)',
    en: 'Web Developer (Fullstack / Backend)',
  },
  role: HERO_ROLES,
  contact: {
    phone: PHONE,
    email: EMAIL,
    github: 'PhanVuLinh',
    githubUrl: GITHUB_URL,
    zaloUrl: ZALO_URL,
    location: {
      vi: LOCATION_VI,
      en: LOCATION_EN,
    },
  },
  intro: {
    vi: 'Web Developer (Fullstack / Backend) chú trọng kiến trúc hệ thống, an toàn dữ liệu và tối ưu hiệu năng. Có kinh nghiệm thực chiến phát triển backend tại TechVanguard theo mô hình Event Handler – Service, tối ưu Redis và kiểm thử tự động. Trực tiếp xây dựng & deploy 2 sản phẩm production TravelGo và TitiSport với luồng thanh toán VNPay/ZaloPay, xử lý xung đột tồn kho và phân quyền RBAC.',
    en: 'Web Developer (Fullstack / Backend) focusing on dependable service architecture, data integrity, and real-world performance. Hands-on enterprise experience at TechVanguard applying the Event Handler – Service pattern, Redis caching, and automated testing. Independently engineered & deployed 2 live products (TravelGo & TitiSport) featuring VNPay/ZaloPay gateways, concurrency-safe inventory mutations, and RBAC matrices.',
  },
  heroPitch: {
    vi: 'Tập trung kiến trúc backend kiên cố, luồng thanh toán VNPay/ZaloPay bảo mật và trải nghiệm web mượt mà với React 19, Laravel, Node.js.',
    en: 'Engineering dependable backend services, secure VNPay/ZaloPay payment workflows, and seamless modern web experiences with React 19, Laravel, and Node.js.',
  },
  quote: {
    vi: 'Hệ thống đáng tin cậy không chỉ chạy tốt trong điều kiện lý tưởng, mà phải kiên cường trước dữ liệu bất toàn, xung đột giao dịch và sự phát triển lâu dài của team.',
    en: 'Reliable software does not merely work on the happy path; it stays resilient against imperfect data, concurrent transactions, and the long-term growth of the team.',
    author: 'Phan Vũ Linh',
  },
  stats: [
    {
      value: 2,
      label: {
        vi: 'Sản phẩm Production',
        en: 'Production Deployments',
      },
      description: {
        vi: 'TravelGo & TitiSport đã deploy, phục vụ luồng nghiệp vụ và người dùng thật',
        en: 'TravelGo & TitiSport live in production, handling real users and workflows',
      },
    },
    {
      value: 2,
      label: {
        vi: 'Cổng thanh toán Online',
        en: 'Payment Gateway Integrations',
      },
      description: {
        vi: 'VNPay & ZaloPay tích hợp IPN / Webhook với xác thực chữ ký số an toàn',
        en: 'VNPay & ZaloPay secured with digital signature IPN & Webhook validation',
      },
    },
    {
      value: 1,
      label: {
        vi: 'Hệ thống Doanh nghiệp',
        en: 'Enterprise Codebase Experience',
      },
      description: {
        vi: 'Tại TechVanguard: kiến trúc Event-Service, Docker, Redis và quy trình Git/Gitea',
        en: 'At TechVanguard: Event-Service pattern, Docker, Redis, and Git/Gitea team audits',
      },
    },
  ],
  skills: [
    {
      category: {
        vi: 'Frontend Hiện đại',
        en: 'Modern Frontend',
      },
      items: [
        { name: 'React 19', featured: true },
        { name: 'JavaScript (ES6+)', featured: true },
        { name: 'Tailwind CSS', featured: true },
        { name: 'React Router v7', featured: true },
        { name: 'Responsive & Adaptive UI', featured: false },
      ],
    },
    {
      category: {
        vi: 'Backend & Kiến trúc Dịch vụ',
        en: 'Backend & Service Architecture',
      },
      items: [
        { name: 'Node.js', featured: true },
        { name: 'Express.js', featured: true },
        { name: 'Laravel 11', featured: true },
        { name: 'RESTful API Design', featured: true },
        { name: 'JWT & OAuth 2.0', featured: true },
        { name: 'Event-Service Architecture', featured: true },
      ],
    },
    {
      category: {
        vi: 'Dữ liệu & Bộ đệm (Data & Cache)',
        en: 'Data Persistence & Caching',
      },
      items: [
        { name: 'MySQL', featured: true },
        { name: 'MongoDB (Mongoose)', featured: true },
        { name: 'SQL Server', featured: false },
        { name: 'Redis Cache', featured: true },
      ],
    },
    {
      category: {
        vi: 'Công cụ, Phân tích & Triển khai',
        en: 'Engineering Tools & DevOps',
      },
      items: [
        { name: 'Git / Gitea Team Workflow', featured: true },
        { name: 'Docker & Compose Sandbox', featured: true },
        { name: 'Postman API Testing', featured: false },
        { name: 'Figma UI Mapping', featured: false },
        { name: 'ERD / DFD / Sequence Modeling', featured: true },
      ],
    },
  ],
  experience: [
    {
      role: {
        vi: 'Web Developer',
        en: 'Web Developer',
      },
      company: 'TechVanguard',
      location: 'TP.HCM',
      period: '2026',
      stack: ['Laravel', 'MySQL', 'Redis', 'Docker', 'Git/Gitea'],
      responsibilities: {
        vi: [
          'Kiến trúc Event-Service: Tách rời nghiệp vụ Booking, Room, Billing; đảm bảo tính nhất quán dữ liệu giữa các module.',
          'Tối ưu Redis Cache & Docker: Container hóa môi trường sandbox, giảm hơn 40% tải truy vấn MySQL lặp lại.',
          'Kiểm thử tự động (Unit Test): Bao phủ các kịch bản lỗi biên (edge cases) và bảo vệ an toàn luồng thanh toán.',
          'Quy trình Git/Gitea chuẩn: Phân nhánh nghiêm ngặt, tuân thủ code review và tiếp thu phản biện kỹ thuật từ Tech Lead.',
        ],
        en: [
          'Event-Service Architecture: Decoupled Booking, Room, and Billing services for cross-module data consistency.',
          'Redis Cache & Docker Sandbox: Containerized local sandbox, reducing redundant database queries by 40%+.',
          'Automated Testing: Authored Unit & Integration test suites defending edge cases and payment integrity.',
          'Disciplined Git/Gitea: Strict branch conventions, peer code reviews, and high codebase maintainability.',
        ],
      },
    },
  ],
  projects: [
    {
      id: 'travelgo',
      title: 'TravelGo',
      tagline: {
        vi: 'Hệ thống đặt tour du lịch trực tuyến & Vé điện tử QR (Fullstack)',
        en: 'Fullstack Tour Booking Platform with Real-Time QR Ticketing',
      },
      type: {
        vi: 'Fullstack (Đã deploy production Vercel)',
        en: 'Fullstack (Live on Vercel Production)',
      },
      status: {
        vi: 'Production Live',
        en: 'Production Live',
      },
      stack: ['React 19', 'Vite', 'React Router v7', 'Tailwind v4', 'Node.js', 'Express', 'JWT', 'VNPay'],
      demoUrl: TRAVELGO_URL,
      githubUrl: 'https://github.com/PhanVuLinh/tour-booking-system',
      badge: 'Production Deployed',
      highlights: {
        vi: [
          'Client & API Orchestration: Độc lập xây dựng Frontend React 19 + API, trực tiếp deploy production lên Vercel.',
          'Thanh toán VNPay IPN: Luồng đặt tour 3 bước an toàn với chữ ký số xác thực giao dịch thời gian thực.',
          'Vé điện tử E-Ticket QR: Tự động tạo mã QR động sau thanh toán, tích hợp quét camera trên web để check-in và xuất PDF.',
          'Bảo mật JWT & OAuth 2.0: Quản lý Bearer Token an toàn, bảo vệ Private Routes và phân quyền người dùng.',
        ],
        en: [
          'Client & API Orchestration: Independently built React 19 frontend and managed live production deployment on Vercel.',
          'VNPay IPN Checkout: Secure 3-step booking funnel verified with cryptographic IPN signature webhooks.',
          'Dynamic QR E-Tickets: In-browser camera scanning for real-time check-in and automated PDF ticket downloads.',
          'JWT & OAuth 2.0 Auth: Secure token lifecycle management and strict Private Route access control.',
        ],
      },
    },
    {
      id: 'titisport',
      title: 'TitiSport',
      tagline: {
        vi: 'Nền tảng thương mại điện tử thể thao đa cổng thanh toán (Fullstack)',
        en: 'Multi-Payment Sporting E-Commerce with RBAC & Inventory Concurrency',
      },
      type: {
        vi: 'Fullstack Platform (Render Production)',
        en: 'Fullstack Platform (Render Production)',
      },
      status: {
        vi: 'Production Live',
        en: 'Production Live',
      },
      stack: ['Node.js (Express)', 'MongoDB (Mongoose)', 'Pug', 'Cloudinary', 'Multer', 'ZaloPay', 'VNPay'],
      demoUrl: TITISPORT_URL,
      githubUrl: 'https://github.com/PhanVuLinh/website_DoTheThao',
      badge: 'Multi-Payment & RBAC',
      highlights: {
        vi: [
          'Phân quyền RBAC: Phân cấp quyền hạn chặt chẽ giữa Quản trị viên (Admin) và Nhân viên vận hành kho/đơn.',
          'Đa cổng thanh toán (ZaloPay & VNPay): Tích hợp song song 2 cổng với Webhook cập nhật đơn hàng tự động.',
          'Chống Race Condition Tồn kho: Atomic update số lượng theo biến thể (size, màu), loại bỏ rủi ro đặt mua vượt tồn.',
          'Công cụ Khuyến mãi Thông minh: Ràng buộc 1 lần dùng/user, ngân sách khuyến mãi và hạn sử dụng tức thời.',
        ],
        en: [
          'RBAC Security Matrix: Strict access control partitioning between store managers and superadmins.',
          'Dual Payment Gateways: Simultaneous ZaloPay & VNPay integration with real-time webhook order sync.',
          'Atomic Inventory Locking: Concurrency-safe variant mutations (size/color) eliminating overselling race conditions.',
          'Anti-Abuse Coupon Engine: Enforced 1-use-per-user validation, budget limits, and real-time expiration checks.',
        ],
      },
    },
  ],
  education: {
    school: {
      vi: 'Đại học Công nghệ Sài Gòn (STU)',
      en: 'Saigon Technology University (STU)',
    },
    degree: {
      vi: 'Công nghệ Thông tin (CNTT)',
      en: 'Information Technology (IT)',
    },
    period: '2022 - Nay',
    status: {
      vi: 'Sinh viên năm cuối (Năm 4)',
      en: 'Final-year Senior Student',
    },
    focus: {
      vi: [
        'Cấu trúc dữ liệu & Thuật toán: Lập trình hướng đối tượng (OOP) và tư duy giải quyết bài toán.',
        'Cơ sở dữ liệu nâng cao: Thiết kế ERD, tối ưu truy vấn MySQL, SQL Server và MongoDB.',
        'Kiến trúc Web & RESTful API: Luồng xử lý bất đồng bộ, phân tích thiết kế hệ thống (DFD, Sequence).',
        'Kiểm thử & Triển khai: Kiểm thử phần mềm, Docker hóa và quy trình Git nhóm.',
      ],
      en: [
        'Data Structures & Algorithms: Object-Oriented Programming (OOP) and algorithmic problem-solving.',
        'Advanced Databases: ERD schema design, query optimization for MySQL, SQL Server, and MongoDB.',
        'Web Architecture & APIs: Asynchronous request workflows, RESTful APIs, and DFD/Sequence modeling.',
        'Testing & Deployment: Automated testing fundamentals, Docker containerization, and Git team workflows.',
      ],
    },
  },
};
