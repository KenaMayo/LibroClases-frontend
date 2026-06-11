import { useNavigate } from 'react-router-dom';

export default function CardCurso({
  curso,
  cantidadAlumnos = 0,
  onEditar
}) {
  const navigate = useNavigate();

  return (
    <div className="col-md-6 col-lg-4">
      <div className="card shadow-sm border-0 h-100">
        <div className="card-body">
          <h5 className="fw-bold mb-2">
            {curso.nombre}
          </h5>

          <p className="text-muted mb-3">
            {curso.descripcion || 'Sin descripción'}
          </p>

          <p className="mb-2">
            <strong>Profesor jefe:</strong>{' '}
            {curso.profesor || 'Sin profesor asignado'}
          </p>

          <hr />

          <div className="d-flex justify-content-between mb-3">
            <div>
              <small className="text-muted">Alumnos</small>
              <h4 className="mb-0">{cantidadAlumnos}</h4>
            </div>

            <div>
              <small className="text-muted">Rendimiento</small>
              <h4 className="mb-0">--</h4>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={onEditar}
            >
              Editar curso
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate(`/app/admin/cursos/${curso.id}`)}
            >
              Ver detalle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}