import React, { useState } from 'react'
import { Box, Container, Stack, Typography, TextField, Button, LinearProgress, Alert, Paper, Switch, FormControlLabel, Chip } from '@mui/material'
import { enumerateSubdomains } from '@/services/subdomain'

const Subdomains = () => {
  const [domain, setDomain] = useState('')
  const [verify, setVerify] = useState(false) // currently backend verification commented out
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
      const result = await enumerateSubdomains(domain.trim(), { verify })
      setData(result)
    } catch (e) {
      setError(e.message || 'Enumeration failed')
    } finally {
      setLoading(false)
    }
  }

  const subdomains = data?.subdomains || []

  return (
    <Box sx={{ minHeight: '100vh', py: 6, backgroundColor: '#0b0f14', color: 'text.primary' }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff' }}>Subdomain Enumeration</Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>Passive discovery via certificate transparency and passive DNS sources.</Typography>
          </Stack>

            <Box component="form" onSubmit={onSubmit}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="example.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  InputProps={{ sx: { backgroundColor: '#111826', color: '#fff' } }}
                />
                {/* <FormControlLabel
                  control={<Switch checked={verify} onChange={(e) => setVerify(e.target.checked)} disabled />}
                  label="Verify DNS (disabled)"
                  sx={{ color: 'rgba(255,255,255,0.6)' }}
                /> */}
                <Button type="submit" variant="contained" color="primary" disabled={loading}>Enumerate</Button>
              </Stack>
            </Box>

          {loading && <LinearProgress />}
          {error && <Alert severity="error">{error}</Alert>}

          {data && (
            <Paper sx={{ p: 3, backgroundColor: '#111826', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Stack spacing={2}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>
                  Results ({data.count})
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {subdomains.map(sd => (
                    <Chip key={sd} label={sd} size="small" sx={{ maxWidth: '100%', color: '#fff' }} />
                  ))}
                  {subdomains.length === 0 && <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>No subdomains found.</Typography>}
                </Stack>
              </Stack>
            </Paper>
          )}
        </Stack>
      </Container>
    </Box>
  )
}

export default Subdomains
