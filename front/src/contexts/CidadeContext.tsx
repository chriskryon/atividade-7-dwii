import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { cidadesFiltradas } from '../utils/cidades_filter';
import type { CidadeContextType } from '../types/cidade.types';
import type { Cidade } from '../types/cidades.types';

const CidadeContext = createContext<CidadeContextType | undefined>(undefined);

interface CidadeProviderProps {
  children: ReactNode;
}

export const CidadeProvider: React.FC<CidadeProviderProps> = ({ children }) => {
  const [selectedCidade, setSelectedCidade] = useState<Cidade | null>(null);
  const [cidades] = useState<Cidade[]>(cidadesFiltradas);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inicializar com Jacareí como padrão
  useEffect(() => {
    const jacarei = cidades.find(cidade => cidade.nome === 'Jacareí');
    if (jacarei) {
      setSelectedCidade(jacarei);
      
      // Dispatch evento inicial para posicionar o mapa
      if (jacarei.geometry && jacarei.geometry.coordinates && jacarei.geometry.coordinates.length === 2) {
        const [lng, lat] = jacarei.geometry.coordinates;
        if (!isNaN(lng) && !isNaN(lat)) {
          const event = new CustomEvent('cidadeChanged', {
            detail: { 
              cidade: jacarei,
              coordinates: [lng, lat]
            }
          });
          window.dispatchEvent(event);
        }
      }
    }
  }, [cidades]);

  const selectCidade = (cidade: Cidade) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedCidade(cidade);
      
      // Dispatch event para atualizar o mapa com coordenadas válidas
      if (cidade.geometry && cidade.geometry.coordinates && cidade.geometry.coordinates.length === 2) {
        const [lng, lat] = cidade.geometry.coordinates;
        if (!isNaN(lng) && !isNaN(lat)) {
          const event = new CustomEvent('cidadeChanged', {
            detail: { 
              cidade,
              coordinates: [lng, lat]
            }
          });
          window.dispatchEvent(event);
        }
      }
      
    } catch (err: any) {
      setError(`Erro ao selecionar cidade: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CidadeContext.Provider value={{
      selectedCidade,
      cidades,
      selectCidade,
      loading,
      error
    }}>
      {children}
    </CidadeContext.Provider>
  );
};

export const useCidadeContext = (): CidadeContextType => {
  const context = useContext(CidadeContext);
  if (!context) {
    throw new Error('useCidadeContext deve ser usado dentro de um CidadeProvider');
  }
  return context;
};
