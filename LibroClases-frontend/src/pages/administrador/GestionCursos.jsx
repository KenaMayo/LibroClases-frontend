import { useEffect, useState } from 'react';

import CardCurso from '../../components/cursos/CardCurso';
import FormularioCurso from '../../components/cursos/FormularioCurso';
import ModalEditarCurso from '../../components/cursos/ModalEditarCurso';

import {
  obtenerCursos,
  crearCurso,
  actualizarCurso
} from '../../services/servicioCursos';

import { obtenerUsuarios } from '../../services/servicioUsuarios';

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
        usuariosData.filter((usuario) => usuario.rol === 'PROFESOR')
      );

      setAlumnos(
        usuariosData.filter((usuario) => usuario.rol === 'ALUMNO')
      );
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  }

  async function guardarCurso(nuevoCurso) {
    try {
      await crearCurso(nuevoCurso);
      await cargarDatos();

      alert('Curso creado correctamente');
    } catch (error) {
      console.error('Error creando curso:', error);
      alert('No se pudo crear el curso');
    }
  }

  async function guardarEdicionCurso(cursoActualizado, alumnosSeleccionados) {
    try {
      await actualizarCurso(cursoActualizado.id, cursoActualizado);

      setAlumnosPorCurso({
        ...alumnosPorCurso,
        [cursoActualizado.id]: alumnosSeleccionados,
      });

      setCursoSeleccionado(null);

      await cargarDatos();

      alert('Curso actualizado correctamente');
    } catch (error) {
      console.error('Error editando curso:', error);
      alert('No se pudo editar el curso');
    }
  }

  if (loading) {
    return <p>Cargando cursos...</p>;
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold">Gestión de Cursos</h2>

        <p className="text-muted">
          Revisa información general, rendimiento, profesor jefe y alumnos por curso.
        </p>
      </div>

      <FormularioCurso onGuardar={guardarCurso} />

      <div className="row g-4">
        {cursos.map((curso) => (
          <CardCurso
            key={curso.id}
            curso={curso}
            cantidadAlumnos={alumnosPorCurso[curso.id]?.length || 0}
            onEditar={() => setCursoSeleccionado(curso)}
          />
        ))}
      </div>

      <ModalEditarCurso
        curso={cursoSeleccionado}
        profesores={profesores}
        alumnos={alumnos}
        alumnosAsignados={
          cursoSeleccionado
            ? alumnosPorCurso[cursoSeleccionado.id] || []
            : []
        }
        onCerrar={() => setCursoSeleccionado(null)}
        onGuardar={guardarEdicionCurso}
      />
    </div>
  );
}