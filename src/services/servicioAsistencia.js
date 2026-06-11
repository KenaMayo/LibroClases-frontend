const API = import.meta.env.VITE_API_URL;

// HEADERS NGROK
const headers = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true'
};

// =========================
// OBTENER ASISTENCIA
// =========================

export async function obtenerAsistencia() {

  const res = await fetch(`${API}/asistencia`, { headers });

  if (!res.ok) {
    throw new Error('Error al obtener asistencia');
  }

  return await res.json();
}

// =========================
// OBTENER ASISTENCIA POR ID
// =========================

export async function obtenerAsistenciaPorId(id) {

  const res = await fetch(`${API}/asistencia/${id}`, { headers });

  if (!res.ok) {
    throw new Error('Error al obtener asistencia');
  }

  return await res.json();
}

// =========================
// REGISTRAR ASISTENCIA
// =========================

export async function registrarAsistencia(asistencia) {

  const res = await fetch(`${API}/asistencia`, {
    method: 'POST',
    headers,
    body: JSON.stringify(asistencia)
  });

  if (!res.ok) {
    throw new Error('Error al registrar asistencia');
  }

  return await res.json();
}

// =========================
// ACTUALIZAR ASISTENCIA
// =========================

export async function actualizarAsistencia(id, asistencia) {

  const res = await fetch(`${API}/asistencia/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(asistencia)
  });

  if (!res.ok) {
    throw new Error('Error al actualizar asistencia');
  }

  return await res.json();
}

// =========================
// ELIMINAR ASISTENCIA
// =========================

export async function eliminarAsistencia(id) {

  const res = await fetch(`${API}/asistencia/${id}`, {
    method: 'DELETE',
    headers
  });

  if (!res.ok) {
    throw new Error('Error al eliminar asistencia');
  }

  return await res.text();
}
