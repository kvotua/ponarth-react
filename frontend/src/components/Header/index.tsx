import React, { useContext } from "react";
import styles from "./header.module.css";
import Ponarth_Logo from "../../assets/logo.svg";
import { ThemeContext } from "../RightBar";
import { useVacancies } from "../LookingPage/VacanciesContext";

interface HeaderProps {
  isBurgerOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ isBurgerOpen }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { vacancies } = useVacancies();

  return (
    <header
      className={`${styles.header} ${theme === "dark" ? styles.dark : ""} ${
        isBurgerOpen ? styles.headerOpen : styles.headerClosed
      }`}
    >
       <div className={styles.social}>
            <a
              href="https://untappd.com/b/brauerei-ponarth-pivovarnya-ponart-pshenichnoe/2206518"
              target="_blank"
            >
              <div
                className={`${styles.social_circle1} ${
                  theme === "dark" ? styles.dark : ""
                }`}
              ></div>
            </a>
            <a href="https://vk.com/ponarth" target="_blank">
              <div
                className={`${styles.social_circle2} ${
                  theme === "dark" ? styles.dark : ""
                }`}
              ></div>
            </a>
            <a href="https://t.me/ponarth_1849" target="_blank">
              <div
                className={`${styles.social_circle3} ${
                  theme === "dark" ? styles.dark : ""
                }`}
              ></div>
            </a>
          </div>
      <input
        id="themeToggle"
        type="checkbox"
        role="switch"
        className={styles.toggle}
        checked={theme === "dark" ? true : false}
        onClick={toggleTheme}
      />
      <div className={styles.header_all_menu}>
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
            {vacancies.length > 0 && (
              <a className={styles.headerButton} href="#vacancy">
                Вакансии
              </a>
            )}
            <a className={styles.headerButton} href="#share">
              Акции
            </a>
            <a className={styles.headerButton} href="#news">
              Новости
            </a>
            <a className={styles.headerButton} href="#maps">
              На картах
            </a>
          </div>
         
        </div>
      </div>
    </header>
  );
};

export default Header;
