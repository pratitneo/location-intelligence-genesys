import type { SidePanelType } from "../../types/types";
import styles from "./sidePanel.module.scss";

const SidePanel = ({ visible, onClose, title, content }: SidePanelType) => {
  return (
    <div className={`${styles["lip-side-panel"]} ${visible ? styles["lip-side-panel--visible"] : ""}`}>
      {title ? (
        <div className={styles["lip-side-panel__header"]}>
          <h2>{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>
      ) : ''}
      <div className={styles["lip-side-panel__content"]}>{content}</div>
    </div>
  );
};

export default SidePanel;
