import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box, CircularProgress } from '@mui/material';
import { FilterOptions, IoTDevice } from '../types';
import { getFilteredDevices } from '../data/mockData';

// Set Mapbox access token from environment variable
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiYXNoZW5vY3RpcyIsImEiOiJja3NqMno4MHAwMHY4MnludTVleThmNGswIn0.zZzRs916H3-OP-lWzx5Mmw';

interface WorldMapProps {
  filters: FilterOptions;
}

const WorldMap = ({ filters }: WorldMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize map
  useEffect(() => {
    const container = mapContainer.current;
    if (!container) return;

    const initMap = () => {
      try {
        if (map.current) return; // Prevent multiple initializations
        
        map.current = new mapboxgl.Map({
          container,
          style: 'mapbox://styles/mapbox/dark-v11',
          center: [0, 0],
          zoom: 1.5,
          minZoom: 1,
        });
  
        map.current.on('load', () => {
          // Add navigation controls
          map.current?.addControl(new mapboxgl.NavigationControl(), 'top-right');
          setLoading(false);
        });
      } catch (error) {
        console.error('Error initializing Mapbox map:', error);
        setLoading(false);
      }
    };

    // Initialize map with a small delay to ensure container is ready
    const timer = setTimeout(initMap, 100);

    return () => {
      clearTimeout(timer);
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (map.current) {
        map.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update markers when filters change
  useEffect(() => {
    if (!map.current || loading) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    try {
      // Get filtered devices from mock data
      const filteredDevices = getFilteredDevices(filters);

      // Add markers for filtered devices
      filteredDevices.forEach(device => {
        const el = document.createElement('div');
        el.className = `marker ${device.type} ${device.status}`;
        
        // Add battery indicator class if battery is low
        if (device.batteryCharge !== undefined && device.batteryCharge < 10) {
          el.classList.add('low-battery');
        }
        
        const marker = new mapboxgl.Marker(el)
          .setLngLat([device.location.lng, device.location.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <h3>${device.name}</h3>
                <p>Type: ${device.type}</p>
                <p>Status: ${device.status}</p>
                ${device.temperature ? `<p>Temperature: ${device.temperature.current.toFixed(1)}°C (Min: ${device.temperature.min.toFixed(1)}°C, Max: ${device.temperature.max.toFixed(1)}°C)</p>` : ''}
                ${device.batteryCharge !== undefined ? `<p>Battery: ${device.batteryCharge}%</p>` : ''}
                <p>Last Update: ${new Date(device.lastUpdate).toLocaleString()}</p>
              `)
          )
          .addTo(map.current!);

        markers.current.push(marker);
      });
    } catch (error) {
      console.error('Error updating map markers:', error);
    }
  }, [filters, loading]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 1,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        ref={mapContainer}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      {loading && (
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default WorldMap; 