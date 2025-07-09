
import type { ScoreBtnType, SiteScoreBtnsType } from '../../types/types'
import IconWithTooltip from '../iconWithTooltip/IconWithTooltip'
import scoreBtnCss from './siteScoreBtns.module.scss'
const SiteScoreBtns = ({ btnsData }: SiteScoreBtnsType) => {
    return (
        <div className={`${scoreBtnCss['lip-scoreBtns__wrap']}`}>
            {btnsData?.map((btn: ScoreBtnType, index: number) => {
                return (
                    <IconWithTooltip tooltipText={btn?.label} position='top' icon={btn?.icon} />
                )
            })}
        </div>
    )
}

export default SiteScoreBtns