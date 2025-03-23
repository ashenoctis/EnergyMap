import { IoTDevice } from '../types';
import { subHours } from 'date-fns';

// Helper function to generate random coordinates
const getRandomCoords = () => {
  return {
    lat: (Math.random() * 140 - 70), // -70 to 70
    lng: (Math.random() * 340 - 170) // -170 to 170
  };
};

// Helper function to generate a random date within the last 24 hours
const getRandomRecentDate = () => {
  const hoursAgo = Math.random() * 24;
  return subHours(new Date(), hoursAgo);
};

// Helper to generate a realistic unique ID
const generateId = (index: number, prefix: string) => {
  return `${prefix}-${Math.floor(10000 + Math.random() * 90000)}-${index}`;
};

// Generate 100 devices with temperature > 50°C (alerts)
const generateAlertDevices = (count: number): IoTDevice[] => {
  return Array.from({ length: count }).map((_, index) => {
    const location = getRandomCoords();
    const isActive = Math.random() > 0.3; // 70% active, 30% passive
    
    return {
      id: generateId(index, 'ALERT'),
      name: `Device Alert ${index + 1}`,
      type: isActive ? 'active' : 'passive',
      location,
      dataSource: Math.random() > 0.5 ? 'company' : 'public',
      lastUpdate: getRandomRecentDate(),
      status: 'alert',
      vehicleType: Math.random() > 0.5 ? 'Car' : 'Truck',
      temperature: {
        current: 50 + Math.random() * 20, // 50°C to 70°C
        min: 30 + Math.random() * 10,
        max: 60 + Math.random() * 15
      },
      batteryCharge: Math.floor(Math.random() * 100)
    };
  });
};

// Generate 500 devices with low battery (5% SOC)
const generateLowBatteryDevices = (count: number): IoTDevice[] => {
  return Array.from({ length: count }).map((_, index) => {
    const location = getRandomCoords();
    const isActive = Math.random() > 0.5; // 50% active, 50% passive
    
    return {
      id: generateId(index, 'LOWBAT'),
      name: `Device LowBat ${index + 1}`,
      type: isActive ? 'active' : 'passive',
      location,
      dataSource: Math.random() > 0.6 ? 'company' : 'public',
      lastUpdate: getRandomRecentDate(),
      status: 'normal',
      vehicleType: ['Car', 'Truck', 'Bus', 'Motorcycle'][Math.floor(Math.random() * 4)],
      temperature: {
        current: 20 + Math.random() * 15, // 20°C to 35°C
        min: 15 + Math.random() * 5,
        max: 35 + Math.random() * 5
      },
      batteryCharge: Math.floor(Math.random() * 5 + 1) // 1% to 5%
    };
  });
};

// Generate 500 devices with normal battery (60% to 80% SOC)
const generateNormalBatteryDevices = (count: number): IoTDevice[] => {
  return Array.from({ length: count }).map((_, index) => {
    const location = getRandomCoords();
    const isActive = Math.random() > 0.4; // 60% active, 40% passive
    
    return {
      id: generateId(index, 'NRMBAT'),
      name: `Device NormBat ${index + 1}`,
      type: isActive ? 'active' : 'passive',
      location,
      dataSource: Math.random() > 0.5 ? 'company' : 'public',
      lastUpdate: getRandomRecentDate(),
      status: 'normal',
      vehicleType: ['Car', 'Truck', 'Bus', 'Motorcycle', 'Drone'][Math.floor(Math.random() * 5)],
      temperature: {
        current: 20 + Math.random() * 20, // 20°C to 40°C
        min: 15 + Math.random() * 5,
        max: 40 + Math.random() * 5
      },
      batteryCharge: Math.floor(Math.random() * 21 + 60) // 60% to 80%
    };
  });
};

// Generate all devices
export const devices: IoTDevice[] = [
  ...generateAlertDevices(100),       // 100 alert devices (temp > 50°C)
  ...generateLowBatteryDevices(500),  // 500 devices with low battery
  ...generateNormalBatteryDevices(500) // 500 devices with normal battery
];

// Get devices filtered by the current filters
export const getFilteredDevices = (filters: any) => {
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
    if (filters.vehicleTypes.length > 0 && !filters.vehicleTypes.includes(device.vehicleType)) {
      return false;
    }
    
    // Filter by geography (would need more complex logic in a real app)
    
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
  const temperatures = devices
    .filter(d => d.temperature?.current !== undefined)
    .map(d => d.temperature?.current);
  
  const tempDistribution = {
    veryLow: temperatures.filter(t => t !== undefined && t < 10).length,
    low: temperatures.filter(t => t !== undefined && t >= 10 && t < 20).length,
    normal: temperatures.filter(t => t !== undefined && t >= 20 && t < 35).length,
    high: temperatures.filter(t => t !== undefined && t >= 35 && t < 50).length,
    veryHigh: temperatures.filter(t => t !== undefined && t >= 50).length
  };
  
  return {
    deviceStatus,
    batteryCharge,
    tempDistribution
  };
}; 