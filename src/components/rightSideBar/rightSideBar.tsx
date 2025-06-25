import { LuBox } from "react-icons/lu";
import { VscGraphLine } from "react-icons/vsc";
import { BiLogoGraphql } from "react-icons/bi";
import { SlLayers } from "react-icons/sl";
import { PiPolygonDuotone } from "react-icons/pi";
import { RiListCheck3 } from "react-icons/ri";
import { FaVectorSquare } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa";
import { BiShapePolygon } from "react-icons/bi";
import styles from "./rightSidebar.module.scss";
import type { ReactElement } from "react";

type IconKey = "3dmap" | "legend" | "charts" | "draw" | "maps" | "geo";

const RightSideBar = ({
  isPanelOpen,
  onIconClick,
  activeKey
}: {
  isPanelOpen: boolean;
  onIconClick: (key: IconKey) => void;
  activeKey: IconKey | null;
}) => {
  // const [activeKey, setActiveKey] = useState<IconKey | null>(null);
  const iconList: {
    id: number;
    icon: ReactElement;
    tooltip: string;
    key: IconKey;
  }[] = [
    { id: 1, icon: <LuBox />, tooltip: "3D Map", key: "3dmap" },
    { id: 2, icon: <RiListCheck3 />, tooltip: "Legend", key: "legend" },
    { id: 3, icon: <VscGraphLine />, tooltip: "Charts", key: "charts" },
    { id: 4, icon: <BiLogoGraphql />, tooltip: "Draw On Map", key: "draw" },
    { id: 5, icon: <SlLayers />, tooltip: "Maps", key: "maps" },
    {
      id: 6,
      icon: <PiPolygonDuotone />,
      tooltip: "Geo Analysis Tool",
      key: "geo",
    },
  ];

  const subIconList = [
    { id: "select", icon: <FaLocationArrow />, tooltip: "Select" },
    { id: "rectangle", icon: <FaVectorSquare />, tooltip: "Rectangle" },
    { id: "polygon", icon: <BiShapePolygon />, tooltip: "Polygon" },
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
       className={`${styles["right-sidebar__wrap"]} ${
    isPanelOpen ? styles["right-sidebar__wrap--shifted"] : ""
  }`}
    >
      <div className={styles["right-sidebar__wrap"]}>
        <div className={styles["right-sidebar__icons"]}>
          {iconList.map((item) => (
            <div key={item.id} className={styles["right-sidebar__icon-wrap"]}>
              <div
                className={styles["right-sidebar__icon"]}
                onClick={() => onIconClick(item.key)}
              >
                <span className={styles["right-sidebar__tooltip"]}>
                  {item.tooltip}
                </span>
                {item.icon}
              </div>

              {item.key === "draw" && activeKey === "draw" && (
                <div className={styles["right-sidebar__sub-icons"]}>
                  {subIconList.map((subItem) => (
                    <div
                      key={subItem.id}
                      className={styles["right-sidebar__sub-icon"]}
                    >
                      <span className={styles["right-sidebar__tooltip"]}>
                        {subItem.tooltip}
                      </span>
                      {subItem.icon}
                    </div>
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
