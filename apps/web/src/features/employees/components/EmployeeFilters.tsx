import { useState, useCallback } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { DEPARTMENTS } from '../../../utils/constants';
import { getUserRole } from '../../../utils/storage';
import './EmployeeFilters.css';

interface EmployeeFiltersProps {
  onSearchChange: (search: string) => void;
  onDepartmentChange: (department: string) => void;
  onReset: () => void;
  onCreateClick: () => void;
}

export function EmployeeFilters({
  onSearchChange,
  onDepartmentChange,
  onReset,
  onCreateClick,
}: EmployeeFiltersProps) {
  const [searchInput, setSearchInput] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const isAdmin = getUserRole() === 'ADMIN';

  const debouncedSearch = useDebounce((value: string) => {
    onSearchChange(value);
  }, 300);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchInput(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handleDepartmentChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setSelectedDepartment(value);
      onDepartmentChange(value);
    },
    [onDepartmentChange]
  );

  const handleReset = useCallback(() => {
    setSearchInput('');
    setSelectedDepartment('');
    onReset();
  }, [onReset]);

  return (
    <div className="filters-container">
      <div className="filters-row">
        <div className="filter-search">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="employee-search"
            type="text"
            className="filter-input"
            placeholder="Search by name or email..."
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>

        <select
          id="department-filter"
          className="filter-select"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <button id="reset-filters" className="btn btn-ghost" onClick={handleReset}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          Reset
        </button>

        {isAdmin && (
          <button id="create-employee" className="btn btn-primary" onClick={onCreateClick}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Employee
          </button>
        )}
      </div>
    </div>
  );
}
