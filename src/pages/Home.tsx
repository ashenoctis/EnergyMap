import { Box, Button, Container, Typography, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../assets/IoT.avif';
import energyImage from '../assets/IoT2.avif';
import iotImage from '../assets/energy.avif';

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Glass effect
            backdropFilter: 'blur(10px)', // Blur effect for glass
            borderRadius: '8px',
            color: 'white',
            transition: 'box-shadow 0.3s',
            border: '1px solid rgba(255, 255, 255, 0.2)', // Subtle border
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            fontWeight="bold" 
            sx={{ 
              background: 'linear-gradient(90deg, #2196f3, #00bf72)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}
          >
            The Energy Map
          </Typography>
          
          <Typography variant="h5" component="h2" gutterBottom textAlign="center" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.8)' }}>
            Monitor and analyze IoT device energy data from around the world
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <img src={energyImage} alt="Energy" style={{ width: '100%', borderRadius: '8px' }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <img src={iotImage} alt="IoT Devices" style={{ width: '100%', borderRadius: '8px' }} />
            </Grid>
          </Grid>

          <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center' }}>
            The Energy Map provides real-time insights into the performance and status of IoT devices across the globe. 
            With our interactive dashboard, you can filter data by various parameters, visualize trends, and make informed decisions.
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