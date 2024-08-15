import { FC, useState, useEffect } from "react";
import Header from "../components/Header";
import Map from "../components/Map";
import NewHistory from "../components/NewHistory";
import Partnership from "../components/Partnership/Partnership";
import RightBar from "../components/RightBar";
import RightBarMobile from '../components/RightBarMobile';
import styles from "./styles/mainpage.module.css";
import { ThemeContext } from "../components/RightBar";
import Looking from "../components/LookingPage/LookingPage";
import Footer from "../components/Footer";
import History from "../components/History/History";
import FirstScreenSlider from '../components/FirstScreenSlider/';
import NewsProduction from "../components/NewsProduction";
import CalendarComp from "../components/Calendar";
import PartnerForm from "../components/Form";
const MainPage: FC = () => {
  
  const localTheme = window.localStorage.getItem("theme");
  const [theme, setTheme] = useState(localTheme ? localTheme : "light");
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // Ширина экрана

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
    const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
    window.addEventListener('resize', handleResize);

    if (theme === "dark") {
      if (screenWidth <= 600) {
          document.body.style.backgroundColor = "black"; // Черный фон при темной теме и ширине экрана <= 600 пикселей
      } else {
          document.body.style.backgroundColor = "#121212"; // Темный фон для темной темы
      }
    } else {
        document.body.style.backgroundColor = "#fff"; // Белый фон для светлой темы
    }
  }, [theme, screenWidth]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleBurger = () => {
    setIsBurgerOpen((prevIsBurgerOpen) => !prevIsBurgerOpen);
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
          <RightBarMobile />
        </div>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

export default MainPage;
