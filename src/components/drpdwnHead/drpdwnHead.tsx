import type { DropdownHeadType } from '../../types/types'
import DrpdwnCss from './drpdwnHead.module.scss'



const DrpdwnHead = ({ icon, heading, customCls }: DropdownHeadType) => {
  return (
    <div className={`${DrpdwnCss['lip-drpdwnHead__wrap']} ${customCls ? customCls : ''}`}>
      {icon && <img className={`${DrpdwnCss['lip-drpdwnHead__icon']}`} src={icon} alt='DropdownHeadIcon'/>}
      <p className={`${DrpdwnCss['lip-drpdwnHead__heading']}`}>{heading}</p>
    </div>
  )
}

export default DrpdwnHead