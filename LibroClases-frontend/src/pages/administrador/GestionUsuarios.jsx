import { useEffect, useState } from 'react';

import CardGrupoUsuarios from '../../components/cursos/CardGrupoUsuarios';

import {
  obtenerUsuarios,
  crearUsuario
} from '../../services/servicioUsuarios';

export default function GestionUsuarios() {

  const [profesores, setProfesores] = useState([]);

  const [alumnos, setAlumnos] = useState([]);

  const [loading, setLoading] = useState(true);

  const [nombre, setNombre] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [rol, setRol] = useState('');

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

      console.error(
        'Error cargando usuarios:',
        error
      );

    } finally {

      setLoading(false);

    }

  }

  async function guardarUsuario(e) {

    e.preventDefault();

    if (
      !nombre ||
      !email ||
      !password ||
      !rol
    ) {

      alert(
        'Completa todos los campos'
      );

      return;
    }

    try {

      const nuevoUsuario = {
        nombre,
        email,
        password,
        rol,
      };

      await crearUsuario(
        nuevoUsuario
      );

      setNombre('');

      setEmail('');

      setPassword('');

      setRol('');

      cargarUsuarios();

      alert(
        'Usuario creado correctamente'
      );

    } catch (error) {

      console.error(
        'Error creando usuario:',
        error
      );

      alert(
        'No se pudo crear el usuario'
      );

    }

  }

  if (loading) {

    return (
      <p>
        Cargando usuarios...
      </p>
    );

  }

  return (

    <div>

      <div className="mb-4">

        <h2 className="fw-bold">
          Gestión de Usuarios
        </h2>

        <p className="text-muted">
          Crea usuarios y revisa
          profesores o alumnos registrados.
        </p>

      </div>

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-header bg-white">

          <h5 className="mb-0 fw-bold">
            Nuevo usuario
          </h5>

        </div>

        <div className="card-body">

          <form onSubmit={guardarUsuario}>

            <div className="row g-3">

              <div className="col-md-3">

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
                  placeholder="Ej: Camila Pérez"
                />

              </div>

              <div className="col-md-3">

                <label className="form-label">
                  Correo
                </label>

                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="correo@colegio.com"
                />

              </div>

              <div className="col-md-3">

                <label className="form-label">
                  Contraseña
                </label>

                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="1234"
                />

              </div>

              <div className="col-md-3">

                <label className="form-label">
                  Rol
                </label>

                <select
                  className="form-select"
                  value={rol}
                  onChange={(e) =>
                    setRol(e.target.value)
                  }
                >

                  <option value="">
                    Seleccionar rol
                  </option>

                  <option value="ADMIN">
                    Administrador
                  </option>

                  <option value="PROFESOR">
                    Profesor
                  </option>

                  <option value="ALUMNO">
                    Alumno
                  </option>

                  <option value="APODERADO">
                    Apoderado
                  </option>

                </select>

              </div>

            </div>

            <button
              type="submit"
              className="btn btn-primary mt-3"
            >

              Guardar usuario

            </button>

          </form>

        </div>

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