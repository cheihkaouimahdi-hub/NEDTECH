export const storage = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      console.error(`Failed to set localStorage key "${key}"`);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      console.error(`Failed to remove localStorage key "${key}"`);
    }
  },
};

export const getUserRole = (): 'ADMIN' | 'EMPLOYEE' => {
  const token = storage.get('token');
  if (!token) {
    return 'EMPLOYEE';
  }
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return 'EMPLOYEE';
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    return payload.role || 'EMPLOYEE';
  } catch (e) {
    console.error('Failed to decode JWT token', e);
    return 'EMPLOYEE';
  }
};
