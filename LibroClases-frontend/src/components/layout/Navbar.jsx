import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ROLE_CONFIG = {
  teacher: { label: 'Docente',       bg: 'bg-success' },
  student: { label: 'Estudiante',    bg: 'bg-info text-dark' },
  admin:   { label: 'Administrador', bg: 'bg-danger' },
  parent:  { label: 'Apoderado',     bg: 'bg-warning text-dark' },
};

export default function Navbar({ onMobileToggle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const role = ROLE_CONFIG[user?.role] ?? { label: 'Usuario', bg: 'bg-secondary' };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      className="d-flex align-items-center px-3 border-bottom bg-white"
      style={{ minHeight: 60, flexShrink: 0 }}
    >
      {/* Mobile toggle */}
      <button
        className="btn btn-sm btn-outline-secondary d-md-none me-2"
        onClick={onMobileToggle}
        aria-label="Abrir menú"
      >
        <i className="bi bi-list fs-5"></i>
      </button>

      {/* Page brand on mobile */}
      <span className="fw-semibold d-md-none text-truncate" style={{ maxWidth: 160 }}>
        Libro de Clases
      </span>

      <div className="flex-grow-1"></div>

      {/* Role badge */}
      <span className={`badge ${role.bg} me-2 d-none d-sm-inline`}>
        {role.label}
      </span>

      {/* User name */}
      <span className="text-muted small me-3 d-none d-lg-inline text-truncate" style={{ maxWidth: 180 }}>
        {user?.name}
      </span>

      {/* Avatar */}
      <div
        className="d-flex align-items-center justify-content-center rounded-circle text-white fw-bold me-3 flex-shrink-0"
        style={{ width: 36, height: 36, backgroundColor: '#002855', fontSize: '0.75rem' }}
        title={user?.name}
      >
        {user?.initials ?? user?.name?.substring(0, 2).toUpperCase()}
      </div>

      {/* Logout */}
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={handleLogout}
        title="Cerrar sesión"
      >
        <i className="bi bi-box-arrow-right"></i>
        <span className="ms-1 d-none d-md-inline">Salir</span>
      </button>
    </nav>
  );
}
