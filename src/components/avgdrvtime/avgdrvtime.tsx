import DriveTime from "../driveTime/driveTime";
import avgdrvtmCss from './avgdrvtime.module.scss'

const AvgDrvTime = () => {
  return (
    <div className={`${avgdrvtmCss['lip-avgdrvtime__time']}`}>
        <p className={`${avgdrvtmCss['lip-avgdrvtime__time-heading']}`}>Average Drive Time</p>
        <div className={`${avgdrvtmCss['lip-avgdrvtime__hours']}`}>
        <DriveTime value={28} label={"Non-Peak hours"}/>
        <DriveTime value={16} label={"Peak hours"}/>
        </div>
    </div>
  )
}

export default AvgDrvTime;