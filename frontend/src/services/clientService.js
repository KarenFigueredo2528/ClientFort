const API_BASE = 'http://localhost:3000/api/clientes';

export async function fetchClientById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('Error al obtener cliente');
  return res.json();
}
