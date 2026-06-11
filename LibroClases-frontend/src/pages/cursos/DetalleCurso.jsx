import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { obtenerCursoPorId } from '../../services/servicioCursos';
import { obtenerUsuarios } from '../../services/servicioUsuarios';

export default function DetalleCurso() {
  const { id } = useParams();

  const [curso, setCurso] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDetalle();
  }, [id]);

  async function cargarDetalle() {
    try {
      const cursoData = await obtenerCursoPorId(id);
      const usuariosData = await obtenerUsuarios();

      setCurso(cursoData);

      setAlumnos(
        usuariosData.filter((usuario) => usuario.rol === 'ALUMNO')
      );
    } catch (error) {
      console.error('Error cargando detalle del curso:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Cargando detalle del curso...</p>;
  }

  if (!curso) {
    return <p>No se encontró el curso.</p>;
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold">{curso.nombre}</h2>

        <p className="text-muted">
          {curso.descripcion || 'Detalle del curso'}
        </p>

        <p>
          <strong>Profesor jefe:</strong>{' '}
          {curso.profesor || 'Sin profesor asignado'}
        </p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <p className="text-muted mb-1">Promedio general</p>
              <h3 className="fw-bold">--</h3>
              <small>Notas del curso</small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <p className="text-muted mb-1">Asistencia</p>
              <h3 className="fw-bold">--%</h3>
              <small>Promedio de asistencia</small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <p className="text-muted mb-1">Alumnos</p>
              <h3 className="fw-bold">{alumnos.length}</h3>
              <small>Alumnos asociados al curso</small>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-white">
          <h5 className="mb-0 fw-bold">Listado de alumnos</h5>
        </div>

        <div className="card-body p-0">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
              </tr>
            </thead>

            <tbody>
              {alumnos.map((alumno) => (
                <tr key={alumno.id}>
                  <td>{alumno.id}</td>
                  <td>{alumno.nombre}</td>
                  <td>{alumno.email}</td>
                  <td>{alumno.rol}</td>
                </tr>
              ))}

              {alumnos.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No hay alumnos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}