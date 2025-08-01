import { MapContainer, TileLayer, Marker, Circle, useMap, Polygon, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapCss from './map.module.scss';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import type { MapComponentProps } from '../../types/types';
import { useSelectedHex } from '../../context/SelectedHexContext';
import * as h3 from 'h3-js';
import { useBufferAnalysis } from '../../context/BufferAnalysisContext';
import { useState, useEffect } from 'react';
import { setGlobalMapInstance } from '../../utils/mapUtils';
import { LIP_BASE_URL } from '../../configs/apiConfig';
import { useSidebar } from '../../context/useContextHooks';

const DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow, iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

const getAHPColor = (ahpValue: number): string => {
  if (ahpValue >= 0 && ahpValue < 3) return '#16D26B'; // Dark green
  if (ahpValue >= 3 && ahpValue < 6) return '#F5B942'; // Dark yellow
  if (ahpValue >= 6 && ahpValue <= 10) return '#FF6F61'; // Dark orange
  return '#3388ff'; // Default color
};

function HexPolygons() {
  const map = useMap();
  const { selectedHex, setSelectedHex, hexes } = useSelectedHex();
  const { setRightIconKey, updatePanelName, updateRightPanel } = useSidebar();

  const handleHexClick = async (hexId: string, boundary: [number, number][]) => {
    try {
      const response = await fetch(`${LIP_BASE_URL}/get_frontend_data/?hex_id=${hexId}`);
      if (!response.ok) {
        if (response.status === 404) {
          alert('No data available for this hexagon.');
        } else {
          alert('Failed to fetch hexagon details.');
        }
        return;
      }
      const data = await response.json();
      // Calculate centroid of the hex boundary
      if (boundary.length > 0) {
        const n = boundary.length;
        const centroid: [number, number] = [
          boundary.reduce((acc, [lat]) => acc + lat, 0) / n,
          boundary.reduce((acc, [, lng]) => acc + lng, 0) / n,
        ];
        setSelectedHex({ properties: data, center: centroid, hexId, boundary });
        const currentZoom = map.getZoom();
        if (currentZoom < 16) {
          map.setView(centroid, 16);
        } else {
          map.panTo(centroid);
        }
        // Open the siteselection panel
        setRightIconKey('siteSelection');
        updatePanelName('rightPanel');
        updateRightPanel(true);
      }
    } catch {
      alert('Error fetching hexagon details.');
    }
  };

  return (
    <>
      {hexes.map((hex) => {
        const isSelected = selectedHex && selectedHex.hexId === hex.hexId;
        const ahpValue = isSelected
          ? selectedHex.properties?.AHP_Output
          : hex.ahpOutput;
        return (
          <Polygon
            key={hex.hexId}
            positions={hex.boundary as [number, number][]}
            pathOptions={{
              color: '#FFFFFF', // white border
              weight: 1.5,
              fillOpacity: 0.6,
              fillColor: isSelected ? 'blue' : getAHPColor(ahpValue),
            }}
            eventHandlers={{
              click: () => handleHexClick(hex.hexId, hex.boundary as [number, number][]),
            }}
          />
        );
      })}
    </>
  );
}


// Point-in-polygon function
/* function isPointInPolygon(point: [number, number], polygon: [number, number][]) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];
    const intersect = ((yi > point[1]) !== (yj > point[1])) &&
      (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi + 0.0000001) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
} */

function HexClickHandler() {
  const { setHexes, setSelectedHex } = useSelectedHex();
  const { bufferType, analysisValue, setBufferCenter, setBufferRadius, bufferCenter, bufferRadius } = useBufferAnalysis();
  useMapEvents({
    click: (e) => {
      // Only handle click if buffer analysis is active and analysisValue is set
      if (bufferType !== 'buffer' || !analysisValue) return;
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      // If buffer is set, check if click is inside buffer
      if (bufferCenter && bufferRadius) {
        const R = 6371000; // meters
        const toRad = (deg: number) => deg * Math.PI / 180;
        const dLat = toRad(lat - bufferCenter[0]);
        const dLng = toRad(lng - bufferCenter[1]);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(bufferCenter[0])) * Math.cos(toRad(lat)) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        if (distance <= bufferRadius) {
          // Click is inside buffer, do nothing (buffer circle handles hex fetch)
          return;
        }
      }
      // Otherwise, set new buffer and clear hexes
      setBufferCenter([lat, lng]);
      setBufferRadius(Number(analysisValue));
      setHexes([]); // Clear hexes until buffer is confirmed
      setSelectedHex(null);
    },
  });
  return null;
}

