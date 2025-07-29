import React from 'react'
import SiteRecommHead from '../siteRecommHead/siteRecommHead'
import siteRecCss from './siteRecomm.module.scss'
import Button from '../button/button'
import ButtonIcon from '../buttonIcon/buttonIcon'

const SiteRecomm = () => {
    return (
        <div className={`${siteRecCss['lip-siteRec__wrap']}`}>
            <SiteRecommHead />
            <Button buttonText='show recommendation' customCls='lip-showRec' />
        </div>
    )
}

export default SiteRecomm