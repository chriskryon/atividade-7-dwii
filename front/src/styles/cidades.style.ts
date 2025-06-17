import styled from "styled-components";

export const MenuContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  padding: 20px;
  border-radius: 20px;
  box-shadow: 
    0 15px 45px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(255, 255, 255, 0.25) inset,
    0 1px 0 rgba(255, 255, 255, 0.6) inset;
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;
  min-width: 260px;
  max-width: 280px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  animation: slideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

export const MenuTitle = styled.h1`
  font-size: 18px;
  font-weight: 800;
  margin: 0 0 16px 0;
  color: #1d1d1f;
  letter-spacing: -0.4px;
  position: relative;
  line-height: 1.2;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 36px;
    height: 2px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 2px;
    animation: gradientShift 3s ease-in-out infinite;
  }

  @keyframes gradientShift {
    0%, 100% { 
      background: linear-gradient(135deg, #667eea, #764ba2); 
    }
    50% { 
      background: linear-gradient(135deg, #764ba2, #667eea); 
    }
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  height: 44px;
  padding: 0 16px;
  padding-right: 40px;
  border-radius: 12px;
  border: 1.5px solid rgba(142, 142, 147, 0.12);
  background: rgba(255, 255, 255, 0.95);
  font-size: 14px;
  color: #1d1d1f;
  appearance: none;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(255, 255, 255, 0.8) inset;
  font-weight: 600;
  font-family: inherit;
  letter-spacing: -0.1px;
  
  &:hover {
    border-color: rgba(102, 126, 234, 0.25);
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
    box-shadow: 
      0 8px 25px rgba(0, 0, 0, 0.08),
      0 0 0 1px rgba(255, 255, 255, 0.9) inset;
  }
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 
      0 0 0 3px rgba(102, 126, 234, 0.12),
      0 8px 25px rgba(102, 126, 234, 0.15);
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    background: rgba(248, 248, 248, 0.8);
  }
  
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  
  option {
    font-weight: 600;
    color: #1d1d1f;
    padding: 12px;
    background: white;
  }
`;

export const SearchButton = styled.button`
  width: 100%;
  height: 44px;
  margin-top: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 20px rgba(102, 126, 234, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  position: relative;
  overflow: hidden;
  font-family: inherit;
  letter-spacing: 0.2px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.6) 50%,
      rgba(255, 255, 255, 0) 100%);
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 30px rgba(102, 126, 234, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.15) inset;
    background: linear-gradient(135deg, #5a6fd8 0%, #6b4c96 100%);
  }
  
  &:active:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    background: linear-gradient(135deg, #d1d5db, #e5e7eb);
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none;
    transform: none;
  }
`;

export const NoticeBanner = styled.div`
  margin-top: 16px;
  padding: 12px 16px;
  background: rgba(102, 126, 234, 0.06);
  border: 1px solid rgba(102, 126, 234, 0.12);
  border-radius: 10px;
  color: #667eea;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '🔍';
    margin-right: 8px;
    font-size: 14px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: shimmer 2s infinite;
  }
  
  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateY(10px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;