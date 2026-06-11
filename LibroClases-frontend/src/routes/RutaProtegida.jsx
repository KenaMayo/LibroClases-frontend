import { Navigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export default function RutaProtegida({ children }) {

  const { user } = useAuth();

  const storedUser =
    sessionStorage.getItem('ldc_user');

  return user || storedUser
    ? children
    : <Navigate to="/" replace />;
}