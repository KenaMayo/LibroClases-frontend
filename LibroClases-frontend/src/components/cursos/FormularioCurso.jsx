import { useState } from 'react';

export default function FormularioCurso({
  onGuardar
}) {

  const [nombre, setNombre] = useState('');

  const [descripcion, setDescripcion] = useState('');

  const [profesor, setProfesor] = useState('');

  async function handleSubmit(e) {

    e.preventDefault();

    if (
      !nombre ||
      !descripcion ||
      !profesor
    ) {

      alert(
        'Completa todos los campos'
      );

      return;
    }

    const nuevoCurso = {
      nombre,
      descripcion,
      profesor,
    };

    await onGuardar(
      nuevoCurso
    );

    setNombre('');

    setDescripcion('');

    setProfesor('');

  }

  return (

    <div className="card shadow-sm border-0 mb-4">

      <div className="card-header bg-white">

        <h5 className="mb-0 fw-bold">
          Nuevo curso
        </h5>

      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          <div className="row g-3">

            <div className="col-md-4">

              <label className="form-label">
                Nombre
              </label>

              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) =>
                  setNombre(e.target.value)
                }
                placeholder="Ej: 1° Medio A"
              />

            </div>

            <div className="col-md-4">

              <label className="form-label">
                Descripción
              </label>

              <input
                type="text"
                className="form-control"
                value={descripcion}
                onChange={(e) =>
                  setDescripcion(e.target.value)
                }
                placeholder="Curso primero medio"
              />

            </div>

            <div className="col-md-4">

              <label className="form-label">
                Profesor jefe
              </label>

              <input
                type="text"
                className="form-control"
                value={profesor}
                onChange={(e) =>
                  setProfesor(e.target.value)
                }
                placeholder="Nombre profesor"
              />

            </div>

          </div>

          <button
            type="submit"
            className="btn btn-primary mt-3"
          >

            Guardar curso

          </button>

        </form>

      </div>

    </div>

  );

}