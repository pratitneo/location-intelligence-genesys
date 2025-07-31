// Global map instance reference
let globalMapInstance: any = null;

export const setGlobalMapInstance = (mapInstance: any) => {
  globalMapInstance = mapInstance;
  console.log('🗺️ Global map instance set:', mapInstance);
};

export const getGlobalMapInstance = () => {
  if (globalMapInstance && typeof globalMapInstance.getZoom === 'function') {
    return globalMapInstance;
  }
  console.log('🗺️ No global map instance available');
  return null;
}; 