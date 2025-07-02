import type { AvgDriveTimeType } from '../../types/types'
import drvtimCss from './avgDriveTime.module.scss'

const AvgDriveTime = ({value, label}: AvgDriveTimeType) => {
  return (
    <div className={`${drvtimCss['lip-avgdrvtim__wrap']}`}>
        <span className={`${drvtimCss['lip-avgdrvtim__value']}`}>{value}</span>
        <span className={`${drvtimCss['lip-avgdrvtim__minutes']}`}>Minutes</span>
        <span className={`${drvtimCss['lip-avgdrvtim__label']}`}>{label}</span>
    </div>
  )
}

export default AvgDriveTime