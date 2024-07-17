import styles from './NewHistory.module.scss';

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
                    <button className={styles.learn_more} type="submit" disabled>
                        <span className={styles.circle} aria-hidden="true">
                            <span className={`${styles.icon} ${styles.arrow}`}></span>
                        </span>
                        <span className={styles.button_text}>КУПИТЬ АКЦИЮ</span>
                    </button>
                </div>
            </div>
          
        </div>
    )
}

export default NewHistory