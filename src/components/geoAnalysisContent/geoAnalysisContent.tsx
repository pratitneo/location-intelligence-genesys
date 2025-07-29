import { Images } from "../../assets/assets"
import { useState } from "react"
import type { SelectSubdataItemType } from "../../types/types"
import DataLayerHead from "../dataLayerHead/dataLayerHead"
import IconWithTooltip from "../iconWithTooltip/IconWithTooltip"
import SearchBar from "../search/searchBar"
import SelectSubData from "../selectSubData/selectSubData"
import geoScss from "./geoAnalysisContent.module.scss"
import { useBufferAnalysis } from '../../context/BufferAnalysisContext';
import { useSelectedHex } from '../../context/SelectedHexContext';
import * as h3 from 'h3-js';
import wellknown from 'wellknown'; // Add this import at the top
import { useSidebar } from "../../context/sidebarContex"

const icons = [{ label: 'POI', icon: Images?.poiIcon }, { label: 'Demographics', icon: Images?.demographics }, { label: 'Land use / cover', icon: Images?.landUse }, { label: 'Footfall', icon: Images?.footfall }, { label: 'Road Network', icon: Images?.roadNetwork }]

// Define subData items for each icon
const subDataMap: { [key: string]: SelectSubdataItemType[] } = {
  POI: [
    { id: 1, head: "Schools", dragIcon: Images?.drag, eyeIcon: Images?.eye },
    { id: 2, head: "Malls", dragIcon: Images?.drag, eyeIcon: Images?.eye },
    { id: 3, head: "Local Market", dragIcon: Images?.drag, eyeIcon: Images?.eye },
    { id: 4, head: "Bus Stops", dragIcon: Images?.drag, eyeIcon: Images?.eye }
  ],
  Demographics: [
    { id: 1, head: "Populations", dragIcon: Images?.drag, arrowIcon: Images?.arrow, eyeIcon: Images?.eye },
    { id: 2, head: "Age Groups", dragIcon: Images?.drag, arrowIcon: Images?.arrow, eyeIcon: Images?.eye },
    { id: 3, head: "Households", dragIcon: Images?.drag, arrowIcon: Images?.arrow, eyeIcon: Images?.eye }
  ],
  "Land use / cover": [
    { id: 1, head: "Residential", dragIcon: Images?.drag, eyeIcon: Images?.eye },
    { id: 2, head: "Commercial", dragIcon: Images?.drag, eyeIcon: Images?.eye }
  ],
  Footfall: [
    { id: 1, head: "Weekday", dragIcon: Images?.drag, eyeIcon: Images?.eye },
    { id: 2, head: "Weekend", dragIcon: Images?.drag, eyeIcon: Images?.eye }
  ],
  "Road Network": [
    { id: 1, head: "Highways", dragIcon: Images?.drag, eyeIcon: Images?.eye },
    { id: 2, head: "Local Roads", dragIcon: Images?.drag, eyeIcon: Images?.eye }
  ]
};

// Add setPincodeBoundary to props
type GeoAnalysisContentProps = {
  setAreaBoundary: (boundary: any) => void;
  setPosition?: (pos: [number, number]) => void;
  setZoom?: (zoom: number) => void;
};

