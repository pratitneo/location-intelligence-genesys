import proj4 from 'proj4';

const from = 'EPSG:3857';
const to = 'EPSG:4326';

function reprojectCoords(coords: any): any {
  if (typeof coords[0] === 'number') {
    return proj4(from, to, coords);
  }
  return coords.map(reprojectCoords);
}

export function reprojectGeoJson(geojson: any): any {
  if (geojson.type === 'FeatureCollection') {
    return {
      ...geojson,
      features: geojson.features.map(reprojectGeoJson),
    };
  }
  if (geojson.type === 'Feature') {
    return {
      ...geojson,
      geometry: reprojectGeoJson(geojson.geometry),
    };
  }
  if (
    geojson.type === 'MultiPolygon' ||
    geojson.type === 'Polygon' ||
    geojson.type === 'LineString' ||
    geojson.type === 'MultiLineString' ||
    geojson.type === 'Point' ||
    geojson.type === 'MultiPoint'
  ) {
    return {
      ...geojson,
      coordinates: reprojectCoords(geojson.coordinates),
    };
  }
  return geojson;
} 