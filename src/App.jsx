import {
  HashRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import RutaProtegida from './routes/RutaProtegida';

import LayoutAdministrador from './components/layout/LayoutAdministrador';

import LoginPage from './pages/login/login';

import PanelAdministrador from './pages/administrador/PanelAdministrador';
import GestionUsuarios from './pages/administrador/GestionUsuarios';

export default function App() {

  return (

    <AuthProvider>

      <HashRouter>

        <Routes>

          <Route
            path="/"
            element={<LoginPage />}
          />

          <Route
            path="/app/admin"
            element={
              <RutaProtegida>
                <LayoutAdministrador />
              </RutaProtegida>
            }
          >

            <Route
              path="panel"
              element={<PanelAdministrador />}
            />

            <Route
              path="usuarios"
              element={<GestionUsuarios />}
            />

          </Route>

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>

      </HashRouter>

    </AuthProvider>
  );
}