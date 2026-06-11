import { Outlet } from 'react-router-dom';
import BarraLateralProfesor from './BarraLateralProfesor';
import { useAuth } from '../../context/AuthContext';

export default function LayoutProfesor() {

  const { user } = useAuth();

  return (
    <div className="d-flex">

      <BarraLateralProfesor />

      <div className="flex-grow-1 bg-light min-vh-100">

        {/* BARRA SUPERIOR */}
        <div className="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Sistema Académico</h5>
          <div className="text-muted">
            {user?.nombre || 'Profesor'}
          </div>
        </div>

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
