
import { Link } from 'react-router-dom';
import styles from './history.module.css';

function History() {
  const text = 'Крупнейшей пивоваренной компанией в довоенной Восточной Пруссии был Кенигсбергский завод "Понарт", основанный Иоганном Филиппом Шиффердеккером 15 ноября 1839 года. Сейчас "Понарт" - это локальное акционерное общество по производству пива, в развитии которого может участвовать каждый желающий';

  const words = text.split(' ');
  const spannedText = words.map((word, index) => (
    <span key={index} className={styles.hoverable}>
      {word}{' '}
    </span>
  ));

  return (
    <div className={styles.container_two_page}>
      <div className={styles.two_page} id="history">
        <div className={styles.block_image}>
          <h1 className={styles.text_two_page}>
            УЗНАЙТЕ МНОГОВЕКОВУЮ ИСТОРИЮ ПИВОВАРНИЯ С 1839 ГОДА
          </h1>
          <h2 className={styles.litle_text_two} id="litle_text_two">
            {spannedText}
          </h2>
          <Link to="/history" className={styles.history_a}>
            <button className={styles.learn_more}>
              <span className={styles.circle} aria-hidden="true">
                <span className={`${styles.icon} ${styles.arrow}`}></span>
              </span>
              <span className={styles.button_text_two}>УЗНАТЬ БОЛЬШЕ</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default History;
