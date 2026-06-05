import type { Employee } from '../../../types';
import { StatusBadge } from './StatusBadge';
import { Loader } from '../../../components/Loader';
import { PAGE_SIZES } from '../../../utils/constants';
import { getUserRole } from '../../../utils/storage';
import './EmployeeTable.css';

interface EmployeeTableProps {
  employees: Employee[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export function EmployeeTable({
  employees,
  loading,
  currentPage,
  totalPages,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
}: EmployeeTableProps) {
  const isAdmin = getUserRole() === 'ADMIN';

  if (loading && employees.length === 0) {
    return (
      <div className="table-loading">
        <Loader size="lg" />
        <p>Loading employees...</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <div className="table-scroll">
        <table className="employee-table" id="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Department</th>
              <th>Role</th>
              <th>Email</th>
              <th>Status</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 7 : 6} className="table-empty">
                  <div className="empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <line x1="17" y1="11" x2="23" y2="11" />
                    </svg>
                    <p>No employees found</p>
                  </div>
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="cell-id">
                    <span className="id-badge">{employee.id.slice(0, 8)}</span>
                  </td>
                  <td className="cell-name">
                    <div className="name-avatar">
                      {employee.firstName.charAt(0)}
                      {employee.LastName.charAt(0)}
                    </div>
                    <span>{employee.firstName} {employee.LastName}</span>
                  </td>
                  <td>
                    <span className="dept-tag">{employee.department}</span>
                  </td>
                  <td className="cell-role">{employee.role}</td>
                  <td className="cell-email">{employee.email}</td>
                  <td>
                    <StatusBadge status={employee.status} />
                  </td>
                  {isAdmin && (
                    <td className="cell-actions">
                      <button
                        className="action-btn action-edit"
                        onClick={() => onEdit(employee)}
                        title="Edit employee"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        className="action-btn action-delete"
                        onClick={() => onDelete(employee)}
                        title="Delete employee"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="table-footer">
        <div className="page-size-control">
          <span>Rows per page:</span>
          <select
            id="page-size-selector"
            className="page-size-select"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="pagination-info">
          <span>
            {total === 0
              ? '0 results'
              : `${(currentPage - 1) * pageSize + 1}–${Math.min(currentPage * pageSize, total)} of ${total}`}
          </span>
        </div>

        <div className="pagination-controls">
          <button
            className="pagination-btn"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => {
              if (totalPages <= 5) return true;
              if (p === 1 || p === totalPages) return true;
              return Math.abs(p - currentPage) <= 1;
            })
            .reduce<(number | string)[]>((acc, p, idx, arr) => {
              if (idx > 0) {
                const prev = arr[idx - 1];
                if (typeof prev === 'number' && p - prev > 1) {
                  acc.push('...');
                }
              }
              acc.push(p);
              return acc;
            }, [])
            .map((item, idx) =>
              typeof item === 'string' ? (
                <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
                  …
                </span>
              ) : (
                <button
                  key={item}
                  className={`pagination-btn pagination-num ${
                    item === currentPage ? 'active' : ''
                  }`}
                  onClick={() => onPageChange(item)}
                >
                  {item}
                </button>
              )
            )}

          <button
            className="pagination-btn"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
