import type { DropdownHeadType } from '../../types/types'
import drpdwnCss from './drpdwnHead.module.scss'



const DrpdwnHead = ({ icon, heading, customCls }: DropdownHeadType) => {
  return (
    <div className={`${drpdwnCss['lip-drpdwnHead__wrap']} ${customCls ? drpdwnCss[`lip-drpdwnHead__${customCls}`] : ''}`}>
      {icon && <img className={`${drpdwnCss['lip-drpdwnHead__icon']}`} src={icon} alt='DropdownHeadIcon' />}
      <p className={`${drpdwnCss['lip-drpdwnHead__heading']}`}>{heading}</p>
    </div>
  )
}

export default DrpdwnHead