import styles from "./header.module.css";
import Ponarth_Logo from "../../assets/Ponarth_firmenny_blok_01.svg";
import { useContext } from "react";
import { ThemeContext } from "../RightBar";

const Header = () => {
  const { theme } = useContext(ThemeContext);
  

  return (
    <header className={theme === "dark" ? styles.dark : ""}>

    
      <div className={styles.all_menu}>
        <img
          className={`${styles.logo} ${theme === "dark" ? styles.dark : ""}`}
          src={Ponarth_Logo}
          alt="Логотип"
        />
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
    </header>
  );
};

export default Header;
