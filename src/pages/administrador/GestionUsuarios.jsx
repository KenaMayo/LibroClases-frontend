import {
  useEffect,
  useState
} from 'react';

import TablaUsuarios
from '../../components/usuarios/TablaUsuarios';

import FormularioUsuario
from '../../components/usuarios/FormularioUsuario';

import ModalEliminarUsuario
from '../../components/usuarios/ModalEliminarUsuario';

import FiltroUsuarios
from '../../components/usuarios/FiltroUsuarios';

import {

  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario

} from '../../services/servicioUsuarios';

export default function GestionUsuarios() {

  const [usuarios, setUsuarios] =
    useState([]);

  const [usuariosFiltrados,
    setUsuariosFiltrados] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [usuarioActual,
    setUsuarioActual] =
    useState(null);

  const [mostrarModal,
    setMostrarModal] =
    useState(false);

  useEffect(() => {

    cargarUsuarios();

  }, []);

  async function cargarUsuarios() {

    try {

      const data =
        await obtenerUsuarios();

      setUsuarios(data);

      setUsuariosFiltrados(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  // =========================
  // CREAR / ACTUALIZAR
  // =========================

  async function guardarUsuario(
    usuario
  ) {

    try {

      if (usuario.id) {

        await actualizarUsuario(
          usuario.id,
          usuario
        );

      } else {

        await crearUsuario(
          usuario
        );
      }

      setUsuarioActual(null);

      cargarUsuarios();

    } catch (error) {

      console.log(error);
    }
  }

  // =========================
  // ELIMINAR
  // =========================

  async function confirmarEliminar() {

    try {

      await eliminarUsuario(
        usuarioActual.id
      );

      setMostrarModal(false);

      setUsuarioActual(null);

      cargarUsuarios();

    } catch (error) {

      console.log(error);
    }
  }

  // =========================
  // FILTRAR
  // =========================

  function filtrarUsuarios(texto) {

    const filtrados =
      usuarios.filter((u) =>

        u.nombre
          .toLowerCase()
          .includes(
            texto.toLowerCase()
          )
      );

    setUsuariosFiltrados(
      filtrados
    );
  }

  return (

    <div>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            Gestión Usuarios
          </h2>

          <p className="text-muted">
            Administración completa
          </p>

        </div>

      </div>

      {/* FILTRO */}

      <FiltroUsuarios
        onFiltrar={
          filtrarUsuarios
        }
      />

      {/* FORM */}

      <FormularioUsuario
        usuario={usuarioActual}
        onGuardar={guardarUsuario}
      />

      {/* TABLA */}

      {loading ? (

        <div>
          Cargando usuarios...
        </div>

      ) : (

        <TablaUsuarios
          usuarios={
            usuariosFiltrados
          }

          onEditar={(u) =>
            setUsuarioActual(u)
          }

          onEliminar={(u) => {

            setUsuarioActual(u);

            setMostrarModal(true);
          }}
        />
      )}

      {/* MODAL */}

      <ModalEliminarUsuario
        visible={mostrarModal}

        usuario={usuarioActual}

        onCancelar={() =>
          setMostrarModal(false)
        }

        onConfirmar={
          confirmarEliminar
        }
      />

    </div>
  );
}