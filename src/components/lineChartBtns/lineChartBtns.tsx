import type { LineBtnsType, LineBtnType } from '../../types/types'
import lineBtnCss from './lineChartBtns.module.scss'
const LineChartBtns = ({ getBtnNames, getActivateBtnFn }: LineBtnsType) => {
    return (
        <>
            {/* line chart header */}
            <div className={`${lineBtnCss['lip-lineBtns__header']}`}>
                <p className={`${lineBtnCss['lip-lineBtns__head']}`}>Footfall Prediction</p>
                <div>
                    {getBtnNames?.map((btn: LineBtnType) => {
                        return (
                            <button key={btn?.id} className={`${lineBtnCss['lip-lineBtns__btn']} ${btn?.active ? lineBtnCss['lip-lineBtns--active'] : ''}`} onClick={() => getActivateBtnFn(btn?.id)}>{btn?.label}</button>
                        )
                    })}
                </div>
            </div >
        </>
    )
}

export default LineChartBtns