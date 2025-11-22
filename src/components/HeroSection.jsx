import React from 'react'
import { Box, Container, Stack, Typography, Button, Chip } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import CustomChip from '@/components/customComponents/CustomChip'

const HeroSection = () => {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        color: 'text.primary',
        backgroundImage: `
          radial-gradient(1200px 600px at 10% -10%, rgba(99, 102, 241, 0.15), rgba(99, 102, 241, 0)),
          radial-gradient(800px 400px at 90% 10%, rgba(16, 185, 129, 0.12), rgba(16, 185, 129, 0)),
          linear-gradient(180deg, rgba(0,0,0,0.85), rgba(0,0,0,0.85))
        `,
        backgroundColor: '#0b0f14',
      }}
    >
      {/* Subtle dot grid overlay */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.12,
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={4} alignItems="flex-start">
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip label="ShieldSphere" color="primary" sx={{ fontWeight: 700 }} />
            <Chip label="Security Toolkit" variant="outlined" sx={{ borderColor: 'primary.main', color: 'primary.main' }} />
          </Stack>

          <Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                lineHeight: 1.1,
                fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem', lg: '4.25rem' },
                background: 'linear-gradient(90deg, #ffffff 0%, #c7d2fe 60%, #a7f3d0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Secure the web with confidence.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 1.5,
                color: 'rgba(255,255,255,0.8)',
                maxWidth: 900,
                fontWeight: 400,
                fontSize: 15
              }}
            >
              A fast, modular security analysis hub: URL Reputation, TLS Inspector, DNS & WHOIS and more.
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/tools"
              sx={{ px: 3, py: 1.25, fontWeight: 700 }}
            >
              GET STARTED
            </Button>
          </Stack>

          {/* Quick features */}
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ opacity: 0.9 }}>
            {[
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
            ].map((label) => (
              <CustomChip label={label} />
            ))}
          </Stack>

          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            No invasive scans. Privacy‑aware by design. Built for fast wins.
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

export default HeroSection
