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
import { getFilteredDevices, getChartData } from '../data/mockData';

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

// Custom chart options for dark theme
const darkThemeOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: 'rgba(255, 255, 255, 0.87)',
        font: {
          size: 12
        }
      }
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
      ticks: {
        color: 'rgba(255, 255, 255, 0.6)'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    },
    y: {
      ticks: {
        color: 'rgba(255, 255, 255, 0.6)'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    }
  }
};

interface ChartPanelProps {
  filters: FilterOptions;
}

const ChartPanel = ({ filters }: ChartPanelProps) => {
  // Get filtered devices and chart data
  const filteredDevices = getFilteredDevices(filters);
  const chartData = getChartData(filteredDevices);

  // Device status data
  const deviceStatusData = {
    labels: ['Active', 'Passive'],
    datasets: [
      {
        data: [chartData.deviceStatus.active, chartData.deviceStatus.passive],
        backgroundColor: ['#4CAF50', '#FFC107'],
      },
    ],
  };

  // Battery charge distribution
  const batteryChargeData = {
    labels: ['Critical (<10%)', 'Low (10-30%)', 'Medium (30-60%)', 'High (60-90%)', 'Full (90-100%)'],
    datasets: [
      {
        data: [
          chartData.batteryCharge.critical,
          chartData.batteryCharge.low,
          chartData.batteryCharge.medium,
          chartData.batteryCharge.high,
          chartData.batteryCharge.full
        ],
        backgroundColor: ['#F44336', '#FF9800', '#FFEB3B', '#8BC34A', '#4CAF50'],
      },
    ],
  };

  // Temperature distribution data
  const temperatureData = {
    labels: ['Very Low (<10°C)', 'Low (10-20°C)', 'Normal (20-35°C)', 'High (35-50°C)', 'Very High (>50°C)'],
    datasets: [
      {
        label: 'Temperature Distribution',
        data: [
          chartData.tempDistribution.veryLow,
          chartData.tempDistribution.low,
          chartData.tempDistribution.normal,
          chartData.tempDistribution.high,
          chartData.tempDistribution.veryHigh
        ],
        backgroundColor: ['#2196F3', '#03A9F4', '#4CAF50', '#FF9800', '#F44336'],
      },
    ],
  };

  const pieOptions = {
    ...darkThemeOptions,
    plugins: {
      ...darkThemeOptions.plugins,
      legend: {
        ...darkThemeOptions.plugins.legend,
        position: 'right' as const,
      }
    }
  };

  return (
    <Paper sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', fontWeight: 500 }}>
            Device Status Distribution
          </Typography>
          <Box sx={{ height: 250 }}>
            <Pie data={deviceStatusData} options={pieOptions} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', fontWeight: 500 }}>
            Battery Charge Distribution
          </Typography>
          <Box sx={{ height: 250 }}>
            <Pie data={batteryChargeData} options={pieOptions} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', fontWeight: 500 }}>
            Temperature Distribution
          </Typography>
          <Box sx={{ height: 250 }}>
            <Bar data={temperatureData} options={darkThemeOptions} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChartPanel; 