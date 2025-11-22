const API_BASE = import.meta.env.VITE_APP_API_URL

export async function checkPassword(password) {
  const res = await fetch(`${API_BASE}/password/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Backend error: ${res.status} ${text}`)
  }
  const json = await res.json()
  if (!json || !json.success) throw new Error('Unexpected response structure')
  return json.data
}
