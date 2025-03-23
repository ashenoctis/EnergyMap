import { IoTDevice, FilterOptions } from '../types';

type Region = 'northAmerica' | 'europe' | 'eastAsia' | 'southeastAsia' | 'australia' | 'southAmerica' | 'africa';

// Global city names by region
const globalCities: Record<Region, string[]> = {
  northAmerica: [
    'New York', 'Los Angeles', 'Chicago', 'Toronto', 'Vancouver',
    'San Francisco', 'Miami', 'Houston', 'Montreal', 'Seattle'
  ],
  europe: [
    'London', 'Paris', 'Berlin', 'Madrid', 'Rome',
    'Amsterdam', 'Stockholm', 'Vienna', 'Prague', 'Copenhagen'
  ],
  eastAsia: [
    'Tokyo', 'Seoul', 'Beijing', 'Shanghai', 'Hong Kong',
    'Osaka', 'Taipei', 'Shenzhen', 'Guangzhou', 'Busan'
  ],
  southeastAsia: [
    'Singapore', 'Bangkok', 'Jakarta', 'Manila', 'Kuala Lumpur',
    'Ho Chi Minh City', 'Hanoi', 'Yangon', 'Phnom Penh', 'Bandung'
  ],
  australia: [
    'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide',
    'Gold Coast', 'Canberra', 'Newcastle', 'Darwin', 'Hobart'
  ],
  southAmerica: [
    'São Paulo', 'Buenos Aires', 'Rio de Janeiro', 'Lima', 'Bogotá',
    'Santiago', 'Caracas', 'Montevideo', 'Quito', 'Medellín'
  ],
  africa: [
    'Cairo', 'Lagos', 'Johannesburg', 'Nairobi', 'Cape Town',
    'Casablanca', 'Accra', 'Addis Ababa', 'Dar es Salaam', 'Khartoum'
  ]
};

// Helper function to generate random coordinates within India
const getRandomIndiaCoords = () => {
  // India's regions with their approximate bounds
  const regions = [
    // North India
    { minLat: 28.0, maxLat: 37.6, minLng: 72.0, maxLng: 89.0 },
    // South India
    { minLat: 8.4, maxLat: 20.0, minLng: 74.0, maxLng: 84.0 },
    // East India
    { minLat: 21.0, maxLat: 27.0, minLng: 84.0, maxLng: 97.25 },
    // West India
    { minLat: 20.0, maxLat: 28.0, minLng: 68.7, maxLng: 77.0 },
    // Central India
    { minLat: 20.0, maxLat: 28.0, minLng: 77.0, maxLng: 84.0 }
  ];
  
  // Select a random region
  const region = regions[Math.floor(Math.random() * regions.length)];
  
  return {
    lat: region.minLat + Math.random() * (region.maxLat - region.minLat),
    lng: region.minLng + Math.random() * (region.maxLng - region.minLng)
  };
};

// Helper function to generate random coordinates globally (focused on populated areas)
const getRandomGlobalCoords = (): { region: Region; lat: number; lng: number } => {
  // Define major regions with their approximate bounds
  const regions: Array<{ name: Region; minLat: number; maxLat: number; minLng: number; maxLng: number }> = [
    { name: 'northAmerica', minLat: 25, maxLat: 50, minLng: -125, maxLng: -70 },
    { name: 'europe', minLat: 35, maxLat: 60, minLng: -10, maxLng: 40 },
    { name: 'eastAsia', minLat: 20, maxLat: 45, minLng: 100, maxLng: 145 },
    { name: 'southeastAsia', minLat: -10, maxLat: 20, minLng: 95, maxLng: 140 },
    { name: 'australia', minLat: -40, maxLat: -10, minLng: 110, maxLng: 155 },
    { name: 'southAmerica', minLat: -35, maxLat: 5, minLng: -80, maxLng: -35 },
    { name: 'africa', minLat: -35, maxLat: 35, minLng: -20, maxLng: 50 }
  ];

  // Select a random region
  const region = regions[Math.floor(Math.random() * regions.length)];
  
  return {
    region: region.name,
    lat: region.minLat + Math.random() * (region.maxLat - region.minLat),
    lng: region.minLng + Math.random() * (region.maxLng - region.minLng)
  };
};

// Helper function to generate a random recent date
const getRandomRecentDate = () => {
  const now = new Date();
  const hoursAgo = Math.floor(Math.random() * 24); // Random time within last 24 hours
  return new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
};

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Indian city names for more realistic device locations
const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
  'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad'
];

// Vehicle types with global context
export const vehicleTypes = [
  'Electric Car', 'Electric Scooter', 'Electric Bus', 'Solar Panel', 
  'Smart Grid', 'Wind Turbine', 'Battery Storage', 'EV Charging Station'
];

