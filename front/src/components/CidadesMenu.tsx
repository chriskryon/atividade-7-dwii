import { useState, useEffect } from 'react';
import axios from 'axios';
import { cidades as cidadesData } from '../utils/cidades';
import type { Cidade } from '../types/cidades.types';
import type { IncidenciaData } from '../types/Incidentia.types';
import type { CidadesMenuProps } from '../types/menu.types';
import { MenuContainer, MenuTitle, NoticeBanner, SearchButton, StyledSelect } from '../styles/cidades.style';

const CidadesMenu: React.FC<CidadesMenuProps> = ({ onCidadeSelect, selectedCidade }) => {
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [fetchingIncidencia, setFetchingIncidencia] = useState(false);

  useEffect(() => {
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
    if (!selectedCidade) return;
    
    try {
      setFetchingIncidencia(true);
      const response = await axios.get(`http://localhost:3001/cidade/${selectedCidade}`);
      const data: IncidenciaData = response.data;
      
      // Dispatch incidencia data event
      window.dispatchEvent(new CustomEvent('incidenciaData', { detail: data }));
      
      // Handle polygon if available
      if (data.incidencia?.geom) {
        const feature = {
          type: "Feature",
          geometry: data.incidencia.geom,
          properties: {
            id: data.incidencia.id.toString(),
            name: `Incidência em ${data.cidade.nome}`,
            anual: data.incidencia.anual,
            description: `Anual: ${data.incidencia.anual} Wh/m²/dia`
          }
        };
        
        // Dispatch event to add polygon to map
        window.dispatchEvent(new CustomEvent('updateIncidenciaPolygon', {
          detail: {
            feature,
            center: data.incidencia.centroid_geom?.coordinates || null
          }
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar dados de incidência:", error);
      setError("Erro ao buscar dados de incidência");
    } finally {
      setFetchingIncidencia(false);
    }
  };

  return (
    <MenuContainer>
      <MenuTitle>Cidades</MenuTitle>
      
      <StyledSelect
        value={selectedCidade || ''} 
        onChange={handleSelectChange}
      >
        <option value="">Selecione</option>
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
        {fetchingIncidencia ? 'Buscando...' : 'Buscar Incidência'}
      </SearchButton>
      
      {error && <NoticeBanner>{error}</NoticeBanner>}
    </MenuContainer>
  );
};

export default CidadesMenu;