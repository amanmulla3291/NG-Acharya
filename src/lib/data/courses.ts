import type { Course, CourseLevel } from '@/types';
import { courseStore } from './stores';

// ── Mock API fetchers — swap with Axios + TanStack Query ──

export async function fetchCourses(): Promise<Course[]> {
  await new Promise(r => setTimeout(r, 400)); // simulate latency
  return courseStore.getAll();
}

export async function fetchCourseBySlug(slug: string): Promise<Course | undefined> {
  await new Promise(r => setTimeout(r, 300));
  return courseStore.getAll().find(c => c.slug === slug);
}

export async function fetchCoursesByLevel(level: CourseLevel): Promise<Course[]> {
  await new Promise(r => setTimeout(r, 300));
  return courseStore.getAll().filter(c => c.level === level);
}
