import './StatusBadge.css';

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isActive = status.toLowerCase() === 'active';

  return (
    <span className={`status-badge ${isActive ? 'status-active' : 'status-inactive'}`}>
      <span className="status-dot" />
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
}
