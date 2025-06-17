import { useState } from 'react';
import { MenuContainer, MenuTitle, NoticeBanner, SearchButton, StyledSelect } from '../styles/cidades.style';
import { useCidade } from '../hooks/useCidade';

interface CidadesMenuProps {
  onCidadeSelect?: (cidadeId: number, coordinates?: [number, number]) => void;
  selectedCidade?: number | null;
}

const CidadesMenu: React.FC<CidadesMenuProps> = ({ onCidadeSelect }) => {
  const { selectedCidade, cidades, changeCidade, loading, error, setoresLoading } = useCidade();

  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cidadeId = Number(e.target.value);
    
    await changeCidade(cidadeId);
    
    if (onCidadeSelect) {
      const cidade = cidades.find(c => c.id === cidadeId);
      if (cidade) {
        onCidadeSelect(cidadeId, cidade.geometry.coordinates as [number, number]);
      }
    }
  };

  return (
    <MenuContainer>
      <MenuTitle>Setores Censitários</MenuTitle>
      
      <StyledSelect
        value={selectedCidade?.id || ''} 
        onChange={handleSelectChange}
        disabled={loading || setoresLoading}
      >
        {cidades.map(cidade => (
          <option key={cidade.id} value={cidade.id}>
            {cidade.nome}
          </option>
        ))}
      </StyledSelect>
      
      {(loading || setoresLoading) && (
        <NoticeBanner>
          {loading ? 'Carregando cidades...' : 'Buscando setores...'}
        </NoticeBanner>
      )}
      
      {error && (
        <NoticeBanner>
          {error}
        </NoticeBanner>
      )}
    </MenuContainer>
  );
};

export default CidadesMenu;