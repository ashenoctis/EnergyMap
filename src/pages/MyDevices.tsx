import React from 'react';
import { Box, Typography, Paper, Grid, Container, AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { Line, Doughnut } from 'react-chartjs-2';
import LogoutIcon from '@mui/icons-material/Logout';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { IoTDevice } from '../types';
import { devices } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const MyDevices: React.FC = () => {
  const navigate = useNavigate();
  const myDevices: IoTDevice[] = devices.slice(0, 4);

  // Generate mock data for battery health chart
  const generateBatteryData = () => {
    const labels = ['6h ago', '5h ago', '4h ago', '3h ago', '2h ago', '1h ago', 'Now'];
    const data = labels.map(() => Math.floor(Math.random() * (100 - 60) + 60));
    return { labels, data };
  };

  // Calculate device status distribution
  const statusDistribution = {
    normal: myDevices.filter(d => d.status === 'normal').length,
    alert: myDevices.filter(d => d.status === 'alert').length
  };

  const donutData = {
    labels: ['Normal', 'Alert'],
    datasets: [
      {
        data: [statusDistribution.normal, statusDistribution.alert],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderWidth: 0
      }
    ]
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'white',
          font: {
            size: 12
          }
        }
      }
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(30, 30, 30, 0.9)',
        titleColor: 'rgba(255, 255, 255, 0.87)',
        bodyColor: 'rgba(255, 255, 255, 0.87)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false,
        min: 0,
        max: 100
      }
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      bgcolor: '#121212',
      color: 'white'
    }}>
      <AppBar position="static" color="transparent" sx={{ boxShadow: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <Toolbar>
          <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
            Connected IoT Devices
          </Typography>
          <Button 
            color="primary" 
            startIcon={<LightbulbIcon />} 
            sx={{ mr: 2 }}
          >
            AI Recommendations
          </Button>
          <IconButton color="primary" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ width: '80%', py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ 
              p: 3, 
              bgcolor: 'rgba(255, 255, 255, 0.1)', 
              backdropFilter: 'blur(10px)', 
              borderRadius: '8px',
              height: '300px'
            }}>
              <Typography variant="h6" gutterBottom>
                Device Status Distribution
              </Typography>
              <Box sx={{ height: '220px' }}>
                <Doughnut data={donutData} options={donutOptions} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ width: '100%' }}>
              {myDevices.map((device) => {
                const batteryData = generateBatteryData();
                const chartData = {
                  labels: batteryData.labels,
                  datasets: [
                    {
                      data: batteryData.data,
                      borderColor: '#2196f3',
                      backgroundColor: 'rgba(33, 150, 243, 0.1)',
                      tension: 0.4,
                      fill: true
                    }
                  ]
                };

                return (
                  <Paper 
                    key={device.id} 
                    sx={{ 
                      p: 2, 
                      mb: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.1)', 
                      backdropFilter: 'blur(10px)', 
                      borderRadius: '8px', 
                      color: 'white'
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={3}>
                        <Typography variant="h6">{device.name}</Typography>
                        <Typography variant="body2">Status: {device.status}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body2">Battery: {device.batteryCharge}%</Typography>
                        <Typography variant="body2">Temperature: {device.temperature?.current}°C</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ height: '80px' }}>
                          <Line data={chartData} options={chartOptions} />
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MyDevices;