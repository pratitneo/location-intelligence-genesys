import type { SelectSubdataType } from '../../types/types'
import subdataCss from './selectSubData.module.scss'
const SelectSubData = ({head, dragIcon, arrowIcon, eyeIcon, isDropdownOpen, onArrowClick}: SelectSubdataType) => {
  return (
    <div className={subdataCss['lip-subdata__wrap']}>
      {/* Heading and icons row */}
      <div className={subdataCss['lip-subdata__row']}>
        <div className={subdataCss['lip-subdata__container']}>
          <img className={subdataCss['lip-subdata__dragIcon']} src={dragIcon} alt='DragIcon' />
            <p>{head}</p>
        </div>
        <div className={subdataCss['lip-subdata__container']}>
          <img
            className={subdataCss['lip-subdata__arrowIcon']}
            src={arrowIcon}
            alt='ArrowIcon'
            onClick={onArrowClick}
            style={{ cursor: 'pointer' }}
          />
          <img className={subdataCss['lip-subdata__eyeIcon']} src={eyeIcon} alt='EyeIcon' />
        </div>
      </div>
      {/* Dropdown content row */}
      {isDropdownOpen && (
        <div className={subdataCss['lip-subdata__dropdown']}>
          <div>Dropdown content for {head}</div>
        </div>
      )}
    </div>
  )
}

export default SelectSubData