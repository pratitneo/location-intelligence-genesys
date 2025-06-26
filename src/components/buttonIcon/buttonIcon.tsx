import styles from './buttonIcon.module.scss'
import { Images } from "../../assets/assets"

const ButtonIcon = () => {
  return (
    <div className={styles['button-icon__wrap']}>
        <button className={styles['button-icon__button']}>
            <span className={styles['button-icon__dot']} />
            <img src={Images?.contact} alt="Contact" className={styles['button-icon__contact']}/>    
        </button>
        <button className={styles['button-icon__button']}>
            <img src={Images?.chatbot} className={styles['button-icon__chatbot']}/>
        </button>
    </div>
  )
}

export default ButtonIcon