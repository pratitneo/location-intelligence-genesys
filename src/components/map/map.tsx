import { MapContainer, TileLayer, Marker, Circle, useMap, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapCss from './map.module.scss';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import type { MapComponentType } from '../../types/types';
import { useCsvData } from '../csvDataContext/CsvDataContext';
import { reprojectGeoJson } from '../../utils/reprojectGeoJson';
import { useSelectedHex } from '../selectedHexContext/SelectedHexContext';

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function ChangeMapView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

// Function to get color based on AHP Output value
const getAHPColor = (ahpValue: number): string => {
  if (ahpValue >= 0 && ahpValue < 1) return '#b3d1ff'; // Light blue
  if (ahpValue >= 1 && ahpValue < 2) return '#66a3ff'; // Medium-light blue
  if (ahpValue >= 2 && ahpValue < 3) return '#3385ff'; // Medium blue
  if (ahpValue >= 3 && ahpValue < 4) return '#0066ff'; // Blue
  if (ahpValue >= 4 && ahpValue <= 5) return '#003399'; // Deep blue
  return '#3388ff'; // Default color
};

const MapComponent = ({ position, zoom, hasSearched }: MapComponentType) => {
  const { csvData } = useCsvData();
  const { selectedHex, setSelectedHex } = useSelectedHex();

  // Check if uploaded data is a FeatureCollection (GeoJSON)
  let geoJsonData = null;
  let center = position;
  const csvDataAny: any = csvData;
  if (csvDataAny && !Array.isArray(csvDataAny) && csvDataAny.type === 'FeatureCollection') {
    // Only reproject if not CRS84
    if (csvDataAny.crs && csvDataAny.crs.properties && csvDataAny.crs.properties.name && csvDataAny.crs.properties.name.includes('3857')) {
      geoJsonData = reprojectGeoJson(csvDataAny);
    } else {
      geoJsonData = csvDataAny;
    }
    // Try to center map on selected hex or first polygon if available
    if (selectedHex && selectedHex.center) {
      center = selectedHex.center;
    } else if (
      geoJsonData.features &&
      geoJsonData.features.length > 0 &&
      geoJsonData.features[0].geometry &&
      geoJsonData.features[0].geometry.type === 'MultiPolygon'
    ) {
      const coords = geoJsonData.features[0].geometry.coordinates[0][0][0];
      center = [coords[1], coords[0]];
    }
  }

  // Attach click handler to each hex
  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: () => {
        // Get the first coordinate of the hex
        const coords = feature.geometry.coordinates[0][0][0];
        setSelectedHex({
          properties: feature.properties,
          center: [coords[1], coords[0]], // [lat, lng]
        });
      }
    });
  };

  // Style function for GeoJSON
  const style = (feature: any) => {
    // If this hex is selected, make it red
    if (selectedHex && feature.properties.hex_id === selectedHex.properties.hex_id) {
      return { color: 'red', weight: 3, fillColor: 'red', fillOpacity: 0.7 };
    }
    
    // Otherwise, color based on AHP Output value
    const ahpValue = feature.properties['AHP Output'];
    const fillColor = getAHPColor(ahpValue);
    
    return { 
      color: fillColor, 
      weight: 2, 
      fillColor: fillColor, 
      fillOpacity: 0.6 
    };
  };

  return (
    <div>
      <MapContainer center={center} zoom={zoom} className={mapCss['lip-map__wrap']}>
        <ChangeMapView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoJsonData && (
          <GeoJSON data={geoJsonData} onEachFeature={onEachFeature} style={style} />
        )}
        {!geoJsonData && <Marker position={position} />}
        {hasSearched && !geoJsonData && (
          <Circle
            center={position}
            radius={1000} // 1km in meters
            pathOptions={{
              color: '#2563eb',      // Border color (blue)
              fillColor: '#2563eb',  // Fill color (blue)
              fillOpacity: 0.3,      // Fill opacity (30%)
              weight: 2              // Border thickness
            }}
          />
        )}
      </MapContainer>
    </div>
  )
}

export default MapComponent;