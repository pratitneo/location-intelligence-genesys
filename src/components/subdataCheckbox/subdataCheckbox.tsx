import React, { useState } from "react";
import checkboxCss from './subdataCheckbox.module.scss';

interface SubdataCheckboxProps {
  name: string;
}

const SubdataCheckbox: React.FC<SubdataCheckboxProps> = ({ name }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label className={checkboxCss['lip-checkbox__wrap']}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(prev => !prev)}
        className={checkboxCss['lip-checkbox__input']}
      />
      <span
  className={`${checkboxCss['lip-checkbox__custom']} ${
    isChecked ? checkboxCss['lip-checkbox__custom--checked'] : ''
  }`}
>
  <svg width="24" height="24" viewBox="0 0 32 32">
    <polyline
      points="8,17 14,23 24,11"
      style={{
        fill: "none",
        stroke: "#641698",
        strokeWidth: 4,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }}
    />
  </svg>
</span>

      <span className={checkboxCss['lip-checkbox__label']}>{name}</span>
    </label>
  );
};

export default SubdataCheckbox;