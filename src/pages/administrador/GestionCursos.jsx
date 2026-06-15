import { useEffect, useState } from 'react';

import CardCurso from '../../components/cursos/CardCurso';
import FormularioCurso from '../../components/cursos/FormularioCurso';
import ModalEditarCurso from '../../components/cursos/ModalEditarCurso';

import {
  obtenerCursos,
  crearCurso,
  actualizarCurso
} from '../../services/servicioCursos';

import {
  obtenerUsuarios,
  actualizarUsuario,
  obtenerUsuariosPorCurso
} from '../../services/servicioUsuarios';

export default function GestionCursos() {

  const [cursos, setCursos] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [alumnos, setAlumnos] = useState([]);

  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

  const [alumnosPorCurso, setAlumnosPorCurso] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {

    try {

      const cursosData = await obtenerCursos();

      const usuariosData = await obtenerUsuarios();

      setCursos(cursosData);

      setProfesores(
        usuariosData.filter(
          (u) => u.rol === 'PROFESOR'
        )
      );

      setAlumnos(
        usuariosData.filter(
          (u) => u.rol === 'ALUMNO'
        )
      );

    } catch (error) {

      console.error(
        'Error cargando datos:',
        error
      );

    } finally {

      setLoading(false);

    }
  }

  async function guardarCurso(
    nuevoCurso
  ) {

    try {

      await crearCurso(
        nuevoCurso
      );

      await cargarDatos();

      alert(
        'Curso creado correctamente'
      );

    } catch (error) {

      console.error(error);

      alert(
        'No se pudo crear el curso'
      );
    }
  }

  async function guardarEdicionCurso(
    cursoActualizado,
    alumnosSeleccionados
  ) {

    try {

      await actualizarCurso(
        cursoActualizado.id,
        cursoActualizado
      );

      const alumnosCursoActual =
        await obtenerUsuariosPorCurso(
          cursoActualizado.id
        );

      // Quitar alumnos que ya no pertenecen
      for (const alumno of alumnosCursoActual) {

        if (
          !alumnosSeleccionados.includes(
            alumno.id
          )
        ) {

          await actualizarUsuario(
            alumno.id,
            {
              ...alumno,
              cursoId: null
            }
          );
        }
      }

      // Asignar alumnos seleccionados
      for (const idAlumno of alumnosSeleccionados) {

        const alumno = alumnos.find(
          (a) => a.id === idAlumno
        );

        if (alumno) {

          await actualizarUsuario(
            alumno.id,
            {
              ...alumno,
              cursoId:
                cursoActualizado.id
            }
          );
        }
      }

      setCursoSeleccionado(null);

      await cargarDatos();

      alert(
        'Curso actualizado correctamente'
      );

    } catch (error) {

      console.error(error);

      alert(
        'No se pudo actualizar el curso'
      );
    }
  }

  async function abrirCurso(
    curso
  ) {

    try {

      const alumnosCurso =
        await obtenerUsuariosPorCurso(
          curso.id
        );

      setAlumnosPorCurso(
        (prev) => ({
          ...prev,
          [curso.id]:
            alumnosCurso.map(
              (a) => a.id
            )
        })
      );

      setCursoSeleccionado(
        curso
      );

    } catch (error) {

      console.error(
        'Error obteniendo alumnos:',
        error
      );
    }
  }

  if (loading) {

    return (
      <p>
        Cargando cursos...
      </p>
    );
  }

  return (
    <div>

      <div className="mb-4">

        <h2 className="fw-bold">
          Gestión de Cursos
        </h2>

        <p className="text-muted">
          Revisa información general,
          rendimiento, profesor jefe y
          alumnos por curso.
        </p>

      </div>

      <FormularioCurso
        onGuardar={guardarCurso}
      />

      <div className="row g-4">

        {cursos.map((curso) => (

          <CardCurso
            key={curso.id}
            curso={curso}
            cantidadAlumnos={
              alumnosPorCurso[
                curso.id
              ]?.length || 0
            }
            onEditar={() =>
              abrirCurso(curso)
            }
          />

        ))}

      </div>

      <ModalEditarCurso
        curso={cursoSeleccionado}
        profesores={profesores}
        alumnos={alumnos}
        alumnosAsignados={
          cursoSeleccionado
            ? alumnosPorCurso[
                cursoSeleccionado.id
              ] || []
            : []
        }
        onCerrar={() =>
          setCursoSeleccionado(
            null
          )
        }
        onGuardar={
          guardarEdicionCurso
        }
      />

    </div>
  );
}