import styles from "./contentHistory.module.css";
import 'flickity/css/flickity.css';
import { useContext } from "react";
import { ThemeContext } from "../../components/RightBar";
import classNames from 'classnames';

const ContentHistory = () => {
  const { theme } = useContext(ThemeContext);


  const curTheme = theme === "dark" ? styles.dark : "";
  const classes = classNames(styles.texter,  curTheme);
  return (
    <>
  
      <div className={classes}>
        <h2 className={styles.text}>
        КАК ВАРЯТ ПИВО <br />
        НА ЗАВОДЕ XIX ВЕКА
        </h2>
      </div>
      <div className={`${styles.videocontainer} ${styles.horizont}`}>
        <iframe
        src="https://rutube.ru/play/embed/e5565e32053da4b3fe3c9f32036ab458"
         frameBorder="0" 
         allow="clipboard-write; autoplay"
            allowFullScreen></iframe>
      </div>
     
    </>
  );
};

export default ContentHistory;
