import type { CollegeStat, Testimonial, Placement, InfrastructureItem } from '@/types';

export const collegeStats: CollegeStat[] = [
  { label: 'Students Enrolled', value: '6,000', icon: 'Users', suffix: '+' },
  { label: 'Faculty Members', value: '200', icon: 'GraduationCap', suffix: '+' },
  { label: 'Years of Excellence', value: '60', icon: 'Award', suffix: '+' },
  { label: 'Programmes Offered', value: '25', icon: 'BookOpen', suffix: '+' },
  { label: 'Placement Companies', value: '150', icon: 'Briefcase', suffix: '+' },
  { label: 'Research Publications', value: '180', icon: 'FileText', suffix: '+' },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Priya Desai',
    batch: '2022',
    programme: 'B.Sc. IT',
    content:
      "The IT department's industry exposure and hackathon culture shaped me into a developer who thinks beyond textbooks. The faculty went above and beyond to support my internship applications. I joined TCS as a System Engineer within a month of graduation.",
    currentPosition: 'Senior Systems Engineer',
    company: 'Tata Consultancy Services',
  },
  {
    id: 2,
    name: 'Arjun Patil',
    batch: '2021',
    programme: 'BMS',
    content:
      "SYNERGY gave me a platform I never imagined — I won the national case study competition and got noticed by a recruiter right there on stage. The Entrepreneurship Cell helped me launch my startup while still in college. Acharya Marathe builds real leaders.",
    currentPosition: 'Co-Founder',
    company: 'FinLeap Technologies (Mumbai)',
  },
  {
    id: 3,
    name: 'Sneha Kulkarni',
    batch: '2023',
    programme: 'BAMMC',
    content:
      "The TV studio and radio lab gave me real production experience before I even graduated. My internship at NDTV was secured through the department's media network. Today I report for a national news channel — it all began here.",
    currentPosition: 'Junior Reporter',
    company: 'NDTV India',
  },
  {
    id: 4,
    name: 'Rohan Mehta',
    batch: '2020',
    programme: 'BAF',
    content:
      "The CA Foundation-aligned curriculum at Acharya Marathe gave me a tremendous head start. I cleared CA Intermediate in my first attempt while working. The faculty are genuinely invested in students' success, treating you like family.",
    currentPosition: 'CA Finalist',
    company: 'Deloitte India',
  },
];

export const placements: Placement[] = [
  { id: 1, companyName: 'Tata Consultancy Services', packageLPA: 3.6, studentsPlaced: 42, year: 2024, domain: 'Technology' },
  { id: 2, companyName: 'Infosys', packageLPA: 3.5, studentsPlaced: 28, year: 2024, domain: 'Technology' },
  { id: 3, companyName: 'Wipro', packageLPA: 3.5, studentsPlaced: 18, year: 2024, domain: 'Technology' },
  { id: 4, companyName: 'Accenture', packageLPA: 4.5, studentsPlaced: 15, year: 2024, domain: 'Consulting' },
  { id: 5, companyName: 'HDFC Bank', packageLPA: 3.8, studentsPlaced: 25, year: 2024, domain: 'Banking' },
  { id: 6, companyName: 'Axis Bank', packageLPA: 3.5, studentsPlaced: 20, year: 2024, domain: 'Banking' },
  { id: 7, companyName: 'Deloitte', packageLPA: 6.5, studentsPlaced: 8, year: 2024, domain: 'Consulting' },
  { id: 8, companyName: 'Ernst & Young', packageLPA: 7.0, studentsPlaced: 5, year: 2024, domain: 'Consulting' },
  { id: 9, companyName: 'Muthoot Finance', packageLPA: 3.2, studentsPlaced: 12, year: 2024, domain: 'Finance' },
  { id: 10, companyName: 'Persistent Systems', packageLPA: 5.0, studentsPlaced: 10, year: 2024, domain: 'Technology' },
];

export const infrastructure: InfrastructureItem[] = [
  {
    id: 1,
    slug: 'central-library',
    name: 'Central Library',
    category: 'Library',
    description:
      'The Central Library is a 3-storey knowledge hub with over 80,000 books, 250+ national and international journals, and 24/7 digital access to JSTOR, N-LIST, and Shodhganga. Dedicated reading halls can accommodate 400+ students simultaneously.',
    area: '12,000 sq. ft.',
    capacity: 400,
    features: [
      '80,000+ books across all disciplines',
      '250+ print journals and magazines',
      'Digital library — N-LIST, JSTOR, Shodhganga',
      'RFID-enabled book management',
      'Separate reference section',
      'OPAC (Online Public Access Catalogue)',
      'Newspaper reading room',
    ],
    images: ['/images/library-1.jpg', '/images/library-2.jpg'],
  },
  {
    id: 2,
    slug: 'it-lab',
    name: 'Computer & IT Laboratories',
    category: 'IT',
    description:
      'Our IT infrastructure comprises 4 computer labs with 300+ high-performance workstations, dedicated cloud computing and cybersecurity labs, and a GPU research cluster for machine learning — among the best in Mumbai university colleges.',
    area: '8,000 sq. ft.',
    capacity: 300,
    features: [
      '300 workstations — Core i7, 16GB RAM, SSD',
      'AWS / Azure / GCP credits for cloud projects',
      'GPU Cluster — NVIDIA A100 (ML Research)',
      'Cybersecurity lab with Kali Linux setup',
      '1 Gbps internet connectivity',
      'Licensed software — MATLAB, Adobe Suite, AutoCAD',
    ],
    images: ['/images/it-lab-1.jpg', '/images/it-lab-2.jpg'],
  },
  {
    id: 3,
    slug: 'auditorium',
    name: 'Main Auditorium',
    category: 'Auditorium',
    description:
      'The air-conditioned main auditorium with a seating capacity of 900 is equipped with a full HD projection system, professional sound setup, and a spacious performance stage — hosting convocations, cultural festivals, and distinguished lecture series.',
    area: '15,000 sq. ft.',
    capacity: 900,
    features: [
      '900 cushioned seats',
      'Full HD laser projection (20,000 lumens)',
      'Dolby Atmos surround sound system',
      'Professional stage lighting rigs',
      'Green rooms and make-up rooms',
      'Live streaming capability',
    ],
    images: ['/images/auditorium-1.jpg', '/images/auditorium-2.jpg'],
  },
  {
    id: 4,
    slug: 'sports-complex',
    name: 'Sports Complex & Grounds',
    category: 'Sports',
    description:
      'Our sprawling sports facilities include a synthetic badminton court, cricket pitch, basketball and volleyball courts, an indoor gymnasium, a swimming pool, and a dedicated weight training room — nurturing sporting excellence.',
    area: '40,000 sq. ft.',
    features: [
      'Full-size cricket pitch (turf)',
      '2 synthetic basketball courts',
      '4 badminton courts (synthetic)',
      '2 volleyball courts',
      'Indoor gymnasium (200+ equipment items)',
      'Olympic-size swimming pool',
      'Athletics track (200m synthetic)',
    ],
    images: ['/images/sports-1.jpg', '/images/sports-2.jpg'],
  },
];

export async function fetchInfrastructure(): Promise<InfrastructureItem[]> {
  await new Promise(r => setTimeout(r, 350));
  return infrastructure;
}
