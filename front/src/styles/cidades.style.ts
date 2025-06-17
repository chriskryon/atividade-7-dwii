import styled from "styled-components";

export const MenuContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 250px;
`;

export const MenuTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 20px 0;
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
  height: 46px;
  padding: 0 16px;
  border-radius: 12px;
  border: 1px solid rgba(200, 200, 200, 0.3);
  background: rgba(255, 255, 255, 0.7);
  font-size: 15px;
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
  height: 46px;
  margin-top: 20px;
  background: linear-gradient(135deg, #0071e3, #0077ED);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 15px;
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
    background: linear-gradient(135deg, #D8D8D8, #E5E5E5);
    cursor: not-allowed;
    opacity: 0.7;
    box-shadow: none;
  }
`;

export const NoticeBanner = styled.div`
  margin-top: 20px;
  padding: 14px 16px;
  background: rgba(255, 59, 48, 0.08);
  border-left: 4px solid #FF3B30;
  border-radius: 8px;
  color: #D70015;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  animation: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;