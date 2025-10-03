// Portfolio data types
export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  email: string;
  phone?: string;
  location: string;
  avatar?: string;
  resume?: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: number; // Optional - for backwards compatibility
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  gallery?: string[];
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  current: boolean;
  technologies?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  gpa?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
}