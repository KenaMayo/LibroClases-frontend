import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RutaRol({ roles, children }) {

  const { user } = useAuth();

  const storedUser = sessionStorage.getItem('ldc_user');
  const usuarioActual = user || (storedUser ? JSON.parse(storedUser) : null);

  if (!usuarioActual) {
    return <Navigate to="/" replace />;
  }

  if (!roles.includes(usuarioActual.rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
