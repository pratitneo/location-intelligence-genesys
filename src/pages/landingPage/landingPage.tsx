import SearchComponent from "../../components/searchComponent/searchComponent";
import MapComponent from "../../components/mapComponent/mapComponent";
import styles from "./landingPage.module.scss";
import { useState } from "react";
import ButtonIcon from "../../components/buttonIcon/buttonIcon";
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
    <div className={styles["landing-page__wrap"]}>
        <SearchComponent onPositionChange={onPositionChange} onZoomChange={onZoomChange}/>
        <ButtonIcon />
        <MapComponent 
          position={position} 
          zoom={zoom}
        />
    </div>
  )
}

export default LandingPage;