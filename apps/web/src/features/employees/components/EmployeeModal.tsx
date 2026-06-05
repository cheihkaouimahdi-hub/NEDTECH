import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema, type EmployeeFormData } from '../schemas/employee.schema';
import { DEPARTMENTS, EMPLOYEE_ROLES, EMPLOYEE_STATUSES } from '../../../utils/constants';
import { Loader } from '../../../components/Loader';
import type { Employee } from '../../../types';
import './EmployeeModal.css';

interface EmployeeModalProps {
  isOpen: boolean;
  employee: Employee | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeFormData) => void;
}

export function EmployeeModal({
  isOpen,
  employee,
  saving,
  onClose,
  onSubmit,
}: EmployeeModalProps) {
  const isEdit = employee !== null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: '',
      LastName: '',
      email: '',
      department: '',
      phone: '',
      role: 'EMPLOYEE',
      status: 'active',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (employee) {
        reset({
          firstName: employee.firstName,
          LastName: employee.LastName,
          email: employee.email,
          department: employee.department,
          phone: employee.phone,
          role: employee.role,
          status: employee.status as 'active' | 'inactive',
        });
      } else {
        reset({
          firstName: '',
          LastName: '',
          email: '',
          department: '',
          phone: '',
          role: 'EMPLOYEE',
          status: 'active',
        });
      }
    }
  }, [isOpen, employee, reset]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {isEdit ? 'Edit Employee' : 'Create Employee'}
          </h2>
          <button className="modal-close" onClick={onClose} disabled={saving}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                id="firstName"
                type="text"
                className={`form-input ${errors.firstName ? 'input-error' : ''}`}
                placeholder="John"
                {...register('firstName')}
              />
              {errors.firstName && (
                <span className="form-error">{errors.firstName.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="LastName" className="form-label">Last Name</label>
              <input
                id="LastName"
                type="text"
                className={`form-input ${errors.LastName ? 'input-error' : ''}`}
                placeholder="Doe"
                {...register('LastName')}
              />
              {errors.LastName && (
                <span className="form-error">{errors.LastName.message}</span>
              )}
            </div>

            <div className="form-group form-full">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                placeholder="john.doe@company.com"
                {...register('email')}
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                id="phone"
                type="text"
                className={`form-input ${errors.phone ? 'input-error' : ''}`}
                placeholder="+1 234 567 890"
                {...register('phone')}
              />
              {errors.phone && (
                <span className="form-error">{errors.phone.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="department" className="form-label">Department</label>
              <select
                id="department"
                className={`form-input ${errors.department ? 'input-error' : ''}`}
                {...register('department')}
              >
                <option value="">Select department</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && (
                <span className="form-error">{errors.department.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                id="role"
                className={`form-input ${errors.role ? 'input-error' : ''}`}
                {...register('role')}
              >
                {EMPLOYEE_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.role && (
                <span className="form-error">{errors.role.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                id="status"
                className={`form-input ${errors.status ? 'input-error' : ''}`}
                {...register('status')}
              >
                {EMPLOYEE_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
              {errors.status && (
                <span className="form-error">{errors.status.message}</span>
              )}
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
              id="save-employee"
            >
              {saving ? (
                <>
                  <Loader size="sm" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>{isEdit ? 'Update' : 'Create'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
