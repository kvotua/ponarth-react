
import styles from "./footer.module.css";
import bigPonarthLogo from "../../assets/big_ponarth_logo_black.png"; // Импорт логотипа
import practiceLogo from "../../assets/Practice.png"; // Импорт другого логотипа

const Footer = () => {
  return (
    <footer>
      <div className={styles.all_items_footer}>
        <div>
          <img className={styles.logo_footer} src={bigPonarthLogo} alt="Логотип БРАУРЭРАЙ ПОНАРТ" />
        </div>

        <div className={styles.info_footer}>
          <a className={styles.footerButton} href="">АО "БРАУРЭРАЙ ПОНАРТ"</a>
          <a className={styles.footerButton} href="">Untappd</a>
          <a className={styles.footerButton} href="">ВКонтакте</a>
          <a className={styles.footerButton} href="">Telegram</a>
        </div>
        <div className={styles.info_footer}>
          <a className={styles.footerButton} href="#history">История</a>
          <a className={styles.footerButton} href="#sorta">Продукт</a>
          <a className={styles.footerButton} href="#maps">На картах</a>
          <a className={styles.footerButton} href="#news">Новости</a>
        </div>
        <div className={styles.info_footer}>
          <a className={styles.footerButton} href="#partner">Партнерам</a>
          <a className={styles.footerButton} href="">Хочу в команду</a>
          <a className={styles.footerButton} href="#excursion">Экскурсии</a>
          <a className={styles.footerButton} href="">СДЕЛАНО КОМАНДОЙ "PRACTICE"</a> 
        </div>
        <div>
          <img className={styles.practice} src={practiceLogo} alt="Логотип PRACTICE" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
