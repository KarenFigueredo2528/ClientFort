const API_URL = '/api'

export const fetchClients = async () => {
  const res = await fetch(`${API_URL}/clientes`)
  return res.json()
}

export const createClient = async (data) => {
  const res = await fetch(`${API_URL}/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const toggleCardStatus = async (cardNumber) => {
  const res = await fetch(`${API_URL}/cards/${cardNumber}/toggle`, { method: 'PUT' })
  return res.json()
}

export const updateCardLimit = async (cardNumber, newLimit) => {
  const res = await fetch(`${API_URL}/cards/${cardNumber}/limit`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newLimit })
  })
  return res.json()
}