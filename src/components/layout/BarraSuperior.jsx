import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function BarraSuperior() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    // Pequeño delay para asegurar limpieza completa del estado
    setTimeout(() => {
      navigate('/');
      window.location.reload(); // Forzar recarga para limpiar caché
    }, 100);
  }

  return (
    <div className="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center">
      <h5 className="fw-bold mb-0">
        Sistema Académico
      </h5>

      <div className="d-flex align-items-center gap-3">
        <span className="text-muted">
          {user?.nombre || 'Administrador'}
        </span>

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}