import { infrastructure, collegeStats, testimonials, placements } from './seedData';
import { infraStore } from './stores';
import type { InfrastructureItem } from '@/types';


export { collegeStats, testimonials, placements };
export const infrastructureItems = infrastructure;


// ── Mock fetchers ──

export async function fetchInfrastructure(): Promise<InfrastructureItem[]> {
  await new Promise(r => setTimeout(r, 500));
  return infraStore.getAll();
}

export async function fetchInfrastructureById(id: number): Promise<InfrastructureItem | undefined> {
  return infraStore.getById(id);
}
