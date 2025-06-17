import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 220px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 20px;
  padding: 20px;
  z-index: 10;
  box-shadow: 
    0 15px 45px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(255, 255, 255, 0.25) inset,
    0 1px 0 rgba(255, 255, 255, 0.6) inset;
  border: 1px solid rgba(255, 255, 255, 0.2);
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
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(142, 142, 147, 0.08);
  border: none;
  font-size: 16px;
  color: #8e8e93;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  
  &:hover {
    background: rgba(142, 142, 147, 0.15);
    color: #1d1d1f;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const SectorCard = styled.div`
  text-align: center;
  padding-top: 8px;
`;

export const SectorCode = styled.div`
  font-size: 28px;
  font-weight: 900;
  color: #1d1d1f;
  margin-bottom: 8px;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  letter-spacing: -1px;
  background: linear-gradient(135deg, #667eea, #764ba2, #667eea);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientFlow 4s ease-in-out infinite;

  @keyframes gradientFlow {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

export const ZoneType = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #8e8e93;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin-bottom: 16px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 28px;
    height: 2px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 2px;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: translateX(-50%) scaleX(1); }
    50% { opacity: 0.7; transform: translateX(-50%) scaleX(1.1); }
  }
`;

export const CityName = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #1d1d1f;
  margin-top: 16px;
  margin-bottom: 4px;
  letter-spacing: -0.4px;
  line-height: 1.2;
`;

export const AreaInfo = styled.div`
  font-size: 13px;
  color: #424245;
  font-weight: 600;
  margin-top: 8px;
  opacity: 0.8;
  letter-spacing: 0.1px;
`;

export const NoDataMessage = styled.div`
  padding: 24px 20px;
  text-align: center;
  color: #424245;
  font-size: 14px;
  background: rgba(248, 248, 248, 0.8);
  border-radius: 16px;
  font-weight: 600;
  line-height: 1.4;
  
  &::before {
    content: '📍';
    display: block;
    font-size: 24px;
    margin-bottom: 12px;
    opacity: 0.7;
    animation: bounce 2s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
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