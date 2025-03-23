# The Energy Map

A modern web application for visualizing IoT device energy data on a world map with interactive filters and charts.

## Features

- Interactive world map showing active and passive IoT devices
- Filter devices by:
  - Data source (Company/Public)
  - Time range (Last 24 hours/Last month)
  - Alert status
  - Vehicle type (Car, Truck, Bus, Motorcycle, Drone)
- Real-time visualization of:
  - Device temperature data (including alerts for temperatures > 50°C)
  - Battery charge levels (including critical levels < 5%)
- Interactive charts showing:
  - Device status distribution (active vs passive)
  - Battery charge distribution
  - Temperature distribution
- Responsive design for all screen sizes
- Login page for accessing the dashboard

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Mapbox GL JS access token

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd energy-map
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Mapbox access token:
```
VITE_MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoiYXNoZW5vY3RpcyIsImEiOiJja3NqMno4MHAwMHY4MnludTVleThmNGswIn0.zZzRs916H3-OP-lWzx5Mmw
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Mock Data

The application includes mock data for demonstration purposes:
- 100 devices with temperature over 50°C (red alerts)
- 500 devices with battery charge around 5% (critical battery)
- 500 devices with battery charge between 60-80%
- A mix of active and passive devices distributed worldwide

## Project Structure

```
src/
├── components/         # React components
│   ├── FilterPanel.tsx # Filter controls
│   ├── WorldMap.tsx    # Map visualization
│   └── ChartPanel.tsx  # Data charts
├── pages/              # Application pages
│   ├── Home.tsx        # Login page
│   └── Dashboard.tsx   # Main dashboard
├── data/               # Mock data
│   └── mockData.ts     # Generates mock IoT device data
└── types/              # TypeScript type definitions
    └── index.ts        # Shared types
```

## Technologies Used

- React
- TypeScript
- Vite
- React Router
- Mapbox GL JS
- Material-UI
- Chart.js
- React Chart.js 2

## License

MIT
