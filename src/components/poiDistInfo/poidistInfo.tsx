import type { POIdistInfoTypes } from '../../types/types'
import distInfoCss from './POIDistInfo.module.scss'

const POIdistInfo = ({ number, category, distance, customClswrap, direction }: POIdistInfoTypes) => {
  return (
    <div className={`${distInfoCss[`lip-distinfo__${direction}`]} ${customClswrap ? customClswrap : ''}`}>
      <span className={`${distInfoCss[`lip-distinfo__num`]}`}>{number}</span>
      <div className={`${distInfoCss[`lip-distinfo__container`]}`}>
        <span className={`${distInfoCss[`lip-distinfo__category`]}`}>{`Total Number of ${category}`}</span>
        {distance && (<span className={`${distInfoCss[`lip-distinfo__distance`]}`}>{`${distance} Average distance from the pin location`}</span>)}
      </div>
    </div>
  )
}

export default POIdistInfo