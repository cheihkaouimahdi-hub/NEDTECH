export interface Employee {
  id: string;
  firstName: string;
  LastName: string;
  email: string;
  department: string;
  phone: string;
  role: 'EMPLOYEE' | 'ADMIN';
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface EmployeeFilters {
  search: string;
  department: string;
  page: number;
  limit: number;
}
