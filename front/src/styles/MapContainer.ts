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
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 10px 24px;
    border-radius: 24px;
    font-size: 13px;
    color: #333;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.8);
    z-index: 5;
    transition: all 0.3s ease;
    font-weight: 500;
    letter-spacing: 0.2px;

    &:hover {
      transform: translateX(-50%) translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }
  }

  .error-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 28px 36px;
    border-radius: 18px;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.18);
    color: #d70015;
    border: 1px solid rgba(255, 59, 48, 0.25);
    z-index: 100;
    font-weight: 600;
    font-size: 15px;
  }

  .mapboxgl-popup-content {
    border-radius: 18px;
    padding: 22px 24px;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.25), 0 4px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.97);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
  }

  .mapboxgl-popup-close-button {
    font-size: 20px;
    color: #555;
    padding: 8px;
    line-height: 0.5;
    background: rgba(240, 240, 240, 0.8);
    border-radius: 50%;
    margin: 8px;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.08);
      color: #222;
      transform: rotate(90deg);
    }
  }

  .mapboxgl-popup-content h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #0066CC;
    font-weight: 600;
    font-size: 19px;
    letter-spacing: -0.5px;
  }

  .mapboxgl-popup-content p {
    margin: 10px 0 4px;
    color: #444;
    font-size: 15px;
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
