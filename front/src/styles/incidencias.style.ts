import styled from "styled-components";

export const Container = styled.div`
  position: fixed; // Changed from absolute to fixed to stay in place when scrolling
  top: 70px;
  right: 15px;
  width: 290px; // Reduced from 320px
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 14px; // Reduced from 16px
  padding: 14px; // Reduced from 18px
  z-index: 10;
  box-shadow: 
    0 6px 16px rgba(0, 0, 0, 0.08),
    0 2px 6px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(240, 240, 240, 0.8);
  overflow: hidden;
  
  &:hover {
    box-shadow: 
      0 10px 22px rgba(0, 0, 0, 0.1),
      0 2px 8px rgba(0, 0, 0, 0.04);
  }
`;

export const Title = styled.h2`
  font-size: 17px; // Increased from 16px
  font-weight: 600;
  margin: 0 0 14px 0; // Reduced from 18px
  color: #0066CC;
  text-align: center;
  letter-spacing: -0.5px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px; // Reduced from 12px
  right: 10px; // Reduced from 12px
  width: 22px; // Reduced from 26px
  height: 22px; // Reduced from 26px
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(240, 240, 240, 0.7);
  border: none;
  font-size: 18px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #333;
  }
  
  &:focus {
    outline: none;
  }
`;

export const IncidenciaCard = styled.div`
  border-radius: 12px; // Reduced from 14px
  background: #FFFFFF;
  padding: 12px; // Reduced from 16px
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(200, 210, 220, 0.3);
`;

export const CityName = styled.h3`
  font-size: 16px; // Increased from 15px
  font-weight: 500;
  color: #333;
  margin: 0 0 6px 0; // Reduced from 8px
  letter-spacing: -0.3px;
  text-align: center;
`;

export const LocationInfo = styled.div`
  display: flex;
  justify-content: center;
  font-size: 12.5px; // Increased from 12px
  color: #666;
  margin-bottom: 16px;
  gap: 4px;
`;

export const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const MetricTitle = styled.div`
  font-size: 13px; // Increased from 12px
  font-weight: 500;
  color: #666;
  
  &::before {
    content: '☀️';
    margin-right: 4px;
  }
`;

export const MetricCategory = styled.div<{ value: number }>`
  font-size: 13px; // Increased from 12px
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 12px;
  color: ${(props) => {
    if (props.value < 4000) return "#2E7D32"; // Verde para baixa
    if (props.value < 5000) return "#EF6C00"; // Laranja para média
    if (props.value < 6000) return "#D84315"; // Laranja escuro para alta
    return "#C62828";                        // Vermelho para muito alta
  }};
  background-color: ${(props) => {
    if (props.value < 4000) return "rgba(46, 125, 50, 0.1)";
    if (props.value < 5000) return "rgba(239, 108, 0, 0.1)";
    if (props.value < 6000) return "rgba(216, 67, 21, 0.1)";
    return "rgba(198, 40, 40, 0.1)";
  }};
`;

// Redesenhado para melhor visualização do valor principal
export const MeterDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px 0 12px; // Reduced from 12px 0 16px
  padding: 10px; // Reduced from 14px
  background: linear-gradient(180deg, #FBFBFD 0%, #F5F7FC 100%);
  border-radius: 10px; // Reduced from 12px
  box-shadow: 
    0 3px 10px rgba(0, 0, 0, 0.02),
    0 1px 2px rgba(0, 0, 0, 0.01);
  position: relative;
  border: 1px solid rgba(200, 210, 220, 0.3);
`;

export const MeterDigit = styled.span<{ value: number }>`
  display: inline;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 34px; // Increased from 32px
  font-weight: 600;
  color: ${(props) => {
    if (props.value < 4000) return "#2E7D32";
    if (props.value < 5000) return "#EF6C00";
    if (props.value < 6000) return "#D84315";
    return "#C62828";
  }};
`;

export const MeterUnit = styled.div`
  color: #637381;
  font-size: 12px; // Increased from 11px
  font-weight: 500;
  margin-top: 6px; // Reduced from 8px
`;

export const MonthsToggle = styled.summary`
  cursor: pointer;
  font-size: 14px; // Increased from 13px
  font-weight: 500;
  color: #0071e3;
  margin: 6px 0 0; // Reduced from 8px
  padding: 8px 12px; // Reduced from 10px 14px
  user-select: none;
  border-radius: 10px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 113, 227, 0.05);
  border: 1px solid rgba(0, 113, 227, 0.1);
  position: relative;
  
  &:hover {
    background: rgba(0, 113, 227, 0.08);
  }
  
  &::before {
    content: '📊';
    margin-right: 8px;
    font-size: 14px;
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
    border-radius: 10px 10px 0 0;
    border-bottom-color: transparent;
    
    &::after {
      transform: rotate(180deg);
    }
  }
`;

export const MonthsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px; // Reduced from 8px
  margin: 0;
  padding: 10px; // Reduced from 12px
  background: rgba(250, 250, 250, 0.7);
  border: 1px solid rgba(0, 113, 227, 0.1);
  border-top: none;
  border-radius: 0 0 10px 10px;
  animation: slideDown 0.2s ease;
  max-height: 240px; // Added max-height to enable scrolling
  overflow-y: auto; // Added scrolling
  
  // Custom scrollbar styling
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(240, 240, 240, 0.5);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 113, 227, 0.2);
    border-radius: 10px;
    
    &:hover {
      background: rgba(0, 113, 227, 0.3);
    }
  }
  
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// Melhorados os gráficos de barra mensais para maior clareza
export const MonthMeter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 22px; // Reduced from 26px
`;

export const MonthLabel = styled.div`
  width: 28px;
  font-size: 12px; // Increased from 11px
  font-weight: 500;
  color: #555;
`;

export const MonthBar = styled.div`
  flex: 1;
  height: 7px; // Reduced from 8px
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 6px; // Reduced from 0 8px
  position: relative;
`;

export const MonthBarFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${(props) => props.percent}%;
  background: ${(props) => {
    // Simplificado o gradiente para melhor legibilidade
    if (props.percent < 30) return "#4CAF50";
    if (props.percent < 50) return "#FFC107";
    if (props.percent < 75) return "#FF9800";
    return "#F44336";
  }};
  border-radius: 4px;
  transition: width 0.6s ease-out;
`;

export const MonthBarValue = styled.div<{ value?: number; maxValue?: number }>`
  width: 52px;
  font-size: 12px; // Increased from 11px
  font-weight: 500;
  color: #333;
  text-align: right;
  
  &::after {
    content: ' Wh/m²';
    font-size: 9px; // Increased from 8px
    color: #777;
    margin-left: 2px;
  }
`;

export const NoDataMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
  font-size: 14px;
  font-style: italic;
  background: #fafafa;
  border-radius: 10px;
  margin-top: 16px;
  border: 1px dashed #ddd;
  
  &::before {
    content: "⚠️";
    display: block;
    font-size: 20px;
    margin-bottom: 8px;
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