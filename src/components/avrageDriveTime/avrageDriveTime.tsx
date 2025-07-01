import type { AvrageDriveTimeType } from '../../types/types'
import drvtimCss from './avrageDriveTime.module.scss'

const AvrageDriveTime = ({value, label}: AvrageDriveTimeType) => {
  return (
    <div className={`${drvtimCss['lip-avgdrvtim__wrap']}`}>
        <span className={`${drvtimCss['lip-avgdrvtim__value']}`}>{value}</span>
        <span className={`${drvtimCss['lip-avgdrvtim__minutes']}`}>Minutes</span>
        <span className={`${drvtimCss['lip-avgdrvtim__label']}`}>{label}</span>
    </div>
  )
}

export default AvrageDriveTime