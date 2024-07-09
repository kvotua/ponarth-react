import styles from "./Form.module.css";

const PartnerForm = () => {
  return (
    <div className={styles.container2}>
      <video autoPlay muted loop id="myVideo">
        <source
          src="./src/assets/pexels-cottonbro-5538281final.mp4"
          type="video/mp4"
        />
      </video>
      <div id="block" className={styles.content1}>
        <h1 className={styles.bochka}>
          Две гостевые бочки пива <br />
          каждому новому партнеру от Понарт
        </h1>
        <div className={styles.form_four}>
          <form id="stat_partner">
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
              disabled
              style={{ marginTop: 32 + "px", width: 100 + "%" }}
            >
              <span className={styles.circle} aria-hidden="true">
                <span className={styles.icon_arrow}></span>
              </span>
              <span className={styles.button_text} style={{ color: "white" }}>
                СТАТЬ ПАРТНЕРОМ
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartnerForm;
