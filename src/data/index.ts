// src/data.ts

export interface PersonalInfo {
  name: string;
  title: string;
  heroTagline: string;
  email: string;
  linkedin: string;
  github: string;
  avatar?: string;
  lightProfile:string;
  darkProfile:string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  issuerUrl: string;
  date: string;
  credentialUrl: string;
  description: string;
  topics: string[];
  glowColor: string;
}

export interface Project {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string | null;
  tags: string[];
  techStack: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  gradient: string;
  accentColor: string;
}

export const personalInfo: PersonalInfo = {
  name: "Mohammadreza Miryazdi",
  title: "Frontend Developer",
  heroTagline: "I build clean, fast, and thoughtful web experiences.",
  email: "rezamiryazdi051@gmail.com",
  linkedin: "https://linkedin.com/in/mreza-miryazdi",
  github: "https://github.com/mrmzi",
  avatar: "/images/profile/light-profile.png",
  lightProfile: "/images/profile/light-profile.png",
  darkProfile: "/images/profile/dark-profile.png"
};

export const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Vue",
  "Tailwind",
  "SCSS",
  "Git",
  "GitLab",
];

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Frontend Developer Intern",
    company: "Khayyam University",
    period: "Summer 2025",
    description: [
      "Designed and implemented UI components using HTML, CSS, and JavaScript",
      "Worked with React and Next.js on active projects",
      "Collaborated with the development team and contributed to documentation",
      "Analyzed and resolved UI bugs across the codebase",
    ],
  },
  {
    id: 2,
    role: "Junior Frontend Developer",
    company: "Nexim",
    period: "December 2025 – Present",
    description: [
      "Implemented new features using React, TypeScript, and Astro",
      "Optimized performance and resolved bugs",
      "Collaborated with backend team on API integration",
      "Delivered tasks aligned with sprint planning",
      "Contributed to UX improvements across the product",
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: 1,
    title: "Turbo Front 5",
    issuer: "Part Software Group",
    issuerUrl: "https://www.partsoftware.com/",
    date: "2024",
    credentialUrl: "https://drive.google.com/file/d/1AvubHFmemb_lY33_LG_2W30lkznLsa9F/view?usp=drivesdk",
    description:
      "47th Part College cohort — a free, project-based frontend bootcamp covering HTML/CSS, JavaScript, and Vue.js across 12 intensive sessions.",
    topics: ["HTML & CSS", "JavaScript", "DOM & Events", "Async/HTTP", "Vue.js", "Pinia", "Vue Router"],
    glowColor: "#a855f7",
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Part Bank",
    shortDesc: "A banking dashboard with secure auth and data management.",
    fullDesc:
      "A full-featured banking dashboard built with Vue.js and Sass. Implements JWT-based authentication, Pinia for state management, and Axios for API communication. Focused on security, clean UI, and efficient data flow.",
    image: '/images/projects/part-bank.png',
    tags: ["Vue.js", "Sass", "JWT"],
    techStack: ["Vue.js", "Pinia", "Axios", "Sass", "JWT"],
    githubUrl: 'https://github.com/mrmzi/part-bank',
    liveUrl: 'https://part-bank.vercel.app/',
    gradient: "#a855f7, #ec4899",
    accentColor: "#a855f7",
  },
  {
    id: 2,
    title: "Qalebino",
    shortDesc: "A web template marketplace powered by Supabase.",
    fullDesc:
      "A marketplace for web templates built with React and Next.js. Uses Supabase for authentication and database management. Features include template browsing, user accounts, and a clean checkout flow.",
    image: '/images/projects/ghalebino.png',
    tags: ["React", "Next.js", "Supabase"],
    techStack: ["React", "Next.js", "Supabase", "Tailwind CSS"],
    githubUrl: 'https://github.com/mrmzi/Ghalebino',
    liveUrl: 'https://ghalebino-r6th.vercel.app/',
    gradient: "#06b6d4, #3b82f6",
    accentColor: "#06b6d4",
  },
  {
    id: 3,
    title: "Blog App",
    shortDesc: "SSR blog platform with SEO and admin dashboard.",
    fullDesc:
      "A blog management application built with Next.js. Leverages server-side rendering for SEO optimization, includes a clean admin dashboard for content management, and uses Context API for state.",
    image: '/images/projects/blog-app.png',
    tags: ["Next.js", "SSR", "Tailwind CSS"],
    techStack: ["Next.js", "SSR", "Context API", "Tailwind CSS"],
    githubUrl: 'https://github.com/mrmzi/next-blog-app.git',
    liveUrl: null,
    gradient: "#10b981, #14b8a6",
    accentColor: "#10b981",
  },
  {
    id: 4,
    title: "Booking Hotel",
    shortDesc: "Hotel booking app with protected routes and login flow.",
    fullDesc:
      "A hotel booking website built with React. Features protected routes, a fake backend for development, and a complete login/auth flow. Focused on routing architecture and user experience.",
    image: '/images/projects/booking-hotel.png',
    tags: ["React", "React Router", "Context API"],
    techStack: ["React", "React Router", "Context API"],
    githubUrl: 'https://github.com/mrmzi/Booking-Hotel',
    liveUrl: 'https://booking-hotel-umber.vercel.app/',
    gradient: "#f59e0b, #ef4444",
    accentColor: "#f59e0b",
  },
  {
    id: 5,
    title: "Rick and Morty",
    shortDesc: "Character explorer with custom hooks and async fetching.",
    fullDesc:
      "A character explorer app using the Rick and Morty public API. Built with custom hooks for data fetching, modal-based character details, and clean async state management.",
    image: '/images/projects/rick-and-morty.png',
    tags: ["React", "REST API", "Custom Hooks"],
    techStack: ["React", "REST API", "Custom Hooks"],
    githubUrl: ' https://github.com/mrmzi/Rick-And-Morty-API',
    liveUrl: 'https://rick-and-morty-api-pied-chi.vercel.app/',
    gradient: "#84cc16, #22c55e",
    accentColor: "#84cc16",
  },
];
