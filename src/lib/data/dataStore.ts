/**
 * Generic localStorage-backed CRUD data store.
 * Merges seed data with localStorage mutations so admin edits persist
 * across page refreshes while keeping static seed data as the baseline.
 *
 * Ready to replace with API calls when Laravel backend is connected.
 */

interface HasId {
  id: number;
}


interface StoredMutations<T> {
  created: T[];
  updated: Record<number, Partial<T>>;
  deleted: number[];
}

export class DataStore<T extends HasId> {
  private storageKey: string;
  private seedData: T[];

  constructor(key: string, seedData: T[]) {
    this.storageKey = `admin_${key}`;
    this.seedData = seedData;
  }

  // ── Read ─────────────────────────────────────────────

  private getMutations(): StoredMutations<T> {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) return JSON.parse(raw);
    } catch { /* ignore corrupt data */ }
    return { created: [], updated: {}, deleted: [] };
  }

  private saveMutations(mutations: StoredMutations<T>): void {
    localStorage.setItem(this.storageKey, JSON.stringify(mutations));
  }

  /** Get all items: seed data + created, with updates applied, minus deleted */
  getAll(): T[] {
    const m = this.getMutations();
    const base = [...this.seedData, ...m.created];
    return base
      .filter((item) => !m.deleted.includes(item.id))
      .map((item) => {
        const updates = m.updated[item.id];
        return updates ? { ...item, ...updates } : item;
      });
  }

  /** Get single item by ID */
  getById(id: number): T | undefined {
    return this.getAll().find((item) => item.id === id);
  }

  /** Get single item by slug (if the type has a slug field) */
  getBySlug(slug: string): T | undefined {
    return this.getAll().find((item) => (item as Record<string, unknown>).slug === slug);
  }

  // ── Write ────────────────────────────────────────────

  /** Generate next ID based on all known items */
  private nextId(): number {
    const all = [...this.seedData, ...this.getMutations().created];
    return all.length === 0 ? 1 : Math.max(...all.map((i) => i.id)) + 1;
  }

  /** Create a new item */
  create(item: Omit<T, 'id'>): T {
    const m = this.getMutations();
    const newItem = { ...item, id: this.nextId() } as T;
    m.created.push(newItem);
    this.saveMutations(m);
    return newItem;
  }

  /** Update an existing item (partial merge) */
  update(id: number, data: Partial<T>): T | undefined {
    const m = this.getMutations();
    m.updated[id] = { ...(m.updated[id] || {}), ...data };
    this.saveMutations(m);
    return this.getById(id);
  }

  /** Delete an item */
  delete(id: number): void {
    const m = this.getMutations();
    m.deleted.push(id);
    // Also remove from created if it was admin-created
    m.created = m.created.filter((item) => item.id !== id);
    // Clean up updates for deleted items
    delete m.updated[id];
    this.saveMutations(m);
  }

  /** Reset all mutations (restore to seed data) */
  reset(): void {
    localStorage.removeItem(this.storageKey);
  }

  /** Get count */
  count(): number {
    return this.getAll().length;
  }
}
