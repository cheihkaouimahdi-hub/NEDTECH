import { useState, useCallback } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { EmployeeFilters } from '../components/EmployeeFilters';
import { EmployeeTable } from '../components/EmployeeTable';
import { EmployeeModal } from '../components/EmployeeModal';
import { DeleteDialog } from '../components/DeleteDialog';
import { useEmployees, useEmployeeMutations } from '../hooks/useEmployees';
import type { Employee } from '../../../types';
import type { EmployeeFormData } from '../schemas/employee.schema';
import './HomePage.css';

export function HomePage() {
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // Delete dialog state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(null);

  const {
    employees,
    total,
    totalPages,
    currentPage,
    pageSize,
    loading,
    refresh,
    setPage,
    setPageSize,
    setSearch,
    setDepartment,
    resetFilters,
  } = useEmployees();

  const handleMutationSuccess = useCallback(() => {
    setModalOpen(false);
    setEditingEmployee(null);
    setDeleteOpen(false);
    setDeletingEmployee(null);
    refresh();
  }, [refresh]);

  const { saving, createEmployee, updateEmployee, deleteEmployee } =
    useEmployeeMutations(handleMutationSuccess);

  // Handlers
  const handleCreateClick = useCallback(() => {
    setEditingEmployee(null);
    setModalOpen(true);
  }, []);

  const handleEditClick = useCallback((employee: Employee) => {
    setEditingEmployee(employee);
    setModalOpen(true);
  }, []);

  const handleDeleteClick = useCallback((employee: Employee) => {
    setDeletingEmployee(employee);
    setDeleteOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setEditingEmployee(null);
  }, []);

  const handleDeleteCancel = useCallback(() => {
    setDeleteOpen(false);
    setDeletingEmployee(null);
  }, []);

  const handleFormSubmit = useCallback(
    (data: EmployeeFormData) => {
      if (editingEmployee) {
        updateEmployee(editingEmployee.id, data);
      } else {
        createEmployee(data);
      }
    },
    [editingEmployee, createEmployee, updateEmployee]
  );

  const handleDeleteConfirm = useCallback(() => {
    if (deletingEmployee) {
      deleteEmployee(deletingEmployee.id);
    }
  }, [deletingEmployee, deleteEmployee]);

  return (
    <DashboardLayout>
      <div className="home-page">
        <div className="page-header">
          <div>
            <h2 className="page-title">Employees</h2>
            <p className="page-subtitle">
              Manage your team — {total} employee{total !== 1 ? 's' : ''} total
            </p>
          </div>
        </div>

        <EmployeeFilters
          onSearchChange={setSearch}
          onDepartmentChange={setDepartment}
          onReset={resetFilters}
          onCreateClick={handleCreateClick}
        />

        <EmployeeTable
          employees={employees}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />

        <EmployeeModal
          isOpen={modalOpen}
          employee={editingEmployee}
          saving={saving}
          onClose={handleModalClose}
          onSubmit={handleFormSubmit}
        />

        <DeleteDialog
          isOpen={deleteOpen}
          employeeName={
            deletingEmployee
              ? `${deletingEmployee.firstName} ${deletingEmployee.LastName}`
              : ''
          }
          saving={saving}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      </div>
    </DashboardLayout>
  );
}
