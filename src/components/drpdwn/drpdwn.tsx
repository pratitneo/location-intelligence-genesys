import { Images } from '../../assets/assets'
import type { DrpDwnType, OptType } from '../../types/types'
import drpdwnCss from './drpdwn.module.scss'
const Drpdwn = ({ optsData, mainCls, selectId }: DrpDwnType) => {
    return (
        <select id={selectId} className={`${drpdwnCss[`lip-drpdwn__${mainCls}`]}`}>
            {optsData?.map((opt: OptType, index: number) => {
                return (
                    <option key={index} value={opt?.value}>{opt?.value}</option>
                )
            })}
            <img src={Images?.drpDwnArr} alt="" />
        </select>
    )
}

export default Drpdwn