import type { FootfallVisitorType, PeakNonPeakType } from '../../types/types'
import Visitors from '../visitors/visitors'
import footVisitCss from './footfallVisitors.module.scss'

const FootfallVisitors = ({ peakHourData, nonPeakHourData }: FootfallVisitorType) => {
    return (
        <div className={`${footVisitCss['lip-footVisit__wrap']}`}>
            <div className={`${footVisitCss['lip-footVisit__average']}`}>
                peak head component
                {peakHourData?.map((peak: PeakNonPeakType, index: number) => {
                    return (
                        <Visitors time={peak?.time} avgVisitor={peak?.avgVisitor} status={peak?.status} />
                    )
                })}
            </div>
            <div className={`${footVisitCss['lip-footVisit__average']}`}>
                non peak head component
                {nonPeakHourData?.map((nonPeak: PeakNonPeakType, index: number) => {
                    return (
                        <Visitors time={nonPeak?.time} avgVisitor={nonPeak?.avgVisitor} status={nonPeak?.status} />
                    )
                })}
            </div>
        </div>
    )
}

export default FootfallVisitors