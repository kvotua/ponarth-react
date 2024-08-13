import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import stylesV from "./Vaksnsii.module.scss";
import styles from "./styles.module.css";

import { EffectCards } from "swiper/modules";
import DelayedButton from "../Buttons/DelayedButton";
import InputMask from "react-input-mask";
import { ThemeContext } from "../RightBar";
import { useContext } from "react";
import { getVacancies, Vacancy } from "../../api/vacancies";

const SliderVakansii: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const themeButton = theme === "dark" ? "white" : "mixed";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const data = await getVacancies();
        const vacanciesWithDecodedImages = data.map((vacancy) => ({
          ...vacancy,
          base64Image: `data:image/jpeg;base64,${vacancy.image}`,
        }));
        setVacancies(vacanciesWithDecodedImages);
      } catch (error) {
        console.error("Error fetching vacancies", error);
      }
    };
    fetchVacancies();
  }, []);

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
        <h1>{vacancies[currentIndex]?.name}</h1>
        <p>{vacancies[currentIndex]?.description}</p>
        <form id="stat_partner" className={stylesV.stat_partner}>
          <div
            className={`${stylesV.form_group} ${
              theme === "dark" ? stylesV.dark : ""
            }`}
          >
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder=" "
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
              placeholder=" "
              required
              autoComplete="off"
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
