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
    vi: 'Tôi là sinh viên năm cuối ngành Công nghệ Thông tin tại Đại học Công nghệ Sài Gòn (STU), say mê khám phá cách các dòng dữ liệu vận hành phía sau giao diện người dùng. Với tôi, viết code không dừng lại ở việc làm cho tính năng chạy được, mà là đảm bảo hệ thống giữ được tính toàn vẹn khi đối mặt với dữ liệu bất toàn, xung đột giao dịch và sự mở rộng lâu dài của đội ngũ. Kinh nghiệm làm việc thực tế tại TechVanguard trên codebase khách sạn đa phân hệ đã rèn luyện cho tôi kỷ luật kiến trúc: tách rời nghiệp vụ bằng Event Handler – Service, tối ưu bộ đệm Redis và bảo vệ logic qua kiểm thử tự động. Khi tự mình xây dựng TravelGo và TitiSport, tôi chủ động dấn thân vào các bài toán thực tế như tích hợp cổng VNPay/ZaloPay, ngăn chặn race condition tồn kho và thiết kế hệ thống phân quyền RBAC. Tôi luôn giữ tinh thần khiêm tốn, biết lắng nghe phản biện từ những kỹ sư đi trước và sẵn sàng cống hiến hết mình cho các sản phẩm đòi hỏi độ tin cậy cao.',
    en: 'I am a final-year Information Technology student at Saigon Technology University (STU), driven by a deep fascination with how data flows and remains resilient behind the user interface. For me, engineering is never just about making a feature work on the surface — it is about ensuring absolute data integrity against concurrency, payment state desyncs, and long-term codebase evolution. My enterprise experience at TechVanguard on a multi-module hotel operations system cultivated strong architectural discipline: decoupling workflows via the Event Handler – Service pattern, leveraging Redis caching, and safeguarding business rules through rigorous automated testing. In personal production projects like TravelGo and TitiSport, I engineered end-to-end solutions for real-world challenges including VNPay/ZaloPay reconciliations, atomic inventory locking, and granular RBAC matrices. Grounded in humility and eager to learn from seasoned engineers, I look forward to contributing dependable, maintainable code to an ambitious team.',
  },
  heroPitch: {
    vi: 'Tập trung xây dựng kiến trúc backend kiên cố, luồng giao dịch VNPay/ZaloPay bảo mật và trải nghiệm web hiện đại, mượt mà với React 19, Laravel và Node.js.',
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
          'Tham gia phát triển backend hệ thống quản lý vận hành khách sạn trên codebase doanh nghiệp, trực tiếp phụ trách các phân hệ Booking, Room, Billing và Incident.',
          'Thiết kế và cài đặt luồng nghiệp vụ theo kiến trúc Event Handler – Service, tách rời các side-effect bất đồng bộ và đảm bảo tính nhất quán dữ liệu giữa các module độc lập.',
          'Vận hành môi trường phát triển giả lập (simulation/sandbox) với Docker, MySQL và tầng lưu đệm Redis, giúp giảm tải truy vấn lặp lại và gia tăng tốc độ xử lý.',
          'Chủ động viết Unit & Integration Tests bao phủ các kịch bản lỗi biên (edge cases), kiểm thử end-to-end nghiêm ngặt trước khi chuyển giao tính năng nghiệm thu.',
          'Tuân thủ quy trình làm việc chuyên nghiệp qua Git/Gitea: quản lý nhánh phân luồng chặt chẽ, tiếp thu phản biện trong các buổi code review và tối ưu mã nguồn theo tiêu chuẩn team.',
        ],
        en: [
          'Contributed to the backend services of an enterprise hotel management platform, taking direct engineering ownership of Booking, Room, Billing, and Incident domains.',
          'Engineered business workflows adhering to the Event Handler – Service architectural pattern, decoupling asynchronous side-effects and ensuring cross-module data consistency.',
          'Orchestrated local simulation environments with Docker, MySQL, and Redis caching layers to mitigate redundant database reads and boost endpoint responsiveness.',
          'Authored comprehensive Unit and Integration test suites targeting tricky edge cases, verifying end-to-end system stability prior to release sign-offs.',
          'Collaborated closely within Git/Gitea team workflows: adhering to strict branch policies, embracing constructive feedback during code audits, and elevating code maintainability.',
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
          'Một mình phụ trách trọn vẹn phân hệ Client (Frontend React 19 + API orchestration) và trực tiếp triển khai lên production.',
          'Xây dựng luồng đặt tour 3 bước chặt chẽ: lọc tìm kiếm đa tiêu chí, áp dụng mã giảm giá động và tích hợp cổng thanh toán VNPay qua IPN xác thực chữ ký.',
          'Thiết lập cơ chế bảo mật với JWT và Google OAuth 2.0, bảo vệ Route người dùng (Private Routes) và quản lý vòng đời Bearer Token tin cậy.',
          'Tính năng Boarding Pass / E-Ticket tiện lợi: sinh mã QR động chứa dữ liệu đơn đặt, tích hợp quét camera trực tiếp trên trình duyệt để tra cứu và xuất vé PDF.',
          'Tổ chức mã nguồn theo hướng feature-based modules, tối ưu khả năng tái sử dụng custom hooks và chuẩn hóa tầng giao tiếp dịch vụ.',
        ],
        en: [
          'Independently architected the entire Client subsystem (React 19 Frontend + API orchestration) and managed end-to-end production deployment on Vercel.',
          'Engineered an intuitive 3-step tour booking funnel: multi-parameter search filtering, dynamic promo discounts, and robust VNPay checkout with cryptographic IPN verification.',
          'Implemented secure user authentication via JWT and Google OAuth 2.0, enforcing strict Private Route access controls and token lifecycle management.',
          'Created a digital Boarding Pass / E-Ticket module: dynamic QR generation, in-browser camera scanning for real-time verification, and instant PDF ticket downloads.',
          'Structured the codebase into decoupled feature modules, maximizing hook reusability and abstracting service-layer API calls cleanly.',
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
          'Thiết kế kiến trúc phân quyền quản trị RBAC (Role-Based Access Control) chặt chẽ, phân định rõ ràng quyền hạn thao tác giữa nhân viên vận hành và quản trị viên.',
          'Tích hợp song song 2 cổng thanh toán trực tuyến ZaloPay và VNPay, tự động cập nhật trạng thái đơn hàng thời gian thực qua cơ chế Webhook / IPN bảo mật.',
          'Mô hình hóa sản phẩm đa biến thể theo size và màu sắc, xử lý atomic update kho hàng để loại trừ hoàn toàn rủi ro đặt mua vượt số lượng tồn thực tế.',
          'Xây dựng bộ kiểm định mã giảm giá thông minh chống lạm dụng: giới hạn 1 lần dùng/tài khoản, kiểm tra hạn mức ngân sách và thời hạn hiệu lực tại bước thanh toán.',
        ],
        en: [
          'Architected an enterprise Role-Based Access Control (RBAC) matrix for administrative back-office, strictly partitioning permissions between staff and superadmins.',
          'Integrated dual payment gateways (ZaloPay & VNPay) with real-time order state synchronization driven by authenticated Webhooks and IPN listeners.',
          'Modeled complex multi-variant product catalog (sizes, colors), enforcing atomic inventory mutations during checkout to eliminate race conditions and overselling.',
          'Engineered an anti-abuse coupon validation engine: 1-use-per-user enforcement, quota constraints, and real-time expiration validation at final checkout checkout.',
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
        'Lập trình hướng đối tượng (OOP), Cấu trúc dữ liệu & Tư duy Thuật toán giải quyết vấn đề',
        'Cơ sở dữ liệu quan hệ & phi quan hệ nâng cao (MySQL, SQL Server, MongoDB)',
        'Phân tích & Thiết kế hệ thống thông tin thực tế (ERD, DFD, Sequence Diagram, Use Case)',
        'Kiến trúc ứng dụng Web đa tầng, RESTful API & Luồng xử lý bất đồng bộ',
      ],
      en: [
        'Object-Oriented Programming (OOP), Data Structures & Algorithmic Problem Solving',
        'Relational & NoSQL Database Design and Query Optimization (MySQL, SQL Server, MongoDB)',
        'Practical System Analysis & Architecture Modeling (ERD, DFD, Sequence & Use Case Diagrams)',
        'Multi-tiered Web Architecture, RESTful API Design & Asynchronous Workflows',
      ],
    },
  },
};
