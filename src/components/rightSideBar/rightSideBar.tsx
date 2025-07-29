import styles from "./rightsidebar.module.scss";
import { Images } from "../../assets/assets";
import IconWithTooltip from "../iconWithTooltip/IconWithTooltip";
import type { IconItem, RightBarType, SubIconItem } from "../../types/types";
import ButtonIcon from "../buttonIcon/buttonIcon";

const RightSideBar = ({ isPanelOpen, onIconClick, activeKey, handleIconClick }: RightBarType) => {
  // primary icons
  const iconList: IconItem[] = [
    { id: 1, icon: Images.threeDmap, tooltip: "3D Map", key: "3dmap" },
    { id: 2, icon: Images.legend, tooltip: "Legend", key: "legend" },
    { id: 3, icon: Images.charts, tooltip: "Charts", key: "charts" },
    { id: 4, icon: Images.drawOnMap, tooltip: "Draw On Map", key: "draw" },
    { id: 5, icon: Images.mapSwitcher, tooltip: "Maps", key: "maps" },
    { id: 6, icon: Images.geoTool, tooltip: "Geo Analysis Tool", key: "geo" },
  ];
  // secondary icons
  const subIconList: SubIconItem[] = [
    { id: "select", icon: Images.select, tooltip: "Select" },
    { id: "rectangle", icon: Images.rectangle, tooltip: "Rectangle" },
    { id: "polygon", icon: Images.polygon, tooltip: "Polygon" },
  ];

  const subGeoIconList: SubIconItem[] = [
    { id: "buffer", icon: Images.bufferAnalysis, tooltip: "Buffer Analysis" },
    { id: "overlay", icon: Images.overlayAnalysis, tooltip: "Overlay Analysis" },
  ];

  return (
    <>
      <ButtonIcon isPanelOpen={isPanelOpen} />
      <div className={`${styles["lip-right-sidebar__wrap"]} ${isPanelOpen ? styles["lip-right-sidebar__wrap--shifted"] : ""}`}>
        <div className={styles["lip-right-sidebar__wrap"]}>
          <div className={styles["lip-right-sidebar__icons"]}>
            {iconList.map((item) => (
              <div key={item.id} className={styles["lip-right-sidebar__icon-wrap"]}>
                <div key={item.id} className={`${styles["lip-right-sidebar__icon"]} ${activeKey === item.key ? styles["lip-right-sidebar__icon--active"] : ""}`} onClick={() => onIconClick(item?.key)}>
                  <IconWithTooltip icon={item.icon} tooltipText={item.tooltip} position="bottom" customCls={`${styles["lip-right-sidebar__icon"]} ${activeKey === item.key ? styles["lip-right-sidebar__icon--active"] : ""}`} />
                </div>

                {item.key === "draw" && activeKey === "draw" && (
                  <div className={styles["lip-right-sidebar__sub-icons"]}>
                    {subIconList.map((subItem) => (<IconWithTooltip key={subItem.id} icon={subItem.icon} tooltipText={subItem.tooltip} position="left" customCls={styles["lip-right-sidebar__sub-icon"]} getActionFn={() => handleIconClick(subItem?.id)} />))}
                  </div>
                )}

                {item.key === "geo" && activeKey === "geo" && (
                  <div className={`${styles["lip-right-sidebar__sub-icons"]} ${styles["lip-right-sidebar__sub-geoicons"]}`} >
                    {subGeoIconList.map((subItem) => (<IconWithTooltip key={subItem.id} icon={subItem.icon} tooltipText={subItem.tooltip} position="bottom" customCls={styles["lip-right-sidebar__sub-icon"]} getActionFn={() => handleIconClick(subItem?.id)} />))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSideBar;
