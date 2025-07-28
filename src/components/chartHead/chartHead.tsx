import type { ChartHeadType } from '../../types/types';
import chartHeadCss from './chartHead.module.scss';

const ChartHead = ({head}: ChartHeadType) => {
  return (
    <span className={`${chartHeadCss['lip-charthead__wrap']}`}>{head}</span>
  )
}

export default ChartHead;