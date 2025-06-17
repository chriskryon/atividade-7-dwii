import type React from 'react';
import { createContext, useState, useContext, useEffect, type ReactNode } from 'react'
import type { MapData, MapContextType } from '../types/map.types';
import { censoApi } from '../services/api';
import * as wkt from 'wellknown';

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
  const [selectedCity, setSelectedCity] = useState<string>('Jacareí');

  const fetchCensusData = async (cityName: string): Promise<void> => {
    console.log(`fetchCensusData chamado para cidade: ${cityName}`);
    
    try {
      setMapData(prev => ({
        ...prev,
        loading: true,
        error: null
      }));

      console.log(`Fazendo chamada para censoApi.list com cidade: ${cityName}`);
      
      // Usar a nova API de censo
      const response = await censoApi.list(cityName);
      
      console.log("Response recebida:", response);
      console.log("Número de polígonos:", response.polygons?.length);
      
      // Verificar se há dados válidos
      if (!response || !response.polygons || response.polygons.length === 0) {
        throw new Error('Nenhum setor censitário encontrado para esta cidade');
      }
      
      // Converter WKT para GeoJSON
      const geoFeatures = response.polygons.map((polygon: any, index: number) => {
        try {
          // Converter WKT para GeoJSON usando a biblioteca wellknown
          const geometry = wkt.parse(polygon.geom);
          
          if (!geometry) {
            console.error(`Erro ao converter WKT para GeoJSON no polígono ${index}:`, polygon.geom);
            return null;
          }
          
          return {
            id: `setor-${index}`, // ID único para cada feature
            type: 'Feature',
            geometry: geometry,
            properties: {
              id: `setor-${index}`, // Também nas propriedades
              name: `Setor ${index + 1}`,
              description: `Cidade: ${cityName}`,
              city: cityName,
              wkt: polygon.geom // Manter WKT original como referência
            }
          };
        } catch (error) {
          console.error(`Erro ao processar polígono ${index}:`, error);
          return null;
        }
      }).filter(Boolean); // Remove features nulas
      
      console.log(`${geoFeatures.length} features processadas com sucesso`);
      console.log("Primeira feature convertida:", geoFeatures[0]);
      
      setMapData({
        features: geoFeatures,
        loading: false,
        error: null,
        centroid: response.centroid
      });
      setSelectedCity(cityName);
    } catch (error: any) {
      console.error('Erro detalhado ao buscar setores censitários:', error);
      setMapData(prev => ({
        ...prev,
        loading: false,
        error: `Erro ao carregar setores censitários de ${cityName}: ${error.message}`
      }));
    }
  };

  const fetchMapData = async (): Promise<void> => {
    // Usar a cidade já selecionada ou Jacareí como padrão
    await fetchCensusData(selectedCity);
  };

  const updateSelectedCity = (cityName: string) => {
    setSelectedCity(cityName);
  };

  // Inicializar com Jacareí carregando os dados automaticamente
  useEffect(() => {
    fetchCensusData('Jacareí');
  }, []);

  return (
    <MapContext.Provider value={{ mapData, fetchMapData, setMapData, selectedCity, fetchCensusData, updateSelectedCity }}>
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