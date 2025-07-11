import { Outlet, useLocation } from "react-router-dom";

import { useState } from "react";
import styles from "./layout.module.scss";
import RightSideBar from "../rightSideBar/rightSideBar";
import SidePanel from "../sidePanel/sidePanel";
import Sidebar from "../sidebar/sidebar";
import type { IconKey } from "../../types/types";
import SiteSelection from "../siteSelection/siteSelection";
import LandingPage from '../../pages/landingPage/landingPage';
import { useSidebar } from "../../context/sidebarContex";

const Layout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/landingPage";
  const isProfilePage = location.pathname === "/profile";
  const isSavedWork = location.pathname === "/saved-work";

  // menu bar text animation
  const [sideTextVisibility, setSideTextVisibility] = useState(false)

  // for current open panelName: menu, left, right
  const { panelName, updatePanelName } = useSidebar();

  // for right side icons
  const [rightIconKey, setRightIconKey] = useState<IconKey | null>(null);

  // for right side sub icons
  const [subIconKey, setSubIconKey] = useState<IconKey | null>(null)

  // side panelName content
  const getPanelTitle = (key: IconKey) => {
    switch (key) {
      case "3dmap": return <div>3D Map Content</div>;
      case "charts": return <div>Charts Content</div>;
      case "legend": return <div>Legend Content</div>;
      case "draw": return <div>Draw on Map Content</div>;
      case "maps": return <div>Maps Content</div>;
      case "geo": return <div>Geo Analysis Content</div>;
      case "dataset": return <div>Dataset Content</div>;
      case "siteSelection": return <><SiteSelection /></>;
      default: return <div>No Content</div>;
    }
  };

  // menu sidebar toggle
  const toggleSidebar = () => {
    if (panelName?.toLowerCase() === 'menubar') {
      setSideTextVisibility(prevSideBarText => !prevSideBarText)
      setTimeout(() => updatePanelName(''), 500)
    }
    else {
      updatePanelName('menubar')
      setTimeout(() => { setSideTextVisibility(prevSideBarText => !prevSideBarText) }, 500);
      setSubIconKey(null)
    }
  }

  // right main icons click
  const handleIconClick = (key: IconKey) => {
    if (key === 'geo' || key === 'draw') {
      // empty key state
      setRightIconKey(null)

      // close menusidebar if open
      updatePanelName('')
      setSideTextVisibility(false)

      // set subicon key state 
      setSubIconKey(prev => prev === key ? null : key)
    }
    else if (key === 'siteSelection') {
      updatePanelName(panelName === 'rightPanel' ? '' : 'rightPanel')
      setRightIconKey(prev => prev === key ? null : key)
    }
    else {
      updatePanelName('rightPanel')
      setRightIconKey(prev => prev === key ? null : key)
      setSubIconKey(null)

      // hide menusidebar text
      setSideTextVisibility(false)
    }
  };

  // toggle sub icons
  const toggleLeftPanel = (id: string) => {
    if (id === 'select' || id === 'buffer') {
      updatePanelName('leftPanel')
    }
  }


  return (
    <div className={styles.layout}>
      {/* MAIN CONTENT */}
      {isLandingPage ? (<LandingPage sidebarOpen={panelName === 'menubar'} />) : (<Outlet />)}
      {isLandingPage && (
        <>
          {/* Left Sidebar */}
          <Sidebar getToggleFn={toggleSidebar} onIconClick={handleIconClick} sidebarOpen={panelName === 'menubar'} sideText={sideTextVisibility} />
          {/* Left SidepanelName */}
          <SidePanel customCls="left" visibleCls="left" visible={panelName === 'leftPanel'} content={''} />
          {/* Right Sidebar */}
          <RightSideBar onIconClick={handleIconClick} handleIconClick={toggleLeftPanel} isPanelOpen={panelName === 'rightPanel'} activeKey={subIconKey ? subIconKey : rightIconKey} />
          {/* Right Side Panel */}
          <SidePanel customCls="right" visibleCls="right" visible={panelName === 'rightPanel'} content={rightIconKey ? getPanelTitle(rightIconKey) : ''} />
        </>
      )}

      {/* OTHER PAGES */}
      {(isProfilePage || isSavedWork) && (
        <Sidebar getToggleFn={toggleSidebar} onIconClick={handleIconClick} sidebarOpen={panelName === 'menubar'} sideText={sideTextVisibility} />
      )}

    </div>
  );
};

export default Layout;
