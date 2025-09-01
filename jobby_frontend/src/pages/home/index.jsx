import React from 'react'
import { Box, Typography } from '@mui/material';
import { Button as CustomButton  } from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
   <Box className='flex flex-col gap-4 w-full h-full px-20 py-10'>
     <Box className='flex flex-col gap-6 items-start h-full'>
      <Box className='flex flex-col gap-6 w-1/2 h-full items-start justify-center'>
        <Typography style={{fontSize: "60px"}} className='font-bold text-white'>Find the job that fits your life!</Typography>
        <Typography style={{fontSize: "20px"}} className='text-2xl font-bold text-white'>Millions of people are searching for jobs, salary information, company reviews. Find the job that fits your abilities and potential.</Typography>
      </Box>
      <CustomButton label="Find Jobs" onClick={() => navigate('/jobs')} className='w-24'/>
    </Box>
   </Box>
  )
}

export default HomePage;
