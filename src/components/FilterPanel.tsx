import { Box, Paper, FormGroup, FormControlLabel, Checkbox, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import { FilterOptions } from '../types';

const vehicleTypes = ['Car', 'Truck', 'Bus', 'Motorcycle', 'Drone'];

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterPanel = ({ filters, onFilterChange }: FilterPanelProps) => {
  const handleDataSourceChange = (source: 'company' | 'public') => {
    const newDataSources = filters.dataSource.includes(source)
      ? filters.dataSource.filter(s => s !== source)
      : [...filters.dataSource, source];
    
    onFilterChange({
      ...filters,
      dataSource: newDataSources,
    });
  };

  const handleTimeRangeChange = (range: '24h' | '1m') => {
    onFilterChange({
      ...filters,
      timeRange: range,
    });
  };

  const handleAlertChange = (show: boolean) => {
    onFilterChange({
      ...filters,
      showAlerts: show,
    });
  };

  const handleVehicleTypeChange = (vehicleType: string) => {
    const newVehicleTypes = filters.vehicleTypes.includes(vehicleType)
      ? filters.vehicleTypes.filter(t => t !== vehicleType)
      : [...filters.vehicleTypes, vehicleType];
    
    onFilterChange({
      ...filters,
      vehicleTypes: newVehicleTypes,
    });
  };

  return (
    <Paper sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'start', flexWrap: 'wrap' }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.dataSource.includes('company')}
                onChange={() => handleDataSourceChange('company')}
              />
            }
            label="Company Data"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.dataSource.includes('public')}
                onChange={() => handleDataSourceChange('public')}
              />
            }
            label="Public Data"
          />
        </FormGroup>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={filters.timeRange}
            label="Time Range"
            size="small"
            onChange={(e) => handleTimeRangeChange(e.target.value as '24h' | '1m')}
          >
            <MenuItem value="24h">Last 24 Hours</MenuItem>
            <MenuItem value="1m">Last Month</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={filters.showAlerts}
              onChange={(e) => handleAlertChange(e.target.checked)}
              sx={{ color: '#F44336', '&.Mui-checked': { color: '#F44336' } }}
            />
          }
          label="Red Alerts"
        />

        <Box>
          <InputLabel sx={{ mb: 1, fontSize: '0.875rem' }}>Vehicle Types</InputLabel>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {vehicleTypes.map((type) => (
              <Chip
                key={type}
                label={type}
                clickable
                color={filters.vehicleTypes.includes(type) ? 'primary' : 'default'}
                onClick={() => handleVehicleTypeChange(type)}
                size="small"
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default FilterPanel; 