// Generate devices
const generateDevices = (): IoTDevice[] => {
  const devices: IoTDevice[] = [];

  // Generate Indian devices (35% of total)
  const indianDevicesCount = 1400;
  for (let i = 0; i < indianDevicesCount; i++) {
    const coords = getRandomIndiaCoords();
    const city = indianCities[Math.floor(Math.random() * indianCities.length)];
    const vehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
    
    // Generate temperature based on region and season
    const isAlert = Math.random() < 0.25; // 25% chance of alert
    const baseTemp = 28 + Math.random() * 12; // India's generally warmer climate
    const tempVariation = isAlert ? 20 + Math.random() * 15 : Math.random() * 10;
    const currentTemp = baseTemp + tempVariation;

    devices.push({
      id: generateId(),
      name: `${city} ${vehicleType} ${i + 1}`,
      type: Math.random() > 0.4 ? 'active' : 'passive', // More active devices in India
      location: coords,
      dataSource: Math.random() > 0.4 ? 'company' : 'public', // More company data in India
      lastUpdate: getRandomRecentDate(),
      status: isAlert ? 'alert' : 'normal',
      vehicleType: vehicleType,
      temperature: {
        current: currentTemp,
        min: baseTemp - 5,
        max: currentTemp + 2
      },
      batteryCharge: Math.floor(Math.random() * 100)
    });
  }

  // Generate global devices (65% of total)
  const globalDevicesCount = 2600;
  for (let i = 0; i < globalDevicesCount; i++) {
    const { region, lat, lng } = getRandomGlobalCoords();
    const city = globalCities[region][Math.floor(Math.random() * globalCities[region].length)];
    const vehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
    
    // Adjust temperature based on region and season
    let baseTemp: number;
    const isAlert = Math.random() < 0.2; // 20% chance of alert
    
    if (region === 'northAmerica' || region === 'europe') {
      baseTemp = 15 + Math.random() * 10; // Cooler climate
    } else if (region === 'africa') {
      baseTemp = 30 + Math.random() * 10; // Hotter climate
    } else if (region === 'australia') {
      baseTemp = 25 + Math.random() * 15; // Warm climate
    } else {
      baseTemp = 20 + Math.random() * 15; // Moderate climate
    }
    
    const tempVariation = isAlert ? 20 + Math.random() * 20 : Math.random() * 15;
    const currentTemp = baseTemp + tempVariation;

    devices.push({
      id: generateId(),
      name: `${city} ${vehicleType} ${i + 1}`,
      type: Math.random() > 0.5 ? 'active' : 'passive',
      location: { lat, lng },
      dataSource: Math.random() > 0.5 ? 'company' : 'public',
      lastUpdate: getRandomRecentDate(),
      status: isAlert ? 'alert' : 'normal',
      vehicleType: vehicleType,
      temperature: {
        current: currentTemp,
        min: baseTemp - 5,
        max: currentTemp + 2
      },
      batteryCharge: Math.floor(Math.random() * 100)
    });
  }

  return devices;
};

export const devices = generateDevices();

// Get devices filtered by the current filters
export const getFilteredDevices = (filters: FilterOptions) => {
  return devices.filter(device => {
    // Filter by data source
    if (filters.dataSource.length > 0 && !filters.dataSource.includes(device.dataSource)) {
      return false;
    }
    
    // Filter by alerts
    if (filters.showAlerts && device.status !== 'alert') {
      return false;
    }
    
    // Filter by vehicle type
    if (filters.vehicleTypes.length > 0 && device.vehicleType && !filters.vehicleTypes.includes(device.vehicleType)) {
      return false;
    }
    
    // Filter by active type
    if (filters.activeType !== 'all' && device.type !== filters.activeType) {
      return false;
    }

    // Filter by battery percentage range
    if (device.batteryCharge !== undefined) {
      if (device.batteryCharge < filters.batteryPercentage[0] || 
          device.batteryCharge > filters.batteryPercentage[1]) {
        return false;
      }
    }

    // Filter by temperature range
    if (device.temperature?.current !== undefined) {
      if (device.temperature.current < filters.temperature[0] || 
          device.temperature.current > filters.temperature[1]) {
        return false;
      }
    }
    
    return true;
  });
};

// Function to get aggregated data for charts
export const getChartData = (devices: IoTDevice[]) => {
  // Device status distribution (active vs passive)
  const deviceStatus = {
    active: devices.filter(d => d.type === 'active').length,
    passive: devices.filter(d => d.type === 'passive').length
  };
  
  // Battery charge distribution
  const batteryCharge = {
    critical: devices.filter(d => d.batteryCharge !== undefined && d.batteryCharge < 10).length,
    low: devices.filter(d => d.batteryCharge !== undefined && d.batteryCharge >= 10 && d.batteryCharge < 30).length,
    medium: devices.filter(d => d.batteryCharge !== undefined && d.batteryCharge >= 30 && d.batteryCharge < 60).length,
    high: devices.filter(d => d.batteryCharge !== undefined && d.batteryCharge >= 60 && d.batteryCharge < 90).length,
    full: devices.filter(d => d.batteryCharge !== undefined && d.batteryCharge >= 90).length
  };
  
  // Temperature distribution
  const tempRanges = {
    veryLow: { min: -Infinity, max: 10, count: 0 },
    low: { min: 10, max: 20, count: 0 },
    normal: { min: 20, max: 35, count: 0 },
    high: { min: 35, max: 50, count: 0 },
    veryHigh: { min: 50, max: Infinity, count: 0 }
  };

  devices.forEach(device => {
    const temp = device.temperature?.current;
    if (temp !== undefined) {
      if (temp < tempRanges.veryLow.max) tempRanges.veryLow.count++;
      else if (temp < tempRanges.low.max) tempRanges.low.count++;
      else if (temp < tempRanges.normal.max) tempRanges.normal.count++;
      else if (temp < tempRanges.high.max) tempRanges.high.count++;
      else tempRanges.veryHigh.count++;
    }
  });

  // Vehicle type distribution
  const vehicleTypeData = vehicleTypes.reduce((acc, type) => {
    acc[type] = devices.filter(d => d.vehicleType === type).length;
    return acc;
  }, {} as Record<string, number>);

  // Data source distribution
  const dataSourceDistribution = {
    company: devices.filter(d => d.dataSource === 'company').length,
    public: devices.filter(d => d.dataSource === 'public').length
  };

  return {
    deviceStatus,
    batteryCharge,
    tempRanges,
    vehicleTypeData,
    dataSourceDistribution
  };
};