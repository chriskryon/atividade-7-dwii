import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // Make sure axios is installed
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
  top: 10px;
  left: 10px;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  padding: 10px;
  max-height: 70vh;
  overflow-y: auto;
  width: 250px;
`;

const MenuTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
  font-size: 16px;
`;

const CidadesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: calc(70vh - 40px);
  overflow-y: auto;
`;

const CidadeItem = styled.li<{ selected: boolean }>`
  padding: 8px 10px;
  margin-bottom: 4px;
  cursor: pointer;
  border-radius: 3px;
  background-color: ${props => props.selected ? '#3498db' : 'transparent'};
  color: ${props => props.selected ? 'white' : '#333'};
  
  &:hover {
    background-color: ${props => props.selected ? '#3498db' : '#f0f0f0'};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const LoadingMessage = styled.div`
  padding: 10px;
  text-align: center;
  color: #666;
`;

const ErrorMessage = styled.div`
  padding: 10px;
  text-align: center;
  color: #e74c3c;
`;

const SearchButton = styled.button`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const CidadesMenu: React.FC<CidadesMenuProps> = ({ onCidadeSelect, selectedCidade }) => {
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [filteredCidades, setFilteredCidades] = useState<Cidade[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [incidenciaData, setIncidenciaData] = useState<IncidenciaData | null>(null);
  const [fetchingIncidencia, setFetchingIncidencia] = useState(false);
  const { setNewGeometryData } = useMapContext(); // Assume this context method exists to update map data

  useEffect(() => {
    // Load cities from local data instead of API
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
      setFilteredCidades(formattedCidades);
    } catch (err) {
      setError('Erro ao carregar a lista de cidades');
      console.error('Erro ao carregar cidades:', err);
    }
  }, []);

  useEffect(() => {
    // Fix the infinite loop by not having filteredCidades depend on cidades changes
    if (searchTerm && cidades.length > 0) {
      const filtered = cidades.filter(cidade => 
        cidade.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCidades(filtered);
    } else if (cidades.length > 0) {
      setFilteredCidades(cidades);
    }
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
  };
  
  const handleBuscarClick = async () => {
    if (!selectedCidade) {
      console.log("Nenhuma cidade selecionada");
      return;
    }
    
    console.log("ID da cidade selecionada:", selectedCidade);
    
    try {
      setFetchingIncidencia(true);
      
      // Make API call to fetch incidence data
      const response = await axios.get(`http://localhost:3001/cidade/${selectedCidade}`);
      const data: IncidenciaData = response.data;
      
      console.log("Dados de incidência:", data);
      setIncidenciaData(data);
      
      // If there's incidence data with geometry, plot it on the map
      if (data.incidencia?.geom) {
        // Convert to GeoJSON feature to plot on map
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
        
        // Send the new geometry to the map context to be displayed
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
      <SearchInput 
        type="text" 
        placeholder="Buscar cidade..." 
        value={searchTerm}
        onChange={handleSearch}
      />
      
      <SearchButton 
        onClick={handleBuscarClick}
        disabled={!selectedCidade || fetchingIncidencia}
      >
        {fetchingIncidencia ? 'Buscando...' : 'Buscar'}
      </SearchButton>
      
      {incidenciaData && incidenciaData.incidencia && (
        <div style={{ margin: '10px 0', padding: '10px', backgroundColor: '#f0f8ff', borderRadius: '4px' }}>
          <h4 style={{ margin: '0 0 5px 0' }}>Incidência Solar em {incidenciaData.cidade.nome}</h4>
          <p style={{ margin: '0 0 5px 0' }}>Anual: {incidenciaData.incidencia.anual} Wh/m²/dia</p>
          <details>
            <summary>Dados mensais</summary>
            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
              <li>Jan: {incidenciaData.incidencia.mensal.jan}</li>
              <li>Fev: {incidenciaData.incidencia.mensal.fev}</li>
              <li>Mar: {incidenciaData.incidencia.mensal.mar}</li>
              <li>Abr: {incidenciaData.incidencia.mensal.abr}</li>
              <li>Mai: {incidenciaData.incidencia.mensal.mai}</li>
              <li>Jun: {incidenciaData.incidencia.mensal.jun}</li>
              <li>Jul: {incidenciaData.incidencia.mensal.jul}</li>
              <li>Ago: {incidenciaData.incidencia.mensal.ago}</li>
              <li>Set: {incidenciaData.incidencia.mensal.set}</li>
              <li>Out: {incidenciaData.incidencia.mensal.out}</li>
              <li>Nov: {incidenciaData.incidencia.mensal.nov}</li>
              <li>Dez: {incidenciaData.incidencia.mensal.dez}</li>
            </ul>
          </details>
        </div>
      )}
      
      {incidenciaData?.mensagem && (
        <div style={{ margin: '10px 0', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
          {incidenciaData.mensagem}
        </div>
      )}
      
      <CidadesList>
        {filteredCidades.map(cidade => (
          <CidadeItem 
            key={cidade.id}
            selected={selectedCidade === cidade.id}
            onClick={() => onCidadeSelect(cidade.id, cidade.geometry.coordinates as [number, number])}
          >
            {cidade.nome}
          </CidadeItem>
        ))}
        {filteredCidades.length === 0 && !loading && (
          <LoadingMessage>Nenhuma cidade encontrada</LoadingMessage>
        )}
      </CidadesList>
    </MenuContainer>
  );
};

export default CidadesMenu;
