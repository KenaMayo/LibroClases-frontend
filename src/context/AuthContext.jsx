import { createContext, useContext, useState } from 'react';
import { USERS } from '../mockdata';

const AuthContext = createContext(null);

function decodeJwtPayload(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('ldc_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => sessionStorage.getItem('ldc_token') ?? null);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        return { success: false, error: 'Correo o contraseña incorrectos.' };
      }

      const jwt = await res.text();
      const payload = decodeJwtPayload(jwt);
      const authenticatedEmail = payload?.sub ?? email;

      // Enrich profile from mockdata until /auth/me is available in the backend
      const found = USERS.find((u) => u.email === authenticatedEmail);
      const profile = found
        ? (({ password: _pw, ...safe }) => safe)(found)
        : {
            email: authenticatedEmail,
            name: authenticatedEmail,
            role: 'student',
            initials: authenticatedEmail.slice(0, 2).toUpperCase(),
          };

      sessionStorage.setItem('ldc_token', jwt);
      sessionStorage.setItem('ldc_user', JSON.stringify(profile));
      setToken(jwt);
      setUser(profile);
      return { success: true, user: profile };
    } catch {
      return { success: false, error: 'No se pudo conectar con el servidor.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('ldc_user');
    sessionStorage.removeItem('ldc_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
