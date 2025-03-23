export interface IoTDevice {
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
  temperature?: {
    current: number;
    min: number;
    max: number;
  };
  batteryCharge?: number;
}

export interface FilterOptions {
  geography: string[];
  vehicleTypes: string[];
  timeRange: '24h' | '7d' | '1m';
  showAlerts: boolean;
  dataSource: ('company' | 'public')[];
  batteryPercentage: [number, number];
  temperature: [number, number];
  activeType: 'all' | 'active' | 'passive';
}

export interface ChartData {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'pie';
  data: any;
  options: any;
} 