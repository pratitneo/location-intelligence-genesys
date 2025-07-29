import type { DriveTimeType } from '../../types/types'
import drvtimCss from './driveTime.module.scss'
const DriveTime = ({ value, label }: DriveTimeType) => {
  return (
    <div className={`${drvtimCss['lip-drvtim__wrap']}`}>
      <span className={`${drvtimCss['lip-drvtim__value']}`}>{value}</span>
      <span className={`${drvtimCss['lip-drvtim__minutes']}`}>Minutes</span>
      <span className={`${drvtimCss['lip-drvtim__label']}`}>{label}</span>
    </div>
  )
}

export default DriveTime;