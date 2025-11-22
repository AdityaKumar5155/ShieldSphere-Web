const API_BASE = import.meta.env.VITE_APP_API_URL

export async function enumerateSubdomains(domain, opts = {}) {
  const payload = {
    domain,
    verify: !!opts.verify,
    limit: opts.limit || 5000,
    verifyLimit: opts.verifyLimit || 200,
    retries: opts.retries || 2,
    timeoutMs: opts.timeoutMs || 15000,
    sources: opts.sources || ['crtsh','bufferover']
  }
  const res = await fetch(`${API_BASE}/subdomain/enumerate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Backend error: ${res.status} ${text}`)
  }
  const json = await res.json()
  if (!json || !json.success) throw new Error('Unexpected response structure')
  return json.data
}
