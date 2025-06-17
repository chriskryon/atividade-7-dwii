import React, { memo, useRef, useEffect, useState } from 'react';
import { 
  MenuContainer, 
  MenuTitle, 
  NoticeBanner, 
  SearchButton, 
  StyledSelect, 
  Spinner,
  TransitionContainer
} from '../styles/cidades.style';
import { useCidade } from '../hooks/useCidade';

interface CidadesMenuProps {
  onCidadeSelect?: (cidadeId: number, coordinates?: [number, number]) => void;
  selectedCidade?: number | null;
}

const CidadesMenu: React.FC<CidadesMenuProps> = memo(({ onCidadeSelect }) => {
  const { selectedCidade, cidades, changeCidade, loading, error, setoresLoading } = useCidade();
  const [height, setHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading || setoresLoading || error) {
      const contentHeight = contentRef.current?.scrollHeight || 0;
      setHeight(contentHeight);
    } else {
      setHeight(0);
    }
  }, [loading, setoresLoading, error]);

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
    <MenuContainer style={{ width: '100%' }}>
      <MenuTitle>Cidade:</MenuTitle>
      
      <StyledSelect
        value={selectedCidade?.id || ''} 
        onChange={handleSelectChange}
        disabled={loading || setoresLoading}
        style={{ width: '100%' }}
      >
        {cidades.map(cidade => (
          <option key={cidade.id} value={cidade.id}>
            {cidade.nome}
          </option>
        ))}
      </StyledSelect>
      
      <TransitionContainer height={height}>
        <div ref={contentRef}>
          {(loading || setoresLoading) && (
            <NoticeBanner style={{ 
              background: 'rgba(102, 126, 234, 0.1)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              color: '#667eea',
              width: '100%'
            }}>
              {loading ? (
                <>🔍 Carregando cidades...</>
              ) : (
                <>
                  <Spinner />
                  Buscando setores censitários...
                </>
              )}
            </NoticeBanner>
          )}
          
          {error && (
            <NoticeBanner style={{
              background: 'rgba(255, 59, 48, 0.1)',
              border: '1px solid rgba(255, 59, 48, 0.2)',
              color: '#d70015',
              width: '100%'
            }}>
              ⚠️ {error}
            </NoticeBanner>
          )}
        </div>
      </TransitionContainer>
    </MenuContainer>
  );
});

CidadesMenu.displayName = 'CidadesMenu';

export default CidadesMenu;