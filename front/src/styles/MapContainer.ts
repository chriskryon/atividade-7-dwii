import styled from "styled-components";

export const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

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
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    min-width: 200px;
  }

  .mapboxgl-popup-close-button {
    font-size: 18px;
    color: #8e8e93;
    padding: 8px;
    line-height: 1;
    background: rgba(142, 142, 147, 0.12);
    border-radius: 50%;
    margin: 8px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 500;

    &:hover {
      background: rgba(142, 142, 147, 0.2);
      color: #1d1d1f;
      transform: scale(1.1);
    }
  }

  .mapboxgl-popup-content h3 {
    margin: 0 0 12px 0;
    color: #1d1d1f;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -0.4px;
    line-height: 1.2;
  }

  .mapboxgl-popup-content p {
    margin: 8px 0;
    color: #424245;
    font-size: 14px;
    line-height: 1.4;
    font-weight: 400;
  }

  .mapboxgl-popup-tip {
    border-top-color: rgba(255, 255, 255, 0.95) !important;
  }
`;

export const MapWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 0;
  overflow: hidden;
`;
