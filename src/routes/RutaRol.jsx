import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RutaRol({ 
  children, 
  rolesPermitidos = [] 
}) {

  const { user } = useAuth();

  const storedUser = sessionStorage.getItem('ldc_user');

  let currentUser = user;
  
  if (!currentUser && storedUser) {
    currentUser = JSON.parse(storedUser);
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  // Convertir el rol a mayúsculas para comparación
  const userRole = currentUser.rol?.toUpperCase();
  const rolesValidos = rolesPermitidos.map(r => r.toUpperCase());

  // Si no hay roles permitidos específicos, permitir cualquier usuario autenticado
  if (rolesValidos.length === 0) {
    return children;
  }

  // Verificar si el rol del usuario está en los roles permitidos
  if (!rolesValidos.includes(userRole)) {
    console.warn(`Acceso denegado: usuario con rol "${userRole}" no autorizado para acceder a esta ruta`);
    return <Navigate to="/app/admin/panel" replace />;
  }

  return children;
}
