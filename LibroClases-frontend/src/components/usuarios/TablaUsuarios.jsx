export default function TablaUsuarios({

  usuarios,
  onEditar,
  onEliminar

}) {

  return (

    <table className="table">

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

        {usuarios.map((u) => (

          <tr key={u.id}>

            <td>{u.id}</td>

            <td>{u.nombre}</td>

            <td>{u.email}</td>

            <td>{u.rol}</td>

            <td>

              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() =>
                  onEditar(u)
                }
              >
                Editar
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                  onEliminar(u)
                }
              >
                Eliminar
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}