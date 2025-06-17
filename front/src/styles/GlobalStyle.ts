import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    background-color: #f5f7fa;
    color: #333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button, input, select {
    font-family: inherit;
  }

  .map-info {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(255, 255, 255, 0.9);
    padding: 8px 14px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 500;
    z-index: 1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    color: #444;
    border: 1px solid rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .error-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.95);
    color: #d70015;
    padding: 16px 24px;
    border-radius: 12px;
    z-index: 2;
    font-weight: 600;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 59, 48, 0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
`;

export default GlobalStyle;
