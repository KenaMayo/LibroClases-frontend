import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MESSAGES, USERS } from '../../mockdata';

const ROLE_LABEL = {
  teacher: 'Docente',
  student: 'Estudiante',
  admin:   'Admin',
  parent:  'Apoderado',
  all:     'Todos',
};

export default function MessagesPage() {
  const { user } = useAuth();
  const [messages, setMessages]     = useState(MESSAGES);
  const [selected, setSelected]     = useState(null);
  const [composing, setComposing]   = useState(false);
  const [compose, setCompose]       = useState({ to: '', subject: '', body: '' });
  const [sent, setSent]             = useState(false);
  const [search, setSearch]         = useState('');

  if (!user) return null;

  const inbox = messages.filter((m) => {
    const addressed = m.toRole === user.role || m.toRole === 'all' ||
      (user.role === 'teacher' && m.fromRole === 'parent') ||
      (user.role === 'student' && m.fromId === 1) ||
      (user.role === 'parent'  && m.fromRole === 'teacher') ||
      (user.role === 'admin');
    const matchSearch = !search ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.from.toLowerCase().includes(search.toLowerCase());
    return addressed && matchSearch;
  });

  const unread = inbox.filter((m) => !m.read).length;

  const handleOpen = (msg) => {
    setSelected(msg);
    setComposing(false);
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m)),
    );
  };

  const handleSend = () => {
    if (!compose.to || !compose.subject || !compose.body) return;
    const newMsg = {
      id:       Math.max(0, ...messages.map((m) => m.id)) + 1,
      fromId:   user.id,
      from:     user.name,
      fromRole: user.role,
      to:       compose.to,
      toRole:   'all',
      subject:  compose.subject,
      body:     compose.body,
      date:     '2026-05-19',
      read:     true,
    };
    setMessages((prev) => [newMsg, ...prev]);
    setComposing(false);
    setSent(true);
    setCompose({ to: '', subject: '', body: '' });
    setTimeout(() => setSent(false), 2500);
  };

  const recipients = USERS.filter((u) => u.id !== user.id).map((u) => u.name);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-0" style={{ color: '#002855' }}>
            Mensajes
            {unread > 0 && (
              <span className="badge bg-danger ms-2 rounded-pill" style={{ fontSize: '0.7rem' }}>
                {unread} nuevo{unread !== 1 ? 's' : ''}
              </span>
            )}
          </h4>
          <p className="text-muted small mb-0">Bandeja de entrada</p>
        </div>
        <button
          className="btn text-white"
          style={{ backgroundColor: '#002855' }}
          onClick={() => { setComposing(true); setSelected(null); }}
        >
          <i className="bi bi-pencil-square me-1"></i>Nuevo mensaje
        </button>
      </div>

      {sent && (
        <div className="alert alert-success d-flex align-items-center gap-2 py-2 mb-3">
          <i className="bi bi-check-circle-fill"></i> Mensaje enviado correctamente.
        </div>
      )}

      <div className="row g-0 card border-0 shadow-sm rounded-3 overflow-hidden" style={{ minHeight: 480 }}>

        {/* ── Message list ── */}
        <div
          className={`col-md-4 border-end d-flex flex-column ${selected || composing ? 'd-none d-md-flex' : ''}`}
        >
          {/* Search */}
          <div className="p-3 border-bottom">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-white border-end-0"><i className="bi bi-search text-muted"></i></span>
              <input
                className="form-control border-start-0 ps-0"
                placeholder="Buscar mensajes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow-1 overflow-auto">
            {inbox.length === 0 && (
              <div className="text-center text-muted py-5">
                <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                Sin mensajes.
              </div>
            )}
            {inbox.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 border-bottom ${selected?.id === msg.id ? 'bg-primary bg-opacity-10' : 'bg-white'} ${!msg.read ? 'border-start border-primary border-3' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleOpen(msg)}
              >
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <span className={`small ${!msg.read ? 'fw-bold' : 'fw-semibold text-muted'}`}>
                    {msg.from}
                  </span>
                  <span className="text-muted" style={{ fontSize: '0.72rem' }}>{msg.date}</span>
                </div>
                <div className={`small ${!msg.read ? 'fw-semibold' : 'text-muted'} text-truncate`}>
                  {msg.subject}
                </div>
                <div className="text-muted text-truncate" style={{ fontSize: '0.75rem' }}>
                  {msg.body.replace(/\n/g, ' ')}
                </div>
                {!msg.read && (
                  <span className="badge bg-primary rounded-pill mt-1" style={{ fontSize: '0.65rem' }}>Nuevo</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Detail / Compose pane ── */}
        <div className="col-md-8 d-flex flex-column bg-white">

          {/* Back button on mobile */}
          {(selected || composing) && (
            <div className="d-md-none p-2 border-bottom">
              <button className="btn btn-sm btn-link p-0 text-decoration-none" onClick={() => { setSelected(null); setComposing(false); }}>
                <i className="bi bi-arrow-left me-1"></i>Volver
              </button>
            </div>
          )}

          {/* Empty state */}
          {!selected && !composing && (
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-muted">
              <i className="bi bi-envelope-open fs-1 mb-3 opacity-25"></i>
              <p className="small">Selecciona un mensaje para leerlo</p>
            </div>
          )}

          {/* Message detail */}
          {selected && !composing && (
            <div className="flex-grow-1 p-4 overflow-auto">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <h5 className="fw-bold mb-1">{selected.subject}</h5>
                  <div className="small text-muted">
                    <span className="me-3">
                      <i className="bi bi-person-fill me-1"></i>
                      {selected.from}
                      <span className="badge bg-secondary ms-1">{ROLE_LABEL[selected.fromRole]}</span>
                    </span>
                    <span className="me-3">
                      <i className="bi bi-arrow-right-short"></i>
                      {selected.to}
                    </span>
                    <span>
                      <i className="bi bi-calendar3 me-1"></i>
                      {selected.date}
                    </span>
                  </div>
                </div>
              </div>
              <hr />
              <p className="small" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{selected.body}</p>
              <hr />
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => {
                  setCompose({ to: selected.from, subject: `Re: ${selected.subject}`, body: '' });
                  setComposing(true);
                  setSelected(null);
                }}
              >
                <i className="bi bi-reply-fill me-1"></i>Responder
              </button>
            </div>
          )}

          {/* Compose */}
          {composing && (
            <div className="flex-grow-1 p-4 overflow-auto">
              <h6 className="fw-semibold mb-4"><i className="bi bi-pencil-square me-2 text-primary"></i>Nuevo mensaje</h6>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Para</label>
                <select
                  className="form-select"
                  value={compose.to}
                  onChange={(e) => setCompose({ ...compose, to: e.target.value })}
                >
                  <option value="">Seleccionar destinatario...</option>
                  {recipients.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Asunto</label>
                <input
                  className="form-control"
                  value={compose.subject}
                  onChange={(e) => setCompose({ ...compose, subject: e.target.value })}
                  placeholder="Escribe el asunto..."
                />
              </div>
              <div className="mb-4">
                <label className="form-label small fw-semibold">Mensaje</label>
                <textarea
                  className="form-control"
                  rows={6}
                  value={compose.body}
                  onChange={(e) => setCompose({ ...compose, body: e.target.value })}
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn text-white"
                  style={{ backgroundColor: '#002855' }}
                  onClick={handleSend}
                >
                  <i className="bi bi-send-fill me-1"></i>Enviar
                </button>
                <button className="btn btn-outline-secondary" onClick={() => { setComposing(false); setCompose({ to: '', subject: '', body: '' }); }}>
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
