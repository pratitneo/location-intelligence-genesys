import type { SpendingSegmentType } from '../../types/types';
import cltspndCSS from './ClothingSpendLevel.module.scss'


const ClothingSpendLevel = ({spendLevel, percentage, approxCount}: SpendingSegmentType) => {
    const levelClass = spendLevel.toLowerCase();
  return (
    <div className={`
        ${cltspndCSS['lip-cltspnd__customerSpending']}
        ${cltspndCSS[`lip-cltspnd__customerSpending--${levelClass}`]} `}>
        <span className={`
            ${cltspndCSS['lip-cltspnd__label']}
            ${cltspndCSS[`lip-cltspnd__label--${levelClass}`]}`}>{spendLevel}</span>

      <div className={`${cltspndCSS['lip-cltspnd__valueContainer']}`}>
        <span>{percentage}</span>
        <span>{`(~${approxCount})`}</span>
      </div>
    </div>
  )
}

export default ClothingSpendLevel;