import type { CollegeEvent } from '@/types';

export const events: CollegeEvent[] = [
  {
    id: 1,
    slug: 'annual-cultural-fest-kaleidoscope-2025',
    title: 'Kaleidoscope 2025 — Annual Cultural Festival',
    category: 'Cultural',
    description:
      "N.G. Acharya & D.K. Marathe College's flagship annual cultural festival returns for its 28th edition. Three days of electrifying competitions, performances, celebrity appearances, and unforgettable memories. Over 4,000 students from 60+ colleges across Mumbai participate.",
    date: '2025-09-18T09:00:00Z',
    endDate: '2025-09-20T22:00:00Z',
    venue: 'College Grounds & Auditorium',
    isUpcoming: true,
    registrationLink: 'https://kaleidoscope.ngacharya.edu.in',
    highlights: [
      '100+ competitions across dance, music, drama, art, and literary events',
      'Celebrity performance on Day 3',
      'Pro-Shows and stand-up comedy nights',
      'Food fest with 50+ stalls',
      'Prize money worth ₹5 Lakhs',
    ],
  },
  {
    id: 2,
    slug: 'national-science-day-2025',
    title: 'National Science Day — Science Exhibition & Quiz Competition',
    category: 'Academic',
    description:
      'Celebrating National Science Day on 28th February, the Science departments organised a science exhibition featuring 60+ student projects and an inter-college quiz competition. Eminent scientist Dr. Madhav Karnik from TIFR delivered the keynote on "Science for Sustainable Development".',
    date: '2025-02-28T09:30:00Z',
    venue: 'College Campus & Labs',
    isUpcoming: false,
    highlights: [
      '60+ innovative student projects exhibited',
      'Inter-college science quiz with 20 teams',
      'Keynote by Dr. Madhav Karnik, TIFR',
      'Best Project Awards',
    ],
  },
  {
    id: 3,
    slug: 'synergy-management-conclave-2025',
    title: 'SYNERGY 2025 — Annual Management Conclave',
    category: 'Academic',
    description:
      'The BMS Department\'s annual management festival SYNERGY brought together future business leaders for case study competitions, guest lectures by industry veterans, and the prestigious Mr. & Ms. Manager pageant.',
    date: '2025-03-14T10:00:00Z',
    endDate: '2025-03-15T18:00:00Z',
    venue: 'College Auditorium',
    isUpcoming: false,
    highlights: [
      'Guest lecture by Mr. Rajesh Desai, CEO of Mahindra Logistics',
      'National-level case study competition',
      'Start-up pitching arena',
      'HR Simulation and mock negotiation rounds',
    ],
  },
  {
    id: 4,
    slug: 'hackathon-codesprint-2025',
    title: 'CodeSprint 2025 — 24-Hour Hackathon',
    category: 'Academic',
    description:
      'The IT Department organised CodeSprint 2025 — a 24-hour hackathon where 180 students from across Mumbai competed to build innovative tech solutions. Problem statements covered healthcare AI, fintech, smart cities, and edtech.',
    date: '2025-04-05T09:00:00Z',
    endDate: '2025-04-06T09:00:00Z',
    venue: 'IT Lab Block (3rd Floor)',
    isUpcoming: false,
    highlights: [
      '45 teams — 180 participants',
      'Problem statements by TCS and Persistent Systems',
      'First Prize: ₹25,000 + incubation opportunity',
      'Mentoring by senior engineers from product companies',
    ],
  },
  {
    id: 5,
    slug: 'inter-collegiate-sports-meet-2025',
    title: 'Inter-Collegiate Sports Meet — Chembur Zone 2025',
    category: 'Sports',
    description:
      'The annual Chembur Zone Inter-Collegiate Sports Meet was hosted by our college. Students competed in 12 sports — football, basketball, volleyball, kabaddi, cricket, athletics, and more — bringing home 23 medals.',
    date: '2025-01-20T08:00:00Z',
    endDate: '2025-01-22T17:00:00Z',
    venue: 'College Grounds & Sports Complex',
    isUpcoming: false,
    highlights: [
      'Participation from 18 colleges',
      'Men\'s Basketball: 🥇 Gold',
      'Women\'s Kabaddi: 🥇 Gold',
      '400m Athletics: 🥇 Gold & 🥈 Silver',
      'Overall Runner-Up Trophy',
    ],
  },
  {
    id: 6,
    slug: 'workshop-ai-ml-2025',
    title: 'Workshop on AI & Machine Learning for Industry 4.0',
    category: 'Workshop',
    description:
      'A two-day intensive workshop on Artificial Intelligence and Machine Learning jointly organised by the IT Department and IIT Bombay\'s E-Cell. Hands-on sessions on Python, scikit-learn, TensorFlow, and real-world case studies.',
    date: '2025-07-25T09:00:00Z',
    endDate: '2025-07-26T17:00:00Z',
    venue: 'Computer Lab 1 & 2 (3rd Floor)',
    isUpcoming: true,
    registrationLink: '/events/workshop-ai-ml-2025/register',
    highlights: [
      'Conducted by IIT Bombay research scholars',
      'Hands-on Python & TensorFlow sessions',
      'Case study: Computer Vision for manufacturing',
      'Certificate by IIT Bombay E-Cell',
      'Limited to 80 participants — Early registration advised',
    ],
  },
  {
    id: 7,
    slug: 'nss-blood-donation-camp-2025',
    title: 'NSS Blood Donation Camp — Maha Daan 2025',
    category: 'NSS/NCC',
    description:
      'The National Service Scheme (NSS) Unit of our college organised the annual Maha Daan blood donation camp in collaboration with Sion Hospital Blood Bank. 340 units of blood collected, a new college record!',
    date: '2025-06-14T09:00:00Z',
    venue: 'College Canteen & Ground Floor Lobby',
    isUpcoming: false,
    highlights: [
      '340 units of blood collected — College record',
      'Collaboration with Sion Hospital Blood Bank',
      '400+ student volunteers',
      'Appreciation by Maharashtra NSS State Coordinator',
    ],
  },
  {
    id: 8,
    slug: 'alumni-meet-2025',
    title: 'Alumni Meet 2025 — Homecoming Silver Edition',
    category: 'Alumni',
    description:
      'The Silver Edition Alumni Meet brought back graduates from 1998–2024, celebrating 25 years of alumni achievements. A nostalgic evening with cultural performances, alumni success stories, and the launch of the Alumni Scholarship Fund.',
    date: '2025-12-07T17:00:00Z',
    venue: 'College Auditorium & Lawn',
    isUpcoming: true,
    registrationLink: 'https://alumni.ngacharya.edu.in/homecoming-2025',
    highlights: [
      'Alumni from 26 years — 1998 to 2024 batches',
      'Launch of Alumni Scholarship Fund (₹10 Lakh corpus)',
      'Cultural performances by current students',
      'Panel discussion: Alumni in Industry',
      'Networking dinner',
    ],
  },
];

// ── Mock fetchers ──
export async function fetchEvents(): Promise<CollegeEvent[]> {
  await new Promise(r => setTimeout(r, 400));
  return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function fetchEventBySlug(slug: string): Promise<CollegeEvent | undefined> {
  await new Promise(r => setTimeout(r, 300));
  return events.find(e => e.slug === slug);
}

export async function fetchUpcomingEvents(): Promise<CollegeEvent[]> {
  await new Promise(r => setTimeout(r, 300));
  return events.filter(e => e.isUpcoming);
}
