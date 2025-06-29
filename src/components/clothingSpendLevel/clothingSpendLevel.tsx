import type { SpendingSegmentProps } from '../../types/types';
import cltspndCSS from './ClothingSpendLevel.module.scss'


const ClothingSpendLevel = ({spendLevel, percentage, approxCount}: SpendingSegmentProps) => {
    const levelClass = spendLevel.toLowerCase();
  return (
    <div className={`
        ${cltspndCSS['lip-profile__customerSpending']}
        ${cltspndCSS[`lip-profile__customerSpending--${levelClass}`]} `}>
        <span className={`
            ${cltspndCSS['lip-profile__label']}
            ${cltspndCSS[`lip-profile__label--${levelClass}`]}`}>{spendLevel}</span>

      <div className={`${cltspndCSS['lip-profile__valueContainer']}`}>
        <span>{percentage}</span>
        <span>{`(~${approxCount})`}</span>
      </div>
    </div>
  )
}

export default ClothingSpendLevel;