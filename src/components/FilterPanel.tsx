import { Box, Paper, FormGroup, FormControlLabel, Checkbox, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { FilterOptions } from '../types';

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

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
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
            />
          }
          label="Show Alerts"
        />
      </Box>
    </Paper>
  );
};

export default FilterPanel; 