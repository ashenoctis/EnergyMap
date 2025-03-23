import { useState } from 'react'
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import WorldMap from './components/WorldMap'
import FilterPanel from './components/FilterPanel'
import ChartPanel from './components/ChartPanel'
import { FilterOptions } from './types'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
})

function App() {
  const [filters, setFilters] = useState<FilterOptions>({
    geography: [],
    vehicleTypes: [],
    timeRange: '24h',
    showAlerts: false,
    dataSource: ['company', 'public'],
  })

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false} sx={{ height: '100vh', py: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 2 }}>
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
          <Box sx={{ flex: 1, minHeight: 0 }}>
            <WorldMap filters={filters} />
          </Box>
          <ChartPanel filters={filters} />
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
