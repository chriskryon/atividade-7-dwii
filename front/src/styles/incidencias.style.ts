import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 90px;
  right: 20px;
  width: 380px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 24px;
  z-index: 10;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.03);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255, 255, 255, 0.7);
  overflow: hidden;
  
  &:hover {
    box-shadow: 
      0 16px 48px rgba(0, 0, 0, 0.12),
      0 2px 12px rgba(0, 0, 0, 0.05);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0) 100%);
  }
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #111;
  text-align: center;
  letter-spacing: -0.5px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 36px;
    height: 3px;
    background: linear-gradient(90deg, #0066CC, #339CFF);
    border-radius: 3px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 30px;
  height: 30px;
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
    background: rgba(0, 0, 0, 0.05);
    color: #333;
    transform: rotate(90deg);
  }
  
  &:focus {
    outline: none;
  }
`;

export const IncidenciaCard = styled.div`
  border-radius: 16px;
  background: rgba(250, 250, 250, 0.5);
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(200, 210, 220, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.04);
    transform: translateZ(0) scale(1.01);
  }
`;

export const CityName = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #111;
  margin: 0 0 20px 0;
  letter-spacing: -0.5px;
  text-align: center;
`;

// Modern digital display - single line
export const MeterDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px 0;
  padding: 24px;
  background: linear-gradient(135deg, #fafbfc 0%, #f1f4f8 100%);
  border-radius: 18px;
  box-shadow: 
    0 6px 20px rgba(0, 0, 0, 0.03),
    0 2px 4px rgba(0, 0, 0, 0.01);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(200, 210, 220, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 
      0 10px 30px rgba(0, 0, 0, 0.05),
      0 2px 8px rgba(0, 0, 0, 0.02);
    transform: translateZ(0) scale(1.02);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      rgba(255, 255, 255, 0) 80%);
    pointer-events: none;
  }
`;

export const MeterDigit = styled.span<{ value: number }>`
  display: inline;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 46px;
  font-weight: 600;
  letter-spacing: -0.5px;
  position: relative;
  background: ${(props) => {
		// Assuming typical range of values between 3000-7000
		if (props.value < 4000) return "linear-gradient(90deg, #4CAF50, #8BC34A)";
		if (props.value < 5000) return "linear-gradient(90deg, #FFC107, #FF9800)";
		if (props.value < 6000) return "linear-gradient(90deg, #FF9800, #FF5722)";
		return "linear-gradient(90deg, #FF5722, #F44336)";
	}};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

export const MeterUnit = styled.div<{ value: number }>`
  color: #637381;
  font-size: 14px;
  font-weight: 500;
  margin-top: 12px;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: ${(props) => {
			if (props.value < 4000) return "#4CAF50";
			if (props.value < 5000) return "#FF9800";
			if (props.value < 6000) return "#FF5722";
			return "#F44336";
		}};
    border-radius: 50%;
    margin-right: 8px;
    opacity: 0.7;
  }
`;

export const MonthsToggle = styled.summary`
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  color: #0071e3;
  margin: 16px 0 8px;
  padding: 12px 16px;
  user-select: none;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  background: linear-gradient(to right, rgba(0, 113, 227, 0.06), rgba(0, 113, 227, 0.02));
  border: 1px solid rgba(0, 113, 227, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: linear-gradient(to right, rgba(0, 113, 227, 0.08), rgba(0, 113, 227, 0.04));
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::before {
    content: '📊';
    margin-right: 10px;
    font-size: 16px;
  }
  
  &::after {
    content: '';
    margin-left: auto;
    width: 18px;
    height: 18px;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%230071e3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  details[open] > & {
    background: linear-gradient(to right, rgba(0, 113, 227, 0.1), rgba(0, 113, 227, 0.04));
    border-radius: 12px 12px 0 0;
    border-bottom-color: transparent;
    box-shadow: none;
    
    &::after {
      transform: rotate(180deg);
    }
  }
`;

export const MonthsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 16px;
  background: rgba(250, 250, 250, 0.5);
  border: 1px solid rgba(0, 113, 227, 0.1);
  border-top: none;
  border-radius: 0 0 12px 12px;
  animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// Refined monthly bar styles
export const MonthMeter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  transition: all 0.2s ease;
  border-radius: 8px;
  padding: 0 4px;
  
  &:hover {
    background: rgba(0, 0, 0, 0.02);
  }
`;

export const MonthLabel = styled.div`
  width: 40px;
  font-size: 13px;
  font-weight: 500;
  color: #555;
`;

export const MonthBar = styled.div`
  flex: 1;
  height: 12px;
  background: #eee;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
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
  font-size: 13px;
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
  padding: 24px;
  text-align: center;
  color: #666;
  font-size: 15px;
  font-style: italic;
  background: rgba(250, 250, 250, 0.7);
  border-radius: 16px;
  margin-top: 20px;
  border: 1px solid rgba(200, 200, 200, 0.1);
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
