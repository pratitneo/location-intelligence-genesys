import React from 'react'
import recomCardCss from './siteRecommCard.module.scss'

const SiteRecommCard = () => {
    return (
        <div className={`${recomCardCss['lip-recomCard__wrap']}`}>
            <div className={`${recomCardCss['lip-recomCard__header']}`}>
                <p className={`${recomCardCss['lip-recomCard__location']}`}></p>
                <span className={`${recomCardCss['lip-recomCard__score']}`}></span>
            </div>
            <div className={`${recomCardCss['lip-recomCard__pinCity']}`}>
                <div className={`${recomCardCss['lip-recomCard__pincode']}`}>
                    pincode: <span className={`${recomCardCss['lip-recomCard__pinNum']}`}></span>
                </div>
                <div className={`${recomCardCss['lip-recomCard__city']}`}>
                    city: <span className={`${recomCardCss['lip-recomCard__cityName']}`}></span>
                </div>
            </div>
        </div>
    )
}

export default SiteRecommCard