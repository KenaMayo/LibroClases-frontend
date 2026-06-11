import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { obtenerCursos } from '../../services/servicioCursos';
import { obtenerUsuarios } from '../../services/servicioUsuarios';
import { obtenerAsistencia } from '../../services/servicioAsistencia';

export default function PanelProfesor() {

  const { user } = useAuth();

  const [misCursos, setMisCursos] = useState([]);
  const [totalAlumnos, setTotalAlumnos] = useState(0);
  const [registrosHoy, setRegistrosHoy] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, [user]);

  async function cargarDatos() {

    try {

      const [cursos, usuarios, asistencia] = await Promise.all([
        obtenerCursos(),
        obtenerUsuarios(),
        obtenerAsistencia()
      ]);

      // Cursos donde el profesor coincide con el nombre del usuario
      const cursosProfe = cursos.filter(
        (c) => c.profesor === user?.nombre
      );

      setMisCursos(cursosProfe);

      // Total alumnos (rol ALUMNO)
      const alumnos = usuarios.filter((u) => u.rol === 'ALUMNO');
      setTotalAlumnos(alumnos.length);

      // Registros de asistencia de hoy
      const hoy = new Date().toISOString().split('T')[0];
      const hoyCount = asistencia.filter((a) => a.fecha === hoy).length;
      setRegistrosHoy(hoyCount);

    } catch (error) {

      console.error('Error cargando panel:', error);

    } finally {

      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="fw-bold mb-1">Panel del Profesor</h2>
      <p className="text-muted mb-4">Bienvenido, {user?.nombre}</p>

      {/* TARJETAS RESUMEN */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted small mb-1">Mis Cursos</p>
              <h3 className="fw-bold text-primary">{misCursos.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted small mb-1">Total Alumnos</p>
              <h3 className="fw-bold text-success">{totalAlumnos}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted small mb-1">Asistencias Hoy</p>
              <h3 className="fw-bold text-warning">{registrosHoy}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* ACCESOS RÁPIDOS */}
      <h5 className="fw-bold mb-3">Accesos rápidos</h5>
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <Link to="/app/profesor/asistencia" className="text-decoration-none">
            <div className="card border-0 shadow-sm h-100 p-3 text-center" style={{ cursor: 'pointer' }}>
              <div className="fs-1 mb-2">📋</div>
              <h6 className="fw-bold">Registrar Asistencia</h6>
              <p className="text-muted small mb-0">Registra la asistencia diaria de tus alumnos</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/app/profesor/notas" className="text-decoration-none">
            <div className="card border-0 shadow-sm h-100 p-3 text-center" style={{ cursor: 'pointer' }}>
              <div className="fs-1 mb-2">📝</div>
              <h6 className="fw-bold">Registrar Notas</h6>
              <p className="text-muted small mb-0">Ingresa calificaciones por asignatura</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/app/profesor/mensajes" className="text-decoration-none">
            <div className="card border-0 shadow-sm h-100 p-3 text-center" style={{ cursor: 'pointer' }}>
              <div className="fs-1 mb-2">💬</div>
              <h6 className="fw-bold">Mensajes</h6>
              <p className="text-muted small mb-0">Comunícate con apoderados y otros docentes</p>
            </div>
          </Link>
        </div>
      </div>

      {/* MIS CURSOS */}
      {misCursos.length > 0 && (
        <>
          <h5 className="fw-bold mb-3">Mis Cursos</h5>
          <div className="row g-3">
            {misCursos.map((curso) => (
              <div key={curso.id} className="col-md-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h6 className="fw-bold">{curso.nombre}</h6>
                    <p className="text-muted small mb-0">{curso.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
