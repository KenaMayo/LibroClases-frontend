import { createContext, useContext, useState } from 'react';
import { USERS } from '../mockdata';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('ldc_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    const found = USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      // Never expose the password in memory or storage
      const { password: _omit, ...safeUser } = found;
      setUser(safeUser);
      sessionStorage.setItem('ldc_user', JSON.stringify(safeUser));
      return { success: true, user: safeUser };
    }
    return { success: false, error: 'Correo o contraseña incorrectos.' };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('ldc_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
