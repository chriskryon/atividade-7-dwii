import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapContainer, MapWrapper } from '../styles/MapContainer';
import { useMapContext } from '../contexts/MapContext';
import CidadesMenu from './CidadesMenu';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNmNW0iLCJhIjoiY204ZDRyOWIyMGxuMjJyb3g5a2I5djliZyJ9.M5B_cljHLFcGD_HOC4bJdg';

const Mapa: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-46.6333);  // Longitude padrão (São Paulo)
  const [lat, setLat] = useState(-23.5505);  // Latitude padrão (São Paulo)
  const [zoom, setZoom] = useState(10);
  const [selectedCidade, setSelectedCidade] = useState<number | null>(null);
  
  const { mapData, fetchMapData } = useMapContext();

  useEffect(() => {
    // Inicializa o mapa
    if (mapContainer.current && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12', // Tema satellite-streets-v12
        center: [lng, lat],
        zoom: zoom
      });

      map.current.on('move', () => {
        if (map.current) {
          setLng(Number.parseFloat(map.current.getCenter().lng.toFixed(4)));
          setLat(Number.parseFloat(map.current.getCenter().lat.toFixed(4)));
          setZoom(Number.parseFloat(map.current.getZoom().toFixed(2)));
        }
      });
    }

    // Carrega os dados do mapa ao montar o componente
    fetchMapData();
  }, [fetchMapData]);

  // Adiciona os dados geoespaciais ao mapa quando eles estiverem disponíveis
  useEffect(() => {
    if (map.current && mapData.features.length > 0 && !mapData.loading) {
      // Se o mapa já tiver a source, a remove para atualizar
      if (map.current.getSource('spatial-data')) {
        map.current.removeLayer('spatial-data-layer');
        map.current.removeLayer('spatial-data-outline');
        map.current.removeSource('spatial-data');
      }

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

      // Adiciona uma borda às features
      map.current.addLayer({
        id: 'spatial-data-outline',
        type: 'line',
        source: 'spatial-data',
        paint: {
          'line-color': '#fff',
          'line-width': 1
        }
      });

      // Adiciona interatividade
      map.current.on('click', 'spatial-data-layer', (e) => {
        if (e.features && e.features[0]) {
          const feature = e.features[0];
          new mapboxgl.Popup()
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .setHTML(`<h3>${feature.properties.name || 'Região'}</h3>
                      <p>${feature.properties.description || 'Sem descrição disponível'}</p>`)
            .addTo(map.current!);
        }
      });

      // Muda o cursor para pointer quando passar por cima de uma feature
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
  }, [mapData]);

  const handleCidadeSelect = (cidadeId: number, coordinates?: [number, number]) => {
    setSelectedCidade(cidadeId);
    
    if (coordinates && map.current) {
      map.current.flyTo({
        center: coordinates,
        zoom: 18,
        essential: true
      });
    }
  };

  return (
    <MapContainer>
      <CidadesMenu onCidadeSelect={handleCidadeSelect} selectedCidade={selectedCidade} />
      {mapData.error && <div className="error-message">{mapData.error}</div>}
      <MapWrapper ref={mapContainer} />
      <div className="map-info">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
    </MapContainer>
  );
};

export default Mapa;
