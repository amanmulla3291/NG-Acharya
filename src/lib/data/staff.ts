import type { StaffMember } from '@/types';

export const staffMembers: StaffMember[] = [
  // ── Mass Media ──
  {
    id: 1,
    slug: 'dr-sunita-mehrotra',
    name: 'Dr. Sunita Mehrotra',
    designation: 'Head of Department & Associate Professor',
    qualification: 'Ph.D. (Mass Communication, Symbiosis), M.A. (Journalism)',
    department: 'Mass Media & Communication',
    departmentSlug: 'mass-media',
    experience: 18,
    specialization: ['Television Journalism', 'Media Research', 'Digital Communication'],
    email: 'sunita.mehrotra@ngacharya.edu.in',
    publications: 14,
    awards: ['Best Faculty Award – Mumbai University 2022', 'Shri M. V. Dhond Research Award 2021'],
    bio: 'Dr. Mehrotra has over 18 years of experience in teaching mass communication. She previously worked with Doordarshan and Star News before joining academia, bringing real-world newsroom experience to the classroom.',
  },
  {
    id: 2,
    slug: 'prof-rohan-joshi',
    name: 'Prof. Rohan Joshi',
    designation: 'Assistant Professor',
    qualification: 'M.A. (Advertising & PR), PGDM (Marketing)',
    department: 'Mass Media & Communication',
    departmentSlug: 'mass-media',
    experience: 9,
    specialization: ['Advertising', 'Brand Strategy', 'Social Media Marketing'],
    email: 'rohan.joshi@ngacharya.edu.in',
    publications: 6,
  },

  // ── Commerce ──
  {
    id: 3,
    slug: 'dr-anand-kulkarni',
    name: 'Dr. Anand Kulkarni',
    designation: 'Head of Department & Professor',
    qualification: 'Ph.D. (Commerce, Mumbai University), M.Com., LL.B., FCA',
    department: 'Commerce',
    departmentSlug: 'commerce',
    experience: 26,
    specialization: ['Corporate Taxation', 'Financial Accounting', 'Auditing'],
    email: 'anand.kulkarni@ngacharya.edu.in',
    publications: 32,
    awards: ['Best Researcher Award – Mumbai University 2023', 'Excellence in Teaching – 2019'],
    bio: 'Dr. Kulkarni is a Fellow Chartered Accountant with 26 years of teaching and research experience. He is a recognized Ph.D. guide at Mumbai University with 8 scholars awarded doctorates under his supervision.',
  },
  {
    id: 4,
    slug: 'prof-nita-shah',
    name: 'Prof. Nita Shah',
    designation: 'Associate Professor',
    qualification: 'M.Com. (Finance), MBA (Finance), Ph.D. (Pursuing)',
    department: 'Commerce',
    departmentSlug: 'commerce',
    experience: 15,
    specialization: ['Financial Management', 'Investment Analysis', 'Capital Markets'],
    email: 'nita.shah@ngacharya.edu.in',
    publications: 11,
  },
  {
    id: 5,
    slug: 'dr-priya-patkar',
    name: 'Dr. Priya Patkar',
    designation: 'Assistant Professor',
    qualification: 'Ph.D. (Commerce, Mumbai University), M.Com.',
    department: 'Commerce',
    departmentSlug: 'commerce',
    experience: 10,
    specialization: ['Taxation', 'GST', 'Direct Tax Laws'],
    email: 'priya.patkar@ngacharya.edu.in',
    publications: 8,
  },

  // ── Management ──
  {
    id: 6,
    slug: 'prof-kavita-sharma',
    name: 'Prof. Kavita Sharma',
    designation: 'Head of Department & Assistant Professor',
    qualification: 'MBA (HR & Marketing, JBIMS), B.Com.',
    department: 'Management Studies',
    departmentSlug: 'management',
    experience: 13,
    specialization: ['Human Resource Management', 'Organizational Behaviour', 'Strategic Management'],
    email: 'kavita.sharma@ngacharya.edu.in',
    publications: 7,
    awards: ['Best BMS Faculty – Chembur Zone 2023'],
  },
  {
    id: 7,
    slug: 'prof-amit-desai',
    name: 'Prof. Amit Desai',
    designation: 'Assistant Professor',
    qualification: 'MBA (Marketing, NMIMS), B.E. (Computer Engineering)',
    department: 'Management Studies',
    departmentSlug: 'management',
    experience: 8,
    specialization: ['Marketing Management', 'Digital Marketing', 'Entrepreneurship'],
    email: 'amit.desai@ngacharya.edu.in',
    publications: 4,
  },

  // ── IT ──
  {
    id: 8,
    slug: 'dr-prakash-nair',
    name: 'Dr. Prakash Nair',
    designation: 'Head of Department & Associate Professor',
    qualification: 'Ph.D. (Computer Science, IIT Bombay), M.Sc. (CS), B.Sc. (IT)',
    department: 'Information Technology',
    departmentSlug: 'it',
    experience: 20,
    specialization: ['Machine Learning', 'Cloud Computing', 'Distributed Systems'],
    email: 'prakash.nair@ngacharya.edu.in',
    publications: 28,
    awards: ['Best Research Paper – IEEE ICCUBEA 2022', 'Excellence in Computing Education 2021'],
    bio: 'Dr. Nair earned his Ph.D. from IIT Bombay and brings cutting-edge research in ML and cloud systems to the classroom. He has 20+ peer-reviewed publications and supervises 3 active Ph.D. scholars.',
  },
  {
    id: 9,
    slug: 'prof-meena-iyer',
    name: 'Prof. Meena Iyer',
    designation: 'Assistant Professor',
    qualification: 'M.Sc. (IT, Mumbai University), M.Tech. (Pursuing)',
    department: 'Information Technology',
    departmentSlug: 'it',
    experience: 7,
    specialization: ['Web Technologies', 'Python', 'Data Analytics'],
    email: 'meena.iyer@ngacharya.edu.in',
    publications: 5,
  },
  {
    id: 10,
    slug: 'prof-sanjay-thorat',
    name: 'Prof. Sanjay Thorat',
    designation: 'Assistant Professor',
    qualification: 'M.Sc. (CS), CCNA, AWS Certified Solutions Architect',
    department: 'Information Technology',
    departmentSlug: 'it',
    experience: 11,
    specialization: ['Cybersecurity', 'Networking', 'Cloud Infrastructure'],
    email: 'sanjay.thorat@ngacharya.edu.in',
    publications: 6,
  },

  // ── Computer Science ──
  {
    id: 11,
    slug: 'prof-rohan-deshpande',
    name: 'Prof. Rohan Deshpande',
    designation: 'Head of Department & Assistant Professor',
    qualification: 'M.Sc. (CS, IIT Kharagpur), B.Sc. (CS)',
    department: 'Computer Science',
    departmentSlug: 'cs',
    experience: 10,
    specialization: ['Algorithms', 'Competitive Programming', 'Operating Systems'],
    email: 'rohan.deshpande@ngacharya.edu.in',
    publications: 9,
    bio: 'Prof. Deshpande is an IIT Kharagpur alumnus with a strong competitive programming background. He coaches the college\'s ACM ICPC team and has mentored students who have joined Google, Microsoft, and Amazon.',
  },

  // ── Principal ──
  {
    id: 12,
    slug: 'dr-madhuri-krishnamurthy',
    name: 'Dr. Madhuri Krishnamurthy',
    designation: 'Principal',
    qualification: 'Ph.D. (Economics, Mumbai University), M.A. (Economics), M.Phil.',
    department: 'Administration',
    departmentSlug: 'admin',
    experience: 30,
    specialization: ['Development Economics', 'Indian Economy', 'Public Policy'],
    email: 'principal@ngacharya.edu.in',
    publications: 22,
    awards: [
      'Best Principal Award – Maharashtra State Govt. 2022',
      'NAAC Advocate of Excellence 2021',
      'Rashtriya Gaurav Award 2019',
    ],
    bio: 'Dr. Krishnamurthy has steered the college to its NAAC \'A\' Grade with remarkable leadership, overseeing a 40% increase in student placements and 60+ new academic initiatives in the past five years. A distinguished economist and institutional leader, she champions gender equity, research culture, and sustainability in higher education.',
  },
];

export async function fetchStaff(): Promise<StaffMember[]> {
  await new Promise(r => setTimeout(r, 350));
  return staffMembers;
}

export async function fetchStaffBySlug(slug: string): Promise<StaffMember | undefined> {
  await new Promise(r => setTimeout(r, 250));
  return staffMembers.find(s => s.slug === slug);
}

export async function fetchStaffByDepartment(deptSlug: string): Promise<StaffMember[]> {
  await new Promise(r => setTimeout(r, 250));
  return staffMembers.filter(s => s.departmentSlug === deptSlug);
}
