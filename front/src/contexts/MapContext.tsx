import type React from 'react';
import { createContext, useState, useContext, type ReactNode } from 'react'
import type { MapData, MapContextType } from '../interfaces/Map';
import api from '../services/api';

const MapContext = createContext<MapContextType | undefined>(undefined);

interface MapProviderProps {
  children: ReactNode;
}

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [mapData, setMapData] = useState<MapData>({
    features: [],
    loading: false,
    error: null
  });

  const fetchMapData = async (): Promise<void> => {
    try {
      setMapData({
        ...mapData,
        loading: true,
        error: null
      });

      const response = await api.get('/cidade'); // Usando a rota correta para obter todas as cidades
      
      // Transformando os dados recebidos no formato esperado pelo mapa
      const geoFeatures = response.data.map((cidade: any) => ({
        id: cidade.id.toString(),
        type: 'Feature',
        geometry: cidade.geometry || {
          type: 'Polygon',
          coordinates: cidade.coordinates || []
        },
        properties: {
          name: cidade.nome,
          description: `População: ${cidade.populacao || 'N/A'}`,
          ...cidade
        }
      }));
      
      setMapData({
        features: geoFeatures,
        loading: false,
        error: null
      });
    } catch (error) {
      setMapData({
        ...mapData,
        loading: false,
        error: 'Erro ao carregar dados do mapa'
      });
      console.error('Erro ao buscar dados do mapa:', error);
    }
  };

  return (
    <MapContext.Provider value={{ mapData, fetchMapData, setMapData }}>
      {children}
    </MapContext.Provider>
  );
};


export const useMapContext = (): MapContextType => {
  const context = useContext(MapContext);
  
  if (!context) {
    throw new Error('useMapContext deve ser usado dentro de um MapProvider');
  }
  
  return context;
};
