import { useEffect, useState } from 'react';

import { obtenerUsuarios } from '../../services/servicioUsuarios';
import { obtenerCursos } from '../../services/servicioCursos';
import { obtenerAsignaturas } from '../../services/servicioAsignaturas';

export default function GestionAsignaturas() {
  const [cursos, setCursos] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [asignaturas, setAsignaturas] = useState([]);

  const [asignaciones, setAsignaciones] = useState([]);

  const [asignaturaId, setAsignaturaId] = useState('');
  const [cursoId, setCursoId] = useState('');
  const [profesorId, setProfesorId] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
      const usuariosData = await obtenerUsuarios();
      const cursosData = await obtenerCursos();
      const asignaturasData = await obtenerAsignaturas();

      setProfesores(
        usuariosData.filter((usuario) => usuario.rol === 'PROFESOR')
      );

      setCursos(cursosData);
      setAsignaturas(asignaturasData);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  }

  function guardarAsignacion(e) {
    e.preventDefault();

    if (!asignaturaId || !cursoId || !profesorId) {
      alert('Completa todos los campos');
      return;
    }

    const asignatura = asignaturas.find(
      (item) => item.id === Number(asignaturaId)
    );

    const curso = cursos.find(
      (item) => item.id === Number(cursoId)
    );

    const profesor = profesores.find(
      (item) => item.id === Number(profesorId)
    );

    const nuevaAsignacion = {
      id: Date.now(),
      asignatura,
      curso,
      profesor,
    };

    setAsignaciones([...asignaciones, nuevaAsignacion]);

    setAsignaturaId('');
    setCursoId('');
    setProfesorId('');
  }

  if (loading) {
    return <p>Cargando asignaturas...</p>;
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold">Gestión de Asignaturas</h2>
        <p className="text-muted">
          Asigna una asignatura existente a un curso y profesor.
        </p>
      </div>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">Nueva asignación</h5>
        </div>

        <div className="card-body">
          <form onSubmit={guardarAsignacion}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Asignatura</label>
                <select
                  className="form-select"
                  value={asignaturaId}
                  onChange={(e) => setAsignaturaId(e.target.value)}
                >
                  <option value="">Seleccionar asignatura</option>

                  {asignaturas.map((asignatura) => (
                    <option key={asignatura.id} value={asignatura.id}>
                      {asignatura.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Curso</label>
                <select
                  className="form-select"
                  value={cursoId}
                  onChange={(e) => setCursoId(e.target.value)}
                >
                  <option value="">Seleccionar curso</option>

                  {cursos.map((curso) => (
                    <option key={curso.id} value={curso.id}>
                      {curso.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Profesor a cargo</label>
                <select
                  className="form-select"
                  value={profesorId}
                  onChange={(e) => setProfesorId(e.target.value)}
                >
                  <option value="">Seleccionar profesor</option>

                  {profesores.map((profesor) => (
                    <option key={profesor.id} value={profesor.id}>
                      {profesor.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Guardar asignación
            </button>
          </form>
        </div>
      </div>

      {cursos.map((curso) => {
        const asignacionesCurso = asignaciones.filter(
          (item) => item.curso.id === curso.id
        );

        return (
          <div className="card shadow-sm border-0 mb-4" key={curso.id}>
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">{curso.nombre}</h5>
              <small>{curso.descripcion}</small>
            </div>

            <div className="card-body">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Asignatura</th>
                    <th>Profesor a cargo</th>
                  </tr>
                </thead>

                <tbody>
                  {asignacionesCurso.map((item) => (
                    <tr key={item.id}>
                      <td>{item.asignatura.nombre}</td>
                      <td>{item.profesor.nombre}</td>
                    </tr>
                  ))}

                  {asignacionesCurso.length === 0 && (
                    <tr>
                      <td colSpan="2" className="text-center text-muted">
                        No hay asignaturas asignadas a este curso.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}