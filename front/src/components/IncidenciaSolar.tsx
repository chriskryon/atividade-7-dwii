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
  LocationInfo,
  MeterDisplay,
  MeterDigit,
  MeterUnit,
  MonthMeter,
  MonthLabel,
  MonthBar,
  MonthBarValue,
  MonthBarFill,
  MetricHeader,
  MetricTitle,
  MetricCategory
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
    if (value < 4000) return 'Baixa';
    if (value < 5000) return 'Média';
    if (value < 6000) return 'Alta';
    return 'Muito alta';
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
          
          <MeterDisplay>
            <MeterDigit value={incidenciaData.incidencia.anual}>
              {formatAnnualValue(incidenciaData.incidencia.anual)}
            </MeterDigit>
            <MeterUnit>
              Wh/m²/dia
            </MeterUnit>
          </MeterDisplay>
          
          <details>
            <MonthsToggle>Variação Mensal</MonthsToggle>
            <MonthsGrid>
              {/* Meses em ordem cronológica */}
              {(
                [
                  { key: 'jan', label: 'Jan' },
                  { key: 'fev', label: 'Fev' },
                  { key: 'mar', label: 'Mar' },
                  { key: 'abr', label: 'Abr' },
                  { key: 'mai', label: 'Mai' },
                  { key: 'jun', label: 'Jun' },
                  { key: 'jul', label: 'Jul' },
                  { key: 'ago', label: 'Ago' },
                  { key: 'set', label: 'Set' },
                  { key: 'out', label: 'Out' },
                  { key: 'nov', label: 'Nov' },
                  { key: 'dez', label: 'Dez' }
                ] as const
              ).map(({ key, label }) => (
                <MonthMeter key={key}>
                  <MonthLabel>{label}</MonthLabel>
                  <MonthBar>
                    <MonthBarFill 
                      percent={
                        incidenciaData.incidencia?.mensal?.[key] !== undefined && maxMonthValue > 0
                          ? (incidenciaData.incidencia.mensal[key] / maxMonthValue) * 100
                          : 0
                      } 
                    />
                  </MonthBar>
                  <MonthBarValue 
                    value={incidenciaData.incidencia?.mensal?.[key] ?? 0}
                    maxValue={maxMonthValue}
                  >
                    {incidenciaData.incidencia?.mensal?.[key] ?? 0}
                  </MonthBarValue>
                </MonthMeter>
              ))}
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