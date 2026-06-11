import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  obtenerUsuarios,
  eliminarUsuario
} from '../../services/servicioUsuarios';

import FormularioUsuario from '../../components/usuarios/FormularioUsuario';
import ModalEliminarUsuario from '../../components/usuarios/ModalEliminarUsuario';
import FiltroUsuarios from '../../components/usuarios/FiltroUsuarios';
import TablaUsuarios from '../../components/usuarios/TablaUsuarios';

export default function ListadoUsuariosCurso() {

  const { tipo } = useParams();

  const [usuarios, setUsuarios] = useState([]);

  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);

  const [loading, setLoading] = useState(true);

  const [usuarioEliminar, setUsuarioEliminar] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, [tipo]);

  async function cargarUsuarios() {

    try {

      const data = await obtenerUsuarios();

      const rol =
        tipo === 'profesores'
          ? 'PROFESOR'
          : 'ALUMNO';

      const usuariosRol = data.filter(
        (usuario) => usuario.rol === rol
      );

      setUsuarios(usuariosRol);

      setUsuariosFiltrados(
        usuariosRol
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

  function filtrarUsuarios(texto) {

    const filtrados = usuarios.filter(
      (usuario) =>
        usuario.nombre
          .toLowerCase()
          .includes(
            texto.toLowerCase()
          )
    );

    setUsuariosFiltrados(
      filtrados
    );

  }

  async function confirmarEliminar() {

    if (!usuarioEliminar) return;

    try {

      await eliminarUsuario(
        usuarioEliminar.id
      );

      cargarUsuarios();

      setUsuarioEliminar(null);

    } catch (error) {

      console.error(
        'Error eliminando usuario:',
        error
      );

    }

  }

  if (loading) {

    return (
      <p>
        Cargando listado...
      </p>
    );

  }

  return (

    <div>

      <div className="mb-4">

        <h2 className="fw-bold">

          {tipo === 'profesores'
            ? 'Listado de Profesores'
            : 'Listado de Alumnos'}

        </h2>

        <p className="text-muted">
          Usuarios registrados en el sistema.
        </p>

      </div>

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-body">

          <FiltroUsuarios
            onBuscar={filtrarUsuarios}
          />

        </div>

      </div>

      <div className="card shadow-sm border-0">

        <div className="card-body p-0">

          <TablaUsuarios
            usuarios={usuariosFiltrados}
            onEliminar={(usuario) =>
              setUsuarioEliminar(usuario)
            }
          />

        </div>

      </div>

      <ModalEliminarUsuario
        usuario={usuarioEliminar}
        onClose={() =>
          setUsuarioEliminar(null)
        }
        onConfirmar={
          confirmarEliminar
        }
      />

    </div>

  );

}