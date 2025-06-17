import styled from "styled-components";

export const MenuContainer = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  padding: 14px;
  border-radius: 24px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 1000;
  min-width: 280px;
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
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 24px 0;
  color: #1d1d1f;
  letter-spacing: -0.6px;
  position: relative;
  line-height: 1.2;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 0;
    width: 48px;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 3px;
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  height: 52px;
  padding: 0 20px;
  border-radius: 16px;
  border: 2px solid rgba(142, 142, 147, 0.2);
  background: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  color: #1d1d1f;
  appearance: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  font-weight: 600;
  font-family: inherit;
  
  &:hover {
    border-color: rgba(102, 126, 234, 0.4);
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  
  option {
    font-weight: 500;
    color: #1d1d1f;
    padding: 12px;
  }
`;

export const SearchButton = styled.button`
  width: 100%;
  height: 52px;
  margin-top: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
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
    height: 2px;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.6) 50%,
      rgba(255, 255, 255, 0) 100%);
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.5);
    background: linear-gradient(135deg, #5a6fd8 0%, #6b4c96 100%);
  }
  
  &:active:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
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
  margin-top: 20px;
  padding: 16px 20px;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  color: #667eea;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &::before {
    content: '🔍';
    margin-right: 8px;
    font-size: 16px;
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
`;