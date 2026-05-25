import { useEffect, useState } from 'react';

import CardGrupoUsuarios from '../../components/cursos/CardGrupoUsuarios';

import { obtenerUsuarios } from '../../services/servicioUsuarios';

export default function GestionCursos() {

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
        usuarios.filter(
          (usuario) => usuario.rol === 'PROFESOR'
        )
      );

      setAlumnos(
        usuarios.filter(
          (usuario) => usuario.rol === 'ALUMNO'
        )
      );

    } catch (error) {

      console.error('Error cargando usuarios:', error);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {
    return <p>Cargando cursos...</p>;
  }

  return (

    <div>

      <div className="mb-4">

        <h2 className="fw-bold">
          Gestión de Cursos
        </h2>

        <p className="text-muted">
          Selecciona el grupo que deseas administrar.
        </p>

      </div>

      <div className="row g-4">

        <CardGrupoUsuarios
          titulo="Profesores"
          descripcion="Administrar profesores del establecimiento"
          cantidad={profesores.length}
          ruta="/app/admin/cursos/profesores"
          color="primary"
        />

        <CardGrupoUsuarios
          titulo="Alumnos"
          descripcion="Administrar alumnos del establecimiento"
          cantidad={alumnos.length}
          ruta="/app/admin/cursos/alumnos"
          color="success"
        />

      </div>

    </div>

  );

}