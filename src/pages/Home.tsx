import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // In a real app, this would trigger authentication
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(to right bottom, #051937, #004d7a, #008793, #00bf72, #a8eb12)',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={10}
          sx={{
            padding: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(24, 24, 24, 0.9)',
            color: 'white',
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" sx={{ color: '#2196f3' }}>
            The Energy Map
          </Typography>
          
          <Typography variant="h5" component="h2" gutterBottom textAlign="center" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.8)' }}>
            Monitor and analyze IoT device energy data from around the world
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
              sx={{ 
                px: 4, 
                py: 1.5, 
                fontSize: '1.2rem',
                backgroundColor: '#2196f3',
                '&:hover': {
                  backgroundColor: '#1976d2',
                } 
              }}
            >
              Login to Dashboard
            </Button>
            
            <Button 
              variant="outlined" 
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5, 
                fontSize: '1.2rem',
                borderColor: '#2196f3',
                color: '#2196f3',
                '&:hover': {
                  borderColor: '#1976d2',
                  color: '#1976d2',
                }
              }}
            >
              Learn More
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Home; 