import styles from "./Form.module.css";
import { useEffect, useState, useRef, FormEvent } from "react";
import axios from "axios";
import DelayedButton from "../Buttons/DelayedButton";
import Lottie from 'react-lottie-player';
import InputMask from "react-input-mask";
import animationData from "../../assets/final5.json"

const PartnerForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 0.3 * 1000);
        return () => clearTimeout(timer);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const [isFlipped, setIsFlipped] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFlipped(true);

    const userName = (event.target as HTMLFormElement).userName.value;
    const phoneNumber = (event.target as HTMLFormElement).phoneNumber.value;

    try {
      const response = await axios.get(
        "https://backend.ponarth.com/api/site/users/partner"
      );
      const validUserIds = response.data;
      console.log(validUserIds);

      const text = `${userName} оставил/оставила заявку для партнеров.\nКонтактный номер: ${phoneNumber.replace(/\s+/g, '')}`;

      await Promise.all(
        validUserIds.map(async (userId: number) => {
          await axios.get(
            `https://api.telegram.org/bot8110753865:AAE5wI51onb539rxjZcOAttMTWiEw4_2rls/sendMessage`,
            {
              params: {
                text: text,
                chat_id: userId,
              },
            }
          );
        })
      );
      console.log("Success: Messages sent to all valid user IDs");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container_form}>
      
      <div className={styles.container2} ref={containerRef}>
      <Lottie
          loop
          animationData={animationData}
          play
          className={styles.lottie}
        />
        {/* <video autoPlay muted loop id="myVideo">
          <source src={video} type="video/mp4" />
        </video> */}
        <div className={styles.form_grid_container}>
          {isVisible && (
            <div id="block" className={`${styles.content1}`}>
              <div
                className={`${styles.flipper} ${
                  isFlipped ? styles.flipped : ""
                }`}
              >
                <div className={`${styles.front} ${styles.fadeIn}`}>
                  <h1 className={styles.bochka}>
                    ДВЕ ГОСТЕВЫЕ <br />
                    БОЧКИ ПИВА <br />
                    НОВЫM ПАРТНЕРАМ <br />
                  </h1>

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
                          type="tel"
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
                <div className={styles.back}>
                  <p>Спасибо за отклик!<br/>Наша команда свяжется с Вами в ближайшее время.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerForm;
