import styles from "./Form.module.css";
import video from "../../assets/final.mp4";
import { useEffect, useState, useRef ,  FormEvent} from "react";

const PartnerForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1.5 * 1000);
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
    console.log('!!!');
    setIsFlipped(true);

  };

  return (
    <div className={styles.container2} ref={containerRef}>
      <video autoPlay muted loop id="myVideo">
        <source src={video} type="video/mp4" />
      </video>

      {isVisible && (
        <div id="block" className={`${styles.content1} ${styles.fadeIn}`}>
<div className={`${styles.flipper} ${isFlipped ? styles.flipped : ''}`}>
<div className={styles.front}>
          <h1 className={styles.bochka}>
            Две гостевые бочки пива <br />
            каждому новому партнеру от Понарт
          </h1>
          
        <div className={styles.form_four }>
            <form id="stat_partner" className={styles.stat_partner} onSubmit={handleSubmit}>
              <div className={styles.form_group}>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder=" "
                  required
                />
                <label htmlFor="userName">Ваше имя</label>
              </div>

              <div className={styles.form_group}>
                <input
                  type="tel"
                  id="phoneNumber"
                  maxLength={11}
                  name="phoneNumber"
                  placeholder=" "
                  required
                />
                <label htmlFor="phoneNumber">Ваш номер телефона</label>
              </div>

              <button
                className={styles.learn_more}
                type="submit"
                // disabled
                style={{ marginTop: 32 + "px", width: 100 + "%" }}
              >
                <span className={styles.circle} aria-hidden="true">
                  <span className={`${styles.icon} ${styles.arrow}`}></span>
                </span>
                <span className={styles.button_text}>СТАТЬ ПАРТНЕРОМ</span>
              </button>
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
  );
};

export default PartnerForm;
