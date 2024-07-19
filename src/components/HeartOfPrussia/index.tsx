import styles from "./HearOfPrussia.module.scss";

function HeartOfPrussia() {

  return (
    <div className={styles.content_tree_page} id="excursion">
      <div className={styles.only_text_tree_page}>
        <h2 className={styles.line_text}>
          ПОСЕТИТИЕ <br />
          СЕРДЦЕ ПРУССИИ
        </h2>
        <p className={styles.pSchedule}>
          Каждый вторник, среду и четверг <br />
          12.00 15.00. 19.00
        </p>
      </div>
      <div className={styles.karusel}>
        <div className={styles.calendar_card}>
          <div className={styles.label}>
            <form id="zabron">
              <div id="calendar"></div>

              <div className={styles.form_group}>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder=" "
                  required
                />
                <label>Введите имя</label>
              </div>

              <div className={styles.form_group}>
                <input
                  type="tel"
                  id="phoneNumber"
                  // maxlength="11"
                  name="phoneNumber"
                  placeholder=" "
                  required
                />
                <label>Контактный номер телефона</label>
              </div>

              <div className={styles.form_group}>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value="1"
                  min="1"
                  max="10"
                  placeholder=" "
                  required
                />
                <label>Количество персон (макс 10)</label>
              </div>

              <button
                className={styles.learn_more}
                type="submit"
                id="submitButton"
                disabled
              >
                <span className={styles.circle} aria-hidden="true">
                  <span className={`${styles.icon} ${styles.arrow}`}></span>
                </span>
                <span className={styles.button_text}>Забронировать</span>
              </button>
            </form>
          </div>
        </div>

        <div id="modal" className={styles.modal}>
          <div className={styles.modal_content}>
            <img
              src="components/img/PonarthLogoBlack.png"
              alt=""
            />
            <p className={styles.modal_text}>Ваша заявка получена, ожидайте звонка</p>
            <span className={styles.close}>&times;</span>
          </div>
        </div>

        <div className={styles.slider_tree_page}>
          <div className={styles.slides}>
            <div id="slide-1">
              <img
                // style="border-radius: 15px"
                src="components/img/Image (22).png"
                alt=""
              />
              <p className={styles.text_slide_tree_page}>
                #Знакомство с культурным наследием
              </p>
            </div>
            <div id="slide-2">
              <img
                // style="border-radius: 15px"
                src="components/img/Image (21).png"
                alt=""
              />
              <p className={styles.text_slide_tree_page}>
                #Рецептуры довоенной Восточной Пруссии
              </p>
            </div>
            <div id="slide-3">
              <img
                // style="border-radius: 15px"
                src="components/img/Image (22).png"
                alt=""
              />
              <p className={styles.text_slide_tree_page}>
                #8 дегустационных сортов Пива
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeartOfPrussia