import type { ProfileData } from '../types/portfolio';

export const TRAVELGO_URL = 'https://tralvelgo.vercel.app/';
export const TITISPORT_URL = 'https://titisport.onrender.com/';
export const GITHUB_URL = 'https://github.com/PhanVuLinh';
export const CV_URL = '/CV_PhanVuLinh_FullstackIntern.pdf';
export const EMAIL = 'linhphanzzz04@gmail.com';
export const PHONE = '0343842424';
export const LOCATION_VI = 'TP. Hồ Chí Minh';
export const LOCATION_EN = 'Ho Chi Minh City, Vietnam';

export const HERO_ROLES = {
  vi: [
    'Fullstack Developer',
    'Laravel Backend',
    'React Builder',
    'Payment Integrator',
  ],
  en: [
    'Fullstack Developer',
    'Laravel Backend',
    'React Builder',
    'Payment Integrator',
  ],
};

export const TLDR_CHIPS = [
  {
    id: 'stack',
    tag: { vi: 'STACK CHÍNH', en: 'CORE STACK' },
    title: { vi: 'Laravel · React · Node', en: 'Laravel · React · Node' },
    subtitle: {
      vi: 'Event-Service, RESTful API, Redis Cache, Docker',
      en: 'Event-Service, RESTful API, Redis Cache, Docker',
    },
    href: '#skills',
  },
  {
    id: 'deployed',
    tag: { vi: 'SẢN PHẨM THẬT', en: 'LIVE DEPLOYED' },
    title: { vi: '2 sản phẩm đã deploy', en: '2 Deployed Products' },
    subtitle: {
      vi: 'TravelGo (Vercel) & TitiSport (Render)',
      en: 'TravelGo (Vercel) & TitiSport (Render)',
    },
    href: '#projects',
  },
  {
    id: 'payment',
    tag: { vi: 'CỔNG THANH TOÁN', en: 'PAYMENT GATEWAYS' },
    title: { vi: 'Thanh toán VNPay / ZaloPay', en: 'VNPay & ZaloPay Gateways' },
    subtitle: {
      vi: 'Tích hợp IPN/Webhook, chặn đặt vượt tồn atomic',
      en: 'End-to-end Webhook/IPN & inventory race safety',
    },
    href: '#projects',
  },
];

