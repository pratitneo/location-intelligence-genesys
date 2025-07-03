import type { TotalAddMarkType } from '../../types/types'
import DrpdwnHead from '../drpdwnHead/drpdwnHead'
import tamCss from './totalAddMark.module.scss'
const TotalAddMark = ({ tamNum }: TotalAddMarkType) => {
    return (
        <div className={`${tamCss['lip-tam__wrap']}`}>
            <DrpdwnHead heading='total addressable market (TAM)' customCls='radar-chart' />
            <p className={`${tamCss['lip-tam__num']}`}>{tamNum} cr annually</p>
        </div>
    )
}

export default TotalAddMark