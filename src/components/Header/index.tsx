import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.all_menu}>
      <div className={styles.logo}></div>

      <div className={styles.header_menu}>
        <a className={styles.headerButton} href="#sorta">
          Продукт
        </a>
        <a className={styles.headerButton} href="#history">
          История
        </a>
        <a className={styles.headerButton} href="#excursion">
          Экскурсии
        </a>
        <a className={styles.headerButton} href="#partner">
          Партнерство
        </a>
        <a className={styles.headerButton} href="#news">
          Новости
        </a>
        <a className={styles.headerButton} href="#maps">
          На картах
        </a>
      </div>

      <div className={styles.social}>
        <a
          href="https://untappd.com/b/brauerei-ponarth-pivovarnya-ponart-pshenichnoe/2206518"
          target="_blank"
        >
          <div className={styles.social_circle1}></div>
        </a>
        <a href="https://vk.com/ponarth" target="_blank">
          <div className={styles.social_circle2}></div>
        </a>
        <a href="https://t.me/ponarth_1849" target="_blank">
          <div className={styles.social_circle3}></div>
        </a>
      </div>
    </div>
  );
};

export default Header;
