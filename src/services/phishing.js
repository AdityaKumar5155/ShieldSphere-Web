const API_BASE = import.meta.env.VITE_APP_API_URL;

export async function checkPhishing(url) {
  const res = await fetch(`${API_BASE}/phishing/check/${encodeURIComponent(url)}`, {
    method: 'PATCH'
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Backend error: ${res.status} ${text}`)
  }
  const data = await res.json()
  if (!data || typeof data.data !== 'number') {
    throw new Error('Unexpected response from backend')
  }
  return data.data
}
