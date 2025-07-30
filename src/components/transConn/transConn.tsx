import type { TransConnType } from '../../types/types'
import connectCss from './transConn.module.scss'

const TransConn = ({ icon, type, location }: TransConnType) => {
  return (
    <div className={`${connectCss['lip-trpcon__wrap']}`}>
      <div className={`${connectCss['lip-trpcon__container']}`}>
        <img src={icon} alt='transport-icon' />
        <span className={`${connectCss['lip-trpcon__type']}`}>{type}</span>
      </div>
      <span className={`${connectCss['lip-trpcon__location']}`}>{location}</span>
    </div>
  )
}

export default TransConn