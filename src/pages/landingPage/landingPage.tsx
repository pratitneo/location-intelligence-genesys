import MapComponent from "../../components/map/map";
import landingCss from "./landingPage.module.scss";
import { useState } from "react";
import SearchBar from "../../components/search/searchBar";
const defaultPosition = { lat: 19.0760, lng: 72.8777 };

const LandingPage = () => {
  const [position, setPosition] = useState<[number, number]>([defaultPosition.lat, defaultPosition.lng]);
  const [zoom, setZoom] = useState(13);

  const onPositionChange = (newPosition: [number, number]) => {
    setPosition(newPosition);
  }

  const onZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  }

  return (
    <div className={landingCss["lip-landing__wrap"]}>
      <SearchBar onPositionChange={onPositionChange} onZoomChange={onZoomChange} />
      <MapComponent position={position} zoom={zoom} />
    </div>
  )
}

export default LandingPage;