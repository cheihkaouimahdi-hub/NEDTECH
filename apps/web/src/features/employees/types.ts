export type { Employee, PaginatedResponse, EmployeeFilters } from '../../types';

export interface CreateEmployeePayload {
  firstName: string;
  LastName: string;
  email: string;
  department: string;
  phone: string;
  role: 'EMPLOYEE' | 'ADMIN';
  status: string;
}

export interface UpdateEmployeePayload extends Partial<CreateEmployeePayload> { }
