
import type { SeparatorType } from '../../types/types'
import separatorCss from './separator.module.scss'
const Separator = ({ separatorText, separator }: SeparatorType) => {
    return (
        <div className={`${separatorCss['lip-separator__wrap']}`}>
            {separatorText ? (
                <>
                    <div className={`${separatorCss['lip-separator__line']}`}></div>
                    <p className={`${separatorCss['lip-separator__text']}`}>{separatorText}</p>
                    <div className={`${separatorCss['lip-separator__line']}`}></div>
                </>
            ) : ''}
            {separator ? <div className={`${separatorCss['lip-separator__line']}`}></div> : ''}
        </div>
    )
}

export default Separator