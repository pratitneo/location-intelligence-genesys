import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapCss from './map.module.scss';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import type { MapComponentType } from '../../types/types';

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

// Extend MapComponentType to accept hasSearched


const MapComponent = ({ position, zoom, hasSearched }: MapComponentType) => {
  return (
    <div>
        <MapContainer center={position} zoom={zoom} className={mapCss['lip-map__wrap']}>
        <ChangeMapView center={position} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} />
        {hasSearched && (
          <Circle
            center={position}
            radius={500} // 1km in meters
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