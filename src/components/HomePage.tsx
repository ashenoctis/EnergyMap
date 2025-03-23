import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#242424',
        color: 'white',
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to The Energy Map
      </Typography>
      <Button variant="contained" onClick={handleLogin}>
        Login to Dashboard
      </Button>
    </Box>
  );
};

export default HomePage; 