import styles from './NewHistory.module.scss';
import DelayedButton from '../Buttons/DelayedButton'
function NewHistory() {
    return (
        <div className={styles.setDirection}>
            <div className={styles.texter}>
                <h2 className={styles.text}>
                    СТАНЬ ЧАСТЬЮ <br />НОВОЙ ИСТОРИИ
                </h2>
            </div>
                    
            <div className={styles.mark}>
                <div className={styles.buy_action}>
                    <DelayedButton to='' delay={750} className={styles.history_a}>КУПИТЬ АКЦИЮ</DelayedButton>
                   
                </div>
            </div>
          
        </div>
    )
}

export default NewHistory