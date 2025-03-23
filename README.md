# IoT Device World Map

A modern web application for visualizing IoT devices on a world map with interactive filters and charts.

## Features

- Interactive world map showing active and passive IoT devices
- Filter devices by:
  - Data source (Company/Public)
  - Time range (Last 24 hours/Last month)
  - Alert status
- Pre-defined charts showing:
  - Device status distribution
  - Device activity over time
  - Alert distribution
- Real-time updates based on filter selections
- Responsive design for all screen sizes

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Mapbox GL JS access token

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd energymap
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Mapbox access token:
```
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## API Integration

The application expects an API endpoint at `/api/iot-devices` that returns IoT device data in the following format:

```typescript
interface IoTDevice {
  id: string;
  name: string;
  type: 'active' | 'passive';
  location: {
    lat: number;
    lng: number;
  };
  dataSource: 'company' | 'public';
  lastUpdate: Date;
  status: 'normal' | 'alert';
  vehicleType?: string;
}
```

## Technologies Used

- React
- TypeScript
- Vite
- Mapbox GL JS
- Material-UI
- Chart.js
- React Chart.js 2

## License

MIT
