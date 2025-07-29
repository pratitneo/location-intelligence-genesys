import type { SidePanelType } from "../../types/types";
import styles from "./sidePanel.module.scss";

// export type SidePanelType = {
//   customCls: string;
//   visible: boolean;
//   visibleCls: string;
//   content: React.ReactNode;
//   contentProps?: any;
// };

const SidePanel = ({ customCls, visible, visibleCls, content }: SidePanelType) => {
  return (
    <div className={` ${styles['lip-panel__wrap']} ${styles[`lip-panel__${customCls}`]} ${visible ? styles[`lip-panel--${visibleCls}`] : ""}`}>
      <div className={styles["lip-panel__content"]}>{content}</div>
    </div>
  );
};

export default SidePanel;
