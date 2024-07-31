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
<<<<<<< Updated upstream:src/pages/MainPage.tsx
=======

>>>>>>> Stashed changes:frontend/src/pages/MainPage.tsx
import NewsProduction from "../components/NewsProduction";
import Vakansii from "../components/Vakansii";

const MainPage: FC = () => {
  const localTheme = window.localStorage.getItem("theme");
  const [theme, setTheme] = useState(localTheme ? localTheme : "light");

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
    document.body.style.backgroundColor = theme === "dark" ? "#121212" : "#fff";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={
          styles.wrapper +
          (theme === "dark" ? " " + styles.dark + " " + styles.darkWrapper : "")
        }
      >
        <Header />
        <div className={styles.content}>
          <History />
          <Partnership />
          <PartnerForm />
          <Vakansii/>
          <Looking />
          <NewHistory />
          <NewsProduction />
          <Map />
        </div>
        <RightBar />
      </div>
      <Footer />
    </ThemeContext.Provider>
  );
};

export default MainPage;
