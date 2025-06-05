import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useMapContext } from '../contexts/MapContext';
import { cidades as cidadesData } from '../utils/cidades';
import type { Cidade } from '../types/cidades.types';

interface CidadesMenuProps {
  onCidadeSelect: (cidadeId: number, coordinates?: [number, number]) => void;
  selectedCidade: number | null;
}

// Add interface for incidence data
interface IncidenciaData {
  cidade: {
    id: number;
    nome: string;
  };
  incidencia?: {
    id: number;
    lon: number;
    lat: number;
    anual: number;
    mensal: {
      jan: number;
      fev: number;
      mar: number;
      abr: number;
      mai: number;
      jun: number;
      jul: number;
      ago: number;
      set: number;
      out: number;
      nov: number;
      dez: number;
    };
    geom: {
      type: string;
      coordinates: number[][][];
    };
  };
  mensagem?: string;
}

const MenuContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  z-index: 10;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 16px;
  width: 280px;
`;

const MenuTitle = styled.h3`
  margin: 0 0 16px 0;
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: white;
  font-size: 15px;
  color: #4a5568;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a0aec0'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const SearchButton = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.2s ease;
  
  &:hover {
    background: linear-gradient(to right, #2980b9, #2471a3);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const NoticeBanner = styled.div`
  margin-top: 16px;
  padding: 12px;
  background-color: #fff3cd;
  border-radius: 6px;
  color: #856404;
  text-align: center;
`;

const CidadesMenu: React.FC<CidadesMenuProps> = ({ onCidadeSelect, selectedCidade }) => {
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchingIncidencia, setFetchingIncidencia] = useState(false);
  const { setNewGeometryData } = useMapContext();

  useEffect(() => {
    // Load cities from local data
    try {
      const formattedCidades = cidadesData.map(cidade => ({
        id: cidade.id,
        nome: cidade.nome,
        geometry: {
          type: cidade.geometry.type,
          coordinates: [...cidade.geometry.coordinates]
        }
      }));
      setCidades(formattedCidades);
    } catch (err) {
      setError('Erro ao carregar a lista de cidades');
      console.error('Erro ao carregar cidades:', err);
    }
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cidadeId = Number(e.target.value);
    const selectedCity = cidades.find(c => c.id === cidadeId);
    
    if (selectedCity) {
      onCidadeSelect(cidadeId, selectedCity.geometry.coordinates as [number, number]);
    }
  };
  
  const handleBuscarClick = async () => {
    if (!selectedCidade) {
      console.log("Nenhuma cidade selecionada");
      return;
    }
    
    try {
      setFetchingIncidencia(true);
      
      // Make API call to fetch incidence data
      const response = await axios.get(`http://localhost:3001/cidade/${selectedCidade}`);
      const data: IncidenciaData = response.data;
      
      console.log("Dados de incidência:", data);
      // Pass data to parent component or context to be displayed in the IncidenciaSolar component
      if (window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('incidenciaData', { detail: data }));
      }
      
      // If there's incidence data with geometry, plot it on the map
      if (data.incidencia?.geom) {
        const feature = {
          type: "Feature",
          geometry: data.incidencia.geom,
          properties: {
            id: data.incidencia.id.toString(),
            name: `Incidência em ${data.cidade.nome}`,
            anual: data.incidencia.anual,
            description: `Incidência solar anual: ${data.incidencia.anual} Wh/m²/dia`
          }
        };
        
        setNewGeometryData([feature]);
      }
    } catch (error) {
      console.error("Erro ao buscar dados de incidência:", error);
      setError("Erro ao buscar dados de incidência para esta cidade");
    } finally {
      setFetchingIncidencia(false);
    }
  };

  return (
    <MenuContainer>
      <MenuTitle>Cidades do Brasil</MenuTitle>
      
      <StyledSelect 
        value={selectedCidade || ''} 
        onChange={handleSelectChange}
      >
        <option value="">Selecione uma cidade</option>
        {cidades.map(cidade => (
          <option key={cidade.id} value={cidade.id}>
            {cidade.nome}
          </option>
        ))}
      </StyledSelect>
      
      <SearchButton 
        onClick={handleBuscarClick}
        disabled={!selectedCidade || fetchingIncidencia}
      >
        {fetchingIncidencia ? 'Buscando...' : 'Buscar Dados de Incidência'}
      </SearchButton>
      
      {error && (
        <NoticeBanner>
          {error}
        </NoticeBanner>
      )}
    </MenuContainer>
  );
};

export default CidadesMenu;
