import React from 'react'
import { Chip } from '@mui/material'

const CustomChip = ({ label, color, bgColor, border}) => {
  return (
    <Chip key={label} label={label} size="small" sx={{
      bgcolor: bgColor || 'rgba(255,255,255,0.06)',
      border: border || '1px solid rgba(255,255,255,0.12)',
      color: color || 'rgba(255,255,255,0.9)'
    }} />
  )
}

export default CustomChip
