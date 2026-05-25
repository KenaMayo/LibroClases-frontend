import { useNavigate } from 'react-router-dom';

export default function CardCurso({ curso }) {
  const navigate = useNavigate();

  return (
    <div className="col-md-6 col-lg-4">
      <div
        className="card shadow-sm border-0 h-100"
        style={{ cursor: 'pointer' }}
        onClick={() => navigate(`/app/admin/cursos/${curso.id}`)}
      >
        <div className="card-body">
          <h5 className="fw-bold mb-2">{curso.nombre}</h5>

          <p className="text-muted mb-3">
            {curso.descripcion || 'Sin descripción'}
          </p>

          <div className="mb-2">
            <strong>Profesor jefe:</strong>
            <p className="mb-0">
              {curso.profesor || 'Sin profesor asignado'}
            </p>
          </div>

          <hr />

          <div className="d-flex justify-content-between">
            <div>
              <small className="text-muted">Alumnos</small>
              <h4 className="mb-0">--</h4>
            </div>

            <div>
              <small className="text-muted">Rendimiento</small>
              <h4 className="mb-0">--</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}