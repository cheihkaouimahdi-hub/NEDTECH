import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authApi } from '../../../api/auth.api';
import { storage } from '../../../utils/storage';
import { STORAGE_KEYS } from '../../../utils/constants';
import type { LoginCredentials } from '../types';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const data = await authApi.login(credentials);
      storage.set(STORAGE_KEYS.TOKEN, data.access_token);
      toast.success('Login successful');
      navigate('/home');
    } catch {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    storage.remove(STORAGE_KEYS.TOKEN);
    navigate('/login');
  };

  return { login, logout, loading };
}
