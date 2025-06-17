import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 220px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 24px;
  padding: 14px;
  z-index: 10;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: slideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(142, 142, 147, 0.12);
  border: none;
  font-size: 16px;
  color: #8e8e93;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  
  &:hover {
    background: rgba(142, 142, 147, 0.2);
    color: #1d1d1f;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const SectorCard = styled.div`
  text-align: center;
  padding-top: 8px;
`;

export const SectorCode = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: #1d1d1f;
  margin-bottom: 8px;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  letter-spacing: -1px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const ZoneType = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #8e8e93;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 32px;
    height: 2px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 2px;
  }
`;

export const CityName = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #1d1d1f;
  margin-top: 20px;
  margin-bottom: 4px;
  letter-spacing: -0.4px;
  line-height: 1.2;
`;

export const AreaInfo = styled.div`
  font-size: 14px;
  color: #424245;
  font-weight: 500;
  margin-top: 8px;
  opacity: 0.8;
`;

export const NoDataMessage = styled.div`
  padding: 24px;
  text-align: center;
  color: #424245;
  font-size: 15px;
  background: rgba(248, 248, 248, 0.6);
  border-radius: 16px;
  font-weight: 500;
  line-height: 1.4;
  
  &::before {
    content: '📍';
    display: block;
    font-size: 24px;
    margin-bottom: 12px;
    opacity: 0.6;
  }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-top: 2px solid #667eea;
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