const GeoAnalysisContent = ({ setAreaBoundary, setPosition, setZoom }: GeoAnalysisContentProps) => {
  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)
  const [hiddenRows, setHiddenRows] = useState<{ [key: number]: boolean }>({});
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const { bufferType, setBufferType, analysisValue, setAnalysisValue, setBufferCenter, setBufferRadius, bufferCenter } = useBufferAnalysis();
  const { setHexes, setSelectedHex, hexes } = useSelectedHex();
  const [loadingCity, setLoadingCity] = useState(false);
  const { updatePanelName } = useSidebar()

  const onSearch = (value: string) => {
    // Handle search logic here
    console.log(`Search value: ${value}`)
  }

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()

    if (draggedItem === null) return

    const newItems = [...subDataMap[selectedIcon || '']] // Use subDataMap[selectedIcon]
    const draggedItemData = newItems[draggedItem]

    // Remove the dragged item from its original position
    newItems.splice(draggedItem, 1)

    // Insert the dragged item at the new position
    newItems.splice(dropIndex, 0, draggedItemData)

    // setSubDataItems(newItems) // REMOVE this
    setDraggedItem(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  // Dropdown arrow click handler
  const handleArrowClick = (id: number) => {
    setOpenDropdownId(prev => (prev === id ? null : id))
  }

  const handleEyeClick = (id: number) => {
    setHiddenRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle city selection and trigger API call
  const handleCityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setAnalysisValue(city);
    if (city) {
      setLoadingCity(true); // Start loading
      try {
        const response = await fetch('http://127.0.0.1:8000/API/get_hexes_from_city_ahp/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ city_name: city }),
        });
        if (!response.ok) {
          alert('Failed to fetch hexagons for this city.');
          setLoadingCity(false);
          return;
        }
        const data = await response.json();
        // Parse and store city boundary if present
        if (data.city_boundary) {
          const geojson = wellknown.parse(data.city_boundary);
          setAreaBoundary(geojson);
          // Center and fit map to city boundary
          if (geojson && geojson.type === 'MultiPolygon' && setPosition && setZoom) {
            const coords = geojson.coordinates[0][0];
            if (coords && coords.length > 0) {
              let latSum = 0, lngSum = 0;
              coords.forEach((pt: number[]) => {
                const [lng, lat] = pt;
                latSum += lat;
                lngSum += lng;
              });
              const centroid: [number, number] = [latSum / coords.length, lngSum / coords.length];
              setPosition(centroid);
              setZoom(12); // You can adjust this zoom level or compute bounds for a better fit
            }
          }
        } else {
          setAreaBoundary(null);
        }
      } catch {
        alert('Error fetching hexagons for this city.');
        setAreaBoundary(null);
      }
      setLoadingCity(false); // End loading
    }
  };

  // Handle pincode selection and trigger API call
  const handlePincodeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pincode = e.target.value;
    setAnalysisValue(pincode);
    setHexes([]);
    setSelectedHex(null);
    if (pincode) {
      try {
        const response = await fetch('http://127.0.0.1:8000/API/get_hexes_from_pincode_ahp/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pincode }),
        });
        if (!response.ok) {
          alert('Failed to fetch hexagons for this pincode.');
          return;
        }
        const data = await response.json();
        // Parse and store pincode boundary if present
        if (data.pincode_boundary) {
          const geojson = wellknown.parse(data.pincode_boundary);
          setAreaBoundary(geojson);
        } else {
          setAreaBoundary(null);
        }
      } catch {
        alert('Error fetching hexagons for this pincode.');
        setAreaBoundary(null);
      }
    }
  };

  // When bufferType changes, clear bufferCenter and bufferRadius
  const handleBufferTypeChange = (type: 'buffer' | 'city' | 'pincode' | '') => {
    setBufferType(type);
    setAnalysisValue('');
    setBufferCenter(null);
    setBufferRadius(null);
    setHexes([]);
    setSelectedHex(null);
    setAreaBoundary(null);
  };

  // When buffer radius is selected, show buffer (clear previous bufferCenter so user can click map to set center)
  const handleBufferRadiusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRadius = Number(e.target.value);
    setAnalysisValue(e.target.value);
    setBufferRadius(newRadius);
    // If buffer center is set and hexes are present, fetch new hexes for new radius
    if (bufferCenter && hexes.length > 0) {
      try {
        const response = await fetch('http://127.0.0.1:8000/API/get_hexes_from_point_ahp/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lat: bufferCenter[0], lon: bufferCenter[1], radius: newRadius }),
        });
        if (!response.ok) {
          alert('Failed to fetch hexagons for this area.');
          return;
        }
        const data = await response.json();
        const newHexes = (data.ahp_data || []).map((item: { hex_id: string; AHP_Output: number }) => ({
          hexId: item.hex_id,
          ahpOutput: item.AHP_Output,
          boundary: h3.h3ToGeoBoundary(item.hex_id, true)
            .filter((pt: number[]) => Array.isArray(pt) && pt.length === 2)
            .map(([lng, lat]: number[]) => [lat, lng] as [number, number]),
        }));
        setHexes(newHexes);
        setSelectedHex(null);
      } catch {
        alert('Error fetching hexagons for this area.');
      }
    } else {
      // If no report, just clear hexes and let user click buffer to generate
      setHexes([]);
      setSelectedHex(null);
    }
  };

  const handleRightPanel = () => {
    updatePanelName('rightPanel')
  }

  return (
    <div className={`${geoScss['lip-geo-content__container']}`}>
      <SearchBar onSearch={onSearch} placeHolder={'Search Data Layer'} customClsform={'dl-form'} customClsinput={'dl-input'} customClsbutton={'dl-button'} icon={Images?.layerSearch} />
      <hr className={`${geoScss['lip-geo-content__hrline']}`} />
      <DataLayerHead heading={'Genesys Data Layers '} />
      <div className={`${geoScss['lip-geo-content__wrap']}`}>
        {icons.map((item, index) => (
          <IconWithTooltip customCls={'datalayer-icon'} key={index} icon={item.icon} tooltipText={item.label} position={'top'} getActionFn={() => setSelectedIcon(selectedIcon === item.label ? null : item.label)} />
        ))}
      </div>
      <hr className={`${geoScss['lip-geo-content__hrline']}`} />

      {selectedIcon && (
        <div className={`${geoScss['lip-geo-content__subdata']}`}>
          <DataLayerHead heading={'Select Sub Data'} />
          {(subDataMap[selectedIcon] || []).map((item, index) => (
            <div key={item.id} draggable onDragStart={(e) => handleDragStart(e, index)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, index)} onDragEnd={handleDragEnd} onClick={() => handleRightPanel()} className={`${geoScss['lip-subdata-draggable']} ${draggedItem === index ? geoScss['lip-subdata-dragging'] : ''}`}>
              <SelectSubData head={item.head} dragIcon={item.dragIcon} arrowIcon={item.arrowIcon} eyeIcon={hiddenRows[item.id] ? Images.eyeClosed : item.eyeIcon} isDropdownOpen={openDropdownId === item.id} onArrowClick={() => handleArrowClick(item.id)} isHidden={!!hiddenRows[item.id]} onEyeClick={() => handleEyeClick(item.id)} />
            </div>
          ))}
          <hr className={`${geoScss['lip-geo-content__hrline']}`} />
        </div>
      )}

      <DataLayerHead heading={'My Dataset'} icon={Images?.plus} />

      {/* Buffer Analysis Radio Buttons */}
      <div className={geoScss['lip-geo-radio-group']}>
        {/* buffer */}
        <label className={geoScss['lip-geo-radio-label']}>
          <input type="radio" value="buffer" checked={bufferType === 'buffer'} onChange={() => handleBufferTypeChange('buffer')} />Buffer
        </label>
        {/* city */}
        <label className={geoScss['lip-geo-radio-label']}>
          <input type="radio" value="city" checked={bufferType === 'city'} onChange={() => handleBufferTypeChange('city')} />City
        </label>
        {/* pincode */}
        <label className={geoScss['lip-geo-radio-label']}>
          <input type="radio" value="pincode" checked={bufferType === 'pincode'} onChange={() => handleBufferTypeChange('pincode')} />Pincode
        </label>
      </div>

      {/* Dropdown for selected buffer type */}
      {bufferType === 'buffer' && (
        <select className={geoScss['lip-geo-dropdown']} value={analysisValue} onChange={handleBufferRadiusChange}>
          <option value="" disabled>Select buffer</option>
          {[500, 1000, 2000].map(val => (
            <option key={val} value={val}>{val} m</option>
          ))}
        </select>
      )}
      {bufferType === 'pincode' && (
        <select className={geoScss['lip-geo-dropdown']} value={analysisValue} onChange={handlePincodeChange}>
          <option value="" disabled>Select pincode</option>
          {[400051, 400052, 400050, 400030, 400016, 400028, 400025, 400018, 400013, 400012, 400014, 400019, 400022].map(val => (
            <option key={val} value={val}>{val}</option>
          ))}
        </select>
      )}
      {bufferType === 'city' && (
        <>
          <select className={geoScss['lip-geo-dropdown']} value={analysisValue} onChange={handleCityChange}>
            <option value="" disabled>Select city</option>
            <option value="mumbai">Mumbai</option>
            <option value="raipur">Raipur</option>
          </select>
          {loadingCity && (
            <div style={{ margin: '10px 0', color: '#641698' }}>Loading city hexagons, please wait...</div>
          )}
        </>
      )}


    </div>
  )
}

export default GeoAnalysisContent;