import type { Department } from '@/types';

export const departments: Department[] = [
  {
    id: 1,
    slug: 'mass-media',
    name: 'Mass Media & Communication',
    shortName: 'BAMMC',
    description:
      'The Department of Mass Media and Communication is one of the most vibrant departments of the college, nurturing journalists, content creators, and communication professionals since 1997. Equipped with state-of-the-art TV studio, radio lab, and photography suite.',
    vision:
      'To produce socially responsible, ethically grounded, and technically proficient media professionals who shape the future of communication.',
    mission:
      'To provide experiential learning through industry partnerships, live media productions, and research that contributes to media studies in India.',
    headName: 'Dr. Sunita Mehrotra',
    headDesignation: 'Head of Department & Associate Professor',
    established: 1997,
    faculty: [],
    courses: ['bammc'],
    achievements: [
      'Maharashtra Government Award for Best College Media Department 2023',
      'National-level journalism competition — 12 gold medals in 5 years',
      '95% placement record for BAMMC graduates',
      'Students published in The Hindu, Hindustan Times, and Mid-Day',
    ],
    facilities: [
      'Professional TV Studio (4K broadcast quality)',
      'Radio Production Suite (licensed FM transmitter)',
      '40-node Photography & Editing Lab',
      'Screening Room (seating 80)',
    ],
  },
  {
    id: 2,
    slug: 'commerce',
    name: 'Commerce',
    shortName: 'Commerce',
    description:
      'The Commerce Department is the backbone of the college, offering BAF, BBI, BFM, and the flagship Ph.D. programme in Commerce. With a faculty team of 22 including 8 PhDs, the department consistently produces university rank holders.',
    vision:
      'Excellence in commerce education that creates globally competitive, ethically grounded business and finance professionals.',
    mission:
      'To impart quality education in accounting, finance, and business with a focus on practical skills, industry exposure, and research.',
    headName: 'Dr. Anand Kulkarni',
    headDesignation: 'Head of Department & Professor',
    established: 1964,
    faculty: [],
    courses: ['baf', 'bbi', 'bfm', 'msc-finance', 'phd-commerce', 'certificate-tally'],
    achievements: [
      'Ph.D. Research Centre recognized by University of Mumbai',
      'University Rank Holders every year for the last 10 consecutive years',
      'NAAC \'A\' Grade contribution — Research Publications: 45 in 2023-24',
      'Best Commerce Department Award — Mumbai University 2022',
    ],
    facilities: [
      'Commerce Research Library',
      'Bloomberg Terminal Access (2 seats)',
      'Tally ERP Lab (40 systems)',
      'Seminar Hall with video conferencing',
    ],
  },
  {
    id: 3,
    slug: 'management',
    name: 'Management Studies',
    shortName: 'BMS',
    description:
      'The Department of Management Studies offers the BMS programme and is known for its industry-led curriculum, active Entrepreneurship Cell, and the annual SYNERGY management festival. Students consistently secure placements in top companies.',
    vision:
      'To be a centre of excellence for management education that produces leaders with integrity, innovation, and global perspective.',
    mission:
      'Holistic development of management professionals through experiential learning, industry interface, and ethical leadership training.',
    headName: 'Prof. Kavita Sharma',
    headDesignation: 'Head of Department & Assistant Professor',
    established: 2001,
    faculty: [],
    courses: ['bms'],
    achievements: [
      'Best BMS Department in Chembur Zone — 3 consecutive years',
      'Students secured internships at HUL, P&G, and L\'Oréal',
      'E-Cell — 5 start-ups incubated in 2024',
      'SYNERGY — Top 5 management festival in Mumbai',
    ],
    facilities: [
      'Bloomberg Aptitude Test (BAT) enabled lab',
      'Discussion rooms (6 rooms)',
      'Entrepreneurship Lab',
      'Smart Classrooms',
    ],
  },
  {
    id: 4,
    slug: 'it',
    name: 'Information Technology',
    shortName: 'IT / DS',
    description:
      'The IT Department drives the college\'s technology vision, offering B.Sc. IT, B.Sc. DS, M.Sc. IT, and Certificate courses in Python. The department hosts CodeSprint hackathon and has produced students placed at TCS, Infosys, Wipro, and startups.',
    vision:
      'To be a leading centre of IT education in Mumbai, producing innovative and industry-ready technology professionals.',
    mission:
      'To deliver rigorous, relevant, and research-oriented IT education through cutting-edge labs, industry partnerships, and a culture of innovation.',
    headName: 'Dr. Prakash Nair',
    headDesignation: 'Head of Department & Associate Professor',
    established: 2000,
    faculty: [],
    courses: ['bsc-it', 'bsc-ds', 'msc-it', 'certificate-python'],
    achievements: [
      '100% placement for B.Sc. IT 2024 batch',
      'National-level hackathon winners — Smart India Hackathon 2023 (Finalist)',
      'Research paper published in IEEE Xplore by students',
      'Google Developers Group campus chapter',
    ],
    facilities: [
      '300-node Computer Lab (Core i7, 16GB RAM)',
      'Cloud Computing Lab (AWS/Azure credits)',
      'Cybersecurity Lab',
      'GPU Cluster for ML Research (NVIDIA A100)',
    ],
  },
  {
    id: 5,
    slug: 'cs',
    name: 'Computer Science',
    shortName: 'CS',
    description:
      'The Computer Science Department focuses on rigorous theoretical and applied CS education. The department encourages competitive programming, open-source contribution, and research, with strong alumni in top product companies globally.',
    vision:
      'To produce computer scientists of world-class calibre who drive innovation in software, AI, and systems research.',
    mission:
      'Rigorous theory, strong algorithms, and research culture — producing developers and scientists who solve hard problems.',
    headName: 'Prof. Rohan Deshpande',
    headDesignation: 'Head of Department & Assistant Professor',
    established: 2003,
    faculty: [],
    courses: ['bsc-cs'],
    achievements: [
      'Students selected for Google Summer of Code (GSoC) 3 years running',
      'ACM ICPC Asia Regional participation',
      'Alumni at Google, Microsoft, Amazon, and Jane Street',
      'Competitive programming community — 500+ LeetCode active solvers',
    ],
    facilities: [
      'Algorithms Research Lab',
      'High-performance computing cluster',
      'Open-source contribution wall',
    ],
  },
  {
    id: 6,
    slug: 'junior-college',
    name: 'Junior College (XI & XII)',
    shortName: 'Jr. College',
    description:
      'The Junior College division offers HSC courses in Arts, Science, and Commerce, consistently achieving outstanding board results. Dedicated faculty, personalised attention, and competitive exam coaching make it a top choice for students in Chembur.',
    vision: 'Empowering young minds to excel in board examinations and competitive tests, building the foundation for successful careers.',
    mission: 'Quality HSC education with focused coaching for JEE, NEET, and CA Foundation.',
    headName: 'Mrs. Shalini Joshi',
    headDesignation: 'Vice-Principal (Junior College)',
    established: 1964,
    faculty: [],
    courses: ['junior-college-science', 'junior-college-commerce', 'junior-college-arts'],
    achievements: [
      'State topper in HSC Arts — 2023',
      'College pass percentage: 98.7% — above state average',
      'JEE Mains: 45 qualifiers in 2024',
      'NEET: 32 qualifiers in 2024',
    ],
    facilities: ['Air-conditioned classrooms', 'Dedicated science labs', 'Library reading room', 'Counselling cell'],
  },
];

export async function fetchDepartments(): Promise<Department[]> {
  await new Promise(r => setTimeout(r, 400));
  return departments;
}

export async function fetchDepartmentBySlug(slug: string): Promise<Department | undefined> {
  await new Promise(r => setTimeout(r, 300));
  return departments.find(d => d.slug === slug);
}
