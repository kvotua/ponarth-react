import { FC, useState } from "react";
import Header from "../components/Header";
import Map from "../components/Map";
import NewHistory from "../components/NewHistory";
import Partnership from "../components/Partnership/Partnership";
import RightBar from "../components/RightBar";
import styles from "./styles/mainpage.module.css";
import { ThemeContext } from "../components/RightBar";

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
          <NewHistory />
          <Map />
          <Partnership />
        </div>
        <RightBar />
      </div>
    </ThemeContext.Provider>
  );
};

export default MainPage;
