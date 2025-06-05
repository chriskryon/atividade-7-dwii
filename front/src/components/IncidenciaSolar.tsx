import type React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

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

const Container = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 16px;
  width: 320px;
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0 0 12px 0;
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23f39c12'%3E%3Ccircle cx='12' cy='12' r='5'/%3E%3Cline x1='12' y1='1' x2='12' y2='3'/%3E%3Cline x1='12' y1='21' x2='12' y2='23'/%3E%3Cline x1='4.22' y1='4.22' x2='5.64' y2='5.64'/%3E%3Cline x1='18.36' y1='18.36' x2='19.78' y2='19.78'/%3E%3Cline x1='1' y1='12' x2='3' y2='12'/%3E%3Cline x1='21' y1='12' x2='23' y2='12'/%3E%3Cline x1='4.22' y1='19.78' x2='5.64' y2='18.36'/%3E%3Cline x1='18.36' y1='5.64' x2='19.78' y2='4.22'/%3E%3C/svg%3E");
    background-size: contain;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #cbd5e0;
  
  &:hover {
    color: #a0aec0;
  }
`;

const IncidenciaCard = styled.div`
  margin-top: 10px;
  padding: 15px;
  background-color: #f0f9ff;
  border-radius: 6px;
  border-left: 4px solid #3498db;
`;

const CityName = styled.h4`
  margin: 0 0 10px 0;
  color: #2b6cb0;
  font-weight: 600;
`;

const AnualValue = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  background: linear-gradient(to right, #f6d365 0%, #fda085 100%);
  border-radius: 6px;
  color: white;
  
  span:first-child {
    font-weight: 600;
    margin-right: 8px;
  }
  
  span:last-child {
    font-size: 20px;
    font-weight: 700;
  }
`;

const MonthsToggle = styled.summary`
  cursor: pointer;
  padding: 8px 4px;
  font-weight: 500;
  color: #4a5568;
  
  &:hover {
    color: #3182ce;
  }
`;

const MonthsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 10px;
`;

const MonthCard = styled.div`
  background-color: #edf2f7;
  border-radius: 4px;
  padding: 8px;
  text-align: center;
`;

const MonthName = styled.div`
  font-size: 13px;
  color: #718096;
  margin-bottom: 4px;
`;

const MonthValue = styled.div`
  font-weight: 600;
  color: #2d3748;
`;

const NoDataMessage = styled.div`
  padding: 15px;
  background-color: #fff3cd;
  border-radius: 6px;
  color: #856404;
  text-align: center;
  font-weight: 500;
`;

const IncidenciaSolar: React.FC = () => {
  const [incidenciaData, setIncidenciaData] = useState<IncidenciaData | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleIncidenciaData = (event: Event) => {
      const customEvent = event as CustomEvent;
      setIncidenciaData(customEvent.detail);
      setVisible(true);
    };

    window.addEventListener('incidenciaData', handleIncidenciaData);

    return () => {
      window.removeEventListener('incidenciaData', handleIncidenciaData);
    };
  }, []);

  if (!visible || !incidenciaData) {
    return null;
  }

  return (
    <Container>
      <CloseButton onClick={() => setVisible(false)}>×</CloseButton>
      <Title>Incidência Solar</Title>
      
      {incidenciaData.incidencia ? (
        <IncidenciaCard>
          <CityName>{incidenciaData.cidade.nome}</CityName>
          <AnualValue>
            <span>Média Anual:</span>
            <span>{incidenciaData.incidencia.anual}</span>
            <span style={{ marginLeft: '5px', fontSize: '14px' }}>Wh/m²/dia</span>
          </AnualValue>
          
          <details>
            <MonthsToggle>Valores mensais</MonthsToggle>
            <MonthsGrid>
              <MonthCard>
                <MonthName>Janeiro</MonthName>
                <MonthValue>{incidenciaData.incidencia.mensal.jan}</MonthValue>
              </MonthCard>
              <MonthCard>
                <MonthName>Fevereiro</MonthName>
                <MonthValue>{incidenciaData.incidencia.mensal.fev}</MonthValue>
              </MonthCard>
              <MonthCard>
                <MonthName>Março</MonthName>
                <MonthValue>{incidenciaData.incidencia.mensal.mar}</MonthValue>
              </MonthCard>
              <MonthCard>
                <MonthName>Abril</MonthName>
                <MonthValue>{incidenciaData.incidencia.mensal.abr}</MonthValue>
              </MonthCard>
              <MonthCard>
                <MonthName>Maio</MonthName>
                <MonthValue>{incidenciaData.incidencia.mensal.mai}</MonthValue>
              </MonthCard>
              <MonthCard>
                <MonthName>Junho</MonthName>
                <MonthValue>{incidenciaData.incidencia.mensal.jun}</MonthValue>
              </MonthCard>
              <MonthCard>
                <MonthName>Julho</MonthName>
                <MonthValue>{incidenciaData.incidencia.mensal.jul}</MonthValue>
              </MonthCard>
              <MonthCard>
                <MonthName>Agosto</MonthName>
                <MonthValue>{incidenciaData.incidencia.mensal.ago}</MonthValue>
              </MonthCard>
              <MonthCard>
                <MonthName>Setembro</MonthName>
                <MonthValue>{incidenciaData.incidencia.mensal.set}</MonthValue>
              </MonthCard>
              <MonthCard>
                <MonthName>Outubro</MonthName>
                <MonthValue>{incidenciaData.incidencia.mensal.out}</MonthValue>
              </MonthCard>
              <MonthCard>
                <MonthName>Novembro</MonthName>
                <MonthValue>{incidenciaData.incidencia.mensal.nov}</MonthValue>
              </MonthCard>
              <MonthCard>
                <MonthName>Dezembro</MonthName>
                <MonthValue>{incidenciaData.incidencia.mensal.dez}</MonthValue>
              </MonthCard>
            </MonthsGrid>
          </details>
        </IncidenciaCard>
      ) : (
        <NoDataMessage>
          {incidenciaData.mensagem || "Não há dados de incidência disponíveis para esta cidade."}
        </NoDataMessage>
      )}
    </Container>
  );
};

export default IncidenciaSolar;
