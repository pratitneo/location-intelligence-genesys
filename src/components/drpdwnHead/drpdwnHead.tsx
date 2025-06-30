import type { DropdownHeadType } from '../../types/types'
import DrpdwnCss from './drpdwnHead.module.scss'



const DrpdwnHead = ({ icon, heading }: DropdownHeadType) => {
  return (
    <div className={`${DrpdwnCss['lip-drpdwnHead__wrap']}`}>
      <img className={`${DrpdwnCss['lip-drpdwnHead__icon']}`} src={icon} alt='DropdownHeadIcon'/>
      <h2 className={`${DrpdwnCss['lip-drpdwnHead__heading']}`}>{heading}</h2>
    </div>
  )
}

export default DrpdwnHead