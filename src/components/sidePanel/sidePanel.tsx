import styles from './sidePanel.module.scss';

const SidePanel = ({
  visible,
  onClose,
  title,
  content,
}: {
  visible: boolean;
  onClose: () => void;
  title: React.ReactNode;
  content: React.ReactNode;
}) => {
  return (
    <div className={`${styles["side-panel"]} ${visible ? styles["side-panel--visible"] : ""}`}>
      <div className={styles["side-panel__header"]}>
        <h2>{title}</h2>
        <button onClick={onClose}>✕</button>
      </div>
      <div className={styles["side-panel__content"]}>
        {content}
      </div>
    </div>
  );
};

export default SidePanel;
