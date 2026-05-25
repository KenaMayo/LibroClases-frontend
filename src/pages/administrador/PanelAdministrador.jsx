import TarjetaResumen from '../../components/dashboard/TarjetaResumen';
import TablaActividad from '../../components/dashboard/TablaActividad';

export default function PanelAdministrador() {

  return (
    <div>

      <div className="mb-4">

        <h2 className="fw-bold">
          Panel Administrador
        </h2>

        <p className="text-muted">
          Bienvenido al sistema académico
        </p>
      </div>

      <div className="row g-4 mb-4">

        <div className="col-md-3">
          <TarjetaResumen
            titulo="Usuarios"
            valor="120"
            color="primary"
          />
        </div>

        <div className="col-md-3">
          <TarjetaResumen
            titulo="Cursos"
            valor="12"
            color="success"
          />
        </div>

        <div className="col-md-3">
          <TarjetaResumen
            titulo="Profesores"
            valor="25"
            color="warning"
          />
        </div>

        <div className="col-md-3">
          <TarjetaResumen
            titulo="Asistencia"
            valor="92%"
            color="danger"
          />
        </div>
      </div>

      <TablaActividad />
    </div>
  );
}