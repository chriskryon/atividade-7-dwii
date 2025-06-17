/* eslint-disable react-hooks/exhaustive-deps */
import type React from 'react';
import { useEffect, useRef, useState, useCallback, memo } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapContainer, MapWrapper } from '../styles/MapContainer';
import CidadesMenu from './CidadesMenu';
import SetorCensitario from './SetorCensitario';
import { useSetor } from '../hooks/useSetor';
import { useCidade } from '../hooks/useCidade';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNmNW0iLCJhIjoiY204ZDRyOWIyMGxuMjJyb3g5a2I5djliZyJ9.M5B_cljHLFcGD_HOC4bJdg';

const Mapa: React.FC = memo(() => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-45.96642);
  const [lat, setLat] = useState(-23.30555);
  const [zoom, setZoom] = useState(11);
  const [styleLoaded, setStyleLoaded] = useState(false);
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);
  
  const { selectedCidade, setoresError } = useCidade();
  const { setores } = useSetor();

  // Memoize the cidade select handler to prevent re-renders
  const handleCidadeSelect = useCallback((cidadeId: number, coordinates?: [number, number]) => {
    setSelectedFeatureId(null);
    
    if (coordinates && map.current) {
      map.current.flyTo({
        center: coordinates,
        zoom: 11,
        essential: true
      });
    }
  }, []);

  // Memoize the polygon click handler
  const handlePolygonClick = useCallback((e: mapboxgl.MapMouseEvent) => {
    if (e.features?.[0] && map.current) {
      const feature = e.features[0];
      const featureId = feature.id?.toString() || feature.properties?.id || Math.random().toString();
      
      console.log('Clicked feature:', feature);
      console.log('Feature ID:', featureId);
      
      // Atualizar o polígono selecionado
      setSelectedFeatureId(featureId);
      
      // Emit custom event for SetorCensitario component
      const mapClickEvent = new CustomEvent('mapClick', {
        detail: { lngLat: e.lngLat }
      });
      window.dispatchEvent(mapClickEvent);
      
      new mapboxgl.Popup()
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .setHTML(`<h3>${feature.properties?.name || 'Região'}</h3>
                  <p>${feature.properties?.description || 'Sem descrição disponível'}</p>`)
        .addTo(map.current);
    }
  }, []);

  // Initialize map
  useEffect(() => {
    if (mapContainer.current && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [lng, lat],
        zoom: zoom
      });

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

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Listen for cidade changes
  useEffect(() => {
    const handleCidadeChanged = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { coordinates } = customEvent.detail;
      
      if (map.current && coordinates && Array.isArray(coordinates) && coordinates.length === 2) {
        const [lng, lat] = coordinates;
        if (!isNaN(lng) && !isNaN(lat)) {
          map.current.flyTo({
            center: [lng, lat],
            zoom: 11,
            essential: true
          });
        }
      }
    };

    window.addEventListener('cidadeChanged', handleCidadeChanged);
    return () => window.removeEventListener('cidadeChanged', handleCidadeChanged);
  }, []);

  // Listen for setores updates
  useEffect(() => {
    const handleSetoresUpdated = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { setores: updatedSetores, centroid, cidade } = customEvent.detail;
      
      console.log('Setores atualizados:', { updatedSetores, centroid, cidade });
      
      // Só fazer flyTo se o centroid for válido e diferente da posição atual
      if (map.current && centroid && Array.isArray(centroid) && centroid.length === 2) {
        const [lng, lat] = centroid;
        if (!isNaN(lng) && !isNaN(lat)) {
          map.current.flyTo({
            center: [lng, lat],
            zoom: 12, // Zoom um pouco maior para setores
            essential: true
          });
        }
      }
    };

    window.addEventListener('setoresUpdated', handleSetoresUpdated);
    return () => window.removeEventListener('setoresUpdated', handleSetoresUpdated);
  }, []);

  // Update map layers when setores change
  useEffect(() => {
    if (!map.current || !styleLoaded || setores.length === 0) {
      return;
    }

    try {
      const sourceExists = map.current.getSource('spatial-data');
      
      if (sourceExists) {
        (map.current.getSource('spatial-data') as mapboxgl.GeoJSONSource).setData({
          type: 'FeatureCollection',
          features: setores
        });
      } else {
        map.current.addSource('spatial-data', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: setores
          }
        });

        // Layer para polígonos normais
        map.current.addLayer({
          id: 'spatial-data-layer',
          type: 'fill',
          source: 'spatial-data',
          paint: {
            'fill-color': [
              'case',
              ['==', ['get', 'id'], selectedFeatureId || ''],
              '#FF0000', // vermelho para selecionado
              '#0080ff'  // azul para normal
            ],
            'fill-opacity': [
              'case',
              ['==', ['get', 'id'], selectedFeatureId || ''],
              0.8, // mais opaco para selecionado
              0.5  // normal
            ]
          }
        });

        // Add outline layer
        map.current.addLayer({
          id: 'spatial-data-outline',
          type: 'line',
          source: 'spatial-data',
          paint: {
            'line-color': [
              'case',
              ['==', ['get', 'id'], selectedFeatureId || ''],
              '#D50000', // vermelho condizente com a camada de cores
              '#fff'     // branco para normal
            ],
            'line-width': [
              'case',
              ['==', ['get', 'id'], selectedFeatureId || ''],
              3, // mais grosso para selecionado
              1  // normal
            ]
          }
        });

        // Use the memoized event handler
        map.current.on('click', 'spatial-data-layer', handlePolygonClick);

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
  }, [setores, styleLoaded, handlePolygonClick]);

  // Effect para atualizar os estilos quando selectedFeatureId muda
  useEffect(() => {
    if (!map.current || !styleLoaded) return;

    try {
      console.log('Updating selected feature ID:', selectedFeatureId);
      
      // Atualizar o estilo do layer de fill
      if (map.current.getLayer('spatial-data-layer')) {
        map.current.setPaintProperty('spatial-data-layer', 'fill-color', [
          'case',
          ['==', ['get', 'id'], selectedFeatureId || ''],
          '#FF0000', // vermelho para selecionado
          '#0080ff'  // azul para normal
        ]);
        
        map.current.setPaintProperty('spatial-data-layer', 'fill-opacity', [
          'case',
          ['==', ['get', 'id'], selectedFeatureId || ''],
          0.8, // mais opaco para selecionado
          0.5  // normal
        ]);
      }
      
      // Atualizar o estilo do outline
      if (map.current.getLayer('spatial-data-outline')) {
        map.current.setPaintProperty('spatial-data-outline', 'line-color', [
          'case',
          ['==', ['get', 'id'], selectedFeatureId || ''],
          '#CC0000', // vermelho escuro para selecionado
          '#fff'     // branco para normal
        ]);
        
        map.current.setPaintProperty('spatial-data-outline', 'line-width', [
          'case',
          ['==', ['get', 'id'], selectedFeatureId || ''],
          3, // mais grosso para selecionado
          1  // normal
        ]);
      }
    } catch (error) {
      console.error("Error updating layer styles:", error);
    }
  }, [selectedFeatureId, styleLoaded]);

  // Function to handle the setor censitario polygon update (keeping it simple)
  const handleSetorCensitarioUpdate = (event: Event) => {
    if (!map.current || !styleLoaded) return;

    const customEvent = event as CustomEvent;
    const { feature, center } = customEvent.detail;

    try {
      // Check if setor censitario source already exists
      const sourceExists = map.current.getSource('setorcensitario-source');

      if (sourceExists) {
        // Update existing source data
        (map.current.getSource('setorcensitario-source') as mapboxgl.GeoJSONSource).setData({
          type: 'FeatureCollection',
          features: [feature]
        });
      } else {
        // Add new source and layers
        map.current.addSource('setorcensitario-source', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [feature]
          }
        });

        // Add fill layer with dynamic color based on annual value
        map.current.addLayer({
          id: 'setorcensitario-fill',
          type: 'fill',
          source: 'setorcensitario-source',
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'anual'],
              3000, '#FFEB3B',
              4000, '#FFA726',
              5000, '#FF5722',
              6000, '#D50000' 
            ],
            'fill-opacity': 0.4
          }
        });

        map.current.addLayer({
          id: 'setorcensitario-outline',
          type: 'line',
          source: 'setorcensitario-source',
          paint: {
            'line-color': '#FF0000',
            'line-width': 2,
            'line-opacity': 0.8
          }
        });

        // Add interactivity
        map.current.on('click', 'setorcensitario-fill', (e) => {
          if (e.features?.[0]) {
            const props = e.features[0].properties;
            if (map.current) {
              new mapboxgl.Popup()
                .setLngLat([e.lngLat.lng, e.lngLat.lat])
                .setHTML(`<h3>${props?.name || "Sem nome"}</h3><p>${props?.description || "Sem descrição"}</p>`)
                .addTo(map.current);
            }
          }
        });

        // Change cursor on hover
        map.current.on('mouseenter', 'setorcensitario-fill', () => {
          if (map.current) map.current.getCanvas().style.cursor = 'pointer';
        });

        map.current.on('mouseleave', 'setorcensitario-fill', () => {
          if (map.current) map.current.getCanvas().style.cursor = '';
        });
      }

      // Fly to the setor censitario location
      if (center) {
        map.current.flyTo({
          center: center,
          zoom: 8,
          essential: true
        });
      }
    } catch (error) {
      console.error("Error updating setor censitario polygon:", error);
    }
  };

  // Listen for the updateSetorCensitarioPolygon event
  useEffect(() => {
    window.addEventListener('updateSetorCensitarioPolygon', handleSetorCensitarioUpdate);
    
    return () => {
      window.removeEventListener('updateSetorCensitarioPolygon', handleSetorCensitarioUpdate);
    };
  }, [handleSetorCensitarioUpdate]);

  return (
    <MapContainer>
      <CidadesMenu onCidadeSelect={handleCidadeSelect} />
      <SetorCensitario />
      {setoresError && <div className="error-message">{setoresError}</div>}
      <MapWrapper ref={mapContainer} />
      <div className="map-info">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        {selectedCidade && ` | Cidade: ${selectedCidade.nome}`}
      </div>
    </MapContainer>
  );
});

Mapa.displayName = 'Mapa';

export default Mapa;
