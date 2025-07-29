import type { SpendingType } from '../../types/types';
import cltspndCSS from './clothingSpendLevel.module.scss'


const ClothingSpendLevel = ({ spendLevel, percentage, approxCount }: SpendingType) => {
  // const levelClass = spendLevel.toLowerCase();
  return (
    <div className={`
        ${cltspndCSS['lip-cltspnd__customerSpending']}
        ${cltspndCSS[`lip-cltspnd__customerSpending--${spendLevel}`]} `}>
      <span className={`
            ${cltspndCSS['lip-cltspnd__label']}
            ${cltspndCSS[`lip-cltspnd__label--${spendLevel}`]}`}>{spendLevel}</span>

      <div className={`${cltspndCSS['lip-cltspnd__valueContainer']}`}>
        <span>{percentage}</span>
        <span>{`(~${approxCount})`}</span>
      </div>
    </div>
  )
}

export default ClothingSpendLevel;