import { useSelectedHex } from '../context/SelectedHexContext';
import { useSidebar } from '../context/sidebarContex';

export const useHexSelection = () => {
  const { hexes, setHexes } = useSelectedHex();
  const { setRightIconKey, updatePanelName, updateRightPanel } = useSidebar();

  const selectHex = async (hexId: string, mapInstance?: any) => {
    try {
      // Fetch hex data from API
      const response = await fetch(`http://lip.genesys.com:9080/API/get_frontend_data/?hex_id=${hexId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          console.warn('No data available for this hexagon.');
          return null;
        } else {
          console.error('Failed to fetch hexagon details.');
          return null;
        }
      }
      
      const data = await response.json();
      
      // Import h3 dynamically to avoid module issues
      const h3 = await import('h3-js');
      
      // Generate hex boundary
      const boundary = h3.h3ToGeoBoundary(hexId, true)
        .filter((pt: number[]) => Array.isArray(pt) && pt.length === 2)
        .map(([lng, lat]: number[]) => [lat, lng] as [number, number]);
      
      // Calculate centroid
      if (boundary.length > 0) {
        const n = boundary.length;
        const centroid: [number, number] = [
          boundary.reduce((acc, [lat]) => acc + lat, 0) / n,
          boundary.reduce((acc, [, lng]) => acc + lng, 0) / n,
        ];
        
        const hexData = {
          properties: data,
          center: centroid,
          hexId,
          boundary
        };
        
        // Check if the hex is already in the hexes array
        const hexExists = hexes.some(hex => hex.hexId === hexId);
        
        if (!hexExists) {
          // Add the hex to the hexes array so it can be displayed on the map
          const newHex = {
            hexId,
            boundary,
            ahpOutput: data.AHP_Output || 0
          };
          setHexes([...hexes, newHex]);
        }
                
        // Zoom to the hex if map instance is provided
        if (mapInstance) {
          const currentZoom = mapInstance.getZoom();
          if (currentZoom < 16) {
            mapInstance.setView(centroid, 16);
          } else {
            mapInstance.panTo(centroid);
          }
        }
              
        return hexData;
      } else {
        console.warn(`Could not select hex: ${hexId}`);
        return null;
      }
    } catch (error) {
      console.error('Error selecting hex:', error);
      return null;
    }
  };

  const openSiteSelectionPanel = () => {
    setRightIconKey('siteSelection');
    updatePanelName('rightPanel');
    updateRightPanel(true);
  };

  return { selectHex, openSiteSelectionPanel };
}; 