import { useState, useEffect } from 'react';
import Map, { Marker, type ViewState } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { MapComponentType } from '../../types/types';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWpzdGFyIiwiYSI6ImNtY3VlOWZ0ZTAwYW8ya3NkcGFwYmoxbTcifQ.hQAIfkTxUIHetl6NQmCcew'; // Replace with your Mapbox token

const MapComponent = ({ position, zoom }: MapComponentType) => {
  const [viewState, setViewState] = useState<ViewState>({
    longitude: position[1],
    latitude: position[0],
    zoom: zoom,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  useEffect(() => {
    setViewState(vs => ({
      ...vs,
      longitude: position[1],
      latitude: position[0],
      zoom: zoom,
    }));
  }, [position, zoom]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker longitude={position[1]} latitude={position[0]} />
      </Map>
    </div>
  );
};

export default MapComponent;