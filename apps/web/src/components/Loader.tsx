import './Loader.css';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
}

export function Loader({ size = 'md' }: LoaderProps) {
  return (
    <div className={`loader-container loader-${size}`}>
      <div className="loader-spinner" />
    </div>
  );
}
