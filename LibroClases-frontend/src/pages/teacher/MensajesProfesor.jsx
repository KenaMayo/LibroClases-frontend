import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { obtenerMensajes, enviarMensaje } from '../../services/servicioMensajes';
import { obtenerUsuarios } from '../../services/servicioUsuarios';

export default function MensajesProfesor() {

  const { user } = useAuth();

  const [mensajes, setMensajes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [receptorId, setReceptorId] = useState('');
  const [contenido, setContenido] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alerta, setAlerta] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {

    try {

      const [msgs, usrs] = await Promise.all([
        obtenerMensajes(),
        obtenerUsuarios()
      ]);

      setMensajes(msgs);

      // Mostrar todos los usuarios excepto el propio
      const otros = usrs.filter((u) => u.id !== user?.id);
      setUsuarios(otros);

    } catch (error) {

      console.error('Error cargando mensajes:', error);

    } finally {

      setLoading(false);
    }
  }

  function getNombre(id) {
    return usuarios.find((u) => u.id === id)?.nombre || `Usuario #${id}`;
  }

  async function handleEnviar(e) {

    e.preventDefault();

    if (!receptorId || !contenido.trim()) {
      setAlerta({ tipo: 'warning', texto: 'Selecciona un destinatario y escribe un mensaje.' });
      return;
    }

    setEnviando(true);
    setAlerta(null);

    try {

      await enviarMensaje({
        emisorId: user?.id,
        receptorId: parseInt(receptorId),
        contenido: contenido.trim()
      });

      setContenido('');
      setReceptorId('');
      setAlerta({ tipo: 'success', texto: 'Mensaje enviado correctamente.' });
      cargarDatos();

    } catch (error) {

      console.error('Error enviando mensaje:', error);
      setAlerta({ tipo: 'danger', texto: 'Error al enviar el mensaje.' });

    } finally {

      setEnviando(false);
    }
  }

  // Mensajes donde el usuario es emisor o receptor
  const misMensajes = mensajes.filter(
    (m) => m.emisorId === user?.id || m.receptorId === user?.id
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="fw-bold mb-4">Mensajes</h2>

      {/* FORMULARIO NUEVO MENSAJE */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Nuevo Mensaje</h5>

          {alerta && (
            <div className={`alert alert-${alerta.tipo}`}>
              {alerta.texto}
            </div>
          )}

          <form onSubmit={handleEnviar}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Destinatario</label>
              <select
                className="form-select"
                value={receptorId}
                onChange={(e) => setReceptorId(e.target.value)}
              >
                <option value="">Selecciona destinatario...</option>
                {usuarios.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nombre} ({u.rol})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Mensaje</label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="Escribe tu mensaje aquí..."
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                maxLength={500}
              />
              <div className="text-muted small text-end mt-1">
                {contenido.length}/500
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={enviando}
            >
              {enviando ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Enviando...
                </>
              ) : (
                'Enviar Mensaje'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* BANDEJA DE MENSAJES */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white fw-bold">
          Bandeja ({misMensajes.length} mensajes)
        </div>
        <div className="card-body p-0">
          {misMensajes.length === 0 ? (
            <p className="text-muted text-center py-4">No tienes mensajes aún.</p>
          ) : (
            <ul className="list-group list-group-flush">
              {misMensajes.map((m) => {
                const esMio = m.emisorId === user?.id;
                return (
                  <li key={m.id} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <span className={`badge me-2 ${esMio ? 'bg-primary' : 'bg-secondary'}`}>
                          {esMio ? 'Enviado' : 'Recibido'}
                        </span>
                        <strong>
                          {esMio
                            ? `Para: ${getNombre(m.receptorId)}`
                            : `De: ${getNombre(m.emisorId)}`}
                        </strong>
                      </div>
                    </div>
                    <p className="mb-0 mt-1 text-secondary">{m.contenido}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
