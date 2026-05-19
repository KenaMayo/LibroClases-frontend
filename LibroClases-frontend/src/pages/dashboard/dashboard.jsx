import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  COURSES, STUDENTS, GRADES, ATTENDANCE_RECORDS,
  MESSAGES, SCHEDULE, ANNOTATIONS,
} from '../../mockdata';

// ── helpers ──────────────────────────────────────────────────────────────────

function avg(nums) {
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function gradeBadge(grade) {
  let cls = 'bg-success';
  if (grade < 4.0) cls = 'bg-danger';
  else if (grade < 5.0) cls = 'bg-warning text-dark';
  return (
    <span className={`badge rounded-pill ${cls}`}>
      {grade.toFixed(1)}
    </span>
  );
}

const STATUS_CONFIG = {
  present:   { label: 'Presente',    cls: 'bg-success',            icon: 'bi-check-circle-fill' },
  absent:    { label: 'Ausente',     cls: 'bg-danger',             icon: 'bi-x-circle-fill' },
  late:      { label: 'Atrasado',    cls: 'bg-warning text-dark',  icon: 'bi-clock-fill' },
  justified: { label: 'Justificado', cls: 'bg-info text-dark',     icon: 'bi-info-circle-fill' },
};

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, color, onClick }) {
  return (
    <div
      className={`card border-0 shadow-sm h-100 ${onClick ? 'cursor-pointer' : ''}`}
      style={{ borderLeft: `4px solid ${color}`, cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <div className="card-body d-flex align-items-center gap-3 py-3">
        <div
          className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
          style={{ width: 48, height: 48, backgroundColor: color + '22' }}
        >
          <i className={`bi ${icon}`} style={{ fontSize: '1.3rem', color }}></i>
        </div>
        <div>
          <div className="text-muted small">{label}</div>
          <div className="fw-bold fs-4 lh-sm">{value}</div>
        </div>
      </div>
    </div>
  );
}

// ── Today's schedule helper ───────────────────────────────────────────────────

function TodaySchedule() {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const today = days[new Date().getDay()];
  const dayData = SCHEDULE.find((d) => d.day === today);

  if (!dayData) {
    return <p className="text-muted small mb-0">No hay clases programadas hoy.</p>;
  }

  return (
    <ul className="list-group list-group-flush">
      {dayData.blocks.map((b, i) => (
        <li key={i} className="list-group-item px-0 py-2 d-flex justify-content-between align-items-start">
          <div>
            <div className="small fw-semibold">{b.subject}</div>
            <div className="small text-muted">{b.teacher}</div>
          </div>
          <div className="text-end">
            <div className="small text-muted">{b.time}</div>
            <div className="small text-muted">{b.room}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  Role-based dashboards
// ══════════════════════════════════════════════════════════════════════════════

function TeacherDashboard({ user }) {
  const navigate = useNavigate();
  const todayStr = '2026-05-19';
  const todayAttendance = ATTENDANCE_RECORDS.filter(
    (r) => r.date === todayStr && r.subject === user.subject,
  );
  const unread = MESSAGES.filter((m) => m.toRole === 'teacher' && !m.read).length;
  const annotations = ANNOTATIONS.slice(0, 4);

  const presentCount = todayAttendance.filter((r) => r.status === 'present').length;

  return (
    <>
      <div className="mb-4">
        <h4 className="fw-bold mb-0" style={{ color: '#002855' }}>
          Bienvenida, {user.name}
        </h4>
        <p className="text-muted small mb-0">Martes, 19 de mayo de 2026 · Curso jefe: 4°A · {user.subject}</p>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-xl-3">
          <StatCard icon="bi-journal-text"      label="Mis Cursos"        value="1"          color="#002855" onClick={() => navigate('/academic')} />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard icon="bi-people-fill"       label="Estudiantes"       value="35"         color="#0d6efd" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard icon="bi-person-check-fill" label="Presentes hoy"     value={`${presentCount}/${todayAttendance.length}`} color="#198754" onClick={() => navigate('/attendance')} />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard icon="bi-chat-left-text-fill" label="Mensajes nuevos" value={unread}     color="#dc3545" onClick={() => navigate('/messages')} />
        </div>
      </div>

      <div className="row g-3">
        {/* Attendance today */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-bottom-0 d-flex justify-content-between align-items-center pt-3 pb-0">
              <h6 className="fw-semibold mb-0"><i className="bi bi-person-check-fill me-2 text-primary"></i>Asistencia de hoy — {user.subject}</h6>
              <button className="btn btn-sm btn-outline-primary" onClick={() => navigate('/attendance')}>Ver todo</button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 small">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-3">#</th>
                      <th>Estudiante</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayAttendance.map((r, i) => {
                      const s = STATUS_CONFIG[r.status] ?? STATUS_CONFIG.present;
                      return (
                        <tr key={r.id}>
                          <td className="ps-3 text-muted">{i + 1}</td>
                          <td>{r.studentName}</td>
                          <td>
                            <span className={`badge ${s.cls}`}>
                              <i className={`bi ${s.icon} me-1`}></i>{s.label}
                            </span>
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

        {/* Right column */}
        <div className="col-lg-5 d-flex flex-column gap-3">
          {/* Annotations */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom-0 d-flex justify-content-between align-items-center pt-3 pb-0">
              <h6 className="fw-semibold mb-0"><i className="bi bi-pencil-square me-2 text-warning"></i>Últimas Anotaciones</h6>
            </div>
            <div className="card-body pb-3">
              {annotations.map((a) => (
                <div key={a.id} className="d-flex align-items-start gap-2 mb-2">
                  <i className={`bi ${a.type === 'positive' ? 'bi-star-fill text-warning' : 'bi-exclamation-triangle-fill text-danger'} mt-1 flex-shrink-0`}></i>
                  <div>
                    <div className="small fw-semibold">{a.studentName}</div>
                    <div className="small text-muted" style={{ lineHeight: 1.3 }}>{a.description}</div>
                  </div>
                </div>
              ))}
              <button className="btn btn-sm btn-link p-0 text-primary" onClick={() => navigate('/attendance')}>Ver anotaciones →</button>
            </div>
          </div>

          {/* Today's schedule */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
              <h6 className="fw-semibold mb-0"><i className="bi bi-calendar3 me-2 text-info"></i>Horario de hoy</h6>
            </div>
            <div className="card-body pb-2">
              <TodaySchedule />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function StudentDashboard({ user }) {
  const navigate = useNavigate();
  const myGrades = GRADES.filter((g) => g.studentId === user.id);
  const subjects = [...new Set(myGrades.map((g) => g.subject))];
  const subjectAvgs = subjects.map((s) => ({
    subject: s,
    avg: avg(myGrades.filter((g) => g.subject === s).map((g) => g.grade)),
  }));
  const overall = avg(myGrades.map((g) => g.grade));

  const myAttendance = ATTENDANCE_RECORDS.filter((r) => r.studentId === user.id);
  const presentPct = myAttendance.length
    ? Math.round((myAttendance.filter((r) => r.status === 'present').length / myAttendance.length) * 100)
    : 100;

  const unread = MESSAGES.filter((m) => m.toRole === 'student' && !m.read).length;

  return (
    <>
      <div className="mb-4">
        <h4 className="fw-bold mb-0" style={{ color: '#002855' }}>
          Bienvenido, {user.name}
        </h4>
        <p className="text-muted small mb-0">Martes, 19 de mayo de 2026 · Curso: 4°A</p>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-xl-3">
          <StatCard icon="bi-graph-up"             label="Promedio general" value={overall.toFixed(1)} color="#002855" onClick={() => navigate('/academic')} />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard icon="bi-calendar-check-fill"  label="Asistencia"       value={`${presentPct}%`}   color="#198754" onClick={() => navigate('/attendance')} />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard icon="bi-chat-left-text-fill"  label="Mensajes nuevos"  value={unread}             color="#0dcaf0" onClick={() => navigate('/messages')} />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard icon="bi-pencil-square"        label="Evaluaciones"     value={myGrades.length}    color="#fd7e14" />
        </div>
      </div>

      <div className="row g-3">
        {/* Grades by subject */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom-0 d-flex justify-content-between align-items-center pt-3 pb-0">
              <h6 className="fw-semibold mb-0"><i className="bi bi-graph-up me-2 text-primary"></i>Promedios por Asignatura</h6>
              <button className="btn btn-sm btn-outline-primary" onClick={() => navigate('/academic')}>Ver notas</button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 small">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-3">Asignatura</th>
                      <th className="text-end pe-3">Promedio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjectAvgs.map((sa) => (
                      <tr key={sa.subject}>
                        <td className="ps-3">{sa.subject}</td>
                        <td className="text-end pe-3">{gradeBadge(sa.avg)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-lg-5 d-flex flex-column gap-3">
          {/* Schedule */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
              <h6 className="fw-semibold mb-0"><i className="bi bi-calendar3 me-2 text-info"></i>Horario de hoy</h6>
            </div>
            <div className="card-body pb-2">
              <TodaySchedule />
            </div>
          </div>

          {/* Recent grades */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
              <h6 className="fw-semibold mb-0"><i className="bi bi-star-fill me-2 text-warning"></i>Últimas calificaciones</h6>
            </div>
            <div className="card-body pb-3">
              {myGrades.slice(-4).reverse().map((g) => (
                <div key={g.id} className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <div className="small fw-semibold">{g.subject}</div>
                    <div className="small text-muted">{g.type} · {g.date}</div>
                  </div>
                  {gradeBadge(g.grade)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function AdminDashboard({ user }) {
  const navigate = useNavigate();
  const totalStudents = COURSES.reduce((s, c) => s + c.studentCount, 0);
  const unread = MESSAGES.filter((m) => !m.read).length;

  return (
    <>
      <div className="mb-4">
        <h4 className="fw-bold mb-0" style={{ color: '#002855' }}>Panel de Administración</h4>
        <p className="text-muted small mb-0">Martes, 19 de mayo de 2026 · {user.name}</p>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-xl-3">
          <StatCard icon="bi-people-fill"          label="Total estudiantes" value={totalStudents}  color="#002855" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard icon="bi-person-workspace"     label="Docentes"          value="8"              color="#0d6efd" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard icon="bi-journal-text"         label="Cursos activos"    value={COURSES.length} color="#198754" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard icon="bi-chat-left-text-fill"  label="Mensajes no leídos" value={unread}        color="#dc3545" onClick={() => navigate('/messages')} />
        </div>
      </div>

      {/* Courses table */}
      <div className="card border-0 shadow-sm mb-3">
        <div className="card-header bg-white border-bottom-0 d-flex justify-content-between align-items-center pt-3 pb-0">
          <h6 className="fw-semibold mb-0"><i className="bi bi-journal-text me-2 text-primary"></i>Cursos del establecimiento</h6>
          <button className="btn btn-sm btn-outline-primary" onClick={() => navigate('/reports')}>Ver reportes</button>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 small">
              <thead className="table-light">
                <tr>
                  <th className="ps-3">Curso</th>
                  <th>Nivel</th>
                  <th>Profesor Jefe</th>
                  <th className="text-center">Estudiantes</th>
                  <th>Sala</th>
                </tr>
              </thead>
              <tbody>
                {COURSES.map((c) => (
                  <tr key={c.id}>
                    <td className="ps-3 fw-semibold">{c.name}</td>
                    <td>{c.level}</td>
                    <td>{c.tutorName}</td>
                    <td className="text-center"><span className="badge bg-primary rounded-pill">{c.studentCount}</span></td>
                    <td className="text-muted">{c.room}</td>
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

// ─────────────────────────────────────────────────────────────────────────────

function ParentDashboard({ user }) {
  const navigate = useNavigate();
  const childId = user.studentId ?? 2;
  const child = { id: childId, name: 'Juan Pérez', course: '4°A' };

  const childGrades = GRADES.filter((g) => g.studentId === childId);
  const subjects = [...new Set(childGrades.map((g) => g.subject))];
  const subjectAvgs = subjects.map((s) => ({
    subject: s,
    avg: avg(childGrades.filter((g) => g.subject === s).map((g) => g.grade)),
  }));
  const overall = avg(childGrades.map((g) => g.grade));

  const childAttendance = ATTENDANCE_RECORDS.filter((r) => r.studentId === childId);
  const presentPct = childAttendance.length
    ? Math.round((childAttendance.filter((r) => r.status === 'present').length / childAttendance.length) * 100)
    : 100;

  const unread = MESSAGES.filter((m) => m.toRole === 'parent' && !m.read).length;

  return (
    <>
      <div className="mb-4">
        <h4 className="fw-bold mb-0" style={{ color: '#002855' }}>Bienvenido, {user.name}</h4>
        <p className="text-muted small mb-0">Martes, 19 de mayo de 2026</p>
      </div>

      {/* Child info banner */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderLeft: '4px solid #002855' }}>
        <div className="card-body py-3 d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle text-white fw-bold flex-shrink-0"
            style={{ width: 48, height: 48, backgroundColor: '#002855', fontSize: '1.1rem' }}
          >
            JP
          </div>
          <div>
            <div className="fw-semibold">{child.name}</div>
            <div className="text-muted small">Estudiante · Curso {child.course} · Colegio Bernardo O'Higgins</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-xl-3">
          <StatCard icon="bi-graph-up"            label="Promedio general" value={overall.toFixed(1)} color="#002855" onClick={() => navigate('/academic')} />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard icon="bi-calendar-check-fill" label="Asistencia"       value={`${presentPct}%`}   color="#198754" onClick={() => navigate('/attendance')} />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard icon="bi-chat-left-text-fill" label="Mensajes nuevos"  value={unread}             color="#0dcaf0" onClick={() => navigate('/messages')} />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard icon="bi-pencil-square"       label="Evaluaciones"     value={childGrades.length} color="#fd7e14" />
        </div>
      </div>

      {/* Grades */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-bottom-0 d-flex justify-content-between align-items-center pt-3 pb-0">
          <h6 className="fw-semibold mb-0"><i className="bi bi-graph-up me-2 text-primary"></i>Notas de {child.name}</h6>
          <button className="btn btn-sm btn-outline-primary" onClick={() => navigate('/academic')}>Ver todas</button>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 small">
              <thead className="table-light">
                <tr>
                  <th className="ps-3">Asignatura</th>
                  <th className="text-end pe-3">Promedio</th>
                </tr>
              </thead>
              <tbody>
                {subjectAvgs.map((sa) => (
                  <tr key={sa.subject}>
                    <td className="ps-3">{sa.subject}</td>
                    <td className="text-end pe-3">{gradeBadge(sa.avg)}</td>
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
//  Main export
// ══════════════════════════════════════════════════════════════════════════════

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === 'teacher') return <TeacherDashboard user={user} />;
  if (user.role === 'student') return <StudentDashboard user={user} />;
  if (user.role === 'admin')   return <AdminDashboard   user={user} />;
  if (user.role === 'parent')  return <ParentDashboard  user={user} />;

  return <p className="text-muted">Rol no reconocido.</p>;
}
