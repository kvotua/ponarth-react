import styles from "./footer.module.css";
const Footer = () =>{
    return(
        <footer>
            <div className={styles.all_items_footer}>
      <div className={styles.logo_footer}></div>

      <div className={styles.info_footer}>
        <a className={styles.footerButton} href="">АО "БРАУРЭРАЙ ПОНАРТ"</a>
        <a className={styles.footerButton} href="">Untpappd</a>
        <a className={styles.footerButton} href="">ВKонтакте</a>
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
      <div className="practice"></div>

    </div>
        </footer>
    );
};
export default Footer; 