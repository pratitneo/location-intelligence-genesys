import landingCss from "./landingPage.module.scss";
import { useState } from "react";
import SearchBar from "../../components/search/searchBar";
import { Images } from "../../assets/assets";
import MapComponent from "../../components/map/map";
const defaultPosition = { lat: 19.0760, lng: 72.8777 };

const LandingPage = ({ sidebarOpen }: { sidebarOpen?: boolean }) => {
  const [position, setPosition] = useState<[number, number]>([defaultPosition.lat, defaultPosition.lng]);
  const [zoom, setZoom] = useState(13);
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
      <MapComponent position={position} zoom={zoom} hasSearched={hasSearched} />
    </div>
  )
}

export default LandingPage;