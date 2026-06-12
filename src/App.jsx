import {
  HashRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import RutaProtegida from './routes/RutaProtegida';
import RutaRol from './routes/RutaRol';
import LayoutAdministrador from './components/layout/LayoutAdministrador';
import LayoutProfesor from './components/layout/LayoutProfesor';

import LoginPage from './pages/login/login';

import PanelAdministrador from './pages/administrador/PanelAdministrador';
import GestionUsuarios from './pages/administrador/GestionUsuarios';
import GestionCursos from './pages/administrador/GestionCursos';
import GestionAsignaturas from './pages/administrador/GestionAsignaturas';
import ListadoUsuariosCurso from './pages/administrador/ListadoUsuariosCurso';
import Reportes from './pages/administrador/Reportes';
import DetalleCurso from './pages/cursos/DetalleCurso';

import PanelProfesor from './pages/teacher/PanelProfesor';
import RegistroAsistencia from './pages/teacher/RegistroAsistencia';
import RegistroNotas from './pages/teacher/RegistroNotas';
import MensajesProfesor from './pages/teacher/MensajesProfesor';

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginPage />}
          />

          {/* RUTAS ADMIN */}
          <Route
            path="/app/admin"
            element={
              <RutaProtegida>
                <RutaRol roles={['ADMIN']}>
                  <LayoutAdministrador />
                </RutaRol>
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

          {/* RUTAS PROFESOR/DOCENTE */}
          <Route
            path="/app/teacher"
            element={
              <RutaProtegida>
                <RutaRol rolesPermitidos={['PROFESOR', 'DOCENTE']}>
                  <LayoutProfesor />
                </RutaRol>
              </RutaProtegida>
            }
          >
            <Route
              path="panel"
              element={<div>Panel Profesor</div>}
            />
          </Route>

          <Route
            path="/app/teacher"
            element={
              <RutaProtegida>
                <RutaRol roles={['PROFESOR']}>
                  <LayoutProfesor />
                </RutaRol>
              </RutaProtegida>
            }
          >
            <Route
              path="panel"
              element={<PanelProfesor />}
            />

            <Route
              path="asistencia"
              element={<RegistroAsistencia />}
            />

            <Route
              path="notas"
              element={<RegistroNotas />}
            />

            <Route
              path="mensajes"
              element={<MensajesProfesor />}
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