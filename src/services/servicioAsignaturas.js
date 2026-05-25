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
// OBTENER ASIGNATURAS
// =========================

export async function obtenerAsignaturas() {

  const res = await fetch(
    `${API}/asignaturas`,
    {
      headers
    }
  );

  if (!res.ok) {

    throw new Error(
      'Error al obtener asignaturas'
    );
  }

  return await res.json();
}

// =========================
// OBTENER ASIGNATURA POR ID
// =========================

export async function obtenerAsignaturaPorId(
  id
) {

  const res = await fetch(
    `${API}/asignaturas/${id}`,
    {
      headers
    }
  );

  if (!res.ok) {

    throw new Error(
      'Error al obtener asignatura'
    );
  }

  return await res.json();
}

// =========================
// CREAR ASIGNATURA
// =========================

export async function crearAsignatura(
  asignatura
) {

  const res = await fetch(
    `${API}/asignaturas`,
    {
      method: 'POST',

      headers,

      body: JSON.stringify(
        asignatura
      ),
    }
  );

  if (!res.ok) {

    throw new Error(
      'Error al crear asignatura'
    );
  }

  return await res.json();
}

// =========================
// ACTUALIZAR ASIGNATURA
// =========================

export async function actualizarAsignatura(
  id,
  asignatura
) {

  const res = await fetch(
    `${API}/asignaturas/${id}`,
    {
      method: 'PUT',

      headers,

      body: JSON.stringify(
        asignatura
      ),
    }
  );

  if (!res.ok) {

    throw new Error(
      'Error al actualizar asignatura'
    );
  }

  return await res.json();
}

// =========================
// ELIMINAR ASIGNATURA
// =========================

export async function eliminarAsignatura(
  id
) {

  const res = await fetch(
    `${API}/asignaturas/${id}`,
    {
      method: 'DELETE',

      headers
    }
  );

  if (!res.ok) {

    throw new Error(
      'Error al eliminar asignatura'
    );
  }

  return await res.text();
}