import { NavLink } from 'react-router-dom';

export default function BarraLateralAdmin() {
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
    }
  ];

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: '250px',
        minHeight: '100vh'
      }}
    >
      <h3 className="fw-bold mb-4">
        LibroClases
      </h3>

      <ul className="nav flex-column gap-2">
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
    </div>
  );
}