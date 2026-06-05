import type { ReactNode } from 'react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { ThemeToggle } from '../ThemeToggle';
import './DashboardLayout.css';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { logout } = useAuth();

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-brand">
            <div className="brand-icon">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 6H12.5L20 19.5V6H25V26H19.5L12 12.5V26H7V6Z" fill="url(#paint0_linear_dash)" />
                <path d="M11 26H21V29H11V26Z" fill="url(#paint1_linear_dash)" />
                <defs>
                  <linearGradient id="paint0_linear_dash" x1="7" y1="6" x2="25" y2="26" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#818CF8" />
                    <stop offset="1" stopColor="#C084FC" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_dash" x1="11" y1="26" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C084FC" />
                    <stop offset="1" stopColor="#6366F1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className="brand-title">NEDTECK</h1>
          </div>
          <div className="header-actions">
            <ThemeToggle />
            <button className="btn-logout" onClick={logout}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>
      <main className="dashboard-main">{children}</main>
    </div>
  );
}
