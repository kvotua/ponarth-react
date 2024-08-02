import styles from './styles/notificationpage.module.scss'
import settings from '../assets/settings.svg'
import delete_btn from '../assets/delete.svg'
import add_btn from '../assets/Pluse.svg'
import { Link } from 'react-router-dom'

const NotificationPage = () => {
  return (
    <>
      <section className={styles.notification_main}>
        <h1>Управление уведомлениями</h1>
        <div className={styles.notification_filter}>
          <input type="text" placeholder="Фильтр" />
        </div>

        <section className={styles.notification_block}>
          <section className={styles.notification_element}>
            <div className={styles.notification_telegram_user_block}></div>
            <div className={styles.notification_buttons}>
              <button className={styles.settings_btn}>
                <img src={settings} alt="" />
              </button>

              <button className={styles.delete_btn}>
                <img src={delete_btn} alt="" />
              </button>
            </div>
          </section>
        </section>
      </section>
      <Link to="/notifications/add">
        <button className={styles.add_btn}>
          <img src={add_btn} alt="Add" />
        </button>
      </Link>
    </>
  )
}

export default NotificationPage
