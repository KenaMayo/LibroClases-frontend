<<<<<<< HEAD:LibroClases-frontend/src/components/layout/BarraLateralAdmin.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function BarraLateralAdmin() {

  const { logout } = useAuth();
  const navigate = useNavigate();

=======
import { NavLink } from 'react-router-dom';

export default function BarraLateralAdmin() {
>>>>>>> b073717c60e2fa5a37c88e8a127a1c021505a014:src/components/layout/BarraLateralAdmin.jsx
  const menu = [
    {
      nombre: 'Panel Principal',
      ruta: '/app/admin/panel'
    },
    {
      nombre: 'Usuarios',
      ruta: '/app/admin/usuarios'
    },
    {
      nombre: 'Cursos',
      ruta: '/app/admin/cursos'
    },
    {
      nombre: 'Asignaturas',
      ruta: '/app/admin/asignaturas'
    },
    {
      nombre: 'Reportes',
      ruta: '/app/admin/reportes'
<<<<<<< HEAD:LibroClases-frontend/src/components/layout/BarraLateralAdmin.jsx
    },
    {
      nombre: 'Mensajes',
      ruta: '/app/admin/mensajes'
    }
  ];

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div
      className="bg-dark text-white p-3 d-flex flex-column"
=======
    }
  ];

  return (
    <div
      className="bg-dark text-white p-3"
>>>>>>> b073717c60e2fa5a37c88e8a127a1c021505a014:src/components/layout/BarraLateralAdmin.jsx
      style={{
        width: '250px',
        minHeight: '100vh'
      }}
    >
      <h3 className="fw-bold mb-4">
        LibroClases
      </h3>

<<<<<<< HEAD:LibroClases-frontend/src/components/layout/BarraLateralAdmin.jsx
      <ul className="nav flex-column gap-2 flex-grow-1">
=======
      <ul className="nav flex-column gap-2">
>>>>>>> b073717c60e2fa5a37c88e8a127a1c021505a014:src/components/layout/BarraLateralAdmin.jsx
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
<<<<<<< HEAD:LibroClases-frontend/src/components/layout/BarraLateralAdmin.jsx

      <button
        className="btn btn-outline-light mt-3 w-100"
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
=======
>>>>>>> b073717c60e2fa5a37c88e8a127a1c021505a014:src/components/layout/BarraLateralAdmin.jsx
    </div>
  );
}