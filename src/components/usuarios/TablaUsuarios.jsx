export default function TablaUsuarios({ usuarios }) {

  return (
    <div className="table-responsive">

      <table className="table align-middle">

        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {usuarios.map((usuario) => (

            <tr key={usuario.id}>

              <td>{usuario.id}</td>

              <td>{usuario.nombre}</td>

              <td>{usuario.email}</td>

              <td>
                <span className="badge bg-primary">
                  {usuario.rol}
                </span>
              </td>

              <td>

                <button className="btn btn-warning btn-sm me-2">
                  Editar
                </button>

                <button className="btn btn-danger btn-sm">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}