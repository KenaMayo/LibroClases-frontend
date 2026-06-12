import {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

const AuthContext = createContext(null);

// Función para decodificar JWT
function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decodificando token:', error);
    return null;
  }
}

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  // =========================
  // CARGAR SESIÓN
  // =========================

  useEffect(() => {

    const storedToken =
      sessionStorage.getItem('ldc_token');

    const storedUser =
      sessionStorage.getItem('ldc_user');

    if (storedToken && storedUser) {

      setToken(storedToken);

      setUser(JSON.parse(storedUser));

    } else if (storedToken) {
      // Si solo hay token, decodificar y restaurar usuario
      const decoded = decodeToken(storedToken);
      if (decoded) {
        setToken(storedToken);
        const userProfile = {
          email: decoded.sub || decoded.email,
          rol: decoded.rol || decoded.role,
          id: decoded.id
        };
        setUser(userProfile);
      }
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

      console.log(
        'TOKEN:',
        token
      );

      // =========================
      // DECODIFICAR TOKEN
      // =========================

      const decoded = decodeToken(token);
      
      if (!decoded) {
        return {
          success: false,
          error: 'Token inválido'
        };
      }

      console.log('DECODED TOKEN:', decoded);

      // =========================
      // GUARDAR TOKEN
      // =========================

      sessionStorage.setItem(
        'ldc_token',
        token
      );

      setToken(token);

      // =========================
      // CREAR PERFIL CON ROL DECODIFICADO
      // =========================

      const profile = {

        email: decoded.sub || email,

        rol: decoded.rol || decoded.role || 'USUARIO',
        
        id: decoded.id
      };

      console.log('PROFILE:', profile);

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
  // LOGOUT - LIMPIEZA COMPLETA
  // =========================

  const logout = () => {

    // Limpiar estado
    setUser(null);
    setToken(null);

    // Limpiar sessionStorage completamente
    sessionStorage.removeItem('ldc_token');
    sessionStorage.removeItem('ldc_user');
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