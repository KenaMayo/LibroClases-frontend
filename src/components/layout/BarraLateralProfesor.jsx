import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function BarraLateralProfesor() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const menu = [
    { nombre: 'Panel', ruta: '/app/teacher/panel' },
    { nombre: 'Asistencia', ruta: '/app/teacher/asistencia' },
    { nombre: 'Notas', ruta: '/app/teacher/notas' },
    { nombre: 'Mensajes', ruta: '/app/teacher/mensajes' }
  ];

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div
      className="bg-dark text-white p-3 d-flex flex-column"
      style={{ width: '250px', minHeight: '100vh' }}
    >
      <h3 className="fw-bold mb-4">
        LibroClases
      </h3>

      <ul className="nav flex-column gap-2 flex-grow-1">
        {menu.map((item) => (
          <li key={item.ruta}>
            <NavLink
              to={item.ruta}
              className={({ isActive }) =>
                isActive
                  ? 'nav-link text-white bg-primary rounded'
                  : 'nav-link text-white'
              }
            >
              {item.nombre}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        className="btn btn-outline-light mt-3 w-100"
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
