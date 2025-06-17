import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 280px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 20px;
  z-index: 10;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 1px 0 rgba(255, 255, 255, 0.8) inset;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #333;
  }
`;

export const SectorCard = styled.div`
  text-align: center;
`;

export const SectorCode = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  letter-spacing: -0.5px;
`;

export const ZoneType = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 1px;
    background: #ddd;
  }
`;

export const CityName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-top: 16px;
`;

export const AreaInfo = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 4px;
`;

export const NoDataMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
  font-size: 14px;
  background: rgba(248, 248, 248, 0.5);
  border-radius: 12px;
  
  &::before {
    content: '📍';
    display: block;
    font-size: 20px;
    margin-bottom: 8px;
    opacity: 0.5;
  }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #666;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Remove unused exports
export const Title = styled.div``;
export const IncidenciaCard = styled.div``;
export const MeterDisplay = styled.div``;
export const MeterDigit = styled.div``;
export const MeterUnit = styled.div``;
export const SectorInfo = styled.div``;
export const MonthsToggle = styled.div``;
export const MonthsGrid = styled.div``;
export const MonthMeter = styled.div``;
export const MonthLabel = styled.div``;
export const MonthBar = styled.div``;
export const MonthBarFill = styled.div``;
export const MonthBarValue = styled.div``;
export const AnualValue = styled.div``;
export const MonthCard = styled.div``;
export const MonthName = styled.div``;
export const MonthValue = styled.div``;