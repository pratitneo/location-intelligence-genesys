import React from "react";
import styles from "./IconWithTooltip.module.scss";
import type { IconWithTooltipType } from "../../types/types";


const IconWithTooltip: React.FC<IconWithTooltipType> = ({
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
