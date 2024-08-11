import { useNavigate } from 'react-router-dom'
import icon from '../assets/Icon.svg'
import styles from './styles/addnotificationpage.module.scss'

const AddTelegramNotificationPage = () => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate('/notifications')
  }

  return (
    <>
      <button className={styles.back_btn} onClick={handleBackClick}>
        <img src={icon} alt="" />
      </button>
      <section className={styles.add_notification_block}>
        <section>
          <h2 className={styles.title}>Заполните данные пользователя</h2>
          <div className={styles.add_notification_input}>
            <input type="text" placeholder="Имя пользователя" />
            <input type="text" placeholder="Фамилия пользователя" />
            <input type="text" placeholder="Телеграм ID" />
          </div>

          <div className={styles.add_notification_check}>
            <h2>
              Выберите обращения с сайта, которые может видеть пользователь
            </h2>
            <section className={styles.check_section}>
              <div className={styles.add_notification_checkblock}>
                <p>Форма экскурсии</p>
                <div>
                  <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={styles.slider}></span>
                  </label>
                  <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={styles.slider_round}></span>
                  </label>
                </div>
              </div>
              <div className={styles.add_notification_checkblock}>
                <p>Форма вакансий</p>
                <div>
                  <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={styles.slider}></span>
                  </label>
                  <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={styles.slider_round}></span>
                  </label>
                </div>
              </div>
              <div className={styles.add_notification_checkblock}>
                <p>Форма партнеры</p>
                <div>
                  <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={styles.slider}></span>
                  </label>
                  <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={styles.slider_round}></span>
                  </label>
                </div>
              </div>
            </section>
          </div>
        </section>
        <button className={styles.save_btn}>Сохранить</button>
      </section>
    </>
  )
}
export default AddTelegramNotificationPage
