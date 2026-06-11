import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { obtenerUsuarios } from '../../services/servicioUsuarios';
import { obtenerAsignaturas } from '../../services/servicioAsignaturas';
import {
  obtenerNotas,
  crearNota,
  actualizarNota,
  eliminarNota
} from '../../services/servicioNotas';

// Mapeo: nombre de profesor (del email) -> nombre de asignatura
const MAPEO_PROFESOR_ASIGNATURA = {
  'matematicas': 'Matemáticas',
  'lenguaje': 'Lenguaje',
  'ingles': 'Inglés',
  'historia': 'Historia',
  'ciencias': 'Ciencias'
};

function obtenerAsignaturaMapeada(emailProfesor) {
  // Obtener la parte anterior a @ del email
  const prefijo = emailProfesor?.split('@')[0]?.toLowerCase() || '';
  // Buscar en el mapeo
  return MAPEO_PROFESOR_ASIGNATURA[prefijo] || null;
}

export default function RegistroNotas() {

  const { user } = useAuth();

  const [alumnos, setAlumnos] = useState([]);
  const [todasAsignaturas, setTodasAsignaturas] = useState([]);
  const [asignaturaMapeada, setAsignaturaMapeada] = useState(null);
  const [asignaturaDelProfesor, setAsignaturaDelProfesor] = useState(null);
  const [notas, setNotas] = useState([]);

  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState('');
  const [calificacion, setCalificacion] = useState('');

  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    // Obtener la asignatura mapeada desde el email del profesor
    const asignMapeada = obtenerAsignaturaMapeada(user?.email);
    setAsignaturaMapeada(asignMapeada);

    if (asignMapeada) {
      cargarDatos(asignMapeada);
    } else {
      setMensaje({
        tipo: 'danger',
        texto: 'No se pudo identificar tu asignatura. Contacta al administrador.'
      });
      setLoading(false);
    }
  }, [user]);

  async function cargarDatos(asignaturaNombre) {

    try {

      const [usuarios, asigns, notasData] = await Promise.all([
        obtenerUsuarios(),
        obtenerAsignaturas(),
        obtenerNotas()
      ]);

      setAlumnos(usuarios.filter((u) => u.rol === 'ALUMNO'));
      setTodasAsignaturas(asigns);

      // Encontrar la asignatura que enseña el profesor
      const asignFound = asigns.find(
        (a) => a.nombre === asignaturaNombre
      );

      if (asignFound) {
        setAsignaturaDelProfesor(asignFound);

        // Filtrar SOLO las notas de esta asignatura
        const notasDelProfesor = notasData.filter(
          (n) => n.asignaturaId === asignFound.id
        );

        setNotas(notasDelProfesor);
      }

    } catch (error) {

      console.error('Error cargando datos:', error);

    } finally {

      setLoading(false);
    }
  }

  function getNombreAlumno(id) {
    return alumnos.find((a) => a.id === id)?.nombre || `Alumno #${id}`;
  }

  function agruparNotasPorAlumno() {
    const agrupadas = {};
    notas.forEach((nota) => {
      if (!agrupadas[nota.alumnoId]) {
        agrupadas[nota.alumnoId] = [];
      }
      agrupadas[nota.alumnoId].push(nota);
    });
    return Object.keys(agrupadas)
      .sort((a, b) => getNombreAlumno(a).localeCompare(getNombreAlumno(b)))
      .map((alumnoId) => ({
        alumnoId: parseInt(alumnoId),
        notas: agrupadas[alumnoId].sort((a, b) => b.id - a.id)
      }));
  }

  function getNombreAsignatura(id) {
    return asignaturas.find((a) => a.id === id)?.nombre || `Asignatura #${id}`;
  }

  async function guardarNota(e) {

    e.preventDefault();

    if (!alumnoSeleccionado || calificacion === '') {
      setMensaje({ tipo: 'warning', texto: 'Completa todos los campos.' });
      return;
    }

    const valor = parseFloat(calificacion);

    if (isNaN(valor) || valor < 1 || valor > 7) {
      setMensaje({ tipo: 'warning', texto: 'La calificación debe estar entre 1.0 y 7.0.' });
      return;
    }

    setGuardando(true);
    setMensaje(null);

    try {

      const payload = {
        alumnoId: parseInt(alumnoSeleccionado),
        asignaturaId: asignaturaDelProfesor.id,
        calificacion: valor
      };

      if (editandoId) {

        await actualizarNota(editandoId, payload);
        setMensaje({ tipo: 'success', texto: 'Nota actualizada correctamente.' });

      } else {

        await crearNota(payload);
        setMensaje({ tipo: 'success', texto: 'Nota registrada correctamente.' });
      }

      limpiarFormulario();
      cargarDatos(asignaturaMapeada);

    } catch (error) {

      console.error('Error guardando nota:', error);
      setMensaje({ tipo: 'danger', texto: 'Error al guardar la nota.' });

    } finally {

      setGuardando(false);
    }
  }

  function limpiarFormulario() {
    setAlumnoSeleccionado('');
    setCalificacion('');
    setEditandoId(null);
  }

  function editarNota(nota) {
    setEditandoId(nota.id);
    setAlumnoSeleccionado(String(nota.alumnoId));
    setCalificacion(String(nota.calificacion));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function borrarNota(id) {

    if (!window.confirm('¿Eliminar esta nota?')) return;

    try {

      await eliminarNota(id);
      setMensaje({ tipo: 'success', texto: 'Nota eliminada.' });
      cargarDatos();

    } catch (error) {

      setMensaje({ tipo: 'danger', texto: 'Error al eliminar nota.' });
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!asignaturaDelProfesor) {
    return (
      <div>
        <h2 className="fw-bold mb-4">Registro de Notas</h2>
        <div className="alert alert-danger">
          No se pudo identificar tu asignatura. Por favor contacta al administrador.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="fw-bold mb-1">Registro de Notas</h2>
      <p className="text-muted mb-3">
        <strong>Asignatura:</strong> {asignaturaDelProfesor.nombre}
      </p>

      <div className="alert alert-info mb-3">
        <small>
          <strong>💡 Nota:</strong> Puedes registrar múltiples calificaciones por alumno en esta asignatura (evaluaciones parciales, finales, etc.).
        </small>
      </div>

      {/* FORMULARIO */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">
            {editandoId ? 'Editar Nota' : 'Nueva Nota'}
          </h5>

          {mensaje && (
            <div className={`alert alert-${mensaje.tipo}`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={guardarNota}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Alumno</label>
                <select
                  className="form-select"
                  value={alumnoSeleccionado}
                  onChange={(e) => setAlumnoSeleccionado(e.target.value)}
                  required
                >
                  <option value="">Selecciona alumno...</option>
                  {alumnos.map((a) => (
                    <option key={a.id} value={a.id}>{a.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Calificación (1.0 – 7.0)</label>
                <input
                  type="number"
                  className="form-control"
                  step="0.1"
                  min="1"
                  max="7"
                  placeholder="Ej: 5.5"
                  value={calificacion}
                  onChange={(e) => setCalificacion(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="d-flex gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={guardando}
              >
                {guardando ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Guardando...
                  </>
                ) : (
                  editandoId ? 'Actualizar Nota' : 'Registrar Nota'
                )}
              </button>

              {editandoId && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={limpiarFormulario}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* TABLA DE NOTAS */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white fw-bold">
          Notas registradas ({notas.length})
        </div>
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Alumno</th>
                <th>Calificaciones</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {notas.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-muted py-4">
                    No hay notas registradas en {asignaturaDelProfesor.nombre}.
                  </td>
                </tr>
              ) : (
                agruparNotasPorAlumno().map((grupo) => (
                  <tr key={`alumno-${grupo.alumnoId}`}>
                    <td className="align-middle fw-semibold">
                      {getNombreAlumno(grupo.alumnoId)}
                    </td>
                    <td className="align-middle">
                      <div className="d-flex flex-wrap gap-2">
                        {grupo.notas.map((nota) => (
                          <div key={nota.id} className="dropdown" style={{ display: 'inline-block' }}>
                            <span
                              className={`badge fs-6 ${nota.calificacion >= 4 ? 'bg-success' : 'bg-danger'}`}
                              style={{ cursor: 'pointer' }}
                              data-bs-toggle="dropdown"
                              role="button"
                              title="Click para opciones"
                            >
                              {nota.calificacion?.toFixed(1)}
                            </span>
                            <ul className="dropdown-menu dropdown-menu-sm">
                              <li>
                                <button
                                  type="button"
                                  className="dropdown-item"
                                  onClick={() => editarNota(nota)}
                                >
                                  Editar
                                </button>
                              </li>
                              <li>
                                <hr className="dropdown-divider" />
                              </li>
                              <li>
                                <button
                                  type="button"
                                  className="dropdown-item text-danger"
                                  onClick={() => borrarNota(nota.id)}
                                >
                                  Eliminar
                                </button>
                              </li>
                            </ul>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="text-end align-middle">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          setAlumnoSeleccionado(String(grupo.alumnoId));
                          setCalificacion('');
                          setEditandoId(null);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        + Agregar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
