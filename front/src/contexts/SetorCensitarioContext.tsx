import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { censoService } from '../services';
import * as wkt from 'wellknown';
import type { SetorCensitarioContextType } from '../types/cidade.types';

const SetorCensitarioContext = createContext<SetorCensitarioContextType | undefined>(undefined);

interface SetorCensitarioProviderProps {
  children: ReactNode;
}

export const SetorCensitarioProvider: React.FC<SetorCensitarioProviderProps> = ({ children }) => {
  const [setores, setSetores] = useState<any[]>([]);
  const [selectedSetor, setSelectedSetor] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSetoresByCidade = async (cidadeNome: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Buscando setores para cidade: ${cidadeNome}`);
      
      const response = await censoService.list(cidadeNome);
      
      if (!response || !response.polygons || response.polygons.length === 0) {
        throw new Error('Nenhum setor censitário encontrado para esta cidade');
      }
      
      // Converter WKT para GeoJSON
      const geoFeatures = response.polygons.map((polygon: any, index: number) => {
        try {
          const geometry = wkt.parse(polygon.geom);
          
          if (!geometry) {
            console.error(`Erro ao converter WKT para GeoJSON no polígono ${index}`);
            return null;
          }
          
          return {
            id: `setor-${index}`,
            type: 'Feature',
            geometry: geometry,
            properties: {
              id: `setor-${index}`,
              name: `Setor ${index + 1}`,
              description: `Cidade: ${cidadeNome}`,
              city: cidadeNome,
              wkt: polygon.geom
            }
          };
        } catch (error) {
          console.error(`Erro ao processar polígono ${index}:`, error);
          return null;
        }
      }).filter(Boolean);
      
      setSetores(geoFeatures);
      
      // Validar centroid antes de disparar evento
      let validCentroid = null;
      if (response.centroid && 
          Array.isArray(response.centroid) && 
          response.centroid.length === 2 &&
          !isNaN(response.centroid[0]) && 
          !isNaN(response.centroid[1])) {
        validCentroid = response.centroid;
      }
      
      // Dispatch event para atualizar o mapa
      const event = new CustomEvent('setoresUpdated', {
        detail: { 
          setores: geoFeatures,
          centroid: validCentroid,
          cidade: cidadeNome
        }
      });
      window.dispatchEvent(event);
      
    } catch (err: any) {
      console.error('Erro ao buscar setores censitários:', err);
      setError(`Erro ao carregar setores de ${cidadeNome}: ${err.message}`);
      setSetores([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSetorByPoint = async (x: number, y: number): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await censoService.getByPoint(x, y);
      
      if (data.message) {
        setError(data.message);
        setSelectedSetor(null);
      } else {
        setSelectedSetor(data);
      }
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar dados do setor');
      setSelectedSetor(null);
    } finally {
      setLoading(false);
    }
  };

  const selectSetor = (setor: any) => {
    setSelectedSetor(setor);
    setError(null);
  };

  const clearSetores = () => {
    setSetores([]);
    setSelectedSetor(null);
    setError(null);
  };

  // Carregar Jacareí automaticamente quando o contexto for criado
  useEffect(() => {
    fetchSetoresByCidade('Jacareí');
  }, []);

  return (
    <SetorCensitarioContext.Provider value={{
      setores,
      selectedSetor,
      loading,
      error,
      fetchSetoresByCidade,
      selectSetor,
      fetchSetorByPoint,
      clearSetores
    }}>
      {children}
    </SetorCensitarioContext.Provider>
  );
};

export const useSetorCensitarioContext = (): SetorCensitarioContextType => {
  const context = useContext(SetorCensitarioContext);
  if (!context) {
    throw new Error('useSetorCensitarioContext deve ser usado dentro de um SetorCensitarioProvider');
  }
  return context;
};
