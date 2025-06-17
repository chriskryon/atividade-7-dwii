import { useState } from 'react';
import { useMapContext } from '../contexts/MapContext';
import type { CidadesMenuProps } from '../types/menu.types';
import { MenuContainer, MenuTitle, NoticeBanner, SearchButton, StyledSelect } from '../styles/cidades.style';
import { cidadesFiltradas as cidades } from '../utils/cidades_filter';

const CidadesMenu: React.FC<CidadesMenuProps> = ({ onCidadeSelect, selectedCidade }) => {
  const [error, setError] = useState<string | null>(null);
  const [fetchingSetorCensitario, setFetchingSetorCensitario] = useState(false);
  const { fetchCensusData, selectedCity, updateSelectedCity } = useMapContext();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cidadeId = Number(e.target.value);
    const selectedCityData = cidades.find(c => c.id === cidadeId);
    
    if (selectedCityData) {
      updateSelectedCity(selectedCityData.nome);
      
      if (onCidadeSelect) {
        onCidadeSelect(cidadeId, selectedCityData.geometry.coordinates as [number, number]);
      }
    }
  };
  
  const handleBuscarClick = async () => {
    const cityToSearch = selectedCity || 'Jacareí';
    
    console.log(`handleBuscarClick chamado. Cidade a buscar: ${cityToSearch}`);
    console.log(`fetchCensusData disponível:`, !!fetchCensusData);
    
    try {
      setFetchingSetorCensitario(true);
      setError(null);

      console.log(`Iniciando busca para a cidade: ${cityToSearch}`);
      
      // Buscar setores censitários passando o nome da cidade
      if (fetchCensusData) {
        console.log('Chamando fetchCensusData...');
        await fetchCensusData(cityToSearch);
        console.log('fetchCensusData concluído');
      } else {
        console.error('fetchCensusData não está disponível');
        setError('Erro: função de busca não disponível');
      }
      
    } catch (error: any) {
      console.error("Erro ao buscar dados:", error);
      setError(`Erro ao buscar dados para ${cityToSearch}: ${error.message}`);
    } finally {
      setFetchingSetorCensitario(false);
    }
  };

  return (
    <MenuContainer>
      <MenuTitle>Setores Censitários</MenuTitle>
      
      <StyledSelect
        value={cidades.find(c => c.nome === selectedCity)?.id || 2} 
        onChange={handleSelectChange}
      >
        {cidades.map(cidade => (
          <option key={cidade.id} value={cidade.id}>
            {cidade.nome}
          </option>
        ))}
      </StyledSelect>
      
      <SearchButton 
        onClick={handleBuscarClick}
        disabled={fetchingSetorCensitario}
      >
        {fetchingSetorCensitario ? 'Buscando...' : 'Buscar Dados'}
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