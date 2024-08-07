import { FC, useState, useEffect } from "react";
import Header from "../components/Header";
import Map from "../components/Map";
import NewHistory from "../components/NewHistory";
import Partnership from "../components/Partnership/Partnership";
import RightBar from "../components/RightBar";
import styles from "./styles/mainpage.module.css";
import { ThemeContext } from "../components/RightBar";
import Looking from "../components/LookingPage/LookingPage";
import Footer from "../components/Footer";
import History from "../components/History/History";
import PartnerForm from "../components/Form/";
import FirstScreenSlider from '../components/FirstScreenSlider/';
import NewsProduction from "../components/NewsProduction";
import CalendarComp from "../components/Calendar";

const MainPage: FC = () => {
  const localTheme = window.localStorage.getItem("theme");
  const [theme, setTheme] = useState(localTheme ? localTheme : "light");
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
    document.body.style.backgroundColor = theme === "dark" ? "#121212" : "#fff";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleBurger = () => {
    setIsBurgerOpen((prevIsBurgerOpen) => !prevIsBurgerOpen);
    console.log("Pressed");
    console.log(isBurgerOpen);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={styles.box_shadow}>
        <div
          className={
            styles.wrapper +
            (theme === "dark"
              ? " " + styles.dark + " " + styles.darkWrapper
              : "")
          }
        >
          <div
            className={`${styles.burger} ${
              isBurgerOpen ? styles.burgerClosed : ""
            }`}
            onClick={toggleBurger}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <Header isBurgerOpen={isBurgerOpen} />
          <div className={styles.content}>
            <FirstScreenSlider />
            <History />
            <CalendarComp />
            <Partnership />
            <PartnerForm />
            <Looking />
            <NewHistory />
            <NewsProduction />
            <Map />
          </div>
          <RightBar />
        </div>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

export default MainPage;
