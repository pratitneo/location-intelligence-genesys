import buttonCss from './buttonIcon.module.scss'
import { Images } from "../../assets/assets"
import { useNavigate } from 'react-router-dom';

const ButtonIcon = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  }
  return (
    <div className={buttonCss['lip-buttonIcon__wrap']}>
        <button className={buttonCss['lip-buttonIcon__button']}>
            <span className={buttonCss['lip-buttonIcon__dot']} />
            <img src={Images?.contact} alt="Contact" className={buttonCss['lip-buttonIcon__contact']}
            onClick={handleProfileClick}
            />    
        </button>
        <button className={buttonCss['lip-buttonIcon__button']}>
            <img src={Images?.chatbot} className={buttonCss['lip-buttonIcon__chatbot']}/>
        </button>
    </div>
  )
}

export default ButtonIcon