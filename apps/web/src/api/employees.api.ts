import api from './axios';
import type { Employee, PaginatedResponse, EmployeeFilters } from '../types';
import type { CreateEmployeePayload, UpdateEmployeePayload } from '../features/employees/types';

export const employeesApi = {
  getAll(filters: EmployeeFilters): Promise<PaginatedResponse<Employee>> {
    return api
      .get<PaginatedResponse<Employee>>('/api/employees', {
        params: {
          page: filters.page,
          limit: filters.limit,
          search: filters.search || undefined,
          department: filters.department || undefined,
        },
      })
      .then((res) => res.data);
  },

  create(data: CreateEmployeePayload): Promise<Employee> {
    return api.post<Employee>('/api/employees', data).then((res) => res.data);
  },

  update(id: string, data: UpdateEmployeePayload): Promise<Employee> {
    return api.patch<Employee>(`/api/employees/${id}`, data).then((res) => res.data);
  },

  delete(id: string): Promise<void> {
    return api.delete(`/api/employees/${id}`).then(() => undefined);
  },
};