// Add pincodeBoundary to props
// Helper to compute bounds from GeoJSON MultiPolygon
function getBoundsFromMultiPolygon(multiPolygon: any): [[number, number], [number, number]] | null {
  if (!multiPolygon || multiPolygon.type !== 'MultiPolygon') return null;
  let minLat = Infinity, minLng = Infinity, maxLat = -Infinity, maxLng = -Infinity;
  multiPolygon.coordinates.forEach((polygon: any) => {
    polygon[0].forEach((pt: number[]) => {
      const [lng, lat] = pt;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
    });
  });
  return [[minLat, minLng], [maxLat, maxLng]];
}

// Component to fit map to area boundary
function FitMapToBoundary({ boundary }: { boundary: any }) {
  const map = useMap();
  useEffect(() => {
    if (boundary && boundary.type === 'MultiPolygon') {
      const bounds = getBoundsFromMultiPolygon(boundary);
      if (bounds) {
        // Convert [[lat, lng], [lat, lng]] to leaflet LatLngBounds
        map.fitBounds([
          [bounds[0][0], bounds[0][1]],
          [bounds[1][0], bounds[1][1]]
        ], { padding: [40, 40] });
      }
    }
    // Only run when boundary changes
  }, [boundary, map]);
  return null;
}

// Component to set global map instance
function MapInstanceSetter() {
  const map = useMap();
  useEffect(() => {
    setGlobalMapInstance(map);
  }, [map]);
  return null;
}

