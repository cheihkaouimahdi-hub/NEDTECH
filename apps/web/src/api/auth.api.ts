import api from './axios';
import type { LoginCredentials, LoginResponse } from '../features/auth/types';

export const authApi = {
  login(credentials: LoginCredentials): Promise<LoginResponse> {
    return api.post<LoginResponse>('/auth/login', credentials).then((res) => res.data);
  },
};
