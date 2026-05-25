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

  // CARGAR SESIÓN
  useEffect(() => {

    const storedUser =
      sessionStorage.getItem('ldc_user');

    const storedToken =
      sessionStorage.getItem('ldc_token');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      setToken(storedToken);
    }

  }, []);

  const login = async (
    email,
    password
  ) => {

    try {

      const API_URL =
        import.meta.env.VITE_API_URL;

      console.log('API URL:', API_URL);

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

      console.log('RESPONSE:', res);

      if (!res.ok) {

        return {
          success: false,
          error: 'Credenciales incorrectas'
        };
      }

      // TOKEN JWT
      const token = await res.text();

      console.log('TOKEN:', token);

      // GUARDAR TOKEN
      sessionStorage.setItem(
        'ldc_token',
        token
      );

      setToken(token);

      // PERFIL
      const profile = {

        email,

        rol:
          email === 'admin@colegio.com'
            ? 'ADMIN'
            : 'USUARIO'
      };

      // GUARDAR USUARIO
      sessionStorage.setItem(
        'ldc_user',
        JSON.stringify(profile)
      );

      setUser(profile);

      return {
        success: true,
        user: profile
      };

    } catch (error) {

      console.error(
        'ERROR LOGIN:',
        error
      );

      return {
        success: false,
        error: 'No se pudo conectar al servidor'
      };
    }
  };

  const logout = () => {

    setUser(null);

    setToken(null);

    sessionStorage.clear();
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

export function useAuth() {

  return useContext(AuthContext);
}