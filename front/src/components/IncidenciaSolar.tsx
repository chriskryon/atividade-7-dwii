import type React from 'react';
import { useEffect, useState} from 'react';
import type { IncidenciaData } from '../types/Incidentia.types';
import { AnualValue, CityName, CloseButton, Container, IncidenciaCard, MonthCard, MonthName, MonthsGrid, MonthsToggle, MonthValue, NoDataMessage, Title } from '../styles/incidencias.style';


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
