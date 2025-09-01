import React from 'react'
import { Box, Typography } from '@mui/material';
import JobbyLogo from '../../assets/jobby-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Button as CustomButton  } from '../../components/Button';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/modules/user';

export const Header = ( { isLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 


  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }
    
  return (
  <Box style={{ display: isLoggedIn ? 'flex' : 'none' }} className='flex justify-between items-center py-4 px-10 bg-gray-800'>
    <Box className="flex items-center justify-center gap-2 h-auto">
            <img src={JobbyLogo} alt="Jobby Logo" style={{ width: "40px", height: "40px" }} />
            <Typography className="text-[#00969b] text-2xl font-serif">Jobby</Typography>
          </Box>
    <Box className='flex items-center gap-4'>
      <Link to="/" className='text-white text-sm'>
        <Typography className='text-white text-sm'>Home</Typography>
      </Link>
      <Link to="/jobs" className='text-white text-sm'>
      <Typography className='text-white text-sm'>Jobs</Typography>
      </Link>
    </Box>
    {isLoggedIn ? <CustomButton label="Logout" onClick={handleLogout}/> : <CustomButton label="Login" onClick={() => navigate('/login')}/>}
  </Box>
  )
}

export default Header;


