import styles from "./rightSidebar.module.scss";
import { Images } from "../../assets/assets";
import IconWithTooltip from "../iconWithTooltip/IconWithTooltip";
import type { IconItem, SubIconItem } from "../../types/types";

type IconKey = "3dmap" | "legend" | "charts" | "draw" | "maps" | "geo";

const RightSideBar = ({
  isPanelOpen,
  onIconClick,
  activeKey,
}: {
  isPanelOpen: boolean;
  onIconClick: (key: IconKey) => void;
  activeKey: IconKey | null;
}) => {
  // const [activeKey, setActiveKey] = useState<IconKey | null>(null);
  const iconList: IconItem[] = [
    { id: 1, icon: Images.threeDmap, tooltip: "3D Map", key: "3dmap" },
    { id: 2, icon: Images.legend, tooltip: "Legend", key: "legend" },
    { id: 3, icon: Images.charts, tooltip: "Charts", key: "charts" },
    { id: 4, icon: Images.drawOnMap, tooltip: "Draw On Map", key: "draw" },
    { id: 5, icon: Images.mapSwitcher, tooltip: "Maps", key: "maps" },
    {
      id: 6,
      icon: Images.geoTool,
      tooltip: "Geo Analysis Tool",
      key: "geo",
    },
  ];

  const subIconList: SubIconItem[] = [
    { id: "select", icon: Images.select, tooltip: "Select" },
    { id: "rectangle", icon: Images.rectangle, tooltip: "Rectangle" },
    { id: "polygon", icon: Images.polygon, tooltip: "Polygon" },
  ];
  // const handleIconClick = (key: string) => {
  //   alert(`Clicked on ${key} icon`);

  //   switch (key) {
  //     case "3dmap":
  //       // call3DMapAPI();
  //       break;
  //     case "legend":
  //       // callLegendAPI();
  //       break;
  //     case "charts":
  //       // callChartsAPI();
  //       break;
  //     case "draw":
  //       // callDrawOnMapAPI();
  //       break;
  //     case "maps":
  //       // callMapsAPI();
  //       break;
  //     case "geo":
  //       // callGeoAnalysisAPI();
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const handleIconClick = (key: IconKey) => {
  //   setActiveKey((prev) => (prev === key ? null : key));
  //   onIconClick(key);
  // };

  return (
    <div
      className={`${styles["lip-right-sidebar__wrap"]} ${
        isPanelOpen ? styles["lip-right-sidebar__wrap--shifted"] : ""
      }`}
    >
      <div className={styles["lip-right-sidebar__wrap"]}>
        <div className={styles["lip-right-sidebar__icons"]}>
          {iconList.map((item) => (
            <div key={item.id} className={styles["lip-right-sidebar__icon-wrap"]}>
              <div
                key={item.id}
                className={`${styles["lip-right-sidebar__icon"]} ${
                  activeKey === item.key
                    ? styles["lip-right-sidebar__icon--active"]
                    : ""
                }`}
                onClick={() => onIconClick(item.key)}
              >
                <IconWithTooltip
                  icon={item.icon}
                  tooltipText={item.tooltip}
                  position="left"
                  onClick={() => onIconClick(item.key)}
                  className={`
                ${styles["lip-right-sidebar__icon"]}
                ${
                  activeKey === item.key
                    ? styles["lip-right-sidebar__icon--active"]
                    : ""
                }
              `}
                />
              </div>

              {item.key === "draw" && activeKey === "draw" && (
                <div className={styles["lip-right-sidebar__sub-icons"]}>
                  {subIconList.map((subItem) => (
                    <IconWithTooltip
                      key={subItem.id}
                      icon={subItem.icon}
                      tooltipText={subItem.tooltip}
                      position="left"
                      className={styles["lip-right-sidebar__sub-icon"]}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
