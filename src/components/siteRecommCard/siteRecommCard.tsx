import { Images } from '../../assets/assets'
import type { RecommCardType } from '../../types/types'
import ButtonIcon from '../buttonIcon/buttonIcon'
import recomCardCss from './siteRecommCard.module.scss'

const SiteRecommCard = ({ cardData }: RecommCardType) => {
    return (
        <div className={`${recomCardCss['lip-recomCard__wrap']}`}>
            {/* location & score */}
            <div className={`${recomCardCss['lip-recomCard__header']}`}>
                <p className={`${recomCardCss['lip-recomCard__location']}`}>{cardData?.location}</p>
                <p className={`${recomCardCss['lip-recomCard__outOfScore']}`}><span className={`${recomCardCss['lip-recomCard__score']}`}>{cardData?.score}</span>/10</p>
            </div>
            {/* pincode & city */}
            <div className={`${recomCardCss['lip-recomCard__pinCityWrap']}`}>
                <div className={`${recomCardCss['lip-recomCard__pinCity']}`}>
                    pincode: <span className={`${recomCardCss['lip-recomCard__pinNum']}`}>{cardData?.pincode}</span>
                </div>
                <div className={`${recomCardCss['lip-recomCard__pinCity']}`}>
                    city: <span className={`${recomCardCss['lip-recomCard__cityName']}`}>{cardData?.city}</span>
                </div>
            </div>
            <div className={`${recomCardCss['lip-recomCard__btns']}`}>
                <ButtonIcon bgCls='violet' btnText='locate' mainCls='recommCard' trailIcon={Images?.locate} />
                <ButtonIcon bgCls='violet' btnText='shortlist' mainCls='recommCard' trailIcon={Images?.shortlist} />
                <ButtonIcon bgCls='red' btnText='reject' mainCls='recommCard' trailIcon={Images?.reject} />
            </div>
        </div>
    )
}

export default SiteRecommCard