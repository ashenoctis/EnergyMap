import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  AppBar, 
  Toolbar, 
  Button, 
  IconButton, 
  Paper, 
  Slider, 
  FormControlLabel, 
  Checkbox, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl,
  Tabs,
  Tab,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PowerIcon from '@mui/icons-material/Power';
import FilterListIcon from '@mui/icons-material/FilterList';
import WorldMap from '../components/WorldMap';
import ChartPanel from '../components/ChartPanel';
import MyDevices from './MyDevices';
import { FilterOptions } from '../types';
import { vehicleTypes } from '../data/mockData';

function Dashboard() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [filters, setFilters] = useState<FilterOptions>({
    geography: [],
    vehicleTypes: [],
    timeRange: '24h',
    showAlerts: false,
    dataSource: ['company', 'public'],
    batteryPercentage: [0, 100],
    temperature: [0, 100],
    activeType: 'all',
  });

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      bgcolor: '#121212',
      color: 'white'
    }}>
      <AppBar position="static" color="transparent" sx={{ boxShadow: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <Toolbar>
          <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
            The Energy Map
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
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="All Data" />
          <Tab label="Company Data" />
          <Tab label="Public Data" />
          <Tab label="My Devices" />
        </Tabs>
      </AppBar>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 112px)', overflow: 'hidden' }}>
        {tabValue !== 3 ? (
          <>
            <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
              <Paper 
                sx={{ 
                  width: '280px', 
                  p: 3, 
                  bgcolor: 'rgba(255, 255, 255, 0.1)', 
                  backdropFilter: 'blur(10px)', 
                  borderRadius: '12px', 
                  color: 'white',
                  m: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  overflowY: 'auto'
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FilterListIcon /> Filters
                </Typography>

                <Stack spacing={3}>
                  {/* Data Source Filter */}
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>Data Source</Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label="Company"
                        clickable
                        color={filters.dataSource.includes('company') ? 'primary' : 'default'}
                        onClick={() => {
                          const newDataSource = filters.dataSource.includes('company')
                            ? filters.dataSource.filter(s => s !== 'company')
                            : [...filters.dataSource, 'company'] as ('company' | 'public')[];
                          handleFilterChange({ ...filters, dataSource: newDataSource });
                        }}
                      />
                      <Chip
                        label="Public"
                        clickable
                        color={filters.dataSource.includes('public') ? 'primary' : 'default'}
                        onClick={() => {
                          const newDataSource = filters.dataSource.includes('public')
                            ? filters.dataSource.filter(s => s !== 'public')
                            : [...filters.dataSource, 'public'] as ('company' | 'public')[];
                          handleFilterChange({ ...filters, dataSource: newDataSource });
                        }}
                      />
                    </Stack>
                  </Box>

                  <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />

                  {/* Battery Range Filter */}
                  <Box>
                    <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <BatteryFullIcon fontSize="small" /> Battery Level
                    </Typography>
                    <Slider
                      value={filters.batteryPercentage}
                      onChange={(e, newValue) => handleFilterChange({ ...filters, batteryPercentage: newValue as [number, number] })}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                      sx={{ color: '#2196f3' }}
                    />
                  </Box>

                  {/* Temperature Range Filter */}
                  <Box>
                    <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <DeviceThermostatIcon fontSize="small" /> Temperature
                    </Typography>
                    <Slider
                      value={filters.temperature}
                      onChange={(e, newValue) => handleFilterChange({ ...filters, temperature: newValue as [number, number] })}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                      sx={{ color: '#f44336' }}
                    />
                  </Box>

                  <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />

                  {/* Time Range Filter */}
                  <Box>
                    <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TimelineIcon fontSize="small" /> Time Range
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      {['24h', '7d', '1m'].map((range) => (
                        <Chip
                          key={range}
                          label={range === '24h' ? '24 Hours' : range === '7d' ? '7 Days' : '1 Month'}
                          clickable
                          color={filters.timeRange === range ? 'primary' : 'default'}
                          onClick={() => handleFilterChange({ ...filters, timeRange: range as '24h' | '7d' | '1m' })}
                          size="small"
                        />
                      ))}
                    </Stack>
                  </Box>

                  {/* Vehicle Type Filter */}
                  <Box>
                    <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocalShippingIcon fontSize="small" /> Vehicle Type
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {vehicleTypes.map((vehicleType: string) => (
                        <Chip
                          key={vehicleType}
                          label={vehicleType}
                          clickable
                          size="small"
                          color={filters.vehicleTypes.includes(vehicleType) ? 'primary' : 'default'}
                          onClick={() => {
                            const newTypes = filters.vehicleTypes.includes(vehicleType)
                              ? filters.vehicleTypes.filter(t => t !== vehicleType)
                              : [...filters.vehicleTypes, vehicleType];
                            handleFilterChange({ ...filters, vehicleTypes: newTypes });
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Active Type Filter */}
                  <Box>
                    <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PowerIcon fontSize="small" /> Device Type
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      {['all', 'active', 'passive'].map((type) => (
                        <Chip
                          key={type}
                          label={type.charAt(0).toUpperCase() + type.slice(1)}
                          clickable
                          color={filters.activeType === type ? 'primary' : 'default'}
                          onClick={() => handleFilterChange({ ...filters, activeType: type as 'all' | 'active' | 'passive' })}
                          size="small"
                        />
                      ))}
                    </Stack>
                  </Box>

                  {/* Alert Filter */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filters.showAlerts}
                        onChange={(e) => handleFilterChange({ ...filters, showAlerts: e.target.checked })}
                        sx={{ 
                          color: '#f44336',
                          '&.Mui-checked': {
                            color: '#f44336',
                          }
                        }}
                      />
                    }
                    label={
                      <Typography variant="subtitle2" sx={{ color: filters.showAlerts ? '#f44336' : 'inherit' }}>
                        Show Alerts Only
                      </Typography>
                    }
                  />
                </Stack>
              </Paper>

              <Box sx={{ 
                flex: 1,
                height: '100%',
                overflow: 'auto',
                m: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}>
                {/* Map Container */}
                <Box sx={{ 
                  height: '70vh',
                  minHeight: '500px',
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <WorldMap filters={filters} />
                </Box>

                {/* Charts Container */}
                <Box sx={{ 
                  minHeight: '90vh',
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <ChartPanel filters={filters} />
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
            <MyDevices />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Dashboard; 