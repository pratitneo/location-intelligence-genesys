import type { AccessIndexType } from '../../types/types'
import acsindexCss from './accessIndex.module.scss'

const AccessIndex = ({value, accessLabel} : AccessIndexType) => {
  return (
    <div className={`${acsindexCss['lip-accindex__pointer-index']}`}>
              <p className={`${acsindexCss['lip-accindex__pointer']}`}>
                <span className={`${acsindexCss['lip-accindex__value']}`}>{value}</span> 
                <span>/ 10</span>
              </p>

              <p className={`${acsindexCss['lip-accindex__index']}`}>
                {accessLabel} Accessibility Index
              </p>
    </div>
  )
}

export default AccessIndex