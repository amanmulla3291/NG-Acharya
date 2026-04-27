import type { Notice } from '@/types';

export const notices: Notice[] = [
  {
    id: 1,
    slug: 'international-conference-2026',
    title: 'International Conference on Sustainable Development & Global Trends',
    category: 'Event',
    content: `We are pleased to announce the upcoming International Conference scheduled for **March 25, 2026**. 

The conference will bring together global experts, researchers, and students to discuss sustainable development goals and emerging global trends in commerce and technology.

**Venue:** College Auditorium
**Time:** 9:00 AM onwards`,
    publishedAt: '2026-03-25T09:00:00Z',
    isImportant: true,
    postedBy: 'Research Committee',
  },
  {
    id: 2,
    slug: 'national-science-day-2026',
    title: 'National Science Day Celebration — Science for a Sustainable Future',
    category: 'Event',
    content: `Our Science departments are celebrating National Science Day on **February 28, 2026**. 

Events include:
- Science Exhibition
- Guest Lecture by Eminent Scientists
- Poster Presentation Competition

All students are encouraged to participate and showcase their innovative projects.`,
    publishedAt: '2026-02-28T10:00:00Z',
    isImportant: true,
    postedBy: 'Science Association',
  },
  {
    id: 3,
    slug: 'mental-health-awareness-2026',
    title: 'Mental Health Awareness Workshop',
    category: 'General',
    content: `A special workshop on Mental Health Awareness will be conducted on **February 23, 2026**. 

The workshop aims to provide students with tools for stress management and emotional well-being. Professional counselors will be leading the sessions.`,
    publishedAt: '2026-02-23T11:00:00Z',
    isImportant: false,
    postedBy: 'Psychology Department',
  },
  {
    id: 4,
    slug: 'bammc-news-reporting-2026',
    title: 'BAMMC Department: Hands-on News Reporting Session',
    category: 'Academic',
    content: `The BAMMC department is organizing a special hands-on session on News Reporting on **February 2, 2026**. 

Students will get exposure to real-time reporting techniques at our digital media lab and Acharya 90FM studio.`,
    publishedAt: '2026-02-02T09:30:00Z',
    isImportant: false,
    postedBy: 'BAMMC Department',
  },
  {
    id: 5,
    slug: 'admission-notice-2025-26',
    title: 'Admission Notice for Academic Year 2025-26',
    category: 'Admission',
    content: `Admissions for Junior College (HSC) and Degree College (Aided/Self-Financed) for the academic year 2025-26 are commencing soon. 

Please check the merit lists and online admission portal for further details.`,
    publishedAt: '2026-01-20T10:00:00Z',
    isImportant: true,
    postedBy: 'Admission Committee',
  },
];

// ── Mock fetchers ──

export async function fetchNotices(): Promise<Notice[]> {
  await new Promise(r => setTimeout(r, 400));
  return notices.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function fetchNoticeBySlug(slug: string): Promise<Notice | undefined> {
  await new Promise(r => setTimeout(r, 300));
  return notices.find(n => n.slug === slug);
}

export async function fetchNoticesByCategory(category: string): Promise<Notice[]> {
  await new Promise(r => setTimeout(r, 300));
  if (category === 'All') return fetchNotices();
  return notices.filter(n => n.category === category).sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
