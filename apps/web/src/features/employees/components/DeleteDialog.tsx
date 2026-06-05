import { Loader } from '../../../components/Loader';
import './DeleteDialog.css';

interface DeleteDialogProps {
  isOpen: boolean;
  employeeName: string;
  saving: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteDialog({
  isOpen,
  employeeName,
  saving,
  onConfirm,
  onCancel,
}: DeleteDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div
        className="dialog-content"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-desc"
      >
        <div className="dialog-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <h3 id="dialog-title" className="dialog-title">Delete Employee</h3>
        <p id="dialog-desc" className="dialog-message">
          Are you sure you want to delete <strong>{employeeName}</strong>? This action cannot be undone.
        </p>
        <div className="dialog-actions">
          <button className="btn btn-ghost" onClick={onCancel} disabled={saving}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={saving} id="confirm-delete">
            {saving ? (
              <>
                <Loader size="sm" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
