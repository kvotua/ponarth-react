import ContentHistory from "../componentsHistory/ContentHistory";
import { useState, useEffect, useLayoutEffect} from "react";
import styles from "./styles/historypage.module.scss";
import Footer from "../components/Footer";
import classNames from 'classnames';
import { ThemeContext } from "../components/RightBar";
import { Link } from "react-router-dom";

const HistoryPage = () => {

  useLayoutEffect(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto'});
    });
  const localTheme = window.localStorage.getItem("theme");
  const [theme, setTheme] = useState(localTheme ? localTheme : "light");

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
    document.body.style.backgroundColor = theme === "dark" ? "#000" : "#fff";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const curTheme = theme === "dark" ? styles.dark : "";
  const classes = classNames(styles.historyPage,  curTheme);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <div className={classes}>
    <div className={styles.button_container}>
  <Link to='/home' className={styles.button_back_link}>
  <button className={styles.button_back}></button>
  </Link>
        </div>
      <div className={styles.pageContent}>
        <ContentHistory />
      </div>
      <Footer />
    </div>
   </ThemeContext.Provider>
  );
};

export default HistoryPage;
