import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/agepage.module.css";
import logo from "../assets/Ponarth_firmenny_blok_01.svg";

import DelayedButton from "../components/Buttons/DelayedButton";

const AgePage: React.FC<{ setAgeConfirmed: (confirmed: boolean) => void }> = ({
  setAgeConfirmed,
}) => {
  const [age, setAge] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const ageConfirmedTime = localStorage.getItem("ageConfirmedTime");
    if (
      ageConfirmedTime &&
      new Date().getTime() - Number(ageConfirmedTime) < 1000
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
      setTimeout(() => {
        navigate("/home");
      }, 750);
    } else {
      setTimeout(() => {
        window.location.href = "https://www.detmir.ru/catalog/index/name/pure/";
      }, 750);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src={logo} alt="LOGO" />
        </div>
        <div className={styles.info}>
          <h1 className={styles.text2}>Пожалуйста, подтвердите ваш возраст.</h1>
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
        <DelayedButton
          to=""
          className={styles.history_a}
          delay={450}
          onClick={handleConfirmClick}
          style="white"
        >
          ПРОДОЛЖИТЬ
        </DelayedButton>
      </div>
    </div>
  );
};

export default AgePage;
