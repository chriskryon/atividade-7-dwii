import styled from "styled-components";

export const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at top right, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at bottom left, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }

  .map-info {
    position: absolute;
    bottom: 20px;
    height: 44px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 12px 24px;
    border-radius: 22px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.9);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset;
    border: 1px solid rgba(255, 255, 255, 0.08);
    z-index: 5;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 500;
    letter-spacing: 0.3px;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    display: flex;
    align-items: center;
    min-width: 320px;
    justify-content: center;

    &:hover {
      transform: translateX(-50%) translateY(-2px);
      box-shadow: 
        0 12px 40px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(255, 255, 255, 0.15) inset;
      background: rgba(0, 0, 0, 0.9);
    }
  }

  .error-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 32px 40px;
    border-radius: 20px;
    box-shadow: 
      0 25px 70px rgba(0, 0, 0, 0.25),
      0 0 0 1px rgba(255, 255, 255, 0.3) inset;
    color: #ff3b30;
    border: 1px solid rgba(255, 59, 48, 0.15);
    z-index: 100;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    max-width: 420px;
    line-height: 1.5;
    animation: errorSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

    &::before {
      content: '⚠️';
      display: block;
      font-size: 32px;
      margin-bottom: 16px;
      opacity: 0.8;
    }

    @keyframes errorSlideIn {
      from {
        opacity: 0;
        transform: translate(-50%, -60%) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }

  .mapboxgl-popup-content {
    border-radius: 24px;
    padding: 28px 32px;
    box-shadow: 
      0 25px 70px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.25) inset;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    min-width: 240px;
    max-width: 320px;
  }

  .mapboxgl-popup-close-button {
    font-size: 18px;
    color: #8e8e93;
    padding: 8px;
    line-height: 1;
    background: rgba(142, 142, 147, 0.1);
    border-radius: 50%;
    margin: 12px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 600;

    &:hover {
      background: rgba(142, 142, 147, 0.2);
      color: #1d1d1f;
      transform: scale(1.15);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .mapboxgl-popup-content h3 {
    margin: 0 0 16px 0;
    color: #1d1d1f;
    font-weight: 800;
    font-size: 20px;
    letter-spacing: -0.5px;
    line-height: 1.2;
  }

  .mapboxgl-popup-content p {
    margin: 12px 0;
    color: #424245;
    font-size: 15px;
    line-height: 1.5;
    font-weight: 500;
  }

  .mapboxgl-popup-tip {
    border-top-color: rgba(255, 255, 255, 0.98) !important;
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
  z-index: 2;
`;
