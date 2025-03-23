import { useState } from 'react';
import { Box, Container, CssBaseline, Typography, Tabs, Tab, AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import WorldMap from '../components/WorldMap';
import FilterPanel from '../components/FilterPanel';
import ChartPanel from '../components/ChartPanel';
import { FilterOptions } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{ height: '100%' }}
    >
      {value === index && (
        <Box sx={{ height: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [filters, setFilters] = useState<FilterOptions>({
    geography: [],
    vehicleTypes: [],
    timeRange: '24h',
    showAlerts: false,
    dataSource: ['company', 'public'],
  });

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);

    // Update data source filter based on tab
    let dataSource: ('company' | 'public')[] = [];
    
    switch(newValue) {
      case 0: // All Data
        dataSource = ['company', 'public'];
        break;
      case 1: // Company Data
        dataSource = ['company'];
        break;
      case 2: // Public Data
        dataSource = ['public'];
        break;
      case 3: // My Devices - custom filter would be applied in a real app
        dataSource = ['company']; // For demo purposes, showing company data
        break;
    }

    setFilters({
      ...filters,
      dataSource,
    });
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
      
      <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TabPanel value={tabValue} index={0}>
          <DisplayContent filters={filters} onFilterChange={handleFilterChange} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <DisplayContent filters={filters} onFilterChange={handleFilterChange} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <DisplayContent filters={filters} onFilterChange={handleFilterChange} />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <DisplayContent filters={filters} onFilterChange={handleFilterChange} />
        </TabPanel>
      </Box>
    </Box>
  );
}

// Component to display content within each tab
function DisplayContent({ 
  filters, 
  onFilterChange 
}: { 
  filters: FilterOptions; 
  onFilterChange: (filters: FilterOptions) => void 
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 2 }}>
      <FilterPanel filters={filters} onFilterChange={onFilterChange} />
      <Box sx={{ flex: 1, minHeight: 0, borderRadius: 1, overflow: 'hidden', position: 'relative' }}>
        <WorldMap filters={filters} />
      </Box>
      <ChartPanel filters={filters} />
    </Box>
  );
}

export default Dashboard; 