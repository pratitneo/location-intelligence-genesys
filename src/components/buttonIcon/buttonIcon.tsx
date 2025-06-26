import styles from './buttonIcon.module.scss'

const ButtonIcon = () => {
  return (
    <div className={styles['button-icon__wrap']}>
        <button className={styles['button-icon__button']}>
            <span className={styles['button-icon__dot']} />
            <img src="/assets/Contact.svg" alt="Contact" className={styles['button-icon__contact']}/>    
        </button>
        <button className={styles['button-icon__button']}>
            <img src="/assets/Chatbot.svg" alt="Chatbot" className={styles['button-icon__chatbot']}/>
        </button>
    </div>
  )
}

export default ButtonIcon