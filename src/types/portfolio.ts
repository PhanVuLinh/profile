export type Language = 'vi' | 'en';
export type Theme = 'dark' | 'light';

export interface ProfileData {
  name: string;
  role: {
    vi: string[];
    en: string[];
  };
  title: {
    vi: string;
    en: string;
  };
  contact: {
    phone: string;
    email: string;
    github: string;
    githubUrl: string;
    location: {
      vi: string;
      en: string;
    };
  };
  intro: {
    vi: string;
    en: string;
  };
  heroPitch: {
    vi: string;
    en: string;
  };
  quote: {
    vi: string;
    en: string;
    author: string;
  };
  stats: {
    value: number;
    label: {
      vi: string;
      en: string;
    };
    description: {
      vi: string;
      en: string;
    };
  }[];
  skills: {
    category: {
      vi: string;
      en: string;
    };
    items: {
      name: string;
      level?: string;
      featured?: boolean;
    }[];
  }[];
  experience: {
    role: {
      vi: string;
      en: string;
    };
    company: string;
    location: string;
    period: string;
    stack: string[];
    responsibilities: {
      vi: string[];
      en: string[];
    };
  }[];
  projects: {
    id: string;
    title: string;
    tagline: {
      vi: string;
      en: string;
    };
    type: {
      vi: string;
      en: string;
    };
    status: {
      vi: string;
      en: string;
    };
    stack: string[];
    demoUrl: string;
    githubUrl: string;
    highlights: {
      vi: string[];
      en: string[];
    };
    badge: string;
  }[];
  education: {
    school: {
      vi: string;
      en: string;
    };
    degree: {
      vi: string;
      en: string;
    };
    period: string;
    status: {
      vi: string;
      en: string;
    };
    focus: {
      vi: string[];
      en: string[];
    };
  };
}

