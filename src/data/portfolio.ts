import content from './content.json';

// All editable content lives in content.json and is managed from /admin.
// Types describe that file so both the site and the admin panel stay in sync.

export interface Seo {
  title: string;
  description: string;
  siteUrl: string;
}

export interface Personal {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  tagline: string;
  heroSubtitle: string;
  typingWords: string[];
  about: string;
  resumeUrl: string;
  avatar: string;
  location: string;
  github: string;
  linkedin: string;
  whatsapp: string;
}

export interface Stat {
  id: number;
  label: string;
  value: number;
}

export interface SkillCategory {
  id: number;
  title: string;
  icon: string;
  skills: string[];
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string;
  type: string;
}

export interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  duration: string;
  coursework: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  live: string;
  featured: boolean;
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  icon: string;
  file: string;
}

export interface Award {
  id: number;
  title: string;
  organization: string;
  icon: string;
  file: string;
}

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
}

export interface PortfolioContent {
  seo: Seo;
  personal: Personal;
  stats: Stat[];
  skillCategories: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: Project[];
  certifications: Certification[];
  awards: Award[];
  gallery: GalleryItem[];
}

export const CONTENT_FILE_PATH = 'src/data/content.json';

export const portfolioData = {
  ...(content as PortfolioContent),

  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Gallery", href: "#gallery" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ],
};
