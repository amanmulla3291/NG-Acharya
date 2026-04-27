// ─────────────────────────────────────────────
// Core domain types — ready for Laravel API swap
// ─────────────────────────────────────────────

export type CourseLevel = 'UG' | 'PG' | 'PhD' | 'Certificate' | 'Junior College' | 'Unaided';

export interface Course {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  level: CourseLevel;
  duration: string;            // e.g. "3 Years"
  seats: number;
  eligibility: string;
  description: string;
  highlights: string[];
  careerProspects: string[];
  departmentSlug: string;
  affiliatedTo: string;        // e.g. "University of Mumbai"
  fees: {
    perYear: number;
    total?: number;
    currency: 'INR';
  };
  imageUrl?: string;
  isActive: boolean;
  admissionOpen: boolean;
}

export type NoticeCategory = 'All' | 'Admission' | 'Examination' | 'Result' | 'General' | 'Scholarship' | 'Event';

export interface Notice {
  id: number;
  slug: string;
  title: string;
  category: Exclude<NoticeCategory, 'All'>;
  content: string;
  publishedAt: string;         // ISO 8601
  expiresAt?: string;
  isImportant: boolean;
  attachmentUrl?: string;
  attachmentName?: string;
  postedBy: string;
}

export type EventCategory = 'Cultural' | 'Sports' | 'Academic' | 'Workshop' | 'Placement' | 'Alumni' | 'NSS/NCC';

export interface CollegeEvent {
  id: number;
  slug: string;
  title: string;
  category: EventCategory;
  description: string;
  date: string;                // ISO 8601
  endDate?: string;
  venue: string;
  imageUrl?: string;
  registrationLink?: string;
  isUpcoming: boolean;
  highlights?: string[];
}

export interface Department {
  id: number;
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  vision: string;
  mission: string;
  headName: string;
  headDesignation: string;
  headImageUrl?: string;
  established: number;
  faculty: StaffMember[];
  courses: string[];           // Course slugs
  achievements: string[];
  facilities: string[];
  imageUrl?: string;
}

export interface StaffMember {
  id: number;
  slug: string;
  name: string;
  designation: string;
  qualification: string;
  department: string;
  departmentSlug: string;
  experience: number;          // years
  specialization: string[];
  email?: string;
  imageUrl?: string;
  publications?: number;
  awards?: string[];
  bio?: string;
}

export interface InfrastructureItem {
  id: number;
  slug: string;
  name: string;
  category: 'Library' | 'Sports' | 'IT' | 'Labs' | 'Auditorium' | 'Canteen' | 'Other';
  description: string;
  area?: string;              // e.g. "5000 sq. ft."
  capacity?: number;
  features: string[];
  images: string[];
}

export interface GoverningMember {
  id: number;
  name: string;
  designation: string;
  imageUrl?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  batch: string;
  programme: string;
  content: string;
  currentPosition?: string;
  company?: string;
  imageUrl?: string;
}

export interface Placement {
  id: number;
  companyName: string;
  logoUrl?: string;
  packageLPA: number;
  studentsPlaced: number;
  year: number;
  domain: string;
}

export interface CollegeStat {
  label: string;
  value: string;
  icon: string;
  suffix?: string;
}

// ── API response wrappers (ready for Laravel Resources) ──
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    from: number;
    to: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

// ── Form types ──
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  department: string;
  message: string;
}

export interface AdmissionEnquiryData {
  name: string;
  email: string;
  phone: string;
  programme: string;
  board: string;
  percentage: number;
  message?: string;
}
