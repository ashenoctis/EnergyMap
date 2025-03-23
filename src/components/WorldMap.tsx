import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box } from '@mui/material';
import { FilterOptions, IoTDevice } from '../types';
import { getMockDevices } from '../services/mockData';

// Set Mapbox access token from environment variable
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

interface WorldMapProps {
  filters: FilterOptions;
}

const WorldMap = ({ filters }: WorldMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [0, 0],
      zoom: 2,
    });

    map.current.on('load', () => {
      // Add navigation controls
      map.current?.addControl(new mapboxgl.NavigationControl(), 'top-right');
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Fetch and display IoT devices based on filters
    const fetchAndDisplayDevices = async () => {
      try {
        const devices = await getMockDevices();

        // Filter devices based on current filters
        const filteredDevices = devices.filter(device => {
          if (filters.dataSource.length > 0 && !filters.dataSource.includes(device.dataSource)) {
            return false;
          }
          if (filters.showAlerts && device.status !== 'alert') {
            return false;
          }
          // Add more filtering logic as needed
          return true;
        });

        // Add markers for filtered devices
        filteredDevices.forEach(device => {
          const el = document.createElement('div');
          el.className = `marker ${device.type} ${device.status}`;
          
          // Add additional classes based on battery level
          if (device.battery.level <= 5) {
            el.className += ' low-battery';
          }
          
          const marker = new mapboxgl.Marker(el)
            .setLngLat([device.location.lng, device.location.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                  <div style="color: white; padding: 8px;">
                    <h3 style="margin: 0 0 8px 0;">${device.name}</h3>
                    <p style="margin: 4px 0;">Type: ${device.type}</p>
                    <p style="margin: 4px 0;">Status: ${device.status}</p>
                    <p style="margin: 4px 0;">Vehicle: ${device.vehicleType || 'N/A'}</p>
                    <p style="margin: 4px 0;">Temperature: ${device.temperature.current}°C</p>
                    <p style="margin: 4px 0;">Min/Max Temp: ${device.temperature.min}°C / ${device.temperature.max}°C</p>
                    <p style="margin: 4px 0;">Battery: ${device.battery.level}% ${device.battery.charging ? '(Charging)' : ''}</p>
                    <p style="margin: 4px 0;">Last Update: ${new Date(device.lastUpdate).toLocaleString()}</p>
                  </div>
                `)
            )
            .addTo(map.current!);

          markers.current.push(marker);
        });
      } catch (error) {
        console.error('Error fetching IoT devices:', error);
      }
    };

    fetchAndDisplayDevices();
  }, [filters]);

  return (
    <Box
      ref={mapContainer}
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    />
  );
};

export default WorldMap; 