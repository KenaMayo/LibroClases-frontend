import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout   from './components/layout/MainLayout';
import LoginPage    from './pages/login/login';
import Dashboard    from './pages/dashboard/dashboard';
import Academic     from './pages/academic/academic';
import Attendance   from './pages/attendance/attendance';
import Messages     from './pages/messages/messages';
import Reports      from './pages/reports/reports';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard"  element={<Dashboard  />} />
            <Route path="academic"   element={<Academic   />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="messages"   element={<Messages   />} />
            <Route path="reports"    element={<Reports    />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

