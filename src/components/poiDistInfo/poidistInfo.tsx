import type { POIdistInfoTypes } from '../../types/types'
import distInfoCss from './POIDistInfo.module.scss'

const POIdistInfo = ({number, category, distance, customClswrap, customClsnumber, customClscontainer, customClscategory, customClsdisance}: POIdistInfoTypes) => {
  return (
    <div className={`${distInfoCss[`lip-distinfo__${customClswrap}`]}`}>
        <span className={`${distInfoCss[`lip-distinfo__${customClsnumber}`]}`}>{number}</span>
        <div className={`${distInfoCss[`lip-distinfo__${customClscontainer}`]}`}>
            <span className={`${distInfoCss[`lip-distinfo__${customClscategory}`]}`}>{`Total Number of ${category}`}</span>
            {distance &&( <span className={`${distInfoCss[`lip-distinfo__${customClsdisance}`]}`}>{`${distance} Average distance from the pin location`}</span>)}
        </div>
    </div>
  )
}

export default POIdistInfo