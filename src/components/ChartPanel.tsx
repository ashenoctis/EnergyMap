import { Box, Paper, Grid, Typography } from '@mui/material';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FilterOptions } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartPanelProps {
  filters: FilterOptions;
}

const ChartPanel = ({ }: ChartPanelProps) => {
  // Example data - replace with actual data from your API
  const deviceStatusData = {
    labels: ['Active', 'Passive'],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ['#4CAF50', '#FFC107'],
      },
    ],
  };

  const timeSeriesData = {
    labels: ['00:00', '06:00', '12:00', '18:00', '24:00'],
    datasets: [
      {
        label: 'Active Devices',
        data: [65, 59, 80, 81, 56],
        borderColor: '#4CAF50',
        tension: 0.1,
      },
      {
        label: 'Passive Devices',
        data: [28, 48, 40, 19, 86],
        borderColor: '#FFC107',
        tension: 0.1,
      },
    ],
  };

  const alertData = {
    labels: ['Critical', 'Warning', 'Info'],
    datasets: [
      {
        data: [12, 19, 3],
        backgroundColor: ['#F44336', '#FF9800', '#2196F3'],
      },
    ],
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Device Status Distribution
          </Typography>
          <Box sx={{ height: 300 }}>
            <Pie data={deviceStatusData} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Device Activity Over Time
          </Typography>
          <Box sx={{ height: 300 }}>
            <Line data={timeSeriesData} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Alert Distribution
          </Typography>
          <Box sx={{ height: 300 }}>
            <Bar data={alertData} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChartPanel; 