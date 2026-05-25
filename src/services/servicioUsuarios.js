import { apiFetch } from './api';

export async function obtenerUsuarios() {

  const res = await apiFetch('/usuarios');

  return await res.json();
}