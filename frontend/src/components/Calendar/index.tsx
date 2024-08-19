import React, { useState, useContext, useEffect, useRef} from "react";
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
import axios from "axios";

const CalendarComp: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const themeButton = theme === "dark" ? "white" : "mixed";
  const [date, setDate] = useState<Date | null>(null);
  const [persons, setPersons] = useState<number>(1);
  const [time, setTime] = useState<string>("");
  const [selectedButton, setSelectedButton] = useState<string>("");

  const onChange: CalendarProps["onChange"] = (value) => {
    setDate(value as Date);
  };

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const day = date.getDay();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return (day !== 3 && day !== 5 && day !== 6) || date < today;
    }
    return false;
  };

  const handleIncrement = () => {
    setPersons((prev) => Math.min(prev + 1, 15));
  };

  const handleDecrement = () => {
    setPersons((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userName = (event.target as HTMLFormElement).userName.value;
    const phoneNumber = (event.target as HTMLFormElement).phoneNumber.value;

    if (!userName || !phoneNumber || !date || !time) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    try {
      const response = await axios.get(
        "https://backend.ponarth.com/api/site/users/excursions"
      );
      const validUserIds = response.data;

      const text = `${userName} оставил/оставила заявку на бронь экскурсии\nКонтактный номер: ${phoneNumber}\nДата: ${date?.toLocaleDateString()}\nВремя: ${time}\nКоличество персон: ${persons}`;

      await Promise.all(
        validUserIds.map(async (userId: number) => {
          await axios.get(
            `https://api.telegram.org/bot7325305177:AAEPXOEoUqU8w_slY6osObJwbNfdWQ0sjus/sendMessage`,
            {
              params: {
                text: text,
                chat_id: userId,
              },
            }
          );
        })
      );

      alert("Спасибо за отклик! Наша команда свяжется с Вами в ближайшее время.");
      setDate(null);
      setPersons(1);
      setTime("");
      setSelectedButton("");
      (event.target as HTMLFormElement).reset();
      console.log("Success: Messages sent to all valid user IDs");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [isDragging, setIsDragging] = useState(false);
  const [scrollStart, setScrollStart] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveHandler = (event: MouseEvent) => handleMouseMove(event);
    const upOrLeaveHandler = () => handleMouseUpOrLeave();

    if (isDragging) {
      window.addEventListener('mousemove', moveHandler);
      window.addEventListener('mouseup', upOrLeaveHandler);
      window.addEventListener('mouseleave', upOrLeaveHandler); // Обрабатываем случай, когда мышь покидает окно

      return () => {
        window.removeEventListener('mousemove', moveHandler);
        window.removeEventListener('mouseup', upOrLeaveHandler);
        window.removeEventListener('mouseleave', upOrLeaveHandler);
      };
    }
  }, [isDragging]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setScrollStart(event.clientX);
    event.preventDefault();
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const scrollAmount = scrollStart - event.clientX;
    sliderRef.current.scrollLeft += scrollAmount;
    setScrollStart(event.clientX);
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <>
      <div className={styles.texter} id="excursion">
        <p className={styles.text}>
          ПОСЕТИТЕ
          <br /> СЕРДЦЕ ПРУССИИ
        </p>
      </div>
      <p className={styles.mark}>
        Каждую среду, пятницу и субботу <br />
        12.00 15.00. 19.00
      </p>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
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
            <div className={styles.button_group}>
              <button
                type="button"
                className={`${styles.time_button} ${
                  selectedButton === "12:00" ? styles.selected : ""
                }`}
                onClick={() => {
                  setTime("12:00");
                  setSelectedButton("12:00");
                }}
              >
                12:00
              </button>
              <button
                type="button"
                className={`${styles.time_button} ${
                  selectedButton === "15:00" ? styles.selected : ""
                }`}
                onClick={() => {
                  setTime("15:00");
                  setSelectedButton("15:00");
                }}
              >
                15:00
              </button>
              <button
                type="button"
                className={`${styles.time_button} ${
                  selectedButton === "19:00" ? styles.selected : ""
                }`}
                onClick={() => {
                  setTime("19:00");
                  setSelectedButton("19:00");
                }}
              >
                19:00
              </button>
            </div>
            <div className={`${styles.form_group} ${
                theme === "dark" ? styles.dark : ""
              }`}>
            <input
              className={`${styles.input_calendar} ${
                theme === "dark" ? styles.dark : ""
              }`}
              type="text"
              name="userName"
              placeholder=""
            /><label htmlFor="userName">Ваше имя</label>
            </div>
            <div className={`${styles.form_group} ${
                theme === "dark" ? styles.dark : ""
              }`}>
            <InputMask
              className={`${styles.input_calendar} ${
                theme === "dark" ? styles.dark : ""
              }`}
              mask="+7 (999) 999-99-99"
              name="phoneNumber"
              placeholder=""
            />
            <label htmlFor="phoneNumber">Ваш номер телефона</label>
            </div>
            <div
              className={`${styles.input_calendar} ${
                theme === "dark" ? styles.dark : ""
              }`}
            >
              <label>Количество персон</label>
              <div className={styles.persons_input}>
                <button type="button" onClick={handleDecrement}>
                  —
                </button>
                <input
                  type="text"
                  value={persons}
                  readOnly
                  className={theme === "dark" ? styles.dark : ""}
                />
                <button type="button" onClick={handleIncrement}>
                  +
                </button>
              </div>
            </div>

            <DelayedButton
              to=""
              delay={1}
              className={styles.reserve_btn}
              style={themeButton}
            >
              Забронировать
            </DelayedButton>
          </div>
        </form>

        <div className={styles.photos_block}>
          <div className={styles.slides}
                         onMouseDown={handleMouseDown}
                         onMouseLeave={handleMouseUpOrLeave}
                         ref={sliderRef}
                         style={{ cursor: isDragging ? 'grabbing' : 'grab'}} 
                         >
            <div className={styles.slide}>
              <img src={image1} alt="" />
              <p className={styles.slide_p}>
                #Знакомство с культурным наследием
              </p>
            </div>
            <div className={styles.slide}>
              <img src={image2} alt="" />
              <p className={styles.slide_p}>
                #Рецептуры довоенной восточной Пруссии
              </p>
            </div>
            <div className={styles.slide}>
              <img src={image3} alt="" />
              <p className={styles.slide_p}>#8 дегустационных сортов пива</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarComp;
