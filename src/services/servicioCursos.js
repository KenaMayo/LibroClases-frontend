import { apiFetch } from './api';

export async function obtenerCursos() {
  const response = await apiFetch('/cursos');

  if (!response.ok) {
    throw new Error('Error al obtener cursos');
  }

  return await response.json();
}