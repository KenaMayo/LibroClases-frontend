import {
  useEffect,
  useState
} from 'react';

export default function FormularioUsuario({

  usuario,
  onGuardar

}) {

  const [form, setForm] =
    useState({

      nombre: '',
      email: '',
      password: '',
      rol: 'ALUMNO'
    });

  useEffect(() => {

    if (usuario) {

      setForm(usuario);
    }

  }, [usuario]);

  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value
    });
  }

  function handleSubmit(e) {

    e.preventDefault();

    onGuardar(form);

    setForm({

      nombre: '',
      email: '',
      password: '',
      rol: 'ALUMNO'
    });
  }

  return (

    <form
      className="card p-4 mb-4"
      onSubmit={handleSubmit}
    >

      <div className="row g-3">

        <div className="col-md-3">

          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">

          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">

          <input
            type="text"
            name="password"
            className="form-control"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">

          <select
            name="rol"
            className="form-select"
            value={form.rol}
            onChange={handleChange}
          >

            <option value="ADMIN">
              ADMIN
            </option>

            <option value="PROFESOR">
              PROFESOR
            </option>

            <option value="ALUMNO">
              ALUMNO
            </option>

          </select>

        </div>

        <div className="col-md-2">

          <button
            className="btn btn-primary w-100"
          >

            {usuario
              ? 'Actualizar'
              : 'Crear'}

          </button>

        </div>

      </div>

    </form>
  );
}