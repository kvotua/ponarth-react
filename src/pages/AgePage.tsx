import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/agepage.module.css";
import logo from "../assets/Ponarth_firmenny_blok_01.svg";
import DelayedButton from '../components/Buttons/DelayedButton';
import DelayedButtonWhite from "../components/Buttons/DelayedButtonWhite";
const AgePage: React.FC<{ setAgeConfirmed: (confirmed: boolean) => void }> = ({
  setAgeConfirmed,
}) => {
  const [age, setAge] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const ageConfirmedTime = localStorage.getItem("ageConfirmedTime");
    if (
      ageConfirmedTime &&
      new Date().getTime() - Number(ageConfirmedTime) < 24 * 60 * 60 * 1000
    ) {
      setAgeConfirmed(true);
        navigate("/home");
      
    }
  }, [navigate, setAgeConfirmed]);

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAge(Number(event.target.value));
  };

  const handleConfirmClick = () => {
    if (age >= 18) {
      localStorage.setItem("ageConfirmedTime", String(new Date().getTime()));
      setAgeConfirmed(true);
      let timer: ReturnType<typeof setTimeout>;
      timer = setTimeout(() => {
        navigate("/home");
    }, 750);
    } else {
      window.location.href = "https://www.detmir.ru/catalog/index/name/pure/";
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <img className={styles.logo} src={logo} alt="LOGO" />
        <div className={styles.info}>
          <h1 className={styles.text1}>
            Добро пожаловать на сайт пивоваренной компании Ponarth.
          </h1>
          <h1 className={styles.text2}>
            Пожалуйста, подтвердите свой возраст.
          </h1>
        </div>

        <p className={styles.age}>{age}</p>

        <input
          className={styles.input}
          type="range"
          min="0"
          max="95"
          value={age}
          onChange={handleSliderChange}
        />
        <DelayedButtonWhite to='' className={styles.history_a} delay={450} onClick={handleConfirmClick}>ПРОДОЛЖИТЬ</DelayedButtonWhite>
        {/* <button className={styles.learn_more} onClick={handleConfirmClick}>
          <span className={styles.circle} aria-hidden="true">
            <span className={`${styles.icon} ${styles.arrow}`}></span>
          </span>
          <span className={styles.button_text_two}>ПРОДОЛЖИТЬ</span>
        </button> */}
      </div>
    </div>
  );
};

export default AgePage;
