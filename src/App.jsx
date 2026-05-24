import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import MainLayout from './components/layout/MainLayout';

import LoginPage from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import Academic from './pages/academic/academic';
import Attendance from './pages/attendance/attendance';
import Messages from './pages/messages/messages';
import Reports from './pages/reports/reports';

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* LOGIN COMO PAGINA PRINCIPAL */}
          <Route path="/" element={<LoginPage />} />

          {/* RUTAS PROTEGIDAS */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/app/dashboard" replace />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="academic" element={<Academic />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="messages" element={<Messages />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          {/* REDIRECCION */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}