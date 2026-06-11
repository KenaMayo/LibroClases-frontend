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

  // =========================
  // CARGAR SESIÓN
  // =========================

  useEffect(() => {

    const storedUser =
      sessionStorage.getItem('ldc_user');

    const storedToken =
      sessionStorage.getItem('ldc_token');

    if (storedUser) {

      setUser(
        JSON.parse(storedUser)
      );
    }

    if (storedToken) {

      setToken(storedToken);
    }

  }, []);

  // =========================
  // LOGIN
  // =========================

  const login = async (
    email,
    password
  ) => {

    try {

      const API_URL =
        import.meta.env.VITE_API_URL;

      console.log(
        'API URL:',
        API_URL
      );

      const res = await fetch(
        `${API_URL}/auth/login`,
        {
          method: 'POST',

          headers: {

            'Content-Type':
              'application/json',

            // IMPORTANTE NGROK
            'ngrok-skip-browser-warning':
              'true'
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      console.log(
        'RESPONSE:',
        res
      );

      if (!res.ok) {

        return {
          success: false,
          error:
            'Credenciales incorrectas'
        };
      }

      // =========================
      // TOKEN JWT
      // =========================

      const token =
        await res.text();

      // =========================
      // GUARDAR TOKEN
      // =========================

      sessionStorage.setItem(
        'ldc_token',
        token
      );

      setToken(token);

      // =========================
      // OBTENER PERFIL REAL
      // =========================

      let profile = { email, rol: 'USUARIO', nombre: email };

      try {

        const usuariosRes = await fetch(
          `${API_URL}/usuarios`,
          {
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true'
            }
          }
        );

        if (usuariosRes.ok) {

          const usuarios = await usuariosRes.json();

          const found = usuarios.find(
            (u) => u.email === email
          );

          if (found) {

            profile = {
              id: found.id,
              nombre: found.nombre,
              email: found.email,
              rol: found.rol
            };
          }
        }

      } catch (profileError) {

        console.warn('No se pudo obtener perfil:', profileError);
      }

      // =========================
      // GUARDAR USUARIO
      // =========================

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
        error:
          'No se pudo conectar al servidor'
      };
    }
  };

  // =========================
  // LOGOUT
  // =========================

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

// =========================
// HOOK
// =========================

export function useAuth() {

  return useContext(
    AuthContext
  );
}