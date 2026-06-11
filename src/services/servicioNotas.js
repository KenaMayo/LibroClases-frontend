const API = import.meta.env.VITE_API_URL;

// HEADERS NGROK
const headers = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true'
};

// =========================
// OBTENER NOTAS
// =========================

export async function obtenerNotas() {

  const res = await fetch(`${API}/notas`, { headers });

  if (!res.ok) {
    throw new Error('Error al obtener notas');
  }

  return await res.json();
}

// =========================
// OBTENER NOTA POR ID
// =========================

export async function obtenerNotaPorId(id) {

  const res = await fetch(`${API}/notas/${id}`, { headers });

  if (!res.ok) {
    throw new Error('Error al obtener nota');
  }

  return await res.json();
}

// =========================
// CREAR NOTA
// =========================

export async function crearNota(nota) {

  const res = await fetch(`${API}/notas`, {
    method: 'POST',
    headers,
    body: JSON.stringify(nota)
  });

  if (!res.ok) {
    throw new Error('Error al crear nota');
  }

  return await res.json();
}

// =========================
// ACTUALIZAR NOTA
// =========================

export async function actualizarNota(id, nota) {

  const res = await fetch(`${API}/notas/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(nota)
  });

  if (!res.ok) {
    throw new Error('Error al actualizar nota');
  }

  return await res.json();
}

// =========================
// ELIMINAR NOTA
// =========================

export async function eliminarNota(id) {

  const res = await fetch(`${API}/notas/${id}`, {
    method: 'DELETE',
    headers
  });

  if (!res.ok) {
    throw new Error('Error al eliminar nota');
  }

  return await res.text();
}