export const profileData: ProfileData = {
  name: 'Phan Vũ Linh',
  title: {
    vi: 'Web Developer (Fullstack Intern/Fresher)',
    en: 'Web Developer (Fullstack Intern/Fresher)',
  },
  role: HERO_ROLES,
  contact: {
    phone: PHONE,
    email: EMAIL,
    github: 'PhanVuLinh',
    githubUrl: GITHUB_URL,
    location: {
      vi: LOCATION_VI,
      en: LOCATION_EN,
    },
  },
  intro: {
    vi: 'Sinh viên năm cuối CNTT, Đại học Công nghệ Sài Gòn (2022 - nay). Có kinh nghiệm thực tập trên codebase thực tế (Laravel, MySQL, Redis, Docker), xây dựng các dự án có thanh toán trực tuyến, phân quyền RBAC, quản lý tồn kho. Mong muốn đóng góp vào backend/fullstack và học quy trình làm việc chuyên nghiệp trong team.',
    en: 'Final-year IT student at Saigon Technology University (2022 - present). Experienced with production codebases (Laravel, MySQL, Redis, Docker), building systems with online payment gateways, RBAC authorization, and inventory management. Seeking to contribute to backend/fullstack development and learn professional engineering workflows in a team.',
  },
  heroPitch: {
    vi: 'Xây dựng kiến trúc backend vững vàng, luồng thanh toán VNPay/ZaloPay end-to-end và trải nghiệm web hiện đại với React 19, Laravel, Node.js.',
    en: 'Building resilient backend architectures, end-to-end VNPay/ZaloPay payment flows, and modern web experiences with React 19, Laravel, and Node.js.',
  },
  quote: {
    vi: 'Hệ thống tốt không chỉ chạy đúng trong điều kiện lý tưởng, mà phải kiên cố trước xung đột tồn kho, bất đồng bộ thanh toán và ma trận phân quyền.',
    en: 'A great system does not merely run in ideal conditions — it remains resilient under inventory concurrency, payment reconciliation, and granular RBAC matrices.',
    author: 'Phan Vũ Linh',
  },
  stats: [
    {
      value: 2,
      label: {
        vi: 'Sản phẩm đã deploy',
        en: 'Deployed Products',
      },
      description: {
        vi: 'TravelGo & TitiSport chạy thực tế trên production',
        en: 'TravelGo & TitiSport live in production',
      },
    },
    {
      value: 2,
      label: {
        vi: 'Cổng thanh toán online',
        en: 'Payment Gateways',
      },
      description: {
        vi: 'VNPay & ZaloPay tích hợp IPN / Webhook end-to-end',
        en: 'VNPay & ZaloPay end-to-end IPN / Webhooks',
      },
    },
    {
      value: 1,
      label: {
        vi: 'Kỳ thực tập codebase thực tế',
        en: 'Enterprise Codebase Internship',
      },
      description: {
        vi: 'Tại TechVanguard (Laravel, MySQL, Redis, Docker, Git/Gitea)',
        en: 'At TechVanguard (Laravel, MySQL, Redis, Docker, Git/Gitea)',
      },
    },
  ],
  skills: [
    {
      category: {
        vi: 'Frontend',
        en: 'Frontend',
      },
      items: [
        { name: 'React 19', featured: true },
        { name: 'JavaScript (ES6+)', featured: true },
        { name: 'Tailwind CSS', featured: true },
        { name: 'React Router', featured: true },
        { name: 'Responsive Design', featured: false },
      ],
    },
    {
      category: {
        vi: 'Backend',
        en: 'Backend',
      },
      items: [
        { name: 'Node.js', featured: true },
        { name: 'Express.js', featured: true },
        { name: 'Laravel', featured: true },
        { name: 'RESTful API', featured: true },
        { name: 'JWT', featured: true },
        { name: 'MVC', featured: false },
      ],
    },
    {
      category: {
        vi: 'Database',
        en: 'Database',
      },
      items: [
        { name: 'MySQL', featured: true },
        { name: 'MongoDB (Mongoose)', featured: true },
        { name: 'SQL Server', featured: false },
        { name: 'Redis', featured: true },
      ],
    },
    {
      category: {
        vi: 'Tools & Architecture',
        en: 'Tools & Architecture',
      },
      items: [
        { name: 'Git / Gitea', featured: true },
        { name: 'Docker', featured: true },
        { name: 'Postman', featured: false },
        { name: 'Figma', featured: false },
        { name: 'ERD / DFD / Sequence Diagram', featured: true },
      ],
    },
  ],
  experience: [
    {
      role: {
        vi: 'Web Developer Intern',
        en: 'Web Developer Intern',
      },
      company: 'TechVanguard',
      location: 'TP.HCM',
      period: '2026',
      stack: ['Laravel', 'MySQL', 'Redis', 'Docker', 'Git/Gitea'],
      responsibilities: {
        vi: [
          'Phát triển backend hệ thống quản lý vận hành khách sạn trên codebase thực tế, phụ trách nghiệp vụ Booking, Room, Billing, Incident theo kiến trúc Event Handler – Service',
          'Xây dựng Event Handler, Service layer và workflow nghiệp vụ, đảm bảo luồng xử lý nhất quán giữa các module',
          'Viết Unit/Integration Tests, debug và kiểm tra end-to-end trước khi nghiệm thu',
          'Làm việc với MySQL, Redis, Docker để vận hành môi trường simulation/sandbox',
          'Làm việc theo Git/Gitea workflow trong team: code audit, xử lý feedback và edge case',
        ],
        en: [
          'Developed backend services for hotel management on an enterprise codebase, owning Booking, Room, Billing, and Incident domains following Event Handler – Service architecture',
          'Engineered Event Handlers, Service layers, and business workflows to ensure decoupled and consistent state processing across modules',
          'Authored Unit/Integration tests, systematically debugging and verifying end-to-end flows prior to release acceptance',
          'Operated MySQL, Redis caching, and Docker environments to maintain realistic simulation/sandbox workflows',
          'Collaborated using Git/Gitea team workflows: conducted code audits, addressed PR feedback, and handled critical edge cases',
        ],
      },
    },
  ],
  projects: [
    {
      id: 'travelgo',
      title: 'TravelGo',
      tagline: {
        vi: 'Hệ thống đặt tour du lịch trực tuyến (Fullstack)',
        en: 'Fullstack Tour Booking & Reservation System',
      },
      type: {
        vi: 'Fullstack (Đã deploy production)',
        en: 'Fullstack (Production Deployed)',
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
          'Một mình phụ trách toàn bộ phân hệ Client (Frontend + API) và deploy',
          'Luồng đặt tour 3 bước, tìm kiếm/lọc, áp dụng coupon, thanh toán VNPay end-to-end',
          'JWT + Google OAuth, Private Route, quản lý Bearer Token',
          'E-Ticket/Boarding Pass: tạo & quét QR bằng camera, tra cứu đơn hàng, xuất PDF',
          'Tổ chức code theo feature modules, tái sử dụng component/service',
        ],
        en: [
          'Independently owned the entire Client subsystem (Frontend + API orchestration) and production deployment',
          'Streamlined 3-step tour booking pipeline, search/filter criteria, dynamic coupons, and end-to-end VNPay checkout',
          'JWT + Google OAuth integration, Protected Private Routes, and secure Bearer Token storage',
          'E-Ticket/Boarding Pass: dynamic camera QR creation & scanning, instant booking lookup, and PDF ticket generation',
          'Organized codebase into decoupled feature modules with reusable UI components and shared service abstraction',
        ],
      },
    },
    {
      id: 'titisport',
      title: 'TitiSport',
      tagline: {
        vi: 'Nền tảng thương mại điện tử thể thao (Fullstack)',
        en: 'Fullstack Sporting Goods E-Commerce Platform',
      },
      type: {
        vi: 'Fullstack Platform',
        en: 'Fullstack Platform',
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
          'Thiết kế hệ thống phân quyền RBAC cho trang quản trị, quản lý quyền theo nhóm tài khoản',
          'Tích hợp thanh toán ZaloPay/VNPay end-to-end, tự động cập nhật trạng thái đơn qua Webhook/IPN',
          'Sản phẩm đa biến thể theo size, đồng bộ tồn kho từng size để chặn đặt vượt tồn',
          'Mã giảm giá chống lạm dụng: 1 lần/tài khoản, giới hạn số lượng và thời hạn, xác thực ở bước thanh toán',
        ],
        en: [
          'Architected Role-Based Access Control (RBAC) engine for the admin dashboard, assigning granular permissions per user role',
          'Integrated dual payment gateways (ZaloPay & VNPay) end-to-end with real-time order state updates via Webhooks/IPN',
          'Multi-variant product catalog per size, synchronizing atomic inventory per variant to prevent over-ordering',
          'Anti-abuse coupon validator: 1-use-per-account cap, usage limits, expiration date checking at checkout pipeline',
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
        'Lập trình hướng đối tượng (OOP) & Cấu trúc dữ liệu & Giải thuật',
        'Cơ sở dữ liệu nâng cao (MySQL, SQL Server, MongoDB)',
        'Phân tích thiết kế hệ thống (ERD, DFD, Sequence Diagram)',
        'Phát triển ứng dụng Web Fullstack & Kiến trúc Event-Driven',
      ],
      en: [
        'Object-Oriented Programming (OOP) & Data Structures and Algorithms',
        'Advanced Database Systems (MySQL, SQL Server, MongoDB)',
        'System Analysis and Design (ERD, DFD, Sequence Diagrams)',
        'Fullstack Web Application Architecture & Event-Driven Systems',
      ],
    },
  },
};
