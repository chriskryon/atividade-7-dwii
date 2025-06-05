import styled from "styled-components";

export const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;

  .map-info {
    position: absolute;
    height: 30px;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding: 8px 16px;
    border-radius: 24px;
    font-size: 14px;
    color: #333;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.5);
    z-index: 5;
  }

  .error-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: 20px 32px;
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    color: #d32f2f;
    border: 1px solid rgba(255, 82, 82, 0.2);
    z-index: 100;
    font-weight: 500;
  }

  .mapboxgl-popup-content {
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .mapboxgl-popup-close-button {
    font-size: 18px;
    color: #666;
    padding: 5px;
    line-height: 0.5;
  }

  .mapboxgl-popup-content h3 {
    margin-top: 0;
    color: #333;
    font-weight: 600;
    font-size: 16px;
  }
`;

export const MapWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
