import {
  createContext,
  useContext,
  useState
} from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const login = async (
    email,
    password
  ) => {

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
          success:false,
          error:'Credenciales incorrectas'
        };
      }

      const data = await res.json();

      if (data.token) {

        sessionStorage.setItem(
          'ldc_token',
          data.token
        );

        setToken(data.token);
      }

      const profile = data.user || {

        email,

        rol:
          email === 'admin@colegio.com'
            ? 'ADMIN'
            : 'USUARIO'
      };

      sessionStorage.setItem(
        'ldc_user',
        JSON.stringify(profile)
      );

      setUser(profile);

      return {
        success:true,
        user:profile
      };

    } catch {

      return {
        success:false,
        error:'No se pudo conectar al servidor'
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

export function useAuth(){

  return useContext(AuthContext);
}