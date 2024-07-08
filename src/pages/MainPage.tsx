import { FC, useState } from "react";
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

const MainPage: FC = () => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      document.body.style.backgroundColor =
        newTheme === "dark" ? "#121212" : "#fff";
      return newTheme;
    });
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
          <Looking />
          <Partnership />
          <PartnerForm />
          <NewHistory />
          <Map />
        </div>
        <RightBar />
      </div>
      <Footer />
    </ThemeContext.Provider>
  );
};

export default MainPage;
