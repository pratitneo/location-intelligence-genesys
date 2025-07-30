import type { DataLayerHeadType } from '../../types/types';
import IconWithTooltip from '../iconWithTooltip/IconWithTooltip';
import dlhScss from './dataLayerHead.module.scss';
const DataLayerHead = ({ heading, icon }: DataLayerHeadType) => {
  return (
    <div className={`${dlhScss['lip-dlh__wrap']}`}>
      <p className={`${dlhScss['lip-dlh__head']}`}> {heading} </p>
      {icon && <IconWithTooltip icon={icon} tooltipText={'Add Data'} position={"left"} customCls={'dl-icon'} getActionFn={() => { }} />}
    </div>
  )
}

export default DataLayerHead;
