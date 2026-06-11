import { useEffect, useState } from 'react';

import TarjetaResumen from '../../components/dashboard/TarjetaResumen';
import TablaActividad from '../../components/dashboard/TablaActividad';

import { obtenerUsuarios } from '../../services/servicioUsuarios';

export default function PanelAdministrador() {
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalAlumnos, setTotalAlumnos] = useState(0);
  const [totalProfesores, setTotalProfesores] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  async function cargarUsuarios() {
    try {
      const usuarios = await obtenerUsuarios();

      setTotalUsuarios(usuarios.length);

      setTotalAlumnos(
        usuarios.filter((usuario) => usuario.rol === 'ALUMNO').length
      );

      setTotalProfesores(
        usuarios.filter((usuario) => usuario.rol === 'PROFESOR').length
      );
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Cargando dashboard...</p>;
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold">Panel Administrador</h2>
        <p className="text-muted">Bienvenido al sistema académico</p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <TarjetaResumen titulo="Usuarios" valor={totalUsuarios} color="primary" />
        </div>

        <div className="col-md-3">
          <TarjetaResumen titulo="Cursos" valor={5} color="success" />
        </div>

        <div className="col-md-3">
          <TarjetaResumen titulo="Profesores" valor={totalProfesores} color="warning" />
        </div>

        <div className="col-md-3">
          <TarjetaResumen titulo="Alumnos" valor={totalAlumnos} color="danger" />
        </div>
      </div>

      <TablaActividad />
    </div>
  );
}