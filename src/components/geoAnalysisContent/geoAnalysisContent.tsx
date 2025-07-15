import { Images } from "../../assets/assets"
import { useState } from "react"
import type { SelectSubdataItemType } from "../../types/types"
import DataLayerHead from "../dataLayerHead/dataLayerHead"
import IconWithTooltip from "../iconWithTooltip/IconWithTooltip"
import SearchBar from "../search/searchBar"
import SelectSubData from "../selectSubData/selectSubData"
import geoScss from "./geoAnalysisContent.module.scss"

const icons = [{ label: 'POI', icon: Images?.poiIcon }, { label: 'Demographics', icon: Images?.demographics }, { label: 'Land use / cover', icon: Images?.landUse }, { label: 'Footfall', icon: Images?.footfall }, { label: 'Road Network', icon: Images?.roadNetwork }]

// Initial data for SelectSubData items
const initialSubDataItems: SelectSubdataItemType[] = [
  { id: 1, head: "Hospitals", dragIcon: Images?.drag, arrowIcon: Images?.arrow, eyeIcon: Images?.eye },
  { id: 2, head: "Schools", dragIcon: Images?.drag, arrowIcon: Images?.arrow, eyeIcon: Images?.eye },
  { id: 3, head: "Malls", dragIcon: Images?.drag, arrowIcon: Images?.arrow, eyeIcon: Images?.eye },
  { id: 4, head: "Local Market", dragIcon: Images?.drag, arrowIcon: Images?.arrow, eyeIcon: Images?.eye },
  { id: 5, head: "Bus Stops", dragIcon: Images?.drag, arrowIcon: Images?.arrow, eyeIcon: Images?.eye }
]

const GeoAnalysisContent = () => {
  const [subDataItems, setSubDataItems] = useState(initialSubDataItems)
  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)
  const [hiddenRows, setHiddenRows] = useState<{ [key: number]: boolean }>({});

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

    const newItems = [...subDataItems]
    const draggedItemData = newItems[draggedItem]
    
    // Remove the dragged item from its original position
    newItems.splice(draggedItem, 1)
    
    // Insert the dragged item at the new position
    newItems.splice(dropIndex, 0, draggedItemData)
    
    setSubDataItems(newItems)
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

  return (
    <div className={`${geoScss['lip-geo-content__container']}`}>
      <SearchBar onSearch={onSearch} placeHolder={'Search Data Layer'} customClsform={'dl-form'} customClsinput={'dl-input'} customClsbutton={'dl-button'} icon={Images?.layerSearch}/>
      <hr className={`${geoScss['lip-geo-content__hrline']}`}/>
      <DataLayerHead heading={'Genesys Data Layers '}/>
      <div className={`${geoScss['lip-geo-content__wrap']}`}>
        {icons.map((item, index) => (
          <IconWithTooltip  
            customCls={'datalayer-icon'}
            key={index}
            icon={item.icon}
            tooltipText={item.label}
            position={'top'}
            getActionFn={() => (console.log(`Clicked on ${item.label}`))} 
          />
        ))}
      </div>
      <hr className={`${geoScss['lip-geo-content__hrline']}`}/>

      <div className={`${geoScss['lip-geo-content__subdata']}`}>
        <DataLayerHead heading={'Select Sub Data'}/>

        {subDataItems.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`${geoScss['lip-subdata-draggable']} ${draggedItem === index ? geoScss['lip-subdata-dragging'] : ''}`}
          >
            <SelectSubData
              head={item.head} 
              dragIcon={item.dragIcon} 
              arrowIcon={item.arrowIcon} 
              eyeIcon={hiddenRows[item.id] ? Images.eyeClosed :item.eyeIcon}
              isDropdownOpen={openDropdownId === item.id}
              onArrowClick={() => handleArrowClick(item.id)}
              isHidden={!!hiddenRows[item.id]}
              onEyeClick={() => handleEyeClick(item.id)}
              
            />
          </div>
        ))}
      </div>

      <hr className={`${geoScss['lip-geo-content__hrline']}`}/>


      <DataLayerHead heading={'My Dataset'} icon={Images?.plus}/>

    </div>
  )
}

export default GeoAnalysisContent;