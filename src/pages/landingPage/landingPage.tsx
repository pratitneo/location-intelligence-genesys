import MapComponent from "../../components/map/map";
import landingCss from "./landingPage.module.scss";
import { useState } from "react";
import SearchBar from "../../components/search/searchBar";
const defaultPosition = { lat: 19.0760, lng: 72.8777 };

const LandingPage = ({ sidebarOpen }: { sidebarOpen?: boolean }) => {
  const [position, setPosition] = useState<[number, number]>([defaultPosition.lat, defaultPosition.lng]);
  const [zoom, setZoom] = useState(13);
  const [hasSearched, setHasSearched] = useState(false);

  const onPositionChange = (newPosition: [number, number]) => {
    setPosition(newPosition);
    setHasSearched(true); // Mark that a search has occurred
  }

  const onZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  }

  return (
    <div className={landingCss["lip-landing__wrap"]}>
      <SearchBar onPositionChange={onPositionChange} onZoomChange={onZoomChange} sidebarOpen={sidebarOpen} />
      <MapComponent position={position} zoom={zoom} hasSearched={hasSearched} />
    </div>
  )
}

export default LandingPage;