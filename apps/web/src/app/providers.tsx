import type { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e1e2e',
            color: '#e2e8f0',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            fontSize: '0.875rem',
            padding: '12px 16px',
            backdropFilter: 'blur(12px)',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#1e1e2e',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#1e1e2e',
            },
          },
        }}
      />
    </>
  );
}
