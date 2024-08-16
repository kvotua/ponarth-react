import styles from "./styles/SharePage.module.css";
import DelayedButton from "../components/Buttons/DelayedButton";
import InputMask from "react-input-mask";
import { Link } from "react-router-dom";
import Ponarth_Logo from "../assets/logo.svg";
import { useState , useEffect} from "react";
import classNames from 'classnames';
import axios from "axios";

const SharePage = () => {
  useEffect(() => {
    const htmlElement = document.documentElement;
    const originalScrollBehavior = htmlElement.style.scrollBehavior;
    htmlElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    htmlElement.style.scrollBehavior = originalScrollBehavior;
  }, []);

  const localTheme = window.localStorage.getItem("theme");
  const [theme] = useState(localTheme ? localTheme : "light");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userName = (event.target as HTMLFormElement).userName.value;
    const phoneNumber = (event.target as HTMLFormElement).phoneNumber.value;

    try {
      const response = await axios.get(
        "https://backend.ponarth.com/api/site/users/shareholder"
      );
      const validUserIds = response.data;

      const text = `${userName} оставил/оставила заявку на покупку акций\nКонтактный номер: ${phoneNumber}`;

      await Promise.all(
        validUserIds.map(async (userId: number) => {
          await axios.get(
            `https://api.telegram.org/bot7325305177:AAEPXOEoUqU8w_slY6osObJwbNfdWQ0sjus/sendMessage`,
            {
              params: {
                text: text,
                chat_id: userId,
              },
            }
          );
        })
      );

      alert("Спасибо за отправку формы!");
      (event.target as HTMLFormElement).reset();
      console.log("Success: Messages sent to all valid user IDs");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
    document.body.style.backgroundColor = theme === "dark" ? "#000" : "#fff";
  }, [theme]);

  // const toggleTheme = () => {
  //   setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  // };
  const curTheme = theme === "dark" ? styles.dark : "";
  const classes = classNames(styles.margin_container,  curTheme);
  const classes2 = classNames(styles.logo,  curTheme);

  return (
   <>
   <div className={classes}>
    <div className={styles.outmask_content}>
  <div className={styles.button_container}>
  <Link to='/home' className={styles.button_back_link}>
  <button className={styles.button_back}></button>
  </Link>
        </div>
        <div className={`${styles.share_logo}`}>
        <img
          className={classes2}
          src={Ponarth_Logo}
          alt="Логотип"
        />
</div>
<div className={styles.share_title}>
<h1>
СТАНЬТЕ АКЦИОНЕРОМ 
<br />
НОВОЙ ИСТОРИИ ПОНАРТ
</h1>
</div>
    </div>
   <div className={styles.masked_background}>
      <div className={styles.grid_container}>
      
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
                  onSubmit={handleSubmit}
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
                    dopstyle={{ marginTop: "20px", width: "100%" }}
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
