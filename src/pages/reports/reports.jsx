import { useAuth } from '../../context/AuthContext';
import { COURSES, GRADES, ATTENDANCE_RECORDS, MESSAGES, STUDENTS } from '../../mockdata';

function avg(nums) {
  if (!nums.length) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function GradeDistBar({ grades }) {
  const ranges = [
    { label: '7.0',       min: 7.0,  max: 7.01, cls: 'bg-primary' },
    { label: '6.0–6.9',   min: 6.0,  max: 6.99, cls: 'bg-success' },
    { label: '5.0–5.9',   min: 5.0,  max: 5.99, cls: 'bg-info text-dark' },
    { label: '4.0–4.9',   min: 4.0,  max: 4.99, cls: 'bg-warning text-dark' },
    { label: 'Bajo 4.0',  min: 0,    max: 3.99, cls: 'bg-danger' },
  ];
  const total = grades.length || 1;

  return (
    <ul className="list-unstyled mb-0">
      {ranges.map((r) => {
        const count = grades.filter((g) => g.grade >= r.min && g.grade <= r.max).length;
        const pct   = Math.round((count / total) * 100);
        return (
          <li key={r.label} className="mb-2">
            <div className="d-flex justify-content-between small mb-1">
              <span>{r.label}</span>
              <span className="text-muted">{count} nota{count !== 1 ? 's' : ''} ({pct}%)</span>
            </div>
            <div className="progress" style={{ height: 10 }}>
              <div
                className={`progress-bar ${r.cls}`}
                role="progressbar"
                style={{ width: `${pct}%` }}
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default function ReportsPage() {
  const { user } = useAuth();
  if (!user) return null;

  if (user.role !== 'admin') {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '40vh' }}>
        <i className="bi bi-shield-lock-fill text-muted mb-3" style={{ fontSize: '3rem' }}></i>
        <h5 className="text-muted">Acceso restringido</h5>
        <p className="text-muted small">Esta sección es solo para administradores del sistema.</p>
      </div>
    );
  }

  const totalStudents    = COURSES.reduce((s, c) => s + c.studentCount, 0);
  const totalMessages    = MESSAGES.length;
  const totalAttendance  = ATTENDANCE_RECORDS.length;
  const allGrades        = GRADES;
  const overallAvg       = avg(allGrades.map((g) => g.grade));

  // Attendance % per course (mock: using available records)
  const attendancePct = Math.round(
    (ATTENDANCE_RECORDS.filter((r) => r.status === 'present').length / (ATTENDANCE_RECORDS.length || 1)) * 100,
  );

  const stats = [
    { icon: 'bi-people-fill',               label: 'Total estudiantes',     value: totalStudents,                     color: '#002855' },
    { icon: 'bi-person-workspace',           label: 'Total docentes',        value: 8,                                 color: '#0d6efd' },
    { icon: 'bi-journal-text',               label: 'Cursos activos',        value: COURSES.length,                    color: '#198754' },
    { icon: 'bi-graph-up',                   label: 'Promedio institucional', value: overallAvg?.toFixed(1) ?? '—',    color: '#fd7e14' },
    { icon: 'bi-person-check-fill',          label: 'Asistencia promedio',   value: `${attendancePct}%`,               color: '#0dcaf0' },
    { icon: 'bi-chat-left-text-fill',        label: 'Mensajes enviados',     value: totalMessages,                     color: '#6f42c1' },
    { icon: 'bi-file-earmark-bar-graph-fill', label: 'Calificaciones reg.',  value: allGrades.length,                  color: '#20c997' },
    { icon: 'bi-calendar-check-fill',        label: 'Registros asistencia',  value: totalAttendance,                   color: '#e83e8c' },
  ];

  return (
    <>
      <div className="mb-4">
        <h4 className="fw-bold mb-0" style={{ color: '#002855' }}>Reportes del Sistema</h4>
        <p className="text-muted small mb-0">Panel de administración · C.E. Bernardo O'Higgins · Mayo 2026</p>
      </div>

      {/* Stats grid */}
      <div className="row g-3 mb-4">
        {stats.map((s) => (
          <div className="col-6 col-xl-3" key={s.label}>
            <div className="card border-0 shadow-sm h-100" style={{ borderLeft: `4px solid ${s.color}` }}>
              <div className="card-body d-flex align-items-center gap-3 py-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                  style={{ width: 44, height: 44, backgroundColor: s.color + '22' }}
                >
                  <i className={`bi ${s.icon}`} style={{ fontSize: '1.2rem', color: s.color }}></i>
                </div>
                <div>
                  <div className="text-muted" style={{ fontSize: '0.78rem' }}>{s.label}</div>
                  <div className="fw-bold fs-5 lh-sm">{s.value}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-4">
        {/* Courses table */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white py-3">
              <h6 className="fw-semibold mb-0"><i className="bi bi-journal-text me-2 text-primary"></i>Resumen por Curso</h6>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 small">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-3">Curso</th>
                      <th>Nivel</th>
                      <th>Prof. Jefe</th>
                      <th className="text-center">Est.</th>
                      <th className="text-center">Promedio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COURSES.map((c) => {
                      const courseStudentIds = STUDENTS
                        .filter((s) => s.courseId === c.id)
                        .map((s) => s.id);
                      const courseGrades = GRADES.filter((g) =>
                        courseStudentIds.includes(g.studentId),
                      );
                      const courseAvg = avg(courseGrades.map((g) => g.grade));
                      return (
                        <tr key={c.id}>
                          <td className="ps-3 fw-semibold">{c.name}</td>
                          <td>{c.level}</td>
                          <td>{c.tutorName}</td>
                          <td className="text-center">
                            <span className="badge bg-primary rounded-pill">{c.studentCount}</span>
                          </td>
                          <td className="text-center">
                            {courseAvg !== null ? (
                              <span className={`badge rounded-pill bg-${courseAvg < 4 ? 'danger' : courseAvg < 5 ? 'warning' : 'success'}`}>
                                {courseAvg.toFixed(1)}
                              </span>
                            ) : <span className="text-muted">—</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Grade distribution */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white py-3">
              <h6 className="fw-semibold mb-0"><i className="bi bi-bar-chart-fill me-2 text-success"></i>Distribución de Calificaciones</h6>
            </div>
            <div className="card-body">
              <GradeDistBar grades={allGrades} />
              <hr className="my-3" />
              <div className="d-flex justify-content-between small text-muted">
                <span>Total evaluaciones: <strong>{allGrades.length}</strong></span>
                <span>Promedio: <strong>{overallAvg?.toFixed(1)}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance summary */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h6 className="fw-semibold mb-0"><i className="bi bi-person-check-fill me-2 text-info"></i>Resumen de Asistencia — 4°A</h6>
          <span className="badge bg-secondary">{ATTENDANCE_RECORDS.length} registros</span>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {[
              { status: 'present',   label: 'Presentes',    cls: 'bg-success' },
              { status: 'absent',    label: 'Ausentes',     cls: 'bg-danger' },
              { status: 'late',      label: 'Atrasados',    cls: 'bg-warning text-dark' },
              { status: 'justified', label: 'Justificados', cls: 'bg-info text-dark' },
            ].map((s) => {
              const cnt = ATTENDANCE_RECORDS.filter((r) => r.status === s.status).length;
              const pct = Math.round((cnt / (ATTENDANCE_RECORDS.length || 1)) * 100);
              return (
                <div className="col-6 col-md-3" key={s.status}>
                  <div className="card border-0 bg-light text-center py-3">
                    <span className={`badge ${s.cls} fs-5 mb-1`}>{cnt}</span>
                    <div className="small fw-semibold">{s.label}</div>
                    <div className="small text-muted">{pct}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Export buttons */}
      <div className="card border-0 shadow-sm">
        <div className="card-body d-flex gap-2 flex-wrap py-3">
          <span className="text-muted small align-self-center me-2">
            <i className="bi bi-download me-1"></i>Exportar reportes:
          </span>
          {['Notas por curso', 'Asistencia mensual', 'Anotaciones', 'Informe general'].map((r) => (
            <button
              key={r}
              className="btn btn-sm btn-outline-secondary"
              onClick={() => alert(`Exportación de "${r}" disponible en la versión con backend.`)}
            >
              <i className="bi bi-file-earmark-arrow-down me-1"></i>{r}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
