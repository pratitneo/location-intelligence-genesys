import { useSidebar } from '../../context/sidebarContex'
import type { SelectSubdataType } from '../../types/types'
import SubdataCheckbox from '../subdataCheckbox/subdataCheckbox'
import subdataCss from './selectSubData.module.scss'
const SelectSubData = ({ head, dragIcon, arrowIcon, eyeIcon, isDropdownOpen, onArrowClick, isHidden, onEyeClick }: SelectSubdataType & { isHidden?: boolean, onEyeClick?: () => void }) => {
  const { updateRightPanel, setRightIconKey } = useSidebar()
  return (
    <div className={subdataCss['lip-subdata__wrap']} style={isHidden ? { background: '#EEEEEE' } : undefined}>
      {/* Heading and icons row */}
      <div className={subdataCss['lip-subdata__row']} onClick={() => {
        updateRightPanel(true)
        setRightIconKey('maps')
      }}>
        <div className={subdataCss['lip-subdata__container']}>
          <img className={subdataCss['lip-subdata__dragIcon']} src={dragIcon} alt='DragIcon' />
          <p>{head}</p>
        </div>
        <div className={subdataCss['lip-subdata__container']}>
          {arrowIcon && (
            <img
              className={subdataCss['lip-subdata__arrowIcon']}
              src={arrowIcon}
              alt='ArrowIcon'
              onClick={onArrowClick}
              style={{ cursor: 'pointer' }}
            />
          )}
          <img className={subdataCss['lip-subdata__eyeIcon']} src={eyeIcon} alt='EyeIcon' onClick={onEyeClick} style={{ cursor: 'pointer' }} />
        </div>
      </div>
      {/* Dropdown content row */}
      {arrowIcon && isDropdownOpen && (
        <div className={subdataCss['lip-subdata__dropdown']}>
          <SubdataCheckbox name={'male'} />
          <SubdataCheckbox name={"female"} />
          <SubdataCheckbox name={'male'} />
          <SubdataCheckbox name={"female"} />
        </div>
      )}
    </div>
  )
}

export default SelectSubData