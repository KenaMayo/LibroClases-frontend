import {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  useEffect(() => {

    const storedUser = sessionStorage.getItem('ldc_user');
    const storedToken = sessionStorage.getItem('ldc_token');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      setToken(storedToken);
    }

  }, []);

  const login = async (email, password) => {

    try {

      const API_URL = import.meta.env.VITE_API_URL;

      const headers = {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      };

      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        return { success: false, error: 'Credenciales incorrectas' };
      }

      const jwt = await res.text();

      sessionStorage.setItem('ldc_token', jwt);
      setToken(jwt);

      const usuariosRes = await fetch(`${API_URL}/usuarios`, { headers });

      if (!usuariosRes.ok) {
        return { success: false, error: 'No se pudo obtener el perfil del usuario' };
      }

      const usuarios = await usuariosRes.json();
      const encontrado = usuarios.find(
        (u) => u.email?.toLowerCase() === email.toLowerCase()
      );

      if (!encontrado) {
        return { success: false, error: 'Usuario no encontrado' };
      }

      const profile = {
        id: encontrado.id,
        nombre: encontrado.nombre,
        email: encontrado.email,
        rol: encontrado.rol,
      };

      sessionStorage.setItem('ldc_user', JSON.stringify(profile));
      setUser(profile);

      return { success: true, user: profile };

    } catch (error) {

      console.error('Error en login:', error);

      return { success: false, error: 'No se pudo conectar al servidor' };
    }
  };

  const logout = () => {

    setUser(null);
    setToken(null);
    sessionStorage.removeItem('ldc_token');
    sessionStorage.removeItem('ldc_user');
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// =========================
// HOOK
// =========================

export function useAuth() {

  return useContext(
    AuthContext
  );
}