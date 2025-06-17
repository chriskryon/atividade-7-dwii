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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #1d1d1f;
  }

  /* Enhanced scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.06);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.35);
    }
  }

  /* Remove map info duplicated styles since they're now in MapContainer */
  .map-info {
    /* Styles moved to MapContainer.ts */
  }

  .error-message {
    /* Styles moved to MapContainer.ts */
  }

  /* Enhanced selection styles */
  ::selection {
    background: rgba(102, 126, 234, 0.15);
    color: #1d1d1f;
  }

  ::-moz-selection {
    background: rgba(102, 126, 234, 0.15);
    color: #1d1d1f;
  }

  /* Focus styles */
  button:focus-visible,
  select:focus-visible {
    outline: 2px solid #667eea;
    outline-offset: 2px;
  }

  /* Improved button and input base styles */
  button {
    -webkit-tap-highlight-color: transparent;
  }

  input, select, textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

export default GlobalStyle;