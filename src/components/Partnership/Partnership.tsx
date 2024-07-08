import styles from "./partnership.module.css";
const Partnership = () => {
  return (
    <div className={styles.grid_container}>
      <div className={styles.grid_item}>
        <div className={styles.txt_four_page}>
          <h1 className={styles.big_text_four_page}>01</h1>
          <p>
            Только натуральное сырье и<br />
            качественный продукт
          </p>
        </div>
      </div>
      <div className={styles.grid_item}>
        <div className={styles.kartinka1}>
          <img
            className={styles.img_four_end}
            src="./src\assets\Image.png"
            alt=""
          />
        </div>
      </div>
      <div className={styles.grid_item}>
        <div className={styles.kartinka1}>
          <img
            className={styles.img_four_end}
            src="./src\assets\Pivo2.png"
            alt=""
          />
        </div>
      </div>

      <div className={styles.grid_item}>
        <div className={styles.txt_four}>
          <h1 className={styles.big_text_four_right}>02</h1>
          <p className={styles.text_four_right}>
            Всесторонняя поддержка <br />
            партнеров
          </p>
        </div>
      </div>

      <div className={styles.grid_item}>
        <div className={styles.txt_four_page}>
          <h1 className={styles.big_text_four_page2}>03</h1>
          <p>
            14 лет варим вкусное пиво по <br />
            технологиям 19го века
          </p>
        </div>
      </div>

      <div className={styles.grid_item}>
        <div className={styles.kartinka1}>
          <img
            className={styles.img_four_end}
            src="./src\assets\Pivo3.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Partnership;
