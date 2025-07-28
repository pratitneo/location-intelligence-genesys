import landingCss from "./landingPage.module.scss";
import { useState } from "react";
import SearchBar from "../../components/search/searchBar";
import { Images } from "../../assets/assets";
import MapComponent from "../../components/map/map";
import GeoAnalysisContent from "../../components/geoAnalysisContent/geoAnalysisContent";
const defaultPosition = { lat: 19.0760, lng: 72.8777 };

type LandingPageProps = {
  sidebarOpen?: boolean;
  pincodeBoundary?: any;
  setPincodeBoundary?: (boundary: any) => void;
  position: [number, number];
  setPosition: (pos: [number, number]) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
};

const LandingPage = ({ sidebarOpen, pincodeBoundary, setPincodeBoundary, position, setPosition, zoom, setZoom }: LandingPageProps) => {
  const [hasSearched, setHasSearched] = useState(false);
  const [result, setResult] = useState([]);


  const onSearch = async (search : string) => {
        try{
          const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          setPosition([lat, lon]);
          setZoom(15);
          setHasSearched(true);
          setResult(data);
          console.log(result);
         }
        } catch (error) {
          console.log(error);
          throw new Error('Failed to fetch data');
        }
  }

  return (
    <div className={landingCss["lip-landing__wrap"]}>
      <SearchBar sidebarOpen={sidebarOpen} onSearch={onSearch} placeHolder={'Search'} customClsform={'form'} customClsfocus={'focused'} customClsinput={'input'} customClsbutton={'button'} icon={Images?.searchIcon}/>
      {/* Pass setPincodeBoundary to GeoAnalysisContent via SidePanel, and pincodeBoundary to MapComponent */}
      <MapComponent position={position} zoom={zoom} hasSearched={hasSearched} pincodeBoundary={pincodeBoundary} />
      {/* You will need to update the SidePanel/GeoAnalysisContent usage to pass setPincodeBoundary */}
    </div>
  )
}

export default LandingPage;