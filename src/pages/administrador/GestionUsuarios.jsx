import { useEffect, useState } from 'react';

import CardGrupoUsuarios from '../../components/cursos/CardGrupoUsuarios';
import { obtenerUsuarios } from '../../services/servicioUsuarios';

export default function GestionUsuarios() {
  const [profesores, setProfesores] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  async function cargarUsuarios() {
    try {
      const usuarios = await obtenerUsuarios();

      setProfesores(
        usuarios.filter((usuario) => usuario.rol === 'PROFESOR')
      );

      setAlumnos(
        usuarios.filter((usuario) => usuario.rol === 'ALUMNO')
      );
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold">Gestión de Usuarios</h2>
        <p className="text-muted">
          Selecciona el tipo de usuario que deseas revisar.
        </p>
      </div>

      <div className="row g-4">
        <CardGrupoUsuarios
          titulo="Profesores"
          descripcion="Ver y administrar profesores registrados"
          cantidad={profesores.length}
          ruta="/app/admin/usuarios/profesores"
          color="primary"
        />

        <CardGrupoUsuarios
          titulo="Alumnos"
          descripcion="Ver y administrar alumnos registrados"
          cantidad={alumnos.length}
          ruta="/app/admin/usuarios/alumnos"
          color="success"
        />
      </div>
    </div>
  );
}