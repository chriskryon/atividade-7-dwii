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
  const [dataVisible, setDataVisible] = useState(false);
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

  // Effect to handle fade animation when selectedSetor changes
  useEffect(() => {
    if (selectedSetor && !loading) {
      setDataVisible(false);
      
      const timer = setTimeout(() => {
        setDataVisible(true);
      }, 250);
      
      return () => clearTimeout(timer);
    } else {
      setDataVisible(false);
    }
  }, [selectedSetor, loading]);

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
          <div style={{ marginTop: '12px', fontWeight: 600 }}>Carregando setor...</div>
        </NoDataMessage>
      )}

      {error && (
        <NoDataMessage>
          <div style={{ color: '#ff3b30', fontWeight: 600 }}>⚠️ {error}</div>
        </NoDataMessage>
      )}

      {!loading && !error && !selectedSetor && (
        <NoDataMessage>
          <div style={{ fontWeight: 600 }}>Aguardando seleção</div>
        </NoDataMessage>
      )}

      {selectedSetor && !loading && (
        <div style={{
          opacity: dataVisible ? 1 : 0,
          transform: dataVisible ? 'translateY(0)' : 'translateY(5px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
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
              Área: {formatArea(selectedSetor.area_km2)}
            </AreaInfo>
          </SectorCard>
        </div>
      )}
    </Container>
  );
};

export default SetorCensitario;