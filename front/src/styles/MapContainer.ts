import styled from "styled-components";

export const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;

  .map-info {
    position: absolute;
    bottom: 20px;
    height: 40px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 10px 20px;
    border-radius: 30px;
    font-size: 14px;
    color: #333;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.7);
    z-index: 5;
    transition: all 0.3s ease;

    &:hover {
      transform: translateX(-50%) translateY(-3px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }
  }

  .error-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 24px 32px;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    color: #d70015;
    border: 1px solid rgba(255, 59, 48, 0.2);
    z-index: 100;
    font-weight: 500;
  }

  .mapboxgl-popup-content {
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .mapboxgl-popup-close-button {
    font-size: 20px;
    color: #666;
    padding: 8px;
    line-height: 0.5;
    background: rgba(240, 240, 240, 0.5);
    border-radius: 50%;
    margin: 6px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
      color: #333;
      transform: rotate(90deg);
    }
  }

  .mapboxgl-popup-content h3 {
    margin-top: 0;
    margin-bottom: 8px;
    color: #111;
    font-weight: 600;
    font-size: 18px;
    letter-spacing: -0.5px;
  }

  .mapboxgl-popup-content p {
    margin: 8px 0;
    color: #444;
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const MapWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
