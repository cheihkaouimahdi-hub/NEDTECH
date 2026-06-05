import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../schemas/login.schema';
import { useAuth } from '../hooks/useAuth';
import { Loader } from '../../../components/Loader';
import { InteractiveMascot } from '../components/InteractiveMascot';
import './LoginPage.css';

export function LoginPage() {
  const { login, loading } = useAuth();
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null);
  const [mouseDir, setMouseDir] = useState({ x: 0, y: 0 });

  // Mascot horizontal offset along card top border (-1 to 1)
  const [mascotOffsetX, setMascotOffsetX] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized direction for eye/head tracking
      const dirX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const dirY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMouseDir({ x: dirX, y: dirY });

      // Move mascot along the top border of the card
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const relativeX = (e.clientX - cardCenterX) / (rect.width / 2);
        // Clamp between -1 and 1
        const clamped = Math.max(-1, Math.min(1, relativeX));
        setMascotOffsetX(clamped);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  const emailRegister = register('email');
  const passwordRegister = register('password');

  // Mascot slides left/right along the card top (max ~120px from center)
  const mascotTranslateX = mascotOffsetX * 120;

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-orb login-orb-1" />
        <div className="login-orb login-orb-2" />
        <div className="login-orb login-orb-3" />
      </div>

      <div className="login-card" ref={cardRef}>
        {/* Mascot sitting on top border of the card */}
        <div
          className="mascot-on-border"
          style={{ transform: `translateX(${mascotTranslateX}px)` }}
        >
          <InteractiveMascot focusedField={focusedField} mousePos={mouseDir} />
        </div>

        <div className="login-header">
          <div className="login-logo">
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 6H12.5L20 19.5V6H25V26H19.5L12 12.5V26H7V6Z" fill="url(#paint0_linear_login)" />
              <path d="M11 26H21V29H11V26Z" fill="url(#paint1_linear_login)" />
              <defs>
                <linearGradient id="paint0_linear_login" x1="7" y1="6" x2="25" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#818CF8" />
                  <stop offset="1" stopColor="#C084FC" />
                </linearGradient>
                <linearGradient id="paint1_linear_login" x1="11" y1="26" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#C084FC" />
                  <stop offset="1" stopColor="#6366F1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to your NEDTECK account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">Email</label>
            <input
              id="login-email"
              type="email"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="you@company.com"
              autoComplete="email"
              {...emailRegister}
              onFocus={() => setFocusedField('email')}
              onBlur={(e) => {
                emailRegister.onBlur(e);
                setFocusedField(null);
              }}
            />
            {errors.email && (
              <span className="form-error">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">Password</label>
            <input
              id="login-password"
              type="password"
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              placeholder="••••••••"
              autoComplete="current-password"
              {...passwordRegister}
              onFocus={() => setFocusedField('password')}
              onBlur={(e) => {
                passwordRegister.onBlur(e);
                setFocusedField(null);
              }}
            />
            {errors.password && (
              <span className="form-error">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full btn-submit-glow"
            disabled={loading}
            id="login-submit"
          >
            {loading ? (
              <>
                <Loader size="sm" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign in</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
