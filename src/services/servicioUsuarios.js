const API =
  import.meta.env.VITE_API_URL;

export async function obtenerUsuarios() {

  const res = await fetch(
    `${API}/usuarios`
  );

  return await res.json();
}

export async function crearUsuario(
  usuario
) {

  const res = await fetch(
    `${API}/usuarios`,
    {
      method: 'POST',

      headers: {
        'Content-Type':
          'application/json',
      },

      body: JSON.stringify(
        usuario
      ),
    }
  );

  return await res.json();
}

export async function actualizarUsuario(
  id,
  usuario
) {

  const res = await fetch(
    `${API}/usuarios/${id}`,
    {
      method: 'PUT',

      headers: {
        'Content-Type':
          'application/json',
      },

      body: JSON.stringify(
        usuario
      ),
    }
  );

  return await res.json();
}

export async function eliminarUsuario(
  id
) {

  const res = await fetch(
    `${API}/usuarios/${id}`,
    {
      method: 'DELETE',
    }
  );

  return await res.text();
}