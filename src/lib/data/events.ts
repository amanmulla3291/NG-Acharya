import type { CollegeEvent } from '@/types';
import { eventStore } from './stores';

// ── Mock fetchers ──
export async function fetchEvents(): Promise<CollegeEvent[]> {
  await new Promise(r => setTimeout(r, 400));
  return eventStore.getAll().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function fetchEventBySlug(slug: string): Promise<CollegeEvent | undefined> {
  await new Promise(r => setTimeout(r, 300));
  return eventStore.getAll().find(e => e.slug === slug);
}

export async function fetchUpcomingEvents(): Promise<CollegeEvent[]> {
  await new Promise(r => setTimeout(r, 300));
  return eventStore.getAll().filter(e => e.isUpcoming).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
