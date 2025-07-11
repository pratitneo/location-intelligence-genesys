import React from "react";
import styles from "./IconWithTooltip.module.scss";
import type { IconWithTooltipType } from "../../types/types";


const IconWithTooltip: React.FC<IconWithTooltipType> = ({
  icon,
  tooltipText,
  position = "right",
  customCls = "",
  getActionFn
}) => {
  return (
    <div className={` ${styles[`lip-tooltip__${customCls}`]} ${styles['lip-tooltip__wrap']}`} onClick={getActionFn}>
      {tooltipText ? <span className={`${styles['lip-tooltip__text']} ${styles[`lip-tooltip__text--${position}`]}`}>{tooltipText}</span> : ''}
      <img src={icon} alt={tooltipText} className={styles['lip-tooltip__iconImage']} />
    </div>
  );
};

export default IconWithTooltip;
