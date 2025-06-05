import type React from 'react';
import { useEffect, useState } from 'react';
import type { IncidenciaData } from '../types/Incidentia.types';
import { 
  CloseButton, 
  Container, 
  IncidenciaCard, 
  MonthsGrid,
  MonthsToggle,
  Title,
  NoDataMessage,
  CityName,
  MeterDisplay,
  MeterDigit,
  MeterUnit,
  MonthMeter,
  MonthLabel,
  MonthBar,
  MonthBarValue,
  MonthBarFill
} from '../styles/incidencias.style';

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

  // Create digital display digits
  const getDigits = (value: number): string[] => {
    return value.toString().padStart(5, '0').split('');
  };

  // Find the highest monthly value to calculate percentages
  const getMaxMonthlyValue = (mensal: any): number => {
    return Math.max(
      mensal.jan, mensal.fev, mensal.mar, 
      mensal.abr, mensal.mai, mensal.jun,
      mensal.jul, mensal.ago, mensal.set,
      mensal.out, mensal.nov, mensal.dez
    );
  };

  // Format the annual value with thousands separator
  const formatAnnualValue = (value: number): string => {
    return value.toLocaleString('pt-BR');
  };

  // Get color description based on annual value
  const getValueCategory = (value: number): string => {
    if (value < 4000) return 'baixa';
    if (value < 5000) return 'média';
    if (value < 6000) return 'alta';
    return 'muito alta';
  };

  if (!visible || !incidenciaData) {
    return null;
  }

  const maxMonthValue = incidenciaData.incidencia?.mensal ? 
    getMaxMonthlyValue(incidenciaData.incidencia.mensal) : 0;

  return (
    <Container>
      <CloseButton onClick={() => setVisible(false)}>×</CloseButton>
      <Title>Incidência Solar</Title>
      
      {incidenciaData.incidencia ? (
        <IncidenciaCard>
          <CityName>{incidenciaData.cidade.nome}</CityName>
          
          {/* Modern Single-line Display with Dynamic Color */}
          <MeterDisplay>
            <MeterDigit value={incidenciaData.incidencia.anual}>
              {formatAnnualValue(incidenciaData.incidencia.anual)}
            </MeterDigit>
            <MeterUnit value={incidenciaData.incidencia.anual}>
              Wh/m²/dia • Incidência {getValueCategory(incidenciaData.incidencia.anual)}
            </MeterUnit>
          </MeterDisplay>
          
          <details>
            <MonthsToggle>Detalhes Mensais</MonthsToggle>
            <MonthsGrid>
              {/* Monthly bar chart with color-changing values */}
              <MonthMeter>
                <MonthLabel>Jan</MonthLabel>
                <MonthBar>
                  <MonthBarFill 
                    percent={(incidenciaData.incidencia.mensal.jan / maxMonthValue) * 100} 
                  />
                </MonthBar>
                <MonthBarValue 
                  value={incidenciaData.incidencia.mensal.jan}
                  maxValue={maxMonthValue}
                >
                  {incidenciaData.incidencia.mensal.jan}
                </MonthBarValue>
              </MonthMeter>
              
              <MonthMeter>
                <MonthLabel>Fev</MonthLabel>
                <MonthBar>
                  <MonthBarFill 
                    percent={(incidenciaData.incidencia.mensal.fev / maxMonthValue) * 100} 
                  />
                </MonthBar>
                <MonthBarValue 
                  value={incidenciaData.incidencia.mensal.fev}
                  maxValue={maxMonthValue}
                >
                  {incidenciaData.incidencia.mensal.fev}
                </MonthBarValue>
              </MonthMeter>

              <MonthMeter>
                <MonthLabel>Mar</MonthLabel>
                <MonthBar>
                  <MonthBarFill 
                    percent={(incidenciaData.incidencia.mensal.mar / maxMonthValue) * 100} 
                  />
                </MonthBar>
                <MonthBarValue>{incidenciaData.incidencia.mensal.mar}</MonthBarValue>
              </MonthMeter>
              
              <MonthMeter>
                <MonthLabel>Abr</MonthLabel>
                <MonthBar>
                  <MonthBarFill 
                    percent={(incidenciaData.incidencia.mensal.abr / maxMonthValue) * 100} 
                  />
                </MonthBar>
                <MonthBarValue>{incidenciaData.incidencia.mensal.abr}</MonthBarValue>
              </MonthMeter>
              
              <MonthMeter>
                <MonthLabel>Mai</MonthLabel>
                <MonthBar>
                  <MonthBarFill 
                    percent={(incidenciaData.incidencia.mensal.mai / maxMonthValue) * 100} 
                  />
                </MonthBar>
                <MonthBarValue>{incidenciaData.incidencia.mensal.mai}</MonthBarValue>
              </MonthMeter>
              
              <MonthMeter>
                <MonthLabel>Jun</MonthLabel>
                <MonthBar>
                  <MonthBarFill 
                    percent={(incidenciaData.incidencia.mensal.jun / maxMonthValue) * 100} 
                  />
                </MonthBar>
                <MonthBarValue>{incidenciaData.incidencia.mensal.jun}</MonthBarValue>
              </MonthMeter>
              
              <MonthMeter>
                <MonthLabel>Jul</MonthLabel>
                <MonthBar>
                  <MonthBarFill 
                    percent={(incidenciaData.incidencia.mensal.jul / maxMonthValue) * 100} 
                  />
                </MonthBar>
                <MonthBarValue>{incidenciaData.incidencia.mensal.jul}</MonthBarValue>
              </MonthMeter>
              
              <MonthMeter>
                <MonthLabel>Ago</MonthLabel>
                <MonthBar>
                  <MonthBarFill 
                    percent={(incidenciaData.incidencia.mensal.ago / maxMonthValue) * 100} 
                  />
                </MonthBar>
                <MonthBarValue>{incidenciaData.incidencia.mensal.ago}</MonthBarValue>
              </MonthMeter>
              
              <MonthMeter>
                <MonthLabel>Set</MonthLabel>
                <MonthBar>
                  <MonthBarFill 
                    percent={(incidenciaData.incidencia.mensal.set / maxMonthValue) * 100} 
                  />
                </MonthBar>
                <MonthBarValue>{incidenciaData.incidencia.mensal.set}</MonthBarValue>
              </MonthMeter>
              
              <MonthMeter>
                <MonthLabel>Out</MonthLabel>
                <MonthBar>
                  <MonthBarFill 
                    percent={(incidenciaData.incidencia.mensal.out / maxMonthValue) * 100} 
                  />
                </MonthBar>
                <MonthBarValue>{incidenciaData.incidencia.mensal.out}</MonthBarValue>
              </MonthMeter>
              
              <MonthMeter>
                <MonthLabel>Nov</MonthLabel>
                <MonthBar>
                  <MonthBarFill 
                    percent={(incidenciaData.incidencia.mensal.nov / maxMonthValue) * 100} 
                  />
                </MonthBar>
                <MonthBarValue>{incidenciaData.incidencia.mensal.nov}</MonthBarValue>
              </MonthMeter>
              
              <MonthMeter>
                <MonthLabel>Dez</MonthLabel>
                <MonthBar>
                  <MonthBarFill 
                    percent={(incidenciaData.incidencia.mensal.dez / maxMonthValue) * 100} 
                  />
                </MonthBar>
                <MonthBarValue 
                  value={incidenciaData.incidencia.mensal.dez}
                  maxValue={maxMonthValue}
                >
                  {incidenciaData.incidencia.mensal.dez}
                </MonthBarValue>
              </MonthMeter>
            </MonthsGrid>
          </details>
        </IncidenciaCard>
      ) : (
        <NoDataMessage>
          {incidenciaData.mensagem || "Dados não disponíveis para esta região."}
        </NoDataMessage>
      )}
    </Container>
  );
};

export default IncidenciaSolar;
