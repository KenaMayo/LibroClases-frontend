import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = {
  teacher: [
    { path: '/dashboard',  icon: 'bi-house-fill',                  label: 'Inicio' },
    { path: '/academic',   icon: 'bi-journal-text',                label: 'Calificaciones' },
    { path: '/attendance', icon: 'bi-person-check-fill',           label: 'Asistencia' },
    { path: '/messages',   icon: 'bi-chat-left-text-fill',         label: 'Mensajes' },
  ],
  student: [
    { path: '/dashboard',  icon: 'bi-house-fill',                  label: 'Inicio' },
    { path: '/academic',   icon: 'bi-graph-up',                    label: 'Mis Notas' },
    { path: '/attendance', icon: 'bi-calendar-check-fill',         label: 'Mi Asistencia' },
    { path: '/messages',   icon: 'bi-chat-left-text-fill',         label: 'Mensajes' },
  ],
  admin: [
    { path: '/dashboard',  icon: 'bi-grid-1x2-fill',               label: 'Panel Admin' },
    { path: '/academic',   icon: 'bi-journal-text',                label: 'Académico' },
    { path: '/attendance', icon: 'bi-person-check-fill',           label: 'Asistencia' },
    { path: '/messages',   icon: 'bi-chat-left-text-fill',         label: 'Mensajes' },
    { path: '/reports',    icon: 'bi-file-earmark-bar-graph-fill', label: 'Reportes' },
  ],
  parent: [
    { path: '/dashboard',  icon: 'bi-house-fill',                  label: 'Inicio' },
    { path: '/academic',   icon: 'bi-graph-up',                    label: 'Notas del Alumno' },
    { path: '/attendance', icon: 'bi-calendar-check-fill',         label: 'Asistencia' },
    { path: '/messages',   icon: 'bi-chat-left-text-fill',         label: 'Mensajes' },
  ],
};

export default function Sidebar() {
  const { user } = useAuth();
  const items = NAV_ITEMS[user?.role] ?? NAV_ITEMS.student;

  return (
    <div className="d-flex flex-column h-100">
      {/* Brand */}
      <div className="px-3 pt-4 pb-3">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-book-half text-white fs-4"></i>
          <div>
            <div className="text-white fw-bold lh-sm" style={{ fontSize: '0.82rem' }}>
              Libro de Clases
            </div>
            <div className="text-white-50 lh-sm" style={{ fontSize: '0.68rem' }}>
              C.E. Bernardo O&apos;Higgins
            </div>
          </div>
        </div>
      </div>

      <hr className="border-secondary my-0 mx-3" />

      {/* Navigation */}
      <nav className="flex-grow-1 px-2 py-3">
        <ul className="nav flex-column gap-1 list-unstyled mb-0">
          {items.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 rounded px-3 py-2 ${
                    isActive
                      ? 'bg-white text-primary fw-semibold'
                      : 'text-white sidebar-link'
                  }`
                }
                style={{ fontSize: '0.875rem' }}
              >
                <i className={`bi ${item.icon}`}></i>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-3 pb-3">
        <small className="text-white-50" style={{ fontSize: '0.68rem' }}>
          v1.0.0 — Vista de demostración
        </small>
      </div>
    </div>
  );
}
