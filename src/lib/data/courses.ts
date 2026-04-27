import type { Course, CourseLevel } from '@/types';

// ── Static data — replace fetchCourses() body with TanStack Query + Axios when Laravel is ready ──

export const courses: Course[] = [
  // ── Undergraduate (Self-Financed / PNG) ──
  {
    id: 1,
    slug: 'bammc',
    title: 'Bachelor of Arts in Multimedia and Mass Communication',
    shortTitle: 'BAMMC',
    level: 'UG',
    duration: '3 Years',
    seats: 120,
    eligibility: 'HSC (10+2) pass from any recognized board',
    description:
      'BAMMC is a dynamic programme focusing on journalism, advertising, and digital media. It includes hands-on training at our Digital Media Lab and Acharya 90FM.',
    highlights: [
      'Digital Media Lab with industry software',
      'Community Radio (Acharya 90FM) exposure',
      'News Reporting and Radio Jockeying sessions',
    ],
    careerProspects: ['Journalist', 'Content Creator', 'Advertising Executive'],
    departmentSlug: 'mass-media',
    affiliatedTo: 'University of Mumbai',
    fees: { perYear: 18000, currency: 'INR' },
    isActive: true,
    admissionOpen: true,
  },
  {
    id: 2,
    slug: 'bsc-ds',
    title: 'Bachelor of Science in Data Science',
    shortTitle: 'B.Sc. DS',
    level: 'UG',
    duration: '3 Years',
    seats: 60,
    eligibility: 'HSC (Science/Commerce) with Mathematics',
    description:
      'An interdisciplinary programme covering statistics, machine learning, and big data analytics to produce data professionals.',
    highlights: [
      'Focus on Python, R, and Tableau',
      'Industry-aligned curriculum',
      'Hands-on projects with real-world datasets',
    ],
    careerProspects: ['Data Scientist', 'Data Analyst', 'ML Engineer'],
    departmentSlug: 'it',
    affiliatedTo: 'University of Mumbai',
    fees: { perYear: 25000, currency: 'INR' },
    isActive: true,
    admissionOpen: true,
  },
  {
    id: 3,
    slug: 'bsc-it',
    title: 'Bachelor of Science in Information Technology',
    shortTitle: 'B.Sc. IT',
    level: 'UG',
    duration: '3 Years',
    seats: 120,
    eligibility: 'HSC with Mathematics/Statistics',
    description:
      'Provides a strong foundation in software development, networking, and cybersecurity.',
    highlights: [
      '3 High-performance computer labs',
      'Industry certification support',
      'Strong placement record in tech firms',
    ],
    careerProspects: ['Software Developer', 'System Admin', 'Cloud Engineer'],
    departmentSlug: 'it',
    affiliatedTo: 'University of Mumbai',
    fees: { perYear: 22000, currency: 'INR' },
    isActive: true,
    admissionOpen: true,
  },
  // ── Undergraduate (Aided) ──
  {
    id: 4,
    slug: 'bcom',
    title: 'Bachelor of Commerce',
    shortTitle: 'B.Com',
    level: 'UG',
    duration: '3 Years',
    seats: 360,
    eligibility: 'HSC Commerce pass',
    description:
      'The foundational commerce programme covering accountancy, economics, and business law.',
    highlights: [
      'Oldest and most established department',
      'Excellent track record of results',
      'Tally and Excel training provided',
    ],
    careerProspects: ['Accountant', 'Banking Professional', 'Business Executive'],
    departmentSlug: 'commerce',
    affiliatedTo: 'University of Mumbai',
    fees: { perYear: 8000, currency: 'INR' },
    isActive: true,
    admissionOpen: true,
  },
  // ── Postgraduate ──
  {
    id: 5,
    slug: 'msc-finance',
    title: 'Master of Science in Finance',
    shortTitle: 'M.Sc. Finance',
    level: 'PG',
    duration: '2 Years',
    seats: 40,
    eligibility: 'Graduate in Commerce/Management with 50% marks',
    description:
      'Advanced study of financial markets, investment banking, and risk management.',
    highlights: [
      'Research-oriented curriculum',
      'Exposure to financial modeling',
      'Guest lectures from finance experts',
    ],
    careerProspects: ['Investment Banker', 'Financial Analyst', 'Risk Manager'],
    departmentSlug: 'commerce',
    affiliatedTo: 'University of Mumbai',
    fees: { perYear: 35000, currency: 'INR' },
    isActive: true,
    admissionOpen: true,
  },
  {
    id: 6,
    slug: 'msc-it',
    title: 'Master of Science in Information Technology',
    shortTitle: 'M.Sc. IT',
    level: 'PG',
    duration: '2 Years',
    seats: 40,
    eligibility: 'B.Sc. IT/CS or equivalent',
    description:
      'Postgraduate study in cloud architecture, AI, and enterprise systems.',
    highlights: [
      'Advanced research lab access',
      'Publishing support for research papers',
      'Specialization in emerging tech',
    ],
    careerProspects: ['IT Manager', 'Solution Architect', 'Researcher'],
    departmentSlug: 'it',
    affiliatedTo: 'University of Mumbai',
    fees: { perYear: 38000, currency: 'INR' },
    isActive: true,
    admissionOpen: true,
  },
  // ── Junior College ──
  {
    id: 7,
    slug: 'junior-college-science',
    title: 'HSC Science (Junior College)',
    shortTitle: 'HSC Science',
    level: 'Junior College',
    duration: '2 Years',
    seats: 240,
    eligibility: 'SSC pass with 50% marks',
    description:
      'Standard HSC Science curriculum with dedicated labs for Physics, Chemistry, and Biology.',
    highlights: [
      'Modern Science Laboratories',
      'Experienced faculty for board exams',
      'Regular practical sessions',
    ],
    careerProspects: ['Engineering', 'Medicine', 'B.Sc. Degree'],
    departmentSlug: 'junior-college',
    affiliatedTo: 'Maharashtra State Board',
    fees: { perYear: 8000, currency: 'INR' },
    isActive: true,
    admissionOpen: true,
  },
];

// ── Mock API fetchers — swap with Axios + TanStack Query ──

export async function fetchCourses(): Promise<Course[]> {
  await new Promise(r => setTimeout(r, 400)); // simulate latency
  return courses;
}

export async function fetchCourseBySlug(slug: string): Promise<Course | undefined> {
  await new Promise(r => setTimeout(r, 300));
  return courses.find(c => c.slug === slug);
}

export async function fetchCoursesByLevel(level: CourseLevel): Promise<Course[]> {
  await new Promise(r => setTimeout(r, 300));
  return courses.filter(c => c.level === level);
}
