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

const MapComponent = ({ position, zoom, hasSearched }: MapComponentType) => {
  const { csvData } = useCsvData();
  const { selectedHex, setSelectedHex } = useSelectedHex();

  // Check if uploaded data is a FeatureCollection (GeoJSON)
  let geoJsonData = null;
  let center = position;
  if (csvData && csvData.type === 'FeatureCollection') {
    // Only reproject if not CRS84
    if (csvData.crs && csvData.crs.properties && csvData.crs.properties.name && csvData.crs.properties.name.includes('3857')) {
      geoJsonData = reprojectGeoJson(csvData);
    } else {
      geoJsonData = csvData;
    }
    // Try to center map on first polygon if available
    if (
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
        setSelectedHex(feature.properties);
      }
    });
  };

  // Style function for GeoJSON
  const style = (feature: any) => {
    if (selectedHex && feature.properties.hex_id === selectedHex.hex_id) {
      return { color: 'red', weight: 2, fillColor: 'red', fillOpacity: 0.5 };
    }
    return { color: '#3388ff', weight: 2, fillColor: '#3388ff', fillOpacity: 0.2 };
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