import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const SIDEBAR_WIDTH = 240;

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>

      {/* ── Desktop sidebar ── */}
      <aside
        className="d-none d-md-flex flex-column flex-shrink-0"
        style={{ width: SIDEBAR_WIDTH, backgroundColor: '#002855', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}
      >
        <Sidebar />
      </aside>

      {/* ── Mobile sidebar overlay ── */}
      {mobileOpen && (
        <>
          <div
            className="position-fixed top-0 start-0 h-100 d-flex flex-column d-md-none"
            style={{ width: SIDEBAR_WIDTH, backgroundColor: '#002855', zIndex: 1055, overflowY: 'auto' }}
          >
            {/* Close button */}
            <div className="d-flex justify-content-end p-2">
              <button
                className="btn btn-sm text-white"
                onClick={() => setMobileOpen(false)}
                aria-label="Cerrar menú"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <Sidebar />
          </div>

          {/* Backdrop */}
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-md-none"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
            onClick={() => setMobileOpen(false)}
          />
        </>
      )}

      {/* ── Main area ── */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        <Navbar onMobileToggle={() => setMobileOpen(true)} />

        <main
          className="flex-grow-1 overflow-auto p-3 p-md-4"
          style={{ backgroundColor: '#f4f6f9' }}
        >
          <Outlet />
        </main>

        <footer
          className="py-2 px-4 border-top bg-white text-muted text-center"
          style={{ fontSize: '0.72rem', flexShrink: 0 }}
        >
          © 2026 Colegio Bernardo O&apos;Higgins — Sistema de Libro de Clases Digital
        </footer>
      </div>
    </div>
  );
}
