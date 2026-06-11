<<<<<<< HEAD:LibroClases-frontend/src/components/layout/BarraSuperior.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function BarraSuperior() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

=======
export default function BarraSuperior() {

>>>>>>> b073717c60e2fa5a37c88e8a127a1c021505a014:src/components/layout/BarraSuperior.jsx
  return (
    <div className="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center">

      <h5 className="fw-bold mb-0">
        Sistema Académico
      </h5>

<<<<<<< HEAD:LibroClases-frontend/src/components/layout/BarraSuperior.jsx
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
=======
      <div>
        Administrador
      </div>
    </div>
  );
}
>>>>>>> b073717c60e2fa5a37c88e8a127a1c021505a014:src/components/layout/BarraSuperior.jsx
