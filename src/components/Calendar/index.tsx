import React, { useState } from "react";
import styles from "./calendar.module.css";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./customCalendar.css";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import InputMask from "react-input-mask";

const CalendarComp: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [persons, setPersons] = useState<number>(1);

  const onChange: CalendarProps["onChange"] = (value) => {
    setDate(value as Date);
  };

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const day = date.getDay();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return (day !== 2 && day !== 3 && day !== 4) || date < today;
    }
    return false;
  };

  const handleIncrement = () => {
    setPersons((prev) => Math.min(prev + 1, 15));
  };

  const handleDecrement = () => {
    setPersons((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <div className={styles.texter}>
        <p className={styles.text}>
          ПОСЕТИТЕ
          <br /> СЕРДЦЕ ПРУССИИ
        </p>
      </div>

      <div className={styles.calendar_block}>
        <p className={styles.mark}>
          Каждый вторник, среду и четверг <br />
          12.00 15.00. 19.00
        </p>
        <Calendar
          onChange={onChange}
          value={date}
          locale="ru-RU"
          formatMonthYear={(_, date) =>
            format(date, "LLLL yyyy", { locale: ru })
          }
          tileDisabled={tileDisabled}
          navigationLabel={({ view, date }) => {
            if (view === "month") {
              return (
                <span className="react-calendar__navigation__label">
                  {format(date, "LLLL yyyy", { locale: ru })}
                </span>
              );
            }
            return null;
          }}
          prev2Label={null} // Убираем стрелку для предыдущего года
          next2Label={null} // Убираем стрелку для следующего года
        />

        <input
          className={styles.input_calendar}
          type="text"
          placeholder="Ваше имя"
        />
        <InputMask
          className={styles.input_calendar}
          mask="+7 (999) 999-99-99"
          placeholder="Контактный номер телефона"
        />
        <div className={styles.input_calendar}>
          <label>Количество персон</label>
          <div className={styles.persons_input}>
            <button onClick={handleDecrement}>—</button>
            <input type="text" value={persons} readOnly />
            <button onClick={handleIncrement}>+</button>
          </div>
        </div>
        <button className={styles.reserve_btn}>Забронировать</button>
      </div>
    </>
  );
};

export default CalendarComp;
