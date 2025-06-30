
import type { SiteScoreType } from '../../types/types'
import scoreCss from './siteScore.module.scss'
const SiteScore = ({ score, location }: SiteScoreType) => {
    return (
        <div className={`${scoreCss['lip-score__wrap']}`}>
            {/* score */}
            <div className={`${scoreCss['lip-score__box']}`}>
                <span className={`${scoreCss['lip-score__num']}`}>{score}</span>
                <span className={`${scoreCss['lip-score__total']}`}>/{10}</span>
            </div>
            {/* name & location */}
            <div className={`${scoreCss['lip-score__name__location']}`}>
                <p className={`${scoreCss['lip-score__name']}`}>spectra score</p>
                <p className={`${scoreCss['lip-score__location']}`}>{location}</p>
            </div>
        </div>
    )
}

export default SiteScore