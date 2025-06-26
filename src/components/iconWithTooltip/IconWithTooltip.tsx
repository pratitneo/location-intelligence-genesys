import React from "react";
import styles from "./IconWithTooltip.module.scss";

interface IconWithTooltipProps {
  icon: string; // image path
  tooltip: string;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
  onClick?: () => void;
}

const IconWithTooltip: React.FC<IconWithTooltipProps> = ({
  icon,
  tooltip,
  position = "right",
  className = "",
//   onClick,
}) => {
  return (
    <div
      className={`${styles.iconWrapper} ${className}`}
    //   onClick={onClick}
    >
      <span className={`${styles.tooltip} ${styles[position]}`}>
        {tooltip}
      </span>
      <img src={icon} alt={tooltip} className={styles.iconImage} />
    </div>
  );
};

export default IconWithTooltip;
