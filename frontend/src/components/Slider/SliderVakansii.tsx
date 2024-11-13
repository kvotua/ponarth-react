import React, { useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import stylesV from "./Vaksnsii.module.scss";
import styles from "./styles.module.css";
import { EffectCards } from "swiper/modules";
import DelayedButton from "../Buttons/DelayedButton";
import InputMask from "react-input-mask";
import { ThemeContext } from "../RightBar";
import axios from "axios";
import { useVacancies } from "../LookingPage/VacanciesContext";

const SliderVakansii: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const themeButton = theme === "dark" ? "white" : "mixed";
  const { vacancies } = useVacancies();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userName = (event.target as HTMLFormElement).userName.value;
    const phoneNumber = (event.target as HTMLFormElement).phoneNumber.value;

    try {
      const response = await axios.get(
        "https://backend.ponarth.com/api/site/users/formVacancy"
      );
      const validUserIds = response.data;

      const text = `${userName} оставил/оставила заявку на вакансию\nКонтактный номер: ${phoneNumber.replace(/\s+/g, '')}`;

      await Promise.all(
        validUserIds.map(async (userId: number) => {
          await axios.get(
            `https://api.telegram.org/bot8110753865:AAE5wI51onb539rxjZcOAttMTWiEw4_2rls/sendMessage`,
            {
              params: {
                text: text,
                chat_id: userId,
              },
            }
          );
        })
      );

      alert(
        "Спасибо за отклик!\nНаша команда свяжется с Вами в ближайшее время."
      );
      (event.target as HTMLFormElement).reset();

      console.log("Success: Messages sent to all valid user IDs");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={stylesV.app}>
      <div className={stylesV.swiper_container}>
        <Swiper
          effect="cards"
          grabCursor={true}
          modules={[EffectCards]}
          className={styles.swiper}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          scrollbar={false}
        >
          {vacancies.map((vacancy) => (
            <SwiperSlide key={vacancy.id} className={styles.swiper_slide}>
              <img src={vacancy.base64Image} alt={vacancy.name} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={stylesV.text_container}>
        <h1 className={stylesV.texth}>{vacancies[currentIndex]?.name}</h1>
        <p>{vacancies[currentIndex]?.description}</p>
        <form
          id="stat_partner"
          className={stylesV.stat_partner}
          onSubmit={handleSubmit}
        >
          <div
            className={`${stylesV.form_group} ${
              theme === "dark" ? stylesV.dark : ""
            }`}
          >
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder=""
              required
              autoComplete="off"
            />
            <label htmlFor="userName">Ваше имя</label>
          </div>

          <div
            className={`${stylesV.form_group} ${
              theme === "dark" ? stylesV.dark : ""
            }`}
          >
            <InputMask
              className={stylesV.input}
              name="phoneNumber"
              mask="+7 ( 999 ) 999 - 9999"
              id="phoneNumber"
              placeholder=""
              required
              autoComplete="off"
              type="tel"

            />
            <label htmlFor="phoneNumber">Ваш номер телефона</label>
          </div>

          <DelayedButton
            type="submit"
            to=""
            className={stylesV.learn_more}
            style={themeButton}
            delay={450}
            dopstyle={{
              margin: "0 auto",
              alignContent: "center",
              marginTop: "20px",
              width: "100%",
            }}
          >
            ОСТАВИТЬ ЗАЯВКУ
          </DelayedButton>
        </form>
      </div>
    </div>
  );
};

export default SliderVakansii;
