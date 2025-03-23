import { Box, Paper, Grid, Typography } from '@mui/material';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
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
  Filler
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
  Legend,
  Filler
);

// Custom chart options for dark theme
const darkThemeOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: 'rgba(255, 255, 255, 0.87)',
        font: {
          size: 10,
          family: "'Poppins', sans-serif"
        },
        padding: 8,
        boxWidth: 12,
        boxHeight: 12
      }
    },
    tooltip: {
      backgroundColor: 'rgba(30, 30, 30, 0.9)',
      titleColor: 'rgba(255, 255, 255, 0.87)',
      bodyColor: 'rgba(255, 255, 255, 0.87)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      padding: 8,
      boxPadding: 4,
      usePointStyle: true,
      titleFont: { 
        size: 11,
        family: "'Poppins', sans-serif"
      },
      bodyFont: { 
        size: 11,
        family: "'Poppins', sans-serif"
      }
    }
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.6)',
        font: { 
          size: 10,
          family: "'Poppins', sans-serif"
        }
      }
    },
    y: {
      display: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
        drawBorder: false
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.6)',
        font: { 
          size: 10,
          family: "'Poppins', sans-serif"
        }
      }
    }
  }
};

interface ChartPanelProps {
  filters: FilterOptions;
}

const ChartPanel = ({ filters }: ChartPanelProps) => {
  const filteredDevices = getFilteredDevices(filters);
  const chartData = getChartData(filteredDevices);

  // Device status data
  const deviceStatusData = {
    labels: ['Active', 'Passive'],
    datasets: [
      {
        data: [chartData.deviceStatus.active, chartData.deviceStatus.passive],
        backgroundColor: ['#4CAF50', '#FFC107'],
        borderWidth: 0,
        borderRadius: 4
      }
    ]
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
        borderWidth: 0,
        borderRadius: 4
      }
    ]
  };

  // Temperature distribution data
  const temperatureData = {
    labels: ['Very Low (<10°C)', 'Low (10-20°C)', 'Normal (20-35°C)', 'High (35-50°C)', 'Very High (>50°C)'],
    datasets: [
      {
        label: 'Temperature Distribution',
        data: [
          chartData.tempRanges.veryLow.count,
          chartData.tempRanges.low.count,
          chartData.tempRanges.normal.count,
          chartData.tempRanges.high.count,
          chartData.tempRanges.veryHigh.count
        ],
        backgroundColor: ['#2196F3', '#03A9F4', '#4CAF50', '#FF9800', '#F44336'],
        borderWidth: 0,
        borderRadius: 4
      }
    ]
  };

  // Vehicle type distribution
  const vehicleTypeData = {
    labels: Object.keys(chartData.vehicleTypeData),
    datasets: [
      {
        data: Object.values(chartData.vehicleTypeData),
        backgroundColor: [
          '#2196F3', '#4CAF50', '#FFC107', '#FF5722',
          '#9C27B0', '#3F51B5', '#009688', '#795548'
        ],
        borderWidth: 0,
        borderRadius: 4
      }
    ]
  };

  // Data source distribution
  const dataSourceData = {
    labels: ['Company', 'Public'],
    datasets: [
      {
        data: [chartData.dataSourceDistribution.company, chartData.dataSourceDistribution.public],
        backgroundColor: ['#3F51B5', '#009688'],
        borderWidth: 0,
        borderRadius: 4
      }
    ]
  };

  const pieOptions = {
    ...darkThemeOptions,
    plugins: {
      ...darkThemeOptions.plugins,
      legend: {
        ...darkThemeOptions.plugins.legend,
        position: 'right' as const
      }
    }
  };

  const doughnutOptions = {
    ...darkThemeOptions,
    cutout: '60%',
    plugins: {
      ...darkThemeOptions.plugins,
      legend: {
        ...darkThemeOptions.plugins.legend,
        position: 'right' as const
      }
    }
  };

  return (
    <Box sx={{ 
      height: '100%', 
      width: '100%',
      overflow: 'hidden',
      p: 3,
      fontFamily: "'Poppins', sans-serif"
    }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        {/* First Row */}
        <Grid item xs={12} md={8} sx={{ height: '48%' }}>
          <Paper sx={{ 
            p: 3, 
            height: '100%', 
            bgcolor: 'rgba(255, 255, 255, 0.1)', 
            backdropFilter: 'blur(10px)', 
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "'Poppins', sans-serif"
          }}>
            <Typography variant="h6" sx={{ mb: 1, fontFamily: "'Poppins', sans-serif" }}>
              Temperature Distribution
            </Typography>
            <Box sx={{ flex: 1, position: 'relative', minHeight: 0 }}>
              <Bar data={temperatureData} options={{
                ...darkThemeOptions,
                maintainAspectRatio: false,
                plugins: {
                  ...darkThemeOptions.plugins,
                  legend: {
                    ...darkThemeOptions.plugins.legend,
                    display: true,
                    position: 'bottom'
                  }
                },
                scales: {
                  ...darkThemeOptions.scales,
                  x: {
                    ...darkThemeOptions.scales.x,
                    display: true
                  },
                  y: {
                    ...darkThemeOptions.scales.y,
                    display: true
                  }
                }
              }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} sx={{ height: '48%' }}>
          <Paper sx={{ 
            p: 3, 
            height: '100%', 
            bgcolor: 'rgba(255, 255, 255, 0.1)', 
            backdropFilter: 'blur(10px)', 
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "'Poppins', sans-serif"
          }}>
            <Typography variant="h6" sx={{ mb: 1, fontFamily: "'Poppins', sans-serif" }}>
              Device Status
            </Typography>
            <Box sx={{ flex: 1, display: 'flex', minHeight: 0 }}>
              <Box sx={{ flex: 1, position: 'relative' }}>
                <Doughnut data={deviceStatusData} options={{
                  ...doughnutOptions,
                  maintainAspectRatio: false
                }} />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Second Row */}
        <Grid item xs={12} md={4} sx={{ height: '48%' }}>
          <Paper sx={{ 
            p: 3, 
            height: '100%', 
            bgcolor: 'rgba(255, 255, 255, 0.1)', 
            backdropFilter: 'blur(10px)', 
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "'Poppins', sans-serif"
          }}>
            <Typography variant="h6" sx={{ mb: 1, fontFamily: "'Poppins', sans-serif" }}>
              Battery Distribution
            </Typography>
            <Box sx={{ flex: 1, position: 'relative', minHeight: 0 }}>
              <Doughnut data={batteryChargeData} options={{
                ...doughnutOptions,
                maintainAspectRatio: false,
                plugins: {
                  ...doughnutOptions.plugins,
                  legend: {
                    ...doughnutOptions.plugins.legend,
                    position: 'right'
                  }
                }
              }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} sx={{ height: '48%' }}>
          <Paper sx={{ 
            p: 3, 
            height: '100%', 
            bgcolor: 'rgba(255, 255, 255, 0.1)', 
            backdropFilter: 'blur(10px)', 
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "'Poppins', sans-serif"
          }}>
            <Typography variant="h6" sx={{ mb: 1, fontFamily: "'Poppins', sans-serif" }}>
              Vehicle Types & Data Sources
            </Typography>
            <Box sx={{ flex: 1, display: 'flex', minHeight: 0 }}>
              <Box sx={{ flex: 2, position: 'relative' }}>
                <Doughnut data={vehicleTypeData} options={{
                  ...doughnutOptions,
                  maintainAspectRatio: false,
                  plugins: {
                    ...doughnutOptions.plugins,
                    legend: {
                      ...doughnutOptions.plugins.legend,
                      position: 'right'
                    }
                  }
                }} />
              </Box>
              <Box sx={{ flex: 1, position: 'relative', ml: 3 }}>
                <Doughnut data={dataSourceData} options={{
                  ...doughnutOptions,
                  maintainAspectRatio: false,
                  plugins: {
                    ...doughnutOptions.plugins,
                    legend: {
                      ...doughnutOptions.plugins.legend,
                      position: 'right'
                    }
                  }
                }} />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChartPanel; 