const MapComponent = ({ position, zoom, hasSearched, pincodeBoundary }: MapComponentProps) => {
  const { hexes, setHexes, setSelectedHex } = useSelectedHex();
  const { bufferType, bufferCenter, bufferRadius, analysisValue } = useBufferAnalysis();
  const [showBufferPopup, setShowBufferPopup] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const { panelName } = useSidebar();

  // Handler to fetch hexes when buffer is clicked
  const handleBufferClick = () => {
    if (hexes.length === 0) {
      setShowBufferPopup(true);
    }
  };

  // Handler for Generate Report button
  const handleGenerateReport = async () => {
    if (!bufferCenter || !bufferRadius) return;

    // Start loading state and hide popup
    setIsGeneratingReport(true);
    setShowBufferPopup(false);

    try {
      const response = await fetch(`${LIP_BASE_URL}/get_hexes_from_buffer_ahp/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat: bufferCenter[0], lon: bufferCenter[1], radius: bufferRadius }),
      });
      if (!response.ok) {
        alert('Failed to fetch hexagons for this area.');
        return;
      }
      const data = await response.json();
      const hexes = (data.ahp_data || []).map((item: { hex_id: string; AHP_Output: number }) => ({
        hexId: item.hex_id,
        ahpOutput: item.AHP_Output,
        boundary: h3.h3ToGeoBoundary(item.hex_id, true)
          .filter((pt: number[]) => Array.isArray(pt) && pt.length === 2)
          .map(([lng, lat]: number[]) => [lat, lng] as [number, number]),
      }));
      setHexes(hexes);
      setSelectedHex(null); // clear previous selection
    } catch {
      alert('Error fetching hexagons for this area.');
    } finally {
      // End loading state
      setIsGeneratingReport(false);
    }
  };

  // For city/pincode boundary popup
  const [showAreaPopup, setShowAreaPopup] = useState(false);
  // Compute centroid for city/pincode boundary
  function getBoundaryCentroid(boundary: any): [number, number] | null {
    if (!boundary || boundary.type !== 'MultiPolygon') return null;
    // Use the first polygon's first ring for centroid
    const coords = boundary.coordinates[0][0];
    if (!coords || coords.length === 0) return null;
    let latSum = 0, lngSum = 0;
    coords.forEach(([lng, lat]: [number, number]) => { latSum += lat; lngSum += lng; });
    return [latSum / coords.length, lngSum / coords.length];
  }

  // Handler for city/pincode boundary click
  const handleAreaBoundaryClick = () => {
    if (hexes.length === 0) {
      setShowAreaPopup(true);
    }
  };

  // Handler for city/pincode Generate Report
  const handleAreaGenerateReport = async () => {
    if (!pincodeBoundary) return;

    // Start loading state and hide popup
    setIsGeneratingReport(true);
    setShowAreaPopup(false);

    // Determine which API to call based on bufferType
    let url = '';
    let body: any = {};
    if (bufferType === 'pincode' && analysisValue) {
      url = `${LIP_BASE_URL}/get_hexes_from_pincode_ahp/`;
      body = { pincode: analysisValue };
    } else if (bufferType === 'city' && analysisValue) {
      url = `${LIP_BASE_URL}/get_hexes_from_city_ahp/`;
      body = { city_name: analysisValue };
    } else {
      return;
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        alert('Failed to fetch hexagons for this area.');
        return;
      }
      const data = await response.json();
      const hexes = (data.ahp_data || []).map((item: { hex_id: string; AHP_Output: number }) => ({
        hexId: item.hex_id,
        ahpOutput: item.AHP_Output,
        boundary: h3.h3ToGeoBoundary(item.hex_id, true)
          .filter((pt: number[]) => Array.isArray(pt) && pt.length === 2)
          .map(([lng, lat]: number[]) => [lat, lng] as [number, number]),
      }));
      setHexes(hexes);
      setSelectedHex(null);
    } catch {
      alert('Error fetching hexagons for this area.');
    } finally {
      // End loading state
      setIsGeneratingReport(false);
    }
  };

  // Compute centroid once for city/pincode boundary
  const areaCentroid = getBoundaryCentroid(pincodeBoundary);

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer center={position} zoom={zoom} className={mapCss['lip-map__wrap']}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapInstanceSetter />
        <HexClickHandler />
        {/* Draw buffer boundary if in buffer mode and bufferCenter/radius are set - moved above HexPolygons */}
        {bufferType === 'buffer' && bufferCenter && bufferRadius && (
          <>
            <Circle
              center={bufferCenter}
              radius={bufferRadius}
              pathOptions={{
                color: '#641698',
                weight: 2,
                fillColor: '#641698',
                fillOpacity: 0.18,
              }}
              eventHandlers={{ click: handleBufferClick }}
            />
            <Marker position={bufferCenter} />
            {/* Only show popup if no hexes are displayed */}
            {showBufferPopup && hexes.length === 0 && (
              <Popup
                position={bufferCenter}
                eventHandlers={{ remove: () => setShowBufferPopup(false) }}
              >
                <div style={{ minWidth: 120, textAlign: 'center' }}>
                  <button style={{ background: '#641698', color: 'white', border: 'none', borderRadius: 4, padding: '8px 16px', cursor: 'pointer' }} onClick={handleGenerateReport}>
                    Generate Report
                  </button>
                </div>
              </Popup>
            )}
          </>
        )}
        {/* Render city/pincode boundary with buffer-like popup */}
        {(bufferType === 'pincode' || bufferType === 'city') && pincodeBoundary && pincodeBoundary.type === 'MultiPolygon' && (
          <>
            <FitMapToBoundary boundary={pincodeBoundary} />
            {pincodeBoundary.coordinates.map((polygon: any, i: number) => (
              <Polygon
                key={`area-boundary-${i}`}
                positions={polygon[0].map(([lng, lat]: [number, number]) => [lat, lng])}
                pathOptions={{ color: '#641698', weight: 2, fillOpacity: 0.18, fillColor: '#641698' }}
                eventHandlers={{ click: handleAreaBoundaryClick }}
              />
            ))}
            {/* Marker and popup at centroid */}
            {areaCentroid && (
              <Marker position={areaCentroid} />
            )}
            {showAreaPopup && hexes.length === 0 && areaCentroid && (
              <Popup
                position={areaCentroid}
                eventHandlers={{ remove: () => setShowAreaPopup(false) }}
              >
                <div style={{ minWidth: 120, textAlign: 'center' }}>
                  <button style={{ background: '#641698', color: 'white', border: 'none', borderRadius: 4, padding: '8px 16px', cursor: 'pointer' }} onClick={handleAreaGenerateReport}>
                    Generate Report
                  </button>
                </div>
              </Popup>
            )}
          </>
        )}
        <HexPolygons />
        {hasSearched && !hexes.length && (
          <Circle
            center={position}
            radius={1000}
            pathOptions={{
              color: '#2563eb',
              fillColor: '#2563eb',
              fillOpacity: 0.2,
              weight: 2
            }}
          />
        )}
      </MapContainer>
      {/* Legend Overlay */}
      {hexes.length > 0 && (
        <div
          className={
            panelName === 'leftPanel'
              ? `${mapCss['lip-map__legend']} ${mapCss['lip-map__legend--shifted']}`
              : mapCss['lip-map__legend']
          }
        >
          <div className={mapCss['lip-map__legend-labels']}>
            <span className={mapCss['lip-map__legend-label-low']}>Low</span>
            <span className={mapCss['lip-map__legend-label-moderate']}>Moderate</span>
            <span className={mapCss['lip-map__legend-label-high']}>High</span>
          </div>
          <div className={mapCss['lip-map__legend-bar']} />
        </div>
      )}

      {/* Loading Overlay */}
      {isGeneratingReport && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(2px)'
        }}>
          <div style={{
            background: '#641698',
            color: 'white',
            padding: '20px 30px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              borderTop: '3px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 15px'
            }} />
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              Generating Report...
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              Please wait while we process the data
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;