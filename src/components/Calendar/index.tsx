import React, { useState } from "react";
import styles from "./calendar.module.css";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./customCalendar.css";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const CalendarComp: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  const onChange: CalendarProps["onChange"] = (value) => {
    setDate(value as Date);
  };

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const day = date.getDay();
      return day !== 2 && day !== 3 && day !== 4; // 2 - вторник, 3 - среда, 4 - четверг
    }
    return false;
  };

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
        formatMonthYear={(locale, date) =>
          format(date, "LLLL yyyy", { locale: ru })
        }
        tileDisabled={tileDisabled}
      />
    </>
  );
};

export default CalendarComp;
