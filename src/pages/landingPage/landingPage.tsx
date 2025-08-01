import landingCss from "./landingPage.module.scss";
import { useState } from "react";
import SearchBar from "../../components/search/searchBar";
import { Images } from "../../assets/assets";
import MapComponent from "../../components/map/map";
import { useSidebar } from "../../context/sidebarContex";
import type { LandingPageProps } from "../../types/types";
// import GeoAnalysisContent from "../../components/geoAnalysisContent/geoAnalysisContent";
// const defaultPosition = { lat: 19.0760, lng: 72.8777 };

const LandingPage = ({ sidebarOpen, pincodeBoundary, position, setPosition, zoom, setZoom }: LandingPageProps) => {
  const [hasSearched, setHasSearched] = useState(false);
  const [result, setResult] = useState([]);
  const { setRightIconKey, updateRightPanel } = useSidebar()

  const onSearch = async (search: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setPosition?.([lat, lon]);
        setZoom?.(15);
        setHasSearched(true);
        setResult(data);
        console.log(result);
      }
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch data');
    }
  }
  const handleAIReocs = () => {
    updateRightPanel(true)
    setRightIconKey('siteRecos')
  }

  return (
    <div className={landingCss["lip-landing__wrap"]}>
      {/* sidebarOpen boolean add a class in searchbar component. this class moves the searchbar when sidebar expands and collapses */}
      <SearchBar searchId="global-search" sidebarOpen={sidebarOpen} onSearch={onSearch} placeHolder={'Search'} customClsform={'form'} customClsfocus={'focused'} customClsinput={'input'} customClsbutton={'button'} icon={Images?.searchIcon} />
      <div id="site-recomms" className={`${landingCss['lip-landing__explore']}`} onClick={() => handleAIReocs()}>
        <div className={`${landingCss['lip-landing__explore-text']}`}><span>explore site recommendations</span> <span className={`${landingCss['lip-landing__explore-icon']}`}><img src={Images?.exploreRecos} alt="" /></span></div>
      </div>
      <MapComponent position={position ?? [0, 0]} zoom={zoom ?? 10} hasSearched={hasSearched} pincodeBoundary={pincodeBoundary} />
    </div>
  )
}

export default LandingPage;