import styles from './styles/SharePage.module.css';
import DelayedButton from "../components/Buttons/DelayedButton";
import InputMask from 'react-input-mask';
const SharePage = () => {
  return (
   <>
   <div className={styles.margin_container}>
   <div className={styles.masked_background}>
      <div className={styles.grid_container}>
        {/* <div className={styles.button_container}>
<button className={styles.button_back}></button>
        </div> */}
        <div className={styles.right_container}>
        <p className={styles.right_container_text}>
        Мы создали акционерное общество и открыли
        <br />
         первый инвестиционный раунд.
          </p>
          <p className={styles.right_container_text}>
Для того, чтобы узнать подробности
<br />
 необходимо оставить заявку
</p>
    </div>
    <div className={styles.social}>
          <a
            href="https://untappd.com/b/brauerei-ponarth-pivovarnya-ponart-pshenichnoe/2206518"
            target="_blank"
          >
            <div className={`${styles.social_circle1}`}></div>
          </a>
          <a href="https://vk.com/ponarth" target="_blank">
            <div className={`${styles.social_circle2}`}></div>
          </a>
          <a href="https://t.me/ponarth_1849" target="_blank">
            <div className={`${styles.social_circle3}`}></div>
          </a>
        </div>
        <div className={styles.form_container}>
        <div className={styles.form_four}>
                <form
                  id="stat_partner"
                  className={styles.stat_partner}
                  // onSubmit={handleSubmit}
                >
                  <div className={styles.form_group}>
                    <input
                      className={styles.input}
                      type="text"
                      id="userName"
                      name="userName"
                      placeholder=" "
                      required
                      autoComplete="off"
                    />
                    <label htmlFor="userName">Ваше имя</label>
                  </div>

                  <div className={styles.form_group}>
                  <InputMask
                    className={styles.input}
                     name="phoneNumber"
                    mask="+7 ( 999 ) 999 - 9999"
                      id="phoneNumber"
                      placeholder=" "
                      required
                      autoComplete="off"
                      ></InputMask>
                    <label htmlFor="phoneNumber">Ваш номер телефона</label>
                  </div>

                  <DelayedButton
                    type="submit"
                    to=""
                    className={styles.learn_more}
                    style="white"
                    delay={450}
                    dopstyle={{ marginTop: "32px", width: "100%" }}
                  >
                    СТАТЬ ПАРТНЕРОМ
                  </DelayedButton>
                </form>
              </div>
        </div>
      </div>
    
    
    </div>
   </div>
  
   </>
  );
};

export default SharePage;