import { useNavigate } from 'react-router-dom';

export default function CardGrupoUsuarios({ titulo, descripcion, cantidad, ruta, color }) {
  const navigate = useNavigate();

  return (
    <div className="col-md-6">
      <div
        className="card shadow-sm border-0 h-100"
        style={{ cursor: 'pointer' }}
        onClick={() => navigate(ruta)}
      >
        <div className={`card-body border-start border-4 border-${color}`}>
          <h4 className="fw-bold">{titulo}</h4>

          <p className="text-muted">
            {descripcion}
          </p>

          <h2 className={`text-${color}`}>
            {cantidad}
          </h2>

          <p className="mb-0">
            Ver listado
          </p>
        </div>
      </div>
    </div>
  );
}