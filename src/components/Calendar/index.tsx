import React, { useState, useEffect } from "react";
import styles from "./calendar.module.css";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const CalendarComp: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  const onChange: CalendarProps["onChange"] = (value) => {
    setDate(value as Date);
  };

  useEffect(() => {
    const yearButtons = document.querySelectorAll(
      '.react-calendar__navigation button[aria-label*="year"]'
    );
    yearButtons.forEach((button) => {
      button.style.display = "none";
    });
  }, []);

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
      <Calendar
        onChange={onChange}
        value={date}
        locale="ru-RU"
        showNavigation={true}
        formatMonthYear={(locale, date) =>
          format(date, "LLLL yyyy", { locale: ru })
        }
      />
      <p>
        Выбранная дата:{" "}
        {date ? format(date, "PPPP", { locale: ru }) : "Не выбрана"}
      </p>
    </>
  );
};

export default CalendarComp;
