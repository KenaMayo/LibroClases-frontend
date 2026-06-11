import { Outlet } from 'react-router-dom';
import BarraLateralAdmin from './BarraLateralAdmin';
import BarraSuperior from './BarraSuperior';

export default function LayoutAdministrador() {

  return (
    <div className="d-flex">

      <BarraLateralAdmin />

      <div className="flex-grow-1 bg-light min-vh-100">

        <BarraSuperior />

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}