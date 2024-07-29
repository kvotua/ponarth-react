import styles from "./Form.module.css";
import video from "../../assets/final.mp4";
import { useEffect, useState, useRef, FormEvent } from "react";
import DelayedButton from "../Buttons/DelayedButton";
import InputMask from 'react-input-mask';
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFlipped(true);
  };

  return (
    <div className={styles.container2} ref={containerRef}>
      <video autoPlay muted loop id="myVideo">
        <source src={video} type="video/mp4" />
      </video>
<div className={styles.form_grid_container}>
{isVisible && (
        <div id="block" className={`${styles.content1} ${styles.fadeIn}`}>
          <div
            className={`${styles.flipper} ${isFlipped ? styles.flipped : ""}`}
          >
            <div className={styles.front}>
              <h1 className={styles.bochka}>
                Две гостевые бочки пива <br />
                каждому новому партнеру <br />
               <div style={{fontSize: '1rem', paddingBottom:'1%'}}> от </div>
               <div style={{fontSize: '3rem', paddingTop:'1%'}}> PONARTH </div>
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
            <div className={styles.back}>
              <p>Спасибо за отправку формы!</p>
            </div>
          </div>
        </div>
      )}
</div>
     
    </div>
  );
};

export default PartnerForm;
