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
// OBTENER CURSOS
// =========================

export async function obtenerCursos() {

  const res = await fetch(
    `${API}/cursos`,
    {
      headers
    }
  );

  if (!res.ok) {

    throw new Error(
      'Error al obtener cursos'
    );
  }

  return await res.json();
}

// =========================
// OBTENER CURSO POR ID
// =========================

export async function obtenerCursoPorId(
  id
) {

  const res = await fetch(
    `${API}/cursos/${id}`,
    {
      headers
    }
  );

  if (!res.ok) {

    throw new Error(
      'Error al obtener curso'
    );
  }

  return await res.json();
}

// =========================
// CREAR CURSO
// =========================

export async function crearCurso(
  curso
) {

  const res = await fetch(
    `${API}/cursos`,
    {
      method: 'POST',

      headers,

      body: JSON.stringify(
        curso
      ),
    }
  );

  if (!res.ok) {

    throw new Error(
      'Error al crear curso'
    );
  }

  return await res.json();
}

// =========================
// ACTUALIZAR CURSO
// =========================

export async function actualizarCurso(
  id,
  curso
) {

  const res = await fetch(
    `${API}/cursos/${id}`,
    {
      method: 'PUT',

      headers,

      body: JSON.stringify(
        curso
      ),
    }
  );

  if (!res.ok) {

    throw new Error(
      'Error al actualizar curso'
    );
  }

  return await res.json();
}

// =========================
// ELIMINAR CURSO
// =========================

export async function eliminarCurso(
  id
) {

  const res = await fetch(
    `${API}/cursos/${id}`,
    {
      method: 'DELETE',

      headers
    }
  );

  if (!res.ok) {

    throw new Error(
      'Error al eliminar curso'
    );
  }

  return await res.text();
}