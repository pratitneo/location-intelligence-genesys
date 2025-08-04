
// import { useSpectraContext } from '../../context/useContextHooks'
import type { ScoreBtnType, SiteScoreBtnsType } from '../../types/types'
import IconWithTooltip from '../iconWithTooltip/IconWithTooltip'
import scoreBtnCss from './siteScoreBtns.module.scss'
const SiteScoreBtns = ({ btnsData }: SiteScoreBtnsType) => {
    // const { activeSpectra, handleSpectra } = useSpectraContext()
    // const getSpectraName = (e: any) => {
    //     handleSpectra?.(e?.currentTarget?.id)
    // }
    // console.log(activeSpectra, 'activeSpectra')
    return (
        <div className={`${scoreBtnCss['lip-scoreBtns__wrap']}`}>
            {btnsData?.map((btn: ScoreBtnType, index: number) => {
                return (
                    <IconWithTooltip iconTooltipId={btn?.label} key={index} tooltipText={btn?.label} position='top' icon={btn?.icon} getActionFn={(e) => getSpectraName(e)} />
                )
            })}
        </div>
    )
}

export default SiteScoreBtns