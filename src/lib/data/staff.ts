import type { StaffMember } from '@/types';
import { staffStore } from './stores';

// ── Mock fetchers ──

export async function fetchStaffMembers(): Promise<StaffMember[]> {
  await new Promise(r => setTimeout(r, 600));
  return staffStore.getAll();
}

export async function fetchStaffByDepartment(departmentSlug: string): Promise<StaffMember[]> {
  const allStaff = await fetchStaffMembers();
  return allStaff.filter(s => s.departmentSlug === departmentSlug);
}

export async function fetchStaffById(id: number): Promise<StaffMember | undefined> {
  return staffStore.getById(id);
}

// Aliases for compatibility
export const fetchStaff = fetchStaffMembers;

export async function fetchStaffBySlug(slug: string): Promise<StaffMember | undefined> {
  const all = await fetchStaffMembers();
  return all.find(s => s.id.toString() === slug || s.name.toLowerCase().replace(/\s+/g, '-') === slug);
}

