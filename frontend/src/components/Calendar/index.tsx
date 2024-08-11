import React, { useState, useContext } from "react";
import styles from "./calendar.module.css";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./customCalendar.css";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import InputMask from "react-input-mask";
import image1 from "../../assets/calendar1.jpg";
import image2 from "../../assets/calendar2.jpg";
import image3 from "../../assets/calendar3.jpg";
import { ThemeContext } from "../RightBar";
import DelayedButton from "../Buttons/DelayedButton";
const CalendarComp: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const themeButton = theme === "dark" ? "white" : "mixed";
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
      <p className={styles.mark}>
        Каждый вторник, среду и четверг <br />
        12.00 15.00. 19.00
      </p>
      <div className={styles.content}>
        <div className={styles.calendar_block}>
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
            className={`${styles.input_calendar} ${
              theme === "dark" ? styles.dark : ""
            }`}
            type="text"
            placeholder="Ваше имя"
          />
          <InputMask
            className={`${styles.input_calendar} ${
              theme === "dark" ? styles.dark : ""
            }`}
            mask="+7 (999) 999-99-99"
            placeholder="Контактный номер телефона"
          />
          <div
            className={`${styles.input_calendar} ${
              theme === "dark" ? styles.dark : ""
            }`}
          >
            <label>Количество персон</label>
            <div className={styles.persons_input}>
              <button onClick={handleDecrement}>—</button>
              <input
                type="text"
                value={persons}
                readOnly
                className={theme === "dark" ? styles.dark : ""}
              />
              <button onClick={handleIncrement}>+</button>
            </div>
          </div>

          {/* <button
            className={`${styles.reserve_btn} ${
              theme === "dark" ? styles.dark : ""
            }`}
          >
            Забронировать
          </button> */}
           
            <DelayedButton to="" delay={1} className={styles.reserve_btn} style={themeButton}>
            Забронировать
            </DelayedButton>
        </div>

        <div className={styles.photos_block}>
          <div className={styles.slides}>
            <div className={styles.slide}>
              <img src={image1} alt="" />
              <p className={styles.slide_p}>
                #Знакомство с культурным наследием
              </p>
            </div>
            <div className={styles.slide}>
              <img src={image2} alt="" />
              <p className={styles.slide_p}>
                #Знакомство с культурным наследием
              </p>
            </div>
            <div className={styles.slide}>
              <img src={image3} alt="" />
              <p className={styles.slide_p}>
                #Знакомство с культурным наследием
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarComp;
