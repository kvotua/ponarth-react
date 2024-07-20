import React, { useEffect, useRef, useState } from 'react';
import styles from "./HearOfPrussia.module.scss";
import img1 from '../../assets/Image (21).png';
import img2 from '../../assets/Image (22).png';
import VanillaCalendar from "vanilla-calendar-pro";
import { IOptions } from "vanilla-calendar-pro/types";
import axios from 'axios';

function HeartOfPrussia() {
  const calendarRef = useRef(null);
  const [calendar, setCalendar] = useState<VanillaCalendar | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentDay = currentTime.getDate();
    const year = currentTime.getFullYear();

    let month: string = (currentTime.getMonth() + 1).toString();
    month = parseInt(month) < 10 ? '0' + month : month;

    let day: string = currentTime.getDate().toString();
    day = parseInt(day) < 10 ? '0' + day : day;

    const formattedDate = `${year}-${month}-${day}`;

    const options: IOptions = {
      settings: {
        lang: 'ru',
        range: {
          disablePast: true,
          disableWeekday: [0, 1, 5, 6, 7, 8],
        },
        visibility: {
          weekend: false,
          today: false,
        },
        selection: {
          year: false,
          month: "only-arrows",
          time: 24,
        },
        selected: {
          dates: [formattedDate],
        }
      },
      actions: {
        changeTime(event: Event, self: any) {
          console.log(self);
        },
        clickDay(event: Event, self: any) {
          document.querySelectorAll("#calendar-button").forEach((button: Element) => {
            const buttonElement = button as HTMLButtonElement;
            buttonElement.style.background = "";
            buttonElement.style.color = "";
            const currentDate = new Date();
            const currentDay = currentDate.getDate();
            const currentHours = currentDate.getHours();

            const buttonHours = parseInt(buttonElement.value.split(":")[0]);

            if (currentDay < parseInt(self[0].split("-")[2])) {
              buttonElement.disabled = false;
            } else if (buttonHours <= currentHours && currentDay == parseInt(self[0].split("-")[2])) {
              buttonElement.disabled = true;
            } else {
              buttonElement.disabled = false;
            }
          });
        },
      },
      DOMTemplates: {
        default: `
          <div className={styles.vanilla_calendar_header}>
            <div className={styles.vanilla_calendar_header__content}>
              <#Year /> <#Month />
            </div>
          </div>
          <div className={styles.vanilla_calendar_wrapper}>  
            <div className={styles.vanilla_calendar_content}>
              <#ArrowPrev />
              <#ArrowNext />
              <#Week />
              <#Days />
            </div>
          </div>
          <div className={styles.calendar_time}>
            <input id="calendar-button" type="button" value="12:00"/>
            <input id="calendar-button" type="button" value="15:00"/>
            <input active id="calendar-button" type="button" value="19:00"/>
          </div>
        `,
      },
    };

    const calendarInstance = new VanillaCalendar(calendarRef.current!, options);
    calendarInstance.init();
    setCalendar(calendarInstance);

    document.querySelectorAll("#calendar_button").forEach((button: Element) => {
      const buttonElement = button as HTMLButtonElement;
      if (parseInt(buttonElement.value.split(":")[0]) <= currentHours) {
        buttonElement.disabled = true;
      }
      buttonElement.addEventListener("click", (event) => {
        const clickedButton = event.target as HTMLButtonElement;
        const selectedTime = clickedButton.value;

        document.querySelectorAll("#calendar_button").forEach((button: Element) => {
          const buttonElement = button as HTMLButtonElement;
          buttonElement.style.background = "";
          buttonElement.style.color = "";
        });

        clickedButton.style.background = "#000";
        clickedButton.style.color = "#fff";

        setSelectedTime(selectedTime);
      });
    });

    return () => {
      calendarInstance.destroy();
    };
  }, []);

  useEffect(() => {
    checkInputs();
  }, [selectedTime, userName, phoneNumber, quantity]);

  const validatePhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, "");
    const isValidLength = cleaned.length === 11;
    const isValidStart = /^(7|8)/.test(cleaned);
    return isValidLength && isValidStart;
  };

  const checkInputs = () => {
    if (
      selectedTime !== "" &&
      userName.trim() !== "" &&
      validatePhoneNumber(phoneNumber.trim()) &&
      quantity.trim() !== ""
    ) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const TOKEN = "7030782378:AAFV-gcraXeB03Kwx2uo8arxQkFpwZbKTfo";
    const CHAT_ID = "-1001937647175";
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    let message = `<b>Заявка с сайта</b>\n`;
    message += `<b>Дата: </b> ${calendar!.selectedDates[0].split("-").reverse().join(".")}, <b>на Время: </b> ${selectedTime}\n`;
    message += `<b>Имя: </b> ${userName}\n`;
    message += `<b>Номер: </b> ${phoneNumber}\n`;
    message += `<b>Количество персон: </b> ${quantity}`;

    axios.post(URL_API, {
      chat_id: CHAT_ID,
      parse_mode: "html",
      text: message
    }).then(() => {
      setModalVisible(true);
    });
  };

  return (
    <div className={styles.content_tree_page} id="excursion">
      <div className={styles.only_text_tree_page}>
        <h2 className={styles.line_text}>
          ПОСЕТИТИЕ <br />
          СЕРДЦЕ ПРУССИИ
        </h2>
        <p className={styles.pSchedule}>
          Каждый вторник, среду и четверг <br />
          12.00 15.00. 19.00
        </p>
      </div>
      <div className={styles.karusel}>
        <div className={styles.calendar_card}>
          <div className={styles.label}>
            <form id="zabron" onSubmit={handleSubmit}>
              <div id="calendar" ref={calendarRef}></div>

              <div className={styles.form_group}>
                <input className={styles.inputs}
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder=" "
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <label>Введите имя</label>
              </div>

              <div className={styles.form_group}>
                <input className={styles.inputs}
                  type="tel"
                  id="phoneNumber"
                  maxLength={11}
                  name="phoneNumber"
                  placeholder=" "
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 11))}
                />
                <label>Контактный номер телефона</label>
              </div>

              <div className={styles.form_group}>
                <input className={styles.inputs}
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  min="1"
                  max="10"
                  placeholder=" "
                  required
                  onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value))).toString())}
                />
                <label>Количество персон (макс 10)</label>
              </div>

              <button
                className={styles.learn_more}
                type="submit"
                id="submitButton"
                disabled={submitButtonDisabled}
              >
                <span className={styles.circle} aria-hidden="true">
                  <span className={`${styles.icon} ${styles.arrow}`}></span>
                </span>
                <span className={styles.button_text}>Забронировать</span>
              </button>
            </form>
          </div>
        </div>

        {modalVisible && (
          <div id="modal" className={styles.modal} onClick={() => setModalVisible(false)}>
            <div className={styles.modal_content}>
              <img
                className={styles.modal_content__img}
                src="components/img/PonarthLogoBlack.png"
                alt=""
              />
              <p className={styles.modal_text}>Ваша заявка получена, ожидайте звонка</p>
              <span className={styles.close} onClick={() => setModalVisible(false)}>&times;</span>
            </div>
          </div>
        )}

        <div className={styles.slider_tree_page}>
          <div className={styles.slides}>
            <div id="slide-1">
              <img
                src={img2}
                alt=""
              />
              <p className={styles.text_slide_tree_page}>
                #Знакомство с культурным наследием
              </p>
            </div>
            <div id="slide-2">
              <img
                src={img1}
                alt=""
              />
              <p className={styles.text_slide_tree_page}>
                #Рецептуры довоенной Восточной Пруссии
              </p>
            </div>
            <div id="slide-3">
              <img
                src={img2}
                alt=""
              />
              <p className={styles.text_slide_tree_page}>
                #8 дегустационных сортов Пива
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeartOfPrussia;