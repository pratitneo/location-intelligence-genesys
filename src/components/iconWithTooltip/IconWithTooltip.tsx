import React from "react";
import styles from "./IconWithTooltip.module.scss";

interface IconWithTooltipProps {
  icon: string; // image path
  tooltipText?: string;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
  onClick?: () => void;
}

const IconWithTooltip: React.FC<IconWithTooltipProps> = ({
  icon,
  tooltipText,
  position = "right",
  className = "",
  //   onClick,
}) => {
  return (
    <div className={`${styles.iconWrapper} ${className}`}>
      {tooltipText ? <span className={`${styles.tooltip} ${styles[position]}`}>{tooltipText}</span> : ''}
      <img src={icon} alt={tooltipText} className={styles.iconImage} />
    </div>
  );
};

export default IconWithTooltip;
