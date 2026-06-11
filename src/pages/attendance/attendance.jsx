import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ATTENDANCE_RECORDS, ANNOTATIONS, STUDENTS, SUBJECTS } from '../../mockdata';

// ── Status config ─────────────────────────────────────────────────────────────

const STATUS = {
  present:   { label: 'Presente',    cls: 'bg-success',           icon: 'bi-check-circle-fill' },
  absent:    { label: 'Ausente',     cls: 'bg-danger',            icon: 'bi-x-circle-fill' },
  late:      { label: 'Atrasado',    cls: 'bg-warning text-dark', icon: 'bi-clock-fill' },
  justified: { label: 'Justificado', cls: 'bg-info text-dark',    icon: 'bi-info-circle-fill' },
};

function StatusBadge({ status }) {
  const s = STATUS[status] ?? STATUS.present;
  return (
    <span className={`badge ${s.cls}`}>
      <i className={`bi ${s.icon} me-1`}></i>{s.label}
    </span>
  );
}

// ── Teacher View ──────────────────────────────────────────────────────────────

function TeacherAttendance() {
  const subjects = SUBJECTS.map((s) => s.name);

  const [date, setDate]         = useState('2026-05-19');
  const [subject, setSubject]   = useState('Matemáticas');
  const [tab, setTab]           = useState('register'); // 'register' | 'history' | 'annotations'
  const [register, setRegister] = useState(() =>
    STUDENTS.map((s) => ({ studentId: s.id, name: s.name, status: 'present', obs: '' })),
  );
  const [saved, setSaved]       = useState(false);
  const [annotations, setAnnotations] = useState(ANNOTATIONS);
  const [showAnnModal, setShowAnnModal] = useState(false);
  const [annForm, setAnnForm]   = useState({ studentId: '', type: 'positive', description: '' });

  const toggleStatus = (id, s) =>
    setRegister((prev) => prev.map((r) => (r.studentId === id ? { ...r, status: s } : r)));

  const counts = {
    present:   register.filter((r) => r.status === 'present').length,
    absent:    register.filter((r) => r.status === 'absent').length,
    late:      register.filter((r) => r.status === 'late').length,
    justified: register.filter((r) => r.status === 'justified').length,
  };
  const attendancePct = Math.round((counts.present / register.length) * 100);

  const handleSaveAttendance = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const handleSaveAnnotation = () => {
    if (!annForm.studentId || !annForm.description) return;
    const student = STUDENTS.find((s) => s.id === parseInt(annForm.studentId));
    const newAnn = {
      id: Math.max(0, ...annotations.map((a) => a.id)) + 1,
      studentId: parseInt(annForm.studentId),
      studentName: student?.name,
      type: annForm.type,
      description: annForm.description,
      date,
      teacher: 'Prof. María González',
      course: '4°A',
    };
    setAnnotations((prev) => [newAnn, ...prev]);
    setAnnForm({ studentId: '', type: 'positive', description: '' });
    setShowAnnModal(false);
  };

  const history = ATTENDANCE_RECORDS.filter((r) => r.subject === subject);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-0" style={{ color: '#002855' }}>Asistencia y Anotaciones</h4>
          <p className="text-muted small mb-0">Curso 4°A</p>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        {[
          { key: 'register',    label: 'Registrar asistencia', icon: 'bi-person-check-fill' },
          { key: 'history',     label: 'Historial',            icon: 'bi-clock-history' },
          { key: 'annotations', label: 'Anotaciones',          icon: 'bi-pencil-square' },
        ].map((t) => (
          <li className="nav-item" key={t.key}>
            <button
              className={`nav-link ${tab === t.key ? 'active fw-semibold' : 'text-muted'}`}
              onClick={() => setTab(t.key)}
            >
              <i className={`bi ${t.icon} me-1`}></i>{t.label}
            </button>
          </li>
        ))}
      </ul>

      {/* ── Register tab ── */}
      {tab === 'register' && (
        <>
          {/* Filters */}
          <div className="card border-0 shadow-sm mb-3">
            <div className="card-body py-3">
              <div className="row g-2 align-items-end">
                <div className="col-md-4">
                  <label className="form-label small fw-semibold mb-1">Fecha</label>
                  <input type="date" className="form-control form-control-sm" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold mb-1">Asignatura</label>
                  <select className="form-select form-select-sm" value={subject} onChange={(e) => setSubject(e.target.value)}>
                    {subjects.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <div className="text-center">
                    <div className="small text-muted">Asistencia</div>
                    <span className={`badge fs-6 ${attendancePct >= 80 ? 'bg-success' : 'bg-warning text-dark'}`}>{attendancePct}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary pills */}
          <div className="d-flex gap-2 mb-3 flex-wrap">
            {Object.entries(counts).map(([k, v]) => (
              <span key={k} className={`badge rounded-pill ${STATUS[k]?.cls}`}>
                {STATUS[k]?.label}: {v}
              </span>
            ))}
          </div>

          {saved && (
            <div className="alert alert-success d-flex align-items-center gap-2 py-2">
              <i className="bi bi-check-circle-fill"></i> Registro guardado correctamente.
            </div>
          )}

          {/* Register table */}
          <div className="card border-0 shadow-sm mb-3">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 small align-middle">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-3">#</th>
                      <th>Estudiante</th>
                      <th>RUT</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {register.map((r, i) => {
                      const student = STUDENTS.find((s) => s.id === r.studentId);
                      return (
                        <tr key={r.studentId}>
                          <td className="ps-3 text-muted">{i + 1}</td>
                          <td className="fw-semibold">{r.name}</td>
                          <td className="text-muted">{student?.rut}</td>
                          <td>
                            <div className="btn-group btn-group-sm" role="group">
                              {Object.entries(STATUS).map(([k, v]) => (
                                <button
                                  key={k}
                                  type="button"
                                  className={`btn ${r.status === k ? `btn-${v.cls.replace('bg-', '').split(' ')[0]}` : 'btn-outline-secondary'}`}
                                  onClick={() => toggleStatus(r.studentId, k)}
                                  title={v.label}
                                >
                                  <i className={`bi ${v.icon}`}></i>
                                  <span className="d-none d-md-inline ms-1">{v.label}</span>
                                </button>
                              ))}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button
              className="btn text-white px-4"
              style={{ backgroundColor: '#002855' }}
              onClick={handleSaveAttendance}
            >
              <i className="bi bi-check2-all me-2"></i>Guardar registro
            </button>
          </div>
        </>
      )}

      {/* ── History tab ── */}
      {tab === 'history' && (
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white py-3">
            <div className="row g-2">
              <div className="col-md-5">
                <label className="form-label small fw-semibold mb-1">Asignatura</label>
                <select className="form-select form-select-sm" value={subject} onChange={(e) => setSubject(e.target.value)}>
                  {subjects.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0 small">
                <thead className="table-light">
                  <tr>
                    <th className="ps-3">Fecha</th>
                    <th>Estudiante</th>
                    <th>Asignatura</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length === 0 && (
                    <tr><td colSpan={4} className="text-center text-muted py-4">Sin registros.</td></tr>
                  )}
                  {history.map((r) => (
                    <tr key={r.id}>
                      <td className="ps-3 text-muted">{r.date}</td>
                      <td className="fw-semibold">{r.studentName}</td>
                      <td>{r.subject}</td>
                      <td><StatusBadge status={r.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Annotations tab ── */}
      {tab === 'annotations' && (
        <>
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn text-white"
              style={{ backgroundColor: '#002855' }}
              onClick={() => setShowAnnModal(true)}
            >
              <i className="bi bi-plus-lg me-1"></i>Nueva anotación
            </button>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 small">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-3">Fecha</th>
                      <th>Estudiante</th>
                      <th>Tipo</th>
                      <th>Descripción</th>
                      <th>Docente</th>
                    </tr>
                  </thead>
                  <tbody>
                    {annotations.map((a) => (
                      <tr key={a.id}>
                        <td className="ps-3 text-muted">{a.date}</td>
                        <td className="fw-semibold">{a.studentName}</td>
                        <td>
                          {a.type === 'positive'
                            ? <span className="badge bg-success"><i className="bi bi-star-fill me-1"></i>Positiva</span>
                            : <span className="badge bg-danger"><i className="bi bi-exclamation-triangle-fill me-1"></i>Negativa</span>
                          }
                        </td>
                        <td style={{ maxWidth: 280 }}>{a.description}</td>
                        <td className="text-muted">{a.teacher}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Add annotation modal */}
          {showAnnModal && (
            <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-3">
                  <div className="modal-header" style={{ backgroundColor: '#002855' }}>
                    <h5 className="modal-title text-white fw-semibold">
                      <i className="bi bi-pencil-square me-2"></i>Nueva anotación
                    </h5>
                    <button className="btn-close btn-close-white" onClick={() => setShowAnnModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Estudiante</label>
                      <select className="form-select" value={annForm.studentId} onChange={(e) => setAnnForm({ ...annForm, studentId: e.target.value })}>
                        <option value="">Seleccionar...</option>
                        {STUDENTS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Tipo</label>
                      <div className="d-flex gap-3">
                        <div className="form-check">
                          <input className="form-check-input" type="radio" id="ann-pos" name="annType" checked={annForm.type === 'positive'} onChange={() => setAnnForm({ ...annForm, type: 'positive' })} />
                          <label className="form-check-label" htmlFor="ann-pos"><span className="badge bg-success">Positiva</span></label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" id="ann-neg" name="annType" checked={annForm.type === 'negative'} onChange={() => setAnnForm({ ...annForm, type: 'negative' })} />
                          <label className="form-check-label" htmlFor="ann-neg"><span className="badge bg-danger">Negativa</span></label>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Descripción</label>
                      <textarea className="form-control" rows={3} value={annForm.description} onChange={(e) => setAnnForm({ ...annForm, description: e.target.value })} placeholder="Describe la conducta o logro..." />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setShowAnnModal(false)}>Cancelar</button>
                    <button className="btn text-white" style={{ backgroundColor: '#002855' }} onClick={handleSaveAnnotation}>Guardar</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

// ── Student/Parent View ───────────────────────────────────────────────────────

function StudentAttendance({ studentId, studentName }) {
  const records = ATTENDANCE_RECORDS.filter((r) => r.studentId === studentId);
  const total   = records.length;
  const counts  = {
    present:   records.filter((r) => r.status === 'present').length,
    absent:    records.filter((r) => r.status === 'absent').length,
    late:      records.filter((r) => r.status === 'late').length,
    justified: records.filter((r) => r.status === 'justified').length,
  };
  const pct = total ? Math.round((counts.present / total) * 100) : 100;

  return (
    <>
      <div className="mb-4">
        <h4 className="fw-bold mb-0" style={{ color: '#002855' }}>Mi Asistencia</h4>
        <p className="text-muted small mb-0">{studentName} · Curso 4°A</p>
      </div>

      {/* Summary */}
      <div className="row g-3 mb-4">
        {Object.entries(counts).map(([k, v]) => {
          const s = STATUS[k];
          return (
            <div className="col-6 col-md-3" key={k}>
              <div className="card border-0 shadow-sm text-center py-3">
                <div className="fw-bold fs-4">
                  <span className={`badge rounded-pill ${s.cls}`}>{v}</span>
                </div>
                <div className="small text-muted mt-1">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between small mb-2">
            <span className="fw-semibold">Porcentaje de asistencia</span>
            <span className={`fw-bold ${pct >= 80 ? 'text-success' : 'text-danger'}`}>{pct}%</span>
          </div>
          <div className="progress" style={{ height: 12 }}>
            <div
              className={`progress-bar ${pct >= 80 ? 'bg-success' : 'bg-danger'}`}
              role="progressbar"
              style={{ width: `${pct}%` }}
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          {pct < 85 && (
            <div className="alert alert-warning mt-3 py-2 small mb-0">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Tu porcentaje de asistencia está por debajo del mínimo reglamentario (85%).
            </div>
          )}
        </div>
      </div>

      {/* History table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <h6 className="fw-semibold mb-0"><i className="bi bi-clock-history me-2 text-primary"></i>Historial de asistencia</h6>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 small">
              <thead className="table-light">
                <tr>
                  <th className="ps-3">Fecha</th>
                  <th>Asignatura</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {records.length === 0 && (
                  <tr><td colSpan={3} className="text-center text-muted py-4">Sin registros.</td></tr>
                )}
                {records.map((r) => (
                  <tr key={r.id}>
                    <td className="ps-3 text-muted">{r.date}</td>
                    <td>{r.subject}</td>
                    <td><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════

export default function AttendancePage() {
  const { user } = useAuth();
  if (!user) return null;

  if (user.role === 'teacher' || user.role === 'admin') return <TeacherAttendance />;
  if (user.role === 'student') return <StudentAttendance studentId={user.id} studentName={user.name} />;
  if (user.role === 'parent') {
    const childId = user.studentId ?? 2;
    return <StudentAttendance studentId={childId} studentName="Juan Pérez" />;
  }

  return null;
}
