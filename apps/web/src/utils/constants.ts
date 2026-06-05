export const API_BASE_URL = 'http://localhost:3000';

export const STORAGE_KEYS = {
  TOKEN: 'token',
} as const;

export const PAGE_SIZES = [5, 10, 20, 50] as const;

export const DEFAULT_PAGE_SIZE = 10;

export const DEBOUNCE_MS = 300;

export const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Operations',
  'Design',
  'Product',
] as const;

export const EMPLOYEE_ROLES = ['EMPLOYEE', 'ADMIN'] as const;

export const EMPLOYEE_STATUSES = ['active', 'inactive'] as const;
