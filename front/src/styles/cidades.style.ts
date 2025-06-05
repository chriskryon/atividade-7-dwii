import styled from "styled-components";

export const MenuContainer = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 320px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 20px;
  z-index: 10;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.5);

  &:hover {
    box-shadow: 0 12px 42px rgba(0, 0, 0, 0.12);
  }
`;

export const MenuTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #333;
  letter-spacing: -0.5px;
`;

export const StyledSelect = styled.select`
  width: 100%;
  height: 42px;
  padding: 0 16px;
  border-radius: 10px;
  border: 1px solid rgba(200, 200, 200, 0.4);
  background: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  color: #333;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);

  &:hover {
    border-color: rgba(170, 170, 170, 0.6);
  }

  &:focus {
    outline: none;
    border-color: #0066cc;
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.15);
  }

  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
`;

export const SearchButton = styled.button`
  width: 100%;
  height: 42px;
  margin-top: 16px;
  background: linear-gradient(135deg, #0066cc, #0052a2);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 10px rgba(0, 102, 204, 0.25);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(0, 102, 204, 0.35);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: linear-gradient(135deg, #b4b4b4, #cccccc);
    cursor: not-allowed;
    opacity: 0.7;
    box-shadow: none;
  }
`;

export const NoticeBanner = styled.div`
  margin-top: 16px;
  padding: 12px 16px;
  background: rgba(255, 82, 82, 0.1);
  border-left: 4px solid #ff5252;
  border-radius: 8px;
  color: #d32f2f;
  font-size: 14px;
`;
