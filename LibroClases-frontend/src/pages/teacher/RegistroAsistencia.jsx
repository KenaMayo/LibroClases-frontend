import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { obtenerUsuarios } from '../../services/servicioUsuarios';
import {
  obtenerAsistencia,
  registrarAsistencia,
  actualizarAsistencia
} from '../../services/servicioAsistencia';

export default function RegistroAsistencia() {

  const { user } = useAuth();

  const [alumnos, setAlumnos] = useState([]);
  const [asistenciaHoy, setAsistenciaHoy] = useState({});
  const [registrosExistentes, setRegistrosExistentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  // Fecha de hoy en formato YYYY-MM-DD
  const hoy = new Date().toISOString().split('T')[0];

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {

    try {

      const [usuarios, asistencia] = await Promise.all([
        obtenerUsuarios(),
        obtenerAsistencia()
      ]);

      const soloAlumnos = usuarios.filter((u) => u.rol === 'ALUMNO');
      setAlumnos(soloAlumnos);

      // Filtrar registros de HOY
      const registrosDeHoy = asistencia.filter((a) => a.fecha === hoy);
      setRegistrosExistentes(registrosDeHoy);

      // Pre-llenar el estado con lo que ya existe
      const estadoInicial = {};
      soloAlumnos.forEach((alumno) => {
        const registro = registrosDeHoy.find(
          (r) => r.alumnoId === alumno.id
        );
        if (registro) {
          estadoInicial[alumno.id] = {
            presente: registro.presente,
            registroId: registro.id,
            yaRegistrado: true
          };
        } else {
          estadoInicial[alumno.id] = {
            presente: true,
            registroId: null,
            yaRegistrado: false
          };
        }
      });

      setAsistenciaHoy(estadoInicial);

    } catch (error) {

      console.error('Error cargando datos:', error);

    } finally {

      setLoading(false);
    }
  }

  function toggleAsistencia(alumnoId) {

    setAsistenciaHoy((prev) => ({
      ...prev,
      [alumnoId]: {
        ...prev[alumnoId],
        presente: !prev[alumnoId].presente
      }
    }));
  }

  async function guardarAsistencia() {

    setGuardando(true);
    setMensaje(null);

    try {

      for (const alumno of alumnos) {

        const estado = asistenciaHoy[alumno.id];

        if (estado.yaRegistrado) {

          // Solo actualiza si el valor cambió
          const registroExistente = registrosExistentes.find(
            (r) => r.id === estado.registroId
          );

          if (registroExistente && registroExistente.presente !== estado.presente) {

            await actualizarAsistencia(estado.registroId, {
              alumnoId: alumno.id,
              fecha: hoy,
              presente: estado.presente
            });
          }

        } else {

          await registrarAsistencia({
            alumnoId: alumno.id,
            fecha: hoy,
            presente: estado.presente
          });
        }
      }

      setMensaje({ tipo: 'success', texto: 'Asistencia guardada correctamente.' });
      cargarDatos();

    } catch (error) {

      console.error('Error guardando asistencia:', error);
      setMensaje({ tipo: 'danger', texto: 'Error al guardar asistencia.' });

    } finally {

      setGuardando(false);
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  const yaCompletado = alumnos.every(
    (a) => asistenciaHoy[a.id]?.yaRegistrado
  );

  return (
    <div>
      <h2 className="fw-bold mb-1">Registro de Asistencia</h2>
      <p className="text-muted mb-4">Fecha: {hoy}</p>

      {yaCompletado && (
        <div className="alert alert-info mb-3">
          La asistencia de hoy ya fue registrada. Puedes modificarla si es necesario.
        </div>
      )}

      {mensaje && (
        <div className={`alert alert-${mensaje.tipo} mb-3`}>
          {mensaje.texto}
        </div>
      )}

      {alumnos.length === 0 ? (
        <div className="alert alert-warning">No hay alumnos registrados.</div>
      ) : (
        <>
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-0">
              <table className="table table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Alumno</th>
                    <th>Email</th>
                    <th className="text-center">Presente</th>
                    <th className="text-center">Ausente</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnos.map((alumno) => {
                    const presente = asistenciaHoy[alumno.id]?.presente ?? true;
                    return (
                      <tr key={alumno.id}>
                        <td className="align-middle fw-semibold">{alumno.nombre}</td>
                        <td className="align-middle text-muted">{alumno.email}</td>
                        <td className="text-center align-middle">
                          <input
                            type="radio"
                            name={`asistencia-${alumno.id}`}
                            checked={presente === true}
                            onChange={() =>
                              setAsistenciaHoy((prev) => ({
                                ...prev,
                                [alumno.id]: { ...prev[alumno.id], presente: true }
                              }))
                            }
                            className="form-check-input"
                          />
                        </td>
                        <td className="text-center align-middle">
                          <input
                            type="radio"
                            name={`asistencia-${alumno.id}`}
                            checked={presente === false}
                            onChange={() =>
                              setAsistenciaHoy((prev) => ({
                                ...prev,
                                [alumno.id]: { ...prev[alumno.id], presente: false }
                              }))
                            }
                            className="form-check-input"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-primary"
              onClick={guardarAsistencia}
              disabled={guardando}
            >
              {guardando ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Guardando...
                </>
              ) : (
                yaCompletado ? 'Actualizar Asistencia' : 'Guardar Asistencia'
              )}
            </button>

            <button
              className="btn btn-outline-secondary"
              onClick={cargarDatos}
              disabled={guardando}
            >
              Recargar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
