import buttonCss from './buttonIcon.module.scss'
import { Images } from "../../assets/assets"
import { useNavigate } from 'react-router-dom';
import type { ButtonIconInterface } from '../../types/types';



const ButtonIcon = ({ isPanelOpen = false }: ButtonIconInterface) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  }

  const handleChatClick = () => {

  }
  return (
    <div className={`${buttonCss['lip-buttonIcon__wrap']} ${isPanelOpen ? buttonCss['lip-buttonIcon__wrap--panel-open'] : ''}`}>
      {/* profile */}
      <button id='profile' className={buttonCss['lip-buttonIcon__button']}>
        <span className={buttonCss['lip-buttonIcon__dot']} />
        <img src={Images?.contact} alt="Contact" className={buttonCss['lip-buttonIcon__contact']} onClick={handleProfileClick} />
      </button>
      {/* ai chat */}
      <button id='ai-chat' className={buttonCss['lip-buttonIcon__button']} onClick={handleChatClick}>
        <img src={Images?.chatbot} className={buttonCss['lip-buttonIcon__chatbot']} />
      </button>
    </div>
  )
}

export default ButtonIcon