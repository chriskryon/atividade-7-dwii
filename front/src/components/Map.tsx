import type React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapContainer, MapWrapper } from '../styles/MapContainer';
import { useMapContext } from '../contexts/MapContext';
import CidadesMenu from './CidadesMenu';
import IncidenciaSolar from './IncidenciaSolar';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNmNW0iLCJhIjoiY204ZDRyOWIyMGxuMjJyb3g5a2I5djliZyJ9.M5B_cljHLFcGD_HOC4bJdg';

const Mapa: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-46.6333);
  const [lat, setLat] = useState(-23.5505);
  const [zoom, setZoom] = useState(12);
  const [selectedCidade, setSelectedCidade] = useState<number | null>(null);
  const [styleLoaded, setStyleLoaded] = useState(false);
  
  const { mapData, fetchMapData } = useMapContext();

  // Initialize map only once
  useEffect(() => {
    if (mapContainer.current && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [lng, lat],
        zoom: zoom
      });

      // Set styleLoaded flag when the map style has loaded
      map.current.on('style.load', () => {
        setStyleLoaded(true);
      });

      map.current.on('move', () => {
        if (map.current) {
          setLng(Number.parseFloat(map.current.getCenter().lng.toFixed(4)));
          setLat(Number.parseFloat(map.current.getCenter().lat.toFixed(4)));
          setZoom(Number.parseFloat(map.current.getZoom().toFixed(2)));
        }
      });
    }

    // Fetch map data only once during component initialization
    if (!mapData.features.length && !mapData.loading) {
      fetchMapData();
    }
    
    // Cleanup function to remove the map when component unmounts
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // Separate effect to handle map data updates
  useEffect(() => {
    if (!map.current || !styleLoaded || mapData.loading || mapData.features.length === 0) {
      return; // Don't proceed if map isn't ready, style isn't loaded, or data isn't loaded
    }

    try {
      // Check if the source already exists
      const sourceExists = map.current.getSource('spatial-data');
      
      if (sourceExists) {
        // Update the existing source instead of removing and re-adding
        (map.current.getSource('spatial-data') as mapboxgl.GeoJSONSource).setData({
          type: 'FeatureCollection',
          features: mapData.features
        });
      } else {
        // Add source and layers if they don't exist
        map.current.addSource('spatial-data', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: mapData.features
          }
        });

        map.current.addLayer({
          id: 'spatial-data-layer',
          type: 'fill',
          source: 'spatial-data',
          paint: {
            'fill-color': '#0080ff',
            'fill-opacity': 0.5
          }
        });

        // Add outline layer
        map.current.addLayer({
          id: 'spatial-data-outline',
          type: 'line',
          source: 'spatial-data',
          paint: {
            'line-color': '#fff',
            'line-width': 1
          }
        });

        // Add event listeners only once
        map.current.on('click', 'spatial-data-layer', (e) => {
          if (e.features?.[0]) {
            const feature = e.features[0];
            new mapboxgl.Popup()
              .setLngLat([e.lngLat.lng, e.lngLat.lat])
              .setHTML(`<h3>${feature.properties.name || 'Região'}</h3>
                        <p>${feature.properties.description || 'Sem descrição disponível'}</p>`)
              .addTo(map.current!);
          }
        });

        map.current.on('mouseenter', 'spatial-data-layer', () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = 'pointer';
          }
        });

        map.current.on('mouseleave', 'spatial-data-layer', () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = '';
          }
        });
      }
    } catch (error) {
      console.error("Error adding map source or layers:", error);
    }
  }, [mapData.features, mapData.loading, styleLoaded]); // Added styleLoaded as a dependency

  // Function to handle the incidencia polygon update (keeping it simple)
  const handleIncidenciaUpdate = useCallback((event: Event) => {
    if (!map.current || !styleLoaded) return;

    const customEvent = event as CustomEvent;
    const { feature, center } = customEvent.detail;

    try {
      // Check if incidencia source already exists
      const sourceExists = map.current.getSource('incidencia-source');

      if (sourceExists) {
        // Update existing source data
        (map.current.getSource('incidencia-source') as mapboxgl.GeoJSONSource).setData({
          type: 'FeatureCollection',
          features: [feature]
        });
      } else {
        // Add new source and layers
        map.current.addSource('incidencia-source', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [feature]
          }
        });

        // Add fill layer for incidencia
        map.current.addLayer({
          id: 'incidencia-fill',
          type: 'fill',
          source: 'incidencia-source',
          paint: {
            'fill-color': '#ff9900', // Orange color for solar incidence
            'fill-opacity': 0.6
          }
        });

        // Add outline for better visibility
        map.current.addLayer({
          id: 'incidencia-outline',
          type: 'line',
          source: 'incidencia-source',
          paint: {
            'line-color': '#ff5500',
            'line-width': 2
          }
        });

        // Add interactivity
        map.current.on('click', 'incidencia-fill', (e) => {
          if (e.features?.[0]) {
            const props = e.features[0].properties;
            new mapboxgl.Popup()
              .setLngLat([e.lngLat.lng, e.lngLat.lat])
              .setHTML(`<h3>${props.name}</h3><p>${props.description}</p>`)
              .addTo(map.current!);
          }
        });

        // Change cursor on hover
        map.current.on('mouseenter', 'incidencia-fill', () => {
          if (map.current) map.current.getCanvas().style.cursor = 'pointer';
        });

        map.current.on('mouseleave', 'incidencia-fill', () => {
          if (map.current) map.current.getCanvas().style.cursor = '';
        });
      }

      // Fly to the incidencia location
      if (center) {
        map.current.flyTo({
          center: center,
          zoom: 12,
          essential: true
        });
      }
    } catch (error) {
      console.error("Error updating incidencia polygon:", error);
    }
  }, [styleLoaded]);

  // Listen for the updateIncidenciaPolygon event
  useEffect(() => {
    window.addEventListener('updateIncidenciaPolygon', handleIncidenciaUpdate);
    
    return () => {
      window.removeEventListener('updateIncidenciaPolygon', handleIncidenciaUpdate);
    };
  }, [handleIncidenciaUpdate]);

  const handleCidadeSelect = (cidadeId: number, coordinates?: [number, number]) => {
    setSelectedCidade(cidadeId);
    
    if (coordinates && map.current) {
      map.current.flyTo({
        center: coordinates,
        zoom: 9,
        essential: true
      });
    }
  };

  return (
    <MapContainer>
      <CidadesMenu onCidadeSelect={handleCidadeSelect} selectedCidade={selectedCidade} />
      <IncidenciaSolar />
      {mapData.error && <div className="error-message">{mapData.error}</div>}
      <MapWrapper ref={mapContainer} />
      <div className="map-info">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
    </MapContainer>
  );
};

export default Mapa;
