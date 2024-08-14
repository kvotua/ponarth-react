import styles from "./history.module.css";
import DelayenButton from "../Buttons/DelayedButton";
function History() {
  const text =
    'Крупнейшей пивоваренной компанией в довоенной Восточной Пруссии был Кенигсбергский завод "Понарт", основанный Иоганном Филиппом Шиффердеккером 15 ноября 1839 года. Сейчас "Понарт" - это локальное акционерное общество по производству пива, в развитии которого может участвовать каждый желающий';
  const words = text.split(" ");
  const spannedText = words.map((word, index) => (
    <span key={index} className={styles.hoverable}>
      {word}{" "}
    </span>
  ));

  const updateHeight = () => {
    const doubleScreenHeight = window.innerHeight * 2;
    document.documentElement.style.setProperty(
      "--double-screen-height",
      `${doubleScreenHeight}px`
    );
  };
  updateHeight();

  return (
    <div className={styles.container_two_page}>
      <div className={styles.two_page} id="history">
        <div className={styles.block_image}>
          <h1 className={styles.text_two_page}>
            УЗНАЙТЕ <br /> МНОГОВЕКОВУЮ <br /> ИСТОРИЮ <br /> ПИВОВАРЕНИЯ
          </h1>
          <div className={styles.secondBlock}>
            <h2 className={styles.litle_text_two} id="litle_text_two">
              {spannedText}
            </h2>
            <div className={styles.history_a}>
              <DelayenButton
                to="/history"
                className={styles.history_a}
                delay={450}
                dopstyle={{ marginTop: "28px" }}
              >
                УЗНАТЬ БОЛЬШЕ
              </DelayenButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
