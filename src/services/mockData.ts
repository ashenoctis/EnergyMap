import { IoTDevice } from '../types';
import { subHours, addHours } from 'date-fns';

// Helper function to generate random coordinates
const getRandomCoordinate = () => ({
  lat: Math.random() * 160 - 80, // -80 to 80
  lng: Math.random() * 360 - 180, // -180 to 180
});

// Helper function to generate random temperature
const getRandomTemp = (min: number, max: number) => 
  Math.round((Math.random() * (max - min) + min) * 10) / 10;

// Helper function to generate random battery level
const getRandomBattery = (min: number, max: number) => 
  Math.round(Math.random() * (max - min) + min);

// Generate 1000 devices with specified conditions
export const generateMockDevices = (): IoTDevice[] => {
  const devices: IoTDevice[] = [];
  const now = new Date();

  // Generate 100 devices with temperature alerts (>50°C)
  for (let i = 0; i < 100; i++) {
    const location = getRandomCoordinate();
    devices.push({
      id: `alert-device-${i}`,
      name: `Alert Device ${i}`,
      type: Math.random() > 0.5 ? 'active' : 'passive',
      location,
      dataSource: Math.random() > 0.5 ? 'company' : 'public',
      lastUpdate: subHours(now, Math.random() * 24),
      status: 'alert',
      temperature: {
        current: getRandomTemp(50, 75),
        min: getRandomTemp(20, 30),
        max: getRandomTemp(70, 80),
      },
      battery: {
        level: getRandomBattery(20, 90),
        charging: false,
      },
      vehicleType: ['car', 'truck', 'bus'][Math.floor(Math.random() * 3)],
    });
  }

  // Generate 500 devices with low battery (5% SOC)
  for (let i = 0; i < 500; i++) {
    const location = getRandomCoordinate();
    devices.push({
      id: `low-battery-device-${i}`,
      name: `Low Battery Device ${i}`,
      type: Math.random() > 0.5 ? 'active' : 'passive',
      location,
      dataSource: Math.random() > 0.5 ? 'company' : 'public',
      lastUpdate: subHours(now, Math.random() * 24),
      status: 'normal',
      temperature: {
        current: getRandomTemp(20, 45),
        min: getRandomTemp(15, 25),
        max: getRandomTemp(40, 48),
      },
      battery: {
        level: getRandomBattery(1, 5),
        charging: false,
      },
      vehicleType: ['car', 'truck', 'bus'][Math.floor(Math.random() * 3)],
    });
  }

  // Generate 400 devices with normal battery (60-80% SOC)
  for (let i = 0; i < 400; i++) {
    const location = getRandomCoordinate();
    devices.push({
      id: `normal-battery-device-${i}`,
      name: `Normal Battery Device ${i}`,
      type: Math.random() > 0.5 ? 'active' : 'passive',
      location,
      dataSource: Math.random() > 0.5 ? 'company' : 'public',
      lastUpdate: subHours(now, Math.random() * 24),
      status: 'normal',
      temperature: {
        current: getRandomTemp(20, 45),
        min: getRandomTemp(15, 25),
        max: getRandomTemp(40, 48),
      },
      battery: {
        level: getRandomBattery(60, 80),
        charging: Math.random() > 0.5,
      },
      vehicleType: ['car', 'truck', 'bus'][Math.floor(Math.random() * 3)],
    });
  }

  return devices;
};

// Mock API response
export const getMockDevices = async (): Promise<IoTDevice[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return generateMockDevices();
}; 