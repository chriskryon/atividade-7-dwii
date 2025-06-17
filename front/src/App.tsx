import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CidadeProvider } from './contexts/CidadeContext'
import { SetorCensitarioProvider } from './contexts/SetorCensitarioContext'
import { MapProvider } from './contexts/MapContext'
import GlobalStyle from './styles/GlobalStyle'
import Mapa from './components/Map'

function App() {
  return (
    <CidadeProvider>
      <SetorCensitarioProvider>
        <MapProvider>
          <Router>
            <GlobalStyle />
            <Routes>
              <Route path="/" element={<Mapa />} />
            </Routes>
          </Router>
        </MapProvider>
      </SetorCensitarioProvider>
    </CidadeProvider>
  )
}

export default App
