import React, { useState } from 'react'
import { Box, Container, Stack, Typography, TextField, Button, LinearProgress, Alert, Paper, Grid, Chip } from '@mui/material'
import { checkPassword } from '@/services/password'

const Password = () => {
  const [pwd, setPwd] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setData(null)
    if (!pwd) { setError('Enter a password'); return }
    setLoading(true)
    try {
      const result = await checkPassword(pwd)
      setData(result)
    } catch (e) {
      setError(e.message || 'Failed to check password')
    } finally { setLoading(false) }
  }

  const brute = data?.bruteForceTimes || {}
  const strengthColor = (s) => {
    switch (s) {
      case 'Weak': return 'error'
      case 'Medium': return 'warning'
      case 'Strong': return 'success'
      case 'Very Strong': return 'primary'
      default: return 'default'
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 6, backgroundColor: '#0b0f14', color: 'text.primary' }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff' }}>Password Strength</Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>Estimate entropy and brute‑force time across attack profiles.</Typography>
          </Stack>
          <Box component="form" onSubmit={onSubmit}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                variant="outlined"
                type="password"
                label="Enter password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                InputProps={{ sx: { backgroundColor: '#111826', color: '#fff' } }}
              />
              <Button type="submit" variant="contained" color="primary" disabled={loading}>Check</Button>
            </Stack>
          </Box>
          {loading && <LinearProgress />}
          {error && <Alert severity="error">{error}</Alert>}
          {data && (
            <Paper sx={{ p: 3, backgroundColor: '#111826', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>Result</Typography>
                  <Chip label={data.strength} color={strengthColor(data.strength)} />
                </Stack>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}><Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>Length</Typography><Typography variant="body2" sx={{ color: '#fff' }}>{data.length}</Typography></Grid>
                  <Grid item xs={6} sm={3}><Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>Charset</Typography><Typography variant="body2" sx={{ color: '#fff' }}>{data.charsetSize}</Typography></Grid>
                  <Grid item xs={6} sm={3}><Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>Entropy (bits)</Typography><Typography variant="body2" sx={{ color: '#fff' }}>{data.entropyBits}</Typography></Grid>
                  <Grid item xs={6} sm={3}><Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>Combos</Typography><Typography variant="body2" sx={{ color: '#fff', wordBreak: 'break-all' }}>{data.combinations}</Typography></Grid>
                </Grid>
                <Typography variant="subtitle2" sx={{ color: '#fff', mt: 1 }}>Brute Force Time Estimates</Typography>
                <Grid container spacing={1}>
                  {Object.entries(brute).map(([k, v]) => (
                    <Grid key={k} item xs={12} sm={6} md={3}>
                      <Paper sx={{ p:1, textAlign:'center', backgroundColor:'#1b2433' }}>
                        <Typography variant="caption" sx={{ color:'rgba(255,255,255,0.6)' }}>{k}</Typography>
                        <Typography variant="body2" sx={{ color:'#fff' }}>{v}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Paper>
          )}
        </Stack>
      </Container>
    </Box>
  )
}

export default Password
