import {
  createContext,
  useContext,
  useState
} from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {

    try {

      const saved =
        sessionStorage.getItem('ldc_user');

      return saved
        ? JSON.parse(saved)
        : null;

    } catch {

      return null;
    }
  });

  const [token, setToken] = useState(() =>
    sessionStorage.getItem('ldc_token') ?? null
  );

  const login = async (email, password) => {

    try {

      const API_URL =
        import.meta.env.VITE_API_URL;

      const res = await fetch(
        `${API_URL}/auth/login`,
        {

          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!res.ok) {

        return {
          success: false,
          error: 'Correo o contraseña incorrectos.',
        };
      }

      const data = await res.json();

      // TOKEN
      if (data.token) {

        sessionStorage.setItem(
          'ldc_token',
          data.token
        );

        setToken(data.token);
      }

      // USER
      const profile = data.user || {

        email,

        nombre: email,

        rol:
          email === 'admin@colegio.com'
            ? 'ADMIN'
            : 'USUARIO',
      };

      sessionStorage.setItem(
        'ldc_user',
        JSON.stringify(profile)
      );

      setUser(profile);

      return {
        success: true,
        user: profile,
      };

    } catch {

      return {
        success: false,
        error:
          'No se pudo conectar con el servidor.',
      };
    }
  };

  const logout = () => {

    setUser(null);

    setToken(null);

    sessionStorage.removeItem('ldc_user');

    sessionStorage.removeItem('ldc_token');
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {

  const ctx = useContext(AuthContext);

  if (!ctx) {

    throw new Error(
      'useAuth must be used within <AuthProvider>'
    );
  }

  return ctx;
}