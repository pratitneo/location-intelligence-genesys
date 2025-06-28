import DropdownHeadCSS from './drpdwnHead.module.scss'

type DropdownHeadProps = {
  icon: string;
  heading: string;
  isFull?: boolean;
};

const DrpdwnHead = ({ icon, heading, isFull = false }: DropdownHeadProps) => {
  return (
    <div className={`${DropdownHeadCSS['lip-drpdwnHead__wrap']} ${isFull ? DropdownHeadCSS['lip-drpdwnHead__wrapFull'] : ''}`}>
      <img className={`${DropdownHeadCSS['lip-drpdwnHead__icon']} ${isFull ? DropdownHeadCSS['lip-drpdwnHead__iconFull'] : ''}`} src={icon} alt='DropdownHeadIcon'/>
      <h2 className={`${DropdownHeadCSS['lip-drpdwnHead__heading']}`}>{heading}</h2>
    </div>
  )
}

export default DrpdwnHead