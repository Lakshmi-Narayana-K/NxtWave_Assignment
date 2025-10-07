import React from 'react'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import NotFound from '../../assets/not-found.jpg'
import { ArrowRightOutlined } from '@mui/icons-material'

const NotFoundPage = () => {
  return (
    <Box className="flex flex-col gap-4 items-center justify-center h-screen">
      <img src={NotFound} alt="Not Found" className="w-1/3" />
      <Link to="/" className='text-white text-sm flex items-center gap-2'>
        Go to Home
        <ArrowRightOutlined style={{ fontSize: '20px' , color: 'white'}}/>
      </Link>
    </Box>
  )
}

export default NotFoundPage;