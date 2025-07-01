import { Outlet, useLocation } from "react-router-dom";

import { useState } from "react";
import styles from "./layout.module.scss";
import RightSideBar from "../rightSideBar/rightSideBar";
import SidePanel from "../sidePanel/sidePanel";
import Sidebar from "../sidebar/sidebar";

type IconKey = "3dmap" | "legend" | "charts" | "draw" | "maps" | "geo";

const Layout = () => {
  const location = useLocation();
  const [activePanel, setActivePanel] = useState<IconKey | null>(null);

  const handleIconClick = (key: IconKey) => {
    setActivePanel((prev) => (prev === key ? null : key));
  };

  const getPanelTitle = (key: IconKey) => {
    switch (key) {
      case "3dmap":
        return <div>3D Map Content</div>;
      case "charts":
        return <div>Charts Content</div>;
      case "legend":
        return <div>Legend Content</div>;
      case "draw":
        return <div>Draw on Map Content</div>;
      case "maps":
        return <div>Maps Content</div>;
      case "geo":
        return <div>Geo Analysis Content</div>;
      default:
        return <div>No Content</div>;
    }
  };
  const isLandingPage = location.pathname === "/landingPage";
  const isProfilePage = location.pathname === "/profile";
  const isSavedWork = location.pathname === "/saved-work";

  return (
    <div className={styles.layout}>
      {/* Main content */}
      <Outlet />
      {isLandingPage && (
        <>
          {/* Left Sidebar */}
          <Sidebar />
          {/* Right Sidebar */}
          <RightSideBar isPanelOpen={!!activePanel} onIconClick={handleIconClick} activeKey={activePanel} />
          {/* Side Panel */}
          <SidePanel visible={!!activePanel} onClose={() => setActivePanel(null)} title={activePanel ? getPanelTitle(activePanel) : ""} content={activePanel ? (<div>Data for {getPanelTitle(activePanel)}</div>) : null} />
        </>
      )}
      {(isProfilePage || isSavedWork) && (
        <>
          {/* Left Sidebar */}
          <Sidebar />
        </>
      )}

    </div>
  );
};

export default Layout;
