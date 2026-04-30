import type { Notice } from '@/types';
import { noticeStore } from './stores';

// ── Mock fetchers ──

export async function fetchNotices(): Promise<Notice[]> {
  await new Promise(r => setTimeout(r, 400));
  return noticeStore.getAll().sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function fetchNoticeBySlug(slug: string): Promise<Notice | undefined> {
  await new Promise(r => setTimeout(r, 300));
  return noticeStore.getAll().find(n => n.slug === slug);
}

export async function fetchNoticesByCategory(category: string): Promise<Notice[]> {
  await new Promise(r => setTimeout(r, 300));
  const allNotices = noticeStore.getAll();
  if (category === 'All') return allNotices.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return allNotices.filter(n => n.category === category).sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
