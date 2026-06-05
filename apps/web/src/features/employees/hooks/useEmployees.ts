import { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { employeesApi } from '../../../api/employees.api';
import type { Employee, PaginatedResponse, EmployeeFilters } from '../../../types';
import type { CreateEmployeePayload, UpdateEmployeePayload } from '../types';
import { DEFAULT_PAGE_SIZE } from '../../../utils/constants';

export function useEmployees() {
  const [data, setData] = useState<PaginatedResponse<Employee> | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<EmployeeFilters>({
    search: '',
    department: '',
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
  });

  const fetchEmployees = useCallback(async (currentFilters: EmployeeFilters) => {
    setLoading(true);
    try {
      const result = await employeesApi.getAll(currentFilters);
      setData(result);
    } catch {
      toast.error('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees(filters);
  }, [filters, fetchEmployees]);

  const refresh = useCallback(() => {
    fetchEmployees(filters);
  }, [filters, fetchEmployees]);

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const setPageSize = useCallback((limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  }, []);

  const setDepartment = useCallback((department: string) => {
    setFilters((prev) => ({ ...prev, department, page: 1 }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      department: '',
      page: 1,
      limit: DEFAULT_PAGE_SIZE,
    });
  }, []);

  return {
    employees: data?.data ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    currentPage: filters.page,
    pageSize: filters.limit,
    filters,
    loading,
    refresh,
    setPage,
    setPageSize,
    setSearch,
    setDepartment,
    resetFilters,
  };
}

export function useEmployeeMutations(onSuccess: () => void) {
  const [saving, setSaving] = useState(false);

  const createEmployee = useCallback(
    async (data: CreateEmployeePayload) => {
      setSaving(true);
      try {
        await employeesApi.create(data);
        toast.success('Employee created');
        onSuccess();
      } catch {
        toast.error('Failed to create employee');
      } finally {
        setSaving(false);
      }
    },
    [onSuccess]
  );

  const updateEmployee = useCallback(
    async (id: string, data: UpdateEmployeePayload) => {
      setSaving(true);
      try {
        await employeesApi.update(id, data);
        toast.success('Employee updated');
        onSuccess();
      } catch {
        toast.error('Failed to update employee');
      } finally {
        setSaving(false);
      }
    },
    [onSuccess]
  );

  const deleteEmployee = useCallback(
    async (id: string) => {
      setSaving(true);
      try {
        await employeesApi.delete(id);
        toast.success('Employee deleted');
        onSuccess();
      } catch {
        toast.error('Failed to delete employee');
      } finally {
        setSaving(false);
      }
    },
    [onSuccess]
  );

  return { saving, createEmployee, updateEmployee, deleteEmployee };
}
