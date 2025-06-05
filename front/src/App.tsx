import { MapProvider } from './contexts/MapContext'
import GlobalStyle from './styles/GlobalStyle'
import Mapa from './components/Map'

function App() {
  return (
    <MapProvider>
      <GlobalStyle />
      <Mapa />
    </MapProvider>
  )
}

export default App
