export default function TablaActividad() {

  const actividades = [
    {
      usuario: 'Juan Pérez',
      accion: 'Creó curso',
      fecha: '24/05/2026'
    },
    {
      usuario: 'María Soto',
      accion: 'Subió notas',
      fecha: '24/05/2026'
    }
  ];

  return (
    <div className="card border-0 shadow-sm">

      <div className="card-body">

        <h5 className="fw-bold mb-4">
          Actividad reciente
        </h5>

        <table className="table align-middle">

          <thead>
            <tr>
              <th>Usuario</th>
              <th>Acción</th>
              <th>Fecha</th>
            </tr>
          </thead>

          <tbody>

            {actividades.map((item, index) => (

              <tr key={index}>
                <td>{item.usuario}</td>
                <td>{item.accion}</td>
                <td>{item.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}