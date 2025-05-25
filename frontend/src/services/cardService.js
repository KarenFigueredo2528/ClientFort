const API_BASE = 'http://localhost:3000/api/tarjetas';

export async function fetchCards() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Error al obtener tarjetas');
  return res.json();
}

export async function createCard(card) {
  const payload = {
    numeroTarjeta: card.numero_tarjeta,
    fechaVencimiento: card.fecha_vencimiento,
    cupoTotal: card.cupo_total,
    cupoDisponible: card.cupo_disponible,
    clienteId: card.cliente_id,
  };

  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Error al crear tarjeta');
  }

  const result = await res.json();

  return {
    id: result.insertedId,
    ...card,
    estado: 'ACTIVO',
    franquicia: 'PENDIENTE', // Puedes actualizar esto luego si quieres
  };
}

export async function deactivateCard(id) {
  const res = await fetch(`${API_BASE}/${id}/desactivar`, {
    method: 'PATCH',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Error al desactivar tarjeta');
  }

  return res.json();
}

export async function updateCardLimit(id, newLimit) {
  const res = await fetch(`${API_BASE}/${id}/cupo`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cupoTotal: newLimit }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Error al actualizar cupo');
  }

  return res.json();
}