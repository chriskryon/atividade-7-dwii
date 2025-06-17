import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 70px;
  right: 15px;
  width: 300px;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 18px;
  padding: 18px;
  z-index: 10;
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(240, 240, 240, 0.9);
  overflow: hidden;
  
  &:hover {
    box-shadow: 
      0 12px 28px rgba(0, 0, 0, 0.15),
      0 2px 10px rgba(0, 0, 0, 0.05);
    transform: translateY(-3px);
  }
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #0066CC;
  text-align: center;
  letter-spacing: -0.5px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(240, 240, 240, 0.8);
  border: none;
  font-size: 18px;
  color: #555;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.08);
    color: #222;
    transform: rotate(90deg);
  }
  
  &:focus {
    outline: none;
  }
`;

export const IncidenciaCard = styled.div`
  border-radius: 14px;
  background: #FFFFFF;
  padding: 14px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(200, 210, 220, 0.4);
`;

export const CityName = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
  letter-spacing: -0.3px;
  text-align: center;
`;

export const LocationInfo = styled.div`
  display: flex;
  justify-content: center;
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
  gap: 5px;
`;

export const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const MetricTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #555;
  
  &::before {
    content: '☀️';
    margin-right: 5px;
  }
`;

export const MetricCategory = styled.div<{ value: number }>`
  font-size: 13.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 14px;
  color: ${(props) => {
    if (props.value < 4000) return "#2E7D32"; // Verde para baixa
    if (props.value < 5000) return "#EF6C00"; // Laranja para média
    if (props.value < 6000) return "#D84315"; // Laranja escuro para alta
    return "#C62828";                        // Vermelho para muito alta
  }};
  background-color: ${(props) => {
    if (props.value < 4000) return "rgba(46, 125, 50, 0.12)";
    if (props.value < 5000) return "rgba(239, 108, 0, 0.12)";
    if (props.value < 6000) return "rgba(216, 67, 21, 0.12)";
    return "rgba(198, 40, 40, 0.12)";
  }};
`;

export const MeterDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 12px 0 16px;
  padding: 16px 10px;
  background: linear-gradient(180deg, #FCFCFE 0%, #F6F8FD 100%);
  border-radius: 12px;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.03),
    0 1px 3px rgba(0, 0, 0, 0.02);
  position: relative;
  border: 1px solid rgba(200, 210, 220, 0.4);
`;

export const MeterDigit = styled.span<{ value: number }>`
  display: inline;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 36px;
  font-weight: 600;
  color: ${(props) => {
    if (props.value < 4000) return "#2E7D32";
    if (props.value < 5000) return "#EF6C00";
    if (props.value < 6000) return "#D84315";
    return "#C62828";
  }};
  letter-spacing: -0.5px;
`;

export const MeterUnit = styled.div`
  color: #637381;
  font-size: 13px;
  font-weight: 500;
  margin-top: 8px;
`;

export const MonthsToggle = styled.summary`
  cursor: pointer;
  font-size: 14.5px;
  font-weight: 500;
  color: #0071e3;
  margin: 8px 0 0;
  padding: 10px 14px;
  user-select: none;
  border-radius: 12px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 113, 227, 0.06);
  border: 1px solid rgba(0, 113, 227, 0.15);
  position: relative;
  
  &:hover {
    background: rgba(0, 113, 227, 0.09);
  }
  
  &::before {
    content: '📊';
    margin-right: 10px;
    font-size: 15px;
  }
  
  &::after {
    content: '';
    width: 14px;
    height: 14px;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%230071e3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    transition: transform 0.2s ease;
  }
  
  details[open] > & {
    border-radius: 12px 12px 0 0;
    border-bottom-color: transparent;
    
    &::after {
      transform: rotate(180deg);
    }
  }
`;

export const MonthsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin: 0;
  padding: 14px 12px;
  background: rgba(250, 252, 255, 0.8);
  border: 1px solid rgba(0, 113, 227, 0.15);
  border-top: none;
  border-radius: 0 0 12px 12px;
  animation: slideDown 0.25s ease;
  max-height: 240px;
  overflow-y: auto;
  
  // Custom scrollbar styling
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(240, 245, 250, 0.6);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 113, 227, 0.25);
    border-radius: 10px;
    
    &:hover {
      background: rgba(0, 113, 227, 0.35);
    }
  }
  
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const MonthMeter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 24px;
`;

export const MonthLabel = styled.div`
  width: 30px;
  font-size: 13px;
  font-weight: 500;
  color: #444;
`;

export const MonthBar = styled.div`
  flex: 1;
  height: 8px;
  background: #f0f4f8;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 8px;
  position: relative;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
`;

export const MonthBarFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${(props) => props.percent}%;
  background: ${(props) => {
    if (props.percent < 30) return "linear-gradient(90deg, #4CAF50, #66BB6A)";
    if (props.percent < 50) return "linear-gradient(90deg, #FFC107, #FFD54F)";
    if (props.percent < 75) return "linear-gradient(90deg, #FF9800, #FFA726)";
    return "linear-gradient(90deg, #F44336, #EF5350)";
  }};
  border-radius: 4px;
  transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 1px 1px rgba(0,0,0,0.05);
`;

export const MonthBarValue = styled.div<{ value?: number; maxValue?: number }>`
  width: 56px;
  font-size: 13px;
  font-weight: 500;
  color: #333;
  text-align: right;
  
  &::after {
    content: ' Wh/m²';
    font-size: 10px;
    color: #777;
    margin-left: 2px;
  }
`;

export const NoDataMessage = styled.div`
  padding: 22px;
  text-align: center;
  color: #555;
  font-size: 14px;
  font-style: italic;
  background: #fafcff;
  border-radius: 12px;
  margin-top: 16px;
  border: 1px dashed #ccd4e0;
  
  &::before {
    content: "⚠️";
    display: block;
    font-size: 24px;
    margin-bottom: 10px;
  }
`;

// Manter estilos que podem ser necessários
export const AnualValue = styled.div`
  /* Keep if needed for other components */
`;

export const MonthCard = styled.div`
  /* Keep if needed for other components */
`;

export const MonthName = styled.div`
  /* Keep if needed for other components */
`;

export const MonthValue = styled.div`
  /* Keep if needed for other components */
`;