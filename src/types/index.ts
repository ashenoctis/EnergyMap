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
  temperature: {
    current: number;
    min: number;
    max: number;
  };
  battery: {
    level: number;
    charging: boolean;
  };
}

export interface FilterOptions {
  geography: string[];
  vehicleTypes: string[];
  timeRange: '24h' | '1m';
  showAlerts: boolean;
  dataSource: ('company' | 'public')[];
}

export interface ChartData {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'pie';
  data: any;
  options: any;
} 