import React, { useState } from 'react'
import { Box, Container, Stack, Typography, TextField, Button, LinearProgress, Alert, Paper, Divider, Chip, Grid } from '@mui/material'
import { fetchDomainInfo } from '@/services/domain'

const DnsWhois = () => {
  const [domain, setDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setData(null)
    if (!/^([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/.test(domain.trim())) {
      setError('Enter a valid domain like example.com')
      return
    }
    setLoading(true)
    try {
      const result = await fetchDomainInfo(domain.trim())
      setData(result)
    } catch (e) {
      setError(e.message || 'Failed to fetch domain info')
    } finally {
      setLoading(false)
    }
  }

  const whois = data?.whois
  const dns = data?.dns

  return (
    <Box sx={{ minHeight: '100vh', py: 6, backgroundColor: '#0b0f14', color: 'text.primary' }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff' }}>DNS & WHOIS</Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>Lookup consolidated registration and DNS records.</Typography>
          </Stack>

          <Box component="form" onSubmit={onSubmit}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                variant="outlined"
                label="example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                InputProps={{ sx: { backgroundColor: '#111826', color: '#fff' } }}
              />
              <Button type="submit" variant="contained" color="primary" disabled={loading}>Query</Button>
            </Stack>
          </Box>

          {loading && <LinearProgress />}
          {error && <Alert severity="error">{error}</Alert>}

          {data && (
            <Stack spacing={3}>
              {/* WHOIS Section */}
              <Paper sx={{ p: 3, backgroundColor: '#111826', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>WHOIS</Typography>
                    <Chip label={whois?.registrar || 'Unknown Registrar'} size="small" color="primary" />
                  </Stack>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>Created:</Typography>
                      <Typography variant="body2" sx={{ color: '#fff' }}>{whois?.creationDate || '—'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>Expires:</Typography>
                      <Typography variant="body2" sx={{ color: '#fff' }}>{whois?.expirationDate || '—'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>Age (days):</Typography>
                      <Typography variant="body2" sx={{ color: '#fff' }}>{whois?.estimatedAgeDays ?? '—'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>Name Servers:</Typography>
                      <Typography variant="body2" sx={{ color: '#fff' }}>{(whois?.nameServers || []).join(', ') || '—'}</Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>Status:</Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {(whois?.status || []).map(s => <Chip key={s} label={s} size="small" />)}
                    {(!whois?.status || whois.status.length === 0) && <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>No statuses</Typography>}
                  </Stack>
                </Stack>
              </Paper>

              {/* DNS Section */}
              <Paper sx={{ p: 3, backgroundColor: '#111826', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>DNS Records</Typography>
                  <Grid container spacing={2}>
                    {dns && Object.entries(dns.records || {}).map(([type, value]) => (
                      <Grid item xs={12} sm={6} md={4} key={type}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>{type}</Typography>
                        {Array.isArray(value) ? (
                          value.length ? value.slice(0, 10).map(v => (
                            <Typography key={String(v)} variant="caption" sx={{ display: 'block', color: '#fff' }}>{typeof v === 'object' ? JSON.stringify(v) : v}</Typography>
                          )) : <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>None</Typography>
                        ) : (
                          value ? <Typography variant="caption" sx={{ color: '#fff' }}>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</Typography> : <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>None</Typography>
                        )}
                      </Grid>
                    ))}
                  </Grid>
                  {dns?.errors && Object.keys(dns.errors).length > 0 && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      Some record types failed: {Object.keys(dns.errors).join(', ')}
                    </Alert>
                  )}
                </Stack>
              </Paper>
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  )
}

export default DnsWhois
