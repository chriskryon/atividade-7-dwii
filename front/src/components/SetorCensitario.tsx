import type React from 'react';
import { useEffect, useState } from 'react';
import { censoApi } from '../services/api';
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

interface SectorData {
  cd_setor: string;
  situacao: string;
  area_km2: number;
  nm_mun: string;
  geom: string;
}

const SetorCensitario: React.FC = () => {
  const [sectorData, setSectorData] = useState<SectorData | null>(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMapClick = async (event: Event) => {
      const customEvent = event as CustomEvent;
      const { lngLat } = customEvent.detail;
      
      if (lngLat) {
        await fetchSectorData(lngLat.lng, lngLat.lat);
      }
    };

    window.addEventListener('mapClick', handleMapClick);
    return () => window.removeEventListener('mapClick', handleMapClick);
  }, []);

  const fetchSectorData = async (x: number, y: number) => {
    setLoading(true);
    setError(null);
    setVisible(true);

    try {
      const data = await censoApi.getByPoint(x, y);
      
      if (data.message) {
        setError(data.message);
        setSectorData(null);
      } else {
        setSectorData(data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar dados');
      setSectorData(null);
    } finally {
      setLoading(false);
    }
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
      <CloseButton onClick={() => setVisible(false)}>×</CloseButton>
      
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

      {sectorData && !loading && (
        <SectorCard>
          <SectorCode>
            {getSectorCode(sectorData.cd_setor)}
          </SectorCode>
          
          <ZoneType>
            Zona {getZoneType(sectorData.situacao)}
          </ZoneType>
          
          <CityName>
            {sectorData.nm_mun}
          </CityName>
          
          <AreaInfo>
            {formatArea(sectorData.area_km2)}
          </AreaInfo>
        </SectorCard>
      )}
    </Container>
  );
};

export default SetorCensitario;