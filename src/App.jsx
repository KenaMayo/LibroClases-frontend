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
import GestionCursos from './pages/administrador/GestionCursos';
import GestionAsignaturas from './pages/administrador/GestionAsignaturas';
import ListadoUsuariosCurso from './pages/administrador/ListadoUsuariosCurso';
import Reportes from './pages/administrador/Reportes';
import DetalleCurso from './pages/cursos/DetalleCurso';

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

            <Route
              path="usuarios/:tipo"
              element={<ListadoUsuariosCurso />}
            />

            <Route
              path="cursos"
              element={<GestionCursos />}
            />

            <Route
              path="cursos/:id"
              element={<DetalleCurso />}
            />

            <Route
              path="asignaturas"
              element={<GestionAsignaturas />}
            />

            <Route
              path="reportes"
              element={<Reportes />}
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