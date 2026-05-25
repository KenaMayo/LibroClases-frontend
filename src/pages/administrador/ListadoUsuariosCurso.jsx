import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { obtenerUsuarios } from '../../services/servicioUsuarios';

export default function ListadoUsuariosCurso() {
  const { tipo } = useParams();

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarUsuarios();
  }, [tipo]);

  async function cargarUsuarios() {
    try {
      const data = await obtenerUsuarios();

      const rol = tipo === 'profesores' ? 'PROFESOR' : 'ALUMNO';

      setUsuarios(
        data.filter((usuario) => usuario.rol === rol)
      );
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Cargando listado...</p>;
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold">
          {tipo === 'profesores' ? 'Listado de Profesores' : 'Listado de Alumnos'}
        </h2>

        <p className="text-muted">
          Usuarios registrados en el sistema.
        </p>
      </div>

      <div className="card shadow-sm border-0">
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
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.rol}</td>
                </tr>
              ))}

              {usuarios.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No hay usuarios disponibles.
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