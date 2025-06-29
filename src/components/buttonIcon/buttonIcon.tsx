import buttonCss from './buttonIcon.module.scss'
import { Images } from "../../assets/assets"

const ButtonIcon = () => {
  return (
    <div className={buttonCss['lip-buttonIcon__wrap']}>
        <button className={buttonCss['lip-buttonIcon__button']}>
            <span className={buttonCss['lip-buttonIcon__dot']} />
            <img src={Images?.contact} alt="Contact" className={buttonCss['lip-buttonIcon__contact']}/>    
        </button>
        <button className={buttonCss['lip-buttonIcon__button']}>
            <img src={Images?.chatbot} className={buttonCss['lip-buttonIcon__chatbot']}/>
        </button>
    </div>
  )
}

export default ButtonIcon