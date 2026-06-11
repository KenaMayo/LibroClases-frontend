const API =
  import.meta.env.VITE_API_URL;

// HEADERS NGROK
const headers = {

  'Content-Type':
    'application/json',

  'ngrok-skip-browser-warning':
    'true'
};

// =========================
// OBTENER USUARIOS
// =========================

export async function obtenerUsuarios() {

  const res = await fetch(
    `${API}/usuarios`,
    {
      headers
    }
  );

  if (!res.ok) {

    throw new Error(
      'Error al obtener usuarios'
    );
  }

  return await res.json();
}

// =========================
// CREAR USUARIO
// =========================

export async function crearUsuario(
  usuario
) {

  const res = await fetch(
    `${API}/usuarios`,
    {
      method: 'POST',

      headers,

      body: JSON.stringify(
        usuario
      ),
    }
  );

  if (!res.ok) {

    throw new Error(
      'Error al crear usuario'
    );
  }

  return await res.json();
}

// =========================
// ACTUALIZAR USUARIO
// =========================

export async function actualizarUsuario(
  id,
  usuario
) {

  const res = await fetch(
    `${API}/usuarios/${id}`,
    {
      method: 'PUT',

      headers,

      body: JSON.stringify(
        usuario
      ),
    }
  );

  if (!res.ok) {

    throw new Error(
      'Error al actualizar usuario'
    );
  }

  return await res.json();
}

// =========================
// ELIMINAR USUARIO
// =========================

export async function eliminarUsuario(
  id
) {

  const res = await fetch(
    `${API}/usuarios/${id}`,
    {
      method: 'DELETE',

      headers
    }
  );

  if (!res.ok) {

    throw new Error(
      'Error al eliminar usuario'
    );
  }

  return await res.text();
}