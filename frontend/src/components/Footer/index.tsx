import { FC, useContext, useEffect, useState } from "react";
import styles from "./footer.module.css";
import { ThemeContext } from "../RightBar";
import Ponarth_firmenny_blok_01 from "../../assets/logo.svg";
import Practice_logo from "../../assets/Practice_logo.svg";
import classNames from "classnames";
import { useVacancies } from "../LookingPage/VacanciesContext";
interface FooterProps{
  onClick?: () => void;
}
const Footer: FC<FooterProps> = ({onClick}) => {
  const { theme } = useContext(ThemeContext);
  const [isSafari, setIsSafari] = useState(false);
  const { vacancies } = useVacancies();

  const updateHeight = () => {
    const ScreenHeight = window.outerHeight;
    document.documentElement.style.setProperty(
      "--screen-height",
      `${ScreenHeight}px`
    );
  };

  updateHeight();
  useEffect(() => {
    if (
      navigator.userAgent.indexOf("Safari") != -1 &&
      navigator.userAgent.indexOf("Chrome") == -1
    ) {
   
      setIsSafari(true);
    }
  }, []);

  const classList = classNames( {
    [styles.safari_test]: isSafari,
    [styles.practice]: true, // Этот класс всегда будет добавлен
  });

  const classList2 = classNames( {
    [styles.safari_footer_2]: isSafari,
    [styles.logo_footer]: true, // Этот класс всегда будет добавлен
  });
  const classList3 = classNames( {
    [styles.safari_footer_info]: isSafari,
    [styles.info_footer]: true, // Этот класс всегда будет добавлен
  });

  return (
    <footer className={theme === "dark" ? styles.dark : ""} onClick={onClick}>
      <div
        className={`${styles.all_items_footer} ${
          theme === "dark" ? styles.dark : ""
        }`}
        // className={classList}
      >

        <div className={classList2}>
          <img
            className={styles.logo_footer_img}
            src={Ponarth_firmenny_blok_01}
            alt="logo_footer"
          />
        </div>

        <div className={classList3}>
          <a className={styles.footerButton} href="">
            АО "БРАУРЭРАЙ ПОНАРТ"
          </a>
          <a className={styles.footerButton} href="">
            Untpappd
          </a>
          <a className={styles.footerButton} href="">
            ВKонтакте
          </a>
          <a className={styles.footerButton} href="">
            Telegram
          </a>
        </div>

        <div className={classList3}>
          <a className={styles.footerButton} href="#history">
            История
          </a>
          <a className={styles.footerButton} href="#sorta">
            Продукт
          </a>
          <a className={styles.footerButton} href="#share">
            Акции
          </a>
          <a className={styles.footerButton} href="#maps">
            На картах
          </a>
        </div>
        <div className={classList3}>
          <a className={styles.footerButton} href="#news">
            Новости
          </a>
          <a className={styles.footerButton} href="#partner">
            Партнерам
          </a>
          {vacancies.length > 0 && (
            <a className={styles.footerButton} href="#vacancy">
              Вакансии
            </a>
          )}
          <a className={styles.footerButton} href="#excursion">
            Экскурсии
          </a>
        </div>
        <div className={styles.practice_logo}>
          <a href="https://t.me/worldofpractice" target="_blank">
            <img
              className={classList}
              src={Practice_logo}
              alt="logo_Practice"
            />
          </a>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
