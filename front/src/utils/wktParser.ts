// Parser simples para MULTIPOLYGON WKT
export function parseWKTToGeoJSON(wktString: string) {
  try {
    if (wktString.startsWith('MULTIPOLYGON')) {
      // Remove "MULTIPOLYGON(((" e ")))" 
      const coordsString = wktString
        .replace(/^MULTIPOLYGON\(\(\(/, '')
        .replace(/\)\)\)$/, '');
      
      // Divide as coordenadas e converte para números
      const coordinates = coordsString
        .split(',')
        .map(coord => {
          const [lng, lat] = coord.trim().split(' ').map(Number);
          return [lng, lat];
        });
      
      return {
        type: 'Polygon',
        coordinates: [coordinates]
      };
    }
    
    if (wktString.startsWith('POLYGON')) {
      // Remove "POLYGON((" e "))"
      const coordsString = wktString
        .replace(/^POLYGON\(\(/, '')
        .replace(/\)\)$/, '');
      
      const coordinates = coordsString
        .split(',')
        .map(coord => {
          const [lng, lat] = coord.trim().split(' ').map(Number);
          return [lng, lat];
        });
      
      return {
        type: 'Polygon',
        coordinates: [coordinates]
      };
    }
    
    // Fallback para geometrias não suportadas
    return {
      type: 'Polygon',
      coordinates: [[]]
    };
  } catch (error) {
    console.error('Erro ao converter WKT para GeoJSON:', error);
    return {
      type: 'Polygon',
      coordinates: [[]]
    };
  }
}
