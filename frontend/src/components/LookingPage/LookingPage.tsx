import React from "react";
import styles from "./LookingPage.module.css";
import SliderVakansii from "../Slider/SliderVakansii";
import { useVacancies } from "./VacanciesContext";

const Looking: React.FC = () => {
  const { vacancies } = useVacancies();

  if (vacancies.length === 0) {
    return null;
  }

  return (
    <>
      <div className={styles.div_text} id="vacancy">
        <h2 className={styles.texter_six}>
          ПОИСКЕ <br /> СОТРУДНИКОВ
        </h2>
      </div>
      <SliderVakansii />
    </>
  );
};

export default Looking;
