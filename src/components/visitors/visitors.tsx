import React from 'react'
import visitCss from './visitors.module.scss'
import type { PeakNonPeakType } from '../../types/types'

const Visitors = ({ time, avgVisitor, status, bgClass }: PeakNonPeakType) => {
    switch (status) {
        case 'low': bgClass = 'low'
            break;

        case 'high': bgClass = 'high'
            break;

        default: bgClass = ''
            break;
    }
    return (
        <div className={`${visitCss['lip-visit__wrap']} ${visitCss[`lip-visit--${bgClass}`]}`}>
            <p className={`${visitCss['lip-visit__time']}`}>{time}</p>
            <p className={`${visitCss['lip-visit__visitors']}`}>{avgVisitor} Avg. Visitors</p>
        </div>
    )
}

export default Visitors