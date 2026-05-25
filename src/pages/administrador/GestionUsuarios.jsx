import { useEffect, useState } from 'react';

import TablaUsuarios from '../../components/usuarios/TablaUsuarios';

import {
  obtenerUsuarios
} from '../../services/servicioUsuarios';

export default function GestionUsuarios() {

  const [usuarios, setUsuarios] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  async function cargarUsuarios() {

    try {

      const data = await obtenerUsuarios();

      setUsuarios(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);
    }
  }

  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            Gestión Usuarios
          </h2>

          <p className="text-muted mb-0">
            Administración de usuarios
          </p>
        </div>

        <button className="btn btn-primary">
          Nuevo Usuario
        </button>
      </div>

      <div className="card border-0 shadow-sm">

        <div className="card-body">

          {loading ? (
            <div>
              Cargando usuarios...
            </div>
          ) : (
            <TablaUsuarios usuarios={usuarios} />
          )}
        </div>
      </div>
    </div>
  );
}