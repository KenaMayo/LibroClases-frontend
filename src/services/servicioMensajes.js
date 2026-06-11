const API = import.meta.env.VITE_API_URL;

// HEADERS NGROK
const headers = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true'
};

// =========================
// OBTENER MENSAJES
// =========================

export async function obtenerMensajes() {

  const res = await fetch(`${API}/mensajes`, { headers });

  if (!res.ok) {
    throw new Error('Error al obtener mensajes');
  }

  return await res.json();
}

// =========================
// ENVIAR MENSAJE
// =========================

export async function enviarMensaje(mensaje) {

  const res = await fetch(`${API}/mensajes`, {
    method: 'POST',
    headers,
    body: JSON.stringify(mensaje)
  });

  if (!res.ok) {
    throw new Error('Error al enviar mensaje');
  }

  return await res.json();
}
