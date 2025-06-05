import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 90px;
  right: 20px;
  width: 380px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 20px;
  z-index: 10;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease-in-out;
  border: 1px solid rgba(255, 255, 255, 0.5);
  overflow: hidden;

  &:hover {
    box-shadow: 0 12px 42px rgba(0, 0, 0, 0.12);
  }
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #333;
  text-align: center;
  letter-spacing: -0.5px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(230, 230, 230, 0.5);
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(200, 200, 200, 0.8);
    color: #333;
  }

  &:focus {
    outline: none;
  }
`;

export const IncidenciaCard = styled.div`
  border-radius: 12px;
  background: rgba(250, 250, 250, 0.5);
  padding: 16px;
  margin-top: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
`;

export const CityName = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #111;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
  text-align: center;
`;

// Modern digital display - updated to single-line design
export const MeterDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  padding: 20px 24px;
  background: linear-gradient(120deg, #f8faff 0%, #e6eaf0 100%);
  border-radius: 16px;
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.04),
    0 2px 4px rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(200, 210, 220, 0.3);
`;

export const MeterDigit = styled.span`
  display: inline;
  color: #1a73e8;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 42px;
  font-weight: 500;
  letter-spacing: -0.5px;
  position: relative;
`;

export const MeterUnit = styled.div`
  color: #637381;
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: #1a73e8;
    border-radius: 50%;
    margin-right: 8px;
    opacity: 0.6;
  }
`;

export const MonthsToggle = styled.summary`
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: #0066CC;
  margin: 12px 0;
  padding: 8px;
  user-select: none;
`;

export const MonthsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
  animation: fadeIn 0.3s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// New monthly bar meter styles
export const MonthMeter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 28px;
`;

export const MonthLabel = styled.div`
  width: 40px;
  font-size: 13px;
  font-weight: 500;
  color: #666;
`;

export const MonthBar = styled.div`
  flex: 1;
  height: 16px;
  background: #eee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  margin: 0 10px;
  position: relative;
`;

export const MonthBarFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${(props) => props.percent}%;
  background: ${(props) =>
		`linear-gradient(90deg, 
      #FFD54F 0%, 
      #FF9800 ${Math.min(50, props.percent)}%, 
      #FF5722 ${Math.min(75, props.percent)}%, 
      #D32F2F ${Math.min(100, props.percent)}%
    )`};
  border-radius: 8px;
  transition: width 1s cubic-bezier(0.23, 1, 0.32, 1);
`;

export const MonthBarValue = styled.div<{ value: number; maxValue: number }>`
  width: 70px;
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => {
		const ratio = props.value / props.maxValue;
		if (ratio < 0.3) return "#333";
		if (ratio < 0.5) return "#D97900";
		if (ratio < 0.7) return "#D95700";
		if (ratio < 0.9) return "#D93600";
		return "#D01B00";
	}};
  text-align: right;
  
  &::after {
    content: ' Wh/m²';
    font-size: 10px;
    color: #777;
    margin-left: 2px;
  }
`;

export const NoDataMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
  font-size: 15px;
  font-style: italic;
  background: rgba(242, 242, 242, 0.5);
  border-radius: 12px;
  margin-top: 16px;
`;

// Keep existing styles that might be needed...
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
