import React from 'react';
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

interface IncidenciaSolarProps {
  data: IncidenciaData | null;
  onClose: () => void;
}

const Container = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 700px;
  padding: 20px;
  z-index: 100;
  color: #333;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
`;

const Title = styled.h2`
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: #e67e22;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #95a5a6;
  transition: color 0.2s;
  
  &:hover {
    color: #e74c3c;
  }
`;

const AnualDisplay = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
  padding: 15px;
  border-radius: 8px;
  color: white;
`;

const Label = styled.div`
  font-weight: bold;
  margin-right: 15px;
`;

const Value = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
`;

const Unit = styled.div`
  margin-left: 10px;
  align-self: flex-end;
  margin-bottom: 8px;
`;

const MonthsContainer = styled.div`
  margin-top: 15px;
`;

const MonthsToggle = styled.button`
  width: 100%;
  background: #f8f9fa;
  border: none;
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s;
  font-weight: bold;
  
  &:hover {
    background: #e9ecef;
  }
`;

const MonthsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 15px;
`;

const MonthCard = styled.div`
  background: #f8f9fa;
  border-radius: 6px;
  padding: 10px;
  text-align: center;
`;

const MonthName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  color: #7f8c8d;
`;

const MonthValue = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  color: #3498db;
`;

const SunIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const IncidenciaSolar: React.FC<IncidenciaSolarProps> = ({ data, onClose }) => {
  const [showMonthly, setShowMonthly] = React.useState(false);

  if (!data) return null;

  return (
    <Container>
      <Header>
        <Title>
          <SunIcon /> 
          Incidência Solar: {data.cidade.nome}
        </Title>
        <CloseButton onClick={onClose}>×</CloseButton>
      </Header>

      {data.incidencia ? (
        <>
          <AnualDisplay>
            <Label>Média Anual:</Label>
            <Value>{data.incidencia.anual}</Value>
            <Unit>Wh/m²/dia</Unit>
          </AnualDisplay>

          <MonthsContainer>
            <MonthsToggle onClick={() => setShowMonthly(!showMonthly)}>
              <span>Dados Mensais</span>
              <span>{showMonthly ? '▲' : '▼'}</span>
            </MonthsToggle>
            
            {showMonthly && (
              <MonthsGrid>
                {Object.entries(data.incidencia.mensal).map(([month, value]) => (
                  <MonthCard key={month}>
                    <MonthName>{month.charAt(0).toUpperCase() + month.slice(1)}</MonthName>
                    <MonthValue>{value}</MonthValue>
                  </MonthCard>
                ))}
              </MonthsGrid>
            )}
          </MonthsContainer>
        </>
      ) : (
        <div style={{ padding: "15px", backgroundColor: "#fff3cd", borderRadius: "6px" }}>
          {data.mensagem || "Não há dados disponíveis para esta cidade."}
        </div>
      )}
    </Container>
  );
};

export default IncidenciaSolar;
