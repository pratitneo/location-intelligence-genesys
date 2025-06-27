import { useState } from 'react'
import scoreDrpDwnCss from './siteScoreDrpDwn.module.scss'
import { Images } from '../../assets/assets'
import type { SiteDrpDwnItemType, SiteDrpDwnType } from '../../types/types'

const SiteScoreDrpDwn = ({ drpDwnData, children }: SiteDrpDwnType) => {
    const [drpDwn, setDrpDwn] = useState<number | null>(null)
    const handleDrpDwn = (index: number) => {
        setDrpDwn((prevDrpDwn) => prevDrpDwn === index ? null : index)
    }
    return (
        <div className={`${scoreDrpDwnCss['lip-siteDrpDwn__drpDwnContent']}`}>
            <div key={drpDwnData?.id} className={`${scoreDrpDwnCss['lip-siteDrpDwn__wrap']}`} onClick={() => handleDrpDwn(drpDwnData?.id)}>
                <div className={`${scoreDrpDwnCss['lip-siteDrpDwn__name']}`}>
                    <img src={drpDwnData?.icon} alt="" className={`${scoreDrpDwnCss['lip-siteDrpDwn__icon']}`} />
                    <p className={`${scoreDrpDwnCss['lip-siteDrpDwn__label']}`}>{drpDwnData?.label} spectra</p>
                </div>
                <img src={Images?.drpDwnArr} alt="" className={`${scoreDrpDwnCss['lip-siteDrpDwn__arrow']} ${drpDwn === drpDwnData?.id ? scoreDrpDwnCss['lip-siteDrpDwn__arrow--open'] : ''}`} />
            </div>
            <div className={`${scoreDrpDwnCss['lip-siteDrpDwn__content']} ${drpDwn === drpDwnData?.id ? scoreDrpDwnCss['lip-siteDrpDwn__content--show'] : ''}`}>
                {children}
            </div>
        </div>
    )
}

export default SiteScoreDrpDwn