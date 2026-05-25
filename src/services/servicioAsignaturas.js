import { apiFetch } from './api';

export async function obtenerAsignaturas() {
  const response = await apiFetch('/asignaturas');

  if (!response.ok) {
    throw new Error('Error al obtener asignaturas');
  }

  return await response.json();
}

export async function crearAsignatura(asignatura) {
  const response = await apiFetch('/asignaturas', {
    method: 'POST',
    body: JSON.stringify(asignatura),
  });

  if (!response.ok) {
    throw new Error('Error al crear asignatura');
  }

  return await response.json();
}