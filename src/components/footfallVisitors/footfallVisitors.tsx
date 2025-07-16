import type { FootfallVisitorType, PeakNonPeakType } from '../../types/types'
import DrpdwnHead from '../drpdwnHead/drpdwnHead'
import Visitors from '../visitors/visitors'
import footVisitCss from './footfallVisitors.module.scss'

const FootfallVisitors = ({ peakHourData, nonPeakHourData }: FootfallVisitorType) => {
    return (
        <div className={`${footVisitCss['lip-footVisit__wrap']}`}>
            <div className={`${footVisitCss['lip-footVisit__average']}`}>
                <DrpdwnHead heading='Average Footfall in Peak Hour' />
                {peakHourData?.map((peak: PeakNonPeakType, index: number) => {
                    return (
                        <Visitors key={index} time={peak?.time} avgVisitor={peak?.avgVisitor} status={peak?.status} />
                    )
                })}
            </div>
            <div className={`${footVisitCss['lip-footVisit__average']}`}>
                <DrpdwnHead heading='Average Footfall in Non-Peak Hour' />
                {nonPeakHourData?.map((nonPeak: PeakNonPeakType, index: number) => {
                    return (
                        <Visitors key={index} time={nonPeak?.time} avgVisitor={nonPeak?.avgVisitor} status={nonPeak?.status} />
                    )
                })}
            </div>
        </div>
    )
}

export default FootfallVisitors