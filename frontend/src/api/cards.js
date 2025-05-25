const BASE_URL = "http://localhost:3000/api/tarjetas"; // ajusta si cambia

export async function fetchCards() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function createCard(card) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(card)
  });
  return res.json();
}

export async function updateCardLimit(id, cupoTotal) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cupoTotal })
  });
  return res.json();
}

export async function deactivateCard(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });
  return res.json();
}