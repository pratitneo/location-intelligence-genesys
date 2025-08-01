import { useState } from 'react'
import { Images } from '../../assets/assets'
import type { DrpDwnType, OptType } from '../../types/types'
import drpdwnCss from './drpdwn.module.scss'
const Drpdwn = ({ optsData, mainCls, selectId, optWrapCls }: DrpDwnType) => {
    const [optState, setOptState] = useState(false)
    const getActionFn = () => {
        setOptState(optState => !optState)
    }
    return (
        <div className={`${drpdwnCss['lip-drpdwn__selectWrap']}`}>
            <select id={selectId} className={`${drpdwnCss[`lip-drpdwn__${mainCls}`]}`} onClick={() => getActionFn()}>
                <div className={`${drpdwnCss[`lip-drpdwn__${optWrapCls}`]}`}>
                    {optsData?.map((opt: OptType, index: number) => {
                        return (
                            <option key={index} value={opt?.value}>{opt?.value}</option>
                        )
                    })}
                </div>
            </select>
            <img src={Images?.drpDwnArr} alt="" className={`${drpdwnCss['lip-drpdwn__arr']} ${optState ? drpdwnCss['lip-drpdwn__arr--active'] : ''}`} />
        </div>
    )
}

export default Drpdwn