import type { Department } from '@/types';
import { departmentStore } from './stores';

// ── Mock fetchers ──

export async function fetchDepartments(): Promise<Department[]> {
  await new Promise(r => setTimeout(r, 400));
  return departmentStore.getAll();
}

export async function fetchDepartmentBySlug(slug: string): Promise<Department | undefined> {
  await new Promise(r => setTimeout(r, 300));
  return departmentStore.getAll().find(d => d.slug === slug);
}
