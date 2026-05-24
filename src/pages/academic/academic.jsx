import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { GRADES, STUDENTS, SUBJECTS } from '../../mockdata';

// ── helpers ───────────────────────────────────────────────────────────────────

function avg(nums) {
  if (!nums.length) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function gradeColor(g) {
  if (g < 4.0) return 'danger';
  if (g < 5.0) return 'warning';
  if (g < 6.0) return 'success';
  return 'primary';
}

function GradeBadge({ grade }) {
  return (
    <span className={`badge rounded-pill bg-${gradeColor(grade)}`}>
      {grade.toFixed(1)}
    </span>
  );
}

// ── Add/Edit Grade Modal ───────────────────────────────────────────────────────

function GradeModal({ show, onClose, onSave, initial }) {
  const [form, setForm] = useState(
    initial ?? { studentId: '', subject: '', grade: '', type: 'Prueba', date: '2026-05-19' },
  );

  const subjects = SUBJECTS.map((s) => s.name);
  const types    = ['Prueba', 'Tarea', 'Disertación', 'Control', 'Examen'];

  const handleSave = () => {
    const g = parseFloat(form.grade);
    if (!form.studentId || !form.subject || isNaN(g) || g < 1 || g > 7) return;
    const student = STUDENTS.find((s) => s.id === parseInt(form.studentId));
    onSave({ ...form, grade: g, studentId: parseInt(form.studentId), studentName: student?.name });
    onClose();
  };

  if (!show) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-3">
            <div className="modal-header" style={{ backgroundColor: '#002855' }}>
              <h5 className="modal-title text-white fw-semibold">
                <i className="bi bi-pencil-square me-2"></i>
                {initial ? 'Editar calificación' : 'Agregar calificación'}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label small fw-semibold">Estudiante</label>
                <select
                  className="form-select"
                  value={form.studentId}
                  onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                >
                  <option value="">Seleccionar...</option>
                  {STUDENTS.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Asignatura</label>
                <select
                  className="form-select"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                >
                  <option value="">Seleccionar...</option>
                  {subjects.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label small fw-semibold">Nota (1.0 – 7.0)</label>
                  <input
                    type="number"
                    className="form-control"
                    min="1" max="7" step="0.1"
                    value={form.grade}
                    onChange={(e) => setForm({ ...form, grade: e.target.value })}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-semibold">Tipo</label>
                  <select className="form-select" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    {types.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <label className="form-label small fw-semibold">Fecha</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
              <button
                className="btn text-white"
                style={{ backgroundColor: '#002855' }}
                onClick={handleSave}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Teacher View ──────────────────────────────────────────────────────────────

function TeacherAcademic() {
  const [grades, setGrades] = useState(GRADES);
  const [filterSubject, setFilterSubject] = useState('Todos');
  const [filterType, setFilterType]       = useState('Todos');
  const [search, setSearch]               = useState('');
  const [showModal, setShowModal]         = useState(false);
  const [editing, setEditing]             = useState(null);

  const subjects = ['Todos', ...SUBJECTS.map((s) => s.name)];
  const types    = ['Todos', 'Prueba', 'Tarea', 'Disertación', 'Control', 'Examen'];

  const filtered = grades.filter((g) => {
    const matchSub  = filterSubject === 'Todos' || g.subject === filterSubject;
    const matchType = filterType    === 'Todos' || g.type    === filterType;
    const matchName = g.studentName.toLowerCase().includes(search.toLowerCase());
    return matchSub && matchType && matchName;
  });

  const classAvg = avg(filtered.map((g) => g.grade));

  const handleSave = (grade) => {
    if (editing) {
      setGrades((prev) => prev.map((g) => (g.id === editing.id ? { ...grade, id: editing.id } : g)));
    } else {
      const newId = Math.max(0, ...grades.map((g) => g.id)) + 1;
      setGrades((prev) => [...prev, { ...grade, id: newId, semester: 1 }]);
    }
    setEditing(null);
  };

  const handleDelete = (id) => setGrades((prev) => prev.filter((g) => g.id !== id));

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-0" style={{ color: '#002855' }}>Calificaciones</h4>
          <p className="text-muted small mb-0">Curso 4°A · Semestre 1</p>
        </div>
        <button
          className="btn text-white"
          style={{ backgroundColor: '#002855' }}
          onClick={() => { setEditing(null); setShowModal(true); }}
        >
          <i className="bi bi-plus-lg me-1"></i>Agregar nota
        </button>
      </div>

      {/* Summary cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm text-center py-3">
            <div className="fw-bold fs-4">{filtered.length}</div>
            <div className="small text-muted">Calificaciones</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm text-center py-3">
            <div className="fw-bold fs-4">{classAvg ? <GradeBadge grade={classAvg} /> : '—'}</div>
            <div className="small text-muted">Promedio</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm text-center py-3">
            <div className="fw-bold fs-4">
              {filtered.length ? <GradeBadge grade={Math.max(...filtered.map((g) => g.grade))} /> : '—'}
            </div>
            <div className="small text-muted">Nota más alta</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm text-center py-3">
            <div className="fw-bold fs-4">
              {filtered.length ? <GradeBadge grade={Math.min(...filtered.map((g) => g.grade))} /> : '—'}
            </div>
            <div className="small text-muted">Nota más baja</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-3">
        <div className="card-body py-3">
          <div className="row g-2 align-items-end">
            <div className="col-md-4">
              <label className="form-label small fw-semibold mb-1">Buscar estudiante</label>
              <div className="input-group input-group-sm">
                <span className="input-group-text"><i className="bi bi-search"></i></span>
                <input className="form-control" placeholder="Nombre..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold mb-1">Asignatura</label>
              <select className="form-select form-select-sm" value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
                {subjects.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold mb-1">Tipo</label>
              <select className="form-select form-select-sm" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                {types.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 small">
              <thead className="table-light">
                <tr>
                  <th className="ps-3">Estudiante</th>
                  <th>Asignatura</th>
                  <th>Tipo</th>
                  <th className="text-center">Nota</th>
                  <th>Fecha</th>
                  <th className="text-end pe-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-muted py-4">
                      <i className="bi bi-inbox me-2"></i>Sin resultados para los filtros seleccionados.
                    </td>
                  </tr>
                )}
                {filtered.map((g) => (
                  <tr key={g.id}>
                    <td className="ps-3 fw-semibold">{g.studentName}</td>
                    <td className="text-truncate" style={{ maxWidth: 200 }}>{g.subject}</td>
                    <td><span className="badge bg-secondary">{g.type}</span></td>
                    <td className="text-center"><GradeBadge grade={g.grade} /></td>
                    <td className="text-muted">{g.date}</td>
                    <td className="text-end pe-3">
                      <button
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => { setEditing(g); setShowModal(true); }}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(g.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <GradeModal
        show={showModal}
        onClose={() => { setShowModal(false); setEditing(null); }}
        onSave={handleSave}
        initial={editing}
      />
    </>
  );
}

// ── Student View ──────────────────────────────────────────────────────────────

function StudentAcademic({ user }) {
  const [activeSubject, setActiveSubject] = useState('Todas');
  const myGrades = GRADES.filter((g) => g.studentId === user.id);
  const subjects = ['Todas', ...new Set(myGrades.map((g) => g.subject))];

  const filtered = activeSubject === 'Todas'
    ? myGrades
    : myGrades.filter((g) => g.subject === activeSubject);

  // Subject summaries
  const summaries = SUBJECTS.map((s) => {
    const gs = myGrades.filter((g) => g.subject === s.name);
    const a  = avg(gs.map((g) => g.grade));
    return { subject: s.name, count: gs.length, avg: a };
  }).filter((s) => s.count > 0);

  const overall = avg(myGrades.map((g) => g.grade));

  return (
    <>
      <div className="mb-4">
        <h4 className="fw-bold mb-0" style={{ color: '#002855' }}>Mis Calificaciones</h4>
        <p className="text-muted small mb-0">Curso 4°A · Semestre 1</p>
      </div>

      {/* Overall avg */}
      {overall !== null && (
        <div
          className="card border-0 shadow-sm mb-4 text-white"
          style={{ background: 'linear-gradient(135deg, #002855 0%, #004fa3 100%)' }}
        >
          <div className="card-body d-flex align-items-center gap-4 py-3">
            <div>
              <div className="opacity-75 small mb-1">Promedio General</div>
              <div className="fw-bold" style={{ fontSize: '2.5rem', lineHeight: 1 }}>{overall.toFixed(1)}</div>
            </div>
            <div className="vr opacity-50"></div>
            <div>
              <div className="opacity-75 small mb-1">Evaluaciones rendidas</div>
              <div className="fw-bold fs-4">{myGrades.length}</div>
            </div>
            <div className="vr opacity-50"></div>
            <div>
              <div className="opacity-75 small mb-1">Asignaturas</div>
              <div className="fw-bold fs-4">{summaries.length}</div>
            </div>
          </div>
        </div>
      )}

      {/* Subject cards */}
      <div className="row g-3 mb-4">
        {summaries.map((s) => (
          <div className="col-6 col-md-4 col-xl-3" key={s.subject}>
            <div
              className={`card border-0 shadow-sm h-100 ${activeSubject === s.subject ? 'border border-primary' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveSubject(activeSubject === s.subject ? 'Todas' : s.subject)}
            >
              <div className="card-body py-3 text-center">
                {s.avg !== null && <GradeBadge grade={s.avg} />}
                <div className="small fw-semibold mt-2 text-truncate" title={s.subject}>{s.subject}</div>
                <div className="small text-muted">{s.count} nota{s.count !== 1 ? 's' : ''}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subject tabs / filter */}
      <div className="mb-3 d-flex gap-2 flex-wrap">
        {subjects.map((s) => (
          <button
            key={s}
            className={`btn btn-sm ${activeSubject === s ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setActiveSubject(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Grades table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 small">
              <thead className="table-light">
                <tr>
                  <th className="ps-3">Asignatura</th>
                  <th>Tipo</th>
                  <th className="text-center">Nota</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((g) => (
                  <tr key={g.id}>
                    <td className="ps-3" style={{ maxWidth: 220 }}>{g.subject}</td>
                    <td><span className="badge bg-secondary">{g.type}</span></td>
                    <td className="text-center"><GradeBadge grade={g.grade} /></td>
                    <td className="text-muted">{g.date}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-muted py-4">Sin calificaciones registradas.</td>
                  </tr>
                )}
              </tbody>
              {filtered.length > 0 && (
                <tfoot className="table-light">
                  <tr>
                    <td colSpan={2} className="ps-3 fw-semibold">Promedio</td>
                    <td className="text-center">
                      {avg(filtered.map((g) => g.grade)) !== null && (
                        <GradeBadge grade={avg(filtered.map((g) => g.grade))} />
                      )}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Parent View ───────────────────────────────────────────────────────────────

function ParentAcademic({ user }) {
  const childId = user.studentId ?? 2;
  return <StudentAcademic user={{ ...user, id: childId }} />;
}

// ══════════════════════════════════════════════════════════════════════════════

export default function AcademicPage() {
  const { user } = useAuth();
  if (!user) return null;

  if (user.role === 'teacher') return <TeacherAcademic />;
  if (user.role === 'student') return <StudentAcademic user={user} />;
  if (user.role === 'parent')  return <ParentAcademic  user={user} />;
  if (user.role === 'admin')   return <TeacherAcademic />;

  return null;
}
