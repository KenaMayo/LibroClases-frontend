import { useEffect, useState } from 'react';

export default function ModalEditarCurso({
  curso,
  profesores,
  alumnos,
  alumnosAsignados,
  onCerrar,
  onGuardar,
}) {
  const [profesor, setProfesor] = useState('');
  const [alumnosSeleccionados, setAlumnosSeleccionados] = useState([]);

  useEffect(() => {
    if (curso) {
      setProfesor(curso.profesor || '');
      setAlumnosSeleccionados(alumnosAsignados || []);
    }
  }, [curso, alumnosAsignados]);

  if (!curso) {
    return null;
  }

  function cambiarAlumno(idAlumno) {
    if (alumnosSeleccionados.includes(idAlumno)) {
      setAlumnosSeleccionados(
        alumnosSeleccionados.filter((id) => id !== idAlumno)
      );
    } else {
      setAlumnosSeleccionados([
        ...alumnosSeleccionados,
        idAlumno,
      ]);
    }
  }

  function guardarCambios() {
    const cursoActualizado = {
      ...curso,
      profesor,
    };

    onGuardar(cursoActualizado, alumnosSeleccionados);
  }

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Editar curso: {curso.nombre}
            </h5>

            <button
              type="button"
              className="btn-close"
              onClick={onCerrar}
            />
          </div>

          <div className="modal-body">
            <div className="mb-4">
              <label className="form-label">
                Profesor jefe
              </label>

              <select
                className="form-select"
                value={profesor}
                onChange={(e) => setProfesor(e.target.value)}
              >
                <option value="">
                  Seleccionar profesor
                </option>

                {profesores.map((profesor) => (
                  <option
                    key={profesor.id}
                    value={profesor.nombre}
                  >
                    {profesor.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h6 className="fw-bold">
                Alumnos del curso
              </h6>

              <p className="text-muted">
                Marca o desmarca alumnos para asignarlos al curso.
              </p>

              <div className="row g-2">
                {alumnos.map((alumno) => (
                  <div className="col-md-6" key={alumno.id}>
                    <div className="form-check border rounded p-2 ps-5">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={alumnosSeleccionados.includes(alumno.id)}
                        onChange={() => cambiarAlumno(alumno.id)}
                        id={`alumno-${alumno.id}`}
                      />

                      <label
                        className="form-check-label"
                        htmlFor={`alumno-${alumno.id}`}
                      >
                        {alumno.nombre}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCerrar}
            >
              Cancelar
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={guardarCambios}
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}