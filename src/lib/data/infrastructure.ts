import type { CollegeStat, Testimonial, Placement, InfrastructureItem } from '@/types';

export const collegeStats: CollegeStat[] = [
  { label: 'Students Enrolled', value: '8,000', icon: 'Users', suffix: '+' },
  { label: 'Pass out Students', value: '90,000', icon: 'GraduationCap', suffix: '+' },
  { label: 'Years of Excellence', value: '45', icon: 'Award', suffix: '+' },
  { label: 'Programmes Offered', value: '30', icon: 'BookOpen', suffix: '+' },
  { label: 'Computers in Labs', value: '250', icon: 'Zap', suffix: '+' },
  { label: 'Books in Library', value: '35,000', icon: 'FileText', suffix: '+' },
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
      'A massive two-storey knowledge hub with Wi-Fi connectivity, housing over 35,000 books and numerous national/international journals. Dedicated reading halls provide a serene environment for 400+ students.',
    area: '12,000 sq. ft.',
    capacity: 400,
    features: [
      '35,000+ books across all disciplines',
      'Wi-Fi enabled reading zones',
      'Digital library access',
      'National and International Journals',
      'OPAC (Online Public Access Catalogue)',
    ],
    images: ['/images/library-1.jpg', '/images/library-2.jpg'],
  },
  {
    id: 2,
    slug: 'it-labs',
    name: 'Computer & IT Laboratories',
    category: 'IT',
    description:
      'Three state-of-the-art computer labs equipped with 250+ high-configuration systems, dedicated to IT, Computer Science, and Data Science students.',
    area: '8,000 sq. ft.',
    capacity: 250,
    features: [
      '250+ high-configuration workstations',
      'High-speed internet connectivity',
      'Digital Media Lab for media studies',
      'Software specialized for Data Science',
    ],
    images: ['/images/it-lab-1.jpg', '/images/it-lab-2.jpg'],
  },
  {
    id: 3,
    slug: 'radio-tv-studio',
    name: 'Acharya 90FM & TV Studio',
    category: 'Media',
    description:
      "Our unique community radio station, Acharya 90FM, and dedicated TV studio provide students with hands-on experience in broadcasting, news reporting, and media production.",
    area: '3,000 sq. ft.',
    capacity: 50,
    features: [
      'Community Radio Broadcasting (90FM)',
      'Professional TV News Studio',
      'Audio & Video Editing suites',
      'Radio Jockeying certificate course',
    ],
    images: ['/images/studio-1.jpg'],
  },
  {
    id: 4,
    slug: 'sports-ncc',
    name: 'Sports Ground & NCC Obstacle Course',
    category: 'Sports',
    description:
      'A sprawling sports ground for cricket, football, and athletics, featuring a specialized obstacle ground for NCC training — unique to our campus.',
    area: '45,000 sq. ft.',
    features: [
      'Large multi-purpose sports ground',
      'NCC Obstacle training ground',
      'Indoor Sports & Gymkhana',
      'Volleyball and Basketball courts',
    ],
    images: ['/images/sports-1.jpg', '/images/sports-2.jpg'],
  },
  {
    id: 5,
    slug: 'nature-garden',
    name: 'Butterfly Garden',
    category: 'Environment',
    description:
      'A beautiful collection of flowering plants designed to attract butterflies, serving as an eco-friendly zone and a biological study area for students.',
    features: [
      'Collection of diverse flowering plants',
      'Eco-friendly peaceful zone',
      'Biological study resources',
    ],
    images: ['/images/garden-1.jpg'],
  },
];

export async function fetchInfrastructure(): Promise<InfrastructureItem[]> {
  await new Promise(r => setTimeout(r, 350));
  return infrastructure;
}
