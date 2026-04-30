/**
 * Centralized data store instances.
 * Each store wraps seed data + localStorage mutations for admin CRUD.
 * Public pages import these stores to always get the latest data.
 */

import { DataStore } from './dataStore';
import { notices, events, courses, departments, staffMembers, infrastructure } from './seedData';
import type { Notice, CollegeEvent, Course, Department, StaffMember, InfrastructureItem } from '@/types';

export const noticeStore = new DataStore<Notice>('notices', notices);
export const eventStore = new DataStore<CollegeEvent>('events', events);
export const courseStore = new DataStore<Course>('courses', courses);
export const departmentStore = new DataStore<Department>('departments', departments);
export const staffStore = new DataStore<StaffMember>('staff', staffMembers);
export const infraStore = new DataStore<InfrastructureItem>('infrastructure', infrastructure);
