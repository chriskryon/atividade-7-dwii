import type React from 'react';
import { useEffect, useState } from 'react';
import { 
  Container,
  CloseButton,
  SectorCard,
  SectorCode,
  ZoneType,
  CityName,
  AreaInfo,
  NoDataMessage,
  LoadingSpinner
} from '../styles/setor.style';
import { useSetor } from '../hooks/useSetor';

const SetorCensitario: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { selectedSetor, loading, error, fetchSetorByClick, clearSelection } = useSetor();

  useEffect(() => {
    const handleMapClick = async (event: Event) => {
      const customEvent = event as CustomEvent;
      const { lngLat } = customEvent.detail;
      
      if (lngLat) {
        setVisible(true);
        await fetchSetorByClick(lngLat.lng, lngLat.lat);
      }
    };

    window.addEventListener('mapClick', handleMapClick);
    return () => window.removeEventListener('mapClick', handleMapClick);
  }, [fetchSetorByClick]);

  const handleClose = () => {
    setVisible(false);
    clearSelection();
  };

  const getZoneType = (situacao: string): string => {
    if (situacao === 'Rural' || situacao === '3') return 'Rural';
    if (situacao === 'Urbana' || situacao === '1') return 'Urbana';
    if (situacao === 'Especial' || situacao === '2') return 'Especial';
    return 'Desconhecida';
  };

  const formatArea = (area: number): string => {
    if (area < 1) {
      return `${(area * 1000000).toFixed(0)} m²`;
    }
    return `${area.toFixed(2)} km²`;
  };

  const getSectorCode = (fullCode: string): string => {
    return fullCode.slice(-6);
  };

  if (!visible) return null;

  return (
    <Container>
      <CloseButton onClick={handleClose}>×</CloseButton>
      
      {loading && (
        <NoDataMessage>
          <LoadingSpinner />
          <div style={{ marginTop: '8px' }}>Carregando...</div>
        </NoDataMessage>
      )}

      {error && (
        <NoDataMessage>
          <div style={{ color: '#dc2626' }}>⚠️ {error}</div>
        </NoDataMessage>
      )}

      {selectedSetor && !loading && (
        <SectorCard>
          <SectorCode>
            {getSectorCode(selectedSetor.cd_setor)}
          </SectorCode>
          
          <ZoneType>
            Zona {getZoneType(selectedSetor.situacao)}
          </ZoneType>
          
          <CityName>
            {selectedSetor.nm_mun}
          </CityName>
          
          <AreaInfo>
            {formatArea(selectedSetor.area_km2)}
          </AreaInfo>
        </SectorCard>
      )}
    </Container>
  );
};

export default SetorCensitario;