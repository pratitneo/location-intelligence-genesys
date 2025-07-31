import profBtnCss from './profileBtns.module.scss'
import { Images } from "../../assets/assets"
import { useNavigate } from 'react-router-dom';
import type { ProfileBtnsType } from '../../types/types';



const ProfileBtns = ({ isPanelOpen = false }: ProfileBtnsType) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  }


  const handleChatClick = () => {


  }
  return (
    <div className={`${profBtnCss['lip-profBtn__wrap']} ${isPanelOpen ? profBtnCss['lip-profBtn__wrap--panel-open'] : ''}`}>
      {/* profile */}
      <button id='profile' className={profBtnCss['lip-profBtn__button']}>
        <span className={profBtnCss['lip-profBtn__dot']} />
        <img src={Images?.contact} alt="Contact" className={profBtnCss['lip-profBtn__contact']} onClick={handleProfileClick} />
      </button>
      {/* ai chat */}
      <button id='ai-chat' className={profBtnCss['lip-profBtn__button']} onClick={handleChatClick}>
        <img src={Images?.chatbot} className={profBtnCss['lip-profBtn__chatbot']} />
      </button>
    </div>
  )
}

export default ProfileBtns