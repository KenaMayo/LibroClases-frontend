const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(endpoint, options = {}) {

  const token = sessionStorage.getItem('ldc_token');

  return fetch(`${API_URL}${endpoint}`, {

    ...options,

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
}