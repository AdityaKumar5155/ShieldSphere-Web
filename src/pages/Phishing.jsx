import React, { useState } from 'react'
import { Box, Container, Stack, Typography, TextField, Button, LinearProgress, Alert, Paper } from '@mui/material'
import { checkPhishing } from '@/services/phishing'

const Phishing = () => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [score, setScore] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setScore(null)
    try {
      // basic validation
      const u = new URL(url)
      if (!u.protocol.startsWith('http')) throw new Error('Use http(s) URLs')
    } catch (e) {
      setError('Please enter a valid URL (including http/https)')
      return
    }

    setLoading(true)
    try {
      const result = await checkPhishing(url)
      setScore(result)
    } catch (e) {
      setError(e.message || 'Failed to check phishing')
    } finally {
      setLoading(false)
    }
  }

  const classify = (p) => {
    if (p == null) return ''
    if (p >= 0.8) return 'High Risk'
    if (p >= 0.5) return 'Medium Risk'
    return 'Low Risk'
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 6, backgroundColor: '#0b0f14', color: 'text.primary' }}>
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff' }}>URL Phishing Check</Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Enter a URL to estimate the phishing probability.
          </Typography>

          <Box component="form" onSubmit={onSubmit}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                variant="outlined"
                label="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                InputProps={{ sx: { backgroundColor: '#111826', color: '#fff' } }}
              />
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                Check
              </Button>
            </Stack>
          </Box>

          {loading && <LinearProgress />}
          {error && <Alert severity="error">{error}</Alert>}

          {score != null && (
            <Paper sx={{ p: 3, backgroundColor: '#111826', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>Result</Typography>
              <Typography variant="body1" sx={{ mt: 1, color: 'rgba(255,255,255,0.85)' }}>
                Probability: {(score * 100).toFixed(1)}%
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5, color: 'rgba(255,255,255,0.7)' }}>
                Classification: {classify(score)}
              </Typography>
            </Paper>
          )}
        </Stack>
      </Container>
    </Box>
  )
}

export default Phishing
