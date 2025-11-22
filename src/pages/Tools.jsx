import React from 'react'
import { Box, Container, Grid, Card, CardContent, Typography, Chip, CardActionArea } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const tools = [
  'URL Reputation',
  'TLS Inspector',
  'DNS & WHOIS',
  'Security Headers',
  'Cookie Audit',
  'Password Check',
  'Email Headers',
  'JS Heuristics',
  'Subdomain Enum',
  'Rate‑Limit Demo',
  'Security Quiz',
  'Trust Score',
]

const Tools = () => {
  return (
    <Box sx={{ minHeight: '100vh', py: 6, backgroundColor: '#0b0f14', color: 'text.primary' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: '#fff' }}>
          Tools
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255,255,255,0.8)' }}>
          Explore the toolkit below. Click a card to open the tool.
        </Typography>
        <Grid container spacing={2}>
          {tools.map((label) => (
            <Grid item xs={12} sm={6} md={4} key={label}>
              <Card sx={{ height: '100%', backgroundColor: '#111826', border: '1px solid rgba(255,255,255,0.08)' }}>
                <CardActionArea
                  component={(label === 'URL Reputation' || label === 'DNS & WHOIS' || label === 'Subdomain Enum' || label === 'Password Check') ? RouterLink : 'div'}
                  to={label === 'URL Reputation' ? '/tools/phishing'
                    : (label === 'DNS & WHOIS' ? '/tools/dns-whois'
                    : (label === 'Subdomain Enum' ? '/tools/subdomains'
                    : (label === 'Password Check' ? '/tools/password' : undefined)))}
                  sx={{ height: '100%' }}>
                <CardContent>
                  <Chip label="Tool" color="primary" size="small" sx={{ mb: 1 }} />
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
                    {label}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,0.7)' }}>
                    {label === 'URL Reputation' ? 'Open phishing checker'
                      : (label === 'DNS & WHOIS' ? 'Open DNS & WHOIS'
                      : (label === 'Subdomain Enum' ? 'Open subdomain enumeration'
                      : (label === 'Password Check' ? 'Open password strength tool' : 'Coming soon.')))}
                  </Typography>
                </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Tools
