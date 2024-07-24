import styles from "./calendar.module.css";

const Calendar = () => {
  return (
    <>
      <div className={styles.texter}>
        <p className={styles.text}>
          ПОСЕТИТЕ
          <br /> СЕРДЦЕ ПРУССИИ
        </p>
      </div>
      <p className={styles.mark}>
        Каждый вторник, среду и четверг <br />
        12.00 15.00. 19.00
      </p>
    </>
  );
};

export default Calendar;
