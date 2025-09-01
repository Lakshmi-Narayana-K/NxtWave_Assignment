import React from 'react'
import { Box, Typography } from '@mui/material'

const SpecificType = ({ icon, label }) => {
  return (
    <Box className="flex flex-row gap-1 items-center"> 
      {icon}
      <Typography className="text-gray-300" style={{ fontSize: "12px" }}>{label}</Typography>
    </Box>
  )
}

export default SpecificType;