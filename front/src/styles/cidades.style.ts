import styled from "styled-components";

export const MenuContainer = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 280px; // Reduced from 320px
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px; // Reduced from 20px
  padding: 18px; // Reduced from 24px
  z-index: 10;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255, 255, 255, 0.7);
  overflow: hidden;
  
  &:hover {
    box-shadow: 
      0 16px 48px rgba(0, 0, 0, 0.12),
      0 2px 12px rgba(0, 0, 0, 0.05);
    transform: translateY(-50%) translateZ(0) scale(1.01);
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

export const MenuTitle = styled.h2`
  font-size: 18px; // Reduced from 22px
  font-weight: 600;
  margin: 0 0 16px 0; // Reduced from 20px
  color: #111;
  letter-spacing: -0.5px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 36px;
    height: 3px;
    background: linear-gradient(90deg, #0066CC, #339CFF);
    border-radius: 3px;
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  height: 40px; // Reduced from 46px
  padding: 0 14px; // Reduced from 16px
  border-radius: 10px; // Reduced from 12px
  border: 1px solid rgba(200, 200, 200, 0.3);
  background: rgba(255, 255, 255, 0.7);
  font-size: 14px; // Reduced from 15px
  color: #333;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
  font-weight: 500;
  
  &:hover {
    border-color: rgba(0, 102, 204, 0.3);
    background: rgba(255, 255, 255, 0.9);
  }
  
  &:focus {
    outline: none;
    border-color: #0066CC;
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.15);
  }
  
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%230066CC' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  
  option {
    font-weight: normal;
    color: #333;
  }
`;

export const SearchButton = styled.button`
  width: 100%;
  height: 40px; // Reduced from 46px
  margin-top: 16px; // Reduced from 20px
  background: linear-gradient(135deg, #0071e3, #0077ED);
  border: none;
  border-radius: 10px; // Reduced from 12px
  color: white;
  font-size: 14px; // Reduced from 15px
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 102, 204, 0.25);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 100%);
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 102, 204, 0.35);
    background: linear-gradient(135deg, #0077ED, #0086FF);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 102, 204, 0.2);
  }
  
  &:disabled {
    background: linear-gradient(135deg, rgba(0, 113, 227, 0.3), rgba(0, 119, 237, 0.2));
    cursor: not-allowed;
    opacity: 0.7;
    box-shadow: none;
    color: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(0, 113, 227, 0.1);
  }
`;

export const NoticeBanner = styled.div`
  margin-top: 16px; // Reduced from 20px
  padding: 12px 14px; // Reduced from 14px 16px
  background: rgba(255, 59, 48, 0.08);
  border-left: 4px solid #FF3B30;
  border-radius: 8px;
  color: #D70015;
  font-size: 13px; // Reduced from 14px
  font-weight: 500;
  line-height: 1.4;
  animation: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
